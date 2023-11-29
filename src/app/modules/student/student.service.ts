import { Student } from './student.model';

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
  getAllStudent,
  getOneStudent,
  deleteOneStudent,
};
