// import mongoose from 'mongoose';
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
// const getSemesterService = async (id: string) => {
//   const objectId = new mongoose.Types.ObjectId(id);

//   const result = await SemesterModel.aggregate([{ $match: { _id: objectId } }]);

//   return result;
// };

const getSemesterService = async (id: string) => {
  const result = await SemesterModel.findById(id);
  return result;
};

// Update semester data:
const updateSemesterService = async (
  id: string,
  payload: Partial<IAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    semesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('invalid semester code');
  }

  const result = await SemesterModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const SemesterServices = {
  createSemesterService,
  getAllSemesterService,
  getSemesterService,
  updateSemesterService,
};
