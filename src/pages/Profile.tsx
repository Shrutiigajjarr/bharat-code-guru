import { useApp } from '@/context/AppContext';
import { ProgressBar } from '@/components/ProgressBar';

export default function Profile() {
  const { currentUser, t } = useApp();
  if (!currentUser) return null;

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">{t('Profile', 'प्रोफ़ाइल')}</h1>
      <div className="glass-panel-elevated p-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-6xl">{currentUser.avatar}</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t(currentUser.name, currentUser.nameHi)}</h2>
            <p className="text-muted-foreground text-sm">{currentUser.email}</p>
            <span className="text-xs font-medium px-3 py-1 rounded-full gradient-primary text-primary-foreground capitalize mt-2 inline-block">{currentUser.role}</span>
          </div>
        </div>
        {currentUser.role === 'student' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-muted">
                <p className="text-2xl font-bold text-foreground">{currentUser.problemsSolved}</p>
                <p className="text-xs text-muted-foreground">{t('Solved', 'हल')}</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted">
                <p className="text-2xl font-bold text-foreground">{currentUser.streak}🔥</p>
                <p className="text-xs text-muted-foreground">{t('Streak', 'स्ट्रीक')}</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted">
                <p className="text-2xl font-bold text-foreground">{currentUser.points}</p>
                <p className="text-xs text-muted-foreground">{t('Points', 'अंक')}</p>
              </div>
            </div>
            <ProgressBar value={currentUser.problemsSolved} max={200} label={t('Mastery Progress', 'महारत प्रगति')} size="lg" />
          </div>
        )}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">{t('Joined:', 'शामिल हुए:')} {currentUser.joinDate}</p>
        </div>
      </div>
    </div>
  );
}
