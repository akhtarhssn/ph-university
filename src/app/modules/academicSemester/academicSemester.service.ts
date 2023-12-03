import mongoose from 'mongoose';
import { semesterCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { SemesterModel } from './academicSemester.model';

const createSemesterService = async (payload: IAcademicSemester) => {
  // checking semester name and code match:

  if (semesterCodeMapper[payload.name] !== payload.code) {
    throw new Error("Semester name and code doesn't match");
  }

  const result = await SemesterModel.create(payload);

  return result;
};

// Get all semester data
const getAllSemesterService = async () => {
  const result = await SemesterModel.find();

  return result;
};

// Get a single semester data
const getSemesterService = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);

  const result = await SemesterModel.aggregate([{ $match: { _id: objectId } }]);

  return result;
};

export const SemesterServices = {
  createSemesterService,
  getAllSemesterService,
  getSemesterService,
};
