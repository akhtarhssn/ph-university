import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DepartmentServices } from './department.service';

const createDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.createDepartment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req, res) => {
  const result = await DepartmentServices.getAllDepartments();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments Data Retrieved successfully',
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await DepartmentServices.getSingleDepartment(departmentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Data Retrieved Successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await DepartmentServices.updateDepartment(
    departmentId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Updated Successfully',
    data: result,
  });
});

export const DepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
};
