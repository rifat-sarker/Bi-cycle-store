import { z } from 'zod';

export const blogCreateSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  category: z.string(),
});

export const blogUpdateSchema = blogCreateSchema.partial();
