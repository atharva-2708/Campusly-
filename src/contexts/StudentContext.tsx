import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { StudentProfile, StudyTask } from '../types';
import { defaultStudent } from '../data/studentProfile';
import { generateId } from '../utils/helpers';

export interface Bookmark {
  id: string;
  type: 'resource' | 'paper' | 'assignment' | 'book' | 'announcement';
  title: string;
  url: string;
  subtitle?: string;
}

export interface RecentView {
  id: string;
  type: 'resource' | 'paper' | 'assignment' | 'book' | 'announcement';
  title: string;
  url: string;
  viewedAt: string;
}

export interface StudentContextType {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  bookmarks: Bookmark[];
  isBookmarked: (id: string) => boolean;
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  toggleBookmark: (bookmark: Bookmark) => void;
  recentViews: RecentView[];
  addRecentView: (view: Omit<RecentView, 'viewedAt'>) => void;
  clearRecentViews: () => void;
  studyTasks: StudyTask[];
  addStudyTask: (task: Omit<StudyTask, 'id' | 'createdAt'>) => void;
  toggleStudyTask: (id: string) => void;
  deleteStudyTask: (id: string) => void;
  updatePreferences: (prefs: Partial<StudentProfile['preferences']>) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useLocalStorage<StudentProfile>('campusly-profile', defaultStudent);
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>('campusly-bookmarks', [
    {
      id: 'b1',
      type: 'book',
      title: 'Microelectronic Circuits',
      subtitle: 'Sedra & Smith (8th Edition)',
      url: '/academics?search=Microelectronic'
    },
    {
      id: 'qp-1',
      type: 'paper',
      title: 'Analog Electronics (EXTC201) - End Sem 2025',
      subtitle: 'Semester III End Semester Paper',
      url: '/question-papers?search=Analog'
    },
    {
      id: 'assgn-1',
      type: 'assignment',
      title: 'Small-Signal BJT Amplifier Analysis',
      subtitle: 'Due: Oct 15, 2026',
      url: '/assignments?search=Small-Signal'
    }
  ]);
  const [recentViews, setRecentViews] = useLocalStorage<RecentView[]>('campusly-recent', [
    {
      id: 'b1',
      type: 'book',
      title: 'Microelectronic Circuits (Sedra & Smith)',
      url: '/academics',
      viewedAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'qp-1',
      type: 'paper',
      title: 'Analog Electronics PYQ 2025',
      url: '/question-papers',
      viewedAt: new Date(Date.now() - 7200000).toISOString()
    }
  ]);
  const [studyTasks, setStudyTasks] = useLocalStorage<StudyTask[]>('campusly-tasks', [
    {
      id: 'task-1',
      title: 'Review Analog Electronics Cascode Amplifier derivations',
      subject: 'Analog Electronics',
      deadline: '2026-10-12',
      completed: true,
      priority: 'high',
      createdAt: '2026-10-01'
    },
    {
      id: 'task-2',
      title: 'Solve Network Theory 2-port Z and ABCD conversion set',
      subject: 'Network Theory',
      deadline: '2026-10-14',
      completed: false,
      priority: 'high',
      createdAt: '2026-10-02'
    },
    {
      id: 'task-3',
      title: 'Complete Signals & Systems continuous convolution notes',
      subject: 'Signals and Systems',
      deadline: '2026-10-16',
      completed: false,
      priority: 'medium',
      createdAt: '2026-10-03'
    }
  ]);

  const updateProfile = useCallback((updates: Partial<StudentProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...updates
    }));
  }, [setProfile]);

  const isBookmarked = useCallback((id: string) => {
    return bookmarks.some(b => b.id === id);
  }, [bookmarks]);

  const addBookmark = useCallback((bookmark: Bookmark) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === bookmark.id)) return prev;
      return [bookmark, ...prev];
    });
  }, [setBookmarks]);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  }, [setBookmarks]);

  const toggleBookmark = useCallback((bookmark: Bookmark) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === bookmark.id)) {
        return prev.filter(b => b.id !== bookmark.id);
      }
      return [bookmark, ...prev];
    });
  }, [setBookmarks]);

  const addRecentView = useCallback((view: Omit<RecentView, 'viewedAt'>) => {
    setRecentViews(prev => {
      const filtered = prev.filter(v => v.id !== view.id);
      return [{ ...view, viewedAt: new Date().toISOString() }, ...filtered].slice(0, 10);
    });
  }, [setRecentViews]);

  const clearRecentViews = useCallback(() => {
    setRecentViews([]);
  }, [setRecentViews]);

  const addStudyTask = useCallback((task: Omit<StudyTask, 'id' | 'createdAt'>) => {
    const newTask: StudyTask = {
      ...task,
      id: `task-${generateId()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setStudyTasks(prev => [newTask, ...prev]);
  }, [setStudyTasks]);

  const toggleStudyTask = useCallback((id: string) => {
    setStudyTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setStudyTasks]);

  const deleteStudyTask = useCallback((id: string) => {
    setStudyTasks(prev => prev.filter(task => task.id !== id));
  }, [setStudyTasks]);

  const updatePreferences = useCallback((prefs: Partial<StudentProfile['preferences']>) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...prefs
      }
    }));
  }, [setProfile]);

  return (
    <StudentContext.Provider
      value={{
        profile,
        setProfile,
        updateProfile,
        bookmarks,
        isBookmarked,
        addBookmark,
        removeBookmark,
        toggleBookmark,
        recentViews,
        addRecentView,
        clearRecentViews,
        studyTasks,
        addStudyTask,
        toggleStudyTask,
        deleteStudyTask,
        updatePreferences
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
