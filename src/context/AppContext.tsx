import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role, LearningTrack, mockStudents, mockMentors, mockAdmin, mockNotifications, mockTracks as initialTracks, Notification } from '@/data/mockData';

type Language = 'en' | 'hi';

interface AppContextType {
  currentUser: User | null;
  language: Language;
  setLanguage: (lang: Language) => void;
  login: (email: string, role: Role) => boolean;
  logout: () => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  unreadCount: number;
  resetDemoData: () => void;
  t: (en: string, hi: string) => string;
  tracks: LearningTrack[];
  completeModule: (trackId: string, moduleId: string) => void;
  addPoints: (points: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ALL_USERS = [...mockStudents, ...mockMentors, mockAdmin];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bcg_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('bcg_lang') as Language) || 'en';
  });
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [tracks, setTracks] = useState<LearningTrack[]>(() => {
    const saved = localStorage.getItem('bcg_tracks');
    return saved ? JSON.parse(saved) : initialTracks;
  });

  useEffect(() => {
    if (currentUser) localStorage.setItem('bcg_user', JSON.stringify(currentUser));
    else localStorage.removeItem('bcg_user');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('bcg_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('bcg_tracks', JSON.stringify(tracks));
  }, [tracks]);

  const login = (email: string, role: Role): boolean => {
    const user = ALL_USERS.find(u => u.email === email && u.role === role);
    if (user) { setCurrentUser(user); return true; }
    if (role === 'student') { setCurrentUser(mockStudents[0]); return true; }
    if (role === 'mentor') { setCurrentUser(mockMentors[0]); return true; }
    if (role === 'admin') { setCurrentUser(mockAdmin); return true; }
    return false;
  };

  const logout = () => setCurrentUser(null);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const completeModule = (trackId: string, moduleId: string) => {
    setTracks(prev => prev.map(track => {
      if (track.id !== trackId) return track;
      const updatedModules = track.modules.map(m =>
        m.id === moduleId ? { ...m, completed: true } : m
      );
      const completedCount = updatedModules.filter(m => m.completed).length;
      const progress = Math.round((completedCount / updatedModules.length) * 100);
      return { ...track, modules: updatedModules, progress };
    }));
  };

  const addPoints = (points: number) => {
    setCurrentUser(prev => prev ? { ...prev, points: prev.points + points } : prev);
  };

  const resetDemoData = () => {
    localStorage.clear();
    setCurrentUser(null);
    setNotifications(mockNotifications);
    setTracks(initialTracks);
    setLanguage('en');
  };

  const t = (en: string, hi: string) => language === 'hi' ? hi : en;

  return (
    <AppContext.Provider value={{ currentUser, language, setLanguage, login, logout, notifications, markNotificationRead, unreadCount, resetDemoData, t, tracks, completeModule, addPoints }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
