import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFaculty(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFaculty();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties data retrieved successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { academicFacultyId } = req.params;

  const result =
    await AcademicFacultyServices.getSingleAcademicFaculty(academicFacultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty data retrieved Successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { academicFacultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFaculty(
    academicFacultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Updated Successfully',
    data: result,
  });
});

export const FacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
