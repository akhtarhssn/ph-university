import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentZodSchema } from './student.validation';

const router = express.Router();

// Get all the students:
router.get('/', StudentControllers.getStudents);

// get single student
router.get('/:id', StudentControllers.getStudent);

router.patch(
  '/:id',
  validateRequest(studentZodSchema.updateStudentZodSchema),
  StudentControllers.updateStudent,
);

// delete single student
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
