import { Types } from 'mongoose';

export type TOrder = {
  email?: string;
  user:Types.ObjectId;
  product: string;
  details: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: string;
};
