import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // if no token received throw error
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // checking if the given token is valid | verify the received token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;
    // user existence check:
    const isUserExist = await User.userExists(userId);

    const isDeleted = isUserExist?.isDeleted;
    const status = isUserExist?.status;

    if (!isUserExist || isDeleted === true || status === 'Blocked') {
      throw new AppError(
        !isUserExist ? httpStatus.NOT_FOUND : httpStatus.FORBIDDEN,
        `${
          (!isUserExist && 'User not found !') ||
          (isDeleted && 'This user is deleted !!!') ||
          'The user is blocked !!!'
        }`,
      );
    }

    // check if token issued expired:
    if (
      isUserExist.passwordChangedAt &&
      User.JwtIssueBeforePassChange(
        isUserExist.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Login with your new password!!',
      );
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      // checking if user meets the required roles
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to perform this action',
      );
    }

    // Decoded
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
