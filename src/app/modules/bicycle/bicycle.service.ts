import QueryBuilder from '../../builder/QueryBuilder';
import { bicycleSearchableFields } from './bicycle.constant';
import { TBicycle } from './bicycle.interface';
import { Bicycle } from './bicycle.model';

const createBicycleIntoDB = async (bicycleData: TBicycle) => {
  const result = await Bicycle.create(bicycleData);
  return result;
};

const getAllBicycleFromDB = async (query: Record<string, unknown>) => {
  const bicycleQuery = new QueryBuilder(Bicycle.find(), query)
    .search(bicycleSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bicycleQuery.modelQuery;
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
