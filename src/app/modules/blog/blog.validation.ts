import { z } from 'zod';

export const blogCreateSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().optional(),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  coverImage: z.string().url('Cover image must be a valid URL'),
  excerpt: z.string().max(300).optional(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  publishedAt: z.date().optional(),
  authorId: z.string().min(1, 'Author ID is required'),
  readingTime: z.string().optional(),
});


export const blogUpdateSchema = blogCreateSchema.partial();