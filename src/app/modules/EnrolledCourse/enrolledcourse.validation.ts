import { z } from 'zod';

const createEnrolledCourseValidation = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

const updateEnrolledCourseValidation = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    offeredCourse: z.string(),
    student: z.string(),
    courseMarks: z.object({
      classTest1: z.number(),
      midTerm: z.number(),
      classTest2: z.number(),
      finalTerm: z.number(),
    }),
  }),
});

export const EnrolledCourseValidation = {
  createEnrolledCourseValidation,
  updateEnrolledCourseValidation,
};
