import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, FileText, Calendar, Bell, 
  Map, Coffee, Clock, ChevronRight, 
  AlertCircle, X, Compass, ShoppingBag, MapPin, Bus, CheckCircle2, ArrowRight
} from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';
import { departments } from '../data/departments';
import { announcements } from '../data/announcements';
import { assignments } from '../data/assignments';
import { questionPapers } from '../data/questionPapers';
import { officeTimings } from '../data/officeTimings';
import { isOfficeOpen, getGreeting } from '../utils/helpers';
import { CampusIllustration } from '../components/illustrations/CampusIllustration';

export default function HomePage() {
  const { profile, recentViews } = useStudent();
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);

  // Dynamic department and current subjects
  const currentDept = departments.find(d => d.id === profile.departmentId) || departments[0];
  const currentYearObj = currentDept.years.find(y => y.year === profile.year);
  const currentSemObj = currentYearObj?.semesters.find(s => s.number === profile.semester);
  const currentSubjects = currentSemObj?.subjects || currentDept.years[0]?.semesters[0]?.subjects || [];

  // Urgent notice
  const urgentAnnouncement = announcements.find(a => a.priority === 'urgent');

  // Nearest upcoming deadlines from assignments
  const upcomingAssignments = assignments
    .filter(a => a.status === 'upcoming' || a.status === 'important')
    .slice(0, 3);

  // Recent announcements for noticeboard
  const latestNotices = announcements.slice(0, 3);

  // Open offices right now
  const openOfficesCount = officeTimings.filter(o => isOfficeOpen(o)).length;

  const greeting = getGreeting(profile.name);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-dark-bg paper-texture pb-20 transition-colors">
      
      {/* Important Notices Banner */}
      <AnimatePresence>
        {showBanner && urgentAnnouncement && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-terracotta text-white overflow-hidden rounded-xl mb-6 shadow-sm"
          >
            <div className="px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <AlertCircle size={18} className="shrink-0 animate-pulse text-amber-200" />
                <p className="text-xs sm:text-sm font-medium truncate">
                  <strong className="uppercase font-mono tracking-wider mr-1.5">[Urgent Notice]</strong>
                  {urgentAnnouncement.title}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link to="/announcements" className="text-xs underline font-medium hover:text-amber-200">
                  Read Notice →
                </Link>
                <button 
                  onClick={() => setShowBanner(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                  aria-label="Dismiss notice"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="space-y-8">
        
        {/* Editorial Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-cream dark:bg-dark-card rounded-3xl p-6 sm:p-10 overflow-hidden shadow-[var(--shadow-card)] border border-sage/20 dark:border-dark-border"
        >
          <div className="relative z-10 max-w-2xl">
            <span className="section-label text-forest dark:text-sage mb-2 block">
              {profile.department} • Saint Oxford Institute of Technology
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-forest dark:text-white mb-3 leading-tight tracking-tight">
              {greeting}
            </h1>
            
            <p className="text-base sm:text-lg text-forest/80 dark:text-dark-text/80 mb-6 font-sans">
              "Your campus, everything connected. Into your notes, question papers, campus navigation, and student life."
            </p>
            
            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-3 py-1 bg-forest/10 dark:bg-forest/30 text-forest dark:text-white font-mono text-xs rounded-lg border border-forest/20">
                Year {profile.year} Engineering
              </span>
              <span className="text-forest/30 dark:text-dark-border">•</span>
              <span className="px-3 py-1 bg-mustard/20 text-ink dark:text-mustard font-mono text-xs rounded-lg border border-mustard/30">
                Semester {profile.semester}
              </span>
              <span className="text-forest/30 dark:text-dark-border">•</span>
              <span className="px-3 py-1 bg-sage/20 text-forest dark:text-sage font-mono text-xs rounded-lg border border-sage/30">
                ID: {profile.studentId}
              </span>
            </div>
          </div>

          {/* Handcrafted Campus Vector Scene */}
          <div className="absolute right-0 bottom-0 top-0 w-2/5 hidden md:flex items-center justify-end pr-6 opacity-95 pointer-events-none">
            <CampusIllustration className="scale-105 origin-bottom-right drop-shadow-sm" />
          </div>
        </motion.section>

        {/* Quick Context Action Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          <Link 
            to="/question-papers" 
            className="p-4 sm:p-5 rounded-2xl bg-terracotta/10 border border-terracotta/25 hover:bg-terracotta/20 transition-all group flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono text-terracotta uppercase tracking-wider font-semibold">Exams Coming?</span>
              <h3 className="font-serif text-terracotta text-base sm:text-lg font-bold mt-1 group-hover:-translate-y-0.5 transition-transform">
                Exam Vault
              </h3>
            </div>
            <p className="text-xs text-terracotta/80 mt-3 flex items-center justify-between font-medium">
              <span>Solved PYQs</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>

          <Link 
            to="/freshers-guide" 
            className="p-4 sm:p-5 rounded-2xl bg-forest/10 border border-forest/25 hover:bg-forest/20 transition-all group flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono text-forest dark:text-sage uppercase tracking-wider font-semibold">New to SOIT?</span>
              <h3 className="font-serif text-forest dark:text-white text-base sm:text-lg font-bold mt-1 group-hover:-translate-y-0.5 transition-transform">
                Freshers' Guide
              </h3>
            </div>
            <p className="text-xs text-forest/80 dark:text-sage mt-3 flex items-center justify-between font-medium">
              <span>Survival Handbook</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>

          <Link 
            to="/office-timings" 
            className="p-4 sm:p-5 rounded-2xl bg-mustard/15 border border-mustard/30 hover:bg-mustard/25 transition-all group flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono text-ink/70 dark:text-mustard uppercase tracking-wider font-semibold">Going to Office?</span>
              <h3 className="font-serif text-ink dark:text-white text-base sm:text-lg font-bold mt-1 group-hover:-translate-y-0.5 transition-transform">
                Office Hours
              </h3>
            </div>
            <p className="text-xs text-ink/80 dark:text-mustard mt-3 flex items-center justify-between font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {openOfficesCount} Open Now
              </span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>

          <Link 
            to="/explore-nearby" 
            className="p-4 sm:p-5 rounded-2xl bg-lavender/25 border border-lavender/40 hover:bg-lavender/35 transition-all group flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono text-ink/70 dark:text-lavender uppercase tracking-wider font-semibold">Hungry or Need Prints?</span>
              <h3 className="font-serif text-ink dark:text-white text-base sm:text-lg font-bold mt-1 group-hover:-translate-y-0.5 transition-transform">
                Explore Nearby
              </h3>
            </div>
            <p className="text-xs text-ink/80 dark:text-lavender mt-3 flex items-center justify-between font-medium">
              <span>Chai, Xerox & Fun</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>
        </motion.div>

        {/* Asymmetric Dashboard Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {/* Large Card - Academic Resources / Reading Room */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-2 lg:col-span-2 bg-white dark:bg-dark-card rounded-2xl p-6 shadow-[var(--shadow-card)] border border-sage/20 dark:border-dark-border flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="section-label text-forest dark:text-sage">Academic Reading Room</span>
                  <h2 className="text-2xl font-serif text-forest dark:text-white mt-1">Into Your Subjects</h2>
                </div>
                <div className="p-2.5 bg-forest/10 dark:bg-forest/30 rounded-xl text-forest dark:text-white">
                  <BookOpen size={22} />
                </div>
              </div>
              
              <p className="text-xs text-ink/60 dark:text-dark-text/60 mb-3">
                Current semester curriculum courses for {currentDept.shortName}:
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {currentSubjects.map(sub => (
                  <Link 
                    key={sub.id} 
                    to={`/academics?search=${encodeURIComponent(sub.name)}`}
                    className="px-3 py-1.5 bg-cream/50 dark:bg-dark-bg/60 border border-sage/30 dark:border-dark-border rounded-xl text-xs font-medium text-ink dark:text-dark-text hover:border-forest dark:hover:border-sage transition-all"
                  >
                    <span className="font-mono text-forest dark:text-sage font-bold mr-1">{sub.code}:</span>
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-sage/10 dark:border-dark-border">
              <Link to="/academics" className="btn-primary text-xs py-2 px-3 text-center justify-center">
                Browse Books
              </Link>
              <Link to="/academics" className="btn-secondary text-xs py-2 px-3 text-center justify-center">
                Lecture Notes
              </Link>
              <Link to="/academics" className="btn-secondary text-xs py-2 px-3 text-center justify-center">
                Lab Manuals
              </Link>
            </div>
          </motion.div>

          {/* Medium Card - Previous Year Papers (Exam Vault) */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-1 lg:col-span-1 bg-terracotta/5 dark:bg-dark-card rounded-2xl p-6 shadow-[var(--shadow-card)] border border-terracotta/20 dark:border-dark-border flex flex-col justify-between"
          >
            <div>
              <span className="section-label text-terracotta">Exam Vault</span>
              <h2 className="text-2xl font-serif text-terracotta dark:text-terracotta-light mt-1 mb-2">Prepare Smarter</h2>
              
              <div className="my-3">
                <p className="text-4xl font-serif text-terracotta dark:text-terracotta-light mb-1">
                  {questionPapers.length}
                </p>
                <p className="text-xs text-ink/70 dark:text-dark-text/70 font-sans">
                  Archived University examination papers with answer keys
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-terracotta/15 dark:border-dark-border">
              <button 
                onClick={() => navigate('/question-papers?filter=end-semester')}
                className="w-full text-left px-3 py-2 bg-white/80 dark:bg-dark-bg/60 hover:bg-white rounded-xl text-xs text-ink dark:text-dark-text transition-colors border border-terracotta/10 flex justify-between items-center"
              >
                <span>End-Semester Papers</span>
                <span className="font-mono text-[10px] font-bold text-terracotta">2022-25</span>
              </button>
              <button 
                onClick={() => navigate('/question-papers?filter=mid-semester')}
                className="w-full text-left px-3 py-2 bg-white/80 dark:bg-dark-bg/60 hover:bg-white rounded-xl text-xs text-ink dark:text-dark-text transition-colors border border-terracotta/10 flex justify-between items-center"
              >
                <span>Mid-Semester Tests</span>
                <span className="font-mono text-[10px] font-bold text-terracotta">In-Sem</span>
              </button>
              <Link 
                to="/question-papers" 
                className="mt-1 text-terracotta font-medium text-xs flex items-center justify-between hover:underline pt-1"
              >
                <span>Open Paper Repository</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Compact Card - Upcoming Deadlines */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-1 lg:col-span-1 bg-mustard/10 dark:bg-dark-card rounded-2xl p-6 shadow-[var(--shadow-card)] border border-mustard/25 dark:border-dark-border flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="section-label text-ink dark:text-mustard">Deadlines</span>
                <Link to="/study-planner" className="text-xs text-forest dark:text-sage font-medium hover:underline">
                  Planner →
                </Link>
              </div>
              <h2 className="text-2xl font-serif text-ink dark:text-white mt-1 mb-3">Don't Forget</h2>
            </div>
            
            <div className="space-y-2.5 my-auto">
              {upcomingAssignments.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => navigate('/assignments')}
                  className="bg-white/80 dark:bg-dark-bg/70 p-3 rounded-xl border border-mustard/20 dark:border-dark-border cursor-pointer hover:border-forest transition-colors"
                >
                  <div className="flex justify-between items-center text-[10px] font-mono text-ink/60 dark:text-dark-text/60 mb-0.5">
                    <span>{item.subjectCode}</span>
                    <span className="text-terracotta font-bold">Due {item.deadline?.slice(5)}</span>
                  </div>
                  <p className="text-xs font-semibold text-ink dark:text-white line-clamp-1 leading-snug">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <Link 
              to="/assignments" 
              className="text-xs text-ink/70 dark:text-dark-text/70 hover:text-forest dark:hover:text-white flex items-center justify-between pt-2 border-t border-mustard/20 font-medium"
            >
              <span>View all coursework</span>
              <ChevronRight size={14} />
            </Link>
          </motion.div>

          {/* Medium Card - Announcements Noticeboard */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-2 lg:col-span-2 bg-white dark:bg-dark-card rounded-2xl p-6 shadow-[var(--shadow-card)] border border-sage/20 dark:border-dark-border flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="section-label text-forest dark:text-sage">Noticeboard</span>
                  <h2 className="text-2xl font-serif text-forest dark:text-white mt-1">From the Noticeboard</h2>
                </div>
                <Link to="/announcements" className="text-xs text-forest dark:text-sage font-medium hover:underline">
                  View All ({announcements.length}) →
                </Link>
              </div>

              <div className="divide-y divide-sage/10 dark:divide-dark-border">
                {latestNotices.map(notice => (
                  <div 
                    key={notice.id} 
                    onClick={() => navigate('/announcements')}
                    className="py-3 first:pt-0 last:pb-0 flex items-start gap-3 group cursor-pointer"
                  >
                    <div className={`mt-0.5 p-2 rounded-xl shrink-0 ${
                      notice.priority === 'urgent' 
                        ? 'bg-terracotta/10 text-terracotta' 
                        : notice.priority === 'important'
                        ? 'bg-mustard/20 text-ink dark:text-mustard'
                        : 'bg-sage/20 text-forest dark:text-sage'
                    }`}>
                      <Bell size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cream/70 dark:bg-dark-bg text-forest dark:text-sage font-semibold">
                          {notice.category}
                        </span>
                        <span className="text-[10px] text-ink/40 dark:text-dark-text/40 font-mono">
                          {notice.date}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-ink dark:text-dark-text group-hover:text-forest dark:group-hover:text-sage transition-colors truncate mt-1">
                        {notice.title}
                      </h3>
                      <p className="text-xs text-ink/60 dark:text-dark-text/60 line-clamp-1 mt-0.5">
                        {notice.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-sage/10 dark:border-dark-border mt-4 flex justify-between items-center text-xs">
              <span className="text-ink/60 dark:text-dark-text/60">Official notifications issued by Registrar & Examination Cell</span>
              <Link to="/announcements" className="text-forest dark:text-sage font-medium hover:underline">
                Open Board →
              </Link>
            </div>
          </motion.div>

          {/* Small Card - Campus Navigation */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-1 lg:col-span-1 bg-sage/10 dark:bg-dark-card rounded-2xl p-6 shadow-[var(--shadow-card)] border border-sage/25 dark:border-dark-border flex flex-col justify-between"
          >
            <div>
              <span className="section-label text-forest dark:text-sage">Interactive Map</span>
              <h2 className="text-2xl font-serif text-forest dark:text-white mt-1 mb-2">Find Your Way</h2>
              <p className="text-xs text-ink/70 dark:text-dark-text/70 mb-4">
                Interactive SVG masterplan of the 45-acre SOIT campus.
              </p>

              <div 
                onClick={() => navigate('/campus-map')}
                className="bg-white/70 dark:bg-dark-bg/60 rounded-xl border border-sage/30 dark:border-dark-border p-4 flex flex-col items-center justify-center cursor-pointer hover:border-forest transition-colors mb-4 group"
              >
                <Map size={36} className="text-forest dark:text-sage group-hover:scale-110 transition-transform mb-2" />
                <span className="text-xs font-semibold text-forest dark:text-white">Explore Campus Map</span>
                <span className="text-[10px] text-ink/50 dark:text-dark-text/50">20+ Interactive Landmarks</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-sage/15 dark:border-dark-border">
              <Link to="/campus-map?loc=loc-library" className="px-2.5 py-1.5 bg-white dark:bg-dark-bg text-forest dark:text-sage text-center text-xs rounded-lg border border-sage/20 font-medium hover:border-forest">
                Library
              </Link>
              <Link to="/campus-map?loc=loc-canteen" className="px-2.5 py-1.5 bg-white dark:bg-dark-bg text-forest dark:text-sage text-center text-xs rounded-lg border border-sage/20 font-medium hover:border-forest">
                Food Court
              </Link>
            </div>
          </motion.div>

          {/* Small Card - Explore Nearby */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-1 lg:col-span-1 bg-cream/70 dark:bg-dark-card rounded-2xl p-6 shadow-[var(--shadow-card)] border border-sage/20 dark:border-dark-border flex flex-col justify-between"
          >
            <div>
              <span className="section-label text-forest dark:text-sage">Local Directory</span>
              <h2 className="text-2xl font-serif text-forest dark:text-white mt-1 mb-3">Around Campus</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-2.5 my-2">
              <Link 
                to="/explore-nearby?category=food" 
                className="flex flex-col items-center justify-center p-3 bg-white/70 dark:bg-dark-bg/60 rounded-xl hover:bg-white dark:hover:bg-dark-bg transition-colors border border-sage/15 group"
              >
                <Coffee size={20} className="text-terracotta group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-ink dark:text-white mt-1.5">Food & Chai</span>
              </Link>
              <Link 
                to="/explore-nearby?category=shopping" 
                className="flex flex-col items-center justify-center p-3 bg-white/70 dark:bg-dark-bg/60 rounded-xl hover:bg-white dark:hover:bg-dark-bg transition-colors border border-sage/15 group"
              >
                <ShoppingBag size={20} className="text-mustard group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-ink dark:text-white mt-1.5">Xerox & Books</span>
              </Link>
              <Link 
                to="/explore-nearby?category=entertainment" 
                className="flex flex-col items-center justify-center p-3 bg-white/70 dark:bg-dark-bg/60 rounded-xl hover:bg-white dark:hover:bg-dark-bg transition-colors border border-sage/15 group"
              >
                <MapPin size={20} className="text-forest group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-ink dark:text-white mt-1.5">Gaming & Malls</span>
              </Link>
              <Link 
                to="/explore-nearby?category=transport" 
                className="flex flex-col items-center justify-center p-3 bg-white/70 dark:bg-dark-bg/60 rounded-xl hover:bg-white dark:hover:bg-dark-bg transition-colors border border-sage/15 group"
              >
                <Bus size={20} className="text-lavender group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-ink dark:text-white mt-1.5">Metro & Buses</span>
              </Link>
            </div>

            <Link 
              to="/explore-nearby" 
              className="text-xs text-forest dark:text-sage font-medium flex items-center justify-between pt-2 border-t border-sage/15 dark:border-dark-border"
            >
              <span>Explore 30 Student Spots</span>
              <ChevronRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Section Divider */}
        <div className="editorial-divider">
          <span className="text-sage dark:text-dark-text/40 font-serif italic text-base px-4">
            Today's Academic Flow
          </span>
        </div>

        {/* Today's Schedule Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-dark-card rounded-2xl shadow-[var(--shadow-card)] border border-sage/20 dark:border-dark-border p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <Clock size={20} className="text-forest dark:text-sage" />
              <h2 className="text-xl font-serif text-forest dark:text-white">Today's Class Timetable</h2>
            </div>
            <span className="text-xs font-mono text-ink/50 dark:text-dark-text/50">Wednesday Schedule</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 bg-cream/40 dark:bg-dark-bg/60 rounded-xl border border-sage/20 dark:border-dark-border">
              <div className="flex justify-between items-center text-[11px] font-mono text-ink/60 dark:text-dark-text/60 mb-1">
                <span>09:00 - 10:00 AM</span>
                <span className="badge-forest text-[10px]">Lecture</span>
              </div>
              <p className="font-semibold text-sm text-ink dark:text-white">Analog Electronics</p>
              <p className="text-xs text-ink/60 dark:text-dark-text/60 mt-1">Block B • Room B-201</p>
            </div>

            <div className="p-3.5 bg-cream/40 dark:bg-dark-bg/60 rounded-xl border border-sage/20 dark:border-dark-border">
              <div className="flex justify-between items-center text-[11px] font-mono text-ink/60 dark:text-dark-text/60 mb-1">
                <span>10:15 - 11:15 AM</span>
                <span className="badge-forest text-[10px]">Lecture</span>
              </div>
              <p className="font-semibold text-sm text-ink dark:text-white">Signals and Systems</p>
              <p className="text-xs text-ink/60 dark:text-dark-text/60 mt-1">Block B • Room B-204</p>
            </div>

            <div className="p-3.5 bg-cream/40 dark:bg-dark-bg/60 rounded-xl border border-sage/20 dark:border-dark-border">
              <div className="flex justify-between items-center text-[11px] font-mono text-ink/60 dark:text-dark-text/60 mb-1">
                <span>11:30 - 12:30 PM</span>
                <span className="badge-mustard text-[10px]">Tutorial</span>
              </div>
              <p className="font-semibold text-sm text-ink dark:text-white">Network Theory</p>
              <p className="text-xs text-ink/60 dark:text-dark-text/60 mt-1">Block B • Room B-102</p>
            </div>

            <div className="p-3.5 bg-cream/40 dark:bg-dark-bg/60 rounded-xl border border-sage/20 dark:border-dark-border">
              <div className="flex justify-between items-center text-[11px] font-mono text-ink/60 dark:text-dark-text/60 mb-1">
                <span>02:00 - 04:00 PM</span>
                <span className="badge-terracotta text-[10px]">Practical Lab</span>
              </div>
              <p className="font-semibold text-sm text-ink dark:text-white">Analog Circuits Lab</p>
              <p className="text-xs text-ink/60 dark:text-dark-text/60 mt-1">Hardware Wing • Lab 3</p>
            </div>
          </div>
        </motion.div>

        {/* Recently Viewed Resources Strip */}
        {recentViews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-forest dark:text-sage" />
                <h2 className="text-lg font-serif text-forest dark:text-white">Recently Accessed</h2>
              </div>
              <Link to="/bookmarks" className="text-xs text-forest dark:text-sage hover:underline font-medium">
                View Saved Shelf →
              </Link>
            </div>

            <div className="flex overflow-x-auto pb-2 gap-3 snap-x scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {recentViews.map(res => (
                <div 
                  key={res.id} 
                  onClick={() => navigate(res.url)}
                  className="snap-start shrink-0 w-64 bg-white dark:bg-dark-card rounded-2xl shadow-xs border border-sage/20 dark:border-dark-border p-3.5 flex items-center gap-3 cursor-pointer hover:border-forest transition-all"
                >
                  <div className="w-10 h-12 bg-cream dark:bg-dark-bg rounded-lg flex items-center justify-center shrink-0 border border-sage/20 text-forest dark:text-sage font-serif font-bold text-xs">
                    {res.type === 'book' ? 'BK' : res.type === 'paper' ? 'PYQ' : 'DOC'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-xs text-ink dark:text-white truncate">{res.title}</h3>
                    <p className="text-[10px] font-mono text-ink/50 dark:text-dark-text/50 uppercase mt-0.5">{res.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </main>
    </div>
  );
}
