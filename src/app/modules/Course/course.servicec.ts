import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

const createCourse = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCourses = async () => {
  const result = await CourseModel.find();

  return result;
};

const getSingleCourse = async (id: string) => {
  const result = await CourseModel.findById(id);

  return result;
};

const updateCourse = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(id);
  return result;
};

const deleteCourse = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDelete: true },
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
