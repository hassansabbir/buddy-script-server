import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { HydratedDocument } from 'mongoose';
import config from '../../app/config/index.js';
import { User } from '../user/user.model.js';
import { TUser } from '../user/user.interface.js';
import { TLoginUser } from './auth.interface.js';

const registerUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = (await User.isUserExistsByCustomMessage(payload.email)) as HydratedDocument<TUser> | null;

  if (!user) {
    throw new Error('User does not exist');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password as string,
  );

  if (!isPasswordMatched) {
    throw new Error('Password does not match');
  }

  const jwtPayload = {
    _id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as any,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in as any,
    },
  );

  // Build a clean user object (no password)
  const userObj = {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
  };

  return {
    accessToken,
    refreshToken,
    user: userObj,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
};
