/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface IUser {
  id: string;
  password?: string;
  needPasswordChange: boolean;
  role: 'Admin' | 'Faculty' | 'Student';
  status: 'Active' | 'Blocked';
  isDeleted: boolean;
}

// Custom static methods:
export interface UserModel extends Model<IUser> {
  userExists(id: string): Promise<IUser | null>;
  isPasswordMatched(plainPass: string, hashedPass: string): Promise<boolean>;
}
