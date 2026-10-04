// ===== ACADEMIC TYPES =====
export interface Department {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  description: string;
  hod: string;
  totalStudents: number;
  years: AcademicYear[];
}

export interface AcademicYear {
  id: string;
  name: string;
  year: number;
  semesters: Semester[];
}

export interface Semester {
  id: string;
  name: string;
  number: number;
  subjects: Subject[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  departmentId: string;
  semester: number;
  year: number;
  description: string;
  faculty?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  subjectId: string;
  departmentId: string;
  semester: number;
  year: number;
  author?: string;
  description: string;
  fileType: string;
  fileSize?: string;
  uploadDate: string;
  downloads: number;
  views: number;
  tags: string[];
  url?: string;
}

export type ResourceType =
  | 'textbook'
  | 'reference-book'
  | 'lecture-notes'
  | 'unit-notes'
  | 'previous-paper'
  | 'assignment'
  | 'question-bank'
  | 'class-test'
  | 'mid-sem-paper'
  | 'end-sem-paper'
  | 'practical-manual'
  | 'lab-experiment'
  | 'syllabus'
  | 'important-questions'
  | 'solved-examples'
  | 'faculty-recommendation';

// ===== BOOK TYPES =====
export interface Book {
  id: string;
  title: string;
  author: string;
  edition: string;
  publisher: string;
  departmentId: string;
  subjectId: string;
  description: string;
  coverColor: string;
  isbn?: string;
  pages?: number;
  year: number;
  category: 'textbook' | 'reference' | 'recommended';
  available: boolean;
  rating: number;
  tags: string[];
}

// ===== QUESTION PAPER TYPES =====
export interface QuestionPaper {
  id: string;
  subjectName: string;
  subjectCode: string;
  departmentId: string;
  semester: number;
  examYear: number;
  examType: ExamType;
  uploadDate: string;
  fileType: string;
  downloads: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export type ExamType =
  | 'end-semester'
  | 'mid-semester'
  | 'unit-test'
  | 'class-test'
  | 'practical'
  | 'supplementary';

// ===== ASSIGNMENT TYPES =====
export interface Assignment {
  id: string;
  title: string;
  subjectName: string;
  subjectCode: string;
  departmentId: string;
  semester: number;
  faculty?: string;
  uploadDate: string;
  deadline?: string;
  status: 'new' | 'important' | 'upcoming' | 'archived';
  type: 'assignment' | 'question-bank' | 'practice-set' | 'class-test';
  description: string;
  fileType: string;
  tags: string[];
}

// ===== ANNOUNCEMENT TYPES =====
export interface Announcement {
  id: string;
  title: string;
  description: string;
  content: string;
  category: AnnouncementCategory;
  date: string;
  time: string;
  department?: string;
  priority: 'normal' | 'important' | 'urgent';
  pinned: boolean;
  read: boolean;
  attachment?: string;
  author: string;
}

export type AnnouncementCategory =
  | 'general'
  | 'examination'
  | 'academic'
  | 'department'
  | 'events'
  | 'placement'
  | 'clubs'
  | 'holiday'
  | 'administrative'
  | 'emergency';

// ===== CAMPUS MAP TYPES =====
export interface CampusLocation {
  id: string;
  name: string;
  category: LocationCategory;
  building: string;
  floor?: number;
  description: string;
  facilities: string[];
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  icon: string;
  nearby: string[];
  openTime?: string;
  closeTime?: string;
}

export type LocationCategory =
  | 'academic'
  | 'administrative'
  | 'food'
  | 'hostel'
  | 'sports'
  | 'medical'
  | 'parking'
  | 'library'
  | 'lab'
  | 'other';

// ===== NEARBY PLACES TYPES =====
export interface NearbyPlace {
  id: string;
  name: string;
  category: NearbyCategory;
  subcategory: string;
  distance: string;
  rating: number;
  priceRange?: string;
  address: string;
  openingHours?: string;
  description: string;
  tags: string[];
  popular: boolean;
}

export type NearbyCategory =
  | 'food'
  | 'shopping'
  | 'entertainment'
  | 'transport'
  | 'services';

// ===== FRESHERS GUIDE TYPES =====
export interface FreshersArticle {
  id: string;
  title: string;
  category: 'getting-started' | 'academic' | 'campus-life' | 'contacts';
  content: string;
  icon: string;
  order: number;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  day: number;
}

// ===== STUDENT TYPES =====
export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  department: string;
  departmentId: string;
  year: number;
  semester: number;
  studentId: string;
  avatar?: string;
  role: 'student' | 'admin';
  joinedDate: string;
  preferences: StudentPreferences;
}

export interface StudentPreferences {
  theme: 'light' | 'dark';
  department: string;
  year: number;
  semester: number;
  notifications: boolean;
}

// ===== NOTIFICATION TYPES =====
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'deadline' | 'resource' | 'academic';
  date: string;
  read: boolean;
  link?: string;
}

// ===== OFFICE TIMINGS =====
export interface OfficeTimings {
  id: string;
  name: string;
  department?: string;
  location: string;
  weekdayOpen: string;
  weekdayClose: string;
  saturdayOpen?: string;
  saturdayClose?: string;
  sundayClosed: boolean;
  lunchBreak?: string;
  contactNumber?: string;
  contactEmail?: string;
  description: string;
  category: 'administrative' | 'academic' | 'support' | 'facility';
}

// ===== CALENDAR TYPES =====
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  type: 'exam' | 'deadline' | 'holiday' | 'event' | 'academic';
  description: string;
  department?: string;
}

// ===== STUDY PLANNER =====
export interface StudyTask {
  id: string;
  title: string;
  subject?: string;
  deadline?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}
