import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  IAddress,
  IGuardian,
  ILocalGuardian,
  IStudent,
  IUserName,
  // StudentMethods,
  StudentModel,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    validate: {
      validator: function (value: string) {
        const toCapitalize = value.charAt(0).toUpperCase() + value.slice(1);
        return toCapitalize === value;
      },
      message: '{VALUE} should be capitalized format',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: 'Last Name must be alphabetic, {VALUE} is not a valid name',
    },
  },
});

const addressSchema = new Schema<IAddress>({
  street: { type: String, required: [true, 'Street address is required'] },
  city: { type: String, required: [true, 'City name is required'] },
  postalCode: { type: String, required: [true, 'Post code is required'] },
});

const guardianSchema = new Schema<IGuardian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is requires'],
  },
  fatherPhone: {
    type: String,
    required: [true, 'Father phone number is required'],
  },
  motherName: { type: String, required: [true, 'Mother name is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherPhone: {
    type: String,
    required: [true, 'Mother phone number is required'],
  },
});

const localGuardianSchema = new Schema<ILocalGuardian>({
  name: { type: String, required: [true, 'Local Guardian name is required'] },
  email: { type: String, required: [true, 'Local Guardian email is required'] },
  phone: {
    type: String,
    required: [true, 'Local Guardian phone number is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian occupation is required'],
  },
  address: {
    type: addressSchema,
    required: [true, 'Local Guardian address is required'],
  },
});

const StudentSchema = new Schema<IStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name field is required'],
      trim: true,
    },
    password: { type: String, required: [true, 'Password is required'] },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female'],
        message:
          // "The gender field can only be one of the following: 'Male' or 'Female'",
          '{VALUE} is not a valid gender',
      },
      required: true,
      trim: true,
    },
    birthDate: {
      type: String,
      required: [true, 'Birth date is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Student email is required'],
      unique: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email address',
      },
    },
    phoneNumber: {
      type: String,
      required: [true, 'Student phone number is required'],
      unique: true,
      trim: true,
    },
    emergencyPhoneNumber: {
      type: String,
      required: [true, 'Student emergency phone number is required'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      trim: true,
    },
    presentAddress: {
      type: addressSchema,
      required: [true, 'Student present address is required'],
      trim: true,
    },
    permanentAddress: {
      type: addressSchema,
      required: [true, 'Student permanent address is required'],
      trim: true,
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Student guardian is required'],
      trim: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Student local guardian is required'],
      trim: true,
    },
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: ['Active', 'Blocked'],
      default: 'Active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    //
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// mongoose document middleware:
// Pre save middleware: will work on create() and save()
StudentSchema.pre('save', async function (next) {
  // console.log(this, 'Pre Hook: will execute before saving data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // password hashing and saving password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// Post save middleware: will work on create() and save()
StudentSchema.post('save', function (doc, next) {
  // console.log(this, 'Post Hook: will execute after saving data');
  doc.password = '';
  next();
});

// Mongoose Virtual:
StudentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// Mongoose query middleware:
// filter all data
StudentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); //it works

  this.match({ isDeleted: { $ne: true } }); //it works

  next();
});

// Custom instance methods:
// StudentSchema.methods.userExists = async (id: string) => {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// Custom static methods:
StudentSchema.statics.userExists = async (id: string) => {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// create model:
export const Student = model<IStudent, StudentModel>('Student', StudentSchema);
