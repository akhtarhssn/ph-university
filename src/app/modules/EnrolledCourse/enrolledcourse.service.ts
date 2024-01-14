/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { OfferedCourseModel } from '../offeredCourse/offeredCourse.model';
import { IEnrolledCourse } from './enrolledcourse.interface';
import { EnrolledCourse } from './enrolledcourse.model';
import { Student } from '../student/student.model';
import mongoose from 'mongoose';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { CourseModel } from '../Course/course.model';
import { Faculty } from '../Faculty/faculty.model';

const createEnrolledCourse = async (
  userId: string,
  payload: IEnrolledCourse,
) => {
  /***
   * Step 1: Check if the offered course exists
   * Step 2: Check if the student has already enrolled this offered course
   * Step 3: Check if the max credit exceeded the maximum allowed credit
   * Step 4: continue with enrollment if the the above conditions are true.
   ***/

  const { offeredCourse } = payload;

  const isOfferedCourseExists =
    await OfferedCourseModel.findById(offeredCourse);

  const student = await Student.findOne({ id: userId }, { _id: 1 });

  const course = await CourseModel.findById(isOfferedCourseExists?.course);

  if (!isOfferedCourseExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Offered Course not found for enrollment !',
    );
  }

  if (!student) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Student not found for enrollment !',
    );
  }

  const SemesterRegistration = await SemesterRegistrationModel.findById(
    isOfferedCourseExists.semesterRegistration,
  ).select('maxCredit');

  const isStudentEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });

  if (isStudentEnrolled) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Student already enrolled in this course !',
    );
  }

  if (isOfferedCourseExists?.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Maximum capacity is full');
  }

  // throw error if total enrolled credits + new enrolled course credit >= maxCredit
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;
  // console.log(enrolledCourses, totalCredits);

  if (
    totalCredits &&
    SemesterRegistration?.maxCredit &&
    totalCredits + course?.credits > SemesterRegistration?.maxCredit
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceeded the maximum credits',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student?._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to enroll in course');
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourseModel.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const updateEnrolledCourseMarks = async (
  userId: string,
  payload: Partial<IEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExists = await SemesterRegistrationModel.findById(
    semesterRegistration,
    { _id: 1 },
  );
  const isOfferedCourseExists = await OfferedCourseModel.findById(
    offeredCourse,
    { _id: 1 },
  );
  const isStudentExists = await Student.findById(student, { _id: 1 });
  const isFacultyExists = await Faculty.findOne({ id: userId }, { _id: 1 });

  if (
    !isSemesterRegistrationExists ||
    !isOfferedCourseExists ||
    !isStudentExists
  ) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      !isSemesterRegistrationExists
        ? 'Semester registration not found for marks update'
        : !isOfferedCourseExists
          ? 'Offered Course not found for enrollment !'
          : !isStudentExists
            ? 'Student not found for marks update'
            : 'Faculty is not found for marks update',
    );
  }

  const facultyAuthorization = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: isFacultyExists?._id,
  });

  if (!facultyAuthorization) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "This faculty doesn't have the required permission to update this course marks",
    );
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    facultyAuthorization?._id,
    modifiedData,
    {
      new: true,
    },
  );

  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
};
