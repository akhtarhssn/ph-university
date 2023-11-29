import config from '../../config';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: IStudent) => {
  // Static methods:
  // if (await User.userExists(studentData.id)) {
  //   throw new Error(`ID: ${studentData.id}, User already exists`);
  // }

  // create a user object:
  const userData: Partial<IUser> = {};

  // set user id:
  userData.id = '2023110001';

  // if not password use default password
  userData.password = password || (config.default_password as string);

  // set Student Role.
  userData.role = 'Student';

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user.
    studentData.id = newUser.id;
    studentData.userId = newUser._id; // reference id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
