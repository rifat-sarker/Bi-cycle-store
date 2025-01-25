import httpStatus from 'http-status';
import config from '../../config';
import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const changePassword = async (
  userData: {email:string},
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistsByEmail(userData.email);
  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      // role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

export const AuthServices = {
  changePassword,
};
