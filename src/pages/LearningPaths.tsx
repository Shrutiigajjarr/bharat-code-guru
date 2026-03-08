import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { CourseCard } from '@/components/CourseCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';

export default function LearningPaths() {
  const { t, tracks } = useApp();
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const track = tracks.find(tr => tr.id === selectedTrack);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">{t('Learning Paths', 'सीखने के रास्ते')}</h1>

      {!selectedTrack ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {tracks.map(track => (
            <CourseCard key={track.id} track={track} onClick={() => setSelectedTrack(track.id)} />
          ))}
        </div>
      ) : track ? (
        <div>
          <button onClick={() => setSelectedTrack(null)} className="text-sm text-primary hover:underline mb-4">
            ← {t('Back to tracks', 'ट्रैक पर वापस')}
          </button>
          <div className="glass-panel-elevated p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{track.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-foreground">{t(track.title, track.titleHi)}</h2>
                <p className="text-muted-foreground text-sm">{t(track.description, track.descriptionHi)}</p>
              </div>
            </div>
            <Button size="lg" className="mt-2" onClick={() => {
              const firstIncomplete = track.modules.find(m => !m.completed) || track.modules[0];
              navigate(`/learning-paths/${track.id}/module/${firstIncomplete.id}`);
            }}>
              {t('Continue Learning', 'सीखना जारी रखें')} →
            </Button>
            <ProgressBar value={track.progress} label={t('Overall Progress', 'समग्र प्रगति')} size="lg" />
            <div className="mt-6 space-y-3">
              {track.modules.map((mod, i) => (
                <div key={mod.id} onClick={() => navigate(`/learning-paths/${track.id}/module/${mod.id}`)} className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${mod.completed ? 'border-success/30 bg-success/5' : 'border-border hover:border-primary/30'}`}>
                  <div className="text-lg">
                    {mod.completed ? <FiCheckCircle className="text-success" /> : <FiCircle className="text-muted-foreground" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${mod.completed ? 'text-success' : 'text-foreground'}`}>
                      {t(`Module ${i + 1}: ${mod.title}`, `मॉड्यूल ${i + 1}: ${mod.titleHi}`)}
                    </p>
                    <p className="text-xs text-muted-foreground">{mod.duration}</p>
                  </div>
                  {mod.completed && <span className="text-xs font-medium px-2 py-1 rounded-full bg-success/10 text-success">{t('Completed', 'पूर्ण')}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
