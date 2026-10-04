import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Save, BookMarked, Download, Library, Bell, History, Settings, ExternalLink, Sparkles, Check, User } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';
import { departments } from '../data/departments';
import { useNavigate, Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { profile, updateProfile, bookmarks, recentViews, studyTasks } = useStudent();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    departmentId: profile.departmentId,
    year: profile.year,
    semester: profile.semester,
    studentId: profile.studentId,
    role: profile.role
  });

  const handleSave = () => {
    const selectedDept = departments.find(d => d.id === formData.departmentId) || departments[0];
    updateProfile({
      name: formData.name,
      email: formData.email,
      department: selectedDept.name,
      departmentId: selectedDept.id,
      year: Number(formData.year),
      semester: Number(formData.semester),
      studentId: formData.studentId,
      role: formData.role
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history' | 'tasks'>('bookmarks');

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Toast Alert */}
      {savedSuccess && (
        <div className="mb-4 bg-forest text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-medium shadow-sm">
          <Check size={16} className="text-mustard" />
          <span>Profile preferences saved successfully!</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 mb-8 border border-sage/20 dark:border-dark-border shadow-sm relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
          <div className="w-28 h-28 rounded-full bg-forest text-white flex items-center justify-center text-4xl font-serif font-bold shadow-lg shrink-0">
            {profile.name.charAt(0)}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-forest dark:text-white">{profile.name}</h1>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                profile.role === 'admin' ? 'bg-terracotta text-white' : 'bg-forest/15 text-forest dark:text-sage'
              }`}>
                {profile.role}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
              <span className="badge-forest text-xs">{profile.department}</span>
              <span className="badge-mustard text-xs">Year {profile.year}</span>
              <span className="badge-terracotta text-xs">Semester {profile.semester}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 font-mono text-xs text-ink/70 dark:text-dark-text/70">
              <span className="bg-cream dark:bg-dark-bg px-2.5 py-1 rounded-md border border-sage/20">
                PRN: {profile.studentId}
              </span>
              <span>{profile.email}</span>
              <span className="text-ink/40">• Joined {profile.joinedDate}</span>
            </div>
          </div>

          <button 
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className={isEditing ? "btn-primary text-xs py-2 px-4" : "btn-secondary text-xs py-2 px-4"}
          >
            {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
            <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
          </button>
        </div>
      </motion.div>

      {/* Grid: Preferences & Collections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Academic Customization */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-sage/20 dark:border-dark-border shadow-xs">
            <h2 className="text-lg font-serif text-forest dark:text-white mb-4 flex items-center gap-2 pb-3 border-b border-sage/15">
              <Settings className="text-forest dark:text-sage" size={18} />
              <span>Academic Settings</span>
            </h2>
            
            <div className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-ink/70 dark:text-dark-text/70 mb-1">Full Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field text-xs py-2"
                />
              </div>

              <div>
                <label className="block text-ink/70 dark:text-dark-text/70 mb-1">Department</label>
                <select 
                  className="input-field text-xs py-2"
                  value={formData.departmentId}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
                >
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.shortName})</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-ink/70 dark:text-dark-text/70 mb-1">Academic Year</label>
                  <select 
                    className="input-field text-xs py-2"
                    value={formData.year}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({...formData, year: Number(e.target.value)})}
                  >
                    <option value={1}>Year 1</option>
                    <option value={2}>Year 2</option>
                    <option value={3}>Year 3</option>
                    <option value={4}>Year 4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-ink/70 dark:text-dark-text/70 mb-1">Semester</label>
                  <select 
                    className="input-field text-xs py-2"
                    value={formData.semester}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({...formData, semester: Number(e.target.value)})}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>Sem {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-ink/70 dark:text-dark-text/70 mb-1">Demo Access Role</label>
                <select 
                  className="input-field text-xs py-2"
                  value={formData.role}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                >
                  <option value="student">Student Account</option>
                  <option value="admin">Administrator Account</option>
                </select>
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="btn-primary w-full justify-center text-xs py-2 mt-2"
                >
                  <Save size={15} /> Save Settings
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="bg-cream/40 dark:bg-dark-card rounded-2xl p-5 border border-sage/20 dark:border-dark-border">
            <h3 className="font-serif text-sm font-bold text-forest dark:text-white mb-3">Academic Footprint</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-white dark:bg-dark-bg rounded-xl border border-sage/15">
                <p className="font-serif text-xl font-bold text-forest dark:text-white">{bookmarks.length}</p>
                <p className="text-[10px] text-ink/60 dark:text-dark-text/60 font-mono">Saved</p>
              </div>
              <div className="p-2.5 bg-white dark:bg-dark-bg rounded-xl border border-sage/15">
                <p className="font-serif text-xl font-bold text-terracotta">{studyTasks.length}</p>
                <p className="text-[10px] text-ink/60 dark:text-dark-text/60 font-mono">Tasks</p>
              </div>
              <div className="p-2.5 bg-white dark:bg-dark-bg rounded-xl border border-sage/15">
                <p className="font-serif text-xl font-bold text-mustard">{recentViews.length}</p>
                <p className="text-[10px] text-ink/60 dark:text-dark-text/60 font-mono">Recents</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Collection & Activity */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-sage/20 dark:border-dark-border shadow-xs">
            {/* Tabs */}
            <div className="flex gap-2 pb-4 mb-4 border-b border-sage/15 dark:border-dark-border">
              <button
                onClick={() => setActiveTab('bookmarks')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'bookmarks' ? 'bg-forest text-white' : 'text-ink/60 hover:text-ink'
                }`}
              >
                Saved Shelf ({bookmarks.length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'history' ? 'bg-forest text-white' : 'text-ink/60 hover:text-ink'
                }`}
              >
                Recent Activity ({recentViews.length})
              </button>
            </div>

            {/* Tab 1: Bookmarks */}
            {activeTab === 'bookmarks' && (
              <div className="space-y-3">
                {bookmarks.length === 0 ? (
                  <p className="text-xs text-ink/50 dark:text-dark-text/50 py-6 text-center">No bookmarks saved yet.</p>
                ) : (
                  bookmarks.slice(0, 5).map(b => (
                    <div 
                      key={b.id}
                      onClick={() => navigate(b.url)}
                      className="p-3 bg-cream/30 dark:bg-dark-bg/40 rounded-xl border border-sage/15 flex items-center justify-between cursor-pointer hover:border-forest"
                    >
                      <div className="min-w-0">
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 bg-sage/20 text-forest rounded font-bold">
                          {b.type}
                        </span>
                        <p className="text-xs font-semibold text-ink dark:text-white truncate mt-0.5">{b.title}</p>
                      </div>
                      <ExternalLink size={14} className="text-ink/40 shrink-0" />
                    </div>
                  ))
                )}
                <div className="pt-2 text-right">
                  <Link to="/bookmarks" className="text-xs font-semibold text-forest dark:text-sage hover:underline">
                    View Complete Saved Shelf →
                  </Link>
                </div>
              </div>
            )}

            {/* Tab 2: Recent History */}
            {activeTab === 'history' && (
              <div className="space-y-3">
                {recentViews.length === 0 ? (
                  <p className="text-xs text-ink/50 dark:text-dark-text/50 py-6 text-center">No recent views recorded.</p>
                ) : (
                  recentViews.slice(0, 6).map(r => (
                    <div 
                      key={r.id}
                      onClick={() => navigate(r.url)}
                      className="p-3 bg-cream/30 dark:bg-dark-bg/40 rounded-xl border border-sage/15 flex items-center justify-between cursor-pointer hover:border-forest"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-ink dark:text-white truncate">{r.title}</p>
                        <p className="text-[10px] font-mono text-ink/50 dark:text-dark-text/50 uppercase mt-0.5">
                          {r.type} • {new Date(r.viewedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <ExternalLink size={14} className="text-ink/40 shrink-0" />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
