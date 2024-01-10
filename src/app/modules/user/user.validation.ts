import { z } from 'zod';
import { UserStatus } from './user.constant';

const ZodSchema = z.object({
  id: z.string(),
  password: z
    .string({
      invalid_type_error: 'Password must be a valid string',
    })
    .max(30, { message: 'Password cannot be more than 30 characters' })
    .optional(),
  needPasswordChange: z.boolean().optional().default(true),
  role: z.enum(['Admin', 'Faculty', 'Student']),
  status: z.enum(['Active', 'Blocked']).default('Active'),
  isDeleted: z.boolean().optional().default(false),
});

const StatusChange = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  ZodSchema,
  StatusChange,
};
