import { z } from 'zod';

const createBicycleValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    // productImg: z.string().nonempty('ProductImg is required').optional(),
    brand: z.enum(
      [
        'CityRide',
        'UrbanMotion',
        'TrailPro',
        'KidBike',
        'GreenWheel',
        'Velocita',
        'HealthBike',
        'SpeedBikes',
        'ElectraBike',
      ],
      {
        errorMap: () => ({
          message: 'Invalid brand name. Please select a valid brand.',
        }),
      },
    ),
    price: z.number().min(0, 'Price must be a positive number'),
    model: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
      errorMap: () => ({ message: 'Model is not supported' }),
    }),
    category: z.enum(
      [
        'Outdoor',
        'Sport',
        'Urban',
        'Adventure',
        'Electric',
        'Kids',
        'Racing',
        'Fitness',
      ],
      { errorMap: () => ({ message: 'Category is not supported' }) },
    ),
    description: z.string().nonempty('Description is required'),
    quantity: z.number().min(0, 'Quantity must be a non-negative number'),
    stock: z.boolean().refine((value) => value === true || value === false, {
      message: 'InStock must be true or false',
    }),
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
    category: z
      .enum(
        [
          'Outdoor',
          'Sport',
          'Urban',
          'Adventure',
          'Electric',
          'Kids',
          'Racing',
          'Fitness',
        ],
        { errorMap: () => ({ message: 'Category is not supported' }) },
      )
      .optional(),
    description: z.string().nonempty('Description is required').optional(),
    quantity: z
      .number()
      .min(0, 'Quantity must be a non-negative number')
      .optional(),
    stock: z
      .boolean()
      .refine((value) => value === true || value === false, {
        message: 'InStock must be true or false',
      })
      .optional(),
  }),
});

export const BicycleValidation = {
  createBicycleValidationSchema,
  updateBicycleValidationSchema,
};
