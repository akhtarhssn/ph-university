import express from 'express';
import { SemesterControllers } from './academicsemester.controller';

const router = express.Router();

router.post('/create-semester', SemesterControllers.createSemester);

export const SemesterRoutes = router;
