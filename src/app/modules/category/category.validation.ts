import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .nonempty('Category name is required')
      .max(100, 'Category name should not exceed 100 characters'),
    icon: z
      .string()
      .nonempty('Icon name is required')
      .max(100, 'Icon name should not exceed 100 characters'),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .max(100, 'Category name should not exceed 100 characters')
      .optional(),
    icon: z
      .string()
      .max(100, 'Icon name should not exceed 100 characters')
      .optional(),
  }),
});

export const categoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
