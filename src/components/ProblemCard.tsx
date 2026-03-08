import { useApp } from '@/context/AppContext';
import { Problem } from '@/data/mockData';
import { FiCheckCircle, FiClock, FiCircle } from 'react-icons/fi';

interface ProblemCardProps {
  problem: Problem;
  onClick?: () => void;
}

export function ProblemCard({ problem, onClick }: ProblemCardProps) {
  const { t } = useApp();
  const diffColors = {
    Easy: 'bg-success/10 text-success',
    Medium: 'bg-warning/10 text-warning',
    Hard: 'bg-destructive/10 text-destructive',
  };
  const statusIcons = {
    solved: <FiCheckCircle className="text-success" />,
    attempted: <FiClock className="text-warning" />,
    unsolved: <FiCircle className="text-muted-foreground" />,
  };

  return (
    <div onClick={onClick} className="glass-panel p-4 hover-lift cursor-pointer flex items-center gap-4 animate-fade-in">
      <div className="text-lg">{statusIcons[problem.status]}</div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground truncate">{t(problem.title, problem.titleHi)}</h4>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${diffColors[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
          {problem.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
          ))}
        </div>
      </div>
      <div className="text-xs text-muted-foreground text-right">
        <span>{problem.acceptance}%</span>
      </div>
    </div>
  );
}
