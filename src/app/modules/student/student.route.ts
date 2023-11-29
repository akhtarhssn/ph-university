import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// Get all the students:
router.get('/', StudentControllers.getStudents);

// get single student
router.get('/:id', StudentControllers.getStudent);

// delete single student
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
