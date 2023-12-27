import { z } from 'zod';

const LoginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'An ID is required' }),
    password: z.string({ required_error: 'The password is required' }),
  }),
});

export const LoginZodValidation = {
  LoginValidationSchema,
};
