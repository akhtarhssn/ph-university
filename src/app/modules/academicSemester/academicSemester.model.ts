import { Schema, model } from 'mongoose';
import { IAcademicSemester, IMonth } from './academicSemester.interface';

const Months: IMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const semesterSchema = new Schema<IAcademicSemester>({
  name: { type: String, enum: ['Autumn', 'Summer', 'Fall'], required: true },
  code: { type: String, enum: ['01', '02', '03'], required: true },
  year: { type: Date, required: true },
  startMonth: { type: String, enum: Months, required: true },
  endMonth: { type: String, enum: Months, required: true },
});

// create model:
export const SemesterModel = model<IAcademicSemester>(
  'Semester',
  semesterSchema,
);
