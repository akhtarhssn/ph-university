import config from '../../config';
import { SemesterModel } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  // Static methods:
  if (await User.userExists(payload.id)) {
    throw new Error(`ID: ${payload.id}, User already exists`);
  }

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
    throw new Error('Academic semester not found');
  }

  // set user id:
  userData.id = await generateStudentId(admissionSemester);

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
