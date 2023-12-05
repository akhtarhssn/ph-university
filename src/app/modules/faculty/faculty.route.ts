import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyValidation } from './faculty.validation';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyZodValidation),
  FacultyController.createFaculty,
);

router.get('/', FacultyController.getAllFaculty);

router.get('/:facultyId', FacultyController.getSingleFaculty);

router.patch(
  '/:facultyId',
  validateRequest(FacultyValidation.updateFacultyZodValidation),
  FacultyController.updateFaculty,
);

export const FacultyRoutes = router;
