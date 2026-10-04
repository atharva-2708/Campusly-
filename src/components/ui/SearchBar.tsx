import React, { useState, useRef, useEffect } from 'react';
import { Search, X, BookOpen, FileText, ClipboardList, Bell, MapPin, Compass, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch, SearchResult } from '../../hooks/useSearch';
import { useNavigate } from 'react-router-dom';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { results, isSearching } = useSearch(query);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (url: string) => {
    navigate(url);
    setIsOpen(false);
    setQuery('');
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'book': return <BookOpen className="w-4 h-4 text-forest shrink-0" />;
      case 'paper': return <FileText className="w-4 h-4 text-terracotta shrink-0" />;
      case 'assignment': return <ClipboardList className="w-4 h-4 text-mustard shrink-0" />;
      case 'announcement': return <Bell className="w-4 h-4 text-lavender shrink-0" />;
      case 'location': return <MapPin className="w-4 h-4 text-sage shrink-0" />;
      case 'office': return <Clock className="w-4 h-4 text-forest shrink-0" />;
      case 'nearby': return <Compass className="w-4 h-4 text-terracotta shrink-0" />;
      default: return <Search className="w-4 h-4 text-ink/40 shrink-0" />;
    }
  };

  const totalResultsCount = Object.values(results).reduce((acc, items) => acc + items.length, 0);

  return (
    <div ref={containerRef} className="relative z-50 w-full max-w-lg">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-ink/40 dark:text-dark-text/40" />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="input-field pl-10 pr-14 py-2 text-sm w-full bg-cream/40 dark:bg-dark-card border-sage/30 dark:border-dark-border focus:bg-white dark:focus:bg-dark-card transition-all"
          placeholder="Search subjects, books, PYQs, labs, offices..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1">
          {query ? (
            <button 
              onClick={() => { setQuery(''); inputRef.current?.focus(); }} 
              className="p-1 hover:bg-sage/20 rounded-md transition-colors text-ink/50 dark:text-dark-text/50"
              title="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block text-[10px] font-mono text-ink/40 dark:text-dark-text/40 bg-white dark:bg-dark-bg border border-sage/30 dark:border-dark-border rounded px-1.5 py-0.5 shadow-2xs">
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && query.trim().length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full bg-white dark:bg-dark-card rounded-2xl shadow-[var(--shadow-modal)] border border-sage/20 dark:border-dark-border overflow-hidden"
          >
            <div className="max-h-[65vh] overflow-y-auto p-2 divide-y divide-sage/10 dark:divide-dark-border">
              {isSearching ? (
                <div className="py-8 text-center text-sm text-ink/60 dark:text-dark-text/60 flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-forest border-t-transparent rounded-full animate-spin" />
                  <span>Searching campus knowledge base...</span>
                </div>
              ) : totalResultsCount > 0 ? (
                Object.entries(results).map(([category, items]) => (
                  <div key={category} className="py-2 first:pt-1 last:pb-1">
                    <div className="px-3 py-1 text-[11px] font-mono font-semibold text-forest/70 dark:text-sage uppercase tracking-wider">
                      {category}
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {items.map((item) => (
                        <button
                          key={`${item.type}-${item.id}`}
                          onClick={() => handleSelect(item.url)}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-cream/50 dark:hover:bg-dark-bg/60 transition-colors flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="p-1.5 rounded-lg bg-sage/10 dark:bg-forest/20 group-hover:bg-white dark:group-hover:bg-dark-card transition-colors">
                              {getResultIcon(item.type)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-ink dark:text-dark-text truncate group-hover:text-forest dark:group-hover:text-mustard transition-colors">
                                {item.title}
                              </p>
                              {item.subtitle && (
                                <p className="text-xs text-ink/50 dark:text-dark-text/50 truncate">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                          </div>
                          {item.badge && (
                            <span className="shrink-0 text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-sage/10 text-forest dark:text-sage border border-sage/20">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-ink/60 dark:text-dark-text/60">
                  <p className="font-serif text-base text-forest dark:text-sage mb-1">No campus results found</p>
                  <p className="text-xs text-ink/50 dark:text-dark-text/50">Try searching for "Analog", "Library", "Sharma", or "Hostel".</p>
                </div>
              )}
            </div>
            {totalResultsCount > 0 && (
              <div className="px-3 py-2 bg-cream/30 dark:bg-dark-bg/40 border-t border-sage/10 dark:border-dark-border text-[11px] text-ink/50 dark:text-dark-text/50 flex justify-between items-center">
                <span>Press <kbd className="font-mono bg-white dark:bg-dark-card px-1 rounded border border-sage/20">ESC</kbd> to exit</span>
                <span className="font-mono">{totalResultsCount} results</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
