/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

const createCourse = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCourses = async (payload: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    payload,
  )
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

  const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
    id,
    courseRemainingData,
    { new: true, runValidators: true },
  );

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
    );

    // filter out the new prerequisites
    const newPreRequisites = preRequisiteCourses?.filter(
      (el) => el.course && !el.isDeleted,
    );

    const newPreRequisitesCourses = await CourseModel.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
    });
  }

  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  );

  // const result = await CourseModel.findByIdAndUpdate(id, payload);
  return result;
};

const deleteCourse = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
