import { Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';
import bicycleZodSchema from './bicycle.validation';
import bicycleUpdateZodSchema from './bicycle.validation';

// create a bicycle
const createBicycle = async (req: Request, res: Response) => {
  try {
    const bicycleData = req.body; // name alias
    const zodParsedData = bicycleZodSchema.parse(bicycleData);
    const result = await BicycleServices.createBicycleIntoDB(zodParsedData);

    res.status(200).json({
      message: 'Bicycle created successfully',
      success: true,
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

//get all bicycle
const getAllBicycle = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await BicycleServices.getAllBicycleFromDB(searchTerm);

    if (!result.length) {
      res.status(404).json({
        message: 'No bicycles found matching your search criteria.',
        success: false,
        data: [],
      });
      return;
    }
    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message || 'Bicycle not found',
      success: false,
    });
  }
};

// get a single bicycle
const getASpecificBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BicycleServices.getASpecificBicycleFromDB(productId);
    res.status(200).json({
      message: 'Get a specific bicycle successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Bicycle not found',
      error: error,
    });
  }
};

// put
const updateBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const body = req.body;
    const updateBodyParsed = bicycleUpdateZodSchema.parse(body);
    const result = await BicycleServices.updateBicycleIntoDB(
      productId,
      updateBodyParsed,
    );
    res.send({
      success: true,
      message: 'Bicycle updated successfully',
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

// detele bi cycle
const deleteBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await BicycleServices.deleteBicycleFromDB(productId);

    res.send({
      message: 'Bicycle deleted successfully',
      status: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!!',
      error: error,
    });
  }
};

export const BicycleController = {
  createBicycle,
  getAllBicycle,
  getASpecificBicycle,
  updateBicycle,
  deleteBicycle,
};
