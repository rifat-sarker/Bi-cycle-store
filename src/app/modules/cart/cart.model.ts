import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bicycle',
      required: true,
    },
    quantity: { type: Number, default: 1 },
    savedForLater: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Cart = mongoose.model('Cart', cartItemSchema);
