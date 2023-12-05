import { z } from 'zod';

const createDepartmentZodValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Department name must be a valid string value',
      required_error: 'Department name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty must be a valid string value',
      required_error: 'Academic Faculty is required',
    }),
  }),
});

const updateDepartmentZodValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Department name must be a valid string value',
        required_error: 'Department name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Faculty must be a valid string value',
        required_error: 'Academic Faculty is required',
      })
      .optional(),
  }),
});

export const DepartmentValidation = {
  createDepartmentZodValidation,
  updateDepartmentZodValidation,
};
