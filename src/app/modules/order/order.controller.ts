/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderServices } from './order.service';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

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

  if (!orderData?.products?.length) {
    res.status(400).json({
      message: 'No products found in order',
      status: false,
    });
    return;
  }

  const result = await OrderServices.createOrderIntoDB(
    userEmail,
    orderData,
    req.ip!,
  );

  // Check if the result is an error object
  if (typeof result !== 'string' && result?.error) {
    res.status(result.statusCode).json({
      message: result.message,
      status: false,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order placed successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order verified successfully',
    data: order,
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
    const totalRevenue = await OrderServices.calculateRevenueFromDB(); // Call the service method

    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    const errorMessage =
      error?.message || 'Something went wrong while calculating revenue';

    res.status(500).json({
      message: 'Failed to calculate revenue',
      success: false,
      error: {
        message: errorMessage, // Only include the error message in the response
      },
    });
  }
};


export const OrderController = {
  createOrder,
  getAllOrders,
  verifyPayment,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  calculateRevenue,
};
