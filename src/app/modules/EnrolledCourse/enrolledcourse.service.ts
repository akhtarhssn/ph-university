import { IEnrolledCourse } from './enrolledcourse.interface';

const createEnrolledCourse = async (payload: IEnrolledCourse) => {
  console.log(payload);
};

export const EnrolledCourseServices = {
  createEnrolledCourse,
};
