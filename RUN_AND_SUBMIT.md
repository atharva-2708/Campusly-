# RUN AND SUBMIT — Beginner's Step-by-Step Guide

Welcome! This guide is written specifically for you to run, build, deploy, and submit **Campusly**, even if you have never deployed or submitted a project before.

---

## 💻 1. Local Execution (How to Run on Your Computer)

### Step 1.1: Open the Project Folder
1. Open **File Explorer** on your Windows laptop.
2. Navigate to:
   ```text
   C:\Users\Atharva\.gemini\antigravity\scratch\campusly
   ```
3. Alternatively, open **Visual Studio Code** (or your preferred editor), click **File → Open Folder...**, and select this `campusly` folder.

### Step 1.2: Open the Terminal
In VS Code, press `` Ctrl + ` `` (Control + Backtick) or go to **Terminal → New Terminal** at the top.  
Ensure the terminal displays your folder path:
```powershell
PS C:\Users\Atharva\.gemini\antigravity\scratch\campusly>
```

### Step 1.3: Install Dependencies
If you have not already installed dependencies, run:
```powershell
npm install
```
*(This installs all packages listed in `package.json`: React, Vite, Tailwind CSS, Framer Motion, and Lucide React).*

### Step 1.4: Start the Development Server
Execute:
```powershell
npm run dev
```
You will see output similar to:
```text
  VITE v8.3.2  ready in 240 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 1.5: View the Application
Open your web browser (Chrome, Edge, Brave, etc.) and type:
```text
http://localhost:5173
```
You will see the Campusly dashboard running live! Any code edits you make will instantly reflect on the screen without manually refreshing.

### Step 1.6: How to Stop the Server
When you are finished running the app locally, switch back to the terminal window and press:
```text
Ctrl + C
```
Type `Y` and press `Enter` if prompted to terminate the batch job.

---

## 🏗️ 2. Production Build (How to Generate Final Files)

The production build takes all TypeScript files, bundles them, tree-shakes unused code, and outputs optimized, minified HTML/CSS/JavaScript files.

### Step 2.1: Run the Build Command
In the terminal, run:
```powershell
npm run build
```

### Step 2.2: Verify the Output
You should see:
```text
✓ 2351 modules transformed.
dist/index.html                            0.90 kB
dist/assets/index-[hash].css              96.57 kB
dist/assets/index-[hash].js              748.86 kB
✓ built in 1.04s
```
* **Location of Files:** The generated production files are saved in the `campusly\dist` directory.
* **Verification Command:** To preview how the production bundle behaves before deploying:
  ```powershell
  npm run preview
  ```
  Open the preview URL (`http://localhost:4173`) to test the minified production application. Press `Ctrl + C` when done.

---

## ☁️ 3. Deployment (How to Put Campusly Live on the Web)

Because Campusly is a Vite-based Single Page Application with zero server dependencies, it can be deployed for free in under 3 minutes.

### Recommended Platform: **Render** (or Vercel / Netlify)
*Why Render?* Render is an official sponsor of Hacktoberfest 2026, offering a featured **$200 "Best Use of Render"** partner prize category!

### Step-by-Step Instructions to Deploy on Render:
1. **Push your code to GitHub first:** (See Section 4 below).
2. Go to [https://render.com](https://render.com) and click **Sign Up** (or Log In with GitHub).
3. In the Render Dashboard, click the **New +** button in the top navigation and select **Static Site**.
4. Select **Connect a repository** and choose your `campusly` repository.
5. In the configuration settings, fill in:
   - **Name:** `campusly` *(or `campusly-soit`)*
   - **Branch:** `main` *(or `master`)*
   - **Root Directory:** *(leave blank)*
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
6. Click **Create Static Site**.
7. Render will pull your repository, run `npm run build`, and deploy your application. In ~60 seconds, you will receive your free live URL:
   ```text
   https://campusly-[random-id].onrender.com
   ```
8. **Verification:** Click your live URL, open the Developer Console (`F12`), and confirm there are no errors. Test navigation across the map, question papers, and office timings.

---

## 🐙 4. GitHub Publication Instructions

To publish your project to GitHub for public evaluation:

### Step 4.1: Verify Existing Git Repository
In your terminal, check the status:
```powershell
git status
```
*(All 66 files are already committed to local branch `master`).*

### Step 4.2: Create a New GitHub Repository
1. Open your browser and go to [https://github.com/new](https://github.com/new).
2. Set **Repository name** to: `campusly`
3. Set **Description** to: `Campusly — Your Campus. Everything Connected. The unified academic & campus navigation hub.`
4. Set visibility to **Public**.
5. **Do NOT** check "Add a README file" or ".gitignore" (these already exist locally).
6. Click **Create repository**.

### Step 4.3: Push Local Repository to GitHub
Copy and paste the exact commands from GitHub (replace `[your-username]` with your actual GitHub username):
```powershell
git branch -M main
git remote add origin https://github.com/[your-username]/campusly.git
git push -u origin main
```
Your entire code, documentation, and asset files are now live on GitHub!

---

## 🏆 5. How to Submit to Different Events

Be sure to follow the specific instructions for whichever event you are submitting to:

---

### Procedure A: Submitting to the DEV Hacktoberfest Weekend Challenge
* **Event URL:** [https://dev.to/challenges/hacktoberfest-weekend-2026-10-01](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)
* **Deadline:** Monday, October 5, 2026 at 6:59 AM UTC (12:29 PM IST / 2:59 AM EDT)
* **Steps:**
  1. Log into your [DEV.to](https://dev.to) account (or create one for free).
  2. Click the **Write a post** button (or navigate to `https://dev.to/new`).
  3. Open `HACKTOBERFEST_SUBMISSION.md` in your project folder.
  4. Copy the entire section titled **"DEV POST ARTICLE — READY TO COPY & PUBLISH"**.
  5. Paste it directly into the DEV editor.
  6. Replace the placeholder links:
     - Replace `[your-username]` with your actual GitHub handle.
     - Replace `https://campusly.onrender.com` with your actual live deployed URL.
     - Fill in your friend's name (Atharv is pre-filled!).
  7. Confirm tags include: `hf26challenge`, `webdev`, `react`, `openinnovation`.
  8. Click **Publish**. You will automatically receive the official Hacktoberfest completion badge upon verification!

---

### Procedure B: Submitting to an In-Person Hack Day / Project Showcase
* **Steps:**
  1. Have your laptop fully charged with the local development server running (`npm run dev`).
  2. Open your live deployed Render URL in one browser tab as a backup in case the venue Wi-Fi is slow.
  3. Review `DEMO_GUIDE.md` for the exact 90-second speaking script.
  4. Have your GitHub repository page open in another tab to show clean TypeScript code and documentation if judges ask to inspect the codebase.

---

### Procedure C: Submitting to a General Hackathon (Devpost, HackerEarth, Unstop)
* **Steps:**
  1. Log into the hackathon portal and click **Submit Project**.
  2. Open `SUBMISSION_FORM_CONTENT.md`.
  3. Copy and paste the answers into the corresponding form fields:
     - *Project Title* → Field 1
     - *Short Description* → Field 3
     - *Detailed Description* → Field 4
     - *Technologies Used* → Field 7
     - *Challenges & Future Scope* → Fields 12 & 13
  4. Paste your GitHub repository link and Live Demo link into the respective fields.
  5. Upload the recommended screenshots from `ASSET_CHECKLIST.md`.
  6. Review all entered details and click **Submit**.
