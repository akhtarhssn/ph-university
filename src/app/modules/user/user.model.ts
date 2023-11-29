import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const UserSchema = new Schema<IUser, UserModel>(
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
      required: true,
      default: 'Active',
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

// Custom static methods:
UserSchema.statics.userExists = async (id: string) => {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

// create model:
export const User = model<IUser, UserModel>('User', UserSchema);
