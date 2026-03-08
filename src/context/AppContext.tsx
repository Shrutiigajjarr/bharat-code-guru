import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role, mockStudents, mockMentors, mockAdmin, mockNotifications, Notification } from '@/data/mockData';

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

  useEffect(() => {
    if (currentUser) localStorage.setItem('bcg_user', JSON.stringify(currentUser));
    else localStorage.removeItem('bcg_user');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('bcg_lang', language);
  }, [language]);

  const login = (email: string, role: Role): boolean => {
    const user = ALL_USERS.find(u => u.email === email && u.role === role);
    if (user) { setCurrentUser(user); return true; }
    // Quick login by role
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

  const resetDemoData = () => {
    localStorage.clear();
    setCurrentUser(null);
    setNotifications(mockNotifications);
    setLanguage('en');
  };

  const t = (en: string, hi: string) => language === 'hi' ? hi : en;

  return (
    <AppContext.Provider value={{ currentUser, language, setLanguage, login, logout, notifications, markNotificationRead, unreadCount, resetDemoData, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
