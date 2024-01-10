import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { studentZodSchema } from '../student/student.validation';
import { UserController } from './user.controller';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.Admin),
  validateRequest(studentZodSchema.createStudentZodSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.Admin),
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  // auth(USER_ROLE.Admin),
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);

router.get(
  '/me',
  auth(USER_ROLE.Student, USER_ROLE.Faculty, USER_ROLE.Admin),
  UserController.getMe,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.Admin),
  validateRequest(UserValidation.StatusChange),
  UserController.changeStatus,
);

export const UserRoutes = router;
