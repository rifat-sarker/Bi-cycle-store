import { model, Schema, Types } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      // required: true,
    },

    email: {
      type: String,
      // required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Bicycle',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    // details: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Bicycle',
    // },
    // quantity: {
    //   type: Number,
    //   required: true,
    // },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  { timestamps: true, versionKey: false },
);

//create order model
export const Order = model<TOrder>('Order', orderSchema);
