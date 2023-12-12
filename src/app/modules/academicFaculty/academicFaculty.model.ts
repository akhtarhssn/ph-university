import { Schema, model } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AppError } from '../../errors/AppError';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);
academicFacultySchema.pre('save', async function (next) {
  const isExists = await AcademicFacultyModel.findOne({ name: this.name });

  if (isExists) {
    throw new AppError(409, `${this.name} already exists`);
  }
  next();
});
academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const idExists = await AcademicFacultyModel.findOne(query);

  if (!idExists) {
    throw new AppError(404, `Faculty with id: '${query._id}' doesn't exists`);
  }

  next();
});

export const AcademicFacultyModel = model<IAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
