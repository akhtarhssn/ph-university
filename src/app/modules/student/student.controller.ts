import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

// Get all students
const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudent();

    res.status(200).json({
      success: true,
      message: 'Students data retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Get single student
const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getOneStudent(id);

    res.status(200).json({
      success: true,
      message: 'Student found successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Delete single student
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteOneStudent(id);

    res.status(200).json({
      success: true,
      message: 'Student Deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getStudents,
  getStudent,
  deleteStudent,
};
