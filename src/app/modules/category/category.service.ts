import QueryBuilder from '../../builder/QueryBuilder';
import { ICategory } from './category.interface';
import { Category } from './category.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const createCategories = async (categories: ICategory[]) => {
  const result = await Category.insertMany(categories);
  return result;
};

const getAllCategory = async () => {
  const result = await Category.find();
  return result;
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
  updateCategoryIntoDB,
  deleteCategoryIntoDB,
};
