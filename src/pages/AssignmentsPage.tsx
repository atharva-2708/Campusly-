import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Bookmark, Clock, User, Calendar, SlidersHorizontal, AlertCircle, FileText, ChevronRight, X } from 'lucide-react';
import { assignments } from '../data/assignments';
import { departments } from '../data/departments';
import { Assignment } from '../types';

const TABS = [
  { id: 'all', label: 'All Material' },
  { id: 'assignment', label: 'Assignments' },
  { id: 'question-bank', label: 'Question Banks' },
  { id: 'practice-set', label: 'Practice Sets' },
  { id: 'class-test', label: 'Class Tests' },
];

const AssignmentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filterDept, setFilterDept] = useState<string>('all');
  const [filterSem, setFilterSem] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const semesters = ['all', '1', '2', '3', '4', '5', '6', '7', '8'];
  const statuses = ['all', 'new', 'important', 'upcoming', 'archived'];

  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      const matchesTab = activeTab === 'all' || assignment.type === activeTab;
      const matchesDept = filterDept === 'all' || assignment.departmentId === filterDept;
      const matchesSem = filterSem === 'all' || assignment.semester.toString() === filterSem;
      const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
      
      return matchesTab && matchesDept && matchesSem && matchesStatus;
    });
  }, [activeTab, filterDept, filterSem, filterStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-[#183D32] text-[#F6F1E7]'; // forest
      case 'important': return 'bg-[#C66B4E] text-[#F6F1E7]'; // terracotta
      case 'upcoming': return 'bg-[#D7AA48] text-[#183D32]'; // mustard
      case 'archived': return 'bg-[#A8B9A0] text-[#183D32]'; // sage
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getDaysRemaining = (deadline?: string) => {
    if (!deadline) return null;
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Due today';
    return `${days} days left`;
  };

  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#252923] pb-24">
      {/* Header */}
      <div className="bg-[#183D32] text-[#F6F1E7] pt-24 pb-16 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl mb-4">Assignments & Practice</h1>
            <p className="text-[#A8B9A0] text-lg max-w-xl font-sans">
              Stay on top of your coursework. Track deadlines, download question banks, and access class test papers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide border-b border-[#183D32]/20 mb-8">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 whitespace-nowrap font-medium text-sm transition-all relative ${
                activeTab === tab.id 
                  ? 'text-[#C66B4E]' 
                  : 'text-[#183D32]/60 hover:text-[#183D32]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C66B4E]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-[#EDE4D4] rounded-xl p-4 shadow-sm border border-[#183D32]/10 mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-[#183D32]/70 text-sm font-medium mr-2">
            <SlidersHorizontal size={16} /> Filters:
          </div>
          
          <select 
            value={filterDept} onChange={e => setFilterDept(e.target.value)}
            className="bg-[#F6F1E7] border border-[#183D32]/20 rounded-lg px-3 py-2 text-sm text-[#183D32] focus:ring-2 focus:ring-[#C66B4E] outline-none"
          >
            <option value="all">Department: All</option>
            {departments.map(d => <option key={d.id} value={d.id}>{d.shortName}</option>)}
          </select>

          <select 
            value={filterSem} onChange={e => setFilterSem(e.target.value)}
            className="bg-[#F6F1E7] border border-[#183D32]/20 rounded-lg px-3 py-2 text-sm text-[#183D32] focus:ring-2 focus:ring-[#C66B4E] outline-none"
          >
            <option value="all">Semester: All</option>
            {semesters.filter(s => s !== 'all').map(s => <option key={s} value={s}>Sem {s}</option>)}
          </select>

          <select 
            value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="bg-[#F6F1E7] border border-[#183D32]/20 rounded-lg px-3 py-2 text-sm text-[#183D32] focus:ring-2 focus:ring-[#C66B4E] outline-none capitalize"
          >
            <option value="all">Status: All</option>
            {statuses.filter(s => s !== 'all').map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Grid */}
        {filteredAssignments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredAssignments.map((item, idx) => {
                const dept = departments.find(d => d.id === item.departmentId);
                const daysRemaining = getDaysRemaining(item.deadline);
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    key={item.id}
                    onClick={() => setSelectedAssignment(item)}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-[#183D32]/10 hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D7AA48]/10 to-transparent pointer-events-none rounded-bl-3xl"></div>
                    
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2">
                        <span className="text-[10px] font-mono tracking-wider bg-[#EDE4D4] text-[#183D32] px-2 py-1 rounded">
                          {dept?.shortName || 'DEPT'} • SEM {item.semester}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-[#183D32] mb-1 group-hover:text-[#C66B4E] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm font-mono text-[#183D32]/60 mb-6">{item.subjectCode} - {item.subjectName}</p>

                    <div className="mt-auto space-y-3">
                      {item.faculty && (
                        <div className="flex items-center gap-2 text-sm text-[#183D32]/70">
                          <User size={16} className="text-[#183D32]/40" /> {item.faculty}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t border-[#183D32]/10">
                        {item.deadline ? (
                          <div className={`flex items-center gap-1.5 text-sm font-medium ${
                            daysRemaining === 'Overdue' ? 'text-[#C66B4E]' : 
                            daysRemaining === 'Due today' ? 'text-[#D7AA48]' : 'text-[#183D32]'
                          }`}>
                            <Clock size={16} /> 
                            {daysRemaining}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-sm text-[#183D32]/60">
                            <Calendar size={16} /> {new Date(item.uploadDate).toLocaleDateString()}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1">
                          <button className="p-2 text-[#183D32]/40 hover:text-[#C66B4E] hover:bg-[#C66B4E]/10 rounded-lg transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                            <Bookmark size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-24 text-center bg-[#EDE4D4] rounded-3xl border border-[#183D32]/10">
            <FileText size={64} className="mx-auto mb-4 text-[#183D32]/20" />
            <h3 className="font-serif text-2xl text-[#183D32] mb-2">No items found</h3>
            <p className="text-[#183D32]/60 max-w-md mx-auto">
              There are no {activeTab !== 'all' ? activeTab.replace('-', ' ') + 's' : 'materials'} matching your selected filters.
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedAssignment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAssignment(null)}
              className="absolute inset-0 bg-[#183D32]/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-[#F6F1E7] w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-[#183D32]/10"
            >
              {/* Modal Header */}
              <div className="bg-[#183D32] text-[#F6F1E7] p-8 relative">
                <button 
                  onClick={() => setSelectedAssignment(null)}
                  className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex gap-2 mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${getStatusColor(selectedAssignment.status)}`}>
                    {selectedAssignment.status}
                  </span>
                  <span className="text-[10px] font-mono tracking-wider bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                    {selectedAssignment.type.replace('-', ' ')}
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl mb-2">{selectedAssignment.title}</h2>
                <div className="font-mono text-[#D7AA48] text-sm">
                  {selectedAssignment.subjectCode} - {selectedAssignment.subjectName}
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                <div className="flex flex-wrap gap-8 mb-8">
                  {selectedAssignment.faculty && (
                    <div>
                      <div className="text-xs text-[#183D32]/60 uppercase tracking-widest font-semibold mb-1">Faculty</div>
                      <div className="font-medium text-[#183D32] flex items-center gap-2"><User size={16}/> {selectedAssignment.faculty}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-[#183D32]/60 uppercase tracking-widest font-semibold mb-1">Posted</div>
                    <div className="font-medium text-[#183D32] flex items-center gap-2"><Calendar size={16}/> {new Date(selectedAssignment.uploadDate).toLocaleDateString()}</div>
                  </div>
                  {selectedAssignment.deadline && (
                    <div>
                      <div className="text-xs text-[#183D32]/60 uppercase tracking-widest font-semibold mb-1">Deadline</div>
                      <div className="font-medium text-[#C66B4E] flex items-center gap-2"><Clock size={16}/> {new Date(selectedAssignment.deadline).toLocaleDateString()}</div>
                    </div>
                  )}
                </div>

                <div className="mb-10">
                  <h3 className="font-serif text-xl text-[#183D32] mb-3">Description</h3>
                  <p className="text-[#183D32]/80 leading-relaxed bg-[#EDE4D4]/50 p-4 rounded-xl border border-[#183D32]/5">
                    {selectedAssignment.description || 'No additional instructions provided.'}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button className="flex-1 bg-[#183D32] text-[#F6F1E7] py-4 rounded-xl font-medium hover:bg-[#183D32]/90 transition-colors flex items-center justify-center gap-2 shadow-md">
                    <Download size={20} /> Download PDF
                  </button>
                  <button className="px-6 py-4 bg-[#EDE4D4] text-[#183D32] rounded-xl font-medium hover:bg-[#D7AA48] hover:text-[#183D32] transition-colors flex items-center gap-2 border border-[#183D32]/10">
                    <Bookmark size={20} /> Save
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssignmentsPage;
