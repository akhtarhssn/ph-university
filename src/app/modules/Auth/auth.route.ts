import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthZodValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthZodValidation.LoginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLE.Admin, USER_ROLE.Faculty, USER_ROLE.Student),
  validateRequest(AuthZodValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthZodValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
