import { Schema, model } from 'mongoose';
import { CourseFaculty, TCourse } from './course.interface';

const preRequisiteCoursesSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: Number,
      trim: true,
    },
    credits: {
      type: Number,
      trim: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const courseFacultySchema = new Schema<CourseFaculty>(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', unique: true },
    faculties: [{ type: Schema.Types.ObjectId, ref: 'Faculty' }],
  },
  {
    timestamps: true,
  },
);

export const CourseModel = model<TCourse>('Course', courseSchema);

export const CourseFacultyModel = model<CourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
