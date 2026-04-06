import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/index.js';
import catchAsync from '../utils/catchAsync.js';
import { User } from '../../modules/user/user.model.js';

const optionalAuth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      req.user = null as any;
      return next();
    }

    try {
      // verification
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { email, role } = decoded;

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        req.user = null as any;
        return next();
      }

      const user = await User.findOne({ email });
      if (!user) {
        req.user = null as any;
        return next();
      }

      req.user = user as any;
    } catch {
      req.user = null as any;
    }

    next();
  });
};

export default optionalAuth;
