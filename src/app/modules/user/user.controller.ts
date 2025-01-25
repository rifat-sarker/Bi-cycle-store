import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created succesfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
