import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { studentZodSchema } from '../student/student.validation';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentZodSchema.createStudentZodSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
