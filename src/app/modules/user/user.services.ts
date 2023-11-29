import { IUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (studentData: IUser) => {
  // instance methods:
  // const student = new Student(studentData); //create an instance
  // if (await student.userExists(studentData.id)) {
  //   throw new Error(`ID: ${studentData.id}, User already exists`);
  // }
  // const result = await student.save();

  // Static methods:
  if (await User.userExists(studentData.id)) {
    throw new Error(`ID: ${studentData.id}, User already exists`);
  }
  const result = await User.create(studentData);

  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
