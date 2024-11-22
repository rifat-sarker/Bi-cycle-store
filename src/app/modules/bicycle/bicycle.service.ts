import { TBicycle } from './bicycle.interface';
import { Bicycle } from './bicycle.model';

const createBicycleIntoDB = async (bicycleData: TBicycle) => {
  const result = await Bicycle.create(bicycleData);
  return result;
};

const getAllBicycleFromDB = async () => {
  const result = await Bicycle.find();
  return result;
};

const getASpecificBicycleFromDB = async (_id: string) => {
  const result = await Bicycle.findOne({ _id });
  console.log(result);
  return result;
};

export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicycleFromDB,
  getASpecificBicycleFromDB,
};
