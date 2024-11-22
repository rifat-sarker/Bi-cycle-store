import { Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';

const createBicycle = async (req: Request, res: Response) => {
  try {
    const bicycleData = req.body; // name alias
    const result = await BicycleServices.createBicycleIntoDB(bicycleData);
    console.log(result);
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

export const BicycleController = {
  createBicycle,
};
