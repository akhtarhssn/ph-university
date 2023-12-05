import { Schema, model } from 'mongoose';
import { IDepartment as IDepartment } from './department.interface';

const departmentSchema = new Schema<IDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'Faculty',
  },
});

export const DepartmentModel = model<IDepartment>(
  'Department',
  departmentSchema,
);
