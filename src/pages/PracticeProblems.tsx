import { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { practiceTopics, PracticeTopic, PracticeQuestion } from '@/data/practiceTopics';
import { FiClock, FiDownload, FiArrowLeft, FiCheckCircle, FiXCircle, FiPlay } from 'react-icons/fi';

type ExamState = 'topics' | 'exam' | 'result';

export default function PracticeProblems() {
  const { t } = useApp();
  const [examState, setExamState] = useState<ExamState>('topics');
  const [selectedTopic, setSelectedTopic] = useState<PracticeTopic | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startExam = (topic: PracticeTopic) => {
    setSelectedTopic(topic);
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(topic.duration * 60);
    setExamState('exam');
  };

  useEffect(() => {
    if (examState === 'exam' && timeLeft > 0 && !submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setSubmitted(true);
            setExamState('result');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [examState, submitted]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (qId: string, optIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitted(true);
    setExamState('result');
  };

  const getScore = () => {
    if (!selectedTopic) return { correct: 0, total: 0, percent: 0 };
    let correct = 0;
    selectedTopic.questions.forEach(q => {
      if (answers[q.id] === q.correctIndex) correct++;
    });
    return { correct, total: selectedTopic.questions.length, percent: Math.round((correct / selectedTopic.questions.length) * 100) };
  };

  const downloadQuestionPaper = useCallback((topic: PracticeTopic) => {
    let text = `========================================\n`;
    text += `  ${topic.title} - Question Paper\n`;
    text += `  Duration: ${topic.duration} minutes (1.5 hours)\n`;
    text += `  Total Questions: ${topic.totalQuestions}\n`;
    text += `========================================\n\n`;

    topic.questions.forEach((q, i) => {
      text += `Q${i + 1}. ${q.question}\n`;
      q.options.forEach((opt, j) => {
        text += `   ${String.fromCharCode(65 + j)}) ${opt}\n`;
      });
      text += `\n`;
    });

    text += `========================================\n`;
    text += `  Answer Key\n`;
    text += `========================================\n\n`;
    topic.questions.forEach((q, i) => {
      text += `Q${i + 1}: ${String.fromCharCode(65 + q.correctIndex)}) ${q.options[q.correctIndex]}\n`;
    });

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.title.replace(/\s+/g, '_')}_Question_Paper.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  // Topic Selection View
  if (examState === 'topics') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('Practice Exams', 'अभ्यास परीक्षा')}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t('Select a topic to start a timed 1.5-hour exam. Download question papers for offline practice.', 'समयबद्ध 1.5 घंटे की परीक्षा शुरू करने के लिए विषय चुनें। ऑफ़लाइन अभ्यास के लिए प्रश्न पत्र डाउनलोड करें।')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {practiceTopics.map(topic => (
            <div key={topic.id} className="group glass-panel-elevated p-5 rounded-xl hover-lift transition-all">
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{topic.icon}</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {topic.totalQuestions} {t('Questions', 'प्रश्न')}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">{t(topic.title, topic.titleHi)}</h3>
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-4">
                <FiClock className="w-3.5 h-3.5" />
                <span>{topic.duration} {t('minutes', 'मिनट')} (1.5 {t('hours', 'घंटे')})</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startExam(topic)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs text-primary-foreground gradient-primary hover:opacity-90 transition-opacity"
                >
                  <FiPlay className="w-3.5 h-3.5" />
                  {t('Start Exam', 'परीक्षा शुरू')}
                </button>
                <button
                  onClick={() => downloadQuestionPaper(topic)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs border border-border text-foreground hover:bg-muted transition-colors"
                >
                  <FiDownload className="w-3.5 h-3.5" />
                  {t('Download', 'डाउनलोड')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Exam View
  if (examState === 'exam' && selectedTopic) {
    const timePercent = (timeLeft / (selectedTopic.duration * 60)) * 100;
    const isLow = timeLeft < 300;

    return (
      <div className="space-y-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setExamState('topics'); }} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              <FiArrowLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-foreground">{t(selectedTopic.title, selectedTopic.titleHi)}</h1>
              <p className="text-xs text-muted-foreground">{Object.keys(answers).length}/{selectedTopic.questions.length} {t('answered', 'उत्तर दिए')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${isLow ? 'border-destructive/50 bg-destructive/5' : 'border-border bg-card'}`}>
              <FiClock className={`w-4 h-4 ${isLow ? 'text-destructive animate-pulse' : 'text-muted-foreground'}`} />
              <span className={`font-mono text-lg font-bold ${isLow ? 'text-destructive' : 'text-foreground'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg font-medium text-sm text-primary-foreground gradient-primary hover:opacity-90 transition-opacity"
            >
              {t('Submit', 'जमा करें')}
            </button>
          </div>
        </div>

        {/* Timer Progress Bar */}
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${isLow ? 'bg-destructive' : 'bg-primary'}`}
            style={{ width: `${timePercent}%` }}
          />
        </div>

        {/* Questions */}
        <div className="space-y-4 pb-8">
          {selectedTopic.questions.map((q, idx) => (
            <div key={q.id} className="glass-panel p-4 rounded-xl">
              <p className="font-medium text-foreground text-sm mb-3">
                <span className="text-primary font-bold mr-2">Q{idx + 1}.</span>
                {t(q.question, q.questionHi)}
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {(t(q.question, q.questionHi) === q.questionHi ? q.optionsHi : q.options).map((opt, optIdx) => {
                  const isSelected = answers[q.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswer(q.id, optIdx)}
                      className={`text-left px-3 py-2 rounded-lg text-sm border transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-foreground font-medium'
                          : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/50'
                      }`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Result View
  if (examState === 'result' && selectedTopic) {
    const { correct, total, percent } = getScore();

    return (
      <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
        <button onClick={() => setExamState('topics')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <FiArrowLeft className="w-4 h-4" /> {t('Back to Topics', 'विषयों पर वापस')}
        </button>

        {/* Score Card */}
        <div className="glass-panel-elevated p-6 rounded-xl text-center">
          <h2 className="text-xl font-bold text-foreground mb-1">{t(selectedTopic.title, selectedTopic.titleHi)}</h2>
          <p className="text-muted-foreground text-sm mb-4">{t('Exam Results', 'परीक्षा परिणाम')}</p>
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-2xl font-bold border-4 ${
            percent >= 70 ? 'border-success text-success' : percent >= 40 ? 'border-warning text-warning' : 'border-destructive text-destructive'
          }`}>
            {percent}%
          </div>
          <p className="mt-3 text-foreground font-medium">{correct}/{total} {t('Correct', 'सही')}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {percent >= 70 ? t('Excellent! 🎉', 'उत्कृष्ट! 🎉') : percent >= 40 ? t('Good effort! Keep practicing.', 'अच्छा प्रयास! अभ्यास जारी रखें।') : t('Needs improvement. Review the topic.', 'सुधार की जरूरत। विषय की समीक्षा करें।')}
          </p>
        </div>

        {/* Detailed Answers */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-foreground">{t('Answer Review', 'उत्तर समीक्षा')}</h3>
          {selectedTopic.questions.map((q, idx) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctIndex;
            const opts = t(q.question, q.questionHi) === q.questionHi ? q.optionsHi : q.options;

            return (
              <div key={q.id} className={`glass-panel p-4 rounded-xl border-l-4 ${isCorrect ? 'border-l-success' : userAnswer !== undefined ? 'border-l-destructive' : 'border-l-muted-foreground'}`}>
                <div className="flex items-start gap-2 mb-2">
                  {isCorrect ? <FiCheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" /> : <FiXCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />}
                  <p className="text-sm font-medium text-foreground">
                    <span className="text-primary font-bold mr-1">Q{idx + 1}.</span>
                    {t(q.question, q.questionHi)}
                  </p>
                </div>
                <div className="ml-6 text-xs space-y-1">
                  {userAnswer !== undefined && !isCorrect && (
                    <p className="text-destructive">{t('Your answer:', 'आपका उत्तर:')} {String.fromCharCode(65 + userAnswer)}) {opts[userAnswer]}</p>
                  )}
                  <p className="text-success">{t('Correct:', 'सही:')} {String.fromCharCode(65 + q.correctIndex)}) {opts[q.correctIndex]}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 justify-center pb-6">
          <button onClick={() => startExam(selectedTopic)} className="px-4 py-2 rounded-lg font-medium text-sm text-primary-foreground gradient-primary hover:opacity-90 transition-opacity">
            {t('Retake Exam', 'फिर से परीक्षा दें')}
          </button>
          <button onClick={() => downloadQuestionPaper(selectedTopic)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm border border-border text-foreground hover:bg-muted transition-colors">
            <FiDownload className="w-3.5 h-3.5" /> {t('Download Paper', 'पेपर डाउनलोड')}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
