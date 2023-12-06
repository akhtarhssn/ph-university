import config from '../../config';
import { AppError } from '../../errors/AppError';
import { SemesterModel } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  // create a user object:
  const userData: Partial<IUser> = {};

  // if not password use default password
  userData.password = password || (config.default_password as string);

  // set Student Role.
  userData.role = 'Student';

  // find the admission semester id:
  const admissionSemester = await SemesterModel.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(404, 'Academic semester not found');
  }

  // set user id:
  userData.id = await generateStudentId(admissionSemester);

  // check duplicate email:
  const duplicateEmail = await Student.findOne({ email: payload.email });
  if (duplicateEmail) {
    throw new AppError(
      409,
      `An User with ${duplicateEmail.email} already exists`,
    );
  }

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user.
    payload.id = newUser.id;
    payload.userId = newUser._id; // reference id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
