import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyValidation } from './academicFaculty.validation';
import { FacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(FacultyValidation.createFacultyZodValidation),
  FacultyController.createAcademicFaculty,
);

router.get('/', FacultyController.getAllAcademicFaculty);

router.get('/:academicFacultyId', FacultyController.getSingleAcademicFaculty);

router.patch(
  '/:academicFacultyId',
  validateRequest(FacultyValidation.updateFacultyZodValidation),
  FacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
