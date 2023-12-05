import { Types } from 'mongoose';

export interface IDepartment {
  name: string;
  academicFaculty: Types.ObjectId;
}
