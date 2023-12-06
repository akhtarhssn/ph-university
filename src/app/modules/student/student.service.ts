import mongoose from 'mongoose';
import { AppError } from '../../errors/AppError';
import { IStudent } from './student.interface';
import { Student } from './student.model';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllStudent = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getOneStudent = async (id: string) => {
  // const result = await Student.findOne({ id });

  const student = await Student.findById(id);
  if (!student) {
    throw new AppError(404, `Student with id:'${id}' does not exist`);
  }

  // aggregate:
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudent = async (id: string, payload: IStudent) => {
  const result = await Student.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteOneStudent = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudent,
  getOneStudent,
  updateStudent,
  deleteOneStudent,
};
