import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { LoginZodValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(LoginZodValidation.LoginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLE.Admin, USER_ROLE.Faculty, USER_ROLE.Student),
  validateRequest(LoginZodValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
