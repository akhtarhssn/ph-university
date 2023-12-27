import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { IOfferedCourse } from './offeredCourse.interface';
import { OfferedCourseModel } from './offeredCourse.model';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { DepartmentModel } from '../department/department.model';
import { CourseModel } from '../Course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { hasTimeConflict } from './offeredCourse.utils';
import { SemesterRegisterStatus } from '../semesterRegistration/semesterRegistration.constants';

const createOfferedCourse = async (payload: IOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  // is semester registration exists
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No semester registration found');
  }

  // is academic faculty exists
  const isAcademicFacultyExists =
    await AcademicFacultyModel.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No academic faculty found');
  }

  // is academic department exists
  const isAcademicDepartmentExists =
    await DepartmentModel.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No academic department found');
  }

  // is course exists
  const isCourseExists = await CourseModel.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No course found');
  }

  // is faculty exists
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No faculty found');
  }

  const academicSemester = isSemesterRegistrationExists?.academicSemester;

  // check if the academic department belong to the faculty
  const isDepartmentBelongsToFaculty = await DepartmentModel.findOne({
    academicFaculty,
    _id: academicDepartment,
  });

  if (!isDepartmentBelongsToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The ${isAcademicDepartmentExists.name} doesn't belong to ${isAcademicFacultyExists.name}`,
    );
  }

  const sameSection = await OfferedCourseModel.findOne({
    semesterRegistration,
    course,
    section,
  });

  if (sameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered Course with section value ${section} already exists`,
    );
  }

  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time! Choose the other time or date.`,
    );
  }

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });

  return result;
};

const getAllOfferedCourse = async () => {
  const result = await OfferedCourseModel.find().populate(
    'semesterRegistration',
  );
  return result;
};

const getSingleOfferedCourse = async (id: string) => {
  const result = await OfferedCourseModel.findById(id).populate(
    'semesterRegistration',
  );
  return result;
};

const updateOfferedCourse = async (
  id: string,
  payload: Pick<IOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExists = await OfferedCourseModel.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course does not exist');
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty does not exist');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  // only update course with status upcoming and ongoing:
  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (semesterRegistrationStatus?.status !== SemesterRegisterStatus.UPCOMING) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot update this offered course because this semester has ${semesterRegistrationStatus?.status}`,
    );
  }

  // checking if the provided time conflict with existing course time:
  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time! Choose the other time or date.`,
    );
  }

  // if everything above is solved we return the result
  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourse,
  getAllOfferedCourse,
  updateOfferedCourse,
  getSingleOfferedCourse,
};
