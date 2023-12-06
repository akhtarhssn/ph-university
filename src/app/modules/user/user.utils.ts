import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastEnrolledStudent = async () => {
  const lastStudent = await User.findOne({ role: 'Student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

// auto generated code --> year semesterCode 4 digit number
export const generateStudentId = async (payload: IAcademicSemester) => {
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid payload'); // or handle this case as appropriate
  }

  let currentId = (0).toString(); //by default

  const lastStudentId = await findLastEnrolledStudent();

  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentSemesterYear = payload.year;
  const currentSemesterCode = payload.code;

  if (
    lastStudentId &&
    lastStudentSemesterYear === currentSemesterYear &&
    lastStudentSemesterCode === currentSemesterCode
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
