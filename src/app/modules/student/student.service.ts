/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudent = async (query: Record<string, unknown>) => {
  let searchTerm = '';
  searchTerm = query?.searchTerm as string;

  const queryObj = { ...query }; //copy

  const searchableFields = [
    'email',
    'name.firstName',
    'name.middleName',
    'presentAddress',
  ];

  const searchQuery = Student.find({
    $or: searchableFields.map((field) => ({
      [field]: new RegExp(searchTerm, 'i'),
    })),
  });

  const excludeFields = ['searchTerm', 'sort', 'limit'];

  excludeFields.forEach((el) => delete queryObj[el]);

  console.log(queryObj);

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  let sort = '-createdAt';

  if (query?.sort) {
    sort = query?.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  if (query?.limit) {
    limit = query?.limit as number;
  }

  const limitQuery = await sortQuery.limit(limit);

  return limitQuery;
};

const getOneStudent = async (id: string) => {
  // const result = await Student.findOne({ id });

  const student = await Student.findOne({ id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  if (!student) {
    throw new AppError(404, `Student with id:'${id}' does not exist`);
  }

  return student;
};

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  const { name, guardian, localGuardian, ...remainingData } = payload;

  const updatedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      updatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      updatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, updatedData, {
    new: true,
    runValidators: true,
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
