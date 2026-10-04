# CAMPUSLY — Screenshot & Visual Asset Checklist

This checklist specifies the exact visual assets, mockups, and screenshots required for your GitHub README, DEV Community challenge submission article, and hackathon presentation slides.

---

## 📁 Recommended Asset Directory Structure
Store your captured screenshots in `public/screenshots/` so they can be referenced cleanly in both your `README.md` and online posts:
```text
campusly/
├── public/
│   ├── campusly-icon.svg
│   ├── favicon.svg
│   └── screenshots/
│       ├── 01_dashboard_command_center.png
│       ├── 02_academic_reading_room.png
│       ├── 03_exam_vault_modal.png
│       ├── 04_campus_vector_map.png
│       ├── 05_live_office_timings.png
│       ├── 06_announcements_noticeboard.png
│       ├── 07_explore_nearby_places.png
│       ├── 08_freshers_survival_guide.png
│       ├── 09_admin_dashboard.png
│       └── 10_mobile_responsive_view.png
```

---

## 📸 Master Screenshot Specifications

### 1. Dashboard Command Center
* **Filename:** `01_dashboard_command_center.png`
* **Route:** `/`
* **Necessity:** **Mandatory (Hero Banner)**
* **Recommended Resolution:** 1920 × 1080 (16:9)
* **What Should Be Visible:**
  - Personalized time-aware greeting (*"Good morning/afternoon/evening, Atharv!"*).
  - Student badge: *Electronics Engineering · Second Year · Semester III*.
  - The 4 quick-context cards (*Exam tomorrow?*, *New to campus?*, etc.).
  - The "Today's Schedule" lecture timeline strip.
  - Active urgent announcement banner and open office counter.

---

### 2. Academic Reading Room & Library
* **Filename:** `02_academic_reading_room.png`
* **Route:** `/academics`
* **Necessity:** **Mandatory**
* **Recommended Resolution:** 1920 × 1080 (16:9)
* **What Should Be Visible:**
  - Selected department: *Electronics Engineering (EXTC)*.
  - Year and Semester selection tabs (*Second Year → Semester III*).
  - Subject cards with course codes, credits, and syllabus details.
  - The Textbook shelf showing book cover illustrations, authors, and ratings.

---

### 3. Exam Vault & Solved Question Paper Modal
* **Filename:** `03_exam_vault_modal.png`
* **Route:** `/question-papers`
* **Necessity:** **Mandatory**
* **Recommended Resolution:** 1920 × 1080 (16:9)
* **What Should Be Visible:**
  - The open **Solved Question Paper Inspection Modal** for a selected course (e.g., *Analog Electronics II*).
  - Official university watermark header and exam metadata (Time: 2.5 Hours, Max Marks: 80).
  - Section A and Section B question previews with marks breakdown.
  - Action buttons: *Save to Shelf* and *Download Paper*.

---

### 4. Interactive SVG Campus Map
* **Filename:** `04_campus_vector_map.png`
* **Route:** `/campus-map`
* **Necessity:** **Mandatory**
* **Recommended Resolution:** 1920 × 1080 (16:9)
* **What Should Be Visible:**
  - The full custom SVG vector campus blueprint with color-coded landmark buildings.
  - One selected building (e.g. *Central Library* or *Main Academic Complex*).
  - The sliding building inspection drawer on the right displaying floors, hours, and amenities.
  - Canvas zoom controls (`+`, `-`, reset).

---

### 5. Live Administrative Office Timings
* **Filename:** `05_live_office_timings.png`
* **Route:** `/office-timings`
* **Necessity:** **Mandatory**
* **Recommended Resolution:** 1920 × 1080 (16:9)
* **What Should Be Visible:**
  - Grid of college offices (Principal's Office, Exam Cell, Student Section, Placement Cell).
  - Real-time green **OPEN NOW** or red **CLOSED** badges.
  - Operating schedules, Saturday hours, and highlighted midday lunch intervals.

---

### 6. Campus Digital Noticeboard
* **Filename:** `06_announcements_noticeboard.png`
* **Route:** `/announcements`
* **Necessity:** Highly Recommended
* **Recommended Resolution:** 1920 × 1080 (16:9)
* **What Should Be Visible:**
  - Pinned announcement card at the top.
  - Notice cards featuring category tags (*Examination*, *Placement*, *Academic*) and urgent badges.
  - The category filter tab bar at the top.

---

### 7. Around the Corner (Explore Nearby)
* **Filename:** `07_explore_nearby_places.png`
* **Route:** `/explore-nearby`
* **Necessity:** Optional / Supplementary
* **Recommended Resolution:** 1920 × 1080 (16:9)
* **What Should Be Visible:**
  - Category selector cards: *Food & Dining*, *Shopping*, *Entertainment*, *Transport*, *Services*.
  - Place cards showing walking distance from campus gate (e.g., `250m away`), star ratings, and student price tiers (`₹`).

---

### 8. Freshers' Survival Guide & Checklist
* **Filename:** `08_freshers_survival_guide.png`
* **Route:** `/freshers-guide`
* **Necessity:** Highly Recommended
* **Recommended Resolution:** 1920 × 1080 (16:9)
* **What Should Be Visible:**
  - The "First Week at SOIT" interactive checklist with several checked tasks and the green progress bar.
  - Expandable survival guide cards (Registration, Academic Survival, Campus Slang).

---

### 9. Administrator Governance Console
* **Filename:** `09_admin_dashboard.png`
* **Route:** `/admin`
* **Necessity:** Highly Recommended
* **Recommended Resolution:** 1920 × 1080 (16:9)
* **What Should Be Visible:**
  - Institutional metric overview cards (Total Resources, Question Papers, Announcements, Departments).
  - Resource distribution bar chart.
  - The *Create Announcement* or *Add Academic Resource* management tabs.

---

### 10. Mobile Responsive Interface
* **Filename:** `10_mobile_responsive_view.png`
* **Route:** `/` or `/academics` (viewport width: 375px–412px)
* **Necessity:** Highly Recommended
* **Recommended Resolution:** 1080 × 1920 (9:16 vertical) or combined dual-phone graphic
* **What Should Be Visible:**
  - Clean vertical stacking of cards.
  - Floating bottom mobile navigation bar (*Home*, *Academics*, *Explore*, *Campus*, *Profile*).
  - Slide-in mobile navigation drawer.

---

## 🎨 Recommended Capture Tooling
1. **Windows Snipping Tool:** Press `Windows Key + Shift + S` → Select Window mode.
2. **Chrome / Edge Developer Tools:** Press `F12` → Press `Ctrl + Shift + P` → Type `Capture full size screenshot` for pixel-perfect 1:1 captures.
3. **Mockup Presentation Tools:** To generate clean browser wrappers around your screenshots, use free tools like [shots.so](https://shots.so) or [screely.com](https://screely.com).
