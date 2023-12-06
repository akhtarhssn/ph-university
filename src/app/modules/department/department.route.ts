import express from 'express';
import { DepartmentController } from './department.controller';
import validateRequest from '../../middleware/validateRequest';
import { DepartmentValidation } from './department.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(DepartmentValidation.createDepartmentZodValidation),
  DepartmentController.createDepartment,
);

router.get('/', DepartmentController.getAllDepartments);

router.get('/:departmentId', DepartmentController.getSingleDepartment);

router.patch(
  '/:departmentId',
  validateRequest(DepartmentValidation.updateDepartmentZodValidation),
  DepartmentController.updateDepartment,
);

export const DepartmentRoutes = router;
