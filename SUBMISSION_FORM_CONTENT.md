# CAMPUSLY — Exact Submission Form Content

> **Instructions for Use:** Copy and paste the ready-to-use content directly into standard hackathon submission forms (Devpost, HackerEarth, Unstop, Google Forms, or DEV Challenge submission fields). Only replace the bracketed placeholders (`[...]`) with your personal details or links.

---

### Quick Reference Summary Table

| Field Name | Ready-to-Copy Content |
| :--- | :--- |
| **Project Title** | Campusly — The Unified Student Campus & Academic Hub |
| **Tagline** | Your Campus. Everything Connected. |
| **Short Description** | A student-centric web app unifying college curricula, solved exam archives, campus notices, an interactive vector map, and live office timings into a single, warm editorial command center. |
| **GitHub Repository** | `https://github.com/[your-github-username]/campusly` |
| **Live Demo URL** | `https://[your-app-subdomain].onrender.com` |
| **Video Demo URL** | `https://youtu.be/[your-demo-video-id]` |
| **Primary Category** | Education / Student Life / Web Application |
| **License** | MIT License |

---

### Detailed Form Field Responses

#### 1. Project Title
Campusly — The Unified Student Campus & Academic Hub

#### 2. Short Tagline / Pitch (under 100 characters)
Your Campus. Everything Connected. Academic resources, navigation, and student life in one place.

#### 3. Short Description (approx. 50 words)
Campusly is a unified student-centric college platform that consolidates academic curricula across 11 engineering departments, an archive of 30+ solved past exam papers, real-time campus notices, an interactive vector campus map, and live office open/closed calculations into an editorial, publication-grade web application.

#### 4. Long / Detailed Description (approx. 200–250 words)
Modern university life suffers from widespread digital fragmentation. Crucial syllabus files and book lists are scattered across informal chat groups; past exam question papers remain trapped in physical photocopy shops; administrative circulars are buried in email threads; and students frequently walk across campus only to find offices closed for lunch.

Campusly re-imagines campus software from the student's perspective. Designed with an editorial "Analog Campus" aesthetic—using warm ivory, paper cream, deep forest green, and classic serif typography—Campusly provides students with a single, reliable command center for both their studies and campus logistics.

Key highlights include:
- **Curriculum & Reading Room:** Complete 4-year curricula for 11 engineering disciplines paired with a 35-volume textbook archive.
- **Exam Vault:** 30+ verified previous year question papers with an interactive solved examination paper modal.
- **Interactive SVG Map:** A custom vector blueprint of the campus featuring pan/zoom controls and building inspection drawers.
- **Live Office Timings:** Dynamic client-side calculation that checks real local time against office schedules and lunch breaks to display real-time green "OPEN NOW" or red "CLOSED" status indicators.
- **Student Utilities:** A personal coursework study task planner, saved shelf bookmarks, freshers’ survival guides, and a 30-spot curated guide to nearby student eateries and transit.

Built with React 18, TypeScript, Vite, and Tailwind CSS v4, Campusly runs with zero backend friction and stores all user data privately in client-side storage.

#### 5. Problem Statement
College students face extreme information fragmentation across their academic journey:
- Syllabi, notes, and textbook lists are passed around through temporary WhatsApp groups and broken Google Drive links.
- Previous year question papers (PYQs) are hard to locate and archive.
- Students waste significant time walking across sprawling campuses to administrative counters (e.g., Exam Cell, Student Section, Accounts) only to find them closed for unannounced lunch breaks.
- Incoming freshers struggle to locate classrooms, labs, and amenities.
- Traditional college ERP systems are bloated, visually unattractive, and designed for administrative bookkeeping rather than daily student productivity.

#### 6. Solution
Campusly addresses these pain points through a unified, zero-latency single-page web application. It integrates academic curricula, solved exam archives, campus notices, an interactive vector map, and real-time office availability tracking into one cohesive interface. Students can view active course materials, practice past papers, navigate between campus buildings, check whether an office is open right now, and manage their coursework tasks from any desktop or mobile browser.

#### 7. Technologies Used
- **Frontend Framework:** React 18 (TypeScript 5.8)
- **Build Engine:** Vite 8 (Rollup/Rolldown production bundling)
- **Styling & Tokens:** Tailwind CSS v4 with custom CSS variables
- **Motion & Interactions:** Framer Motion
- **Iconography:** Lucide React
- **Typography:** DM Serif Display, DM Sans, DM Mono
- **State Management & Persistence:** React Context API + Browser LocalStorage
- **Hosting / Deployment:** Static Web Hosting (Render / Vercel / Netlify / GitHub Pages)

#### 8. Implemented Features
1. **Student Command Center:** Time-aware greeting, urgent circular ticker, daily lecture timetable, open office counter.
2. **Academic Reading Room:** 11 engineering departments with complete 4-year syllabus trees and 35+ textbook covers.
3. **Exam Vault:** 30+ multi-year question papers (2022–2025) with an interactive solved paper modal.
4. **Interactive SVG Campus Map:** 20 landmark buildings with pan, zoom, and inspection drawer.
5. **Live Office Timings:** Dynamic open/closed status calculation for 16 college offices with lunch break awareness.
6. **Campus Noticeboard:** Prioritized circulars with urgent animated badges and category filters.
7. **Local Discovery (Explore):** 30 student-friendly eateries, printing shops, transit stops, and pharmacies.
8. **Freshers' Survival Guide:** 12 survival articles and a 10-item onboarding checklist with local storage sync.
9. **Personal Study Planner:** Coursework task manager with radial progress tracking.
10. **Demo Switcher:** Instant 1-click toggle between Student Mode and Administrator Mode.

#### 9. Innovation & Uniqueness
- **Editorial "Analog Campus" Aesthetic:** Rather than generic dashboard cards, Campusly utilizes warm paper tones, deep forest greens, and serif publication typography that evokes a classic university library.
- **Dynamic Office Status Engine:** Evaluates multi-format office hours (including lunch breaks) directly against the user's local clock to give accurate, real-time availability.
- **Standalone Client Architecture:** Complete functionality without heavy backend servers or external API keys, ensuring instant response times and zero data leakage.

#### 10. Target Users
- **Undergraduate & Postgraduate Students:** Second and third-year students preparing for exams and first-year freshers onboarding to campus life.
- **College Faculty:** Professors seeking a reliable channel for course syllabus distribution and assignment prompts.
- **College Administration:** Department offices and student service cells seeking clear communication of office timings and circulars.

#### 11. Expected Impact
- Eliminates 15–20 minutes of daily student friction spent hunting for syllabus codes or asking peers for question papers.
- Prevents unnecessary physical trips across campus to closed administrative offices.
- Simplifies collegiate orientation for hundreds of new students each semester.

#### 12. Challenges Faced
- **Heterogeneous Time String Parsing:** Designing a robust algorithm to parse 12-hour AM/PM time strings, different weekend schedules, and midday lunch intervals into minute-of-day offsets.
- **Responsive Vector Blueprint:** Crafting a clean SVG campus map that retains crisp vector clarity and intuitive zoom/pan behavior on both mobile touchscreens and desktop screens.
- **Tailwind CSS v4 Compatibility:** Adapting styling patterns to the newly released Tailwind CSS v4 architecture where `@apply` cannot reference custom layer classes.

#### 13. Future Scope
- Direct API synchronization with college SIS/ERP for student attendance and grade reports.
- Cloud storage integration for authenticated student assignment submissions.
- Progressive Web App (PWA) offline service worker caching for complete offline timetable and syllabus browsing.
- Multi-college federation enabling other institutions to configure their own campus map and departmental curricula.

#### 14. Team Information
- **Lead Developer:** [Your Full Name] — College Student, [Your Department / Degree], [Your College/University Name]
- **Role:** Full-Stack Architecture, Frontend Engineering, UX/UI Design
- **DEV Profile:** `https://dev.to/[your-dev-username]`
- **GitHub Profile:** `https://github.com/[your-github-username]`
- **LinkedIn Profile:** `https://linkedin.com/in/[your-linkedin-username]`
- *(If team submission, list additional teammates here with roles and profiles).*

#### 15. AI Usage Disclosure
This project was developed through human-directed agentic pair programming with Google DeepMind’s Antigravity assistant. AI tooling assisted in generating boilerplate data structures, crafting SVG path coordinates, and testing CSS utilities. All system logic, component architectures, domain data, and deployment assets were audited, verified, and compiled locally with zero automated hallucination.
