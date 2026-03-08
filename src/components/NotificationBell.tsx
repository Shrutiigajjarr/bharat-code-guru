import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { FiBell } from 'react-icons/fi';

export function NotificationBell() {
  const { notifications, unreadCount, markNotificationRead, t } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 rounded-lg hover:bg-muted transition-colors">
        <FiBell className="w-5 h-5 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-pulse-glow">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-80 glass-panel-elevated p-4 z-50 max-h-80 overflow-y-auto animate-fade-in">
          <h4 className="font-bold text-foreground mb-3">{t('Notifications', 'सूचनाएं')}</h4>
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('No notifications', 'कोई सूचना नहीं')}</p>
          ) : (
            <div className="space-y-2">
              {notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors text-sm ${n.read ? 'bg-muted/50' : 'bg-accent'}`}
                >
                  <p className={n.read ? 'text-muted-foreground' : 'text-foreground font-medium'}>
                    {t(n.message, n.messageHi)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{n.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
