import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { EnrolledCourseValidation } from './enrolledcourse.validation';
import { EnrolledCourseController } from './enrolledcourse.controller';

const router = express.Router();

router.post(
  '/create-enroll-course',
  validateRequest(EnrolledCourseValidation.createEnrolledCourseValidation),
  EnrolledCourseController.createEnrolledCourse,
);

export const EnrolledCourseRoutes = router;
