import { z } from 'zod';

const createOrderSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    product: z.string().nonempty({ message: 'Product ID is required' }),
    details: z.string().nonempty('Details is required').optional(),
    quantity: z
      .number()
      .int()
      .positive({ message: 'Quantity must be a positive integer' }),
    totalPrice: z
      .number()
      .positive({ message: 'Total price must be a positive number' }),
  }),
});

const updateOrderSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    product: z
      .string()
      .nonempty({ message: 'Product ID is required' })
      .optional(),
    details: z.string().nonempty('Details is required').optional(),
    quantity: z
      .number()
      .int()
      .positive({ message: 'Quantity must be a positive integer' })
      .optional(),
    totalPrice: z
      .number()
      .positive({ message: 'Total price must be a positive number' })
      .optional(),
  }),
});

export const OrderValidations = {
  createOrderSchema,
  updateOrderSchema,
};
