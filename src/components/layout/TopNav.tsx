import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Moon, Sun, User as UserIcon, Check, ExternalLink, Calendar } from 'lucide-react';
import { SearchBar } from '../ui/SearchBar';
import { useTheme } from '../../contexts/ThemeContext';
import { useStudent } from '../../contexts/StudentContext';
import { useNavigate } from 'react-router-dom';
import { announcements } from '../../data/announcements';
import { motion, AnimatePresence } from 'framer-motion';

interface TopNavProps {
  onMenuClick: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { profile } = useStudent();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close notifications on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const unreadCount = announcements.filter(a => !a.read).length;
  const recentAnnouncements = announcements.slice(0, 5);

  const getRomanSemester = (sem: number) => {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    return romans[sem - 1] || `${sem}`;
  };

  return (
    <header className="sticky top-0 z-30 bg-white/85 dark:bg-dark-card/90 backdrop-blur-md border-b border-sage/20 dark:border-dark-border h-16 flex items-center justify-between px-4 md:px-6 transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl text-ink/70 hover:bg-cream dark:text-dark-text/70 dark:hover:bg-dark-bg transition-colors"
          aria-label="Open mobile navigation menu"
        >
          <Menu size={22} />
        </button>
        <div className="hidden md:flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-forest text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">
            SO
          </div>
          <div>
            <h1 className="font-serif text-base font-bold text-forest dark:text-white leading-tight">
              Saint Oxford
            </h1>
            <p className="text-[10px] font-mono text-ink/50 dark:text-dark-text/50 uppercase tracking-widest leading-none">
              Institute of Technology
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-xl px-2 md:px-8 hidden sm:block">
        <SearchBar />
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Dynamic Semester Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-mustard/15 text-ink dark:text-white border border-mustard/30 text-xs font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-mustard animate-pulse" />
          <span>Semester {getRomanSemester(profile.semester)}</span>
        </div>

        {/* Quick Academic Calendar Link */}
        <button
          onClick={() => navigate('/calendar')}
          className="p-2 rounded-xl text-ink/70 hover:bg-cream dark:text-dark-text/70 dark:hover:bg-dark-bg transition-colors relative"
          title="Academic Calendar"
        >
          <Calendar size={18} />
        </button>

        {/* Interactive Notifications Dropdown */}
        <div ref={notificationRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-ink/70 hover:bg-cream dark:text-dark-text/70 dark:hover:bg-dark-bg transition-colors"
            title="Campus Notifications"
            aria-label="View notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-terracotta rounded-full ring-2 ring-white dark:ring-dark-card animate-pulse" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-dark-card rounded-2xl shadow-[var(--shadow-modal)] border border-sage/20 dark:border-dark-border overflow-hidden z-50"
              >
                <div className="p-3.5 border-b border-sage/10 dark:border-dark-border flex items-center justify-between bg-cream/30 dark:bg-dark-bg/40">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-forest dark:text-white">Campus Notices</span>
                    {unreadCount > 0 && (
                      <span className="badge-terracotta text-[10px] px-1.5 py-0.2">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      navigate('/announcements');
                      setShowNotifications(false);
                    }}
                    className="text-xs text-forest dark:text-sage hover:underline font-medium flex items-center gap-1"
                  >
                    View all <ExternalLink size={11} />
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-sage/10 dark:divide-dark-border">
                  {recentAnnouncements.map((ann) => (
                    <div 
                      key={ann.id}
                      onClick={() => {
                        navigate('/announcements');
                        setShowNotifications(false);
                      }}
                      className="p-3 hover:bg-cream/40 dark:hover:bg-dark-bg/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded font-medium ${
                          ann.priority === 'urgent' ? 'bg-terracotta/15 text-terracotta' :
                          ann.priority === 'important' ? 'bg-mustard/20 text-ink dark:text-mustard' :
                          'bg-sage/20 text-forest dark:text-sage'
                        }`}>
                          {ann.category}
                        </span>
                        <span className="text-[10px] text-ink/40 dark:text-dark-text/40 font-mono">
                          {ann.date}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-ink dark:text-dark-text mt-1 line-clamp-1">
                        {ann.title}
                      </p>
                      <p className="text-[11px] text-ink/60 dark:text-dark-text/60 line-clamp-2 mt-0.5">
                        {ann.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-cream/20 dark:bg-dark-bg/30 text-center border-t border-sage/10 dark:border-dark-border">
                  <button
                    onClick={() => {
                      navigate('/announcements');
                      setShowNotifications(false);
                    }}
                    className="w-full py-1.5 rounded-lg text-xs font-medium text-forest dark:text-white hover:bg-forest/10 dark:hover:bg-forest/20 transition-colors"
                  >
                    Open Digital Noticeboard →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle (Working Light/Dark) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-ink/70 hover:bg-cream dark:text-dark-text/70 dark:hover:bg-dark-bg transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun size={18} className="text-mustard" />
          ) : (
            <Moon size={18} className="text-forest" />
          )}
        </button>

        {/* User Profile Avatar with Direct Navigation */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-cream dark:hover:bg-dark-bg transition-colors group cursor-pointer"
          title="Open Profile & Settings"
        >
          <div className="w-8 h-8 rounded-full bg-forest text-white font-serif font-bold text-xs flex items-center justify-center shadow-xs ring-2 ring-transparent group-hover:ring-forest/30 transition-all">
            {profile.name.charAt(0)}
          </div>
          <span className="hidden xl:inline text-xs font-medium text-ink dark:text-dark-text group-hover:text-forest dark:group-hover:text-mustard transition-colors">
            {profile.name}
          </span>
        </button>
      </div>
    </header>
  );
};
