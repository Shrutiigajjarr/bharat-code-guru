import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { mockProblems } from '@/data/mockData';
import { useSearchParams } from 'react-router-dom';
import { FiPlay, FiCheckCircle } from 'react-icons/fi';

export default function CodePlayground() {
  const { t } = useApp();
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get('problem') || 'p1';
  const problem = mockProblems.find(p => p.id === problemId) || mockProblems[0];

  const [code, setCode] = useState(`function solution(input) {\n  // Write your code here\n  \n  return result;\n}`);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [success, setSuccess] = useState(false);

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

  return (
    <div className="space-y-4 animate-fade-in h-full">
      <h1 className="text-2xl font-bold text-foreground">{t('Code Playground', 'कोड प्लेग्राउंड')}</h1>
      <div className="grid lg:grid-cols-2 gap-4 h-[calc(100vh-220px)]">
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
              <button
                onClick={handleRun}
                disabled={running}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg font-medium text-sm text-primary-foreground gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {running ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <FiPlay className="w-4 h-4" />
                )}
                {running ? t('Running...', 'चल रहा है...') : t('Run Code', 'कोड चलाएं')}
              </button>
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
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

      {/* Code Explainer Section */}
      <div className="glass-panel-elevated p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FiFileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">{t('Code Explainer', 'कोड व्याख्याता')}</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{t('Explanation Language:', 'व्याख्या भाषा:')}</span>
            <button
              onClick={() => setExplainLang(explainLang === 'en' ? 'hi' : 'en')}
              className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {explainLang === 'en' ? 'English → हिंदी' : 'हिंदी → English'}
            </button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {t('Paste any code below and click "Explain Code" to get a line-by-line explanation.', 'नीचे कोई भी कोड पेस्ट करें और लाइन-दर-लाइन व्याख्या प्राप्त करने के लिए "कोड समझाएं" पर क्लिक करें।')}
        </p>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <textarea
              value={explainCode}
              onChange={e => setExplainCode(e.target.value)}
              placeholder={t('Paste your code here...', 'अपना कोड यहाँ पेस्ट करें...')}
              className="w-full h-64 p-4 bg-foreground/5 border border-border rounded-lg font-mono text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              spellCheck={false}
            />
            <button
              onClick={handleExplain}
              disabled={explaining || !explainCode.trim()}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-primary-foreground gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {explaining ? (
                <FiLoader className="w-4 h-4 animate-spin" />
              ) : (
                <FiFileText className="w-4 h-4" />
              )}
              {explaining ? t('Analyzing...', 'विश्लेषण हो रहा है...') : t('Explain Code', 'कोड समझाएं')}
            </button>
          </div>

          <div className="h-64 overflow-y-auto border border-border rounded-lg bg-foreground/5">
            {explanationLines.length > 0 ? (
              <div className="divide-y divide-border">
                {explanationLines.map((item, i) => (
                  <div key={i} className="p-3 hover:bg-muted/50 transition-colors">
                    <code className="text-xs font-mono text-primary block mb-1 whitespace-pre-wrap">
                      <span className="text-muted-foreground mr-2 select-none">{i + 1}.</span>
                      {item.line || ' '}
                    </code>
                    <p className="text-sm text-foreground pl-5">
                      → {explainLang === 'en' ? item.en : item.hi}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                {t('Explanation will appear here', 'व्याख्या यहाँ दिखाई देगी')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
