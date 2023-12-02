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

export const SemesterControllers = {
  createSemesterController,
};
