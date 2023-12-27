import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  // check if the user exists
  const isUserExist = await User.findOne({ id: payload?.id });
  console.log(isUserExist);

  if (!isUserExist || isUserExist.isDeleted === true) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${!isUserExist ? 'User not found' : 'This user is deleted'}`,
    );
  }
};

export const AuthServices = {
  loginUser,
};
