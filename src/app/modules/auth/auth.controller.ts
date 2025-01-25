import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import AppError from '../../errors/AppError';

const changePassword = catchAsync(async (req, res) => {
  // const { ...passwordData } = req.body;
  const { email, newPassword, oldPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    throw new AppError(
      400,
      'Email, old password, and new password are required',
    );
  }
  // console.log(req.body);
  const result = await AuthServices.changePassword(
    { email },
    { oldPassword, newPassword },
  );
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  });
});

export const AuthControllers = {
  changePassword,
};
