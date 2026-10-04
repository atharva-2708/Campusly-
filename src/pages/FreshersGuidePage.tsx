import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, BookOpen, Users, Phone, CheckCircle2, Circle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { freshersArticles, checklistItems } from '../data/freshersGuide';
import { FreshersArticle, ChecklistItem } from '../types';

export default function FreshersGuidePage() {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('freshersChecklist');
    if (saved) {
      try {
        setCompletedTasks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse checklist items');
      }
    }
  }, []);

  // Save to local storage
  const toggleTask = (id: string) => {
    const updated = { ...completedTasks, [id]: !completedTasks[id] };
    setCompletedTasks(updated);
    localStorage.setItem('freshersChecklist', JSON.stringify(updated));
  };

  const progress = Math.round(
    (checklistItems.filter(item => completedTasks[item.id]).length / checklistItems.length) * 100
  ) || 0;

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: Bookmark, bg: 'bg-mustard/20', text: 'text-ink' },
    { id: 'academic', label: 'Academic Survival Guide', icon: BookOpen, bg: 'bg-forest/10', text: 'text-forest' },
    { id: 'campus-life', label: 'Campus Life', icon: Users, bg: 'bg-lavender/20', text: 'text-ink' },
    { id: 'contacts', label: 'Useful Contacts', icon: Phone, bg: 'bg-terracotta/20', text: 'text-terracotta' }
  ];

  const getArticlesByCategory = (categoryId: string) => {
    return freshersArticles
      .filter(a => a.category === categoryId)
      .sort((a, b) => a.order - b.order);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl sm:text-6xl font-serif text-forest mb-4">New here? We've got you.</h1>
        <p className="text-xl text-ink/70 max-w-2xl mx-auto">Everything you need to know about starting your journey at SOIT, curated by seniors who survived it.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content: Scrapbook/Editorial Sections */}
        <div className="lg:col-span-2 space-y-12">
          {categories.map(category => {
            const articles = getArticlesByCategory(category.id);
            if (articles.length === 0) return null;
            const Icon = category.icon;

            return (
              <section key={category.id} className="relative">
                {/* Decorative background element */}
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-sage/20 rounded-full" />
                
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-lg ${category.bg} ${category.text}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-serif text-ink">{category.label}</h2>
                </div>

                <div className="space-y-4">
                  {articles.map((article: FreshersArticle) => {
                    const isExpanded = expandedArticle === article.id;
                    return (
                      <motion.div 
                        key={article.id}
                        layout
                        className="bg-white rounded-xl border border-sage/30 overflow-hidden shadow-sm hover:shadow-md transition-shadow paper-texture"
                      >
                        <button
                          onClick={() => setExpandedArticle(isExpanded ? null : article.id)}
                          className="w-full text-left p-5 flex items-center justify-between group"
                        >
                          <h3 className="text-lg font-medium text-ink group-hover:text-forest transition-colors">
                            {article.title}
                          </h3>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-ink/40" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-ink/40 group-hover:text-forest" />
                          )}
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden bg-cream/10 border-t border-sage/10"
                            >
                              <div 
                                className="p-5 prose prose-sm sm:prose-base max-w-none prose-headings:font-serif prose-headings:text-forest prose-a:text-terracotta text-ink/80"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Sidebar: Checklist */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 card bg-[#f9f8f4] border-sage/40 p-6 overflow-hidden">
            {/* Washi tape decoration */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-mustard/40 rotate-[-2deg] opacity-80 backdrop-blur-sm shadow-sm" />
            
            <h3 className="text-xl font-serif text-forest mb-2 mt-2">Your First Week</h3>
            <p className="text-sm text-ink/60 mb-6">Complete these essentials to settle in smoothly.</p>

            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold text-ink/50 uppercase tracking-wide mb-2">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full bg-sage/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-terracotta rounded-full transition-all duration-500 ease-out"
                />
              </div>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {[1, 2, 3].map(day => {
                const dayTasks = checklistItems.filter(item => item.day === day);
                if (dayTasks.length === 0) return null;

                return (
                  <div key={`day-${day}`}>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-forest/70 mb-3 border-b border-sage/20 pb-1">Day {day}</h4>
                    <div className="space-y-3">
                      {dayTasks.map((task: ChecklistItem) => {
                        const isDone = completedTasks[task.id];
                        return (
                          <div 
                            key={task.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer
                              ${isDone ? 'bg-sage/10 border-sage/30' : 'bg-white border-sage/20 hover:border-forest/30'}`}
                            onClick={() => toggleTask(task.id)}
                          >
                            <button className="shrink-0 mt-0.5 text-forest">
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 fill-forest/20" />
                              ) : (
                                <Circle className="w-5 h-5 text-sage" />
                              )}
                            </button>
                            <div>
                              <p className={`text-sm font-medium transition-all ${isDone ? 'text-ink/60 line-through' : 'text-ink'}`}>
                                {task.title}
                              </p>
                              <p className="text-xs text-ink/50 mt-1 leading-relaxed">
                                {task.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {progress === 100 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-forest text-white rounded-lg text-center"
              >
                <span className="text-2xl mb-1 block">🎉</span>
                <p className="font-serif text-lg mb-1">You're all set!</p>
                <p className="text-xs opacity-80">Welcome to the SOIT family.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
