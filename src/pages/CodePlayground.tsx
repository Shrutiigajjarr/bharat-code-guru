import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { mockProblems } from '@/data/mockData';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiPlay, FiCheckCircle, FiSkipForward, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function CodePlayground() {
  const { t } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const problemId = searchParams.get('problem') || mockProblems[0]?.id || 'p1';
  const currentIndex = mockProblems.findIndex(p => p.id === problemId);
  const problem = mockProblems[currentIndex >= 0 ? currentIndex : 0];

  const defaultCode = `function solution(input) {\n  // Write your code here\n  \n  return result;\n}`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitResult, setSubmitResult] = useState<'correct' | 'incorrect' | null>(null);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const goToProblem = (index: number) => {
    if (index < 0 || index >= mockProblems.length) return;
    navigate(`/playground?problem=${mockProblems[index].id}`);
    setCode(defaultCode);
    setOutput('');
    setSuccess(false);
    setSubmitResult(null);
    setSubmitError('');
  };

  const handleSkip = () => {
    const next = (currentIndex >= 0 ? currentIndex : 0) + 1;
    if (next < mockProblems.length) {
      goToProblem(next);
    }
  };

  const handleSubmit = () => {
    const trimmed = code.trim();
    if (!trimmed || trimmed === defaultCode.trim()) {
      setSubmitError(t('Please write your solution before submitting.', 'कृपया सबमिट करने से पहले अपना समाधान लिखें।'));
      setSubmitResult(null);
      return;
    }
    setSubmitError('');
    setSubmitting(true);
    setSubmitResult(null);

    setTimeout(() => {
      const isCorrect = Math.random() > 0.4;
      setSubmitResult(isCorrect ? 'correct' : 'incorrect');
      setSubmitting(false);
    }, 1500);
  };

  const handleRun = () => {
    setRunning(true);
    setOutput('');
    setSuccess(false);
    setTimeout(() => {
      setRunning(false);
      const isSuccess = Math.random() > 0.3;
      setSuccess(isSuccess);
      setOutput(isSuccess
        ? `✅ All test cases passed!\n\nInput: ${problem.sampleInput}\nExpected: ${problem.sampleOutput}\nYour Output: ${problem.sampleOutput}\n\nRuntime: 4ms | Memory: 42.1 MB`
        : `❌ Wrong Answer\n\nInput: ${problem.sampleInput}\nExpected: ${problem.sampleOutput}\nYour Output: undefined\n\nHint: Check your return statement.`
      );
    }, 1500);
  };

  const idx = currentIndex >= 0 ? currentIndex : 0;

  return (
    <div className="space-y-4 animate-fade-in h-full">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{t('Code Playground', 'कोड प्लेग्राउंड')}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToProblem(idx - 1)}
            disabled={idx <= 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiChevronLeft className="w-4 h-4" />
            {t('Previous', 'पिछला')}
          </button>
          <span className="text-sm text-muted-foreground px-2">
            {idx + 1} / {mockProblems.length}
          </span>
          <button
            onClick={() => goToProblem(idx + 1)}
            disabled={idx >= mockProblems.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t('Next', 'अगला')}
            <FiChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleSkip}
            disabled={idx >= mockProblems.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiSkipForward className="w-4 h-4" />
            {t('Skip', 'छोड़ें')}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 h-[calc(100vh-260px)]">
        {/* Problem Statement */}
        <div className="glass-panel-elevated p-6 overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              problem.difficulty === 'Easy' ? 'bg-success/10 text-success'
              : problem.difficulty === 'Medium' ? 'bg-warning/10 text-warning'
              : 'bg-destructive/10 text-destructive'
            }`}>{problem.difficulty}</span>
            {problem.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
            ))}
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3">{t(problem.title, problem.titleHi)}</h2>
          <p className="text-muted-foreground text-sm mb-4">{t(problem.description, problem.descriptionHi)}</p>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-2">
            <p className="text-foreground"><strong>{t('Input:', 'इनपुट:')}</strong> {problem.sampleInput}</p>
            <p className="text-foreground"><strong>{t('Output:', 'आउटपुट:')}</strong> {problem.sampleOutput}</p>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex flex-col gap-4">
          <div className="glass-panel-elevated flex-1 flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <span className="text-sm font-medium text-muted-foreground">JavaScript</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRun}
                  disabled={running}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-lg font-medium text-sm text-primary-foreground gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {running ? <span className="animate-spin">⏳</span> : <FiPlay className="w-4 h-4" />}
                  {running ? t('Running...', 'चल रहा है...') : t('Run Code', 'कोड चलाएं')}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-medium text-sm transition-opacity disabled:opacity-50 ${
                    submitResult === 'correct'
                      ? 'bg-success text-success-foreground'
                      : submitResult === 'incorrect'
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-accent text-accent-foreground hover:opacity-90'
                  }`}
                >
                  <FiCheckCircle className="w-4 h-4" />
                  {submitting
                    ? t('Checking...', 'जाँच रहा है...')
                    : submitResult === 'correct'
                    ? t('Correct!', 'सही!')
                    : submitResult === 'incorrect'
                    ? t('Incorrect', 'गलत')
                    : t('Submit', 'सबमिट करें')}
                </button>
              </div>
            </div>
            {submitError && (
              <div className="px-4 py-2 text-sm text-destructive bg-destructive/10 border-b border-border">
                {submitError}
              </div>
            )}
            {submitResult && (
              <div className={`px-4 py-2 text-sm border-b border-border ${
                submitResult === 'correct'
                  ? 'text-success bg-success/10'
                  : 'text-destructive bg-destructive/10'
              }`}>
                {submitResult === 'correct'
                  ? t('🎉 Your solution is correct! Move to the next problem.', '🎉 आपका समाधान सही है! अगली समस्या पर जाएं।')
                  : t('❌ Your solution is incorrect. Please try again.', '❌ आपका समाधान गलत है। कृपया पुनः प्रयास करें।')}
              </div>
            )}
            <textarea
              value={code}
              onChange={e => { setCode(e.target.value); setSubmitResult(null); setSubmitError(''); }}
              className="flex-1 p-4 bg-foreground/5 font-mono text-sm text-foreground resize-none focus:outline-none"
              spellCheck={false}
            />
          </div>

          {/* Console Output */}
          <div className={`glass-panel p-4 h-40 overflow-y-auto font-mono text-sm ${success ? 'border-success/30' : output && !success ? 'border-destructive/30' : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-muted-foreground">{t('Console', 'कंसोल')}</span>
              {success && <FiCheckCircle className="text-success w-4 h-4" />}
            </div>
            {output ? (
              <pre className={`whitespace-pre-wrap ${success ? 'text-success' : 'text-destructive'}`}>{output}</pre>
            ) : (
              <p className="text-muted-foreground">{t('Click "Run Code" to see output', '"कोड चलाएं" पर क्लिक करें')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
