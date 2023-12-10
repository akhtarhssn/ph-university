/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err: any, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An error occurred';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
