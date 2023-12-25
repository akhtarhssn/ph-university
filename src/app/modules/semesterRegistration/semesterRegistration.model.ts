import mongoose, { Schema } from 'mongoose';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationStatus } from './semesterRegistration.constants';

const semesterRegistrationSchema = new mongoose.Schema<ISemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'Semester',
    unique: true,
    required: true,
  },
  status: {
    type: String,
    enum: SemesterRegistrationStatus,
    default: 'UPCOMING',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    remove: true,
  },
  minCredit: {
    type: Number,
    remove: true,
  },
  maxCredit: {
    type: Number,
    required: true,
  },
});

export const SemesterRegistrationModel = mongoose.model<ISemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
