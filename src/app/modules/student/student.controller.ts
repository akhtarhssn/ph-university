import { Request, Response } from 'express';
import { StudentServices } from './student.service';

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
  getStudents,
  getStudent,
  deleteStudent,
};
