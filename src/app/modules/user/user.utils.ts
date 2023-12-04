import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastEnrolledStudent = async () => {
  const lastStudent = await User.findOne({ role: 'Student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// auto generated code --> year semesterCode 4 digit number
export const generateStudentId = async (payload: IAcademicSemester) => {
  if (!payload) {
    throw new Error('Invalid payload'); // or handle this case as appropriate
  }

  const currentId = (await findLastEnrolledStudent()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
