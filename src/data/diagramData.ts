export interface ModuleDiagramSet {
  title: string;
  titleHi: string;
  chart: string; // Mermaid syntax
}

export const moduleDiagrams: Record<string, ModuleDiagramSet[]> = {
  // Web Dev - HTML & CSS Basics
  tm1: [
    {
      title: 'HTML Document Structure',
      titleHi: 'HTML दस्तावेज़ संरचना',
      chart: `graph TD
    A["&lt;!DOCTYPE html&gt;"] --> B["&lt;html&gt;"]
    B --> C["&lt;head&gt;"]
    B --> D["&lt;body&gt;"]
    C --> E["&lt;meta&gt; / &lt;title&gt; / &lt;link&gt;"]
    D --> F["&lt;header&gt;"]
    D --> G["&lt;main&gt;"]
    D --> H["&lt;footer&gt;"]
    G --> I["&lt;section&gt; / &lt;article&gt;"]
    G --> J["&lt;div&gt; / &lt;p&gt; / &lt;h1&gt;"]`,
    },
    {
      title: 'CSS Box Model',
      titleHi: 'CSS बॉक्स मॉडल',
      chart: `graph LR
    A["Margin"] --> B["Border"]
    B --> C["Padding"]
    C --> D["Content"]
    style A fill:#fbbf24,color:#000
    style B fill:#ef4444,color:#fff
    style C fill:#3b82f6,color:#fff
    style D fill:#22c55e,color:#fff`,
    },
  ],

  // Web Dev - JavaScript Fundamentals
  tm2: [
    {
      title: 'JavaScript Event Loop',
      titleHi: 'JavaScript इवेंट लूप',
      chart: `graph TD
    A["Call Stack"] -->|"async call"| B["Web APIs"]
    B -->|"callback ready"| C["Callback Queue"]
    D["Event Loop"] -->|"checks"| C
    D -->|"pushes to"| A
    C -->|"waits"| D`,
    },
    {
      title: 'JS Data Types',
      titleHi: 'JS डेटा टाइप',
      chart: `graph TD
    A["JavaScript Data Types"] --> B["Primitive"]
    A --> C["Reference"]
    B --> D["string"]
    B --> E["number"]
    B --> F["boolean"]
    B --> G["null / undefined / symbol"]
    C --> H["Object"]
    C --> I["Array"]
    C --> J["Function"]`,
    },
  ],

  // Web Dev - React Basics
  tm3: [
    {
      title: 'React Component Lifecycle',
      titleHi: 'React कंपोनेंट लाइफसाइकल',
      chart: `graph LR
    A["Mount"] --> B["Initial Render"]
    B --> C["useEffect runs"]
    C --> D["User Interaction"]
    D --> E["State / Props Change"]
    E --> F["Re-render"]
    F --> D
    F --> G["Unmount"]
    G --> H["Cleanup useEffect"]`,
    },
    {
      title: 'Props vs State',
      titleHi: 'Props बनाम State',
      chart: `graph TD
    A["Component Data"] --> B["Props"]
    A --> C["State"]
    B --> D["Read-only"]
    B --> E["Passed from parent"]
    C --> F["Mutable via setState"]
    C --> G["Owned by component"]
    D --> H["Both trigger re-render"]
    F --> H`,
    },
  ],

  // Web Dev - State Management
  tm4: [
    {
      title: 'Unidirectional Data Flow',
      titleHi: 'एकदिशीय डेटा फ्लो',
      chart: `graph LR
    A["User Action"] --> B["Dispatch Action"]
    B --> C["Reducer"]
    C --> D["New State"]
    D --> E["UI Re-renders"]
    E --> A`,
    },
    {
      title: 'Context vs Redux vs Zustand',
      titleHi: 'Context बनाम Redux बनाम Zustand',
      chart: `graph TD
    A["State Management Solutions"] --> B["React Context"]
    A --> C["Redux"]
    A --> D["Zustand"]
    B --> B1["Built-in, no extra deps"]
    B --> B2["Re-renders all consumers"]
    C --> C1["Predictable, middleware support"]
    C --> C2["Boilerplate heavy"]
    D --> D1["Lightweight, minimal API"]
    D --> D2["Selective re-renders"]`,
    },
    {
      title: 'useReducer Flow',
      titleHi: 'useReducer फ्लो',
      chart: `sequenceDiagram
    participant UI as Component
    participant D as dispatch
    participant R as Reducer
    participant S as State
    UI->>D: dispatch(action)
    D->>R: action + currentState
    R->>S: returns newState
    S->>UI: re-render with newState`,
    },
  ],

  // Web Dev - Backend with Node.js
  tm5: [
    {
      title: 'Node.js Request-Response Cycle',
      titleHi: 'Node.js रिक्वेस्ट-रिस्पॉन्स साइकल',
      chart: `graph LR
    A["Client"] -->|"HTTP Request"| B["Express Server"]
    B --> C["Middleware Stack"]
    C --> D["Route Handler"]
    D -->|"Query"| E["Database"]
    E -->|"Result"| D
    D -->|"HTTP Response"| A`,
    },
    {
      title: 'REST API Methods',
      titleHi: 'REST API मेथड्स',
      chart: `graph TD
    A["REST API"] --> B["GET - Read"]
    A --> C["POST - Create"]
    A --> D["PUT - Update"]
    A --> E["DELETE - Remove"]
    B --> F["200 OK"]
    C --> G["201 Created"]
    D --> H["200 OK"]
    E --> I["204 No Content"]`,
    },
  ],

  // DSA - Arrays & Strings
  tm6: [
    {
      title: 'Array Operations Time Complexity',
      titleHi: 'सरणी ऑपरेशन समय जटिलता',
      chart: `graph TD
    A["Array Operations"] --> B["Access by index: O(1)"]
    A --> C["Search: O(n)"]
    A --> D["Insert at end: O(1)"]
    A --> E["Insert at middle: O(n)"]
    A --> F["Delete: O(n)"]
    A --> G["Binary Search sorted: O(log n)"]
    style B fill:#22c55e,color:#fff
    style D fill:#22c55e,color:#fff
    style G fill:#3b82f6,color:#fff
    style C fill:#f59e0b,color:#000
    style E fill:#ef4444,color:#fff
    style F fill:#ef4444,color:#fff`,
    },
    {
      title: 'Two Pointer Technique',
      titleHi: 'टू पॉइंटर तकनीक',
      chart: `graph LR
    A["Left i=0"] --> B["Compare arr i + arr j with target"]
    C["Right j=n-1"] --> B
    B -->|"Sum < target"| D["Move i right"]
    B -->|"Sum > target"| E["Move j left"]
    B -->|"Sum == target"| F["Found!"]
    D --> B
    E --> B`,
    },
  ],

  // DSA - Linked Lists & Stacks
  tm7: [
    {
      title: 'Singly Linked List',
      titleHi: 'सिंगली लिंक्ड लिस्ट',
      chart: `graph LR
    HEAD --> A["Node 1 | data: 10"]
    A -->|next| B["Node 2 | data: 20"]
    B -->|next| C["Node 3 | data: 30"]
    C -->|next| D["null"]`,
    },
    {
      title: 'Stack LIFO Operations',
      titleHi: 'स्टैक LIFO ऑपरेशन',
      chart: `graph TD
    A["Stack"] --> B["push: Add to top - O(1)"]
    A --> C["pop: Remove from top - O(1)"]
    A --> D["peek: View top - O(1)"]
    A --> E["Common Uses"]
    E --> F["Undo/Redo"]
    E --> G["Balanced Brackets"]
    E --> H["DFS Traversal"]
    E --> I["Function Call Stack"]`,
    },
  ],

  // DSA - Trees & Graphs
  tm8: [
    {
      title: 'Binary Tree Traversals',
      titleHi: 'बाइनरी ट्री ट्रैवर्सल',
      chart: `graph TD
    A["Root: 1"] --> B["Left: 2"]
    A --> C["Right: 3"]
    B --> D["4"]
    B --> E["5"]
    C --> F["6"]
    C --> G["7"]`,
    },
    {
      title: 'Traversal Orders',
      titleHi: 'ट्रैवर्सल क्रम',
      chart: `graph LR
    A["Inorder: Left Root Right"] --> A1["4 2 5 1 6 3 7"]
    B["Preorder: Root Left Right"] --> B1["1 2 4 5 3 6 7"]
    C["Postorder: Left Right Root"] --> C1["4 5 2 6 7 3 1"]
    D["Level Order: BFS"] --> D1["1 2 3 4 5 6 7"]`,
    },
    {
      title: 'Graph Representations',
      titleHi: 'ग्राफ प्रतिनिधित्व',
      chart: `graph TD
    A["Graph"] --> B["Adjacency List"]
    A --> C["Adjacency Matrix"]
    B --> D["Space: O(V+E)"]
    B --> E["Good for sparse graphs"]
    C --> F["Space: O(V^2)"]
    C --> G["Good for dense graphs"]`,
    },
  ],

  // DSA - Dynamic Programming
  tm9: [
    {
      title: 'DP Problem-Solving Steps',
      titleHi: 'DP समस्या-समाधान चरण',
      chart: `graph TD
    A["1. Identify Subproblems"] --> B["2. Define Recurrence Relation"]
    B --> C["3. Choose Approach"]
    C --> D["Top-Down: Memoization"]
    C --> E["Bottom-Up: Tabulation"]
    D --> F["4. Solve Base Cases"]
    E --> F
    F --> G["5. Build Final Solution"]`,
    },
    {
      title: 'Memoization vs Tabulation',
      titleHi: 'मेमोइज़ेशन बनाम टैब्यूलेशन',
      chart: `graph TD
    A["Dynamic Programming"] --> B["Memoization - Top Down"]
    A --> C["Tabulation - Bottom Up"]
    B --> D["Recursive + Cache"]
    B --> E["Solves only needed subproblems"]
    C --> F["Iterative + Table"]
    C --> G["Solves all subproblems"]
    D --> H["Stack overflow risk for large n"]
    F --> I["No stack overflow"]`,
    },
  ],

  // DSA - Advanced Algorithms
  tm10: [
    {
      title: 'Graph Algorithms Overview',
      titleHi: 'ग्राफ एल्गोरिदम अवलोकन',
      chart: `graph TD
    A["Graph Algorithms"] --> B["BFS"]
    A --> C["DFS"]
    A --> D["Dijkstra"]
    A --> E["Bellman-Ford"]
    A --> F["Kruskal / Prim"]
    B --> B1["Shortest path - unweighted O(V+E)"]
    C --> C1["Explore all paths O(V+E)"]
    D --> D1["Shortest path - weighted O(E log V)"]
    E --> E1["Handles negative weights O(VE)"]
    F --> F1["Minimum Spanning Tree"]`,
    },
  ],

  // AI/ML - Python for ML
  tm11: [
    {
      title: 'ML Pipeline',
      titleHi: 'ML पाइपलाइन',
      chart: `graph LR
    A["Data Collection"] --> B["Data Cleaning"]
    B --> C["Feature Engineering"]
    C --> D["Train/Test Split"]
    D --> E["Model Training"]
    E --> F["Evaluation"]
    F -->|"Poor results"| C
    F -->|"Good results"| G["Deployment"]
    G --> H["Monitoring"]`,
    },
  ],

  // AI/ML - Linear Algebra & Stats
  tm12: [
    {
      title: 'Math Foundations for ML',
      titleHi: 'ML के लिए गणित नींव',
      chart: `graph TD
    A["Math for ML"] --> B["Linear Algebra"]
    A --> C["Probability & Statistics"]
    A --> D["Calculus"]
    B --> B1["Vectors, Matrices"]
    B --> B2["Eigenvalues, PCA"]
    C --> C1["Bayes Theorem"]
    C --> C2["Distributions"]
    D --> D1["Gradient Descent"]
    D --> D2["Chain Rule - Backprop"]`,
    },
  ],

  // AI/ML - Supervised Learning
  tm13: [
    {
      title: 'Supervised Learning Types',
      titleHi: 'पर्यवेक्षित शिक्षण प्रकार',
      chart: `graph TD
    A["Supervised Learning"] --> B["Classification"]
    A --> C["Regression"]
    B --> D["Logistic Regression"]
    B --> E["SVM"]
    B --> F["Decision Tree"]
    B --> G["KNN"]
    C --> H["Linear Regression"]
    C --> I["Polynomial"]
    C --> J["Ridge / Lasso"]`,
    },
  ],

  // AI/ML - Deep Learning
  tm14: [
    {
      title: 'Neural Network Architecture',
      titleHi: 'न्यूरल नेटवर्क आर्किटेक्चर',
      chart: `graph LR
    A["Input Layer"] -->|"weights"| B["Hidden Layer 1"]
    B -->|"ReLU"| C["Hidden Layer 2"]
    C -->|"Softmax"| D["Output Layer"]
    D --> E["Loss Function"]
    E -->|"Backpropagation"| A`,
    },
    {
      title: 'Types of Neural Networks',
      titleHi: 'न्यूरल नेटवर्क के प्रकार',
      chart: `graph TD
    A["Deep Learning"] --> B["CNN"]
    A --> C["RNN / LSTM"]
    A --> D["Transformer"]
    A --> E["GAN"]
    B --> B1["Image Recognition"]
    C --> C1["Sequence / Time Series"]
    D --> D1["NLP / LLMs"]
    E --> E1["Image Generation"]`,
    },
  ],

  // Mobile - React Native Setup
  tm15: [
    {
      title: 'React Native Architecture',
      titleHi: 'React Native आर्किटेक्चर',
      chart: `graph LR
    A["JavaScript Thread"] -->|"Serialized data"| B["Bridge / JSI"]
    B --> C["Native Thread"]
    C --> D["Native UI Components"]
    D --> E["Screen"]`,
    },
  ],

  // Mobile - Components & Navigation
  tm16: [
    {
      title: 'Navigation Patterns',
      titleHi: 'नेविगेशन पैटर्न',
      chart: `graph TD
    A["React Navigation"] --> B["Stack Navigator"]
    A --> C["Tab Navigator"]
    A --> D["Drawer Navigator"]
    B --> B1["Screen A -> Screen B -> Screen C"]
    C --> C1["Home | Search | Profile"]
    D --> D1["Slide-out menu"]
    A --> E["Nested: Tab inside Stack"]`,
    },
  ],

  // Mobile - APIs & State
  tm17: [
    {
      title: 'API Integration Flow',
      titleHi: 'API इंटीग्रेशन फ्लो',
      chart: `sequenceDiagram
    participant C as Component
    participant H as useEffect/Hook
    participant A as API Server
    participant S as State
    C->>H: Mount / trigger
    H->>A: fetch(url)
    A-->>H: JSON response
    H->>S: setState(data)
    S->>C: Re-render with data`,
    },
  ],

  // Mobile - Publishing Apps
  tm18: [
    {
      title: 'App Publishing Flow',
      titleHi: 'ऐप प्रकाशन फ्लो',
      chart: `graph LR
    A["Build Release"] --> B["Code Signing"]
    B --> C["Store Listing"]
    C --> D["Screenshots & Description"]
    D --> E["Submit for Review"]
    E --> F["App Store / Play Store"]
    F --> G["Published!"]`,
    },
  ],
};
