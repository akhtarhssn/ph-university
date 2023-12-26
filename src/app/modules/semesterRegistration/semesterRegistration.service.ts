import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { SemesterModel } from '../academicSemester/academicSemester.model';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { SemesterRegisterStatus } from './semesterRegistration.constants';

const createSemesterRegistration = async (payload: ISemesterRegistration) => {
  const academicSemester = payload?.academicSemester;
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  });

  // check if there is any registered semester already upcoming | ongoing
  const isUpcomingOrOngoingSemester = await SemesterRegistrationModel.findOne({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });

  // if (isUpcomingOrOngoingSemester?.status === payload?.status) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     `There is already a ${isUpcomingOrOngoingSemester.status} semester`,
  //   );
  // }

  if (isUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isUpcomingOrOngoingSemester.status} semester`,
    );
  }

  // throw new Error if we don't have a Semester matching
  if (academicSemester) {
    const isAcademicSemester = await SemesterModel.findById(academicSemester);
    if (!isAcademicSemester) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'The academic semester not found',
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
  const requestedSemesterStatus = payload?.status;
  const currentSemester = await SemesterRegistrationModel.findById(id);
  // checking if the requested semester registration id exists
  // throw error if the semester registration exists
  if (!currentSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Semester registered with ${id} Not found`,
    );
  }

  // if the requested semester registration is ended, we will not update anything.

  if (currentSemester?.status === SemesterRegisterStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester has already ${currentSemester?.status}`,
    );
  }

  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemester?.status === SemesterRegisterStatus.UPCOMING &&
    requestedSemesterStatus === SemesterRegisterStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot directly change status from ${currentSemester?.status} to ${requestedSemesterStatus}`,
    );
  }

  if (
    currentSemester?.status === SemesterRegisterStatus.ONGOING &&
    requestedSemesterStatus === SemesterRegisterStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot directly change status from ${currentSemester?.status} to ${requestedSemesterStatus}`,
    );
  }

  // update data:
  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  );

  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
