import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
    },
    password: { type: String },
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

// mongoose document middleware:
// Pre save middleware: will work on create() and save()
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (user.password) {
    // Only hash the password if it's defined
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round),
    );
  }

  next();
});

// Post save middleware: will work on create() and save()
UserSchema.post('save', function (doc, next) {
  // console.log(this, 'Post Hook: will execute after saving data');
  doc.password = '';
  next();
});

// create model:
export const User = model<IUser, UserModel>('User', UserSchema);
