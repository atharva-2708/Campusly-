import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { departments } from '../data/departments';
import { books } from '../data/books';
import { Department, AcademicYear, Semester, Subject, ResourceType, Book } from '../types';
import { 
  BookOpen, ChevronRight, FileText, Download, Bookmark, 
  Search, Filter, Library, FileIcon, FileArchive, Users,
  Star, Check, SlidersHorizontal, BookMarked, Eye, Sparkles, X
} from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';
import { useLocation } from 'react-router-dom';

const AcademicsPage: React.FC = () => {
  const { profile, isBookmarked, toggleBookmark, addRecentView } = useStudent();
  const location = useLocation();

  const [mainView, setMainView] = useState<'curriculum' | 'books'>('curriculum');
  const [activeDeptId, setActiveDeptId] = useState<string>(profile.departmentId || departments[0].id);
  const [activeYearId, setActiveYearId] = useState<string>('');
  const [activeSemesterId, setActiveSemesterId] = useState<string>('');
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeResourceTab, setActiveResourceTab] = useState<'All' | 'Notes' | 'Textbooks' | 'Labs' | 'Syllabus'>('All');
  
  // Book Library filters
  const [bookCategory, setBookCategory] = useState<'all' | 'textbook' | 'reference' | 'recommended'>('all');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync URL search params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const dept = params.get('dept');
    const view = params.get('view');

    if (search) {
      setSearchQuery(search);
      // If matches a book title, switch to books view
      if (books.some(b => b.title.toLowerCase().includes(search.toLowerCase()))) {
        setMainView('books');
      }
    }
    if (dept && departments.some(d => d.id === dept)) {
      setActiveDeptId(dept);
    }
    if (view === 'books') {
      setMainView('books');
    }
  }, [location.search]);

  const department = departments.find(d => d.id === activeDeptId) || departments[0];
  const years = department.years || [];

  // Update default year and semester when active department changes
  useEffect(() => {
    if (department.years?.length > 0) {
      setActiveYearId(department.years[0].id);
      if (department.years[0].semesters?.length > 0) {
        setActiveSemesterId(department.years[0].semesters[0].id);
      }
    } else {
      setActiveYearId('');
      setActiveSemesterId('');
    }
    setActiveSubject(null);
  }, [department.id]);

  const currentYear = years.find(y => y.id === activeYearId) || years[0];
  const semesters = currentYear?.semesters || [];
  const currentSemester = semesters.find(s => s.id === activeSemesterId) || semesters[0];
  const currentSubjects = currentSemester?.subjects || [];

  // Filtered Books
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        book.title.toLowerCase().includes(q) || 
        book.author.toLowerCase().includes(q) || 
        book.tags.some(t => t.toLowerCase().includes(q));
      
      const matchesDept = book.departmentId === activeDeptId;
      const matchesCategory = bookCategory === 'all' || book.category === bookCategory;
      
      return matchesSearch && (matchesDept || book.departmentId === 'all') && matchesCategory;
    });
  }, [searchQuery, activeDeptId, bookCategory]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBookmarkBook = (book: Book, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    toggleBookmark({
      id: book.id,
      type: 'book',
      title: book.title,
      subtitle: `${book.author} (${book.edition})`,
      url: `/academics?search=${encodeURIComponent(book.title)}`
    });
    showToast(isBookmarked(book.id) ? 'Removed from saved shelf' : 'Added to saved shelf');
  };

  const handleDownloadResource = (title: string) => {
    addRecentView({
      id: `res-${title}`,
      type: 'resource',
      title,
      url: `/academics`
    });
    showToast(`Downloading: ${title}`);
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-dark-bg text-ink dark:text-dark-text pb-24 transition-colors">
      
      {/* Toast */}
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

      {/* Header Banner */}
      <div className="bg-forest text-ivory pt-16 pb-20 px-4 sm:px-6 md:px-12 relative overflow-hidden rounded-b-3xl shadow-lg">
        <div className="absolute inset-0 opacity-10 paper-texture pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="font-mono text-mustard text-xs sm:text-sm tracking-widest bg-mustard/15 px-3.5 py-1 rounded-full border border-mustard/30 uppercase font-semibold">
              Academic Library & Reading Room
            </span>

            {/* View Mode Toggle */}
            <div className="flex bg-white/10 p-1 rounded-xl border border-white/20 text-xs font-medium">
              <button
                onClick={() => setMainView('curriculum')}
                className={`px-4 py-1.5 rounded-lg transition-all ${mainView === 'curriculum' ? 'bg-mustard text-ink font-bold shadow-xs' : 'text-ivory hover:text-white'}`}
              >
                Curriculum & Notes
              </button>
              <button
                onClick={() => setMainView('books')}
                className={`px-4 py-1.5 rounded-lg transition-all ${mainView === 'books' ? 'bg-mustard text-ink font-bold shadow-xs' : 'text-ivory hover:text-white'}`}
              >
                Textbooks Vault ({books.length})
              </button>
            </div>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl mb-3 leading-tight">
            Your Academic Library
          </h1>
          <p className="text-sage text-sm sm:text-base max-w-2xl font-sans mb-8">
            Every textbook, lecture module, and laboratory guide organized by department, semester, and course code.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/50 w-5 h-5" />
            <input
              type="text"
              placeholder={mainView === 'books' ? "Search 35+ textbooks by title or author..." : "Search subjects, syllabi, notes..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-dark-card text-ink dark:text-white text-sm rounded-2xl border-0 shadow-lg focus:ring-4 focus:ring-mustard/30 outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 -mt-6 relative z-20">
        
        {/* Department Chips Bar */}
        <div className="bg-white dark:bg-dark-card rounded-2xl p-3 shadow-md border border-sage/20 dark:border-dark-border mb-8 overflow-x-auto scrollbar-hide flex items-center gap-2">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveDeptId(dept.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeDeptId === dept.id
                  ? 'bg-forest text-white shadow-xs'
                  : 'bg-cream/40 dark:bg-dark-bg text-ink/70 dark:text-dark-text/70 hover:bg-cream hover:text-forest'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.color }} />
              <span>{dept.shortName}</span>
              <span className="text-[10px] opacity-60">({dept.years?.length || 0} Yrs)</span>
            </button>
          ))}
        </div>

        {/* MAIN VIEW 1: CURRICULUM & SUBJECTS */}
        {mainView === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Column: Department Info & Years/Semesters */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-cream dark:bg-dark-card p-5 rounded-2xl border border-sage/20 dark:border-dark-border">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: department.color }} />
                  <h3 className="font-serif text-lg font-bold text-forest dark:text-white">{department.name}</h3>
                </div>
                <p className="text-xs text-ink/70 dark:text-dark-text/70 mb-3">{department.description}</p>
                <div className="text-[11px] font-mono text-ink/60 dark:text-dark-text/60 space-y-1 pt-2 border-t border-sage/20">
                  <p><strong>HOD:</strong> {department.hod}</p>
                  <p><strong>Students:</strong> {department.totalStudents} enrolled</p>
                </div>
              </div>

              {/* Year Selectors */}
              <div className="space-y-2">
                <p className="section-label text-forest dark:text-sage text-[11px]">Academic Years</p>
                {years.map((y) => (
                  <div key={y.id} className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveYearId(y.id);
                        if (y.semesters?.length > 0) setActiveSemesterId(y.semesters[0].id);
                        setActiveSubject(null);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                        activeYearId === y.id
                          ? 'bg-forest text-white'
                          : 'bg-white dark:bg-dark-card text-ink/70 dark:text-dark-text/70 hover:bg-cream border border-sage/15'
                      }`}
                    >
                      <span>{y.name}</span>
                      <ChevronRight size={14} className={activeYearId === y.id ? 'rotate-90 text-mustard' : 'opacity-40'} />
                    </button>

                    {/* Semester Tabs under Selected Year */}
                    {activeYearId === y.id && (
                      <div className="pl-3 py-1 space-y-1">
                        {y.semesters.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => {
                              setActiveSemesterId(s.id);
                              setActiveSubject(null);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-all ${
                              activeSemesterId === s.id
                                ? 'bg-mustard/20 text-ink dark:text-mustard border-l-3 border-mustard font-bold'
                                : 'text-ink/60 dark:text-dark-text/60 hover:text-forest hover:bg-cream/40'
                            }`}
                          >
                            <span>{s.name}</span>
                            <span className="text-[10px] font-mono opacity-60">({s.subjects.length} courses)</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Subjects & Resources Room */}
            <div className="lg:col-span-3">
              {activeSubject ? (
                /* Subject Detail View */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 shadow-sm border border-sage/20 dark:border-dark-border"
                >
                  <button
                    onClick={() => setActiveSubject(null)}
                    className="text-xs font-semibold text-terracotta hover:underline flex items-center gap-1 mb-4"
                  >
                    ← Back to {currentSemester?.name} Subjects
                  </button>

                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-6 border-b border-sage/15 dark:border-dark-border">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-forest text-white">
                          {activeSubject.code}
                        </span>
                        <span className="text-xs font-mono text-ink/60 dark:text-dark-text/60">
                          {activeSubject.credits} Credits • Semester {activeSubject.semester}
                        </span>
                      </div>
                      <h2 className="font-serif text-3xl font-bold text-forest dark:text-white">
                        {activeSubject.name}
                      </h2>
                      <p className="text-sm text-ink/70 dark:text-dark-text/70 mt-2 max-w-2xl leading-relaxed">
                        {activeSubject.description}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSearchQuery(activeSubject.name);
                        setMainView('books');
                      }}
                      className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-3.5"
                    >
                      <BookOpen size={15} />
                      <span>Find Textbooks</span>
                    </button>
                  </div>

                  {/* Resource Categories Tabs */}
                  <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
                    {(['All', 'Notes', 'Textbooks', 'Labs', 'Syllabus'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveResourceTab(tab)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          activeResourceTab === tab
                            ? 'bg-forest text-white'
                            : 'bg-cream/40 dark:bg-dark-bg text-ink/70 dark:text-dark-text/70 border border-sage/20'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Resource Documents List */}
                  <div className="space-y-3">
                    {[
                      { title: `${activeSubject.name}: Complete Syllabus & CIA Marking Scheme`, type: 'Syllabus', file: 'PDF', size: '1.2 MB', date: '2026-08-20' },
                      { title: `Unit 1 Lecture Notes: Fundamentals & Mathematical Modeling`, type: 'Notes', file: 'PDF', size: '4.8 MB', date: '2026-09-02' },
                      { title: `Unit 2 Lecture Notes: Small Signal Biasing & Transient Analysis`, type: 'Notes', file: 'PDF', size: '5.4 MB', date: '2026-09-18' },
                      { title: `Unit 3 Lecture Notes: Frequency Response & Multistage Topologies`, type: 'Notes', file: 'PDF', size: '6.1 MB', date: '2026-09-28' },
                      { title: `Standard Laboratory Manual & Experiment Observation Sheets`, type: 'Labs', file: 'PDF', size: '8.5 MB', date: '2026-08-25' },
                      { title: `Question Bank with Solved Numerical Problems (2024-2026)`, type: 'Notes', file: 'PDF', size: '3.2 MB', date: '2026-09-22' }
                    ].filter(r => activeResourceTab === 'All' || r.type === activeResourceTab).map((res, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-cream/30 dark:bg-dark-bg/40 border border-sage/15 dark:border-dark-border flex items-center justify-between gap-4 hover:border-forest transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-forest/10 dark:bg-forest/30 text-forest dark:text-sage flex items-center justify-center shrink-0">
                            <FileText size={20} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-ink dark:text-white truncate">{res.title}</p>
                            <p className="text-xs font-mono text-ink/50 dark:text-dark-text/50 mt-0.5">
                              {res.type} • {res.file} • {res.size} • Updated {res.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleDownloadResource(res.title)}
                            className="p-2 rounded-xl bg-forest text-white hover:bg-forest-light transition-colors text-xs flex items-center gap-1.5 px-3 font-medium"
                          >
                            <Download size={14} />
                            <span className="hidden sm:inline">Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Course Subjects Grid */
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-forest dark:text-white">
                        {currentSemester ? currentSemester.name : 'Subjects'}
                      </h3>
                      <p className="text-xs text-ink/60 dark:text-dark-text/60">
                        {department.name} • Select a subject to access study guides and lecture notes
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-forest dark:text-sage bg-forest/10 px-2.5 py-1 rounded-full">
                      {currentSubjects.length} Registered Courses
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSubjects.map((subject) => (
                      <div
                        key={subject.id}
                        onClick={() => setActiveSubject(subject)}
                        className="bg-white dark:bg-dark-card p-5 rounded-2xl shadow-xs border border-sage/20 dark:border-dark-border hover:shadow-md hover:border-forest transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-mono text-xs font-bold text-forest dark:text-sage bg-cream dark:bg-dark-bg px-2 py-0.5 rounded border border-sage/20">
                              {subject.code}
                            </span>
                            <span className="text-xs font-mono text-ink/50 dark:text-dark-text/50">
                              {subject.credits} Credits
                            </span>
                          </div>

                          <h4 className="font-serif text-lg font-bold text-ink dark:text-white group-hover:text-forest dark:group-hover:text-mustard transition-colors mb-2">
                            {subject.name}
                          </h4>

                          <p className="text-xs text-ink/60 dark:text-dark-text/60 line-clamp-2 leading-relaxed mb-4">
                            {subject.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-sage/10 dark:border-dark-border flex items-center justify-between text-xs font-medium text-forest dark:text-sage group-hover:translate-x-0.5 transition-transform">
                          <span>Browse 6 Notes & Syllabus</span>
                          <ChevronRight size={15} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MAIN VIEW 2: TEXTBOOKS VAULT */}
        {mainView === 'books' && (
          <div>
            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex gap-2">
                {(['all', 'textbook', 'reference', 'recommended'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setBookCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                      bookCategory === cat
                        ? 'bg-forest text-white shadow-xs'
                        : 'bg-white dark:bg-dark-card text-ink/70 dark:text-dark-text/70 border border-sage/20'
                    }`}
                  >
                    {cat === 'all' ? 'All Books' : `${cat}s`}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono text-ink/60 dark:text-dark-text/60">
                Found <strong className="text-forest dark:text-sage">{filteredBooks.length}</strong> textbooks for {department.shortName}
              </span>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => {
                const bookmarked = isBookmarked(book.id);

                return (
                  <div
                    key={book.id}
                    onClick={() => setSelectedBook(book)}
                    className="bg-white dark:bg-dark-card rounded-2xl p-5 shadow-xs border border-sage/20 dark:border-dark-border hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      {/* Spine / Cover Color Bar */}
                      <div 
                        className="h-32 rounded-xl p-4 flex flex-col justify-between text-white relative overflow-hidden mb-4 shadow-sm"
                        style={{ backgroundColor: book.coverColor }}
                      >
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-black/10 flex items-center justify-center font-mono text-[9px] uppercase tracking-widest rotate-90 text-white/70">
                          {book.publisher}
                        </div>
                        <span className="text-[10px] font-mono uppercase bg-white/20 px-2 py-0.5 rounded backdrop-blur-xs self-start">
                          {book.category}
                        </span>
                        <div>
                          <p className="font-serif text-lg font-bold leading-tight line-clamp-2">{book.title}</p>
                          <p className="text-xs text-white/80 font-sans mt-0.5">{book.edition}</p>
                        </div>
                      </div>

                      <h3 className="font-serif text-base font-bold text-ink dark:text-white line-clamp-1 group-hover:text-forest dark:group-hover:text-mustard transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-ink/70 dark:text-dark-text/70 font-medium mb-1">
                        By {book.author}
                      </p>
                      <p className="text-xs text-ink/50 dark:text-dark-text/50 line-clamp-2 leading-relaxed mb-4">
                        {book.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-sage/10 dark:border-dark-border flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star size={14} className="fill-current" />
                        <span>{book.rating}</span>
                        <span className="text-ink/40 font-normal font-mono ml-1">({book.pages || 650}p)</span>
                      </div>

                      <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleBookmarkBook(book, e)}
                          className={`p-2 rounded-xl border transition-colors ${
                            bookmarked 
                              ? 'bg-terracotta text-white border-terracotta' 
                              : 'bg-cream/40 dark:bg-dark-bg text-ink/70 dark:text-dark-text/70 border-sage/20 hover:text-terracotta'
                          }`}
                          title="Bookmark Textbook"
                        >
                          <Bookmark size={15} className={bookmarked ? "fill-current" : ""} />
                        </button>

                        <button
                          onClick={() => setSelectedBook(book)}
                          className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1"
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBook(null)}
              className="fixed inset-0 bg-ink/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-dark-card w-full max-w-xl rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-sage/20 dark:border-dark-border"
            >
              <div 
                className="p-6 text-white relative"
                style={{ backgroundColor: selectedBook.coverColor }}
              >
                <button
                  onClick={() => setSelectedBook(null)}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 rounded-full transition-colors text-white"
                >
                  <X size={18} />
                </button>
                <span className="text-[10px] font-mono uppercase bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
                  {selectedBook.publisher} • {selectedBook.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-2 leading-tight">
                  {selectedBook.title}
                </h2>
                <p className="text-sm text-white/90 mt-1">
                  {selectedBook.author} • {selectedBook.edition}
                </p>
              </div>

              <div className="p-6 space-y-4 text-xs sm:text-sm text-ink/80 dark:text-dark-text/80 leading-relaxed">
                <p>{selectedBook.description}</p>
                
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-sage/20 font-mono text-xs">
                  <div><strong>Rating:</strong> ⭐ {selectedBook.rating}/5.0</div>
                  <div><strong>Pages:</strong> {selectedBook.pages || '800+'} pages</div>
                  <div><strong>ISBN:</strong> {selectedBook.isbn || '978-0190853464'}</div>
                  <div><strong>Library Status:</strong> {selectedBook.available ? '🟢 In Stock (Aryabhata Library)' : '🟡 Reserved'}</div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedBook.tags.map(t => (
                    <span key={t} className="text-[11px] font-mono bg-cream dark:bg-dark-bg px-2 py-0.5 rounded-md border border-sage/20">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-cream/30 dark:bg-dark-bg/40 border-t border-sage/10 dark:border-dark-border flex justify-between items-center">
                <button
                  onClick={() => handleBookmarkBook(selectedBook)}
                  className={`btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5 ${isBookmarked(selectedBook.id) ? 'bg-terracotta text-white' : ''}`}
                >
                  <Bookmark size={15} className={isBookmarked(selectedBook.id) ? 'fill-current' : ''} />
                  <span>{isBookmarked(selectedBook.id) ? 'Bookmarked' : 'Save to Shelf'}</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedBook(null)}
                    className="px-4 py-2 text-xs text-ink/60 dark:text-dark-text/60 hover:underline"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleDownloadResource(selectedBook.title);
                      setSelectedBook(null);
                    }}
                    className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <Download size={15} />
                    <span>Access Digital E-Book</span>
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

export default AcademicsPage;
