import { z } from 'zod';

const CreateSemesterRegistrationZodSchema = z.object({
  body: z.object({}),
});
const UpdateSemesterRegistrationZodSchema = z.object({
  body: z.object({}),
});

export const SemesterRegistrationValidation = {
  CreateSemesterRegistrationZodSchema,
  UpdateSemesterRegistrationZodSchema,
};
