import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  console.log(payload);
  return {};
};

export const AuthServices = {
  loginUser,
};
