import { Types } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  category: string;
  image: string;
  authorId: Types.ObjectId;
}
