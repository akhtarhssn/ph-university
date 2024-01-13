import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { EnrolledCourseValidation } from './enrolledcourse.validation';
import { EnrolledCourseController } from './enrolledcourse.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.Student),
  validateRequest(EnrolledCourseValidation.createEnrolledCourseValidation),
  EnrolledCourseController.createEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.Faculty),
  validateRequest(EnrolledCourseValidation.updateEnrolledCourseValidation),
  EnrolledCourseController.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
