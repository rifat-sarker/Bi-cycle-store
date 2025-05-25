import QueryBuilder from '../../builder/QueryBuilder';
import { ICategory } from './category.interface';
import { Category } from './category.model';


import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const createCategory = async (categoryData: ICategory) => {
  const category = new Category({
    categoryData,
  });

  const result = await category.save();

  return result;
};

const getAllCategory = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(
    Category.find().populate('parent'),
    query,
  )
    .search(['name', 'slug'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const categories = await categoryQuery.modelQuery;
  const meta = await categoryQuery.countTotal();

  const categoryMap = new Map<string, any>();
  const hierarchy: any[] = [];

  categories.forEach((category: any) => {
    categoryMap.set(category._id.toString(), {
      ...category.toObject(),
      children: [],
    });
  });

  categories.forEach((category: any) => {
    const parentId = category.parent?._id?.toString();
    if (parentId && categoryMap.has(parentId)) {
      categoryMap
        .get(parentId)
        .children.push(categoryMap.get(category._id.toString()));
    } else if (!parentId) {
      hierarchy.push(categoryMap.get(category._id.toString()));
    }
  });

  return {
    meta,
    result: hierarchy,
  };
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
  createCategory,
  getAllCategory,
  updateCategoryIntoDB,
  deleteCategoryIntoDB,
};
