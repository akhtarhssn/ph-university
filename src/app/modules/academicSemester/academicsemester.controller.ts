import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterServices } from './academicSemester.service';

const createSemesterController = catchAsync(async (req, res) => {
  const result = await SemesterServices.createSemesterService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});

// get all semesters data
const getAllSemesterController = catchAsync(async (req, res) => {
  const result = await SemesterServices.getAllSemesterService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic data retrieved successfully',
    data: result,
  });
});

// get a single semester data
const getSemesterController = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result = await SemesterServices.getSemesterService(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Data Retrieved Successfully',
    data: result,
  });
});

const updateSemesterController = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await SemesterServices.updateSemesterService(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Updated Successfully',
    data: result,
  });
});

export const SemesterControllers = {
  createSemesterController,
  getAllSemesterController,
  getSemesterController,
  updateSemesterController,
};
