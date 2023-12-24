/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { CourseFaculty, TCourse } from './course.interface';
import { CourseFacultyModel, CourseModel } from './course.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourse = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCourses = async (payload: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CourseModel.find(), payload)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;

  return result;
};

const getSingleCourse = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  );

  return result;
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update basic course info',
      );
    }

    // check if there is any prerequisites update/
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted prerequisites
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el?.course && el?.isDeleted)
        .map((el) => el?.course);

      const deletedPreRequisitesCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPreRequisites) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to delete prerequisites courses',
        );
      }

      // filter out the new prerequisites
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRequisitesCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        { new: true, runValidators: true, session },
      );

      if (!newPreRequisitesCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update new pre requisites courses',
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await CourseModel.findById(id).populate(
      'preRequisiteCourses.course',
    );

    // const result = await CourseModel.findByIdAndUpdate(id, payload);
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error);
  }
};

const deleteCourse = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignFaculties = async (id: string, payload: Partial<CourseFaculty>) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true },
  );

  return result;
};

export const CourseServices = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFaculties,
};
