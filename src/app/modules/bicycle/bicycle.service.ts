/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { bicycleSearchableFields } from './bicycle.constant';
import { TBicycle } from './bicycle.interface';
import { Bicycle } from './bicycle.model';

type CloudinaryResponse = {
  secure_url: string;
};

const createBicycleIntoDB = async (file: any, bicycleData: TBicycle) => {
  try {
    if (file && file.path) {
      const imageName = bicycleData.name || 'bicycle';
      const path = file.path;

      const response = await sendImageToCloudinary(path, imageName);

      if (response && (response as CloudinaryResponse).secure_url) {
        const { secure_url }: CloudinaryResponse = response as CloudinaryResponse;
        bicycleData.productImg = secure_url;
      } else {
        throw new Error("Failed to upload image to Cloudinary");
      }
    }

    // Ensure required fields exist before creating the bicycle
    if (!bicycleData.name || !bicycleData.price) {
      throw new Error("Missing required bicycle data fields");
    }

    const result = await Bicycle.create(bicycleData);
    return result;
  } catch (error) {
    console.error("Error in createBicycleIntoDB:", error);
    throw new Error("Failed to create bicycle in DB");
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
  const result = await Bicycle.findOne({ _id });
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
