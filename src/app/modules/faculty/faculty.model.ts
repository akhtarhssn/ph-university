import { Schema, model } from 'mongoose';
import { IFaculty } from './faculty.interface';
import { AppError } from '../../errors/AppError';

const facultySchema = new Schema<IFaculty>(
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

facultySchema.pre('save', async function (next) {
  const isExists = await FacultyModel.findOne({ name: this.name });

  if (isExists) {
    throw new AppError(409, `${this.name} already exists`);
  }
  next();
});

facultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const idExists = await FacultyModel.findOne(query);

  if (!idExists) {
    throw new AppError(404, `Faculty with id: '${query._id}' doesn't exists`);
  }

  next();
});

export const FacultyModel = model<IFaculty>('Faculty', facultySchema);
