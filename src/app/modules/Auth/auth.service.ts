import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
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

  // check if password matches:
  if (!payload?.password || !isUserExist?.password) {
    // Handle the case where either password is undefined
    throw new AppError(httpStatus.BAD_REQUEST, 'Password is undefined');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    isUserExist?.password,
  );
  console.log(isPasswordMatch);

  // Access Granted: Send AccessToken, RefreshToken
};

export const AuthServices = {
  loginUser,
};
