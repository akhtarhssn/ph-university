import { IAcademicSemester } from '../academicSemester/academicSemester.interface';

// auto generated code --> year semesterCode 4 digit number
export const generateStudentId = async (payload: IAcademicSemester) => {
  if (!payload) {
    throw new Error('Invalid payload'); // or handle this case as appropriate
  }

  const currentId = (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
