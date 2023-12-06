import { Schema, model } from 'mongoose';
import {
  IAddress,
  IGuardian,
  ILocalGuardian,
  IStudent,
  IUserName,
  // StudentMethods,
  StudentModel,
} from './student.interface';
import { AppError } from '../../utils/AppError';
// import bcrypt from 'bcrypt';
// import config from '../../config';

const userNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
  },
});

const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    required: [true, 'Street address is required'],
    trim: true,
  },
  city: { type: String, required: [true, 'City name is required'], trim: true },
  postalCode: {
    type: String,
    required: [true, 'Post code is required'],
    trim: true,
  },
});

const guardianSchema = new Schema<IGuardian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is requires'],
    trim: true,
  },
  fatherPhone: {
    type: String,
    required: [true, 'Father phone number is required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
    trim: true,
  },
  motherPhone: {
    type: String,
    required: [true, 'Mother phone number is required'],
    trim: true,
  },
});

const localGuardianSchema = new Schema<ILocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Local Guardian email is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Local Guardian phone number is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian occupation is required'],
    trim: true,
  },
  address: {
    type: addressSchema,
    required: [true, 'Local Guardian address is required'],
  },
});

const StudentSchema = new Schema<IStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name field is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message:
        // "The gender field can only be one of the following: 'Male' or 'Female'",
        '{VALUE} is not a valid gender',
    },
    required: true,
    trim: true,
  },
  birthDate: { type: Date },
  email: {
    type: String,
    required: [true, 'Student email is required'],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Student phone number is required'],
  },
  emergencyPhoneNumber: {
    type: String,
    required: [true, 'Student emergency phone number is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: addressSchema,
    required: [true, 'Student present address is required'],
  },
  permanentAddress: {
    type: addressSchema,
    required: [true, 'Student permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Student guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Student local guardian is required'],
  },
  admissionSemester: { type: Schema.ObjectId, ref: 'Semester' },
  academicDepartment: { type: Schema.ObjectId, ref: 'Department' },
  profileImg: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

StudentSchema.pre('save', async function (next) {
  const isExists = await Student.findOne({ name: this.name });

  if (isExists) {
    throw new AppError(409, `${this.name} already exists`);
  }
  next();
});

StudentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

StudentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const idExists = await Student.findOne(query);

  if (!idExists) {
    throw new AppError(404, `Student with id: '${query._id}' doesn't exists`);
  }

  next();
});

// create model:
export const Student = model<IStudent, StudentModel>('Student', StudentSchema);
