import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Map, List, Navigation, Clock, Info, X } from 'lucide-react';
import { campusLocations } from '../data/campusLocations';
import { CampusLocation, LocationCategory } from '../types';

export default function CampusMapPage() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | 'All'>('All');
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(null);

  const categories: (LocationCategory | 'All')[] = [
    'All', 'academic', 'administrative', 'food', 'sports', 'hostel', 'medical', 'library', 'parking'
  ];

  const filteredLocations = useMemo(() => {
    return campusLocations.filter(loc => {
      const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            loc.building.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || loc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      academic: 'var(--color-forest)',
      administrative: 'var(--color-terracotta)',
      food: 'var(--color-mustard)',
      sports: 'var(--color-sage)',
      hostel: 'var(--color-lavender)',
      medical: '#ef4444',
      library: '#8b5cf6',
      parking: '#64748b'
    };
    return colors[category] || 'var(--color-ink)';
  };

  const getCategoryBgClass = (category: string) => {
    const classes: Record<string, string> = {
      academic: 'bg-forest text-white',
      administrative: 'bg-terracotta text-white',
      food: 'bg-mustard text-ink',
      sports: 'bg-sage text-ink',
      hostel: 'bg-lavender text-ink',
      medical: 'bg-red-500 text-white',
      library: 'bg-purple-500 text-white',
      parking: 'bg-slate-500 text-white'
    };
    return classes[category] || 'bg-ink text-white';
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-cream/20">
      <div className="p-4 sm:p-6 lg:p-8 shrink-0">
        <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-forest mb-2">Explore Your Campus</h1>
            <p className="text-ink/70">Navigate SOIT like you've been here for years.</p>
          </div>
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-sage/20 self-start md:self-auto">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'map' ? 'bg-forest text-white shadow' : 'text-ink/70 hover:bg-cream'}`}
            >
              <Map className="w-4 h-4" /> Map
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-forest text-white shadow' : 'text-ink/70 hover:bg-cream'}`}
            >
              <List className="w-4 h-4" /> List
            </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
            <input 
              type="text" 
              placeholder="Search buildings, labs, cafeterias..." 
              className="input-field pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setSelectedLocation(null); }}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-forest text-white shadow-md' 
                  : 'bg-white text-ink border border-sage/30 hover:bg-cream'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden flex">
        {viewMode === 'map' ? (
          <div className="flex-1 relative bg-[#e5e9e0] border-t border-sage/30 overflow-hidden">
            {/* Map Container - Panning/Zooming would normally use a library like react-zoom-pan-pinch, keeping it simple here */}
            <div className="absolute inset-0 overflow-auto scrollbar-hide flex items-center justify-center p-8">
              <div className="relative w-full max-w-4xl aspect-[4/3] bg-[#d5dacb] rounded-3xl shadow-inner border border-[#c2cbb5] overflow-hidden">
                {/* Grass/Paths pattern background */}
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c2cbb5" strokeWidth="0.5" opacity="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Decorative paths */}
                  <path d="M 10 50 Q 50 50 50 10" fill="none" stroke="#e5e9e0" strokeWidth="4" />
                  <path d="M 0 80 C 30 80 50 50 100 50" fill="none" stroke="#e5e9e0" strokeWidth="6" />
                  <path d="M 50 0 L 50 100" fill="none" stroke="#e5e9e0" strokeWidth="8" opacity="0.8" />
                  <path d="M 20 20 L 80 80" fill="none" stroke="#e5e9e0" strokeWidth="4" />
                </svg>

                {/* Locations */}
                {filteredLocations.map(loc => (
                  <motion.button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className="absolute group flex flex-col items-center justify-center cursor-pointer hover:z-10"
                    style={{
                      left: `${loc.x}%`,
                      top: `${loc.y}%`,
                      width: `${loc.width}%`,
                      height: `${loc.height}%`,
                      backgroundColor: getCategoryColor(loc.category),
                      opacity: selectedLocation && selectedLocation.id !== loc.id ? 0.6 : 1,
                      boxShadow: selectedLocation?.id === loc.id ? '0 0 0 4px white, 0 0 0 6px var(--color-forest)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white font-serif font-bold text-xs sm:text-sm text-center px-1 drop-shadow-md">
                      {loc.name}
                    </span>
                    <span className="text-white/80 text-[10px] hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                      {loc.building}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Legend / Overlay */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg border border-sage/20 hidden md:block">
              <h4 className="font-serif text-sm text-forest mb-2">Map Legend</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {categories.filter(c => c !== 'All').map(c => (
                  <div key={c} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: getCategoryColor(c) }} />
                    <span className="text-xs text-ink capitalize">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-ivory">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLocations.map(loc => (
                <div 
                  key={loc.id} 
                  className="card-interactive p-5"
                  onClick={() => setSelectedLocation(loc)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`badge text-[10px] uppercase tracking-wider ${getCategoryBgClass(loc.category)}`}>
                      {loc.category}
                    </span>
                    <MapPin className="w-4 h-4 text-sage" />
                  </div>
                  <h3 className="text-lg font-serif text-ink mb-1">{loc.name}</h3>
                  <p className="text-sm text-ink/60 mb-3">{loc.building}{loc.floor ? `, Floor ${loc.floor}` : ''}</p>
                  
                  {loc.openTime && (
                    <div className="flex items-center text-xs text-ink/70 mt-2">
                      <Clock className="w-3 h-3 mr-1" /> {loc.openTime} - {loc.closeTime}
                    </div>
                  )}
                </div>
              ))}
              {filteredLocations.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <Map className="w-12 h-12 text-sage mx-auto mb-4" />
                  <h3 className="text-xl font-serif text-forest mb-2">No locations found</h3>
                  <p className="text-ink/60">Try adjusting your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Side Panel / Bottom Sheet */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`absolute top-0 right-0 bottom-0 w-full sm:w-96 bg-white shadow-[-10px_0_30px_rgba(24,61,50,0.1)] border-l border-sage/20 z-20 flex flex-col ${viewMode === 'list' && 'hidden sm:flex'}`}
            >
              <div className="p-4 border-b border-sage/20 flex justify-between items-center bg-cream/30">
                <span className={`badge uppercase tracking-wider text-[10px] ${getCategoryBgClass(selectedLocation.category)}`}>
                  {selectedLocation.category}
                </span>
                <button 
                  onClick={() => setSelectedLocation(null)}
                  className="p-2 hover:bg-sage/20 rounded-full transition-colors text-ink/60 hover:text-ink"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-auto flex-1">
                <h2 className="text-3xl font-serif text-forest mb-2">{selectedLocation.name}</h2>
                
                <div className="flex items-start gap-2 text-ink/70 mb-6">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-terracotta" />
                  <div>
                    <p className="font-medium text-ink">{selectedLocation.building}</p>
                    {selectedLocation.floor && <p className="text-sm">Floor {selectedLocation.floor}</p>}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold text-ink/50 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" /> About
                  </h3>
                  <p className="text-ink/80 leading-relaxed text-sm">
                    {selectedLocation.description}
                  </p>
                </div>

                {(selectedLocation.openTime || selectedLocation.closeTime) && (
                  <div className="mb-8 p-4 bg-cream/30 rounded-xl border border-sage/20">
                    <h3 className="text-sm font-bold text-ink/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Timings
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink/70">Opening Hours</span>
                      <span className="font-medium text-ink">{selectedLocation.openTime || 'N/A'} - {selectedLocation.closeTime || 'N/A'}</span>
                    </div>
                  </div>
                )}

                {selectedLocation.facilities && selectedLocation.facilities.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-ink/50 uppercase tracking-wider mb-3">Facilities</h3>
                    <ul className="grid grid-cols-1 gap-2 text-sm text-ink/80">
                      {selectedLocation.facilities.map((fac, i) => (
                        <li key={i} className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-sage before:rounded-full">
                          {fac}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto pt-6">
                  <button className="btn-primary w-full justify-center">
                    <Navigation className="w-4 h-4" /> Get Directions
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile bottom sheet view for list mode */}
        <AnimatePresence>
          {selectedLocation && viewMode === 'list' && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="sm:hidden fixed inset-x-0 bottom-0 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-2xl z-50 p-6 pt-4 border-t border-sage/20 max-h-[85vh] overflow-auto"
            >
              <div className="w-12 h-1.5 bg-sage/30 rounded-full mx-auto mb-6" onClick={() => setSelectedLocation(null)} />
              
              <div className="flex justify-between items-start mb-4">
                <span className={`badge uppercase tracking-wider text-[10px] ${getCategoryBgClass(selectedLocation.category)}`}>
                  {selectedLocation.category}
                </span>
              </div>
              
              <h2 className="text-2xl font-serif text-forest mb-2">{selectedLocation.name}</h2>
              <div className="flex items-start gap-2 text-ink/70 mb-6 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-terracotta" />
                <p>{selectedLocation.building}{selectedLocation.floor ? `, Floor ${selectedLocation.floor}` : ''}</p>
              </div>

              <p className="text-ink/80 text-sm mb-6">{selectedLocation.description}</p>

              <button className="btn-primary w-full justify-center">
                <Navigation className="w-4 h-4" /> Get Directions
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
