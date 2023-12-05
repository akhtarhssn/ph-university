import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyValidation } from './faculty.validation';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.facultyZodValidation),
  FacultyController.createFaculty,
);

router.get('/', FacultyController.getAllFaculty);

router.get('/:facultyId', FacultyController.getSingleFaculty);

router.put(
  '/:facultyId',
  validateRequest(FacultyValidation.facultyZodValidation),
  FacultyController.updateFaculty,
);

export const SemesterRoutes = {
  router,
};
