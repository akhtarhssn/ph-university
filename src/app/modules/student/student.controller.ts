import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentZodSchema from './student.validation';
// import studentValidationSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // Joi schema
    // const { error, value } = studentValidationSchema.validate(studentData);
    const zodValidation = studentZodSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodValidation);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error,
    //     // error: error.details[0].message,
    //   });
    // }

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
      // error: (err as Error).message,
      // error: err.issues[0].message,
    });
  }
};

// Get all students
const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudent();

    res.status(200).json({
      success: true,
      message: 'Students data retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: (err as Error).message,
    });
  }
};

// Get single student
const getStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getOneStudent(id);

    res.status(200).json({
      success: true,
      message: 'Student found successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: (err as Error).message,
    });
  }
};

// Delete single student
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteOneStudent(id);

    res.status(200).json({
      success: true,
      message: 'Student Deleted successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: (err as Error).message,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getStudents,
  getStudent,
  deleteStudent,
};
