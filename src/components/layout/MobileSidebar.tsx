import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Home,
  BookOpen,
  FileText,
  ClipboardList,
  Bell,
  Map,
  Compass,
  GraduationCap,
  Clock,
  Calendar,
  Bookmark,
  Download,
  Target,
  User,
  HelpCircle,
  Settings,
  Library,
  Shield,
  Sparkles,
  Info
} from 'lucide-react';
import { useStudent } from '../../contexts/StudentContext';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

const mainNav = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: BookOpen, label: 'Academics', path: '/academics' },
  { icon: FileText, label: 'Question Papers', path: '/question-papers' },
  { icon: ClipboardList, label: 'Assignments', path: '/assignments' },
  { icon: Bell, label: 'Announcements', path: '/announcements' },
];

const campusNav = [
  { icon: Map, label: 'Campus Map', path: '/campus-map' },
  { icon: Compass, label: 'Explore Nearby', path: '/explore-nearby' },
  { icon: GraduationCap, label: "Freshers' Guide", path: '/freshers-guide' },
  { icon: Clock, label: 'Office Timings', path: '/office-timings' },
  { icon: Calendar, label: 'Academic Calendar', path: '/calendar' },
];

const personalNav = [
  { icon: Bookmark, label: 'My Bookmarks', path: '/bookmarks' },
  { icon: Download, label: 'My Downloads', path: '/downloads' },
  { icon: Target, label: 'Study Planner', path: '/study-planner' },
  { icon: User, label: 'My Profile', path: '/profile' },
];

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose, isAdmin = false }) => {
  const { profile, setProfile } = useStudent();
  const navigate = useNavigate();

  const toggleAdminRole = () => {
    if (setProfile) {
      setProfile((prev: any) => ({
        ...prev,
        role: prev.role === 'admin' ? 'student' : 'admin'
      }));
    }
  };

  const NavItem = ({ icon: Icon, label, path }: { icon: any; label: string; path: string }) => (
    <NavLink
      to={path}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
        ${isActive 
          ? 'bg-forest text-white shadow-xs font-semibold' 
          : 'text-ink/80 hover:bg-cream dark:text-dark-text/80 dark:hover:bg-dark-bg'
        }`
      }
    >
      <Icon size={19} />
      <span>{label}</span>
    </NavLink>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/40 dark:bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-dark-card z-50 flex flex-col md:hidden shadow-2xl transition-colors"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-sage/20 dark:border-dark-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-forest text-white flex items-center justify-center shadow-xs">
                  <Library size={20} />
                </div>
                <div>
                  <span className="font-serif text-xl font-bold tracking-tight text-forest dark:text-white">Campusly</span>
                  <span className="block text-[10px] font-mono text-terracotta tracking-wider uppercase font-semibold">SOIT Student Hub</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-ink/60 hover:bg-cream dark:text-dark-text/60 dark:hover:bg-dark-bg"
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Navigation */}
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
              <div>
                <p className="section-label mb-1.5 px-3 text-[11px]">Academic Essentials</p>
                <div className="space-y-0.5">
                  {mainNav.map((item) => (
                    <NavItem key={item.path} {...item} />
                  ))}
                </div>
              </div>

              <div>
                <p className="section-label mb-1.5 px-3 text-[11px]">Campus Life</p>
                <div className="space-y-0.5">
                  {campusNav.map((item) => (
                    <NavItem key={item.path} {...item} />
                  ))}
                </div>
              </div>

              <div>
                <p className="section-label mb-1.5 px-3 text-[11px]">Personal Shelf</p>
                <div className="space-y-0.5">
                  {personalNav.map((item) => (
                    <NavItem key={item.path} {...item} />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-sage/20 dark:border-dark-border space-y-1 bg-cream/30 dark:bg-dark-bg/40">
              <NavItem icon={Info} label="About Campusly" path="/about" />
              <NavItem icon={HelpCircle} label="Help & Support" path="/help" />
              <NavItem icon={Settings} label="Settings" path="/settings" />
              {(isAdmin || profile.role === 'admin') && (
                <NavItem icon={Shield} label="Admin Dashboard" path="/admin" />
              )}
              
              {/* Demo Mode Toggle */}
              <div className="pt-2">
                <button
                  onClick={toggleAdminRole}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono bg-white dark:bg-dark-card border border-sage/30 dark:border-dark-border text-ink dark:text-dark-text hover:border-forest"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className={profile.role === 'admin' ? 'text-terracotta' : 'text-forest'} />
                    <span>Mode: <strong className="uppercase">{profile.role}</strong></span>
                  </div>
                  <span className="text-[10px] text-forest dark:text-sage font-medium underline">Switch</span>
                </button>
              </div>

              {/* Dynamic Student Info Box */}
              <div 
                onClick={() => {
                  navigate('/profile');
                  onClose();
                }}
                className="mt-2 pt-3 border-t border-sage/20 dark:border-dark-border flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-cream/60 dark:hover:bg-dark-bg/60 cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center font-bold font-serif shadow-xs">
                  {profile.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink dark:text-white truncate">{profile.name}</p>
                  <p className="text-xs text-ink/60 dark:text-dark-text/60 truncate">
                    {profile.department} • Yr {profile.year}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
