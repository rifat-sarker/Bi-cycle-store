import { z } from 'zod';

const orderSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  product: z.string().nonempty({ message: 'Product ID is required' }), // Assuming ObjectId as a string
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' }),
  totalPrice: z
    .number()
    .positive({ message: 'Total price must be a positive number' }),
});

export default orderSchema;
