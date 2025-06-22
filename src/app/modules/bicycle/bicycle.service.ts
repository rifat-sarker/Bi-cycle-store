/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { Category } from '../category/category.model';
// import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { bicycleSearchableFields } from './bicycle.constant';
import { TBicycle } from './bicycle.interface';
import { Bicycle } from './bicycle.model';

// type CloudinaryResponse = {
//   secure_url: string;
// };

const createBicycleIntoDB = async (bicycleData: TBicycle) => {
  try {
    // if (file) {
    //   const imageName = bicycleData.name || 'bicycle';
    //   const path = file?.path;

    //   const response = await sendImageToCloudinary(path, imageName);
    //   const { secure_url }: CloudinaryResponse = response as CloudinaryResponse;
    //   bicycleData.productImg = secure_url;
    // }

    const result = await Bicycle.create(bicycleData);
    //  Push the created bicycle _id to the category
    await Category.findByIdAndUpdate(result.category, {
      $push: { products: result._id },
    });

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

  const meta = await bicycleQuery.countTotal();
  const result = await bicycleQuery.modelQuery;
  return { meta, result };
};

const getASpecificBicycleFromDB = async (_id: string) => {
  const result = await Bicycle.findById(_id);
  return result;
};

const updateBicycleIntoDB = async (_id: string, payload: Partial<TBicycle>) => {
  const result = await Bicycle.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
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
