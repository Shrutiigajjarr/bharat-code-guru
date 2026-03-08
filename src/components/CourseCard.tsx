import { useApp } from '@/context/AppContext';
import { LearningTrack } from '@/data/mockData';

interface CourseCardProps {
  track: LearningTrack;
  onClick?: () => void;
}

export function CourseCard({ track, onClick }: CourseCardProps) {
  const { t } = useApp();
  const completedModules = track.modules.filter(m => m.completed).length;

  return (
    <div onClick={onClick} className="glass-panel-elevated p-6 hover-lift cursor-pointer group animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{track.icon}</span>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
          {track.totalStudents.toLocaleString()} {t('students', 'छात्र')}
        </span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
        {t(track.title, track.titleHi)}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {t(track.description, track.descriptionHi)}
      </p>
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">{completedModules}/{track.modules.length} {t('modules', 'मॉड्यूल')}</span>
          <span className="font-semibold text-primary">{track.progress}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="progress-bar-animated h-full" style={{ width: `${track.progress}%` }} />
        </div>
      </div>
    </div>
  );
}
