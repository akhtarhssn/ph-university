import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { IOfferedCourse } from './offeredCourse.interface';
import { OfferedCourseModel } from './offeredCourse.model';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { DepartmentModel } from '../department/department.model';
import { CourseModel } from '../Course/course.model';
import { Faculty } from '../Faculty/faculty.model';

const createOfferedCourse = async (payload: IOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  // is semester registration exists
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(semesterRegistration);

  // is academic faculty exists
  const isAcademicFacultyExists =
    AcademicFacultyModel.findById(academicFaculty);

  // is academic department exists
  const isAcademicDepartmentExists =
    DepartmentModel.findById(academicDepartment);

  // is course exists
  const isCourseExists = CourseModel.findById(course);

  // is faculty exists
  const isFacultyExists = Faculty.findById(faculty);

  const academicSemester = isSemesterRegistrationExists?.academicSemester;

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No semester registration found');
  }
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No academic faculty found');
  }
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No academic department found');
  }
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No course found');
  }
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No faculty found');
  }

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });

  return result;
};

const getAllOfferedCourse = async () => {
  const result = await OfferedCourseModel.find();
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourse,
  getAllOfferedCourse,
};
