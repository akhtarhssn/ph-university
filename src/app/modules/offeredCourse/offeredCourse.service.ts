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

  assignedSchedules.forEach((schedule) => {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      throw new AppError(
        httpStatus.CONFLICT,
        `This faculty is not available at that time! Choose the other time or date.`,
      );
    }
  });

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
