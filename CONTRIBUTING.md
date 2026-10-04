# Contributing to Campusly 🎓

Thank you for your interest in contributing to **Campusly — Your Campus. Everything Connected.**! We welcome contributions from college students, educators, and open-source developers worldwide.

---

## 📜 Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for everyone. Please treat all contributors, reviewers, and maintainers with kindness, respect, and constructive empathy.

---

## 🛠️ How to Get Started

### 1. Fork & Clone
1. Fork the repository to your GitHub account.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/campusly.git
   cd campusly
   ```

### 2. Install Dependencies
Make sure you have Node.js (v18+) installed:
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` to see your changes reflected live via Hot Module Replacement (HMR).

---

## 🌿 Branching & Development Workflow

1. Create a descriptive feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   # or for bug fixes:
   git checkout -b fix/issue-description
   ```
2. Adhere to the established **editorial design palette**:
   - Primary Background: Warm Ivory (`#F6F1E7`)
   - Card Containers: Paper Cream (`#EDE4D4`)
   - Primary Accent: Deep Forest Green (`#183D32`)
   - Secondary Alerts: Terracotta (`#C66B4E`) and Academic Mustard (`#D7AA48`)
   - Typography: `DM Serif Display` for headings, `DM Sans` for body, `DM Mono` for metadata.
3. Ensure type safety:
   - All components and dataset additions must satisfy TypeScript strict types (`src/types/index.ts`).
   - Run typecheck and build validation before submitting:
     ```bash
     npm run build
     ```
   - Ensure the build exits with zero errors.

---

## 📦 Pull Request Guidelines

1. Commit your changes with meaningful commit messages:
   ```bash
   git commit -m "feat(academics): add new syllabus materials for mechanical engineering"
   ```
2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Open a Pull Request against `main` on the upstream repository.
4. Describe your changes clearly in the PR description, including screenshots of UI modifications.

---

## 💡 Ways to Contribute

* **New Departments & Subjects:** Expand `src/data/departments.ts` with curriculum details from your institution.
* **Textbooks & Previous Question Papers:** Add authentic academic references to `src/data/books.ts` and `src/data/questionPapers.ts`.
* **Campus Life & Local Spots:** Add genuine local student amenities in `src/data/nearbyPlaces.ts`.
* **Accessibility & Responsiveness:** Improve screen-reader semantics and mobile ergonomics.
* **Bug Fixes:** Address open issues or reported anomalies.

Happy Hacking! 🚀
