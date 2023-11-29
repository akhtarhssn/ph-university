import { IStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: IStudent) => {
  // instance methods:
  // const student = new Student(studentData); //create an instance
  // if (await student.userExists(studentData.id)) {
  //   throw new Error(`ID: ${studentData.id}, User already exists`);
  // }
  // const result = await student.save();

  // Static methods:
  if (await Student.userExists(studentData.id)) {
    throw new Error(`ID: ${studentData.id}, User already exists`);
  }
  const result = await Student.create(studentData);

  return result;
};

const getAllStudent = async () => {
  const result = await Student.find();
  return result;
};

const getOneStudent = async (id: string) => {
  // const result = await Student.findOne({ id });

  // aggregate:
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteOneStudent = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudent,
  getOneStudent,
  deleteOneStudent,
};
