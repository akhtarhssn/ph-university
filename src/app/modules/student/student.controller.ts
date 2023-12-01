import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

const catchAsync = (asyncFunction: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncFunction(req, res, next)).catch((err) => next(err));
  };
};

// Get all students
const getStudents = catchAsync(async (req, res, next) => {
  try {
    const result = await StudentServices.getAllStudent();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students data retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

// Get single student
const getStudent = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getOneStudent(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Found successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

// Delete single student
const deleteStudent = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteOneStudent(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const StudentControllers = {
  getStudents,
  getStudent,
  deleteStudent,
};
