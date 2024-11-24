import { OrderServices } from './order.service';
import orderSchema from './order.validation';
import { BicycleServices } from '../bicycle/bicycle.service';
import { Request, Response } from 'express';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body;
    const { product, quantity } = orderData;
    const zodParsedOrderData = orderSchema.parse(orderData);

    const bicycle = await BicycleServices.getASpecificBicycleFromDB(product);

    if (!bicycle) {
      res.status(404).json({
        message: 'Bicycle not found',
        status: false,
      });
      return;
    }

    if (bicycle.quantity === undefined || bicycle.quantity < quantity) {
      res.status(400).json({
        message:
          bicycle.quantity === undefined
            ? 'Bicycle quantity is undefined'
            : 'Insufficient stock available',
        status: false,
      });
      return;
    }

    await BicycleServices.updateBicycleIntoDB(product, {
      quantity: bicycle.quantity - quantity,
      inStock: bicycle.quantity - quantity > 0, // if bicycle quantity is 0 it will set inStock false
    });

    const result = await OrderServices.createOrderIntoDB(zodParsedOrderData);

    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error: {
        ...error,
        stack: `Error: Something went wrong! ${error.stack}`,
      },
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderServices.calculateRevenueFromDB();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to calculate revenue',
      success: false,
      error: {
        ...error,
        stack: `Error: Something went wrong! ${error.stack}`,
      },
    });
  }
};
export const OrderController = {
  createOrder,
  calculateRevenue,
};
