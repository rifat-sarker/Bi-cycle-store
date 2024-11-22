import { Schema } from 'mongoose';
import { TOrder } from './order.interface';

const oderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
  },
  product: {
    type: ObjectId,
    requred: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});
