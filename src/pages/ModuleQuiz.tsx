import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { getQuizForModule } from '@/data/quizData';
import { Button } from '@/components/ui/button';
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function ModuleQuiz() {
  const { trackId, moduleId } = useParams();
  const navigate = useNavigate();
  const { t, tracks, addPoints } = useApp();

  const track = tracks.find(tr => tr.id === trackId);
  const currentModule = track?.modules.find(m => m.id === moduleId);
  const questions = getQuizForModule(currentModule?.title || '');

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  if (!track || !currentModule) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <p className="text-muted-foreground">{t('Quiz not found', 'क्विज़ नहीं मिला')}</p>
        <Button variant="outline" onClick={() => navigate('/learning-paths')}>
          ← {t('Back to Learning Paths', 'सीखने के रास्तों पर वापस')}
        </Button>
      </div>
    );
  }

  const question = questions[currentQ];
  const score = selectedAnswers.reduce((acc, ans, i) => ans === questions[i].correctIndex ? acc + 1 : acc, 0);
  const pointsEarned = score * 10;

  const handleSelect = (optionIndex: number) => {
    if (answered) return;
    const updated = [...selectedAnswers];
    updated[currentQ] = optionIndex;
    setSelectedAnswers(updated);
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setAnswered(false);
    } else {
      addPoints(pointsEarned);
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setAnswered(selectedAnswers[currentQ - 1] !== null);
    }
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(`/learning-paths/${trackId}/module/${moduleId}`)}>
            <FiArrowLeft className="mr-1" /> {t('Back to Module', 'मॉड्यूल पर वापस')}
          </Button>
        </div>

        <div className="glass-panel-elevated p-8 text-center space-y-6">
          <div className={`text-6xl ${percentage >= 70 ? '' : ''}`}>
            {percentage >= 70 ? '🎉' : '📚'}
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {t('Quiz Completed!', 'क्विज़ पूरा हुआ!')}
          </h1>
          <p className="text-muted-foreground">
            {t(currentModule.title, currentModule.titleHi)}
          </p>

          {/* Score Circle */}
          <div className="flex justify-center">
            <div className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center ${
              percentage >= 70 ? 'border-success bg-success/10' : 'border-warning bg-warning/10'
            }`}>
              <span className={`text-3xl font-bold ${percentage >= 70 ? 'text-success' : 'text-warning'}`}>
                {score}/{questions.length}
              </span>
              <span className="text-xs text-muted-foreground">{percentage}%</span>
            </div>
          </div>

          {/* Points Earned */}
          <div className="glass-panel p-4 inline-block">
            <p className="text-sm text-muted-foreground">{t('Points Earned', 'अर्जित अंक')}</p>
            <p className="text-2xl font-bold text-primary">+{pointsEarned} ⭐</p>
          </div>

          {/* Review answers */}
          <div className="text-left space-y-3 max-w-lg mx-auto">
            <h3 className="font-semibold text-foreground text-sm">{t('Review', 'समीक्षा')}</h3>
            {questions.map((q, i) => (
              <div key={i} className={`p-3 rounded-lg border text-sm ${
                selectedAnswers[i] === q.correctIndex ? 'border-success/30 bg-success/5' : 'border-destructive/30 bg-destructive/5'
              }`}>
                <div className="flex items-start gap-2">
                  {selectedAnswers[i] === q.correctIndex
                    ? <FiCheckCircle className="text-success mt-0.5 shrink-0" />
                    : <FiXCircle className="text-destructive mt-0.5 shrink-0" />
                  }
                  <div>
                    <p className="font-medium text-foreground">{t(q.question, q.questionHi)}</p>
                    {selectedAnswers[i] !== q.correctIndex && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {t('Correct:', 'सही:')} {t(q.options[q.correctIndex], q.optionsHi[q.correctIndex])}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center pt-4">
            <Button variant="outline" onClick={() => {
              setCurrentQ(0);
              setSelectedAnswers(new Array(questions.length).fill(null));
              setAnswered(false);
              setShowResult(false);
            }}>
              {t('Retake Quiz', 'क्विज़ फिर से दें')}
            </Button>
            <Button onClick={() => navigate(`/learning-paths/${trackId}/module/${moduleId}`)}>
              {t('Back to Module', 'मॉड्यूल पर वापस')} →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/learning-paths/${trackId}/module/${moduleId}`)}>
          <FiArrowLeft className="mr-1" /> {t('Back to Module', 'मॉड्यूल पर वापस')}
        </Button>
        <div className="h-4 w-px bg-border" />
        <span className="text-sm text-muted-foreground">{t(currentModule.title, currentModule.titleHi)}</span>
      </div>

      {/* Progress */}
      <div className="glass-panel-elevated p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            {t(`Question ${currentQ + 1} of ${questions.length}`, `प्रश्न ${currentQ + 1} / ${questions.length}`)}
          </span>
          <span className="text-xs text-muted-foreground">
            📝 {t('Quiz', 'क्विज़')}
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="glass-panel-elevated p-6 space-y-6">
        <h2 className="text-lg font-semibold text-foreground">
          {t(question.question, question.questionHi)}
        </h2>

        <div className="space-y-3">
          {question.options.map((opt, i) => {
            const isSelected = selectedAnswers[currentQ] === i;
            const isCorrect = i === question.correctIndex;
            let borderClass = 'border-border hover:border-primary/50';
            if (answered) {
              if (isCorrect) borderClass = 'border-success bg-success/10';
              else if (isSelected && !isCorrect) borderClass = 'border-destructive bg-destructive/10';
            } else if (isSelected) {
              borderClass = 'border-primary bg-primary/10';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${borderClass} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0 ${
                  answered && isCorrect ? 'border-success text-success' :
                  answered && isSelected && !isCorrect ? 'border-destructive text-destructive' :
                  isSelected ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className={`font-medium ${
                  answered && isCorrect ? 'text-success' :
                  answered && isSelected && !isCorrect ? 'text-destructive' : 'text-foreground'
                }`}>
                  {t(opt, question.optionsHi[i])}
                </span>
                {answered && isCorrect && <FiCheckCircle className="ml-auto text-success" />}
                {answered && isSelected && !isCorrect && <FiXCircle className="ml-auto text-destructive" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="ghost" disabled={currentQ === 0} onClick={handlePrev}>
          <FiArrowLeft className="mr-2" /> {t('Previous', 'पिछला')}
        </Button>
        <Button disabled={!answered} onClick={handleNext}>
          {currentQ < questions.length - 1 
            ? t('Next', 'अगला') 
            : t('Finish Quiz', 'क्विज़ समाप्त करें')
          }
          <FiArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
