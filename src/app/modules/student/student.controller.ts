import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

// Get all students
const getStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudent();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data retrieved successfully',
    data: result,
  });
});

// Get single student
const getStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getOneStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Found successfully',
    data: result,
  });
});

// Update Student
const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.updateStudent(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Updated Successfully',
    data: result,
  });
});

// Delete single student
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteOneStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
