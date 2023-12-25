import mongoose from 'mongoose';
import { ISemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new mongoose.Schema<ISemesterRegistration>(
  {},
);

export const SemesterRegistrationModel = mongoose.model<ISemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
