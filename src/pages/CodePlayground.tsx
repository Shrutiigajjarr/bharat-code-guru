import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { mockProblems } from '@/data/mockData';
import { useSearchParams } from 'react-router-dom';
import { FiPlay, FiCheckCircle, FiFileText, FiLoader } from 'react-icons/fi';

type LineExplanation = { line: string; en: string; hi: string };

function generateExplanations(code: string): LineExplanation[] {
  const lines = code.split('\n');
  const explanations: Record<string, { en: string; hi: string }> = {
    'function': { en: 'Declares a function', hi: 'एक फ़ंक्शन की घोषणा करता है' },
    'const': { en: 'Declares a constant variable', hi: 'एक स्थिर चर की घोषणा करता है' },
    'let': { en: 'Declares a block-scoped variable', hi: 'एक ब्लॉक-स्कोप्ड चर की घोषणा करता है' },
    'var': { en: 'Declares a variable', hi: 'एक चर की घोषणा करता है' },
    'return': { en: 'Returns a value from the function', hi: 'फ़ंक्शन से एक मान लौटाता है' },
    'if': { en: 'Conditional check — runs code if condition is true', hi: 'सशर्त जाँच — शर्त सही होने पर कोड चलाता है' },
    'else': { en: 'Runs if the previous condition was false', hi: 'पिछली शर्त गलत होने पर चलता है' },
    'for': { en: 'Loop — repeats code a set number of times', hi: 'लूप — कोड को निर्धारित बार दोहराता है' },
    'while': { en: 'Loop — repeats while condition is true', hi: 'लूप — शर्त सही होने तक दोहराता है' },
    'console.log': { en: 'Prints output to the console', hi: 'कंसोल पर आउटपुट प्रिंट करता है' },
    'import': { en: 'Imports a module or package', hi: 'एक मॉड्यूल या पैकेज आयात करता है' },
    'export': { en: 'Exports a value from the module', hi: 'मॉड्यूल से एक मान निर्यात करता है' },
    'class': { en: 'Declares a class (OOP blueprint)', hi: 'एक क्लास (OOP ब्लूप्रिंट) की घोषणा करता है' },
    'new': { en: 'Creates a new instance of a class', hi: 'एक क्लास का नया उदाहरण बनाता है' },
    'this': { en: 'Refers to the current object instance', hi: 'वर्तमान ऑब्जेक्ट इंस्टेंस को संदर्भित करता है' },
    'try': { en: 'Starts a try-catch block for error handling', hi: 'त्रुटि हैंडलिंग के लिए try-catch ब्लॉक शुरू करता है' },
    'catch': { en: 'Catches and handles errors from try block', hi: 'try ब्लॉक से त्रुटियों को पकड़ता और संभालता है' },
    'async': { en: 'Marks a function as asynchronous', hi: 'फ़ंक्शन को असिंक्रोनस चिह्नित करता है' },
    'await': { en: 'Waits for an async operation to complete', hi: 'एक एसिंक ऑपरेशन के पूर्ण होने की प्रतीक्षा करता है' },
    '=>': { en: 'Arrow function syntax', hi: 'एरो फ़ंक्शन सिंटैक्स' },
    '.map': { en: 'Transforms each element of an array', hi: 'एक सरणी के प्रत्येक तत्व को बदलता है' },
    '.filter': { en: 'Filters array elements by condition', hi: 'शर्त के अनुसार सरणी तत्वों को फ़िल्टर करता है' },
    '.reduce': { en: 'Reduces array to a single value', hi: 'सरणी को एक मान में कम करता है' },
    '.push': { en: 'Adds element to end of array', hi: 'सरणी के अंत में तत्व जोड़ता है' },
    '.length': { en: 'Gets the length/size', hi: 'लंबाई/आकार प्राप्त करता है' },
    'switch': { en: 'Multi-way branch based on value', hi: 'मान के आधार पर बहु-मार्ग शाखा' },
    'case': { en: 'A branch in a switch statement', hi: 'switch स्टेटमेंट में एक शाखा' },
    'break': { en: 'Exits the current loop or switch', hi: 'वर्तमान लूप या switch से बाहर निकलता है' },
    '//': { en: 'This is a comment — ignored by the compiler', hi: 'यह एक टिप्पणी है — कंपाइलर द्वारा अनदेखा किया जाता है' },
  };

  return lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === '{' || trimmed === '}' || trimmed === '};') {
      return { line, en: trimmed === '}' || trimmed === '};' ? 'Closes the code block' : 'Empty line / block delimiter', hi: trimmed === '}' || trimmed === '};' ? 'कोड ब्लॉक को बंद करता है' : 'खाली पंक्ति / ब्लॉक सीमांकक' };
    }
    for (const [keyword, expl] of Object.entries(explanations)) {
      if (trimmed.includes(keyword)) {
        return { line, ...expl };
      }
    }
    return { line, en: 'Executes a statement or expression', hi: 'एक कथन या अभिव्यक्ति निष्पादित करता है' };
  });
}

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
    </div>
  );
}
