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

export const SemesterServices = {
  createSemesterService,
};
