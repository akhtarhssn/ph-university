import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';

const UserSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, select: 0 },
    email: { type: String, required: true, unique: true },
    needPasswordChange: { type: Boolean, required: true, default: true },
    passwordChangedAt: { type: Date },
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
  const existingUser = await User.findOne({ id }).select('+password');
  return existingUser;
};

// check if password matches:
UserSchema.statics.isPasswordMatch = async (plainPass, hashedPass) => {
  return await bcrypt.compare(plainPass, hashedPass);
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

UserSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const idExists = await User.findOne(query);

  if (!idExists) {
    throw new AppError(404, `User with id: '${query._id}' doesn't exists`);
  }

  next();
});

// Post save middleware: will work on create() and save()
UserSchema.post('save', function (doc, next) {
  // console.log(this, 'Post Hook: will execute after saving data');
  doc.password = '';
  next();
});

UserSchema.statics.JwtIssueBeforePassChange = function (
  passwordChangedTimeStamp: Date,
  jwtIssueTimeStamp: number,
) {
  const passwordChangeTime =
    new Date(passwordChangedTimeStamp).getTime() / 1000;

  return passwordChangeTime > jwtIssueTimeStamp;
};

// create model:
export const User = model<IUser, UserModel>('User', UserSchema);
