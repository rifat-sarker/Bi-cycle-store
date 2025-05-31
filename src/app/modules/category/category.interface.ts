import { Types } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  icon: string;
  products: Types.ObjectId;
}
