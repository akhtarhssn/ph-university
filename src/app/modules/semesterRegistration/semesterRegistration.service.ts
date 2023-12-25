import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { SemesterModel } from '../academicSemester/academicSemester.model';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';

const createSemesterRegistration = async (payload: ISemesterRegistration) => {
  const academicSemester = payload?.academicSemester;
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  });

  // throw new Error if we don't have a Semester matching
  if (academicSemester) {
    const isAcademicSemester = await SemesterModel.findById(academicSemester);
    if (!isAcademicSemester) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'The semester registration not found',
      );
    }

    // throw error if the semester registration exists
    if (isSemesterRegistrationExists) {
      throw new AppError(
        httpStatus.CONFLICT,
        `${academicSemester} already exists`,
      );
    }
  }
};
const getAllSemesterRegistration = async () => {};
const getSingleSemesterRegistration = async () => {};
const updateSemesterRegistration = async () => {};

export const SemesterRegistrationServices = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
