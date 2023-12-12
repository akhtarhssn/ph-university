/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { SemesterModel } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  // create a user object:
  const userData: Partial<IUser> = {};

  // if not password use default password
  userData.password = password || (config.default_password as string);

  // set Student Role.
  userData.role = 'Student';

  // find the admission semester id:
  const admissionSemester = await SemesterModel.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(404, 'Academic semester not found');
  }

  // check duplicate email:
  // const duplicateEmail = await Student.findOne({ email: payload.email });
  // if (duplicateEmail) {
  //   throw new AppError(
  //     409,
  //     `An User with ${duplicateEmail.email} already exists`,
  //   );
  // }

  // create/start a session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set user id:
    userData.id = await generateStudentId(admissionSemester);

    // create a user
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    // set id, _id as user.
    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id; // reference id

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const UserServices = {
  createStudentIntoDB,
};
