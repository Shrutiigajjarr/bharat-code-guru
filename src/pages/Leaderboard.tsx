import { useApp } from '@/context/AppContext';
import { mockStudents } from '@/data/mockData';
import { LeaderboardCard } from '@/components/LeaderboardCard';

export default function Leaderboard() {
  const { t } = useApp();
  const sorted = [...mockStudents].sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">{t('Leaderboard', 'लीडरबोर्ड')}</h1>
      <div className="glass-panel-elevated p-6">
        <div className="flex items-end justify-center gap-4 mb-8">
          {[sorted[1], sorted[0], sorted[2]].map((u, i) => {
            const heights = ['h-24', 'h-32', 'h-20'];
            const ranks = [2, 1, 3];
            return (
              <div key={u.id} className="text-center">
                <span className="text-3xl block mb-2">{u.avatar}</span>
                <p className="text-sm font-bold text-foreground">{u.name.split(' ')[0]}</p>
                <p className="text-xs text-primary font-semibold">{u.points} pts</p>
                <div className={`${heights[i]} w-20 mt-2 rounded-t-xl ${ranks[i] === 1 ? 'gradient-primary' : ranks[i] === 2 ? 'gradient-secondary' : 'bg-muted'} flex items-end justify-center pb-2`}>
                  <span className={`text-lg font-bold ${ranks[i] <= 2 ? 'text-primary-foreground' : 'text-muted-foreground'}`}>#{ranks[i]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="space-y-2">
        {sorted.map((u, i) => (
          <LeaderboardCard key={u.id} user={u} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}
