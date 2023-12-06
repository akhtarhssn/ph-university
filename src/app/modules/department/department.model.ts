import { Schema, model } from 'mongoose';
import { IDepartment as IDepartment } from './department.interface';
import { AppError } from '../../utils/AppError';

const departmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
  },
);

departmentSchema.pre('save', async function (next) {
  const isExists = await DepartmentModel.findOne({ name: this.name });

  if (isExists) {
    throw new AppError(409, `${this.name} already exists`);
  }
  next();
});

departmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const idExists = await DepartmentModel.findOne(query);

  if (!idExists) {
    throw new AppError(
      404,
      `Department with id: '${query._id}' doesn't exists`,
    );
  }

  next();
});

export const DepartmentModel = model<IDepartment>(
  'Department',
  departmentSchema,
);
