import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync.js';
import sendResponse from '../../app/utils/sendResponse.js';
import { UserServices } from './user.service.js';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDB(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await UserServices.getMeFromDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile is retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await UserServices.updateProfileIntoDB(email, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile is updated successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getSingleUser,
  getAllUsers,
  getMe,
  updateProfile,
};
