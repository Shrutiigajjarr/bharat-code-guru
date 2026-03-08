import { useApp } from '@/context/AppContext';
import { NotificationBell } from './NotificationBell';
import { FiLogOut, FiMenu, FiRefreshCw } from 'react-icons/fi';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const { currentUser, language, setLanguage, logout, resetDemoData, t } = useApp();

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-40 flex items-center px-4 md:px-6">
      <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-muted transition-colors mr-3 lg:hidden">
        <FiMenu className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-2">
        <span className="text-2xl">🇮🇳</span>
        <h1 className="text-lg font-bold gradient-text hidden sm:block">Bharat Code Guru</h1>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
        >
          {language === 'en' ? 'हिंदी' : 'English'}
        </button>
        <NotificationBell />
        <button onClick={resetDemoData} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Reset Demo">
          <FiRefreshCw className="w-4 h-4 text-muted-foreground" />
        </button>
        {currentUser && (
          <div className="flex items-center gap-2 ml-2">
            <span className="text-xl">{currentUser.avatar}</span>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-foreground leading-tight">
                {t(currentUser.name, currentUser.nameHi)}
              </p>
              <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
            </div>
            <button onClick={logout} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors" title="Logout">
              <FiLogOut className="w-4 h-4 text-destructive" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
