import Joi from 'joi';

// creating a schema validation using JOI.

// Define JOI schema for UserName
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .pattern(/^[A-Z][a-z]*$/),
  middleName: Joi.string(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Z][a-z]*$/),
});

// Define JOI schema for Address
const addressValidationSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  postalCode: Joi.string().required(),
});

// Define JOI schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherPhone: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherPhone: Joi.string().required(),
});

// Define JOI schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  occupation: Joi.string().required(),
  address: addressValidationSchema.required(),
});

// Define JOI schema for the main Student model
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('Male', 'Female').required(),
  birthDate: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  emergencyPhoneNumber: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: addressValidationSchema.required(),
  permanentAddress: addressValidationSchema.required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('Active', 'Blocked').default('Active'),
});

// creating a schema validation using JOI END.

export default studentValidationSchema;
