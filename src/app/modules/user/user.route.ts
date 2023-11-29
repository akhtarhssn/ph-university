import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-student', UserController.createUser);

export const UserRoutes = router;
