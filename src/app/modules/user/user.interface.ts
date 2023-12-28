/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  id: string;
  password?: string;
  needPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'Admin' | 'Faculty' | 'Student';
  status: 'Active' | 'Blocked';
  isDeleted: boolean;
}

// Custom static methods:
export interface UserModel extends Model<IUser> {
  userExists(id: string): Promise<IUser | null>;
  isPasswordMatch(plainPass: string, hashedPass: string): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
