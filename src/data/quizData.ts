export interface QuizQuestion {
  question: string;
  questionHi: string;
  options: string[];
  optionsHi: string[];
  correctIndex: number;
}

type QuizBank = Record<string, QuizQuestion[]>;

export const quizBank: QuizBank = {
  'HTML & CSS Basics': [
    { question: 'What does HTML stand for?', questionHi: 'HTML का पूरा नाम क्या है?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], optionsHi: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correctIndex: 0 },
    { question: 'Which tag is used for the largest heading?', questionHi: 'सबसे बड़े शीर्षक के लिए कौन सा टैग उपयोग होता है?', options: ['<h6>', '<heading>', '<h1>', '<head>'], optionsHi: ['<h6>', '<heading>', '<h1>', '<head>'], correctIndex: 2 },
    { question: 'What does CSS stand for?', questionHi: 'CSS का पूरा नाम क्या है?', options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Colorful Style Sheets'], optionsHi: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Colorful Style Sheets'], correctIndex: 1 },
    { question: 'Which property changes text color in CSS?', questionHi: 'CSS में टेक्स्ट का रंग कौन सी प्रॉपर्टी बदलती है?', options: ['font-color', 'text-color', 'color', 'foreground'], optionsHi: ['font-color', 'text-color', 'color', 'foreground'], correctIndex: 2 },
    { question: 'Which CSS property controls spacing inside an element?', questionHi: 'कौन सी CSS प्रॉपर्टी एलिमेंट के अंदर स्पेसिंग नियंत्रित करती है?', options: ['margin', 'padding', 'border', 'spacing'], optionsHi: ['margin', 'padding', 'border', 'spacing'], correctIndex: 1 },
    { question: 'What is the correct HTML element for inserting a line break?', questionHi: 'लाइन ब्रेक के लिए सही HTML एलिमेंट क्या है?', options: ['<break>', '<lb>', '<br>', '<newline>'], optionsHi: ['<break>', '<lb>', '<br>', '<newline>'], correctIndex: 2 },
    { question: 'Which display value hides an element?', questionHi: 'कौन सी display वैल्यू एलिमेंट को छुपाती है?', options: ['hidden', 'none', 'invisible', 'collapse'], optionsHi: ['hidden', 'none', 'invisible', 'collapse'], correctIndex: 1 },
    { question: 'How do you select an element with id "main" in CSS?', questionHi: 'CSS में id "main" वाले एलिमेंट को कैसे चुनते हैं?', options: ['.main', '#main', 'main', '*main'], optionsHi: ['.main', '#main', 'main', '*main'], correctIndex: 1 },
    { question: 'Which tag creates a hyperlink?', questionHi: 'हाइपरलिंक बनाने के लिए कौन सा टैग है?', options: ['<link>', '<a>', '<href>', '<url>'], optionsHi: ['<link>', '<a>', '<href>', '<url>'], correctIndex: 1 },
    { question: 'What is Flexbox used for?', questionHi: 'Flexbox किसके लिए उपयोग होता है?', options: ['Database queries', '3D animations', 'Layout alignment', 'Server routing'], optionsHi: ['Database queries', '3D animations', 'Layout alignment', 'Server routing'], correctIndex: 2 },
  ],
  'JavaScript Fundamentals': [
    { question: 'Which keyword declares a constant in JavaScript?', questionHi: 'JavaScript में constant घोषित करने के लिए कौन सा keyword है?', options: ['var', 'let', 'const', 'static'], optionsHi: ['var', 'let', 'const', 'static'], correctIndex: 2 },
    { question: 'What is typeof null?', questionHi: 'typeof null क्या है?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], optionsHi: ['"null"', '"undefined"', '"object"', '"boolean"'], correctIndex: 2 },
    { question: 'Which method adds an element to the end of an array?', questionHi: 'कौन सी विधि array के अंत में एलिमेंट जोड़ती है?', options: ['push()', 'pop()', 'shift()', 'unshift()'], optionsHi: ['push()', 'pop()', 'shift()', 'unshift()'], correctIndex: 0 },
    { question: 'What does === check?', questionHi: '=== क्या जांचता है?', options: ['Value only', 'Type only', 'Value and type', 'Reference'], optionsHi: ['केवल मान', 'केवल प्रकार', 'मान और प्रकार', 'संदर्भ'], correctIndex: 2 },
    { question: 'Which function parses a string to an integer?', questionHi: 'कौन सा फंक्शन string को integer में बदलता है?', options: ['Number()', 'parseInt()', 'toInt()', 'parse()'], optionsHi: ['Number()', 'parseInt()', 'toInt()', 'parse()'], correctIndex: 1 },
    { question: 'What does JSON.stringify() do?', questionHi: 'JSON.stringify() क्या करता है?', options: ['Parses JSON', 'Converts to string', 'Creates object', 'Validates JSON'], optionsHi: ['JSON पार्स करता है', 'String में बदलता है', 'Object बनाता है', 'JSON मान्य करता है'], correctIndex: 1 },
    { question: 'How do you write a single-line comment?', questionHi: 'Single-line comment कैसे लिखते हैं?', options: ['/* */', '//', '#', '--'], optionsHi: ['/* */', '//', '#', '--'], correctIndex: 1 },
    { question: 'Which loop is best for iterating arrays?', questionHi: 'Arrays पर iterate करने के लिए कौन सा loop सबसे अच्छा है?', options: ['while', 'do-while', 'for...of', 'goto'], optionsHi: ['while', 'do-while', 'for...of', 'goto'], correctIndex: 2 },
    { question: 'What is a closure?', questionHi: 'Closure क्या है?', options: ['A CSS property', 'Function with access to outer scope', 'A loop type', 'An HTML tag'], optionsHi: ['एक CSS प्रॉपर्टी', 'बाहरी स्कोप तक पहुंच वाला फंक्शन', 'एक लूप प्रकार', 'एक HTML टैग'], correctIndex: 1 },
    { question: 'What does the spread operator (...) do?', questionHi: 'Spread operator (...) क्या करता है?', options: ['Deletes elements', 'Expands iterables', 'Creates loops', 'Defines classes'], optionsHi: ['एलिमेंट हटाता है', 'Iterables विस्तारित करता है', 'Loops बनाता है', 'Classes परिभाषित करता है'], correctIndex: 1 },
  ],
  'React Basics': [
    { question: 'What is JSX?', questionHi: 'JSX क्या है?', options: ['A database', 'JavaScript XML syntax', 'A CSS framework', 'A testing library'], optionsHi: ['एक डेटाबेस', 'JavaScript XML सिंटैक्स', 'एक CSS फ्रेमवर्क', 'एक टेस्टिंग लाइब्रेरी'], correctIndex: 1 },
    { question: 'Which hook manages state?', questionHi: 'कौन सा hook state मैनेज करता है?', options: ['useEffect', 'useState', 'useRef', 'useMemo'], optionsHi: ['useEffect', 'useState', 'useRef', 'useMemo'], correctIndex: 1 },
    { question: 'What are props?', questionHi: 'Props क्या हैं?', options: ['CSS styles', 'Data passed to components', 'HTML attributes only', 'State variables'], optionsHi: ['CSS स्टाइल', 'कंपोनेंट को पास किया गया डेटा', 'केवल HTML एट्रिब्यूट', 'स्टेट वेरिएबल'], correctIndex: 1 },
    { question: 'What does useEffect do?', questionHi: 'useEffect क्या करता है?', options: ['Handles side effects', 'Creates components', 'Defines routes', 'Styles elements'], optionsHi: ['Side effects हैंडल करता है', 'Components बनाता है', 'Routes परिभाषित करता है', 'Elements स्टाइल करता है'], correctIndex: 0 },
    { question: 'How do you conditionally render in React?', questionHi: 'React में conditionally render कैसे करते हैं?', options: ['if/else in JSX', 'Ternary operator', 'switch statement', 'goto'], optionsHi: ['JSX में if/else', 'Ternary operator', 'switch statement', 'goto'], correctIndex: 1 },
    { question: 'What is the virtual DOM?', questionHi: 'Virtual DOM क्या है?', options: ['A browser API', 'Lightweight copy of real DOM', 'A CSS engine', 'A database'], optionsHi: ['एक ब्राउज़र API', 'Real DOM की हल्की कॉपी', 'एक CSS इंजन', 'एक डेटाबेस'], correctIndex: 1 },
    { question: 'Which creates a React app quickly?', questionHi: 'React ऐप जल्दी कौन बनाता है?', options: ['npm start', 'create-react-app / Vite', 'react-build', 'npm install react'], optionsHi: ['npm start', 'create-react-app / Vite', 'react-build', 'npm install react'], correctIndex: 1 },
    { question: 'What is a component?', questionHi: 'Component क्या है?', options: ['A CSS class', 'Reusable UI piece', 'A database table', 'An API endpoint'], optionsHi: ['एक CSS क्लास', 'पुन: प्रयोज्य UI टुकड़ा', 'एक डेटाबेस टेबल', 'एक API एंडपॉइंट'], correctIndex: 1 },
    { question: 'What is the key prop used for in lists?', questionHi: 'Lists में key prop किसके लिए है?', options: ['Styling', 'Unique identification', 'Event handling', 'Data fetching'], optionsHi: ['स्टाइलिंग', 'यूनीक पहचान', 'इवेंट हैंडलिंग', 'डेटा फेचिंग'], correctIndex: 1 },
    { question: 'How do you handle events in React?', questionHi: 'React में events कैसे हैंडल करते हैं?', options: ['onclick=""', 'onClick={handler}', 'addEventListener', '@click'], optionsHi: ['onclick=""', 'onClick={handler}', 'addEventListener', '@click'], correctIndex: 1 },
  ],
  'Arrays & Strings': [
    { question: 'What is the time complexity of array access by index?', questionHi: 'Index द्वारा array access की time complexity क्या है?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], optionsHi: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], correctIndex: 1 },
    { question: 'Which algorithm finds two numbers that sum to target?', questionHi: 'कौन सा algorithm दो numbers खोजता है जो target तक जुड़ते हैं?', options: ['Binary Search', 'Two Pointer / HashMap', 'BFS', 'Merge Sort'], optionsHi: ['Binary Search', 'Two Pointer / HashMap', 'BFS', 'Merge Sort'], correctIndex: 1 },
    { question: 'What is a substring?', questionHi: 'Substring क्या है?', options: ['A separate string', 'Contiguous part of string', 'A reversed string', 'An empty string'], optionsHi: ['एक अलग string', 'String का सतत भाग', 'एक उलटी string', 'एक खाली string'], correctIndex: 1 },
    { question: 'Time complexity of sorting an array?', questionHi: 'Array sorting की time complexity?', options: ['O(n)', 'O(n log n)', 'O(n²) always', 'O(1)'], optionsHi: ['O(n)', 'O(n log n)', 'O(n²) हमेशा', 'O(1)'], correctIndex: 1 },
    { question: 'What does the sliding window technique do?', questionHi: 'Sliding window technique क्या करती है?', options: ['Sorts arrays', 'Processes subarrays efficiently', 'Reverses strings', 'Finds shortest path'], optionsHi: ['Arrays सॉर्ट करती है', 'Subarrays कुशलता से प्रोसेस करती है', 'Strings उलटती है', 'Shortest path खोजती है'], correctIndex: 1 },
    { question: 'How do you check if a string is a palindrome?', questionHi: 'String palindrome है कैसे जांचें?', options: ['Sort it', 'Compare with reverse', 'Use BFS', 'Hash it'], optionsHi: ['सॉर्ट करें', 'Reverse से तुलना करें', 'BFS उपयोग करें', 'Hash करें'], correctIndex: 1 },
    { question: 'What is an anagram?', questionHi: 'Anagram क्या है?', options: ['Same string', 'Rearranged letters', 'Reversed string', 'Substring'], optionsHi: ['Same string', 'पुनर्व्यवस्थित अक्षर', 'उलटी string', 'Substring'], correctIndex: 1 },
    { question: 'Best data structure for frequency counting?', questionHi: 'Frequency counting के लिए सबसे अच्छी data structure?', options: ['Array', 'Stack', 'HashMap', 'Queue'], optionsHi: ['Array', 'Stack', 'HashMap', 'Queue'], correctIndex: 2 },
    { question: 'What is the Kadane\'s algorithm for?', questionHi: 'Kadane\'s algorithm किसके लिए है?', options: ['Sorting', 'Maximum subarray sum', 'Graph traversal', 'String matching'], optionsHi: ['Sorting', 'Maximum subarray sum', 'Graph traversal', 'String matching'], correctIndex: 1 },
    { question: 'Rotate array left by k — best approach?', questionHi: 'Array को k बार left rotate करने का सबसे अच्छा तरीका?', options: ['Nested loops', 'Reverse technique', 'Recursion', 'Sorting'], optionsHi: ['Nested loops', 'Reverse technique', 'Recursion', 'Sorting'], correctIndex: 1 },
  ],
};

// Fallback generic questions for modules without specific quiz data
export const genericQuiz: QuizQuestion[] = [
  { question: 'What is the main concept covered in this module?', questionHi: 'इस मॉड्यूल में मुख्य अवधारणा क्या है?', options: ['Fundamentals', 'Advanced patterns', 'Testing', 'Deployment'], optionsHi: ['मूल बातें', 'उन्नत पैटर्न', 'परीक्षण', 'डिप्लॉयमेंट'], correctIndex: 0 },
  { question: 'Why is practice important in programming?', questionHi: 'प्रोग्रामिंग में अभ्यास क्यों महत्वपूर्ण है?', options: ['It is not', 'Builds muscle memory', 'Only for interviews', 'Just for fun'], optionsHi: ['नहीं है', 'Muscle memory बनाता है', 'केवल इंटरव्यू के लिए', 'बस मज़े के लिए'], correctIndex: 1 },
  { question: 'What is debugging?', questionHi: 'Debugging क्या है?', options: ['Writing code', 'Finding and fixing errors', 'Deleting code', 'Copying code'], optionsHi: ['कोड लिखना', 'Errors खोजना और ठीक करना', 'कोड हटाना', 'कोड कॉपी करना'], correctIndex: 1 },
  { question: 'What is an algorithm?', questionHi: 'Algorithm क्या है?', options: ['A programming language', 'Step-by-step procedure', 'A framework', 'A database'], optionsHi: ['एक प्रोग्रामिंग भाषा', 'चरण-दर-चरण प्रक्रिया', 'एक फ्रेमवर्क', 'एक डेटाबेस'], correctIndex: 1 },
  { question: 'What is version control?', questionHi: 'Version control क्या है?', options: ['A text editor', 'Tracking code changes', 'A browser', 'A compiler'], optionsHi: ['एक टेक्स्ट एडिटर', 'कोड परिवर्तनों को ट्रैक करना', 'एक ब्राउज़र', 'एक कंपाइलर'], correctIndex: 1 },
  { question: 'What is DRY principle?', questionHi: 'DRY सिद्धांत क्या है?', options: ['Delete Repeated YAML', 'Don\'t Repeat Yourself', 'Debug Run Yield', 'Data Recovery Yield'], optionsHi: ['Delete Repeated YAML', 'Don\'t Repeat Yourself', 'Debug Run Yield', 'Data Recovery Yield'], correctIndex: 1 },
  { question: 'What is a function?', questionHi: 'Function क्या है?', options: ['A variable', 'Reusable block of code', 'A CSS property', 'A file type'], optionsHi: ['एक वेरिएबल', 'पुन: प्रयोज्य कोड ब्लॉक', 'एक CSS प्रॉपर्टी', 'एक फ़ाइल प्रकार'], correctIndex: 1 },
  { question: 'Why are data structures important?', questionHi: 'Data structures क्यों महत्वपूर्ण हैं?', options: ['They are not', 'Efficient data organization', 'Only for databases', 'For styling'], optionsHi: ['नहीं हैं', 'कुशल डेटा संगठन', 'केवल डेटाबेस के लिए', 'स्टाइलिंग के लिए'], correctIndex: 1 },
  { question: 'What is time complexity?', questionHi: 'Time complexity क्या है?', options: ['Clock time', 'Growth rate of operations', 'File size', 'Memory usage'], optionsHi: ['घड़ी का समय', 'ऑपरेशन की वृद्धि दर', 'फ़ाइल आकार', 'मेमोरी उपयोग'], correctIndex: 1 },
  { question: 'What is the best way to learn coding?', questionHi: 'कोडिंग सीखने का सबसे अच्छा तरीका क्या है?', options: ['Only reading', 'Practice and build projects', 'Watching videos only', 'Memorizing syntax'], optionsHi: ['केवल पढ़ना', 'अभ्यास और प्रोजेक्ट बनाना', 'केवल वीडियो देखना', 'सिंटैक्स याद करना'], correctIndex: 1 },
];

export function getQuizForModule(moduleTitle: string): QuizQuestion[] {
  return quizBank[moduleTitle] || genericQuiz;
}
