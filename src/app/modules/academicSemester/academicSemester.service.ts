import { IAcademicSemester } from './academicSemester.interface';
import { SemesterModel } from './academicSemester.model';

const createSemesterService = async (payload: IAcademicSemester) => {
  interface ISemesterCodeMapper {
    Autumn: '01';
    Summer: '02';
    Fall: '03';
  }

  // checking semester name and code match:
  const semesterNameCodeMapper: ISemesterCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

  const result = await SemesterModel.create(payload);

  return result;
};

export const SemesterServices = {
  createSemesterService,
};
