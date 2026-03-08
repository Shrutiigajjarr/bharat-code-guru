export interface DiagramItem {
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  type: 'flowchart' | 'hierarchy' | 'concept';
  nodes: { id: string; label: string; labelHi: string; color: string }[];
  connections: { from: string; to: string; label?: string }[];
}

export interface ModuleDiagrams {
  [moduleId: string]: DiagramItem[];
}

export const moduleDiagrams: ModuleDiagrams = {
  // Web Dev - HTML & CSS Basics
  tm1: [
    {
      title: 'HTML Document Structure',
      titleHi: 'HTML दस्तावेज़ संरचना',
      description: 'How an HTML document is structured from doctype to closing tags',
      descriptionHi: 'HTML दस्तावेज़ कैसे doctype से बंद टैग तक संरचित होता है',
      type: 'hierarchy',
      nodes: [
        { id: '1', label: '<!DOCTYPE html>', labelHi: '<!DOCTYPE html>', color: 'hsl(var(--primary))' },
        { id: '2', label: '<html>', labelHi: '<html>', color: 'hsl(var(--primary))' },
        { id: '3', label: '<head>', labelHi: '<head>', color: 'hsl(var(--secondary))' },
        { id: '4', label: '<body>', labelHi: '<body>', color: 'hsl(var(--secondary))' },
        { id: '5', label: '<meta> / <title>', labelHi: '<meta> / <title>', color: 'hsl(var(--accent))' },
        { id: '6', label: '<div> / <p> / <h1>', labelHi: '<div> / <p> / <h1>', color: 'hsl(var(--accent))' },
      ],
      connections: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '2', to: '4' },
        { from: '3', to: '5' },
        { from: '4', to: '6' },
      ],
    },
    {
      title: 'CSS Box Model',
      titleHi: 'CSS बॉक्स मॉडल',
      description: 'The CSS Box Model: margin, border, padding, and content',
      descriptionHi: 'CSS बॉक्स मॉडल: मार्जिन, बॉर्डर, पैडिंग, और कंटेंट',
      type: 'concept',
      nodes: [
        { id: '1', label: 'Margin', labelHi: 'मार्जिन', color: 'hsl(var(--warning))' },
        { id: '2', label: 'Border', labelHi: 'बॉर्डर', color: 'hsl(var(--destructive))' },
        { id: '3', label: 'Padding', labelHi: 'पैडिंग', color: 'hsl(var(--secondary))' },
        { id: '4', label: 'Content', labelHi: 'कंटेंट', color: 'hsl(var(--primary))' },
      ],
      connections: [
        { from: '1', to: '2', label: 'wraps' },
        { from: '2', to: '3', label: 'wraps' },
        { from: '3', to: '4', label: 'wraps' },
      ],
    },
  ],

  // Web Dev - JavaScript Fundamentals
  tm2: [
    {
      title: 'JavaScript Event Loop',
      titleHi: 'JavaScript इवेंट लूप',
      description: 'How the JS engine handles asynchronous operations',
      descriptionHi: 'JS इंजन असिंक्रोनस ऑपरेशन कैसे संभालता है',
      type: 'flowchart',
      nodes: [
        { id: '1', label: 'Call Stack', labelHi: 'कॉल स्टैक', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Web APIs', labelHi: 'वेब API', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Callback Queue', labelHi: 'कॉलबैक कतार', color: 'hsl(var(--warning))' },
        { id: '4', label: 'Event Loop', labelHi: 'इवेंट लूप', color: 'hsl(var(--destructive))' },
      ],
      connections: [
        { from: '1', to: '2', label: 'async call' },
        { from: '2', to: '3', label: 'callback ready' },
        { from: '4', to: '3', label: 'checks' },
        { from: '4', to: '1', label: 'pushes' },
      ],
    },
    {
      title: 'JS Data Types',
      titleHi: 'JS डेटा टाइप',
      description: 'Primitive and reference types in JavaScript',
      descriptionHi: 'JavaScript में प्रिमिटिव और रेफरेंस टाइप',
      type: 'hierarchy',
      nodes: [
        { id: '1', label: 'Data Types', labelHi: 'डेटा टाइप', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Primitive', labelHi: 'प्रिमिटिव', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Reference', labelHi: 'रेफरेंस', color: 'hsl(var(--warning))' },
        { id: '4', label: 'string, number, boolean, null, undefined, symbol', labelHi: 'string, number, boolean, null, undefined, symbol', color: 'hsl(var(--accent))' },
        { id: '5', label: 'Object, Array, Function', labelHi: 'Object, Array, Function', color: 'hsl(var(--accent))' },
      ],
      connections: [
        { from: '1', to: '2' },
        { from: '1', to: '3' },
        { from: '2', to: '4' },
        { from: '3', to: '5' },
      ],
    },
  ],

  // Web Dev - React Basics
  tm3: [
    {
      title: 'React Component Lifecycle',
      titleHi: 'React कंपोनेंट लाइफसाइकल',
      description: 'How a React component mounts, updates, and unmounts',
      descriptionHi: 'React कंपोनेंट कैसे माउंट, अपडेट और अनमाउंट होता है',
      type: 'flowchart',
      nodes: [
        { id: '1', label: 'Mount', labelHi: 'माउंट', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Render', labelHi: 'रेंडर', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Update (State/Props)', labelHi: 'अपडेट (स्टेट/प्रॉप्स)', color: 'hsl(var(--warning))' },
        { id: '4', label: 'Re-render', labelHi: 'री-रेंडर', color: 'hsl(var(--secondary))' },
        { id: '5', label: 'Unmount', labelHi: 'अनमाउंट', color: 'hsl(var(--destructive))' },
      ],
      connections: [
        { from: '1', to: '2' },
        { from: '2', to: '3', label: 'user interaction' },
        { from: '3', to: '4' },
        { from: '4', to: '3', label: 'new changes' },
        { from: '4', to: '5', label: 'removed from DOM' },
      ],
    },
    {
      title: 'Props vs State',
      titleHi: 'Props बनाम State',
      description: 'Key differences between props and state in React',
      descriptionHi: 'React में props और state के बीच मुख्य अंतर',
      type: 'concept',
      nodes: [
        { id: '1', label: 'Props: Read-only, passed from parent', labelHi: 'Props: केवल पढ़ने योग्य, पैरेंट से आते हैं', color: 'hsl(var(--primary))' },
        { id: '2', label: 'State: Mutable, owned by component', labelHi: 'State: परिवर्तनशील, कंपोनेंट का अपना', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Both trigger re-render on change', labelHi: 'दोनों बदलने पर री-रेंडर करते हैं', color: 'hsl(var(--warning))' },
      ],
      connections: [
        { from: '1', to: '3' },
        { from: '2', to: '3' },
      ],
    },
  ],

  // Web Dev - State Management
  tm4: [
    {
      title: 'State Management Flow',
      titleHi: 'स्टेट मैनेजमेंट फ्लो',
      description: 'Unidirectional data flow in state management',
      descriptionHi: 'स्टेट मैनेजमेंट में एकदिशीय डेटा फ्लो',
      type: 'flowchart',
      nodes: [
        { id: '1', label: 'Action / Event', labelHi: 'एक्शन / इवेंट', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Dispatch', labelHi: 'डिस्पैच', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Reducer / Store', labelHi: 'रिड्यूसर / स्टोर', color: 'hsl(var(--warning))' },
        { id: '4', label: 'New State', labelHi: 'नया स्टेट', color: 'hsl(var(--destructive))' },
        { id: '5', label: 'UI Update', labelHi: 'UI अपडेट', color: 'hsl(var(--primary))' },
      ],
      connections: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
        { from: '4', to: '5' },
        { from: '5', to: '1', label: 'user interacts again' },
      ],
    },
    {
      title: 'Context vs Redux vs Zustand',
      titleHi: 'Context बनाम Redux बनाम Zustand',
      description: 'Comparing popular state management approaches',
      descriptionHi: 'लोकप्रिय स्टेट मैनेजमेंट तरीकों की तुलना',
      type: 'concept',
      nodes: [
        { id: '1', label: 'React Context: Built-in, simple, re-renders all consumers', labelHi: 'React Context: बिल्ट-इन, सरल, सभी कंज़्यूमर री-रेंडर', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Redux: Predictable, middleware, boilerplate-heavy', labelHi: 'Redux: अनुमानित, मिडलवेयर, बॉयलरप्लेट-भारी', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Zustand: Lightweight, minimal API, selective re-renders', labelHi: 'Zustand: हल्का, न्यूनतम API, चयनात्मक री-रेंडर', color: 'hsl(var(--warning))' },
      ],
      connections: [],
    },
  ],

  // Web Dev - Backend with Node.js
  tm5: [
    {
      title: 'Node.js Request-Response Cycle',
      titleHi: 'Node.js रिक्वेस्ट-रिस्पॉन्स साइकल',
      description: 'How a request flows through a Node.js server',
      descriptionHi: 'Node.js सर्वर में रिक्वेस्ट कैसे फ्लो करता है',
      type: 'flowchart',
      nodes: [
        { id: '1', label: 'Client Request', labelHi: 'क्लाइंट रिक्वेस्ट', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Middleware', labelHi: 'मिडलवेयर', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Route Handler', labelHi: 'रूट हैंडलर', color: 'hsl(var(--warning))' },
        { id: '4', label: 'Database', labelHi: 'डेटाबेस', color: 'hsl(var(--destructive))' },
        { id: '5', label: 'Response', labelHi: 'रिस्पॉन्स', color: 'hsl(var(--primary))' },
      ],
      connections: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
        { from: '4', to: '3', label: 'data' },
        { from: '3', to: '5' },
      ],
    },
  ],

  // DSA - Arrays & Strings
  tm6: [
    {
      title: 'Array Operations Complexity',
      titleHi: 'सरणी ऑपरेशन जटिलता',
      description: 'Time complexity of common array operations',
      descriptionHi: 'सामान्य सरणी ऑपरेशन की समय जटिलता',
      type: 'concept',
      nodes: [
        { id: '1', label: 'Access: O(1)', labelHi: 'एक्सेस: O(1)', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Search: O(n)', labelHi: 'खोज: O(n)', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Insert (end): O(1)', labelHi: 'जोड़ें (अंत): O(1)', color: 'hsl(var(--primary))' },
        { id: '4', label: 'Insert (middle): O(n)', labelHi: 'जोड़ें (मध्य): O(n)', color: 'hsl(var(--warning))' },
        { id: '5', label: 'Delete: O(n)', labelHi: 'हटाएं: O(n)', color: 'hsl(var(--destructive))' },
      ],
      connections: [],
    },
    {
      title: 'Two Pointer Technique',
      titleHi: 'टू पॉइंटर तकनीक',
      description: 'Using two pointers to solve array problems efficiently',
      descriptionHi: 'सरणी समस्याओं को कुशलता से हल करने के लिए दो पॉइंटर का उपयोग',
      type: 'flowchart',
      nodes: [
        { id: '1', label: 'Left Pointer (i=0)', labelHi: 'बायां पॉइंटर (i=0)', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Right Pointer (j=n-1)', labelHi: 'दायां पॉइंटर (j=n-1)', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Compare / Process', labelHi: 'तुलना / प्रक्रिया', color: 'hsl(var(--warning))' },
        { id: '4', label: 'Move pointers inward', labelHi: 'पॉइंटर अंदर ले जाएं', color: 'hsl(var(--destructive))' },
      ],
      connections: [
        { from: '1', to: '3' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
        { from: '4', to: '3', label: 'repeat until i >= j' },
      ],
    },
  ],

  // DSA - Linked Lists & Stacks
  tm7: [
    {
      title: 'Linked List Structure',
      titleHi: 'लिंक्ड लिस्ट संरचना',
      description: 'How nodes connect in a singly linked list',
      descriptionHi: 'सिंगली लिंक्ड लिस्ट में नोड कैसे जुड़ते हैं',
      type: 'flowchart',
      nodes: [
        { id: '1', label: 'Head', labelHi: 'हेड', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Node 1 [data|next]', labelHi: 'नोड 1 [डेटा|अगला]', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Node 2 [data|next]', labelHi: 'नोड 2 [डेटा|अगला]', color: 'hsl(var(--secondary))' },
        { id: '4', label: 'null', labelHi: 'null', color: 'hsl(var(--muted))' },
      ],
      connections: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
      ],
    },
    {
      title: 'Stack Operations (LIFO)',
      titleHi: 'स्टैक ऑपरेशन (LIFO)',
      description: 'Push and pop operations on a stack',
      descriptionHi: 'स्टैक पर पुश और पॉप ऑपरेशन',
      type: 'concept',
      nodes: [
        { id: '1', label: 'Push: Add to top O(1)', labelHi: 'पुश: ऊपर जोड़ें O(1)', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Pop: Remove from top O(1)', labelHi: 'पॉप: ऊपर से हटाएं O(1)', color: 'hsl(var(--destructive))' },
        { id: '3', label: 'Peek: View top O(1)', labelHi: 'पीक: ऊपर देखें O(1)', color: 'hsl(var(--secondary))' },
        { id: '4', label: 'Use: Undo, brackets, DFS', labelHi: 'उपयोग: अनडू, ब्रैकेट, DFS', color: 'hsl(var(--warning))' },
      ],
      connections: [],
    },
  ],

  // DSA - Trees & Graphs
  tm8: [
    {
      title: 'Binary Tree Traversals',
      titleHi: 'बाइनरी ट्री ट्रैवर्सल',
      description: 'Inorder, Preorder, and Postorder traversals',
      descriptionHi: 'इनऑर्डर, प्रीऑर्डर, और पोस्टऑर्डर ट्रैवर्सल',
      type: 'hierarchy',
      nodes: [
        { id: '1', label: 'Root (1)', labelHi: 'रूट (1)', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Left (2)', labelHi: 'बायां (2)', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Right (3)', labelHi: 'दायां (3)', color: 'hsl(var(--secondary))' },
        { id: '4', label: 'Inorder: 2→1→3', labelHi: 'इनऑर्डर: 2→1→3', color: 'hsl(var(--warning))' },
        { id: '5', label: 'Preorder: 1→2→3', labelHi: 'प्रीऑर्डर: 1→2→3', color: 'hsl(var(--accent))' },
        { id: '6', label: 'Postorder: 2→3→1', labelHi: 'पोस्टऑर्डर: 2→3→1', color: 'hsl(var(--destructive))' },
      ],
      connections: [
        { from: '1', to: '2' },
        { from: '1', to: '3' },
      ],
    },
  ],

  // DSA - Dynamic Programming
  tm9: [
    {
      title: 'DP Problem-Solving Approach',
      titleHi: 'DP समस्या-समाधान दृष्टिकोण',
      description: 'Steps to solve a dynamic programming problem',
      descriptionHi: 'डायनामिक प्रोग्रामिंग समस्या हल करने के चरण',
      type: 'flowchart',
      nodes: [
        { id: '1', label: 'Identify Subproblems', labelHi: 'उप-समस्याएं पहचानें', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Define Recurrence', labelHi: 'पुनरावृत्ति परिभाषित करें', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Memoize or Tabulate', labelHi: 'मेमोइज़ या टैबुलेट', color: 'hsl(var(--warning))' },
        { id: '4', label: 'Build Solution', labelHi: 'समाधान बनाएं', color: 'hsl(var(--primary))' },
      ],
      connections: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
      ],
    },
  ],

  // DSA - Advanced Algorithms
  tm10: [
    {
      title: 'Graph Algorithms Overview',
      titleHi: 'ग्राफ एल्गोरिदम अवलोकन',
      description: 'Key graph algorithms and when to use them',
      descriptionHi: 'मुख्य ग्राफ एल्गोरिदम और कब उपयोग करें',
      type: 'concept',
      nodes: [
        { id: '1', label: 'BFS: Shortest path (unweighted)', labelHi: 'BFS: सबसे छोटा पथ (अनवेटेड)', color: 'hsl(var(--primary))' },
        { id: '2', label: 'DFS: Explore all paths', labelHi: 'DFS: सभी पथ खोजें', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Dijkstra: Shortest path (weighted)', labelHi: 'डिज्क्स्ट्रा: सबसे छोटा पथ (वेटेड)', color: 'hsl(var(--warning))' },
        { id: '4', label: 'Kruskal/Prim: Min spanning tree', labelHi: 'क्रुस्कल/प्रिम: मिन स्पैनिंग ट्री', color: 'hsl(var(--destructive))' },
      ],
      connections: [],
    },
  ],

  // AI/ML - Python for ML
  tm11: [
    {
      title: 'ML Pipeline',
      titleHi: 'ML पाइपलाइन',
      description: 'Typical machine learning workflow',
      descriptionHi: 'सामान्य मशीन लर्निंग वर्कफ़्लो',
      type: 'flowchart',
      nodes: [
        { id: '1', label: 'Data Collection', labelHi: 'डेटा संग्रह', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Preprocessing', labelHi: 'प्रीप्रोसेसिंग', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Feature Engineering', labelHi: 'फीचर इंजीनियरिंग', color: 'hsl(var(--warning))' },
        { id: '4', label: 'Model Training', labelHi: 'मॉडल ट्रेनिंग', color: 'hsl(var(--destructive))' },
        { id: '5', label: 'Evaluation', labelHi: 'मूल्यांकन', color: 'hsl(var(--primary))' },
        { id: '6', label: 'Deployment', labelHi: 'डिप्लॉयमेंट', color: 'hsl(var(--secondary))' },
      ],
      connections: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
        { from: '4', to: '5' },
        { from: '5', to: '6' },
      ],
    },
  ],

  // AI/ML - Linear Algebra & Stats
  tm12: [
    {
      title: 'Key Math Concepts for ML',
      titleHi: 'ML के लिए मुख्य गणित अवधारणाएं',
      description: 'Essential math foundations for machine learning',
      descriptionHi: 'मशीन लर्निंग के लिए आवश्यक गणित नींव',
      type: 'concept',
      nodes: [
        { id: '1', label: 'Vectors & Matrices', labelHi: 'वेक्टर और मैट्रिक्स', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Eigenvalues / PCA', labelHi: 'आइगनवैल्यू / PCA', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Probability & Bayes', labelHi: 'प्रायिकता और बेय्ज़', color: 'hsl(var(--warning))' },
        { id: '4', label: 'Gradient Descent', labelHi: 'ग्रेडिएंट डिसेंट', color: 'hsl(var(--destructive))' },
      ],
      connections: [],
    },
  ],

  // AI/ML - Supervised Learning
  tm13: [
    {
      title: 'Supervised Learning Types',
      titleHi: 'पर्यवेक्षित शिक्षण प्रकार',
      description: 'Classification vs Regression',
      descriptionHi: 'वर्गीकरण बनाम प्रतिगमन',
      type: 'hierarchy',
      nodes: [
        { id: '1', label: 'Supervised Learning', labelHi: 'पर्यवेक्षित शिक्षण', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Classification', labelHi: 'वर्गीकरण', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Regression', labelHi: 'प्रतिगमन', color: 'hsl(var(--warning))' },
        { id: '4', label: 'SVM, KNN, Decision Tree', labelHi: 'SVM, KNN, डिसीजन ट्री', color: 'hsl(var(--accent))' },
        { id: '5', label: 'Linear, Polynomial, Ridge', labelHi: 'लीनियर, पॉलीनॉमियल, रिज', color: 'hsl(var(--accent))' },
      ],
      connections: [
        { from: '1', to: '2' },
        { from: '1', to: '3' },
        { from: '2', to: '4' },
        { from: '3', to: '5' },
      ],
    },
  ],

  // AI/ML - Deep Learning
  tm14: [
    {
      title: 'Neural Network Architecture',
      titleHi: 'न्यूरल नेटवर्क आर्किटेक्चर',
      description: 'Layers of a deep neural network',
      descriptionHi: 'डीप न्यूरल नेटवर्क की परतें',
      type: 'flowchart',
      nodes: [
        { id: '1', label: 'Input Layer', labelHi: 'इनपुट लेयर', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Hidden Layer 1', labelHi: 'हिडन लेयर 1', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Hidden Layer 2', labelHi: 'हिडन लेयर 2', color: 'hsl(var(--warning))' },
        { id: '4', label: 'Output Layer', labelHi: 'आउटपुट लेयर', color: 'hsl(var(--destructive))' },
      ],
      connections: [
        { from: '1', to: '2', label: 'weights' },
        { from: '2', to: '3', label: 'activation' },
        { from: '3', to: '4', label: 'softmax' },
      ],
    },
  ],

  // Mobile - React Native Setup
  tm15: [
    {
      title: 'React Native Architecture',
      titleHi: 'React Native आर्किटेक्चर',
      description: 'How React Native bridges JS and Native code',
      descriptionHi: 'React Native JS और नेटिव कोड को कैसे ब्रिज करता है',
      type: 'flowchart',
      nodes: [
        { id: '1', label: 'JavaScript Thread', labelHi: 'JavaScript थ्रेड', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Bridge', labelHi: 'ब्रिज', color: 'hsl(var(--warning))' },
        { id: '3', label: 'Native Thread', labelHi: 'नेटिव थ्रेड', color: 'hsl(var(--secondary))' },
        { id: '4', label: 'Native UI', labelHi: 'नेटिव UI', color: 'hsl(var(--destructive))' },
      ],
      connections: [
        { from: '1', to: '2', label: 'JSON messages' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
      ],
    },
  ],

  // Mobile - Components & Navigation
  tm16: [
    {
      title: 'Navigation Patterns',
      titleHi: 'नेविगेशन पैटर्न',
      description: 'Common navigation patterns in mobile apps',
      descriptionHi: 'मोबाइल ऐप में सामान्य नेविगेशन पैटर्न',
      type: 'concept',
      nodes: [
        { id: '1', label: 'Stack Navigator', labelHi: 'स्टैक नेविगेटर', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Tab Navigator', labelHi: 'टैब नेविगेटर', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Drawer Navigator', labelHi: 'ड्रॉवर नेविगेटर', color: 'hsl(var(--warning))' },
        { id: '4', label: 'Nested Navigation', labelHi: 'नेस्टेड नेविगेशन', color: 'hsl(var(--destructive))' },
      ],
      connections: [],
    },
  ],

  // Mobile - APIs & State
  tm17: [
    {
      title: 'API Integration Flow',
      titleHi: 'API इंटीग्रेशन फ्लो',
      description: 'Fetching data from APIs in mobile apps',
      descriptionHi: 'मोबाइल ऐप में API से डेटा लाना',
      type: 'flowchart',
      nodes: [
        { id: '1', label: 'Component Mounts', labelHi: 'कंपोनेंट माउंट', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Fetch API Call', labelHi: 'Fetch API कॉल', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Loading State', labelHi: 'लोडिंग स्टेट', color: 'hsl(var(--warning))' },
        { id: '4', label: 'Update State with Data', labelHi: 'डेटा से स्टेट अपडेट', color: 'hsl(var(--primary))' },
        { id: '5', label: 'Render UI', labelHi: 'UI रेंडर', color: 'hsl(var(--secondary))' },
      ],
      connections: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
        { from: '4', to: '5' },
      ],
    },
  ],

  // Mobile - Publishing Apps
  tm18: [
    {
      title: 'App Publishing Flow',
      titleHi: 'ऐप प्रकाशन फ्लो',
      description: 'Steps to publish a mobile app',
      descriptionHi: 'मोबाइल ऐप प्रकाशित करने के चरण',
      type: 'flowchart',
      nodes: [
        { id: '1', label: 'Build Release APK/IPA', labelHi: 'रिलीज़ APK/IPA बनाएं', color: 'hsl(var(--primary))' },
        { id: '2', label: 'Code Signing', labelHi: 'कोड साइनिंग', color: 'hsl(var(--secondary))' },
        { id: '3', label: 'Store Listing', labelHi: 'स्टोर लिस्टिंग', color: 'hsl(var(--warning))' },
        { id: '4', label: 'Review Process', labelHi: 'समीक्षा प्रक्रिया', color: 'hsl(var(--destructive))' },
        { id: '5', label: 'Published!', labelHi: 'प्रकाशित!', color: 'hsl(var(--primary))' },
      ],
      connections: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
        { from: '4', to: '5' },
      ],
    },
  ],
};
