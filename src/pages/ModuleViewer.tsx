import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { FiArrowLeft, FiArrowRight, FiRefreshCw, FiCheckCircle, FiPlay } from 'react-icons/fi';

export default function ModuleViewer() {
  const { trackId, moduleId } = useParams();
  const navigate = useNavigate();
  const { t, tracks, completeModule } = useApp();
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const track = tracks.find(tr => tr.id === trackId);
  const moduleIndex = track?.modules.findIndex(m => m.id === moduleId) ?? -1;
  const currentModule = track?.modules[moduleIndex];
  const prevModule = track?.modules[moduleIndex - 1];
  const nextModule = track?.modules[moduleIndex + 1];

  if (!track || !currentModule) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <p className="text-muted-foreground">{t('Module not found', 'मॉड्यूल नहीं मिला')}</p>
        <Button variant="outline" onClick={() => navigate('/learning-paths')}>
          ← {t('Back to Learning Paths', 'सीखने के रास्तों पर वापस')}
        </Button>
      </div>
    );
  }

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setVideoCompleted(true);
      setIsPlaying(false);
      completeModule(trackId!, moduleId!);
    }, 5000);
  };

  const goToModule = (modId: string) => {
    setVideoCompleted(false);
    setIsPlaying(false);
    navigate(`/learning-paths/${trackId}/module/${modId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/learning-paths')}>
          <FiArrowLeft className="mr-1" /> {t('Back', 'वापस')}
        </Button>
        <div className="h-4 w-px bg-border" />
        <span className="text-sm text-muted-foreground">{t(track.title, track.titleHi)}</span>
      </div>

      {/* Module Title */}
      <div className="glass-panel-elevated p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{track.icon}</span>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {t(`Module ${moduleIndex + 1} of ${track.modules.length}`, `मॉड्यूल ${moduleIndex + 1} / ${track.modules.length}`)}
            </p>
            <h1 className="text-xl font-bold text-foreground">
              {t(currentModule.title, currentModule.titleHi)}
            </h1>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {t(`Duration: ${currentModule.duration}`, `अवधि: ${currentModule.duration}`)}
        </p>
      </div>

      {/* Video Player Area */}
      <div className="glass-panel-elevated overflow-hidden">
        <div className="relative aspect-video bg-muted/50 flex items-center justify-center">
          {!isPlaying && !videoCompleted && (
            <button onClick={handlePlay} className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center group-hover:bg-primary/20 transition-all group-hover:scale-110">
                <FiPlay className="text-primary text-3xl ml-1" />
              </div>
              <span className="text-foreground font-medium">{t('Start Lesson', 'पाठ शुरू करें')}</span>
            </button>
          )}
          
          {isPlaying && !videoCompleted && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-foreground font-medium animate-pulse">{t('Video is playing...', 'वीडियो चल रहा है...')}</p>
              <p className="text-xs text-muted-foreground">{t('(Demo: completes in 5 seconds)', '(डेमो: 5 सेकंड में पूरा होगा)')}</p>
            </div>
          )}

          {videoCompleted && (
            <div className="flex flex-col items-center gap-3">
              <FiCheckCircle className="text-5xl text-success" />
              <p className="text-foreground font-bold text-lg">{t('Lesson Completed!', 'पाठ पूरा हुआ!')}</p>
              <p className="text-sm text-muted-foreground">{t('Choose what to do next', 'आगे क्या करना है चुनें')}</p>
            </div>
          )}
        </div>

        <div className="h-1 bg-muted">
          <div className="h-full bg-primary transition-all duration-[5000ms] ease-linear" style={{ width: videoCompleted ? '100%' : isPlaying ? '100%' : '0%' }} />
        </div>
      </div>

      {/* Post-video Actions */}
      {videoCompleted && (
        <div className="glass-panel-elevated p-6 animate-fade-in space-y-4">
          <h3 className="font-semibold text-foreground">{t('What would you like to do?', 'आप क्या करना चाहेंगे?')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Button variant="outline" className="flex flex-col h-auto py-4 gap-2" onClick={() => { setVideoCompleted(false); setIsPlaying(false); }}>
              <FiRefreshCw className="text-lg" />
              <span className="text-xs">{t('Revise', 'दोहराएं')}</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-4 gap-2" onClick={() => navigate(`/learning-paths/${trackId}/module/${moduleId}/quiz`)}>
              <span className="text-lg">📝</span>
              <span className="text-xs">{t('Take Quiz', 'क्विज़ दें')}</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
              <span className="text-lg">📊</span>
              <span className="text-xs">{t('Show Diagram', 'चित्र दिखाएं')}</span>
            </Button>
          </div>

          <div className="flex justify-between pt-4 border-t border-border">
            <Button variant="ghost" disabled={!prevModule} onClick={() => prevModule && goToModule(prevModule.id)}>
              <FiArrowLeft className="mr-2" /> {t('Previous', 'पिछला')}
            </Button>
            <Button disabled={!nextModule} onClick={() => nextModule && goToModule(nextModule.id)}>
              {t('Next', 'अगला')} <FiArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Module List */}
      <div className="glass-panel-elevated p-4">
        <h3 className="font-semibold text-foreground mb-3 text-sm">{t('All Modules', 'सभी मॉड्यूल')}</h3>
        <div className="space-y-1">
          {track.modules.map((mod, i) => (
            <button key={mod.id} onClick={() => goToModule(mod.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-3 transition-colors ${mod.id === moduleId ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}>
              <span className="text-xs w-5 text-center">{i + 1}</span>
              <span className="flex-1">{t(mod.title, mod.titleHi)}</span>
              {mod.completed && <FiCheckCircle className="text-success text-xs" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
