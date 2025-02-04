import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TAdmin } from '../admin/admin.interface';
import { createToken } from '../auth/auth.utils';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  // 🔹 Check if user already exists
  const existingUser = await User.isUserExistsByEmail(userData.email);

  if (existingUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This email is already registered!',
    );
  }

  // 🔹 Create new user in the database
  const newUser = await User.create(userData);

  // 🔹 Generate token for the newly created user
  const jwtPayload = {
    email: newUser.email,
    role: newUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    6000
  );

  return {
    ...newUser.toObject(),
    accessToken,
  };
};

const createAdminIntoDB = async (userData: TAdmin) => {
  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload);
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  createAdminIntoDB,
  getAllUsersFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
