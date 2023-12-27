/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TGender = 'Male' | 'Female';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export interface IAddress {
  street: string;
  city: string;
  postalCode: string;
}

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  bloodGroup?: TBloodGroup;
  presentAddress: IAddress;
  permanentAddress: IAddress;
  profileImg?: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  isUserExists(id: string): Promise<TAdmin | null>;
}
