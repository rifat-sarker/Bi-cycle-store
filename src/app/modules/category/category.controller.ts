import catchAsync from '../../utils/catchAsync';
import { CategoryService } from './category.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createCategories = catchAsync(async (req, res) => {
  if (!Array.isArray(req.body)) {
    throw new Error('Payload must be an array of categories');
  }

  const result = await CategoryService.createCategories(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Categories created successfully',
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.getAllCategory();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category are retrieved succesfully',
    data: result,
  });
});

const getProductsByCategory = catchAsync(async (req, res) => {
  const { slug } = req.params;

  const result = await CategoryService.getProductsByCategory({ slug });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products by category retrieved successfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryService.updateCategoryIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category is updated succesfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryService.deleteCategoryIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is deleted successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategories,
  getAllCategory,
  getProductsByCategory,
  updateCategory,
  deleteCategory,
};
