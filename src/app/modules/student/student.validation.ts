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
const studentZodSchema = z.object({
  id: z.string(),
  name: userNameZodSchema,
  password: z.string().max(30),
  gender: z.enum(['Male', 'Female']),
  birthDate: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  emergencyPhoneNumber: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: addressZodSchema,
  permanentAddress: addressZodSchema,
  guardian: guardianZodSchema,
  localGuardian: localGuardianZodSchema,
  profileImg: z.string(),
  isActive: z.enum(['Active', 'Blocked']).default('Active'),
  isDeleted: z.boolean(),
});

export default studentZodSchema;
