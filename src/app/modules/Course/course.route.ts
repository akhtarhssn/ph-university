import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseZodValidation } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseZodValidation.CreateCourseValidation),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourses);

router.get('/:courseId', CourseControllers.getSingleCourse);

router.patch(
  '/:courseId',
  validateRequest(CourseZodValidation.UpdateCourseValidation),
  CourseControllers.updateCourse,
);

router.patch('/:courseId', CourseControllers.deleteCourse);

export const CourseRoutes = router;
