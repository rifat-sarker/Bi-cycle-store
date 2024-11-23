import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import orderSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParsedData = orderSchema.parse(orderData);
    const result = await OrderServices.createOrderIntoDB(zodParsedData);
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

export const OrderController = {
  createOrder,
};
