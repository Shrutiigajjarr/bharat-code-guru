import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { mockProblems, Problem } from '@/data/mockData';
import { ProblemCard } from '@/components/ProblemCard';
import { FiSearch, FiPlay, FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function PracticeProblems() {
  const { t } = useApp();
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedProblem, setSelectedProblem] = useState<Problem>(mockProblems[0]);
  const [code, setCode] = useState(`function solution(input) {\n  // Write your code here\n  \n  return result;\n}`);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const filtered = useMemo(() => {
    return mockProblems.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      const matchDiff = diffFilter === 'All' || p.difficulty === diffFilter;
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchSearch && matchDiff && matchStatus;
    });
  }, [search, diffFilter, statusFilter]);

  const handleSelectProblem = (problem: Problem) => {
    setSelectedProblem(problem);
    setCode(`function solution(input) {\n  // Write your code here\n  \n  return result;\n}`);
    setOutput('');
    setSuccess(false);
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
        ? `✅ All test cases passed!\n\nInput: ${selectedProblem.sampleInput}\nExpected: ${selectedProblem.sampleOutput}\nYour Output: ${selectedProblem.sampleOutput}\n\nRuntime: 4ms | Memory: 42.1 MB`
        : `❌ Wrong Answer\n\nInput: ${selectedProblem.sampleInput}\nExpected: ${selectedProblem.sampleOutput}\nYour Output: undefined\n\nHint: Check your return statement.`
      );
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-0 animate-fade-in overflow-hidden rounded-xl border border-border">
      {/* Problem List Sidebar */}
      <div className={`bg-card border-r border-border flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-80 min-w-[280px]'}`}>
        <div className="p-3 border-b border-border space-y-2">
          <h2 className="text-sm font-bold text-foreground">{t('Problems', 'समस्याएं')}</h2>
          <div className="relative">
            <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('Search...', 'खोजें...')}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 text-xs"
            />
          </div>
          <div className="flex gap-1.5">
            <select value={diffFilter} onChange={e => setDiffFilter(e.target.value)} className="flex-1 px-2 py-1 rounded-lg bg-background border border-border text-foreground text-xs">
              <option value="All">{t('All', 'सभी')}</option>
              <option value="Easy">{t('Easy', 'आसान')}</option>
              <option value="Medium">{t('Medium', 'मध्यम')}</option>
              <option value="Hard">{t('Hard', 'कठिन')}</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="flex-1 px-2 py-1 rounded-lg bg-background border border-border text-foreground text-xs">
              <option value="All">{t('All', 'सभी')}</option>
              <option value="solved">{t('Solved', 'हल')}</option>
              <option value="attempted">{t('Attempted', 'प्रयास')}</option>
              <option value="unsolved">{t('Unsolved', 'अनसुलझा')}</option>
            </select>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.map(p => (
            <div
              key={p.id}
              onClick={() => handleSelectProblem(p)}
              className={`p-2.5 rounded-lg cursor-pointer transition-all text-xs ${
                selectedProblem.id === p.id
                  ? 'bg-primary/10 border border-primary/30'
                  : 'hover:bg-muted/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  p.status === 'solved' ? 'bg-success' : p.status === 'attempted' ? 'bg-warning' : 'bg-muted-foreground/30'
                }`} />
                <span className="font-medium text-foreground truncate flex-1">{t(p.title, p.titleHi)}</span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                  p.difficulty === 'Easy' ? 'bg-success/10 text-success'
                  : p.difficulty === 'Medium' ? 'bg-warning/10 text-warning'
                  : 'bg-destructive/10 text-destructive'
                }`}>{p.difficulty}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-xs">{t('No problems found', 'कोई समस्या नहीं मिली')}</div>
          )}
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="self-center -ml-px z-10 bg-card border border-border rounded-r-md px-0.5 py-3 hover:bg-muted transition-colors"
      >
        {sidebarCollapsed ? <FiChevronRight className="w-3.5 h-3.5 text-muted-foreground" /> : <FiChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />}
      </button>

      {/* Main Content: Problem + Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 grid lg:grid-cols-2 gap-0 min-h-0">
          {/* Problem Statement */}
          <div className="border-r border-border p-5 overflow-y-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                selectedProblem.difficulty === 'Easy' ? 'bg-success/10 text-success'
                : selectedProblem.difficulty === 'Medium' ? 'bg-warning/10 text-warning'
                : 'bg-destructive/10 text-destructive'
              }`}>{selectedProblem.difficulty}</span>
              {selectedProblem.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
              ))}
              <span className="text-xs text-muted-foreground ml-auto">{selectedProblem.acceptance}% {t('acceptance', 'स्वीकृति')}</span>
            </div>
            <h2 className="text-lg font-bold text-foreground mb-3">{t(selectedProblem.title, selectedProblem.titleHi)}</h2>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{t(selectedProblem.description, selectedProblem.descriptionHi)}</p>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-2">
              <p className="text-foreground"><strong>{t('Input:', 'इनपुट:')}</strong> {selectedProblem.sampleInput}</p>
              <p className="text-foreground"><strong>{t('Output:', 'आउटपुट:')}</strong> {selectedProblem.sampleOutput}</p>
            </div>
          </div>

          {/* Code Editor + Console */}
          <div className="flex flex-col min-h-0">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
              <span className="text-xs font-medium text-muted-foreground">JavaScript</span>
              <button
                onClick={handleRun}
                disabled={running}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium text-xs text-primary-foreground gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {running ? <span className="animate-spin">⏳</span> : <FiPlay className="w-3.5 h-3.5" />}
                {running ? t('Running...', 'चल रहा है...') : t('Run Code', 'कोड चलाएं')}
              </button>
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              className="flex-1 p-4 bg-foreground/5 font-mono text-sm text-foreground resize-none focus:outline-none min-h-[200px]"
              spellCheck={false}
            />
            <div className={`border-t border-border p-3 h-36 overflow-y-auto font-mono text-xs ${success ? 'border-t-success/50' : output && !success ? 'border-t-destructive/50' : ''}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{t('Console', 'कंसोल')}</span>
                {success && <FiCheckCircle className="text-success w-3.5 h-3.5" />}
              </div>
              {output ? (
                <pre className={`whitespace-pre-wrap text-xs ${success ? 'text-success' : 'text-destructive'}`}>{output}</pre>
              ) : (
                <p className="text-muted-foreground">{t('Click "Run Code" to see output', '"कोड चलाएं" पर क्लिक करें')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
