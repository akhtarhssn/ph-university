import { z } from 'zod';

const createEnrolledCourseValidation = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

export const EnrolledCourseValidation = {
  createEnrolledCourseValidation,
};
