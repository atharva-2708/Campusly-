import { useState, useEffect } from 'react';
import { books } from '../data/books';
import { questionPapers } from '../data/questionPapers';
import { assignments } from '../data/assignments';
import { announcements } from '../data/announcements';
import { campusLocations } from '../data/campusLocations';
import { nearbyPlaces } from '../data/nearbyPlaces';
import { officeTimings } from '../data/officeTimings';

export interface SearchResult {
  id: string;
  title: string;
  type: 'book' | 'paper' | 'assignment' | 'announcement' | 'location' | 'nearby' | 'office';
  subtitle?: string;
  url: string;
  badge?: string;
}

export function useSearch(query: string) {
  const [results, setResults] = useState<Record<string, SearchResult[]>>({});
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults({});
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    const timer = setTimeout(() => {
      const q = query.toLowerCase().trim();
      
      const searchResults: Record<string, SearchResult[]> = {};

      // 1. Search Books
      const matchedBooks: SearchResult[] = books
        .filter(b => 
          b.title.toLowerCase().includes(q) || 
          b.author.toLowerCase().includes(q) || 
          b.tags.some(t => t.toLowerCase().includes(q))
        )
        .slice(0, 4)
        .map(b => ({
          id: b.id,
          title: b.title,
          type: 'book',
          subtitle: `${b.author} • ${b.edition}`,
          url: `/academics?search=${encodeURIComponent(b.title)}`,
          badge: b.category
        }));
      if (matchedBooks.length > 0) searchResults['Academic Books'] = matchedBooks;

      // 2. Search Question Papers
      const matchedPapers: SearchResult[] = questionPapers
        .filter(p => 
          p.subjectName.toLowerCase().includes(q) || 
          p.subjectCode.toLowerCase().includes(q) ||
          p.examType.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        )
        .slice(0, 4)
        .map(p => ({
          id: p.id,
          title: `${p.subjectName} (${p.subjectCode})`,
          type: 'paper',
          subtitle: `${p.examYear} • ${p.examType.replace('-', ' ')} • Sem ${p.semester}`,
          url: `/question-papers?search=${encodeURIComponent(p.subjectName)}`,
          badge: `${p.examYear}`
        }));
      if (matchedPapers.length > 0) searchResults['Question Papers (Exam Vault)'] = matchedPapers;

      // 3. Search Assignments & Practice
      const matchedAssignments: SearchResult[] = assignments
        .filter(a => 
          a.title.toLowerCase().includes(q) || 
          a.subjectName.toLowerCase().includes(q) ||
          a.faculty?.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q))
        )
        .slice(0, 3)
        .map(a => ({
          id: a.id,
          title: a.title,
          type: 'assignment',
          subtitle: `${a.subjectName} • Due: ${a.deadline || 'Coursework'}`,
          url: `/assignments?search=${encodeURIComponent(a.title)}`,
          badge: a.type
        }));
      if (matchedAssignments.length > 0) searchResults['Coursework & Assignments'] = matchedAssignments;

      // 4. Search Announcements
      const matchedAnnouncements: SearchResult[] = announcements
        .filter(a => 
          a.title.toLowerCase().includes(q) || 
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.department?.toLowerCase().includes(q)
        )
        .slice(0, 3)
        .map(a => ({
          id: a.id,
          title: a.title,
          type: 'announcement',
          subtitle: `${a.department || 'SOIT Admin'} • ${a.date}`,
          url: `/announcements?search=${encodeURIComponent(a.title)}`,
          badge: a.priority
        }));
      if (matchedAnnouncements.length > 0) searchResults['Announcements & Notices'] = matchedAnnouncements;

      // 5. Search Campus Locations
      const matchedLocations: SearchResult[] = campusLocations
        .filter(l => 
          l.name.toLowerCase().includes(q) || 
          l.building.toLowerCase().includes(q) ||
          l.facilities.some(f => f.toLowerCase().includes(q))
        )
        .slice(0, 3)
        .map(l => ({
          id: l.id,
          title: l.name,
          type: 'location',
          subtitle: `${l.building} (Floor ${l.floor ?? 0}) • ${l.category}`,
          url: `/campus-map?loc=${encodeURIComponent(l.id)}`,
          badge: l.category
        }));
      if (matchedLocations.length > 0) searchResults['Campus Locations & Buildings'] = matchedLocations;

      // 6. Search College Offices & Timings
      const matchedOffices: SearchResult[] = officeTimings
        .filter(o => 
          o.name.toLowerCase().includes(q) || 
          o.location.toLowerCase().includes(q) ||
          o.department?.toLowerCase().includes(q)
        )
        .slice(0, 3)
        .map(o => ({
          id: o.id,
          title: o.name,
          type: 'office',
          subtitle: `${o.location} • ${o.weekdayOpen} - ${o.weekdayClose}`,
          url: `/office-timings?search=${encodeURIComponent(o.name)}`,
          badge: o.category
        }));
      if (matchedOffices.length > 0) searchResults['College Offices & Hours'] = matchedOffices;

      // 7. Search Nearby Places
      const matchedNearby: SearchResult[] = nearbyPlaces
        .filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.subcategory.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        )
        .slice(0, 3)
        .map(p => ({
          id: p.id,
          title: p.name,
          type: 'nearby',
          subtitle: `${p.subcategory} • ${p.distance} away • ⭐ ${p.rating}`,
          url: `/explore-nearby?q=${encodeURIComponent(p.name)}`,
          badge: p.category
        }));
      if (matchedNearby.length > 0) searchResults['Explore Nearby Spots'] = matchedNearby;

      setResults(searchResults);
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, isSearching };
}
