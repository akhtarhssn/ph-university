import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseZodValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(OfferedCourseZodValidations.createOfferedCourseValidation),
  OfferedCourseControllers.createOfferedCourse,
);

router.get('/', OfferedCourseControllers.getAllOfferedCourse);

router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);

router.patch(
  '/:id',
  validateRequest(OfferedCourseZodValidations.updateOfferedCourseValidation),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete('/:id', OfferedCourseControllers.deleteOfferedCourse);

export const offeredCourseRoutes = router;
