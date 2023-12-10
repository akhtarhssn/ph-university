/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { handleZodError } from '../errors/handleZodError';
import { IErrorSources } from '../interface/error.interface';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  let errorSources: IErrorSources = [
    {
      path: '',
      message: 'Something went wrong 2',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  return res.status(statusCode).json({
    statusCode: statusCode,
    success: false,
    message,
    errorSources,

    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

/* Error Patters

  Success:
  Message:
  ErrorSources: [{Path, Message}]
  
*/
