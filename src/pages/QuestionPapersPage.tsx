import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Download, Bookmark, Eye, FileText, 
  SlidersHorizontal, AlertCircle, X, Check, Share2, 
  Building, GraduationCap, Calendar, HelpCircle, ArrowRight
} from 'lucide-react';
import { questionPapers } from '../data/questionPapers';
import { departments } from '../data/departments';
import { ExamType, QuestionPaper } from '../types';
import { useStudent } from '../contexts/StudentContext';
import { useLocation } from 'react-router-dom';

const EXAM_TYPES: { value: ExamType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Exams' },
  { value: 'end-semester', label: 'End Semester' },
  { value: 'mid-semester', label: 'Mid Semester' },
  { value: 'unit-test', label: 'Unit Test' },
  { value: 'class-test', label: 'Class Test' },
  { value: 'supplementary', label: 'Supplementary' }
];

const QuestionPapersPage: React.FC = () => {
  const { isBookmarked, toggleBookmark, addRecentView } = useStudent();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState<string>('all');
  const [filterSem, setFilterSem] = useState<string>('all');
  const [filterExamType, setFilterExamType] = useState<ExamType | 'all'>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [selectedPaper, setSelectedPaper] = useState<QuestionPaper | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Sync from URL search params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const filterParam = params.get('filter') as ExamType | null;
    const deptParam = params.get('dept');

    if (searchParam) setSearchQuery(searchParam);
    if (filterParam && EXAM_TYPES.some(t => t.value === filterParam)) {
      setFilterExamType(filterParam);
    }
    if (deptParam) setFilterDept(deptParam);
  }, [location.search]);

  // Derive filter options
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(questionPapers.map(p => p.examYear))).sort((a, b) => b - a);
    return ['all', ...uniqueYears.map(String)];
  }, []);

  const semesters = ['all', '1', '2', '3', '4', '5', '6', '7', '8'];

  const filteredPapers = useMemo(() => {
    return questionPapers.filter(paper => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        paper.subjectName.toLowerCase().includes(q) || 
        paper.subjectCode.toLowerCase().includes(q) ||
        paper.tags.some(t => t.toLowerCase().includes(q));
      const matchesDept = filterDept === 'all' || paper.departmentId === filterDept;
      const matchesSem = filterSem === 'all' || paper.semester.toString() === filterSem;
      const matchesType = filterExamType === 'all' || paper.examType === filterExamType;
      const matchesYear = filterYear === 'all' || paper.examYear.toString() === filterYear;
      
      return matchesSearch && matchesDept && matchesSem && matchesType && matchesYear;
    });
  }, [searchQuery, filterDept, filterSem, filterExamType, filterYear]);

  const handleDownload = (paper: QuestionPaper, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addRecentView({
      id: paper.id,
      type: 'paper',
      title: `${paper.subjectName} (${paper.examYear})`,
      url: `/question-papers?search=${encodeURIComponent(paper.subjectName)}`
    });

    setDownloadToast(`Downloaded: ${paper.subjectCode} - ${paper.subjectName} (${paper.examYear})`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  const handleBookmarkClick = (paper: QuestionPaper, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    toggleBookmark({
      id: paper.id,
      type: 'paper',
      title: `${paper.subjectName} (${paper.examYear} ${paper.examType})`,
      subtitle: `${paper.subjectCode} • Semester ${paper.semester}`,
      url: `/question-papers?search=${encodeURIComponent(paper.subjectName)}`
    });
  };

  const openPreview = (paper: QuestionPaper) => {
    setSelectedPaper(paper);
    addRecentView({
      id: paper.id,
      type: 'paper',
      title: `${paper.subjectName} (${paper.examYear})`,
      url: `/question-papers?search=${encodeURIComponent(paper.subjectName)}`
    });
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-dark-bg text-ink dark:text-dark-text pb-24 transition-colors">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {downloadToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-forest text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-sage/30 text-sm font-medium"
          >
            <Check size={18} className="text-mustard shrink-0" />
            <span>{downloadToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="bg-forest text-ivory pt-16 pb-20 px-4 sm:px-6 md:px-12 relative overflow-hidden rounded-b-3xl shadow-lg">
        <div className="absolute inset-0 opacity-10 paper-texture pointer-events-none" />
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <FileText size={380} className="rotate-12 transform translate-x-1/4 -translate-y-1/4" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="font-mono text-mustard text-xs sm:text-sm tracking-widest mb-4 inline-block bg-mustard/15 px-3.5 py-1 rounded-full border border-mustard/30 uppercase font-semibold">
            Saint Oxford Exam Vault
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl mb-4 leading-tight">
            Prepare smarter.<br />Practice better.
          </h1>
          <p className="text-sage text-sm sm:text-base max-w-xl mx-auto font-sans mb-8">
            Access certified university examination papers, mid-semester in-sem tests, and model question sets from all engineering departments.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto shadow-2xl rounded-2xl">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-forest/50" />
            </div>
            <input
              type="text"
              placeholder="Search by subject name or code (e.g. Analog Electronics, EXTC201, COMP201)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-14 pr-12 py-4 rounded-2xl border-0 text-sm sm:text-base bg-white dark:bg-dark-card text-ink dark:text-white placeholder:text-ink/40 dark:placeholder:text-dark-text/40 focus:ring-4 focus:ring-mustard/30 outline-none shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-ink/40 hover:text-ink"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 -mt-6 relative z-20">
        
        {/* Filters Bar */}
        <div className="bg-white dark:bg-dark-card rounded-2xl p-4 sm:p-5 shadow-lg border border-sage/20 dark:border-dark-border mb-8 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-2 text-forest dark:text-sage text-sm font-semibold">
            <SlidersHorizontal size={17} /> 
            <span>Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-2.5 items-center">
            {/* Department */}
            <select 
              value={filterDept} 
              onChange={e => setFilterDept(e.target.value)}
              className="bg-cream/40 dark:bg-dark-bg border border-sage/30 dark:border-dark-border rounded-xl px-3 py-2 text-xs font-medium text-ink dark:text-dark-text focus:ring-2 focus:ring-forest outline-none"
            >
              <option value="all">All Departments</option>
              {departments.map(d => <option key={d.id} value={d.id}>{d.name} ({d.shortName})</option>)}
            </select>

            {/* Semester */}
            <select 
              value={filterSem} 
              onChange={e => setFilterSem(e.target.value)}
              className="bg-cream/40 dark:bg-dark-bg border border-sage/30 dark:border-dark-border rounded-xl px-3 py-2 text-xs font-medium text-ink dark:text-dark-text focus:ring-2 focus:ring-forest outline-none"
            >
              <option value="all">All Semesters</option>
              {semesters.filter(s => s !== 'all').map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>

            {/* Exam Type */}
            <select 
              value={filterExamType} 
              onChange={e => setFilterExamType(e.target.value as ExamType | 'all')}
              className="bg-cream/40 dark:bg-dark-bg border border-sage/30 dark:border-dark-border rounded-xl px-3 py-2 text-xs font-medium text-ink dark:text-dark-text focus:ring-2 focus:ring-forest outline-none"
            >
              {EXAM_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>

            {/* Exam Year */}
            <select 
              value={filterYear} 
              onChange={e => setFilterYear(e.target.value)}
              className="bg-cream/40 dark:bg-dark-bg border border-sage/30 dark:border-dark-border rounded-xl px-3 py-2 text-xs font-medium text-ink dark:text-dark-text focus:ring-2 focus:ring-forest outline-none"
            >
              <option value="all">All Exam Years</option>
              {years.filter(y => y !== 'all').map(y => <option key={y} value={y}>{y}</option>)}
            </select>

            {(filterDept !== 'all' || filterSem !== 'all' || filterExamType !== 'all' || filterYear !== 'all' || searchQuery) && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilterDept('all');
                  setFilterSem('all');
                  setFilterExamType('all');
                  setFilterYear('all');
                }}
                className="text-xs text-terracotta hover:underline font-mono ml-1 font-semibold"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Papers Count & Status */}
        <div className="flex justify-between items-center mb-6 px-1">
          <p className="text-sm font-mono text-ink/60 dark:text-dark-text/60">
            Showing <strong className="text-forest dark:text-sage">{filteredPapers.length}</strong> examination papers
          </p>
          <span className="text-xs text-forest/70 dark:text-sage bg-forest/10 dark:bg-forest/30 px-2.5 py-1 rounded-full font-medium">
            Archival Quality Verified
          </span>
        </div>

        {/* Paper Cards Grid */}
        <div className="mb-16">
          {filteredPapers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filteredPapers.map((paper) => {
                  const dept = departments.find(d => d.id === paper.departmentId);
                  const bookmarked = isBookmarked(paper.id);

                  return (
                    <motion.div
                      key={paper.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      onClick={() => openPreview(paper)}
                      className="bg-white dark:bg-dark-card rounded-2xl p-5 shadow-sm border border-sage/20 dark:border-dark-border flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
                    >
                      <div>
                        {/* Header Badges */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] uppercase font-bold tracking-wider bg-forest text-white px-2 py-0.5 rounded-md">
                              {dept?.shortName || 'DEPT'}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-wider bg-terracotta text-white px-2 py-0.5 rounded-md">
                              SEM {paper.semester}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono font-bold text-forest dark:text-sage bg-cream/60 dark:bg-dark-bg px-2 py-0.5 rounded border border-sage/20 dark:border-dark-border">
                            {paper.subjectCode}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xl font-bold text-forest dark:text-white mb-3 group-hover:text-terracotta dark:group-hover:text-mustard transition-colors line-clamp-2">
                          {paper.subjectName}
                        </h3>

                        {/* Stamped Archival Badge */}
                        <div className="my-4 py-3 bg-cream/30 dark:bg-dark-bg/40 rounded-xl border border-dashed border-sage/30 dark:border-dark-border text-center">
                          <div className="font-mono text-[10px] text-ink/50 dark:text-dark-text/50 uppercase tracking-widest">
                            {paper.examType.replace('-', ' ')}
                          </div>
                          <div className="font-serif text-3xl font-bold text-forest/70 dark:text-sage tracking-wider my-0.5 -rotate-1">
                            {paper.examYear}
                          </div>
                          <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full ${
                            paper.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                            paper.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {paper.difficulty} difficulty
                          </span>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-3 border-t border-sage/10 dark:border-dark-border flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-ink/50 dark:text-dark-text/50 font-mono">
                          <FileText size={13} className="text-mustard" />
                          <span>PDF • {paper.downloads} DLs</span>
                        </div>

                        <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleBookmarkClick(paper, e)}
                            className={`p-2 rounded-xl border transition-colors ${
                              bookmarked 
                                ? 'bg-terracotta text-white border-terracotta' 
                                : 'bg-cream/40 dark:bg-dark-bg text-ink/70 dark:text-dark-text/70 border-sage/20 hover:text-terracotta'
                            }`}
                            title={bookmarked ? "Remove Bookmark" : "Save to My Bookmarks"}
                          >
                            <Bookmark size={15} className={bookmarked ? "fill-current" : ""} />
                          </button>

                          <button
                            onClick={() => openPreview(paper)}
                            className="p-2 bg-cream/40 dark:bg-dark-bg text-forest dark:text-sage border border-sage/20 rounded-xl hover:bg-forest hover:text-white transition-colors"
                            title="Preview Examination Paper"
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            onClick={(e) => handleDownload(paper, e)}
                            className="p-2 bg-forest text-white rounded-xl hover:bg-forest-light transition-colors shadow-xs"
                            title="Download Paper"
                          >
                            <Download size={15} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="py-20 text-center bg-cream/40 dark:bg-dark-card rounded-3xl border border-sage/20 dark:border-dark-border">
              <AlertCircle size={48} className="mx-auto mb-3 text-terracotta/60" />
              <h3 className="font-serif text-2xl text-forest dark:text-white mb-2">No Examination Papers Match</h3>
              <p className="text-ink/60 dark:text-dark-text/60 max-w-md mx-auto text-sm mb-6">
                Try widening your search terms or clearing department/semester filters.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilterDept('all');
                  setFilterSem('all');
                  setFilterExamType('all');
                  setFilterYear('all');
                }}
                className="btn-primary text-xs"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* PDF Paper Preview Modal */}
      <AnimatePresence>
        {selectedPaper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPaper(null)}
              className="fixed inset-0 bg-ink/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-dark-card w-full max-w-3xl rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-sage/20 dark:border-dark-border max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-forest text-white p-6 relative shrink-0">
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider bg-mustard text-ink px-2 py-0.5 rounded font-bold">
                    Official Exam Document
                  </span>
                  <span className="text-[10px] font-mono tracking-wider bg-white/20 px-2 py-0.5 rounded text-white">
                    {selectedPaper.examType.toUpperCase().replace('-', ' ')} {selectedPaper.examYear}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">{selectedPaper.subjectName}</h2>
                <p className="text-sage text-xs font-mono mt-1">Course Code: {selectedPaper.subjectCode} • Semester {selectedPaper.semester}</p>
              </div>

              {/* Realistic Paper Content Canvas */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-ivory/50 dark:bg-dark-bg/40">
                {/* Official University Paper Header */}
                <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-sage/30 dark:border-dark-border text-center shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-forest text-white font-serif font-bold text-sm flex items-center justify-center mx-auto mb-2">
                    SOIT
                  </div>
                  <h3 className="font-serif font-bold text-lg text-forest dark:text-white uppercase tracking-wider">
                    Saint Oxford Institute of Technology
                  </h3>
                  <p className="text-xs font-mono text-ink/60 dark:text-dark-text/60">
                    Department of Engineering Examination • {selectedPaper.examType.replace('-', ' ').toUpperCase()} {selectedPaper.examYear}
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-dashed border-sage/30 text-xs font-mono text-ink/70 dark:text-dark-text/70">
                    <div><strong>Time:</strong> 2.5 Hours</div>
                    <div><strong>Max Marks:</strong> 80</div>
                    <div><strong>Course:</strong> {selectedPaper.subjectCode}</div>
                    <div><strong>Format:</strong> Solved PDF</div>
                  </div>
                </div>

                {/* Sample Exam Questions */}
                <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-sage/20 dark:border-dark-border space-y-5">
                  <h4 className="font-serif font-bold text-base text-forest dark:text-sage border-b border-sage/20 pb-2">
                    SECTION A — COMPULSORY CORE QUESTIONS (30 Marks)
                  </h4>
                  <div className="space-y-4 text-xs sm:text-sm text-ink/80 dark:text-dark-text/80 leading-relaxed font-sans">
                    <p>
                      <strong>Q1 (a)</strong> Derive the mathematical expression for the voltage gain A_v and input impedance R_in of the circuit with complete small-signal equivalent diagram. <em>[6 Marks]</em>
                    </p>
                    <p>
                      <strong>Q1 (b)</strong> State the Barkhausen stability criterion for sustained oscillations. Draw the complete schematic of a Hartley Oscillator with frequency formula. <em>[6 Marks]</em>
                    </p>
                    <p>
                      <strong>Q2 (a)</strong> Differentiate between synchronous and asynchronous sequential state machines with neat timing waveforms. <em>[8 Marks]</em>
                    </p>
                    <p>
                      <strong>Q2 (b)</strong> Prove the Initial and Final Value Theorems for continuous Laplace Transforms with region of convergence conditions. <em>[10 Marks]</em>
                    </p>
                  </div>

                  <h4 className="font-serif font-bold text-base text-forest dark:text-sage border-b border-sage/20 pb-2 pt-2">
                    SECTION B — ANALYTICAL & DESIGN NUMERICALS (50 Marks)
                  </h4>
                  <div className="space-y-4 text-xs sm:text-sm text-ink/80 dark:text-dark-text/80 leading-relaxed font-sans">
                    <p>
                      <strong>Q3</strong> Design a second-order Butterworth active low-pass filter with a cutoff frequency fc = 2.5 kHz and passband gain of 4. Calculate resistor and capacitor values. <em>[12 Marks]</em>
                    </p>
                    <p>
                      <strong>Q4</strong> A 3-phase, 50 Hz induction motor delivers 15 kW at 1440 rpm. Calculate the rotor slip, copper losses, and mechanical efficiency at full load. <em>[12 Marks]</em>
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 bg-white dark:bg-dark-card border-t border-sage/20 dark:border-dark-border flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBookmarkClick(selectedPaper)}
                    className={`btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 ${isBookmarked(selectedPaper.id) ? 'bg-terracotta text-white border-terracotta' : ''}`}
                  >
                    <Bookmark size={15} className={isBookmarked(selectedPaper.id) ? 'fill-current' : ''} />
                    <span>{isBookmarked(selectedPaper.id) ? 'Bookmarked' : 'Save to Shelf'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPaper(null)}
                    className="px-4 py-2 text-xs font-medium text-ink/70 dark:text-dark-text/70 hover:bg-cream dark:hover:bg-dark-bg rounded-xl"
                  >
                    Close Preview
                  </button>
                  <button
                    onClick={() => handleDownload(selectedPaper)}
                    className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <Download size={15} />
                    <span>Download Solved PDF</span>
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

export default QuestionPapersPage;
