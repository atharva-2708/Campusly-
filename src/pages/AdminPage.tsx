import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, FileText, Bell, LayoutDashboard, Plus, Edit2, 
  Trash2, MapPin, Shield, Check, X, Compass, Library, Search
} from 'lucide-react';
import { departments } from '../data/departments';
import { announcements as initialAnnouncements } from '../data/announcements';
import { books as initialBooks } from '../data/books';
import { nearbyPlaces as initialNearby } from '../data/nearbyPlaces';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Resources' | 'Announcements' | 'Departments' | 'Nearby Places'>('Resources');
  const [announcementsList, setAnnouncementsList] = useState(initialAnnouncements);
  const [booksList, setBooksList] = useState(initialBooks);
  const [nearbyList, setNearbyList] = useState(initialNearby);

  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New announcement form state
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'academic',
    department: 'Electronics Engineering',
    priority: 'normal',
    description: ''
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncementsList(prev => prev.filter(a => a.id !== id));
    showToast('Announcement removed from live noticeboard.');
  };

  const handleDeleteBook = (id: string) => {
    setBooksList(prev => prev.filter(b => b.id !== id));
    showToast('Resource item deleted.');
  };

  const handleDeleteNearby = (id: string) => {
    setNearbyList(prev => prev.filter(n => n.id !== id));
    showToast('Nearby place removed.');
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title.trim()) return;

    const created = {
      id: `ann-${Date.now()}`,
      title: newNotice.title,
      description: newNotice.description || 'Important update posted via Admin Console.',
      content: newNotice.description,
      category: newNotice.category as any,
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      priority: newNotice.priority as any,
      pinned: false,
      read: false,
      author: 'Administrative Officer',
      department: newNotice.department
    };

    setAnnouncementsList([created, ...announcementsList]);
    setShowAddModal(false);
    setNewNotice({ title: '', category: 'academic', department: 'Electronics Engineering', priority: 'normal', description: '' });
    showToast('New announcement published to student noticeboard!');
  };

  // Demo Metrics
  const stats = [
    { label: 'Academic Resources', count: booksList.length + 30, icon: <FileText size={22} className="text-forest" /> },
    { label: 'Active Notices', count: announcementsList.length, icon: <Bell size={22} className="text-terracotta" /> },
    { label: 'Enrolled Departments', count: departments.length, icon: <LayoutDashboard size={22} className="text-mustard" /> },
    { label: 'Local Amenities', count: nearbyList.length, icon: <Compass size={22} className="text-sage" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-forest text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-sage/30 text-sm font-medium"
          >
            <Check size={18} className="text-mustard shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-terracotta/15 text-terracotta px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-widest mb-3 border border-terracotta/25">
          <Shield size={14} /> Administrator Console
        </div>
        <h1 className="text-4xl font-serif text-forest dark:text-white mb-2">Admin Dashboard</h1>
        <p className="text-ink/70 dark:text-dark-text/70 text-sm">
          Govern SOIT academic resources, publish college circulars, and manage student facilities.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, i) => (
          <div 
            key={i}
            className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-sage/20 dark:border-dark-border shadow-xs flex flex-col items-center text-center"
          >
            <div className="mb-2 p-2.5 bg-cream/70 dark:bg-dark-bg rounded-xl border border-sage/20">{stat.icon}</div>
            <div className="text-3xl font-serif font-bold text-forest dark:text-white mb-0.5">{stat.count}</div>
            <div className="text-xs text-ink/60 dark:text-dark-text/60 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts / Distribution Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-sage/20 dark:border-dark-border shadow-xs">
          <h3 className="text-base font-serif font-bold text-forest dark:text-white mb-4">Student Enrollment Distribution</h3>
          <div className="space-y-3">
            {[
              { name: 'Computer Engineering (COMP)', count: 300, color: 'bg-forest', pct: '100%' },
              { name: 'Electronics Engineering (EXTC)', count: 240, color: 'bg-terracotta', pct: '80%' },
              { name: 'Information Technology (IT)', count: 240, color: 'bg-mustard', pct: '80%' },
              { name: 'Mechanical Engineering (MECH)', count: 180, color: 'bg-sage', pct: '60%' },
              { name: 'Electrical Engineering (ELEC)', count: 180, color: 'bg-[#7A6FA0]', pct: '60%' },
            ].map(dept => (
              <div key={dept.name}>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="font-sans font-medium text-ink dark:text-dark-text">{dept.name}</span>
                  <span className="font-bold text-forest dark:text-sage">{dept.count} Students</span>
                </div>
                <div className="w-full bg-cream/60 dark:bg-dark-bg rounded-full h-2 overflow-hidden border border-sage/10">
                  <div className={`h-full rounded-full ${dept.color}`} style={{ width: dept.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-sage/20 dark:border-dark-border shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-serif font-bold text-forest dark:text-white mb-1">Campus Infrastructure Health</h3>
            <p className="text-xs text-ink/60 dark:text-dark-text/60 mb-4">System uptime and institutional portal availability</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-sage/30 dark:border-dark-border rounded-xl bg-cream/20 dark:bg-dark-bg/40">
            <span className="text-4xl font-serif font-bold text-forest dark:text-sage mb-1">99.98%</span>
            <span className="text-xs text-ink/60 dark:text-dark-text/60 font-mono">Network Core & Exam Vault Online</span>
            <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-bold mt-2">
              ● All Systems Nominal
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono pt-3 border-t border-sage/10">
            <div><strong>Active Terminals:</strong> 124</div>
            <div><strong>Daily Downloads:</strong> 1,420+</div>
          </div>
        </div>
      </div>

      {/* Tabs & Management Table */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex gap-1.5 bg-cream/50 dark:bg-dark-card p-1 rounded-xl border border-sage/20 dark:border-dark-border">
            {(['Resources', 'Announcements', 'Departments', 'Nearby Places'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab 
                  ? 'bg-forest text-white shadow-xs' 
                  : 'text-ink/70 dark:text-dark-text/70 hover:text-forest'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Announcements' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn-primary py-2 px-3.5 text-xs flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Create Announcement</span>
            </button>
          )}
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl border border-sage/20 dark:border-dark-border shadow-xs overflow-hidden">
          
          {/* TAB 1: RESOURCES */}
          {activeTab === 'Resources' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-cream/40 dark:bg-dark-bg border-b border-sage/20 text-forest dark:text-sage font-mono">
                    <th className="p-3.5">Title & Author</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">Rating</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage/10 dark:divide-dark-border">
                  {booksList.slice(0, 10).map((b) => (
                    <tr key={b.id} className="hover:bg-cream/20 dark:hover:bg-dark-bg/30 transition-colors">
                      <td className="p-3.5">
                        <div className="font-semibold text-ink dark:text-white">{b.title}</div>
                        <div className="text-[11px] text-ink/50 dark:text-dark-text/50">{b.author} • {b.edition}</div>
                      </td>
                      <td className="p-3.5"><span className="badge-forest text-[10px]">{b.category}</span></td>
                      <td className="p-3.5 font-mono text-[11px]">{b.departmentId.replace('dept-', '').toUpperCase()}</td>
                      <td className="p-3.5 font-mono text-[11px]">⭐ {b.rating}</td>
                      <td className="p-3.5 text-right">
                        <button 
                          onClick={() => handleDeleteBook(b.id)}
                          className="p-1.5 text-ink/40 hover:text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors"
                          title="Delete Resource"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: ANNOUNCEMENTS */}
          {activeTab === 'Announcements' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-cream/40 dark:bg-dark-bg border-b border-sage/20 text-forest dark:text-sage font-mono">
                    <th className="p-3.5">Title & Description</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Priority</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage/10 dark:divide-dark-border">
                  {announcementsList.map((ann) => (
                    <tr key={ann.id} className="hover:bg-cream/20 dark:hover:bg-dark-bg/30 transition-colors">
                      <td className="p-3.5 max-w-xs">
                        <div className="font-semibold text-ink dark:text-white truncate">{ann.title}</div>
                        <div className="text-[11px] text-ink/50 dark:text-dark-text/50 truncate mt-0.5">{ann.description}</div>
                      </td>
                      <td className="p-3.5"><span className="badge-forest text-[10px] uppercase font-mono">{ann.category}</span></td>
                      <td className="p-3.5">
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                          ann.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                          ann.priority === 'important' ? 'bg-amber-100 text-amber-800' :
                          'bg-sage/20 text-forest'
                        }`}>
                          {ann.priority}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-[11px]">{ann.date}</td>
                      <td className="p-3.5 text-right">
                        <button 
                          onClick={() => handleDeleteAnnouncement(ann.id)}
                          className="p-1.5 text-ink/40 hover:text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors"
                          title="Delete Notice"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: DEPARTMENTS */}
          {activeTab === 'Departments' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-cream/40 dark:bg-dark-bg border-b border-sage/20 text-forest dark:text-sage font-mono">
                    <th className="p-3.5">Department Name</th>
                    <th className="p-3.5">Branch Code</th>
                    <th className="p-3.5">Head of Department</th>
                    <th className="p-3.5">Students</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage/10 dark:divide-dark-border">
                  {departments.map((d) => (
                    <tr key={d.id} className="hover:bg-cream/20 dark:hover:bg-dark-bg/30 transition-colors">
                      <td className="p-3.5 font-semibold text-ink dark:text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                        <span>{d.name}</span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-forest dark:text-sage">{d.shortName}</td>
                      <td className="p-3.5 text-ink/70 dark:text-dark-text/70">{d.hod}</td>
                      <td className="p-3.5 font-mono">{d.totalStudents}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: NEARBY PLACES */}
          {activeTab === 'Nearby Places' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-cream/40 dark:bg-dark-bg border-b border-sage/20 text-forest dark:text-sage font-mono">
                    <th className="p-3.5">Establishment</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Distance</th>
                    <th className="p-3.5">Rating</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage/10 dark:divide-dark-border">
                  {nearbyList.slice(0, 10).map((n) => (
                    <tr key={n.id} className="hover:bg-cream/20 dark:hover:bg-dark-bg/30 transition-colors">
                      <td className="p-3.5">
                        <div className="font-semibold text-ink dark:text-white">{n.name}</div>
                        <div className="text-[11px] text-ink/50 dark:text-dark-text/50">{n.address}</div>
                      </td>
                      <td className="p-3.5"><span className="badge-forest text-[10px] uppercase font-mono">{n.category}</span></td>
                      <td className="p-3.5 font-mono text-[11px]">{n.distance}</td>
                      <td className="p-3.5 font-mono text-[11px]">⭐ {n.rating}</td>
                      <td className="p-3.5 text-right">
                        <button 
                          onClick={() => handleDeleteNearby(n.id)}
                          className="p-1.5 text-ink/40 hover:text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Announcement Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-ink/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 max-w-lg w-full relative z-10 border border-sage/20 dark:border-dark-border shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-sage/15">
                <h3 className="font-serif text-xl font-bold text-forest dark:text-white">Publish New Announcement</h3>
                <button onClick={() => setShowAddModal(false)} className="text-ink/40 hover:text-ink">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateAnnouncement} className="space-y-4 text-xs font-medium">
                <div>
                  <label className="block text-ink/70 dark:text-dark-text/70 mb-1">Notice Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. In-Sem Exam Hall Ticket Issuance"
                    className="input-field text-xs py-2"
                    value={newNotice.title}
                    onChange={e => setNewNotice({...newNotice, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-ink/70 dark:text-dark-text/70 mb-1">Category</label>
                    <select
                      className="input-field text-xs py-2"
                      value={newNotice.category}
                      onChange={e => setNewNotice({...newNotice, category: e.target.value})}
                    >
                      <option value="examination">Examination</option>
                      <option value="academic">Academic</option>
                      <option value="placement">Placement</option>
                      <option value="events">Events & Fests</option>
                      <option value="administrative">Administrative</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-ink/70 dark:text-dark-text/70 mb-1">Priority</label>
                    <select
                      className="input-field text-xs py-2"
                      value={newNotice.priority}
                      onChange={e => setNewNotice({...newNotice, priority: e.target.value})}
                    >
                      <option value="normal">Normal</option>
                      <option value="important">Important</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-ink/70 dark:text-dark-text/70 mb-1">Detailed Circular Description</label>
                  <textarea
                    rows={3}
                    placeholder="Provide full official text for students..."
                    className="input-field text-xs py-2 resize-none"
                    value={newNotice.description}
                    onChange={e => setNewNotice({...newNotice, description: e.target.value})}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs text-ink/60 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs py-2 px-4"
                  >
                    Publish Notice
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
