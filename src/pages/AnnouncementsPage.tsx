import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Pin, Calendar, Clock, MapPin, User, Paperclip, ChevronDown, ChevronUp, BellRing, Filter, AlertCircle } from 'lucide-react';
import { announcements } from '../data/announcements';
import { Announcement, AnnouncementCategory } from '../types';

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AnnouncementCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'Latest' | 'Priority' | 'Category'>('Latest');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories: (AnnouncementCategory | 'All')[] = [
    'All', 'general', 'examination', 'academic', 'events', 'placement', 'clubs', 'holiday', 'administrative'
  ];

  const filteredAnnouncements = useMemo(() => {
    let filtered = announcements.filter(a => {
      const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            a.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'Latest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'Priority') {
      const priorityWeight = { urgent: 3, important: 2, normal: 1 };
      filtered.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    } else if (sortBy === 'Category') {
      filtered.sort((a, b) => a.category.localeCompare(b.category));
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.pinned);
  const unpinnedAnnouncements = filteredAnnouncements.filter(a => !a.pinned);

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'bg-terracotta/20 text-terracotta border-terracotta/30';
      case 'important': return 'bg-mustard/20 text-ink border-mustard/30';
      default: return 'bg-sage/20 text-forest border-sage/30';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      examination: 'bg-terracotta',
      academic: 'bg-forest',
      events: 'bg-lavender',
      placement: 'bg-mustard',
      clubs: 'bg-sage',
      general: 'bg-ink/60'
    };
    return colors[category] || 'bg-sage';
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const AnnouncementCard = ({ announcement }: { announcement: Announcement }) => {
    const isExpanded = expandedId === announcement.id;

    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="card relative overflow-hidden group paper-texture"
      >
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getCategoryColor(announcement.category)}`} />
        
        <div className="p-5 pl-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="badge uppercase tracking-wider text-[10px] bg-cream text-forest border border-sage/30">
                {announcement.category}
              </span>
              <span className={`badge uppercase tracking-wider text-[10px] border ${getPriorityColor(announcement.priority)}`}>
                {announcement.priority === 'urgent' && <AlertCircle className="w-3 h-3 mr-1 inline animate-pulse" />}
                {announcement.priority}
              </span>
              {announcement.pinned && (
                <span className="text-terracotta flex items-center text-xs font-medium">
                  <Pin className="w-3 h-3 mr-1 fill-current" /> Pinned
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-ink/60">
              <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {announcement.date}</span>
              <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {announcement.time}</span>
            </div>
          </div>

          <h3 className="text-xl font-serif text-ink mb-2 pr-8">{announcement.title}</h3>
          
          <p className={`text-ink/80 text-sm ${isExpanded ? 'mb-4' : 'line-clamp-2'}`}>
            {announcement.description}
          </p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-sage/20 mt-4 prose prose-sm max-w-none text-ink/90">
                  <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
                </div>
                
                {announcement.attachment && (
                  <div className="mt-4 p-3 bg-cream/50 rounded-lg border border-sage/30 flex items-center justify-between">
                    <div className="flex items-center text-sm font-medium text-forest">
                      <Paperclip className="w-4 h-4 mr-2" />
                      {announcement.attachment}
                    </div>
                    <button className="text-xs btn-secondary py-1 px-3">Download</button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-sage/10">
            <div className="flex items-center gap-4 text-xs text-ink/60">
              <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1" /> {announcement.author}</span>
              {announcement.department && (
                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {announcement.department}</span>
              )}
            </div>
            
            <button 
              onClick={() => toggleExpand(announcement.id)}
              className="text-forest text-sm font-medium flex items-center hover:text-terracotta transition-colors"
            >
              {isExpanded ? (
                <>Read Less <ChevronUp className="w-4 h-4 ml-1" /></>
              ) : (
                <>Read More <ChevronDown className="w-4 h-4 ml-1" /></>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center sm:text-left">
        <p className="section-label mb-2">ANNOUNCEMENTS</p>
        <h1 className="text-4xl sm:text-5xl font-serif text-forest mb-4">From the Noticeboard</h1>
        <p className="text-lg text-ink/70 max-w-2xl">Stay updated with everything happening around campus. Important notices, exam schedules, and event announcements.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input 
            type="text" 
            placeholder="Search announcements..." 
            className="input-field pl-11 py-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <div className="flex items-center bg-white rounded-lg border border-sage/30 px-3 py-1 mr-2 shadow-sm">
            <Filter className="w-4 h-4 text-forest mr-2" />
            <select 
              className="bg-transparent border-none text-sm text-ink focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="Latest">Sort: Latest</option>
              <option value="Priority">Sort: Priority</option>
              <option value="Category">Sort: Category</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat 
                ? 'bg-forest text-white shadow-md' 
                : 'bg-white text-ink border border-sage/30 hover:bg-cream'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {pinnedAnnouncements.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Pin className="w-5 h-5 text-terracotta fill-terracotta/20" />
            <h2 className="text-xl font-serif text-ink">Pinned Notices</h2>
          </div>
          <div className="grid gap-4">
            {pinnedAnnouncements.map(announcement => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
          <div className="editorial-divider" />
        </div>
      )}

      <div>
        <h2 className="text-xl font-serif text-ink mb-4">All Announcements</h2>
        {unpinnedAnnouncements.length > 0 ? (
          <div className="grid gap-4">
            {unpinnedAnnouncements.map(announcement => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-cream/30 rounded-2xl border border-sage/20 border-dashed">
            <BellRing className="w-12 h-12 text-sage mx-auto mb-4" />
            <h3 className="text-lg font-serif text-forest mb-2">No announcements found</h3>
            <p className="text-ink/60">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
