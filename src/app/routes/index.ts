import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';

const router = Router();

const moduleRotes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semester',
    route: SemesterRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
];

moduleRotes.forEach((route) => router.use(route.path, route.route));

export default router;
