import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseZodValidation } from './course.validation';
import { CourseControllers } from './course.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.Admin),
  validateRequest(CourseZodValidation.CreateCourseValidation),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourses);

router.get(
  '/:courseId',
  auth(USER_ROLE.Admin, USER_ROLE.Faculty, USER_ROLE.Student),
  CourseControllers.getSingleCourse,
);

router.patch(
  '/:courseId',
  auth(USER_ROLE.Admin),
  validateRequest(CourseZodValidation.UpdateCourseValidation),
  CourseControllers.updateCourse,
);

router.delete(
  '/:courseId',
  auth(USER_ROLE.Admin),
  CourseControllers.deleteCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.Admin),
  validateRequest(CourseZodValidation.AssignFacultiesValidation),
  CourseControllers.assignFaculties,
);

router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.Admin),
  validateRequest(CourseZodValidation.AssignFacultiesValidation),
  CourseControllers.removeFaculties,
);

export const CourseRoutes = router;
