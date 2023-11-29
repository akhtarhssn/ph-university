/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  const message = err.message || 'An error occurred';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
});

export default app;
