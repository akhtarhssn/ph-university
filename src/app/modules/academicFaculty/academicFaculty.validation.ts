import { z } from 'zod';

const createFacultyZodValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Faculty must be a string value',
    }),
  }),
});

const updateFacultyZodValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Faculty must be a string value',
    }),
  }),
});

export const FacultyValidation = {
  createFacultyZodValidation,
  updateFacultyZodValidation,
};
