import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const UserSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    needPasswordChange: { type: Boolean, required: true, default: true },
    role: {
      type: String,
      enum: ['Admin', 'Faculty', 'Student'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Blocked'],
      default: 'Active',
      required: true,
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

// create model:
export const User = model<IUser>('User', UserSchema);
