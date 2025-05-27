import { Types } from 'mongoose';

export interface IBlog {
  _id?: Types.ObjectId; // Optional when creating
  title: string;
  content: string;
  category: string;
  image: string;
  slug?: string;
  excerpt?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  isPublished?: boolean;
  authorId: Types.ObjectId;
  views?: number;
  likes?: number;
  commentsCount?: number;
  readingTime?: string;
}
