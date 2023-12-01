// import studentZodSchema from '../student/student.validation';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.services';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // TODO: zod validation stopped
  // const zodValidation = studentZodSchema.parse(studentData);
  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
