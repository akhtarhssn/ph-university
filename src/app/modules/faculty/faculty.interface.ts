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

export type TFaculty = {
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
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

export interface FacultyModel extends Model<TFaculty> {
  isUserExists(id: string): Promise<TFaculty | null>;
}
