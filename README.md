# 🎓 CAMPUSLY — Your Campus. Everything Connected.

> **Institutional Deployment:** Saint Oxford Institute of Technology (SOIT)  
> **Design Philosophy:** *The Analog Campus — Digital, But Human*  
> **Status:** Production-Ready Frontend Web Application

---

## 🏛️ Executive Summary

**Campusly** is a student-centric unified campus web application built for the students, faculty, and administration of **Saint Oxford Institute of Technology (SOIT)**. It unifies distributed college portals, physical notice boards, syllabus PDFs, exam archives, campus navigation, and local amenities into one cohesive, editorial-grade digital experience.

Instead of navigating fragmented legacy ERP systems, WhatsApp groups, and physical pin-boards, SOIT students have access to a single, beautifully designed command center that manages their academic journey, day-to-day schedule, exam preparations, and campus lifestyle.

---

## 🎨 Design Philosophy: "The Analog Campus"

Most institutional campus software suffers from sterile, corporate table grids or cluttered dashboards. Campusly introduces an **editorial, publication-grade visual language** reminiscent of classic university journals, physical corkboards, and archival reading rooms:

* **Warm Ivory (`#F6F1E7`) & Paper Cream (`#EDE4D4`)**: Gentle on the eyes for late-night study sessions.
* **Deep Forest Green (`#183D32`)**: Academic authority, primary navigation, and active states.
* **Muted Terracotta (`#C66B4E`)**: Urgent notices, exam vault indicators, and warning alerts.
* **Academic Mustard (`#D7AA48`)**: Deadlines, practical alerts, and secondary accents.
* **Sage Green (`#A8B9A0`) & Muted Lavender (`#A9A0C2`)**: Tagging, sports, hostels, and relaxed campus zones.
* **Typography Triad**:
  - **Headings:** *DM Serif Display* — Classic editorial gravitas.
  - **Body Text:** *DM Sans* — Modern, hyper-readable sans-serif.
  - **Data Badges & Course Codes:** *DM Mono* — Precise technical metadata.
* **Dark Mode Support**: Seamless toggle between warm paper and night reading modes (`.dark`).

---

## 🚀 Key Functional Modules

### 1. 🏠 Command Center (`/`)
* **Personalized Greeting**: Time-aware greeting responding to morning, afternoon, or evening study routines.
* **Contextual Action Tiles**: Instant shortcuts for "Exam tomorrow?", "New to campus?", "Need a bite?", and "Urgent circulars".
* **Current Subjects & Resources**: Instant glance into active semester subjects with direct links to textbooks and lecture notes.
* **Urgent Notice Banner**: Dismissible bulletin for time-critical circulars.
* **Today's Class Schedule**: Interactive daily lecture timeline with room allocations.
* **Live Campus Pulse**: Real-time counter of open administrative offices and nearest assignment deadlines.

### 2. 📚 Academic Library & Curriculum Browser (`/academics`)
* **11 Engineering & Basic Science Departments**: Complete 4-year undergraduate curricula for EXTC, ELEC, COMP, IT, AIML, MECH, CIVIL, TEXT, MATH, PHY, and CHEM.
* **Multi-Tier Navigation**: Select Department → Year (1st–4th) → Semester (I–VIII) → Subject.
* **35+ Textbook Archive**: High-resolution digital book covers, author credentials, ISBNs, user ratings, and semester alignment.
* **Interactive Resource Tabs**: Filter resources by Textbooks, Lecture Notes, Previous Year Papers, Lab Manuals, and Question Banks.
* **Bookmark & Download Triggers**: Save directly to personal shelf or track offline downloads.

### 3. 📝 Exam Vault — Solved Question Papers (`/question-papers`)
* **30+ Multi-Year Archives (2022–2025)**: End-Semester, Mid-Semester, Unit Tests, and Supplementary papers.
* **Multi-Dimensional Filters**: Filter simultaneously by Department, Exam Year, Exam Type, and Semester.
* **Interactive Exam Paper Previewer Modal**: Full-featured examination paper modal with official university watermarks, course metadata, and Section A / Section B questions.

### 4. 📋 Coursework & Practice Tracker (`/assignments`)
* **Coursework Manager**: Track active lab submissions, unit question banks, practice problem sets, and class tests.
* **Priority & Deadline Status**: Visual badges for *New*, *Important*, *Upcoming*, and *Archived* tasks.
* **Modal Task Details**: Inspect problem statements, rubrics, and faculty upload metadata.

### 5. 📢 Digital Noticeboard (`/announcements`)
* **Live Circular Stream**: 20 authentic university circulars across Examination, Placement, Cultural Fests, Sports, and Administration.
* **Urgent & Important Badges**: Animated visual pulses for urgent advisories.
* **Filter by Domain**: Narrow notices down to Academic, Placement, Holiday, or Departmental circulars.

### 6. 🗺️ Interactive SVG Campus Map (`/campus-map`)
* **Vector Vector Blueprint**: Dynamic SVG campus layout covering 20 key academic blocks, workshops, libraries, hostels, food courts, and medical facilities.
* **Pan & Zoom Controls**: Responsive canvas navigation with pinch, pan, zoom-in, zoom-out, and reset view.
* **Building Detail Drawer**: Click any campus landmark to view floor details, office hours, nearby amenities, and descriptions.

### 7. ☕ Around the Corner — Local Discovery (`/explore-nearby`)
* **30+ Student Hangouts & Essential Services**: Curated directory across Food & Dining, Shopping, Entertainment, Transit, and Services.
* **Student Distance & Budget Indicators**: Distance from main gate (in meters/km), price categories (`₹`, `₹₹`, `₹₹₹`), and operating hours.

### 8. 🎒 Freshers' Survival Guide (`/freshers-guide`)
* **12 Comprehensive Survival Articles**: Getting started, navigating registration, academic survival, lab etiquette, hostel hacks, and campus slang.
* **First-Week Interactive Checklist**: 10 essential onboarding milestones with persistent `localStorage` progress tracking.

### 9. 🕒 Live Office Hours & Timings (`/office-timings`)
* **16 College Offices**: Detailed directory for Principal's Office, Exam Cell, Student Section, Placement Cell, Central Library, and Department HODs.
* **Dynamic Real-Time Status**: Automatically evaluates local computer clock against operating hours and lunch intervals to display **OPEN NOW** or **CLOSED**.

### 10. 📅 Academic Calendar (`/calendar`)
* **Semester Milestones (Oct–Dec 2026)**: Comprehensive matrix tracking mid-terms, final exams, fee deadlines, fests, and government holidays.
* **Interactive Month Matrix**: Click any day to view scheduled events, or filter by Exam, Deadline, Holiday, or Cultural events.

### 11. 🎯 Student Study Planner (`/study-planner`)
* **Task Manager**: Add, complete, and prioritize personal study tasks with course codes and target dates.
* **Radial Progress Tracker**: Dynamic completion percentage tracking active vs. completed tasks with `localStorage` persistence.

### 12. 🔖 Personal Shelf & Downloads (`/bookmarks`, `/downloads`)
* **Personalized Bookmarks**: Tabbed collection of saved books, question papers, and assignments with one-click removal.
* **Offline Download Log**: Track simulated offline study materials with one-click re-download.

### 13. ⚙️ Profile & System Settings (`/profile`, `/settings`)
* **Student Customization**: Edit student identity, enrollment numbers, active department, and semester.
* **1-Click Demo Role Switcher**: Instant toggle between **Student Mode** (Atharv, EXTC Yr 2) and **Administrator Mode** (Dean of Academics) available in the sidebar and profile page.
* **Data Management**: Reset demo state, clear search history, and configure notification preferences.

### 14. 🛡️ Administrative Console (`/admin`)
* **Institutional Metrics**: High-level telemetry on total resources, papers, circulars, and departmental coverage.
* **CRUD Management**:
  - Publish official announcements with category, priority, and date parameters.
  - Add and manage academic textbooks and study guides.
  - Review department structures and local student hubs.

### 15. 📖 About & Architecture Reference (`/about`)
* Comprehensive institutional documentation detailing project rationale, system architecture, engineering metrics, and future roadmap.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Core Framework** | React 18 with TypeScript |
| **Build Tooling** | Vite 8 + Rolldown Engine |
| **Styling & Design System** | Tailwind CSS v4 with Custom Color Variables |
| **Animation Engine** | Framer Motion (Transitions, Drawers, Modals) |
| **Iconography** | Lucide React |
| **Routing** | React Router DOM v6 |
| **Fonts** | `@fontsource/dm-serif-display`, `@fontsource/dm-sans`, `@fontsource/dm-mono` |
| **State & Persistence** | React Context (`StudentContext`, `ThemeContext`) + `localStorage` |

---

## 📂 Project Directory Structure

```text
campusly/
├── public/                     # Static assets & favicon
├── src/
│   ├── components/
│   │   ├── illustrations/      # Custom SVG illustrations (Campus, Books, Empty states)
│   │   ├── layout/             # TopNav, Sidebar, MobileNav, AppLayout, MobileDrawer
│   │   └── ui/                 # Reusable UI widgets (SearchBar, Badges, Modals, Skeletons)
│   ├── contexts/               # StudentContext (state/bookmarks/tasks) & ThemeContext
│   ├── data/                   # Realistic, typed domain datasets
│   │   ├── announcements.ts    # 20 campus notices & circulars
│   │   ├── assignments.ts      # 25 coursework & lab question banks
│   │   ├── books.ts            # 35 academic textbooks with ISBNs
│   │   ├── calendar.ts         # Semester milestones & exam dates
│   │   ├── campusLocations.ts  # 20 SVG campus map coordinate sets
│   │   ├── departments.ts      # 11 engineering & basic science departments
│   │   ├── freshersGuide.ts    # Survival guide articles & 10 onboarding tasks
│   │   ├── nearbyPlaces.ts     # 30 food, transit, & service locations
│   │   ├── notifications.ts    # 15 real-time student notification alerts
│   │   ├── officeTimings.ts    # 16 administrative offices & schedules
│   │   ├── questionPapers.ts   # 30 solved previous year question papers
│   │   └── studentProfile.ts   # Default student & administrator personas
│   ├── hooks/                  # Custom hooks (useSearch, useLocalStorage)
│   ├── pages/                  # 18 fully interactive view controllers
│   ├── types/                  # Rigorous TypeScript interfaces & contracts
│   ├── utils/                  # Helper utilities (time parsing, office status, date formatting)
│   ├── App.tsx                 # Route registry & layout wrapping
│   ├── index.css               # Editorial CSS design tokens & Tailwind rules
│   └── main.tsx                # React root mount
├── package.json                # Project dependencies & scripts
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 💻 Local Setup & Development

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm** or **pnpm** or **yarn**

### Installation
1. Clone or navigate to the project directory:
   ```bash
   cd campusly
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

### Production Build
To create an optimized, minified production build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 🧑‍💻 Evaluation & Demo Guide for Hackathon Judges

* **Instant Admin Access**: Click the **Switch to Admin** button at the bottom of the sidebar or navigate to **Settings → Admin Dashboard** to inspect administrator analytics and circular publishing tools.
* **Instant Student Mode**: Click **Switch to Student** to return to Atharv's EXTC view.
* **Global Search (`Ctrl + K`)**: Press `Ctrl+K` or click the search bar at the top to search across all textbooks, PYQs, circulars, map locations, and offices with real-time categorised dropdown results.
* **Interactive Map**: Head to **Campus Map**, click on any building (e.g. *Central Library*, *Main Building*, *Canteen*), and test zoom controls or click buildings to open the inspection drawer.
* **Solved Paper Preview**: Visit **Question Papers**, pick any paper (e.g. *Analog Electronics II*), and click **Preview** to view the simulated university question sheet.
* **Live Office Status**: Visit **Office Timings** to observe real-time open/closed calculations based on your current time of day.
* **Theme Switching**: Click the Sun/Moon icon in the top navigation bar to toggle between the Warm Paper and Dark editorial palettes.

---

## 📜 License & Disclaimers

* **Institution Notice**: Saint Oxford Institute of Technology (SOIT) is a representative collegiate institution created for prototyping and academic platform demonstration.
* **Data Privacy**: All student tasks, notes, bookmarks, and preferences are persisted locally in client-side storage (`localStorage`). No private data leaves the user's browser.
* **License**: MIT License. Open source and built for college students everywhere.
