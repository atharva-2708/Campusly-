import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Phone, Mail, Filter, Building, AlertCircle } from 'lucide-react';
import { officeTimings } from '../data/officeTimings';
import { isOfficeOpen } from '../utils/helpers';
import { OfficeTimings } from '../types';

export default function OfficeTimingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'Name' | 'Category' | 'Open Now'>('Open Now');

  const categories = ['All', 'administrative', 'academic', 'support', 'facility'];

  const filteredOffices = useMemo(() => {
    let filtered = officeTimings.filter(office => {
      const matchesSearch = office.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            office.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            office.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || office.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // We calculate "isOpen" status once for sorting
    const now = new Date();
    const officesWithStatus = filtered.map(office => ({
      ...office,
      isOpen: isOfficeOpen(office, now)
    }));

    if (sortBy === 'Open Now') {
      officesWithStatus.sort((a, b) => {
        if (a.isOpen && !b.isOpen) return -1;
        if (!a.isOpen && b.isOpen) return 1;
        return a.name.localeCompare(b.name);
      });
    } else if (sortBy === 'Name') {
      officesWithStatus.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'Category') {
      officesWithStatus.sort((a, b) => a.category.localeCompare(b.category));
    }

    return officesWithStatus;
  }, [searchQuery, selectedCategory, sortBy]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      administrative: 'bg-terracotta text-white',
      academic: 'bg-forest text-white',
      support: 'bg-mustard text-ink',
      facility: 'bg-sage text-ink'
    };
    return colors[category] || 'bg-ink text-white';
  };

  const OfficeCard = ({ office }: { office: OfficeTimings & { isOpen: boolean } }) => {
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="card flex flex-col h-full overflow-hidden border-t-4"
        style={{ borderTopColor: office.category === 'administrative' ? 'var(--color-terracotta)' : 
                                 office.category === 'academic' ? 'var(--color-forest)' : 
                                 office.category === 'support' ? 'var(--color-mustard)' : 'var(--color-sage)' }}
      >
        <div className="p-5 flex-1">
          <div className="flex justify-between items-start mb-3">
            <span className={`badge uppercase tracking-wider text-[10px] ${getCategoryColor(office.category)}`}>
              {office.category}
            </span>
            <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm
              ${office.isOpen ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-100'}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${office.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              {office.isOpen ? 'OPEN NOW' : 'CLOSED'}
            </div>
          </div>

          <h3 className="text-xl font-serif text-ink mb-1">{office.name}</h3>
          {office.department && (
            <p className="text-sm font-medium text-forest mb-3">{office.department}</p>
          )}

          <p className="text-ink/70 text-sm mb-4 line-clamp-2">
            {office.description}
          </p>

          <div className="space-y-3 bg-cream/20 p-4 rounded-xl border border-sage/20">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-terracotta mt-0.5 shrink-0" />
              <span className="text-sm text-ink/80">{office.location}</span>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-forest mt-0.5 shrink-0" />
              <div className="text-sm text-ink/80 space-y-1">
                <div className="flex justify-between gap-4">
                  <span className="font-medium">Mon-Fri:</span>
                  <span>{office.weekdayOpen} - {office.weekdayClose}</span>
                </div>
                {(office.saturdayOpen && office.saturdayClose) ? (
                  <div className="flex justify-between gap-4 text-ink/70">
                    <span>Saturday:</span>
                    <span>{office.saturdayOpen} - {office.saturdayClose}</span>
                  </div>
                ) : (
                  <div className="flex justify-between gap-4 text-ink/50">
                    <span>Saturday:</span>
                    <span>Closed</span>
                  </div>
                )}
                {office.sundayClosed && (
                  <div className="flex justify-between gap-4 text-ink/50">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                )}
                {office.lunchBreak && (
                  <div className="flex items-center gap-1 text-xs text-mustard font-medium mt-1">
                    <AlertCircle className="w-3 h-3" /> Lunch: {office.lunchBreak}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cream/40 p-4 border-t border-sage/20 flex flex-col sm:flex-row gap-3 justify-between items-center text-sm">
          {office.contactNumber ? (
            <a href={`tel:${office.contactNumber}`} className="flex items-center gap-2 text-forest hover:text-terracotta font-medium transition-colors">
              <Phone className="w-4 h-4" /> {office.contactNumber}
            </a>
          ) : (
            <span className="text-ink/40 text-xs italic">No phone available</span>
          )}
          
          {office.contactEmail && (
            <a href={`mailto:${office.contactEmail}`} className="flex items-center gap-2 text-forest hover:text-terracotta font-medium transition-colors">
              <Mail className="w-4 h-4" /> Email
            </a>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center sm:text-left">
        <p className="section-label mb-2">DIRECTORY</p>
        <h1 className="text-4xl sm:text-5xl font-serif text-forest mb-4">Office Hours & Contacts</h1>
        <p className="text-lg text-ink/70 max-w-2xl">Know when offices are open before you walk there. Real-time status for all administrative and academic departments.</p>
      </header>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-end">
        <div className="w-full md:w-1/2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input 
            type="text" 
            placeholder="Search offices, departments, locations..." 
            className="input-field pl-11 py-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="flex items-center bg-white rounded-lg border border-sage/30 px-3 py-2 shadow-sm shrink-0">
            <Filter className="w-4 h-4 text-forest mr-2" />
            <select 
              className="bg-transparent border-none text-sm text-ink focus:outline-none cursor-pointer pr-4"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="Open Now">Sort: Open Now</option>
              <option value="Name">Sort: A-Z</option>
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

      {filteredOffices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredOffices.map(office => (
              <OfficeCard key={office.id} office={office} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-16 bg-cream/30 rounded-2xl border border-sage/20 border-dashed">
          <Building className="w-12 h-12 text-sage mx-auto mb-4" />
          <h3 className="text-lg font-serif text-forest mb-2">No offices found</h3>
          <p className="text-ink/60 mb-6">We couldn't find any offices matching your search.</p>
          <button 
            onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
