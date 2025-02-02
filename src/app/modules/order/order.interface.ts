import { Types } from 'mongoose';

export type TOrder = {
  email?: string;
  user: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  // quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  details: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
