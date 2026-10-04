import { StudentProfile } from '../types';

export const defaultStudent: StudentProfile = {
  id: 'std-1',
  name: 'Atharv',
  email: 'atharv@soit.edu.in',
  department: 'Electronics Engineering',
  departmentId: 'dept-extc',
  year: 2,
  semester: 3,
  studentId: 'SOIT24EXTC001',
  role: 'student',
  joinedDate: '2024-08-01',
  preferences: {
    theme: 'light',
    department: 'dept-extc',
    year: 2,
    semester: 3,
    notifications: true
  }
};

export const adminUser: StudentProfile = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@soit.edu.in',
  department: 'Administration',
  departmentId: 'dept-admin',
  year: 0,
  semester: 0,
  studentId: 'ADMIN001',
  role: 'admin',
  joinedDate: '2020-01-01',
  preferences: {
    theme: 'light',
    department: 'dept-admin',
    year: 0,
    semester: 0,
    notifications: true
  }
};
