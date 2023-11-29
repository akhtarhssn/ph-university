import { Request, Response } from 'express';
// import studentZodSchema from '../student/student.validation';
import { UserServices } from './user.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    // const zodValidation = studentZodSchema.parse(studentData);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: (err as Error).message || 'Something went wrong',
      error: err,
    });
  }
};

export const UserController = {
  createStudent,
};
