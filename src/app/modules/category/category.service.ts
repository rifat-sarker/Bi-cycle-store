import { ICategory } from './category.interface';
import { Category } from './category.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Bicycle } from '../bicycle/bicycle.model';

const createCategories = async (categories: ICategory[]) => {
  const result = await Category.insertMany(categories);
  return result;
};

const getAllCategory = async () => {
  const result = await Category.find().populate('products');
  return result;
};

const getProductsByCategory = async ({ slug }: { slug: string }) => {
  const category = await Category.findOne({ slug }).populate('products');

  if (!category) {
    throw new Error('Category not found');
  }

  const products = await Bicycle.find({ category: category._id });
  return products;
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<ICategory>,
) => {
  const isCategoryExist = await Category.findById(id);
  if (!isCategoryExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');
  }

  const result = await Category.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const deleteCategoryIntoDB = async (id: string) => {
  const isCategoryExist = await Category.findById(id);
  if (!isCategoryExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');
  }

  const deletedCategory = await Category.findByIdAndDelete(id);
  return deletedCategory;
};

export const CategoryService = {
  createCategories,
  getAllCategory,
  getProductsByCategory,
  updateCategoryIntoDB,
  deleteCategoryIntoDB,
};
