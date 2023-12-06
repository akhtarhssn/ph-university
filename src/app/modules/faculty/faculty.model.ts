import { Schema, model } from 'mongoose';
import { IFaculty } from './faculty.interface';

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
    throw new Error(`${this.name} already exists`);
  }
  next();
});

facultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const idExists = await FacultyModel.findOne(query);

  if (!idExists) {
    throw new Error(`Faculty with id: '${query._id}' doesn't exists`);
  }

  next();
});

export const FacultyModel = model<IFaculty>('Faculty', facultySchema);
