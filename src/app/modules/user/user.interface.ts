/* eslint-disable no-unused-vars */

export interface TUser {
  // id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'customer';
  // status: 'in-progress' | 'blocked';
  // isDeleted: boolean;
}

