import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudent = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getOneStudent = async (id: string) => {
  // const result = await Student.findOne({ id });

  // aggregate:
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudent = async (id: string, payload: IStudent) => {
  const result = await Student.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteOneStudent = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudent,
  getOneStudent,
  updateStudent,
  deleteOneStudent,
};
