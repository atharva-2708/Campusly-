import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckCircle2, Circle, Trash2, Calendar, Clock, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';
import { departments } from '../data/departments';

const StudyPlannerPage: React.FC = () => {
  const { profile, studyTasks, addStudyTask, toggleStudyTask, deleteStudyTask } = useStudent();
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('Active');
  const [sort, setSort] = useState<'Priority' | 'Deadline' | 'Date Added'>('Deadline');
  
  // Available subjects for student's department
  const currentDept = departments.find(d => d.id === profile.departmentId) || departments[0];
  const allDeptSubjects = useMemo(() => {
    const list: string[] = [];
    currentDept.years.forEach(y => {
      y.semesters.forEach(s => {
        s.subjects.forEach(sub => {
          if (!list.includes(sub.name)) list.push(sub.name);
        });
      });
    });
    return list.length > 0 ? list : ['Analog Electronics', 'Digital Electronics', 'Network Theory', 'Signals & Systems'];
  }, [currentDept]);

  const [newTask, setNewTask] = useState({
    title: '',
    subject: allDeptSubjects[0] || 'Analog Electronics',
    deadline: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    addStudyTask({
      title: newTask.title.trim(),
      subject: newTask.subject,
      deadline: newTask.deadline || undefined,
      priority: newTask.priority,
      completed: false
    });
    
    setNewTask({ ...newTask, title: '', deadline: '' });
  };

  const filteredTasks = useMemo(() => {
    let list = studyTasks.filter(t => {
      if (filter === 'Active') return !t.completed;
      if (filter === 'Completed') return t.completed;
      return true;
    });

    if (sort === 'Priority') {
      const pOrder = { high: 1, medium: 2, low: 3 };
      list = [...list].sort((a, b) => (pOrder[a.priority] || 2) - (pOrder[b.priority] || 2));
    } else if (sort === 'Deadline') {
      list = [...list].sort((a, b) => (a.deadline || '9999').localeCompare(b.deadline || '9999'));
    }

    return list;
  }, [studyTasks, filter, sort]);

  const completedCount = studyTasks.filter(t => t.completed).length;
  const progressPercent = studyTasks.length > 0 ? Math.round((completedCount / studyTasks.length) * 100) : 0;

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-terracotta/15 text-terracotta border border-terracotta/30';
      case 'medium': return 'bg-mustard/20 text-ink dark:text-mustard border border-mustard/40';
      default: return 'bg-sage/20 text-forest dark:text-sage border border-sage/30';
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Header & Progress Card */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="section-label text-forest dark:text-sage mb-1 block">Coursework Execution</span>
          <h1 className="text-4xl font-serif text-forest dark:text-white mb-2">Plan Your Study</h1>
          <p className="text-ink/70 dark:text-dark-text/70 text-sm">
            Set revision milestones, track upcoming lab journals, and manage examination prep tasks.
          </p>
        </div>
        
        {/* Visual Radial Progress */}
        <div className="card p-5 flex items-center gap-5 bg-forest text-white shadow-md">
          <div className="flex-1">
            <span className="text-xs font-mono uppercase tracking-wider text-sage mb-1 block">Milestones Completed</span>
            <div className="font-serif text-xl font-bold">{completedCount} of {studyTasks.length} tasks</div>
            <p className="text-[11px] text-ivory/70 mt-0.5">Persisted in local browser storage</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center relative shrink-0">
            <svg className="w-full h-full absolute -rotate-90">
              <circle cx="28" cy="28" r="26" fill="none" className="stroke-white/10" strokeWidth="4" />
              <circle cx="28" cy="28" r="26" fill="none" className="stroke-mustard transition-all duration-700" strokeWidth="4" 
                strokeDasharray="163" 
                strokeDashoffset={studyTasks.length ? 163 - (163 * completedCount / studyTasks.length) : 163} 
              />
            </svg>
            <span className="font-bold font-mono text-sm">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Add Task Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-sage/20 dark:border-dark-border sticky top-20">
            <h2 className="text-xl font-serif text-forest dark:text-white mb-4 pb-3 border-b border-sage/20 flex items-center gap-2">
              <Plus size={18} className="text-mustard" />
              <span>Add Study Task</span>
            </h2>

            <form onSubmit={handleAddTask} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-ink/70 dark:text-dark-text/70 mb-1">Task Description *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Solve Unit 2 Cascode Numericals"
                  className="input-field py-2 text-xs"
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-ink/70 dark:text-dark-text/70 mb-1">Subject Course</label>
                <select 
                  className="input-field py-2 text-xs"
                  value={newTask.subject}
                  onChange={e => setNewTask({...newTask, subject: e.target.value})}
                >
                  {allDeptSubjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-ink/70 dark:text-dark-text/70 mb-1">Target Deadline</label>
                <input 
                  type="date"
                  className="input-field py-2 text-xs font-mono"
                  value={newTask.deadline}
                  onChange={e => setNewTask({...newTask, deadline: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-ink/70 dark:text-dark-text/70 mb-1">Priority Level</label>
                <select 
                  className="input-field py-2 text-xs"
                  value={newTask.priority}
                  onChange={e => setNewTask({...newTask, priority: e.target.value as any})}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <button type="submit" className="btn-primary w-full justify-center mt-2 py-2.5 text-xs">
                <Plus size={16} />
                <span>Save to Plan</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Task List & Filtering */}
        <div className="lg:col-span-2 space-y-5">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-dark-card p-3 rounded-2xl shadow-xs border border-sage/20 dark:border-dark-border">
            <div className="flex gap-1.5 bg-cream/50 dark:bg-dark-bg p-1 rounded-xl">
              {(['Active', 'All', 'Completed'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filter === f 
                      ? 'bg-forest text-white shadow-xs' 
                      : 'text-ink/60 dark:text-dark-text/60 hover:text-ink'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-ink/50 dark:text-dark-text/50">Sort:</span>
              <select 
                className="bg-transparent font-semibold text-forest dark:text-sage focus:outline-none cursor-pointer"
                value={sort}
                onChange={e => setSort(e.target.value as any)}
              >
                <option value="Deadline">Deadline</option>
                <option value="Priority">Priority</option>
                <option value="Date Added">Date Added</option>
              </select>
            </div>
          </div>

          {/* Task Items List */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredTasks.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-dark-card rounded-2xl p-12 text-center border border-dashed border-sage/30 dark:border-dark-border text-ink/60"
                >
                  <Calendar size={44} className="mx-auto mb-3 text-sage" />
                  <h3 className="font-serif text-xl text-forest dark:text-white mb-1">All Caught Up!</h3>
                  <p className="text-xs text-ink/60 dark:text-dark-text/60">
                    No {filter.toLowerCase()} tasks right now. Add a task on the left to stay on schedule.
                  </p>
                </motion.div>
              ) : (
                filteredTasks.map(task => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`bg-white dark:bg-dark-card rounded-2xl p-4.5 border border-sage/20 dark:border-dark-border shadow-xs flex items-start gap-3.5 transition-all ${
                      task.completed ? 'opacity-65 bg-cream/30 dark:bg-dark-bg/40' : 'hover:border-forest/40'
                    }`}
                  >
                    <button 
                      onClick={() => toggleStudyTask(task.id)}
                      className={`mt-0.5 shrink-0 transition-colors cursor-pointer ${
                        task.completed ? 'text-forest dark:text-sage' : 'text-sage hover:text-forest'
                      }`}
                      aria-label="Toggle task completion"
                    >
                      {task.completed ? <CheckCircle2 size={22} className="fill-forest/10" /> : <Circle size={22} />}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-serif text-base font-semibold mb-1 leading-snug ${
                        task.completed ? 'line-through text-ink/50 dark:text-dark-text/50' : 'text-ink dark:text-white'
                      }`}>
                        {task.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-2 text-xs mt-2">
                        {task.subject && (
                          <span className="badge-forest text-[10px] font-mono">
                            {task.subject}
                          </span>
                        )}
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${getPriorityBadgeClass(task.priority)}`}>
                          {task.priority}
                        </span>
                        {task.deadline && (
                          <span className="flex items-center gap-1 text-[11px] text-ink/60 dark:text-dark-text/60 font-mono">
                            <Clock size={12} className="text-terracotta" />
                            <span>Due {task.deadline}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => deleteStudyTask(task.id)}
                      className="p-1.5 text-ink/30 hover:text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors shrink-0"
                      title="Delete Task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlannerPage;
