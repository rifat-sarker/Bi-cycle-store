import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
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
  calculateRevenueFromDB,
};
