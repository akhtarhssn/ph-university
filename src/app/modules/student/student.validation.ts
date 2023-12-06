import { z } from 'zod';

// Define Zod schema for UserName
const userNameZodSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'First Name should be in capitalized format and alphabetic',
    }),
  middleName: z.string(),
  lastName: z
    .string()
    .min(1)
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'Last Name must be alphabetic',
    }),
});

// Define Zod schema for Address
const addressZodSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
});

// Define Zod schema for Guardian
const guardianZodSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherPhone: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherPhone: z.string().min(1),
});

// Define Zod schema for LocalGuardian
const localGuardianZodSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  occupation: z.string().min(1),
  address: addressZodSchema,
});

// Define Zod schema for the main Student model
const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().min(6).max(20),
    student: z.object({
      name: userNameZodSchema,
      gender: z.enum(['Male', 'Female']),
      birthDate: z.string().optional(),
      email: z.string().email(),
      phoneNumber: z.string(),
      emergencyPhoneNumber: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: addressZodSchema,
      permanentAddress: addressZodSchema,
      guardian: guardianZodSchema,
      localGuardian: localGuardianZodSchema,
      admissionSemester: z.string(),
      profileImg: z.string(),
    }),
  }),
});

const updateStudentZodSchema = z.object({
  body: z.object({
    student: z.object({
      name: userNameZodSchema.optional(),
      gender: z.enum(['Male', 'Female']).optional(),
      birthDate: z.string().optional(),
      email: z.string().email().optional(),
      phoneNumber: z.string().optional(),
      emergencyPhoneNumber: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: addressZodSchema.optional(),
      permanentAddress: addressZodSchema.optional(),
      guardian: guardianZodSchema.optional(),
      localGuardian: localGuardianZodSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentZodSchema = {
  createStudentZodSchema,
  updateStudentZodSchema,
};
