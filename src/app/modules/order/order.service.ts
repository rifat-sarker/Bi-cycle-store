import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { orderSearchableFields } from './order.constant';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { Bicycle } from '../bicycle/bicycle.model';
import { orderUtils } from './order.utils';
import { User } from '../user/user.model';

const createOrderIntoDB = async (
  userEmail: string,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return {
      error: true,
      statusCode: httpStatus.NOT_FOUND,
      message: 'User not found',
    };
  }

  if (!user.address || !user.phone || !user.city) {
    return {
      error: true,
      statusCode: httpStatus.BAD_REQUEST,
      message: 'Missing required user information (address, phone, or city)',
    };
  }

  if (!payload?.products?.length) {
    return {
      error: true,
      statusCode: httpStatus.BAD_REQUEST,
      message: 'No products found in order',
    };
  }

  const updatedBicycles = [];

  // Loop through each product in the order to update its quantity and stock
  for (const product of payload.products) {
    const { product: productId, quantity } = product;

    if (!productId || !quantity) {
      return {
        error: true,
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Product ID or quantity is missing',
      };
    }

    const bicycle = await Bicycle.findById(productId);
    if (!bicycle) {
      return {
        error: true,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Bicycle not found',
      };
    }

    // Check if the stock is sufficient
    if (bicycle.quantity === undefined || bicycle.quantity < quantity) {
      return {
        error: true,
        statusCode: httpStatus.BAD_REQUEST,
        message:
          bicycle.quantity === undefined
            ? 'Bicycle quantity is undefined'
            : 'Insufficient stock available',
      };
    }

    // Update the stock and quantity before updating the bicycle
    const updatedBicycle = await Bicycle.findOneAndUpdate(
      { _id: productId },
      [
        {
          $set: {
            quantity: { $subtract: ["$quantity", quantity] }, 
            stock: { $cond: [{ $gt: [{ $subtract: ["$quantity", quantity] }, 0] }, true, false] } 
          }
        }
      ],
      { new: true }
    );

    if (!updatedBicycle) {
      return {
        error: true,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Failed to update bicycle stock",
      };
    }

    updatedBicycles.push(updatedBicycle);
  }

  // Calculate total price of the order
  const totalPrice = updatedBicycles.reduce((total, bicycle, index) => {
    return total + bicycle.price! * payload.products[index].quantity;
  }, 0);

  const orderDetails = {
    products: payload.products,
    totalPrice,
  };

  let order = await Order.create({
    user,
    products: orderDetails.products,
    totalPrice,
  });

  // Payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.email,
    customer_phone: user.phone,
    customer_city: user.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};


const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Order.find().populate('user'), query)
    .search(orderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await orderQuery.countTotal();
  const result = await orderQuery.modelQuery;
  return { meta, result };
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id);
  return result;
};

const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {
  const result = await Order.findByIdAndUpdate({ _id: id }, payload, {
    unique: true,
  });
  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

const calculateRevenueFromDB = async () => {
  const result = await Order.aggregate([
    {
      $addFields: {
        totalRevenue: {
          $multiply: ['$totalPrice', '$quantity'],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalRevenue' },
      },
    },
  ]);

  return result[0]?.totalRevenue || 0;
};

export const OrderServices = {
  createOrderIntoDB,
  // getOrders,
  verifyPayment,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
  calculateRevenueFromDB,
};
