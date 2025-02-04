import { BicycleServices } from './bicycle.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { updateBicycleStock } from './bicycle.utility';

// create a bicycle
const createBicycle = catchAsync(async (req, res) => {
  const bicycleData = req.body;
  const file = req.file;

  if (!file) {
    throw new Error('Image file is required');
  }

  if (!bicycleData) {
    throw new Error('Bicycle data is required');
  }

  const result = await BicycleServices.createBicycleIntoDB(file, bicycleData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle is created successfully',
    data: result,
  });
});

//get all bicycle
const getAllBicycle = catchAsync(async (req, res) => {
  const result = await BicycleServices.getAllBicycleFromDB(req.query);

  // if (!result.length) {
  //   res.status(404).json({
  //     message: 'No bicycles found matching your search criteria.',
  //     success: false,
  //     data: [],
  //   });
  //   return;
  // }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycles retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

// get a single bicycle
const getASpecificBicycle = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await BicycleServices.getASpecificBicycleFromDB(productId);
  res.status(200).json({
    message: 'Get a specific bicycle successfully',
    status: true,
    data: result,
  });
});

//  updateBicycle
const updateBicycle = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await BicycleServices.updateBicycleIntoDB(productId, req.body);
  await updateBicycleStock(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle updated successfully',
    data: result,
  });
});

// detele bi cycle
const deleteBicycle = catchAsync(async (req, res) => {
  const { productId } = req.params;
  await BicycleServices.deleteBicycleFromDB(productId);

  res.send({
    message: 'Bicycle deleted successfully',
    status: true,
    data: {},
  });
});

export const BicycleController = {
  createBicycle,
  getAllBicycle,
  getASpecificBicycle,
  updateBicycle,
  deleteBicycle,
};
