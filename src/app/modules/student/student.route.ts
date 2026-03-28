import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { StudentControllers } from './student.controller';
import { studentZodSchema } from './student.validation';

const router = express.Router();

// Get all the students:
router.get('/', StudentControllers.getStudents);

// get single student
router.get(
  '/:id',
  auth(USER_ROLE.Admin, USER_ROLE.Faculty),
  StudentControllers.getStudent,
);

router.patch(
  '/:id',
  validateRequest(studentZodSchema.updateStudentZodSchema),
  StudentControllers.updateStudent,
);

// delete single student
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
