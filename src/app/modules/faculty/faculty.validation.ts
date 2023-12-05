import { z } from 'zod';

const facultyZodValidation = z.object({
  name: z.string({
    invalid_type_error: 'Faculty must be a string value',
  }),
});

export const FacultyValidation = {
  facultyZodValidation,
};
