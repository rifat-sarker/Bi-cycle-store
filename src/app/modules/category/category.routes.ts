import { Router } from 'express';
import { categoryValidation } from './category.validation';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', CategoryController.getAllCategory);

router.get('/:slug/products', CategoryController.getProductsByCategory);

router.post(
  '/bulk-create',
  validateRequest(categoryValidation.bulkCreateCategoryValidationSchema),
  CategoryController.createCategories,
);

router.post(
  '/',
  auth('admin'),
  validateRequest(categoryValidation.createCategoryValidationSchema),
  CategoryController.createCategories,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(categoryValidation.updateCategoryValidationSchema),
  CategoryController.updateCategory,
);

router.delete('/:id', auth('admin'), CategoryController.deleteCategory);

export const CategoryRoutes = router;
