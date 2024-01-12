import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledcourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.createEnrolledCourse(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student has enrolled successfully',
    data: result,
  });
});

export const EnrolledCourseController = {
  createEnrolledCourse,
};
