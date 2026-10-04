import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Tag, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { calendarEvents } from '../data/calendar';
import { CalendarEvent } from '../types';

const CalendarPage: React.FC = () => {
  // Default to October 2026 (Month index 9)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1));
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-10-14');
  const [filterType, setFilterType] = useState<string>('all');

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-terracotta text-white';
      case 'deadline': return 'bg-mustard text-ink';
      case 'holiday': return 'bg-sage text-ink';
      case 'event': return 'bg-lavender text-ink';
      case 'academic': return 'bg-forest text-white';
      default: return 'bg-forest text-white';
    }
  };

  const getDotColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-terracotta';
      case 'deadline': return 'bg-mustard';
      case 'holiday': return 'bg-sage';
      case 'event': return 'bg-lavender';
      default: return 'bg-forest';
    }
  };

  // Events on selected day
  const selectedDayEvents = calendarEvents.filter(e => {
    const isCurrent = e.date === selectedDateStr || (e.endDate && selectedDateStr >= e.date && selectedDateStr <= e.endDate);
    const matchesFilter = filterType === 'all' || e.type === filterType;
    return isCurrent && matchesFilter;
  });

  // Upcoming events in current month
  const currentMonthEvents = calendarEvents.filter(e => {
    const eventMonth = new Date(e.date).getMonth();
    const eventYear = new Date(e.date).getFullYear();
    const matchesMonth = eventMonth === currentDate.getMonth() && eventYear === currentDate.getFullYear();
    const matchesFilter = filterType === 'all' || e.type === filterType;
    return matchesMonth && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="section-label text-forest dark:text-sage mb-1 block">Semester Roadmap</span>
          <h1 className="text-4xl font-serif text-forest dark:text-white mb-2">Academic Calendar</h1>
          <p className="text-ink/70 dark:text-dark-text/70 text-sm">
            Official Saint Oxford Institute of Technology exam cycles, submission deadlines, vacations, and campus festivals.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 bg-cream/50 dark:bg-dark-card p-1 rounded-xl border border-sage/20">
          {(['all', 'exam', 'deadline', 'holiday', 'event', 'academic'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterType === type 
                  ? 'bg-forest text-white shadow-xs' 
                  : 'text-ink/70 dark:text-dark-text/70 hover:text-forest'
              }`}
            >
              {type === 'all' ? 'All Dates' : `${type}s`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Calendar Grid View (2 cols) */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-dark-card rounded-3xl p-5 sm:p-7 border border-sage/20 dark:border-dark-border shadow-xs">
            
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-sage/15 dark:border-dark-border">
              <h2 className="text-2xl font-serif font-bold text-forest dark:text-white">
                {monthName} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={prevMonth} 
                  className="p-2 rounded-xl hover:bg-cream dark:hover:bg-dark-bg text-forest dark:text-sage transition-colors border border-sage/20"
                  aria-label="Previous Month"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={nextMonth} 
                  className="p-2 rounded-xl hover:bg-cream dark:hover:bg-dark-bg text-forest dark:text-sage transition-colors border border-sage/20"
                  aria-label="Next Month"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Weekday Names */}
            <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-mono font-bold uppercase tracking-wider text-forest/70 dark:text-sage">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-1">{day}</div>
              ))}
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {/* Empty leading days */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[75px] rounded-xl bg-cream/20 dark:bg-dark-bg/20 border border-transparent" />
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dateNum = i + 1;
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2, '0')}-${String(dateNum).padStart(2, '0')}`;
                const dayEvents = calendarEvents.filter(e => {
                  return e.date === dateStr || (e.endDate && dateStr >= e.date && dateStr <= e.endDate);
                });
                const isSelected = selectedDateStr === dateStr;

                return (
                  <div
                    key={dateNum}
                    onClick={() => setSelectedDateStr(dateStr)}
                    className={`min-h-[75px] sm:min-h-[85px] p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-forest/10 dark:bg-forest/30 border-forest shadow-xs' 
                        : 'bg-cream/30 dark:bg-dark-bg/40 border-sage/20 dark:border-dark-border hover:border-forest/40'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-mono font-bold ${isSelected ? 'text-forest dark:text-sage' : 'text-ink/80 dark:text-dark-text/80'}`}>
                        {dateNum}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                      )}
                    </div>

                    {/* Small event previews */}
                    <div className="space-y-1 my-1">
                      {dayEvents.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className={`text-[9px] font-mono uppercase px-1 py-0.5 rounded truncate font-semibold ${getTypeColor(ev.type)}`}
                        >
                          {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-[9px] font-mono text-ink/50 dark:text-dark-text/50">
                          +{dayEvents.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Selected Day & Month Agenda */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Selected Date Card */}
          <div className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-sage/20 dark:border-dark-border shadow-xs">
            <span className="section-label text-forest dark:text-sage text-[11px] mb-1 block">Selected Date</span>
            <h3 className="font-serif text-2xl font-bold text-forest dark:text-white mb-3">
              {new Date(selectedDateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>

            {selectedDayEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDayEvents.map(event => (
                  <div key={event.id} className="p-3.5 rounded-xl bg-cream/40 dark:bg-dark-bg/50 border border-sage/20 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      {event.department && (
                        <span className="text-[10px] font-mono text-ink/50 dark:text-dark-text/50">
                          {event.department}
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-xs text-ink dark:text-white leading-snug">{event.title}</p>
                    <p className="text-[11px] text-ink/70 dark:text-dark-text/70 leading-relaxed">{event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-ink/50 dark:text-dark-text/50">
                <CalendarIcon size={32} className="mx-auto mb-2 text-sage opacity-60" />
                <p>No scheduled institutional events on this date.</p>
              </div>
            )}
          </div>

          {/* Month Agenda Highlights */}
          <div className="bg-cream/40 dark:bg-dark-card rounded-3xl p-6 border border-sage/20 dark:border-dark-border shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-forest dark:text-white pb-2 border-b border-sage/20">
              {monthName} Milestones ({currentMonthEvents.length})
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {currentMonthEvents.map(ev => (
                <div 
                  key={ev.id} 
                  onClick={() => setSelectedDateStr(ev.date)}
                  className="p-3 rounded-xl bg-white dark:bg-dark-bg border border-sage/15 cursor-pointer hover:border-forest transition-colors"
                >
                  <div className="flex justify-between items-center text-[10px] font-mono text-ink/50 dark:text-dark-text/50 mb-1">
                    <span>{ev.date}</span>
                    <span className={`px-1.5 py-0.2 rounded font-bold uppercase ${getTypeColor(ev.type)}`}>
                      {ev.type}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-ink dark:text-white line-clamp-1">{ev.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CalendarPage;
