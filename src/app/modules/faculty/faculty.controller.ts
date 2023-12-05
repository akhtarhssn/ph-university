import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';

const createFaculty = catchAsync(async (req, res) => {
  const result = await FacultyServices.createFaculty(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFaculty();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties data retrieved successfully',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;

  const result = await FacultyServices.getSingleFaculty(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data retrieved Successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyServices.updateFaculty(facultyId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Updated Successfully',
    data: result,
  });
});

export const FacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
};
