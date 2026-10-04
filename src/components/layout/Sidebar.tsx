import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
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
  Shield,
  ChevronLeft,
  ChevronRight,
  Library,
  Sparkles,
  Info
} from 'lucide-react';
import { useStudent } from '../../contexts/StudentContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isAdmin?: boolean;
}

const mainNav = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: BookOpen, label: 'Academics', path: '/academics', badge: 'Library' },
  { icon: FileText, label: 'Question Papers', path: '/question-papers', badge: 'Vault' },
  { icon: ClipboardList, label: 'Assignments', path: '/assignments' },
  { icon: Bell, label: 'Announcements', path: '/announcements', badge: 'Notices' },
];

const campusNav = [
  { icon: Map, label: 'Campus Map', path: '/campus-map' },
  { icon: Compass, label: 'Explore Nearby', path: '/explore-nearby' },
  { icon: GraduationCap, label: "Freshers' Guide", path: '/freshers-guide' },
  { icon: Clock, label: 'Office Timings', path: '/office-timings', badge: 'Live' },
  { icon: Calendar, label: 'Academic Calendar', path: '/calendar' },
];

const personalNav = [
  { icon: Bookmark, label: 'My Bookmarks', path: '/bookmarks' },
  { icon: Download, label: 'My Downloads', path: '/downloads' },
  { icon: Target, label: 'Study Planner', path: '/study-planner' },
  { icon: User, label: 'My Profile', path: '/profile' },
];

const NavItem = ({ 
  icon: Icon, 
  label, 
  path, 
  collapsed, 
  badge 
}: { 
  icon: any; 
  label: string; 
  path: string; 
  collapsed: boolean; 
  badge?: string;
}) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group relative
        ${isActive 
          ? 'bg-forest text-white shadow-sm font-semibold' 
          : 'text-ink/70 hover:bg-cream dark:text-dark-text/70 dark:hover:bg-dark-bg hover:text-forest dark:hover:text-white'
        } ${collapsed ? 'justify-center px-0' : ''}`
      }
      title={collapsed ? label : undefined}
    >
      <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
        <Icon size={19} className="shrink-0 transition-transform group-hover:scale-105" />
        {!collapsed && (
          <span className="text-sm whitespace-nowrap">{label}</span>
        )}
      </div>

      {!collapsed && badge && (
        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-md bg-sage/20 text-forest dark:text-sage group-hover:bg-white/20">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, isAdmin = false }) => {
  const { profile, setProfile } = useStudent();

  const toggleAdminRole = () => {
    if (setProfile) {
      setProfile((prev: any) => ({
        ...prev,
        role: prev.role === 'admin' ? 'student' : 'admin'
      }));
    }
  };

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: collapsed ? 74 : 260 }}
      transition={{ duration: 0.2 }}
      className="hidden md:flex flex-col h-screen sticky top-0 bg-white dark:bg-dark-card border-r border-sage/20 dark:border-dark-border z-20 shrink-0 select-none transition-colors"
    >
      {/* Brand Header */}
      <div className="p-4 flex items-center gap-3 border-b border-sage/20 dark:border-dark-border h-16 box-border shrink-0">
        <div className="w-9 h-9 rounded-xl bg-forest text-white flex items-center justify-center shrink-0 shadow-xs">
          <Library size={20} />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-hidden whitespace-nowrap">
            <span className="font-serif text-xl font-bold tracking-tight text-forest dark:text-white">Campusly</span>
            <span className="block text-[10px] font-mono text-terracotta tracking-wider uppercase font-semibold">SOIT Student Hub</span>
          </motion.div>
        )}
      </div>

      {/* Navigation Scrollable Body */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-5 scrollbar-hide">
        <div>
          {!collapsed && <p className="section-label mb-1.5 px-3 text-[11px]">Academic Essentials</p>}
          <div className="space-y-0.5">
            {mainNav.map((item) => (
              <NavItem key={item.path} {...item} collapsed={collapsed} />
            ))}
          </div>
        </div>

        <div>
          {!collapsed && <p className="section-label mb-1.5 px-3 text-[11px]">Campus Life</p>}
          <div className="space-y-0.5">
            {campusNav.map((item) => (
              <NavItem key={item.path} {...item} collapsed={collapsed} />
            ))}
          </div>
        </div>

        <div>
          {!collapsed && <p className="section-label mb-1.5 px-3 text-[11px]">Personal Shelf</p>}
          <div className="space-y-0.5">
            {personalNav.map((item) => (
              <NavItem key={item.path} {...item} collapsed={collapsed} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation & Demo Role Switcher */}
      <div className="p-3 border-t border-sage/20 dark:border-dark-border space-y-1 bg-cream/30 dark:bg-dark-bg/40 shrink-0">
        <NavItem icon={Info} label="About Campusly" path="/about" collapsed={collapsed} />
        <NavItem icon={HelpCircle} label="Help & Support" path="/help" collapsed={collapsed} />
        <NavItem icon={Settings} label="Settings" path="/settings" collapsed={collapsed} />
        
        {/* Admin Dashboard Nav Item */}
        {(isAdmin || profile.role === 'admin') && (
          <NavItem icon={Shield} label="Admin Dashboard" path="/admin" collapsed={collapsed} badge="Manage" />
        )}

        {/* Demo Role Quick Toggle for Hackathon/Competition Evaluation */}
        {!collapsed ? (
          <div className="pt-2 mt-2 border-t border-sage/15 dark:border-dark-border">
            <button
              onClick={toggleAdminRole}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono bg-white dark:bg-dark-card border border-sage/30 dark:border-dark-border text-ink dark:text-dark-text hover:border-forest transition-all"
              title="Click to toggle between Student and Administrator demo view"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={14} className={profile.role === 'admin' ? 'text-terracotta' : 'text-forest'} />
                <span>Mode: <strong className="uppercase">{profile.role}</strong></span>
              </div>
              <span className="text-[10px] text-forest dark:text-sage font-medium underline">Switch</span>
            </button>
          </div>
        ) : (
          <button
            onClick={toggleAdminRole}
            className="w-full flex justify-center py-2 text-ink/70 hover:text-forest"
            title={`Current: ${profile.role}. Click to switch mode.`}
          >
            <Sparkles size={16} className={profile.role === 'admin' ? 'text-terracotta' : 'text-forest'} />
          </button>
        )}

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors w-full text-ink/70 hover:bg-cream dark:text-dark-text/70 dark:hover:bg-dark-bg text-sm mt-1 ${collapsed ? 'justify-center' : ''}`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} className="shrink-0" /> : <ChevronLeft size={18} className="shrink-0" />}
          {!collapsed && <span className="font-medium text-xs">Collapse Navigation</span>}
        </button>
      </div>
    </motion.aside>
  );
};
