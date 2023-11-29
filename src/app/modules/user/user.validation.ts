import { z } from 'zod';

const UserValidation = z.object({
  id: z.string(),
  password: z
    .string()
    .max(30, { message: 'Password cannot be more than 30 characters' }),
  needChangePassword: z.boolean().optional().default(true),
  role: z.enum(['Admin', 'Faculty', 'Student']),
  status: z.enum(['Active', 'Blocked']).default('Active'),
  isDelete: z.boolean().optional().default(false),
});
