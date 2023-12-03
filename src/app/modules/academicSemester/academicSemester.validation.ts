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
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

const updateSemesterZodSchema = z.object({
  body: z.object({
    name: z.enum([...SemesterNameSchema] as [string, ...string[]]).optional(),
    code: z.enum([...SemesterCodeSchema] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
});

export const SemesterValidation = {
  createSemesterZodSchema,
  updateSemesterZodSchema,
};
