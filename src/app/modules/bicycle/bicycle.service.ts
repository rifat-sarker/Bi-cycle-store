import { TBicycle } from './bicycle.interface';
import { Bicycle } from './bicycle.model';

const createBicycleIntoDB = async (bicycleData: TBicycle) => {
  const result = await Bicycle.create(bicycleData);
  return result;
};

export const BicycleServices = {
  createBicycleIntoDB,
};
