import { z } from 'zod';

// Single category schema
const singleCategorySchema = z.object({
  name: z
    .string()
    .nonempty('Category name is required')
    .max(100, 'Category name should not exceed 100 characters'),
  slug: z
    .string()
    .nonempty('Slug is required')
    .max(100, 'Slug should not exceed 100 characters'),
  icon: z
    .string()
    .nonempty('Icon name is required')
    .max(100, 'Icon name should not exceed 100 characters'),
});

// For single create request
const createCategoryValidationSchema = z.object({
  body: singleCategorySchema,
});

// For bulk create request (array of categories)
const bulkCreateCategoryValidationSchema = z.object({
  body: z
    .array(singleCategorySchema)
    .min(1, 'At least one category is required'),
});

// For update
const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().max(100).optional(),
    slug: z.string().max(100).optional(),
    icon: z.string().max(100).optional(),
  }),
});

export const categoryValidation = {
  createCategoryValidationSchema,
  bulkCreateCategoryValidationSchema,
  updateCategoryValidationSchema,
};
