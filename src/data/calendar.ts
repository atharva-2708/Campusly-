import { CalendarEvent } from '../types';

export const calendarEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Commencement of Mid-Semester Internal Tests (CIA-1)',
    date: '2026-10-14',
    endDate: '2026-10-19',
    type: 'exam',
    description: 'In-semester examinations for all B.Tech Semester III, V, and VII branches. Morning session: 10 AM - 12 PM.',
    department: 'Examination Cell'
  },
  {
    id: 'event-2',
    title: 'Texas Instruments & Qualcomm Pre-Placement Talk',
    date: '2026-10-08',
    type: 'event',
    description: 'Hardware core recruitment presentation and technical interview overview at Kalam Main Auditorium, 02:00 PM.',
    department: 'dept-extc'
  },
  {
    id: 'event-3',
    title: 'National Scholarship Biometric Verification Deadline',
    date: '2026-10-10',
    type: 'deadline',
    description: 'Last date to submit physical income documents and biometric authentication at Student Welfare Desk (Room 104).',
    department: 'Central Administration'
  },
  {
    id: 'event-4',
    title: 'Dussehra / Vijayadashami (Institutional Holiday)',
    date: '2026-10-20',
    type: 'holiday',
    description: 'Institute and administrative offices will remain closed.',
    department: undefined
  },
  {
    id: 'event-5',
    title: 'Assignment 1 Submission: Analog Electronics (EXTC201)',
    date: '2026-10-15',
    type: 'deadline',
    description: 'Submit BJT multistage amplifier derivations and LTSpice simulation plots to Prof. Kulkarni.',
    department: 'dept-extc'
  },
  {
    id: 'event-6',
    title: 'Field Industrial Visit to Tata Power Hydroelectric Station',
    date: '2026-10-25',
    type: 'academic',
    description: 'One-day technical tour for Electrical and Electronics Engineering students. Buses depart from Gate 1 at 06:30 AM.',
    department: 'dept-extc'
  },
  {
    id: 'event-7',
    title: 'HackTheCampus 2.0: 36-Hour Hackathon Registrations Close',
    date: '2026-10-18',
    type: 'deadline',
    description: 'Final deadline for team registration (2-4 members) for IEEE SOIT flagship annual hackathon.',
    department: 'dept-comp'
  },
  {
    id: 'event-8',
    title: 'IEEE HackTheCampus 2.0 Prototype Hackathon Live',
    date: '2026-10-24',
    endDate: '2026-10-25',
    type: 'event',
    description: '36-hour non-stop prototyping weekend at Turing AI Innovation Center with industry mentors and cloud compute credits.',
    department: 'dept-comp'
  },
  {
    id: 'event-9',
    title: 'Diwali Institutional Vacation Begins',
    date: '2026-11-06',
    endDate: '2026-11-14',
    type: 'holiday',
    description: 'Festival of Lights holidays. Academic lectures and labs suspend. College reopens on Monday, November 16.',
    department: undefined
  },
  {
    id: 'event-10',
    title: 'Display of CIA-1 Mid-Semester Marks & Grievance Redressal',
    date: '2026-10-28',
    type: 'academic',
    description: 'Internal evaluation scorecards published on Campusly. Students can inspect answer booklets with course faculty.',
    department: 'Examination Cell'
  },
  {
    id: 'event-11',
    title: 'Mid-Term Capstone Project Synopsis Defense for Final Year',
    date: '2026-10-20',
    endDate: '2026-10-22',
    type: 'academic',
    description: 'Departmental review committee presentations for B.Tech Seventh-Semester major design projects.',
    department: 'Academic Council'
  },
  {
    id: 'event-12',
    title: 'Assignment 2 Submission: Operating Systems (COMP202)',
    date: '2026-10-19',
    type: 'deadline',
    description: 'Submit POSIX multi-threaded producer-consumer code and execution screenshots to Prof. Sundaram.',
    department: 'dept-comp'
  },
  {
    id: 'event-13',
    title: 'Symphony 2026 Cultural Fest: Core Committee Selections',
    date: '2026-10-17',
    type: 'event',
    description: 'Interviews for cultural, technical, and stage management student heads at Student Activity Center.',
    department: 'Student Council'
  },
  {
    id: 'event-14',
    title: 'Guru Nanak Jayanti (Institutional Holiday)',
    date: '2026-11-24',
    type: 'holiday',
    description: 'Institute, library, and administrative offices will observe holiday.',
    department: undefined
  },
  {
    id: 'event-15',
    title: 'Symphony 2026: Annual Inter-College Mega Fest',
    date: '2026-11-18',
    endDate: '2026-11-21',
    type: 'event',
    description: 'Four days of concerts, battle of bands, hackathons, robo-wars, esports, and celebrity pro-nights.',
    department: 'Student Council'
  },
  {
    id: 'event-16',
    title: 'Term-End Submission of Laboratory Certified Journals',
    date: '2026-11-27',
    type: 'deadline',
    description: 'Mandatory completion of all lab experiment write-ups and faculty signatures before final practical exam eligibility.',
    department: 'Academic Council'
  },
  {
    id: 'event-17',
    title: 'End-Semester Practical and Oral (Viva-Voce) Examinations',
    date: '2026-12-01',
    endDate: '2026-12-08',
    type: 'exam',
    description: 'External university examiners conducting laboratory viva and practical demonstrations across all departments.',
    department: 'Examination Cell'
  },
  {
    id: 'event-18',
    title: 'Study Preparation Leave (PL) for End-Semester Theory Exams',
    date: '2026-12-09',
    endDate: '2026-12-13',
    type: 'academic',
    description: 'Intensive preparation week. Central Library reading rooms open 24/7 with special faculty doubt clearing hours.',
    department: 'Central Administration'
  },
  {
    id: 'event-19',
    title: 'University End-Semester Theory Examinations Commence',
    date: '2026-12-14',
    endDate: '2026-12-30',
    type: 'exam',
    description: 'Final university theory papers for odd semester (Sem I, III, V, VII). Hall tickets mandatory.',
    department: 'Examination Cell'
  },
  {
    id: 'event-20',
    title: 'Christmas & Winter Semester Break Begins',
    date: '2026-12-31',
    endDate: '2027-01-10',
    type: 'holiday',
    description: 'Winter break for students. Even semester classes (Sem IV, VI, VIII) resume on January 11, 2027.',
    department: 'Central Administration'
  }
];
