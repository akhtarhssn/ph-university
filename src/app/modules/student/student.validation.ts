import { z } from 'zod';

// Define Zod schema for UserName
const createUserNameZodSchema = z.object({
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
const createAddressZodSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
});

// Define Zod schema for Guardian
const createGuardianZodSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherPhone: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherPhone: z.string().min(1),
});

// Define Zod schema for LocalGuardian
const createLocalGuardianZodSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  occupation: z.string().min(1),
  address: createAddressZodSchema,
});

// Define Zod schema for the main Student model
const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().min(6).max(20),
    student: z.object({
      name: createUserNameZodSchema,
      gender: z.enum(['Male', 'Female']),
      birthDate: z.string().optional(),
      email: z.string().email(),
      phoneNumber: z.string(),
      emergencyPhoneNumber: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: createAddressZodSchema,
      permanentAddress: createAddressZodSchema,
      guardian: createGuardianZodSchema,
      localGuardian: createLocalGuardianZodSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string(),
    }),
  }),
});

// Update zod schema
const updateUserNameZodSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'First Name should be in capitalized format and alphabetic',
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'Last Name must be alphabetic',
    })
    .optional(),
});

// Define Zod schema for Address
const updateAddressZodSchema = z.object({
  street: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  postalCode: z.string().min(1).optional(),
});

// Define Zod schema for Guardian
const updateGuardianZodSchema = z.object({
  fatherName: z.string().min(1).optional(),
  fatherOccupation: z.string().min(1).optional(),
  fatherPhone: z.string().min(1).optional(),
  motherName: z.string().min(1).optional(),
  motherOccupation: z.string().min(1).optional(),
  motherPhone: z.string().min(1).optional(),
});

// Define Zod schema for LocalGuardian
const updateLocalGuardianZodSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(1).optional(),
  occupation: z.string().min(1).optional(),
  address: updateAddressZodSchema.optional(),
});

const updateStudentZodSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameZodSchema.optional(),
      gender: z.enum(['Male', 'Female']).optional(),
      birthDate: z.string().optional(),
      email: z.string().email().optional(),
      phoneNumber: z.string().optional(),
      emergencyPhoneNumber: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: updateAddressZodSchema.optional(),
      permanentAddress: updateAddressZodSchema.optional(),
      guardian: updateGuardianZodSchema.optional(),
      localGuardian: updateLocalGuardianZodSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentZodSchema = {
  createStudentZodSchema,
  updateStudentZodSchema,
};
