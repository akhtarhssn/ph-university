import { Schema, model } from 'mongoose';
import { IAcademicSemester } from './academicSemester.interface';
import {
  Months,
  SemesterCodeSchema,
  SemesterNameSchema,
} from './academicSemester.constant';

const SemesterSchema = new Schema<IAcademicSemester>(
  {
    name: { type: String, enum: SemesterNameSchema, required: true },
    code: { type: String, enum: SemesterCodeSchema, required: true },
    year: { type: String, required: true },
    startMonth: { type: String, enum: Months, required: true },
    endMonth: { type: String, enum: Months, required: true },
  },
  {
    timestamps: true,
  },
);

// pre hook middleware:
SemesterSchema.pre('save', async function (next) {
  const semesterExists = await SemesterModel.findOne({
    year: this.year,
    name: this.name,
  });

  if (semesterExists) {
    throw new Error(
      `${this.name} semester already exists for year ${this.year}`,
    );
  }
  next();
});

// create model:
export const SemesterModel = model<IAcademicSemester>(
  'Semester',
  SemesterSchema,
);
