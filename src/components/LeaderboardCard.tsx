import { User } from '@/data/mockData';

interface LeaderboardCardProps {
  user: User;
  rank: number;
}

export function LeaderboardCard({ user, rank }: LeaderboardCardProps) {
  const medals = ['🥇', '🥈', '🥉'];
  return (
    <div className={`glass-panel p-4 flex items-center gap-4 animate-fade-in ${rank <= 3 ? 'border-primary/20' : ''}`}>
      <div className="text-2xl font-bold w-8 text-center">
        {rank <= 3 ? medals[rank - 1] : <span className="text-muted-foreground">{rank}</span>}
      </div>
      <div className="text-2xl">{user.avatar}</div>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">{user.name}</h4>
        <p className="text-xs text-muted-foreground">{user.problemsSolved} problems • {user.streak} day streak</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-primary">{user.points}</p>
        <p className="text-xs text-muted-foreground">points</p>
      </div>
    </div>
  );
}
