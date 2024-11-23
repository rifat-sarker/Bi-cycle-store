import { z } from 'zod';

// Zod schema for TBicycle
const bicycleZodSchema = z.object({
  name: z.string().nonempty('Name is required').optional(),
  brand: z.string().nonempty('Brand is required').optional(),
  price: z.number().min(0, 'Price must be a positive number').optional(),
  type: z
    .enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
      errorMap: () => ({ message: 'Type is not supported' }),
    })
    .optional(),
  description: z.string().nonempty('Description is required').optional(),
  quantity: z
    .number()
    .min(0, 'Quantity must be a non-negative number')
    .optional(),
  inStock: z
    .boolean()
    .refine((value) => value === true || value === false, {
      message: 'InStock must be true or false',
    })
    .optional(),
});

export default bicycleZodSchema;
