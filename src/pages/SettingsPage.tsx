import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Bell, BookOpen, Database, Info, Shield, Smartphone, Check, Trash2, RefreshCw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useStudent } from '../contexts/StudentContext';
import { departments } from '../data/departments';
import { defaultStudent } from '../data/studentProfile';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { profile, updateProfile, setProfile, clearRecentViews } = useStudent();
  const [activeSection, setActiveSection] = useState<'appearance' | 'academic' | 'notifications' | 'data' | 'about'>('appearance');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [notifications, setNotifications] = useState({
    examAlerts: true,
    deadlineReminders: true,
    eventAnnouncements: true,
    placementUpdates: true
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetData = () => {
    localStorage.removeItem('campusly-profile');
    localStorage.removeItem('campusly-bookmarks');
    localStorage.removeItem('campusly-recent');
    localStorage.removeItem('campusly-tasks');
    setProfile(defaultStudent);
    showToast('All demo storage reset to default factory state.');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="mb-4 bg-forest text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-medium shadow-sm">
          <Check size={16} className="text-mustard" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="mb-8">
        <span className="section-label text-forest dark:text-sage mb-1 block">Preferences & Control</span>
        <h1 className="text-4xl font-serif text-forest dark:text-white mb-2">Settings</h1>
        <p className="text-ink/70 dark:text-dark-text/70 text-sm">
          Customize your visual theme, academic defaults, notifications, and local storage data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Navigation Tabs */}
        <div className="md:col-span-4 lg:col-span-3 space-y-1.5">
          {[
            { id: 'appearance', label: 'Appearance', icon: Sun },
            { id: 'academic', label: 'Academic Defaults', icon: BookOpen },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'data', label: 'Local Data & Cache', icon: Database },
            { id: 'about', label: 'About Campusly', icon: Info },
          ].map(section => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as any)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-forest text-white shadow-xs font-semibold'
                    : 'text-ink/70 dark:text-dark-text/70 hover:bg-cream dark:hover:bg-dark-card'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-mustard' : 'opacity-70'} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Section */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          
          {/* Appearance Section */}
          {activeSection === 'appearance' && (
            <section className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-sage/20 dark:border-dark-border shadow-xs space-y-6">
              <h2 className="text-xl font-serif text-forest dark:text-white pb-3 border-b border-sage/15 flex items-center gap-2">
                <Sun className="text-mustard" size={20} />
                <span>Appearance & Color Theme</span>
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-ink dark:text-white">Editorial Analog Campus Theme</h3>
                  <p className="text-xs text-ink/60 dark:text-dark-text/60 mt-0.5">
                    Toggle between Warm Ivory Paper Cream mode and Deep Ink Dark mode.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-cream/50 dark:bg-dark-bg p-1 rounded-xl border border-sage/20">
                  <button 
                    onClick={() => theme === 'dark' && toggleTheme()}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      theme === 'light' ? 'bg-white shadow-xs text-forest' : 'text-ink/60 hover:text-ink'
                    }`}
                  >
                    <Sun size={14} className="text-mustard" />
                    <span>Light (Ivory)</span>
                  </button>
                  <button 
                    onClick={() => theme === 'light' && toggleTheme()}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      theme === 'dark' ? 'bg-dark-card shadow-xs text-white' : 'text-ink/60 hover:text-ink'
                    }`}
                  >
                    <Moon size={14} className="text-sage" />
                    <span>Dark (Ink)</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Academic Defaults */}
          {activeSection === 'academic' && (
            <section className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-sage/20 dark:border-dark-border shadow-xs space-y-6">
              <h2 className="text-xl font-serif text-forest dark:text-white pb-3 border-b border-sage/15 flex items-center gap-2">
                <BookOpen className="text-forest dark:text-sage" size={20} />
                <span>Academic Defaults</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                <div>
                  <label className="block text-ink/70 dark:text-dark-text/70 mb-1.5">Primary Department</label>
                  <select 
                    className="input-field text-xs py-2"
                    value={profile.departmentId}
                    onChange={(e) => {
                      const d = departments.find(dept => dept.id === e.target.value);
                      if (d) {
                        updateProfile({ department: d.name, departmentId: d.id });
                        showToast(`Default department set to ${d.name}`);
                      }
                    }}
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.shortName})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-ink/70 dark:text-dark-text/70 mb-1.5">Default Semester</label>
                  <select 
                    className="input-field text-xs py-2"
                    value={profile.semester}
                    onChange={(e) => {
                      updateProfile({ semester: Number(e.target.value) });
                      showToast(`Semester set to ${e.target.value}`);
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <section className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-sage/20 dark:border-dark-border shadow-xs space-y-6">
              <h2 className="text-xl font-serif text-forest dark:text-white pb-3 border-b border-sage/15 flex items-center gap-2">
                <Bell className="text-terracotta" size={20} />
                <span>Notification Preferences</span>
              </h2>

              <div className="space-y-4">
                {[
                  { key: 'examAlerts', title: 'Examination & Hall Ticket Alerts', desc: 'Critical alerts when exam dates or seating arrangements are updated.' },
                  { key: 'deadlineReminders', title: 'Assignment & Study Planner Deadlines', desc: 'Reminders 24 hours before coursework submission deadlines.' },
                  { key: 'eventAnnouncements', title: 'Campus Fests & Cultural Notices', desc: 'Happenings, Symphony fest auditions, and sports trials.' },
                  { key: 'placementUpdates', title: 'Placement & Internship Drives', desc: 'Urgent notices for on-campus company recruitment.' }
                ].map((item) => {
                  const val = notifications[item.key as keyof typeof notifications];
                  return (
                    <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-cream/30 dark:bg-dark-bg/40 border border-sage/15">
                      <div>
                        <p className="text-xs font-semibold text-ink dark:text-white">{item.title}</p>
                        <p className="text-[11px] text-ink/50 dark:text-dark-text/50">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => {
                          setNotifications(prev => ({ ...prev, [item.key]: !val }));
                          showToast(`${item.title} toggled`);
                        }}
                        className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${val ? 'bg-forest' : 'bg-sage/40'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${val ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Local Data & Cache */}
          {activeSection === 'data' && (
            <section className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-sage/20 dark:border-dark-border shadow-xs space-y-6">
              <h2 className="text-xl font-serif text-forest dark:text-white pb-3 border-b border-sage/15 flex items-center gap-2">
                <Database className="text-forest dark:text-sage" size={20} />
                <span>Local Storage & Data State</span>
              </h2>

              <p className="text-xs text-ink/70 dark:text-dark-text/70 leading-relaxed">
                Campusly stores bookmarks, checklist progress, recent views, and study planner tasks in your browser's local storage. You can clear temporary history or reset the demo state at any time.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-cream/30 dark:bg-dark-bg/40 border border-sage/15">
                  <div>
                    <p className="text-xs font-semibold text-ink dark:text-white">Clear Recently Viewed History</p>
                    <p className="text-[11px] text-ink/50">Removes resource and paper access history.</p>
                  </div>
                  <button
                    onClick={() => {
                      clearRecentViews();
                      showToast('Recent access history cleared.');
                    }}
                    className="btn-secondary text-xs py-1.5 px-3"
                  >
                    Clear History
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30">
                  <div>
                    <p className="text-xs font-semibold text-red-800 dark:text-red-300">Reset Demo Storage</p>
                    <p className="text-[11px] text-red-600 dark:text-red-400">Restores all student profiles, bookmarks, and sample tasks.</p>
                  </div>
                  <button
                    onClick={handleResetData}
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors flex items-center gap-1"
                  >
                    <RefreshCw size={13} />
                    <span>Reset All</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* About Section */}
          {activeSection === 'about' && (
            <section className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-sage/20 dark:border-dark-border shadow-xs space-y-4">
              <h2 className="text-xl font-serif text-forest dark:text-white pb-3 border-b border-sage/15 flex items-center gap-2">
                <Info className="text-mustard" size={20} />
                <span>About Campusly</span>
              </h2>

              <div className="space-y-3 text-xs text-ink/80 dark:text-dark-text/80 leading-relaxed font-sans">
                <p>
                  <strong>Campusly v2.4 (Production Release)</strong> — Designed and built for Saint Oxford Institute of Technology (SOIT).
                </p>
                <p>
                  Built with React 19, TypeScript, Tailwind CSS v4, and Framer Motion following <em>"The Analog Campus — Digital, But Human"</em> design philosophy.
                </p>
                <div className="pt-2">
                  <a href="/about" className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5">
                    <span>Read Full About Campusly & Architecture</span>
                  </a>
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
