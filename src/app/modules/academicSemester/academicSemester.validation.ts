import { z } from 'zod';
import {
  Months,
  SemesterCodeSchema,
  SemesterNameSchema,
} from './academicSemester.constant';

const createSemesterZodSchema = z.object({
  body: z.object({
    name: z.enum([...SemesterNameSchema] as [string, ...string[]]),
    code: z.enum([...SemesterCodeSchema] as [string, ...string[]]),
    year: z.date(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const SemesterValidation = {
  createSemesterZodSchema,
};
