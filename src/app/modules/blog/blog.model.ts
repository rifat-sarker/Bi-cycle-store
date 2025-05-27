import mongoose, { model, Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>({
  title: String,
  slug: String,
  content: String,
  image: String,
  excerpt: String,
  category: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  publishedAt: Date,
  isPublished: { type: Boolean, default: false },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  readingTime: String,
});

export const Blog = model<IBlog>('Blog', blogSchema);
