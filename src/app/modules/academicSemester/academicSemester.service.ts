import { IAcademicSemester } from './academicSemester.interface';
import { SemesterModel } from './academicSemester.model';

const createSemesterService = async (payload: IAcademicSemester) => {
  const result = await SemesterModel.create(payload);

  return result;
};

export const SemesterServices = {
  createSemesterService,
};
