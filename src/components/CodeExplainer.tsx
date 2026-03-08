import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FiFileText, FiLoader } from 'react-icons/fi';

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

export function CodeExplainer() {
  const { t } = useApp();
  const [explainCode, setExplainCode] = useState('');
  const [explainLang, setExplainLang] = useState<'en' | 'hi'>('en');
  const [explaining, setExplaining] = useState(false);
  const [explanationLines, setExplanationLines] = useState<LineExplanation[]>([]);

  const handleExplain = () => {
    if (!explainCode.trim()) return;
    setExplaining(true);
    setExplanationLines([]);
    setTimeout(() => {
      setExplanationLines(generateExplanations(explainCode));
      setExplaining(false);
    }, 1000);
  };

  return (
    <div className="glass-panel-elevated p-6">
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
  );
}
