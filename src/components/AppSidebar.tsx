import { useApp } from '@/context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome, FiBook, FiCode, FiTerminal, FiUsers,
  FiAward, FiBarChart2, FiUser, FiSettings, FiX
} from 'react-icons/fi';

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

const studentLinks = [
  { path: '/dashboard', label: 'Dashboard', labelHi: 'डैशबोर्ड', icon: FiHome },
  { path: '/learning-paths', label: 'Learning Paths', labelHi: 'सीखने के रास्ते', icon: FiBook },
  { path: '/practice', label: 'Practice', labelHi: 'अभ्यास', icon: FiCode },
  { path: '/playground', label: 'Code Playground', labelHi: 'कोड प्लेग्राउंड', icon: FiTerminal },
  { path: '/mentorship', label: 'Mentorship', labelHi: 'मेंटरशिप', icon: FiUsers },
  { path: '/leaderboard', label: 'Leaderboard', labelHi: 'लीडरबोर्ड', icon: FiAward },
  { path: '/analytics', label: 'Analytics', labelHi: 'विश्लेषण', icon: FiBarChart2 },
  { path: '/profile', label: 'Profile', labelHi: 'प्रोफ़ाइल', icon: FiUser },
];

const mentorLinks = [
  { path: '/dashboard', label: 'Dashboard', labelHi: 'डैशबोर्ड', icon: FiHome },
  { path: '/mentorship', label: 'Requests', labelHi: 'अनुरोध', icon: FiUsers },
  { path: '/analytics', label: 'Analytics', labelHi: 'विश्लेषण', icon: FiBarChart2 },
  { path: '/profile', label: 'Profile', labelHi: 'प्रोफ़ाइल', icon: FiUser },
];

const adminLinks = [
  { path: '/dashboard', label: 'Dashboard', labelHi: 'डैशबोर्ड', icon: FiHome },
  { path: '/admin', label: 'Admin Panel', labelHi: 'व्यवस्थापक पैनल', icon: FiSettings },
  { path: '/analytics', label: 'Analytics', labelHi: 'विश्लेषण', icon: FiBarChart2 },
  { path: '/leaderboard', label: 'Leaderboard', labelHi: 'लीडरबोर्ड', icon: FiAward },
];

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const { currentUser, t } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const links = currentUser?.role === 'admin' ? adminLinks
    : currentUser?.role === 'mentor' ? mentorLinks
    : studentLinks;

  return (
    <>
      {open && <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div style={{ width: 30, height: 30, borderRadius: 8, fontSize: 14, background: 'linear-gradient(135deg, rgb(187, 134, 252), rgba(3, 218, 198, 0.333))', border: '1px solid rgba(187, 134, 252, 0.267)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'rgba(187, 134, 252, 0.267) 0px 0px 16px' }}>🇮🇳</div>
            <span className="font-bold text-sidebar-primary-foreground">BCG</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-sidebar-accent transition-colors">
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {links.map(link => {
            const active = location.pathname === link.path;
            return (
              <button
                key={link.path}
                onClick={() => { navigate(link.path); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {t(link.label, link.labelHi)}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60 text-center">© 2026 Bharat Code Guru</p>
        </div>
      </aside>
    </>
  );
}
