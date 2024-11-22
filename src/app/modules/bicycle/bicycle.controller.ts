import { Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';



// create a bicycle
const createBicycle = async (req: Request, res: Response) => {
  try {
    const bicycleData = req.body; // name alias
    const result = await BicycleServices.createBicycleIntoDB(bicycleData);

    // console.log(result);
    res.status(200).json({
      message: 'Bicycle created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Something went wrong',
      success: false,
    });
  }
};


//get all bicycle
const getAllBicycle = async (req: Request, res: Response) => {
  try {
    const result = await BicycleServices.getAllBicycleFromDB();
    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Something went wrong',
      success: false,
    });
  }
};

export const BicycleController = {
  createBicycle,
  getAllBicycle,
};
