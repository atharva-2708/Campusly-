import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookMarked, Trash2, ExternalLink, BookOpen, FileText, ClipboardList, Bell, ArrowRight } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';
import { Link, useNavigate } from 'react-router-dom';

const BookmarksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const { bookmarks, removeBookmark } = useStudent();
  const navigate = useNavigate();

  const tabs = ['All', 'Books', 'Papers', 'Assignments', 'Announcements'];

  const filteredBookmarks = bookmarks.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Books') return item.type === 'book';
    if (activeTab === 'Papers') return item.type === 'paper';
    if (activeTab === 'Assignments') return item.type === 'assignment';
    if (activeTab === 'Announcements') return item.type === 'announcement';
    return true;
  });

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'book': return <BookOpen className="w-5 h-5 text-forest dark:text-sage" />;
      case 'paper': return <FileText className="w-5 h-5 text-terracotta" />;
      case 'assignment': return <ClipboardList className="w-5 h-5 text-mustard" />;
      case 'announcement': return <Bell className="w-5 h-5 text-lavender" />;
      default: return <BookMarked className="w-5 h-5 text-forest dark:text-sage" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6">
      <div className="mb-8">
        <span className="section-label text-forest dark:text-sage mb-1 block">Personal Collection</span>
        <h1 className="text-4xl font-serif text-forest dark:text-white mb-2">Your Saved Shelf</h1>
        <p className="text-ink/70 dark:text-dark-text/70">
          Everything you've bookmarked across academic books, examination papers, assignments, and campus notices.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
        {tabs.map((tab) => {
          const count = tab === 'All' 
            ? bookmarks.length 
            : bookmarks.filter(b => b.type.toLowerCase().startsWith(tab.slice(0, 4).toLowerCase())).length;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab 
                ? 'bg-forest text-white shadow-md font-semibold' 
                : 'bg-white dark:bg-dark-card text-ink/70 dark:text-dark-text/70 hover:bg-cream dark:hover:bg-dark-bg border border-sage/20 dark:border-dark-border'
              }`}
            >
              <span>{tab}</span>
              <span className={`text-xs px-1.5 py-0.2 rounded-full font-mono ${activeTab === tab ? 'bg-white/20 text-white' : 'bg-sage/20 text-forest dark:text-sage'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bookmarks Grid / Empty State */}
      <AnimatePresence mode="popLayout">
        {filteredBookmarks.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filteredBookmarks.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-dark-card rounded-2xl p-5 shadow-sm border border-sage/20 dark:border-dark-border hover:shadow-md transition-all flex items-start justify-between gap-4 group"
              >
                <div 
                  onClick={() => navigate(item.url)}
                  className="flex items-start gap-3.5 flex-1 min-w-0 cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-cream dark:bg-dark-bg border border-sage/20 dark:border-dark-border shrink-0 group-hover:scale-105 transition-transform">
                    {getItemIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-forest/70 dark:text-sage font-bold">
                      {item.type}
                    </span>
                    <h3 className="font-serif text-base font-semibold text-ink dark:text-white mt-0.5 line-clamp-1 group-hover:text-forest dark:group-hover:text-mustard transition-colors">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-xs text-ink/60 dark:text-dark-text/60 line-clamp-1 mt-1">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => navigate(item.url)}
                    className="p-2 text-forest/70 dark:text-sage hover:bg-cream dark:hover:bg-dark-bg rounded-lg transition-colors"
                    title="Open Resource"
                  >
                    <ExternalLink size={16} />
                  </button>
                  <button
                    onClick={() => removeBookmark(item.id)}
                    className="p-2 text-ink/40 hover:text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors"
                    title="Remove from saved shelf"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card p-12 flex flex-col items-center justify-center text-center border-dashed border-2 border-sage/40 bg-white/50 dark:bg-dark-card/50"
          >
            <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center mb-6 text-forest/40 dark:text-sage">
              <BookMarked size={36} />
            </div>
            <h3 className="text-2xl font-serif text-forest dark:text-white mb-2">No {activeTab} Saved Yet</h3>
            <p className="text-ink/60 dark:text-dark-text/60 max-w-md mb-8 text-sm">
              Bookmark question papers, textbooks, assignments, and campus notices while browsing to keep them easily accessible in your saved shelf.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/academics" className="btn-primary text-xs">
                Explore Academics
              </Link>
              <Link to="/question-papers" className="btn-secondary text-xs">
                Browse Exam Papers
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookmarksPage;
