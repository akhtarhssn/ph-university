import { z } from 'zod';

const ZodSchema = z.object({
  id: z.string(),
  password: z
    .string({
      invalid_type_error: 'Password must be a valid string',
    })
    .max(30, { message: 'Password cannot be more than 30 characters' })
    .optional(),
  needChangePassword: z.boolean().optional().default(true),
  role: z.enum(['Admin', 'Faculty', 'Student']),
  status: z.enum(['Active', 'Blocked']).default('Active'),
  isDelete: z.boolean().optional().default(false),
});

export const UserValidation = {
  ZodSchema,
};
