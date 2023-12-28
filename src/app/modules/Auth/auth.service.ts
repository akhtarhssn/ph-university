import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
const loginUser = async (payload: ILoginUser) => {
  // check if the user exists
  // const isUserExist = await User.findOne({ id: payload?.id });
  const isUserExist = await User.userExists(payload?.id);

  const isDeleted = isUserExist?.isDeleted;
  const status = isUserExist?.status;

  if (!isUserExist || isDeleted === true || status === 'Blocked') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${
        (!isUserExist && 'User not found !') ||
        (isDeleted && 'This user is deleted !!!') ||
        'The user is blocked !!!'
      }`,
    );
  }

  // throw error if password not matches:
  if (!payload?.password || !isUserExist?.password) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password is undefined');
  }
  const isPasswordMatch = await User.isPasswordMatch(
    payload?.password,
    isUserExist?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password doesn't match");
  }

  // create token and sent to the client
  const jwtPayload = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  // Access Granted: Send AccessToken, RefreshToken
  return {
    accessToken,
    needPasswordChange: isUserExist?.needPasswordChange,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // is password match
  const isUserExist = await User.userExists(user?.userId);

  const isDeleted = isUserExist?.isDeleted;
  const status = isUserExist?.status;

  if (!isUserExist || isDeleted === true || status === 'Blocked') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${
        (!isUserExist && 'User not found !') ||
        (isDeleted && 'This user is deleted !!!') ||
        'The user is blocked !!!'
      }`,
    );
  }

  // throw error if password not matches:
  if (!payload?.oldPassword || !isUserExist?.password) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password is undefined');
  }
  // check if password match
  const isPasswordMatch = await User.isPasswordMatch(
    payload?.oldPassword,
    isUserExist?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password doesn't match");
  }

  // hash the new password before updating
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  await User.findOneAndUpdate(
    {
      id: user.userId,
      role: user.role,
    },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
