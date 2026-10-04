import { FreshersArticle, ChecklistItem } from '../types';

export const freshersArticles: FreshersArticle[] = [
  {
    id: 'fa-1',
    title: 'Navigating SOIT Campus & Academic Blocks',
    category: 'getting-started',
    content: 'Saint Oxford Institute of Technology (SOIT) is organized into three major clusters: Academic Quad (Blocks A, B, and C), Innovation Center & Central Labs, and Student Amenities (Canteen, Hostels, and Sports Complex). Block A houses Administrative offices, Principal’s Room, and Electronics & Computer Engineering wings. Pick up your RFID student ID card at the Administrative Office (Ground Floor, Room 102) within your first 3 days.',
    icon: 'MapPin',
    order: 1
  },
  {
    id: 'fa-2',
    title: 'RFID Cards, Biometrics & Library Access',
    category: 'getting-started',
    content: 'Your Student ID card works as an access card for the Central Library, Digital Resource Center, and Hostel gates. The Central Library (Aryabhata Building, 1st & 2nd floor) allows borrowing up to 4 books simultaneously for 21 days with renewability online through Campusly. High-speed campus Wi-Fi credentials (SSID: SOIT-STUDENT) are generated using your PRN/Roll Number and default date of birth password.',
    icon: 'Key',
    order: 2
  },
  {
    id: 'fa-3',
    title: 'Understanding the Credit System & Continuous Evaluation',
    category: 'academic',
    content: 'Engineering programs follow an absolute/relative grading semester pattern. Each semester consists of Theory subjects (3–4 credits), Practical Labs (1–2 credits), and Continuous Internal Assessments (CIA). CIA accounts for 40% (two Mid-Semester In-Sem Tests of 20 marks each, plus tutorial assignments), while the End-Semester Examination accounts for 60%. A minimum 75% attendance in both lectures and practical labs is strictly mandated before semester exam hall tickets are issued.',
    icon: 'GraduationCap',
    order: 3
  },
  {
    id: 'fa-4',
    title: 'How to Ace Previous Year Question Papers (PYQs)',
    category: 'academic',
    content: 'In engineering university examinations, 65–70% of question patterns repeat concepts from the past 5 examination cycles. Use the Campusly "Exam Vault" to download solved previous year papers, model answer keys, and unit test question banks. Recommended strategy: complete unit syllabus notes first, then solve past 3 years’ Mid-Sem and End-Sem papers under timed 2-hour conditions.',
    icon: 'FileText',
    order: 4
  },
  {
    id: 'fa-5',
    title: 'Laboratory Protocols, Journals & Submission Deadlines',
    category: 'academic',
    content: 'Every engineering lab requires a standardized printed/handwritten lab journal with circuit diagrams, observation tables, and sample calculations verified weekly by lab faculty. Deadlines for journal certification happen two weeks before end-sem practicals. Never delay regular write-ups; faculty assign continuous assessment marks (15 marks per experiment) on a weekly basis.',
    icon: 'FlaskConical',
    order: 5
  },
  {
    id: 'fa-6',
    title: 'Clubs, Technical Societies & Hackathon Culture',
    category: 'campus-life',
    content: 'SOIT hosts over 18 active student organizations: IEEE SOIT Student Branch, GDG on Campus, Robotics Club (RoboTech), SAE Collegiate Club (Formula Student & Baja), Coding Syndicate, Literary & Debating Society, and Symphony (Music & Arts). Annual induction drives occur in the 3rd week of August. Joining at least one technical and one non-technical club helps build project portfolios for internships.',
    icon: 'Users',
    order: 6
  },
  {
    id: 'fa-7',
    title: 'Hostel Curfews, Mess Routine & Night Canteen',
    category: 'campus-life',
    content: 'Hostel gates close strictly at 9:30 PM on weekdays and 10:30 PM on weekends. Late entry permits must be submitted via the Hostel Warden Portal 4 hours in advance. Mess serves breakfast (7:30–9:00 AM), lunch (12:30–2:15 PM), high tea (5:00–6:00 PM), and dinner (7:30–9:30 PM). The Night Canteen near Block D stays open until 1:30 AM during exam weeks for hot coffee, rolls, and quick snacks.',
    icon: 'Coffee',
    order: 7
  },
  {
    id: 'fa-8',
    title: 'Sports Grounds, Gym & Recreation Center',
    category: 'campus-life',
    content: 'The campus features an Olympic-standard outdoor track, cricket and football grounds, 2 floodlit basketball courts, and an indoor sports complex (badminton, table tennis, chess). The gymnasium is free for all enrolled students and opens 6:00–9:00 AM and 4:30–8:30 PM with certified fitness trainers on duty.',
    icon: 'Activity',
    order: 8
  },
  {
    id: 'fa-9',
    title: 'Medical Health Center & 24/7 Campus Ambulance',
    category: 'contacts',
    content: 'The Campus Health Center is located behind Block B next to the Staff Quarters. A resident medical officer and nurse are on duty Monday–Saturday (8:00 AM – 8:00 PM). Free emergency first aid, prescription consultations, and essential medicines are available for students. Emergency campus ambulance helpline: +91 98200 11999.',
    icon: 'HeartPulse',
    order: 9
  },
  {
    id: 'fa-10',
    title: 'Anti-Ragging Committee & Student Grievance Cell',
    category: 'contacts',
    content: 'SOIT maintains a zero-tolerance policy towards ragging in any form. The Anti-Ragging Squad conducts 24/7 surprise hostel and campus inspections. Helplines: Dr. K. Srinivasan (Dean of Student Affairs) - Ext 204, National Anti-Ragging Helpline (Toll-Free): 1800-180-5522. Submissions can also be filed anonymously through the Campusly Grievance box.',
    icon: 'ShieldAlert',
    order: 10
  },
  {
    id: 'fa-11',
    title: 'Training & Placement Cell (T&P) Foundation',
    category: 'academic',
    content: 'Even as a fresher, understanding campus placement benchmarks is essential. Major tech and core engineering recruiters look for consistent CGPA (above 7.5), minimum 2 high-impact technical projects, open-source or hackathon contributions, and strong foundational knowledge in Data Structures, Circuit Design, or CAD tools. Register on the T&P Portal in your 3rd semester.',
    icon: 'Briefcase',
    order: 11
  },
  {
    id: 'fa-12',
    title: 'Essential Administration Contact Directory',
    category: 'contacts',
    content: 'Student Section (Scholarships, Bonafide, Concessions): Room 104, admin@soit.edu.in | Examination Cell (Grades, Re-evaluation, Transcripts): Room 202, exams@soit.edu.in | Central Accounts: Room 106, accounts@soit.edu.in | IT Support Helpdesk: Room 305, itsupport@soit.edu.in.',
    icon: 'PhoneCall',
    order: 12
  }
];

export const firstWeekChecklist: ChecklistItem[] = [
  {
    id: 'chk-1',
    title: 'Collect Physical Student ID & RFID Smart Card',
    description: 'Visit Room 102 in Administrative Block A with your admission fee receipt and 2 passport photos.',
    completed: true,
    day: 1
  },
  {
    id: 'chk-2',
    title: 'Activate Campus Wi-Fi & Microsoft 365 Account',
    description: 'Set up your official @soit.edu.in email address and connect your laptop/phone to SOIT-STUDENT Wi-Fi.',
    completed: true,
    day: 1
  },
  {
    id: 'chk-3',
    title: 'Locate Your Branch Department Office & Faculty Advisor',
    description: 'Introduce yourself to your Class Coordinator and note down your faculty mentor allotment notice.',
    completed: true,
    day: 2
  },
  {
    id: 'chk-4',
    title: 'Central Library Tour & Biometric Registration',
    description: 'Visit the 1st floor Aryabhata Building to complete book-borrowing registration and explore the reference section.',
    completed: false,
    day: 2
  },
  {
    id: 'chk-5',
    title: 'Procure Recommended Lab Coats & Stationery Essentials',
    description: 'White lab coat for Chemistry/Physics labs and engineering drawing board/instruments from Campus Stationery Mart.',
    completed: false,
    day: 3
  },
  {
    id: 'chk-6',
    title: 'Join Branch WhatsApp Group & Official Telegram Broadcast',
    description: 'Connect with class representatives (CRs) for regular timetable updates, class test announcements, and lab batches.',
    completed: false,
    day: 3
  },
  {
    id: 'chk-7',
    title: 'Set Up Campusly Profile & Bookmark Semester III Subjects',
    description: 'Customize your department and semester preferences to get personalized study materials and papers on your dashboard.',
    completed: true,
    day: 4
  },
  {
    id: 'chk-8',
    title: 'Attend Student Induction Program & Club Orientation',
    description: 'Join the Main Auditorium session at 4:30 PM to explore technical societies and cultural clubs.',
    completed: false,
    day: 5
  },
  {
    id: 'chk-9',
    title: 'Explore Nearby Food Joints, Xerox Shops & Metro Transit',
    description: 'Walk around Oxford Avenue outside Gate 2 to find quick budget lunch spots, 24/7 pharmacies, and photocopy centers.',
    completed: false,
    day: 6
  },
  {
    id: 'chk-10',
    title: 'Review Mid-Semester Exam Schedule & Study Planner',
    description: 'Add your first upcoming unit tests and assignment submission dates into your Campusly Study Planner.',
    completed: false,
    day: 7
  }
];

// Export alias for compatibility
export const checklistItems = firstWeekChecklist;
