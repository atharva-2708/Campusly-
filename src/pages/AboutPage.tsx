import React from 'react';
import { motion } from 'framer-motion';
import { 
  Library, BookOpen, Map, Clock, Bell, Sparkles, 
  ShieldCheck, Layers, Cpu, Code2, Users, CheckCircle2, 
  Terminal, Globe, ArrowRight, Compass, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-12">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="section-label text-forest dark:text-sage inline-block">
          Official Project Presentation
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-forest dark:text-white leading-tight">
          About Campusly
        </h1>
        <p className="font-mono text-terracotta text-sm sm:text-base font-semibold tracking-wider uppercase">
          Your Campus. Everything Connected.
        </p>
        <p className="text-sm sm:text-base text-ink/70 dark:text-dark-text/70 leading-relaxed font-sans">
          A unified, student-centric academic, navigation, and campus-life platform built specifically for the students, faculty, and administration of Saint Oxford Institute of Technology (SOIT).
        </p>
      </div>

      {/* 1. Problem Statement & Proposed Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 border border-terracotta/25 dark:border-dark-border shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
            !
          </div>
          <h2 className="font-serif text-2xl font-bold text-terracotta">The Problem We Solved</h2>
          <p className="text-xs sm:text-sm text-ink/70 dark:text-dark-text/70 leading-relaxed">
            In modern engineering colleges, student information is painfully fragmented:
          </p>
          <ul className="space-y-2 text-xs text-ink/80 dark:text-dark-text/80 list-disc list-inside">
            <li>Syllabi and lecture notes scattered across personal Google Drives and unofficial WhatsApp groups.</li>
            <li>Previous year question papers (PYQs) stored in dusty photocopy shop drawers.</li>
            <li>Critical examination updates lost amidst physical noticeboards.</li>
            <li>New freshers wandering 45-acre campuses unable to find classrooms or departments.</li>
            <li>Students walking all the way to administrative offices only to discover they are closed for lunch.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 border border-forest/25 dark:border-dark-border shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest dark:text-sage flex items-center justify-center font-bold">
            ✓
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest dark:text-white">The Campusly Solution</h2>
          <p className="text-xs sm:text-sm text-ink/70 dark:text-dark-text/70 leading-relaxed">
            Campusly bridges digital efficiency with human academic warmth under a single cohesive platform:
          </p>
          <ul className="space-y-2 text-xs text-ink/80 dark:text-dark-text/80 list-disc list-inside">
            <li><strong>Centralized Academic Reading Room:</strong> 11 engineering departments with complete year-by-year syllabi.</li>
            <li><strong>Exam Vault:</strong> 30+ verified past examination papers with solution schemes and difficulty labels.</li>
            <li><strong>Digital Noticeboard:</strong> Real-time prioritized college notices (urgent, important, normal).</li>
            <li><strong>Interactive Campus Masterplan:</strong> 20+ mapped buildings with percentage coordinates and opening hours.</li>
            <li><strong>Live Office Timings:</strong> Dynamic open/closed status calculation with lunch hour detection.</li>
          </ul>
        </div>
      </div>

      {/* 2. Key Modules & Features Overview */}
      <div className="bg-cream/40 dark:bg-dark-card rounded-3xl p-6 sm:p-10 border border-sage/20 dark:border-dark-border space-y-6">
        <h2 className="font-serif text-3xl font-bold text-forest dark:text-white text-center">
          Core Pillars of Campusly
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: 'Academic Reading Room', icon: BookOpen, desc: '11 engineering departments, 35 curated textbooks, lecture notes, lab manuals, and syllabus guidelines.' },
            { title: 'Exam Vault (PYQs)', icon: Layers, desc: 'End-sem, mid-sem, and unit test question papers filterable by semester, year, and department.' },
            { title: 'Digital Noticeboard', icon: Bell, desc: 'Live announcements categorized by exam, placement, academic, and events with urgent priority alerts.' },
            { title: 'Campus Map & Navigation', icon: Map, desc: 'Custom vector layout of SOIT campus with buildings, labs, sports fields, hostels, and amenities.' },
            { title: 'Live Office Timings', icon: Clock, desc: 'Live minute-level open/closed calculations for 16 key college offices with lunch break awareness.' },
            { title: 'Local Student Discovery', icon: Compass, desc: 'Curated directory of 30 nearby food joints, xerox printing shops, transit stops, and essential services.' },
            { title: 'Freshers’ Onboarding', icon: Users, desc: '12 survival guides and an interactive first-week checklist stored directly in browser local storage.' },
            { title: 'Study Task Planner', icon: CheckCircle2, desc: 'Personal task manager with deadline tracking, subject tagging, and radial completion metrics.' },
            { title: 'Admin Governance', icon: ShieldCheck, desc: 'Dedicated administrator dashboard for managing academic resources, notices, and departments.' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-dark-bg/60 border border-sage/20 dark:border-dark-border">
                <div className="p-2.5 rounded-xl bg-forest/10 dark:bg-forest/30 text-forest dark:text-sage inline-block mb-3">
                  <Icon size={18} />
                </div>
                <h3 className="font-serif text-base font-bold text-ink dark:text-white mb-1">{item.title}</h3>
                <p className="text-xs text-ink/70 dark:text-dark-text/70 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. The Analog Campus Design Philosophy */}
      <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-10 border border-sage/20 dark:border-dark-border space-y-6">
        <div className="max-w-2xl">
          <span className="section-label text-terracotta font-mono">Creative Direction</span>
          <h2 className="font-serif text-3xl font-bold text-forest dark:text-white mt-1">
            "The Analog Campus — Digital, But Human"
          </h2>
          <p className="text-xs sm:text-sm text-ink/70 dark:text-dark-text/70 mt-2 leading-relaxed">
            Rather than creating another generic blue-purple AI dashboard with repetitive rectangular cards, Campusly was conceived around physical stationery, college library wood, printed examination papers, and warm architectural tones:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl border border-sage/30 bg-[#F6F1E7] text-[#252923]">
            <div className="w-4 h-4 rounded-full bg-[#F6F1E7] border border-black/20 mb-2" />
            <p className="font-bold">Warm Ivory</p>
            <p className="text-[10px] opacity-70">#F6F1E7</p>
          </div>
          <div className="p-3 rounded-xl border border-sage/30 bg-[#183D32] text-white">
            <div className="w-4 h-4 rounded-full bg-[#183D32] mb-2" />
            <p className="font-bold">Deep Forest</p>
            <p className="text-[10px] opacity-70">#183D32</p>
          </div>
          <div className="p-3 rounded-xl border border-sage/30 bg-[#C66B4E] text-white">
            <div className="w-4 h-4 rounded-full bg-[#C66B4E] mb-2" />
            <p className="font-bold">Terracotta</p>
            <p className="text-[10px] opacity-70">#C66B4E</p>
          </div>
          <div className="p-3 rounded-xl border border-sage/30 bg-[#D7AA48] text-[#252923]">
            <div className="w-4 h-4 rounded-full bg-[#D7AA48] mb-2" />
            <p className="font-bold">Academic Mustard</p>
            <p className="text-[10px] opacity-70">#D7AA48</p>
          </div>
        </div>
      </div>

      {/* 4. Technical Architecture & Tech Stack */}
      <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-10 border border-sage/20 dark:border-dark-border space-y-6">
        <div className="flex items-center gap-2">
          <Code2 size={24} className="text-forest dark:text-sage" />
          <h2 className="font-serif text-3xl font-bold text-forest dark:text-white">
            Technical Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          <div className="p-4 rounded-2xl bg-cream/30 dark:bg-dark-bg/50 border border-sage/20 space-y-2">
            <p className="font-mono font-bold text-forest dark:text-sage uppercase text-[11px]">Frontend Core</p>
            <ul className="space-y-1.5 text-ink/80 dark:text-dark-text/80">
              <li>• <strong>React 19:</strong> Functional component architecture with hooks</li>
              <li>• <strong>TypeScript 5.8:</strong> Strict typing across all data entities</li>
              <li>• <strong>Vite 8:</strong> High-speed bundling with Rollup optimization</li>
              <li>• <strong>React Router v7:</strong> Client-side multi-page routing</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-cream/30 dark:bg-dark-bg/50 border border-sage/20 space-y-2">
            <p className="font-mono font-bold text-terracotta uppercase text-[11px]">Design & Styling</p>
            <ul className="space-y-1.5 text-ink/80 dark:text-dark-text/80">
              <li>• <strong>Tailwind CSS v4:</strong> Custom theme tokens & utility classes</li>
              <li>• <strong>Framer Motion:</strong> Declarative animations & transitions</li>
              <li>• <strong>Lucide React:</strong> Consistent scalable SVG icon sets</li>
              <li>• <strong>DM Typography:</strong> DM Serif Display, DM Sans, DM Mono</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-cream/30 dark:bg-dark-bg/50 border border-sage/20 space-y-2">
            <p className="font-mono font-bold text-mustard uppercase text-[11px]">State & Storage</p>
            <ul className="space-y-1.5 text-ink/80 dark:text-dark-text/80">
              <li>• <strong>ThemeContext:</strong> Light/Dark theme persistence</li>
              <li>• <strong>StudentContext:</strong> Profile, bookmarks & task state</li>
              <li>• <strong>HTML5 LocalStorage:</strong> Zero-latency client persistence</li>
              <li>• <strong>Cross-Category Search:</strong> Instant indexed search engine</li>
            </ul>
          </div>
        </div>

        {/* Textual Architecture Flow */}
        <div className="p-4 sm:p-5 rounded-2xl bg-cream/50 dark:bg-dark-bg/60 border border-sage/20 font-mono text-[11px] leading-relaxed text-ink/80 dark:text-dark-text/80">
          <p className="font-bold text-forest dark:text-sage mb-2 uppercase">[Architecture Pipeline]</p>
          <p>User Interaction → TopNav / Sidebar Router → 17 Distinct Views</p>
          <p>↓ Global Search Query → `useSearch` Multi-Entity Query Engine (Books, PYQs, Notices, Offices, Places)</p>
          <p>↓ Local Actions → `StudentContext` ↔ `localStorage` (Bookmarks, Study Tasks, Recent History)</p>
          <p>↓ Theme Engine → `ThemeContext` ↔ `document.documentElement.classList.toggle('dark')`</p>
        </div>
      </div>

      {/* 5. Demo Status & Future Roadmap */}
      <div className="bg-cream/40 dark:bg-dark-card rounded-3xl p-6 sm:p-8 border border-sage/20 dark:border-dark-border space-y-4">
        <h2 className="font-serif text-2xl font-bold text-forest dark:text-white">Future Roadmap</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-ink/80 dark:text-dark-text/80">
          <div className="p-3 bg-white dark:bg-dark-bg rounded-xl border border-sage/15 space-y-1">
            <p className="font-bold text-forest dark:text-white">1. Real University ERP & Biometric Integration</p>
            <p className="text-ink/60 dark:text-dark-text/60">Direct synchronization with university attendance and grade card databases.</p>
          </div>
          <div className="p-3 bg-white dark:bg-dark-bg rounded-xl border border-sage/15 space-y-1">
            <p className="font-bold text-forest dark:text-white">2. Cloud Object Storage for Student Submissions</p>
            <p className="text-ink/60 dark:text-dark-text/60">Secure cloud buckets for submitting assignments and certified lab journals.</p>
          </div>
          <div className="p-3 bg-white dark:bg-dark-bg rounded-xl border border-sage/15 space-y-1">
            <p className="font-bold text-forest dark:text-white">3. Push Notifications & PWA Mobile App</p>
            <p className="text-ink/60 dark:text-dark-text/60">Installable Progressive Web App with offline caching and native push alerts.</p>
          </div>
          <div className="p-3 bg-white dark:bg-dark-bg rounded-xl border border-sage/15 space-y-1">
            <p className="font-bold text-forest dark:text-white">4. Multi-College Federation</p>
            <p className="text-ink/60 dark:text-dark-text/60">Extending Campusly to multiple university campuses with isolated tenant domains.</p>
          </div>
        </div>
      </div>

      {/* 6. Credits & Community */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 border border-sage/20 dark:border-dark-border space-y-3">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-terracotta fill-terracotta" />
            <h2 className="font-serif text-xl font-bold text-forest dark:text-white">Project Credits</h2>
          </div>
          <p className="text-xs sm:text-sm text-ink/70 dark:text-dark-text/70 leading-relaxed">
            Designed and engineered with care for students and academia. Built with open-source tools: React, Vite, Tailwind CSS, Framer Motion, and Lucide React. Dedicated to every college student who has ever arrived at an office during a lunch break or lost a syllabus PDF the night before an examination.
          </p>
          <div className="pt-2 text-xs font-mono text-forest dark:text-sage">
            Created for Saint Oxford Institute of Technology (SOIT)
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 border border-sage/20 dark:border-dark-border space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={20} className="text-forest dark:text-sage" />
            <h2 className="font-serif text-xl font-bold text-forest dark:text-white">Contact & Feedback</h2>
          </div>
          <p className="text-xs sm:text-sm text-ink/70 dark:text-dark-text/70 leading-relaxed">
            Campusly is an open student initiative. Have a suggestion, noticed a broken timetable, or want to contribute new study material for your department?
          </p>
          <div className="pt-2 text-xs font-mono space-y-1 text-ink/80 dark:text-dark-text/80">
            <p><strong>Student Support:</strong> support@campusly.soit.edu</p>
            <p><strong>Open Source Repo:</strong> github.com/your-username/campusly</p>
          </div>
        </div>
      </div>

      {/* Back to Home CTA */}
      <div className="text-center pt-4">
        <Link to="/" className="btn-primary text-sm py-3 px-6 inline-flex items-center gap-2">
          <span>Return to Campus Dashboard</span>
          <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}
