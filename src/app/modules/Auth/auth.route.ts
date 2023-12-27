import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { LoginZodValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(LoginZodValidation.LoginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
