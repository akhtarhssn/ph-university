export interface IUser {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'Admin' | 'Faculty' | 'Student';
  status: 'Active' | 'Blocked';
  isDeleted: boolean;
}
