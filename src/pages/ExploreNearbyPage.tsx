import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map as MapIcon, List, Star, Navigation, MapPin, Clock, Filter, Utensils, ShoppingBag, Gamepad2, Bus, ShieldPlus, ChevronRight } from 'lucide-react';
import { nearbyPlaces } from '../data/nearbyPlaces';
import { NearbyPlace, NearbyCategory } from '../types';

export default function ExploreNearbyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NearbyCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('rating');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const categoryCards = [
    { id: 'food', title: 'Hungry?', subtitle: 'Food & Dining', icon: Utensils, bg: 'bg-terracotta text-white', hover: 'hover:bg-terracotta-light' },
    { id: 'shopping', title: 'Need supplies?', subtitle: 'Shopping', icon: ShoppingBag, bg: 'bg-mustard text-ink', hover: 'hover:bg-mustard-light' },
    { id: 'entertainment', title: 'Time to chill?', subtitle: 'Entertainment', icon: Gamepad2, bg: 'bg-lavender text-ink', hover: 'hover:bg-lavender-light' },
    { id: 'transport', title: 'Getting around?', subtitle: 'Transport', icon: Bus, bg: 'bg-sage text-ink', hover: 'hover:bg-sage-light' },
    { id: 'services', title: 'Essentials', subtitle: 'Services', icon: ShieldPlus, bg: 'bg-forest text-white', hover: 'hover:bg-forest-light' },
  ];

  const filteredPlaces = useMemo(() => {
    let filtered = nearbyPlaces.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'distance') {
      // Basic string parsing for distance (e.g., '1.2 km' -> 1.2)
      const getDist = (d: string) => parseFloat(d.replace(/[^\d.]/g, '')) || 0;
      filtered.sort((a, b) => getDist(a.distance) - getDist(b.distance));
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const PlaceCard = ({ place }: { place: NearbyPlace }) => (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card flex flex-col h-full overflow-hidden group paper-texture"
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-2">
            <span className="badge bg-cream text-forest border border-sage/30 uppercase text-[10px]">
              {place.category}
            </span>
            <span className="badge bg-white text-ink/60 border border-sage/30 uppercase text-[10px]">
              {place.subcategory}
            </span>
          </div>
          {place.popular && (
            <span className="badge bg-mustard/20 text-ink text-[10px] font-bold">Popular</span>
          )}
        </div>

        <h3 className="text-xl font-serif text-ink mb-1">{place.name}</h3>
        
        <div className="flex items-center gap-3 text-sm mb-3">
          <div className="flex items-center text-mustard">
            <Star className="w-4 h-4 fill-current mr-1" />
            <span className="font-medium text-ink">{place.rating}</span>
          </div>
          <span className="text-ink/30">•</span>
          <div className="font-mono text-xs font-medium text-forest/70">{place.distance}</div>
          {place.priceRange && (
            <>
              <span className="text-ink/30">•</span>
              <div className="text-ink/60 text-xs font-medium">{place.priceRange}</div>
            </>
          )}
        </div>

        <p className="text-ink/70 text-sm line-clamp-2 mb-4 flex-1">
          {place.description}
        </p>

        <div className="space-y-2 mt-auto text-xs text-ink/60">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span className="line-clamp-1">{place.address}</span>
          </div>
          {place.openingHours && (
            <div className="flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>{place.openingHours}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-cream/30 border-t border-sage/20 p-3">
        <button className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-forest hover:text-terracotta transition-colors">
          <Navigation className="w-4 h-4" /> Get Directions
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center sm:text-left">
        <p className="section-label mb-2">EXPLORE</p>
        <h1 className="text-4xl sm:text-5xl font-serif text-forest mb-4">Around the Corner</h1>
        <p className="text-lg text-ink/70 max-w-2xl">Discover places students actually need. From late-night food spots to essential services.</p>
      </header>

      {/* Category Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {categoryCards.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id as NearbyCategory)}
              className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 relative overflow-hidden group
                ${cat.bg} ${cat.hover} ${isSelected ? 'ring-4 ring-offset-2 ring-forest/30 scale-[0.98]' : 'hover:-translate-y-1 hover:shadow-lg'}`}
            >
              <div className="absolute -right-4 -bottom-4 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-24 h-24" />
              </div>
              <Icon className="w-8 h-8 mb-3 opacity-90" />
              <h3 className="font-serif text-xl mb-1 relative z-10">{cat.title}</h3>
              <p className="text-xs uppercase tracking-wider font-semibold opacity-80 relative z-10">{cat.subtitle}</p>
            </button>
          );
        })}
      </div>

      <div className="editorial-divider" />

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-end">
        <div className="w-full md:w-1/2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input 
            type="text" 
            placeholder="Search places, cuisines, stores..." 
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
              <option value="rating">Highest Rated</option>
              <option value="distance">Nearest First</option>
            </select>
          </div>

          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-sage/30 shrink-0">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded text-sm transition-colors ${viewMode === 'list' ? 'bg-cream text-forest' : 'text-ink/60 hover:text-ink'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded text-sm transition-colors ${viewMode === 'map' ? 'bg-cream text-forest' : 'text-ink/60 hover:text-ink'}`}
              title="Map View"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {viewMode === 'list' ? (
        filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredPlaces.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 bg-cream/30 rounded-2xl border border-sage/20 border-dashed">
            <MapIcon className="w-12 h-12 text-sage mx-auto mb-4" />
            <h3 className="text-lg font-serif text-forest mb-2">No places found</h3>
            <p className="text-ink/60 mb-6">We couldn't find any spots matching your search.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )
      ) : (
        <div className="w-full h-[500px] bg-[#e5e9e0] rounded-2xl border border-sage/30 flex flex-col items-center justify-center text-ink/60 p-8 text-center relative overflow-hidden">
          {/* Abstract map pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
             <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
          <MapIcon className="w-16 h-16 text-sage mb-4 relative z-10" />
          <h3 className="text-xl font-serif text-forest mb-2 relative z-10">Interactive Map View</h3>
          <p className="max-w-md relative z-10">
            Map integration would go here, displaying {filteredPlaces.length} locations around the campus based on your current filters.
          </p>
          <button onClick={() => setViewMode('list')} className="mt-6 btn-primary relative z-10">
            Return to List View
          </button>
        </div>
      )}
    </div>
  );
}
