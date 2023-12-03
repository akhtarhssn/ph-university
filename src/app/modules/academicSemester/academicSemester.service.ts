import { IAcademicSemester } from './academicSemester.interface';
import { SemesterModel } from './academicSemester.model';

const createSemesterService = async (payload: IAcademicSemester) => {
  interface ISemesterCodeMapper {
    [key: string]: string;
  }

  // checking semester name and code match:
  const semesterCodeMapper: ISemesterCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

  if (semesterCodeMapper[payload.name] !== payload.code) {
    throw new Error("Semester name and code doesn't match");
  }

  const result = await SemesterModel.create(payload);

  return result;
};

export const SemesterServices = {
  createSemesterService,
};
