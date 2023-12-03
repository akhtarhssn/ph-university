import express from 'express';
import { SemesterControllers } from './academicsemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { SemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(SemesterValidation.createSemesterZodSchema),
  SemesterControllers.createSemesterController,
);

router.get('/', SemesterControllers.getAllSemesterController);

router.get('/:id', SemesterControllers.getSemesterController);

export const SemesterRoutes = router;
