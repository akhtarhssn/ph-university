import { Model } from 'mongoose';

export interface IUserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IAddress {
  street: string;
  city: string;
  postalCode: string;
}

export interface IGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  motherName: string;
  motherOccupation: string;
  motherPhone: string;
}

export interface ILocalGuardian {
  name: string;
  email: string;
  phone: string;
  occupation: string;
  address: IAddress;
}

export interface IStudent {
  id: string;
  name: IUserName;
  gender: 'Male' | 'Female';
  birthDate: string;
  email: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: IAddress;
  permanentAddress: IAddress;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImg?: string;
  isActive: 'Active' | 'Blocked';
  isDeleted: boolean;
}

// Custom instance methods:
// export interface StudentMethods {
//   userExists(id: string): Promise<IStudent | null>;
// }

// export type StudentModel = Model<
//   IStudent,
//   Record<string, never>,
//   StudentMethods
// >;

// Custom static methods:
export interface StudentModel extends Model<IStudent> {
  // eslint-disable-next-line no-unused-vars
  userExists(id: string): Promise<IStudent | null>;
}
