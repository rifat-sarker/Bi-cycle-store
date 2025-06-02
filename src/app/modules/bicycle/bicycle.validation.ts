import { z } from 'zod';

const createBicycleValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    // productImg: z.string().nonempty('ProductImg is required').optional(),
    brand: z.string(),
    price: z.number().min(0, 'Price must be a positive number'),
    model: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
      errorMap: () => ({ message: 'Model is not supported' }),
    }),
    category: z.string().nonempty('Category ID is required'),

    description: z.string().nonempty('Description is required'),
    quantity: z.number().min(0, 'Quantity must be a non-negative number'),
    
  }),
});

const updateBicycleValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required').optional(),
    // productImg: z.string().nonempty('ProductImg is required').optional(),
    brand: z.string().nonempty('Brand is required').optional(),
    price: z.number().min(0, 'Price must be a positive number').optional(),
    model: z
      .enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
        errorMap: () => ({ message: 'Model is not supported' }),
      })
      .optional(),
    category: z.string().optional(),
    description: z.string().nonempty('Description is required').optional(),
    quantity: z
      .number()
      .min(0, 'Quantity must be a non-negative number')
      .optional(),
    
  }),
});

export const BicycleValidation = {
  createBicycleValidationSchema,
  updateBicycleValidationSchema,
};
