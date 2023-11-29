import { Request, Response } from 'express';
import { UserServices } from './user.services';
import { UserValidation } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { userData: userData } = req.body;

    // Joi schema
    // const { error, value } = studentValidationSchema.validate(studentData);
    const zodValidation = UserValidation.ZodSchema.parse(userData);

    const result = await UserServices.createStudentIntoDB(zodValidation);

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
  createUser,
};
