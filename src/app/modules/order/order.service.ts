import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find().populate(
    'details',
    'name description price',
  );
  return result;
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
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
  calculateRevenueFromDB,
};
