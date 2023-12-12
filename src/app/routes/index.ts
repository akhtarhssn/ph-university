import { Router } from 'express';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { DepartmentRoutes } from '../modules/department/department.route';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

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
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/departments',
    route: DepartmentRoutes,
  },
];

moduleRotes.forEach((route) => router.use(route.path, route.route));

export default router;
