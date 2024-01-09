import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import { CreateToken } from './auth.utils';
import jwt from 'jsonwebtoken';
import { sendMail } from '../../utils/sendMail';

const loginUser = async (payload: ILoginUser) => {
  // check if the user exists
  // const isUserExist = await User.findOne({ id: payload?.id });
  const isUserExist = await User.userExists(payload?.id);

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
  const accessToken = CreateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string,
  );

  const refreshToken = CreateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires as string,
  );

  // Access Granted: Send AccessToken, RefreshToken
  return {
    accessToken,
    refreshToken,
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

const refreshToken = async (token: string) => {
  // validation
  // checking if the given token is valid | verify the received token
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;
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
    User.JwtIssueBeforePassChange(isUserExist.passwordChangedAt, iat as number)
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Login with your new password!!',
    );
  }

  // create access token:
  // create token and sent to the client
  const jwtPayload = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
  };
  const accessToken = CreateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string,
  );

  return { accessToken };
};

const forgetPassword = async (userId: string) => {
  // verify user before forget password
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

  // create token and sent to the client
  const jwtPayload = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
  };
  const resetToken = CreateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const resetUILink = `http://localhost:3000?id=${isUserExist?.id}&token=${resetToken}`;

  sendMail(isUserExist?.email, resetUILink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  // verify user before forget password
  const isUserExist = await User.userExists(payload?.id);

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
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
