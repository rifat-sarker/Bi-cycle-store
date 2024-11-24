import { TBicycle } from './bicycle.interface';
import { Bicycle } from './bicycle.model';

const createBicycleIntoDB = async (bicycleData: TBicycle) => {
  const result = await Bicycle.create(bicycleData);
  return result;
};

const getAllBicycleFromDB = async (searchTerm: string) => {
  const query = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } },
          { type: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};

  const result = await Bicycle.find(query);
  return result;
};

const getASpecificBicycleFromDB = async (_id: string) => {
  const result = await Bicycle.findOne({ _id });
  return result;
};

const updateBicycleIntoDB = async (_id: string, payload: Partial<TBicycle>) => {
  const result = await Bicycle.findByIdAndUpdate(_id, payload);
  return result;
};

const deleteBicycleFromDB = async (_id: string) => {
  const result = await Bicycle.findByIdAndDelete(_id);
  return result;
};
export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicycleFromDB,
  getASpecificBicycleFromDB,
  updateBicycleIntoDB,
  deleteBicycleFromDB,
};
