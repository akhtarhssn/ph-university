import { Model } from 'mongoose';

export interface IUser {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'Admin' | 'Faculty' | 'Student';
  status: 'Active' | 'Blocked';
  isDeleted: boolean;
}

// Custom static methods:
export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  userExists(id: string): Promise<IUser | null>;
}
