import { z } from 'zod';

// Zod schema for TBicycle
const bicycleZodSchema = z.object({
  name: z.string().nonempty('Name is required'),
  brand: z.string().nonempty('Brand is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
    errorMap: () => ({ message: 'Type is not supported' }),
  }),
  description: z.string().nonempty('Description is required'),
  quantity: z.number().min(0, 'Quantity must be a non-negative number'),
  inStock: z.boolean().refine((value) => value === true || value === false, {
    message: 'InStock must be true or false',
  }),
});

export default bicycleZodSchema;
