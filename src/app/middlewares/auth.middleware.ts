import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/index.js';
import catchAsync from '../utils/catchAsync.js';
import { User } from '../../modules/user/user.model.js';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('You are not authorized!');
    }

    // verification
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized!');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found!');
    }

    req.user = user;
    next();
  });
};

export default auth;
