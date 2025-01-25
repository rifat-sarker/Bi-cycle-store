
import { TAdmin } from '../admin/admin.interface';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const createAdminIntoDB = async (userData: TAdmin) => {
  const result = await User.create(userData);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  createAdminIntoDB,
};
