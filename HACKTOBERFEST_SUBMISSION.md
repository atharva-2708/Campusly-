# HACKTOBERFEST 2026 / DEV CHALLENGE SUBMISSION GUIDE

> **Official Event:** Hacktoberfest 2026 Weekend Challenge (Challenge 1 of 5)  
> **Official Challenge URL:** [https://dev.to/challenges/hacktoberfest-weekend-2026-10-01](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)  
> **Theme:** *Build for a Friend*  
> **Submission Deadline:** Monday, October 5, 2026 at 6:59 AM UTC (12:29 PM IST / 2:59 AM EDT)  
> **Submission Tag Required:** `#hf26challenge`

---

## 🔍 Official 2026 Participation Structure Verification

In **Hacktoberfest 2026**, the traditional model of submitting 4 GitHub pull requests to public repositories has been replaced by a series of **five consecutive DEV Community Challenges** throughout the month of October:
1. **Challenge Format:** Build a project and write a comprehensive submission article on [DEV.to](https://dev.to).
2. **Weekend Challenge Prompt (Oct 1–5):** *"Build for a Friend"* — Create something that directly solves a real-world problem for a specific friend, classmate, roommate, or loved one.
3. **Core Criteria:** Open-source foundation, solving a real problem for a specific person, functional code repository, and live demo.
4. **Partner Categories:** Render, DigitalOcean, TabPFN, Tinker, Arduino UNO Q, Backboard, ElevenLabs.
5. **Prize Structure:** $250 overall winner + DEV++ membership; $200 for featured partner categories; official Hacktoberfest completion badge for all valid submissions.

---

## 📋 Project Submission Profile

### Project Name
**Campusly — Your Campus. Everything Connected.**

### Short Pitch
A student-centric academic command center and navigation hub that connects course syllabi, solved exam archives, live office hours, and campus landmarks for college students.

### Project Summary
Campusly eliminates the everyday chaos of college life by consolidating disparate academic drives, WhatsApp groups, physical noticeboards, and campus navigation into a unified single-page web application. Engineered around an editorial "Analog Campus" aesthetic, it equips students with a 4-year curriculum reading room across 11 engineering disciplines, an Exam Vault of 30+ solved past papers, real-time office availability calculations, and an interactive vector campus map.

### Problem & Solution
* **The Problem:** College students face extreme information fragmentation. Exam papers are lost in photocopy shops, lecture notes are scattered in informal chats, important notices are missed on physical corkboards, and students waste time walking across campus only to find administrative offices closed for lunch.
* **The Solution:** Campusly brings academic curricula, solved papers, official notices, an interactive SVG campus map, and real-time office timing tracking into a single client-side web application.

### Technical Implementation
* **Frontend Architecture:** Single-Page Application (SPA) built with React 18 and TypeScript.
* **Styling & System Tokens:** Tailwind CSS v4 featuring the custom "Analog Campus" palette (Warm Ivory, Paper Cream, Deep Forest, Terracotta, and Academic Mustard).
* **Motion & Animation:** Framer Motion for modal overlays, slide-in navigation drawers, and reactive card hovers.
* **Vector Engine:** Interactive SVG campus map with dynamic coordinate mapping and transform-based zoom/pan controls.
* **State & Persistence:** React Context API (`StudentContext`, `ThemeContext`) synchronizing bookmarks, study tasks, and user preferences with browser `localStorage`.
* **Build System:** Vite 8 production build bundling 2,351 modules in ~1.0s with zero compile errors.

### Implemented Features
1. **Command Center:** Time-aware greeting, urgent circular ticker, daily lecture timetable, open office counter.
2. **Academics Reading Room:** 11 engineering departments, year/semester curriculum selector, 35-volume textbook archive.
3. **Exam Vault:** 30+ solved previous year question papers with full inspection preview modal.
4. **Interactive SVG Campus Map:** 20 landmarks with zoom, pan, and building detail drawer.
5. **Live Office Timings Engine:** Real-time calculation of open/closed status for 16 college offices with lunch break awareness.
6. **Campus Noticeboard:** Prioritized circulars with urgent visual pulses and category filters.
7. **Local Hangouts & Services:** 30 student-friendly food, stationery, transit, and medical points with walking distance markers.
8. **Freshers' Survival Guide:** 12 survival articles and an interactive 10-item onboarding checklist.
9. **Student Study Planner:** Coursework task manager with radial completion progress tracking.
10. **Demo Switcher:** Instant 1-click toggle between Student Mode and Administrator Mode.

### Open-Source Contribution
Campusly is distributed under the permissive **MIT License**. It offers the open-source education community:
* A reference implementation of an editorial, warm-palette design system tailored for academic tools.
* A reusable, standalone SVG interactive map engine without external proprietary map APIs.
* A robust, zero-dependency time-interval evaluation algorithm for campus/office hours.
* A typed, extensible data schema (`src/types/index.ts`) that any educational institution can fork and adapt.

### AI Usage & Tooling Disclosure
* **Engineering Tools:** Campusly was designed and developed through human-directed agentic pair programming with Google DeepMind’s Antigravity assistant.
* **Role of AI:** Assisted in scaffolding TypeScript data models, crafting SVG map paths, implementing time comparison algorithms, and establishing CSS design system tokens.
* **Code Authorship & Review:** All system logic, component architectures, UI layouts, and domain datasets were audited, verified, and compiled locally to ensure complete type safety and functionality.

---

## 🔗 Ready-to-Fill Submission Placeholders

* **Live Deployed URL:** `https://your-deployment-subdomain.onrender.com` *(or Vercel / Netlify URL)*
* **GitHub Repository URL:** `https://github.com/[your-username]/campusly`
* **Demo Video URL:** `https://youtu.be/[your-demo-video-id]` *(optional, but recommended)*

---

## 📸 Recommended Screenshots for Submission

1. **`01_dashboard_command_center.png`:** Full view of the homepage showing the personalized greeting, urgent notice ticker, and timetable.
2. **`02_academic_library.png`:** The 11-department curriculum browser with textbook covers and subject details.
3. **`03_exam_vault_modal.png`:** The question papers vault with an open Solved Exam Paper modal.
4. **`04_campus_vector_map.png`:** The interactive SVG map with zoom controls and the building inspection drawer open.
5. **`05_live_office_timings.png`:** Office hours directory showing real-time green "OPEN NOW" and red "CLOSED" badges.
6. **`06_mobile_responsive_view.png`:** Side-by-side smartphone mockup showing the bottom navigation bar and mobile drawer.

---

## ⏱️ Demo Video Script (60–90 Seconds)

* **00:00–00:10 (Opening):** *"Hi everyone! This is Campusly — a unified web platform built for college students that connects academics, campus navigation, and student life into one place."*
* **00:10–00:25 (The Problem & Friend Story):** *"I built this for my friend and roommate Atharv, a 2nd-year engineering student. Like many students, he was constantly juggling syllabi buried in WhatsApp chats, searching for past exam papers, and walking across campus only to find administrative offices closed for lunch."*
* **00:25–00:45 (Academics & Exam Vault):** *(Show screen)* *"With Campusly, Atharv can browse his exact department curriculum across all four years, access 35+ recommended textbooks, and jump straight into the Exam Vault to inspect solved question papers."*
* **00:45–01:05 (Map & Live Timings):** *(Show screen)* *"When navigating campus, the interactive vector map shows every hall and lab. Best of all, our live office status engine tells him whether the Student Section or Library is open right now, taking into account lunch breaks."*
* **01:05–01:20 (Closing & Open Source):** *"Campusly is completely open source under the MIT License, runs with zero backend friction, and can be deployed for any college campus. Check out the demo link and GitHub repository in the post below!"*

---

## 📝 DEV POST ARTICLE — READY TO COPY & PUBLISH

*(Copy the markdown below directly into the DEV editor at `https://dev.to/new`)*

```markdown
---
title: Campusly — The Unified Campus Hub (Built for My Friend Atharv)
published: true
tags: hf26challenge, webdev, react, openinnovation
cover_image: https://raw.githubusercontent.com/[your-username]/campusly/main/public/social-preview.png
---

*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

## What I Built

I built **Campusly**, a unified, editorial-grade web application that connects academic curricula, solved exam archives, real-time college circulars, campus navigation, and live office timings into a single, student-friendly command center.

### Who I Built It For
I built this for my college friend and roommate, **Atharv**, a second-year Electronics Engineering student at our college (Saint Oxford Institute of Technology - SOIT).

### The Problem It Solves
Every semester, I watched Atharv and our classmates deal with the same frustrating cycle:
1. **Scattered Course Materials:** Syllabus PDFs and textbook names were constantly lost in unofficial WhatsApp group chats or disorganized Google Drive folders.
2. **The "PYQ Hunt":** Finding Previous Year Question Papers (PYQs) meant either tracking down seniors or paying for photocopies at nearby print shops.
3. **The Wasted Walk:** Atharv would regularly walk 15 minutes across campus to the Student Section or Examination Cell, only to find the door locked because of unannounced lunch intervals.
4. **Navigating the Campus:** New junior friends in our hostel were constantly lost trying to locate specific laboratories and seminar halls.

Campusly was built to solve all of these problems under one unified, beautiful roof.

---

## Demo

- **Live Application:** [https://campusly.onrender.com](https://campusly.onrender.com) *(replace with your deployed URL)*
- **Demo Mode:** Click the **Switch to Admin** button in the sidebar footer to experience both Student and Administrator perspectives with zero login friction.

![Campusly Command Center](https://raw.githubusercontent.com/[your-username]/campusly/main/public/screenshots/01_dashboard.png)

---

## Code

The complete source code is open source and hosted on GitHub under the MIT License:

{% github [your-username]/campusly %}

---

## How I Built It

Campusly is built as a high-performance Single Page Application:
- **Core Framework:** React 18 with TypeScript for complete type safety across collegiate data structures.
- **Build Tooling:** Vite 8 for instant HMR and optimized production asset chunking.
- **Styling System ("The Analog Campus"):** Tailwind CSS v4 implementing a warm, publication-grade palette (Warm Ivory, Paper Cream, Deep Forest Green, Terracotta, and Academic Mustard) paired with classic serif typography (`DM Serif Display`).
- **Interactive SVG Masterplan:** A custom vector blueprint of the collegiate campus supporting drag-to-pan, scale-to-zoom, and landmark inspection without heavy external map libraries.
- **Live Status Engine:** A mathematical time calculation engine in TypeScript that computes minute-of-day offsets to determine real-time open, closed, and lunch-break status for 16 campus offices based on client computer time.
- **Client Persistence:** React Context API synchronized with `localStorage` for personal bookmarks, coursework study tasks, and onboarding checklist progress.

---

## Why Does Open Innovation Matter?

Open innovation is what made Campusly practical and accessible:
1. **Zero Barrier to Entry:** Commercial college ERPs cost universities tens of thousands of dollars and remain locked behind bureaucratic vendor contracts. An open-source, client-first web application can be freely adopted, cloned, and customized by any college student council or university club.
2. **Local Privacy & Independence:** All student task lists, study notes, bookmarks, and preferences are stored strictly in client-side storage (`localStorage`). No personal student tracking data is harvested or transmitted to third-party ad networks.
3. **Community-Driven Knowledge:** The data layer (`src/data/`) is structured as plain, typed TypeScript objects. Any student can fork the repository, replace the department curricula with their own university syllabus, and deploy their campus portal in minutes.

---

## My Agent Session

This project was built with the assistance of an AI-powered agentic coding assistant (Google Antigravity), which accelerated the creation of typed datasets, SVG map vector calculations, and responsive layout polish.

---

## Prize Categories

- **Best Use of Render:** Hosted and deployed on Render's web application platform.

---

*Built with ❤️ for Atharv and college students everywhere.*
```

---

## ✅ Final Pre-Submission Checklist

- [ ] Repository pushed to GitHub with public visibility.
- [ ] Live demo deployed and tested on Render / Vercel.
- [ ] Deployed URL opens without console errors.
- [ ] At least 3 screenshots uploaded and linked in the post.
- [ ] Article published on DEV with `#hf26challenge` tag before **October 5, 2026, 6:59 AM UTC**.
- [ ] Article template sections (`## What I Built`, `## Demo`, `## Code`, etc.) properly populated.
