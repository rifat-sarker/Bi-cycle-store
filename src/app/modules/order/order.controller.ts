/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderServices } from './order.service';
import { BicycleServices } from '../bicycle/bicycle.service';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { User } from '../user/user.model';

const createOrder = catchAsync(async (req, res) => {
  const orderData = req.body;
  const userEmail = req.user?.email;

  if (!userEmail) {
    res.status(401).json({
      message: 'User email not found in token',
      status: false,
    });
    return;
  }

  const { product, quantity } = orderData;

  // Get product (bicycle) details
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

  // Update the bicycle stock
  await BicycleServices.updateBicycleIntoDB(product, {
    quantity: bicycle.quantity - quantity,
    stock: bicycle.quantity - quantity > 0,
  });

  const user = await User.findOne({ email: userEmail });
  if (!user) {
    res.status(404).json({
      message: 'User not found',
      status: false,
    });
    return;
  }

  const orderDetails = {
    ...orderData,
    user: user._id,
    email: user.email,
    product: bicycle.name,
    details: bicycle._id,
    quantity,
    totalPrice: bicycle.price! * quantity,
  };

  // Create the order
  const result = await OrderServices.createOrderIntoDB(orderDetails);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All order  is retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await OrderServices.getSingleOrderFromDB(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Order  is retrieved successfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await OrderServices.updateOrderIntoDB(orderId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await OrderServices.deleteOrderFromDB(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is deleted successfully',
    data: result,
  });
});

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
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  calculateRevenue,
};
