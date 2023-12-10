import { ZodError, ZodIssue } from 'zod';
import { IErrorSources } from '../interface/error.interface';

export const handleZodError = (err: ZodError) => {
  const statusCode = 400;
  const errorSources: IErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: 'Validation failure',
    errorSources,
  };
};
