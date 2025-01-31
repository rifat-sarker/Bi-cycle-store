/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { bicycleSearchableFields } from './bicycle.constant';
import { TBicycle } from './bicycle.interface';
import { Bicycle } from './bicycle.model';

const createBicycleIntoDB = async (file: any, bicycleData: TBicycle) => {
  try {
    if (file) {
      const imageName = 'productimage';
      const path = file?.path;

      const { secure_url } = await sendImageToCloudinary(path, imageName);
      bicycleData.productImg = secure_url as string;
    }

    const result = await Bicycle.create(bicycleData);
    return result;
  } catch (error) {
    console.error('Error in createBicycleIntoDB:', error);
    throw new Error('Failed to create bicycle in DB');
  }
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
