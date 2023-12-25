import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { SemesterModel } from '../academicSemester/academicSemester.model';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

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
        `Semester registered with ${academicSemester} already exists`,
      );
    }
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};
const getAllSemesterRegistration = async (payload: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    payload,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};
const getSingleSemesterRegistration = async (id: string) => {
  const result =
    await SemesterRegistrationModel.findById(id).populate('academicSemester');

  return result;
};
const updateSemesterRegistration = async (
  id: string,
  payload: Partial<ISemesterRegistration>,
) => {
  console.log(id, payload);
};

export const SemesterRegistrationServices = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
