export interface PracticeQuestion {
  id: string;
  question: string;
  questionHi: string;
  options: string[];
  optionsHi: string[];
  correctIndex: number;
}

export interface PracticeTopic {
  id: string;
  title: string;
  titleHi: string;
  icon: string;
  color: string;
  totalQuestions: number;
  duration: number; // minutes
  questions: PracticeQuestion[];
}

export const practiceTopics: PracticeTopic[] = [
  {
    id: 'arrays',
    title: 'Arrays & Strings',
    titleHi: 'सरणी और स्ट्रिंग',
    icon: '📊',
    color: 'from-primary to-primary/60',
    totalQuestions: 10,
    duration: 90,
    questions: [
      { id: 'a1', question: 'What is the time complexity of accessing an element in an array by index?', questionHi: 'सूचकांक द्वारा सरणी में तत्व तक पहुंचने की समय जटिलता क्या है?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], optionsHi: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctIndex: 0 },
      { id: 'a2', question: 'Which method adds an element to the end of an array in JavaScript?', questionHi: 'JavaScript में सरणी के अंत में तत्व जोड़ने की विधि कौन सी है?', options: ['unshift()', 'push()', 'pop()', 'shift()'], optionsHi: ['unshift()', 'push()', 'pop()', 'shift()'], correctIndex: 1 },
      { id: 'a3', question: 'What does the splice() method do?', questionHi: 'splice() विधि क्या करती है?', options: ['Sorts the array', 'Adds/removes elements at a position', 'Joins two arrays', 'Reverses the array'], optionsHi: ['सरणी को क्रमबद्ध करता है', 'स्थिति पर तत्व जोड़ता/हटाता है', 'दो सरणियों को जोड़ता है', 'सरणी को उलटता है'], correctIndex: 1 },
      { id: 'a4', question: 'What is the output of "hello".charAt(1)?', questionHi: '"hello".charAt(1) का आउटपुट क्या है?', options: ['"h"', '"e"', '"l"', '"o"'], optionsHi: ['"h"', '"e"', '"l"', '"o"'], correctIndex: 1 },
      { id: 'a5', question: 'Which algorithm is best for finding a pair with a given sum in a sorted array?', questionHi: 'क्रमबद्ध सरणी में दिए गए योग के साथ जोड़ी खोजने के लिए कौन सा एल्गोरिदम सबसे अच्छा है?', options: ['Brute force O(n²)', 'Two pointer O(n)', 'Binary search O(n log n)', 'Hashing O(n)'], optionsHi: ['Brute force O(n²)', 'Two pointer O(n)', 'Binary search O(n log n)', 'Hashing O(n)'], correctIndex: 1 },
      { id: 'a6', question: 'What is Kadane\'s algorithm used for?', questionHi: 'कडाने का एल्गोरिदम किसके लिए उपयोग किया जाता है?', options: ['Sorting', 'Maximum subarray sum', 'String matching', 'Graph traversal'], optionsHi: ['क्रमबद्ध करना', 'अधिकतम उपसरणी योग', 'स्ट्रिंग मिलान', 'ग्राफ ट्रैवर्सल'], correctIndex: 1 },
      { id: 'a7', question: 'What is the space complexity of reversing a string in-place?', questionHi: 'इन-प्लेस स्ट्रिंग उलटने की स्पेस जटिलता क्या है?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], optionsHi: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], correctIndex: 1 },
      { id: 'a8', question: 'Which data structure is used for sliding window problems?', questionHi: 'स्लाइडिंग विंडो समस्याओं के लिए कौन सी डेटा संरचना उपयोग की जाती है?', options: ['Stack', 'Queue/Deque', 'Tree', 'Graph'], optionsHi: ['स्टैक', 'क्यू/डेक', 'ट्री', 'ग्राफ'], correctIndex: 1 },
      { id: 'a9', question: 'What is the time complexity of the Dutch National Flag algorithm?', questionHi: 'डच नेशनल फ्लैग एल्गोरिदम की समय जटिलता क्या है?', options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(1)'], optionsHi: ['O(n log n)', 'O(n²)', 'O(n)', 'O(1)'], correctIndex: 2 },
      { id: 'a10', question: 'Which approach is used to find the longest substring without repeating characters?', questionHi: 'दोहराने वाले वर्णों के बिना सबसे लंबी उपस्ट्रिंग खोजने के लिए कौन सा दृष्टिकोण उपयोग किया जाता है?', options: ['Dynamic Programming', 'Sliding Window + HashSet', 'Divide and Conquer', 'Greedy'], optionsHi: ['डायनामिक प्रोग्रामिंग', 'स्लाइडिंग विंडो + हैशसेट', 'विभाजन और विजय', 'ग्रीडी'], correctIndex: 1 },
    ],
  },
  {
    id: 'linkedlists',
    title: 'Linked Lists & Stacks',
    titleHi: 'लिंक्ड लिस्ट और स्टैक',
    icon: '🔗',
    color: 'from-secondary to-secondary/60',
    totalQuestions: 10,
    duration: 90,
    questions: [
      { id: 'l1', question: 'What is the time complexity of inserting at the head of a linked list?', questionHi: 'लिंक्ड लिस्ट के हेड पर इन्सर्ट करने की समय जटिलता क्या है?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], optionsHi: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], correctIndex: 1 },
      { id: 'l2', question: 'Which technique is used to detect a cycle in a linked list?', questionHi: 'लिंक्ड लिस्ट में चक्र पहचानने के लिए कौन सी तकनीक उपयोग की जाती है?', options: ['Two pointers (Floyd\'s)', 'Binary search', 'BFS', 'Recursion only'], optionsHi: ['दो पॉइंटर (फ्लॉयड)', 'बाइनरी सर्च', 'BFS', 'केवल रिकर्शन'], correctIndex: 0 },
      { id: 'l3', question: 'What data structure follows LIFO order?', questionHi: 'कौन सी डेटा संरचना LIFO क्रम का पालन करती है?', options: ['Queue', 'Stack', 'Array', 'Linked List'], optionsHi: ['क्यू', 'स्टैक', 'सरणी', 'लिंक्ड लिस्ट'], correctIndex: 1 },
      { id: 'l4', question: 'How to reverse a linked list iteratively?', questionHi: 'लिंक्ड लिस्ट को इटरेटिव रूप से कैसे उलटाएं?', options: ['Use extra array', 'Use three pointers: prev, curr, next', 'Use stack', 'Use recursion only'], optionsHi: ['अतिरिक्त सरणी का उपयोग करें', 'तीन पॉइंटर: prev, curr, next', 'स्टैक का उपयोग करें', 'केवल रिकर्शन'], correctIndex: 1 },
      { id: 'l5', question: 'What is the use of a doubly linked list over singly linked list?', questionHi: 'सिंगली लिंक्ड लिस्ट की तुलना में डबली लिंक्ड लिस्ट का क्या उपयोग है?', options: ['Faster access', 'Bidirectional traversal', 'Less memory', 'Faster sorting'], optionsHi: ['तेज़ पहुंच', 'द्विदिशात्मक ट्रैवर्सल', 'कम मेमोरी', 'तेज़ सॉर्टिंग'], correctIndex: 1 },
      { id: 'l6', question: 'Which problem uses a monotonic stack?', questionHi: 'कौन सी समस्या मोनोटोनिक स्टैक का उपयोग करती है?', options: ['Two Sum', 'Next Greater Element', 'Merge Sort', 'BFS'], optionsHi: ['दो का योग', 'अगला बड़ा तत्व', 'मर्ज सॉर्ट', 'BFS'], correctIndex: 1 },
      { id: 'l7', question: 'What is the space complexity of merging two sorted linked lists?', questionHi: 'दो क्रमबद्ध लिंक्ड लिस्ट को मर्ज करने की स्पेस जटिलता क्या है?', options: ['O(n+m)', 'O(1)', 'O(n)', 'O(log n)'], optionsHi: ['O(n+m)', 'O(1)', 'O(n)', 'O(log n)'], correctIndex: 1 },
      { id: 'l8', question: 'How to check balanced parentheses?', questionHi: 'संतुलित कोष्ठक कैसे जांचें?', options: ['Using queue', 'Using stack', 'Using array sort', 'Using hash map'], optionsHi: ['क्यू का उपयोग करके', 'स्टैक का उपयोग करके', 'सरणी सॉर्ट से', 'हैश मैप से'], correctIndex: 1 },
      { id: 'l9', question: 'What is a sentinel node in linked list?', questionHi: 'लिंक्ड लिस्ट में सेंटिनल नोड क्या है?', options: ['Last node', 'Dummy head node to simplify logic', 'Middle node', 'Random node'], optionsHi: ['अंतिम नोड', 'लॉजिक सरल करने के लिए डमी हेड नोड', 'मध्य नोड', 'रैंडम नोड'], correctIndex: 1 },
      { id: 'l10', question: 'Min stack supports which operations in O(1)?', questionHi: 'मिन स्टैक O(1) में कौन सी ऑपरेशन सपोर्ट करता है?', options: ['push, pop, getMin', 'push, pop, sort', 'insert, delete, search', 'enqueue, dequeue'], optionsHi: ['push, pop, getMin', 'push, pop, sort', 'insert, delete, search', 'enqueue, dequeue'], correctIndex: 0 },
    ],
  },
  {
    id: 'trees',
    title: 'Trees & Graphs',
    titleHi: 'ट्री और ग्राफ',
    icon: '🌳',
    color: 'from-success to-success/60',
    totalQuestions: 10,
    duration: 90,
    questions: [
      { id: 't1', question: 'What is the maximum number of nodes at level L of a binary tree?', questionHi: 'बाइनरी ट्री के लेवल L पर अधिकतम नोड कितने होते हैं?', options: ['L', '2^L', '2L', 'L²'], optionsHi: ['L', '2^L', '2L', 'L²'], correctIndex: 1 },
      { id: 't2', question: 'Which traversal visits nodes in Left-Root-Right order?', questionHi: 'कौन सा ट्रैवर्सल Left-Root-Right क्रम में नोड विजिट करता है?', options: ['Preorder', 'Inorder', 'Postorder', 'Level order'], optionsHi: ['प्रीऑर्डर', 'इनऑर्डर', 'पोस्टऑर्डर', 'लेवल ऑर्डर'], correctIndex: 1 },
      { id: 't3', question: 'What data structure is used for BFS?', questionHi: 'BFS के लिए कौन सी डेटा संरचना उपयोग की जाती है?', options: ['Stack', 'Queue', 'Heap', 'Array'], optionsHi: ['स्टैक', 'क्यू', 'हीप', 'सरणी'], correctIndex: 1 },
      { id: 't4', question: 'What is a BST\'s inorder traversal property?', questionHi: 'BST के इनऑर्डर ट्रैवर्सल की विशेषता क्या है?', options: ['Random order', 'Sorted ascending order', 'Reverse order', 'Level order'], optionsHi: ['रैंडम क्रम', 'आरोही क्रमबद्ध', 'उलटा क्रम', 'लेवल ऑर्डर'], correctIndex: 1 },
      { id: 't5', question: 'Time complexity of DFS on a graph with V vertices and E edges?', questionHi: 'V शीर्ष और E किनारों वाले ग्राफ पर DFS की समय जटिलता?', options: ['O(V)', 'O(E)', 'O(V+E)', 'O(V*E)'], optionsHi: ['O(V)', 'O(E)', 'O(V+E)', 'O(V*E)'], correctIndex: 2 },
      { id: 't6', question: 'Which algorithm finds shortest path in an unweighted graph?', questionHi: 'अनवेटेड ग्राफ में सबसे छोटा पथ कौन सा एल्गोरिदम खोजता है?', options: ['Dijkstra', 'BFS', 'DFS', 'Floyd-Warshall'], optionsHi: ['डिज्कस्ट्रा', 'BFS', 'DFS', 'फ्लॉयड-वॉरशॉल'], correctIndex: 1 },
      { id: 't7', question: 'What is a complete binary tree?', questionHi: 'पूर्ण बाइनरी ट्री क्या है?', options: ['All leaves at same level', 'Every level filled except possibly last, filled left to right', 'Every node has 2 children', 'Height is log n'], optionsHi: ['सभी पत्तियां एक ही स्तर पर', 'अंतिम को छोड़कर हर स्तर भरा, बाएं से दाएं', 'हर नोड के 2 बच्चे', 'ऊंचाई log n'], correctIndex: 1 },
      { id: 't8', question: 'Topological sort is applicable to which type of graph?', questionHi: 'टोपोलॉजिकल सॉर्ट किस प्रकार के ग्राफ पर लागू होता है?', options: ['Undirected cyclic', 'Directed Acyclic Graph (DAG)', 'Weighted graph', 'Complete graph'], optionsHi: ['अनिर्देशित चक्रीय', 'निर्देशित अचक्रीय ग्राफ (DAG)', 'वेटेड ग्राफ', 'पूर्ण ग्राफ'], correctIndex: 1 },
      { id: 't9', question: 'What is the height of a balanced BST with n nodes?', questionHi: 'n नोड वाले संतुलित BST की ऊंचाई क्या है?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], optionsHi: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctIndex: 1 },
      { id: 't10', question: 'Which algorithm detects negative cycles in a graph?', questionHi: 'ग्राफ में नकारात्मक चक्र कौन सा एल्गोरिदम पहचानता है?', options: ['Dijkstra', 'Prim\'s', 'Bellman-Ford', 'Kruskal\'s'], optionsHi: ['डिज्कस्ट्रा', 'प्रिम', 'बेलमैन-फोर्ड', 'क्रुस्कल'], correctIndex: 2 },
    ],
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    titleHi: 'डायनामिक प्रोग्रामिंग',
    icon: '🧩',
    color: 'from-warning to-warning/60',
    totalQuestions: 10,
    duration: 90,
    questions: [
      { id: 'd1', question: 'What are the two key properties of DP problems?', questionHi: 'DP समस्याओं के दो मुख्य गुण क्या हैं?', options: ['Sorting & Searching', 'Optimal substructure & Overlapping subproblems', 'Greedy choice & Local optimum', 'Divide & Conquer'], optionsHi: ['सॉर्टिंग और सर्चिंग', 'इष्टतम उपसंरचना और ओवरलैपिंग उपसमस्याएं', 'ग्रीडी चॉइस और स्थानीय इष्टतम', 'विभाजन और विजय'], correctIndex: 1 },
      { id: 'd2', question: 'What is memoization?', questionHi: 'मेमोइज़ेशन क्या है?', options: ['Bottom-up approach', 'Top-down approach with caching', 'A sorting technique', 'A graph algorithm'], optionsHi: ['बॉटम-अप दृष्टिकोण', 'कैशिंग के साथ टॉप-डाउन दृष्टिकोण', 'एक सॉर्टिंग तकनीक', 'एक ग्राफ एल्गोरिदम'], correctIndex: 1 },
      { id: 'd3', question: 'Time complexity of 0/1 Knapsack with n items and capacity W?', questionHi: 'n आइटम और क्षमता W के साथ 0/1 नैपसैक की समय जटिलता?', options: ['O(n)', 'O(nW)', 'O(2^n)', 'O(n²)'], optionsHi: ['O(n)', 'O(nW)', 'O(2^n)', 'O(n²)'], correctIndex: 1 },
      { id: 'd4', question: 'Which DP problem has the recurrence: dp[i] = dp[i-1] + dp[i-2]?', questionHi: 'कौन सी DP समस्या में dp[i] = dp[i-1] + dp[i-2] पुनरावृत्ति है?', options: ['Longest Common Subsequence', 'Fibonacci / Climbing Stairs', 'Edit Distance', 'Matrix Chain'], optionsHi: ['LCS', 'फिबोनाची / सीढ़ियां चढ़ना', 'एडिट डिस्टेंस', 'मैट्रिक्स चेन'], correctIndex: 1 },
      { id: 'd5', question: 'What is tabulation in DP?', questionHi: 'DP में टेबुलेशन क्या है?', options: ['Top-down with recursion', 'Bottom-up iterative approach', 'Using hash tables', 'Greedy approach'], optionsHi: ['रिकर्शन के साथ टॉप-डाउन', 'बॉटम-अप इटरेटिव दृष्टिकोण', 'हैश टेबल का उपयोग', 'ग्रीडी दृष्टिकोण'], correctIndex: 1 },
      { id: 'd6', question: 'LCS of "ABCBDAB" and "BDCAB" has length?', questionHi: '"ABCBDAB" और "BDCAB" का LCS कितनी लंबाई का है?', options: ['3', '4', '5', '2'], optionsHi: ['3', '4', '5', '2'], correctIndex: 1 },
      { id: 'd7', question: 'Edit distance between "kitten" and "sitting" is?', questionHi: '"kitten" और "sitting" के बीच एडिट डिस्टेंस क्या है?', options: ['2', '3', '4', '5'], optionsHi: ['2', '3', '4', '5'], correctIndex: 1 },
      { id: 'd8', question: 'Which problem can be solved by Longest Increasing Subsequence?', questionHi: 'कौन सी समस्या LIS द्वारा हल की जा सकती है?', options: ['Box stacking', 'Graph coloring', 'Sorting', 'Hashing'], optionsHi: ['बॉक्स स्टैकिंग', 'ग्राफ कलरिंग', 'सॉर्टिंग', 'हैशिंग'], correctIndex: 0 },
      { id: 'd9', question: 'Space-optimized Fibonacci uses how much space?', questionHi: 'स्पेस-ऑप्टिमाइज़्ड फिबोनाची कितनी स्पेस उपयोग करता है?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], optionsHi: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], correctIndex: 1 },
      { id: 'd10', question: 'Coin change problem: minimum coins for amount 11 with coins [1,5,6]?', questionHi: 'कॉइन चेंज: [1,5,6] सिक्कों से राशि 11 के लिए न्यूनतम सिक्के?', options: ['2', '3', '6', '11'], optionsHi: ['2', '3', '6', '11'], correctIndex: 0 },
    ],
  },
  {
    id: 'sorting',
    title: 'Sorting & Searching',
    titleHi: 'सॉर्टिंग और सर्चिंग',
    icon: '🔍',
    color: 'from-destructive to-destructive/60',
    totalQuestions: 10,
    duration: 90,
    questions: [
      { id: 's1', question: 'What is the average time complexity of QuickSort?', questionHi: 'QuickSort की औसत समय जटिलता क्या है?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], optionsHi: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], correctIndex: 1 },
      { id: 's2', question: 'Which sorting algorithm is stable?', questionHi: 'कौन सा सॉर्टिंग एल्गोरिदम स्थिर है?', options: ['QuickSort', 'HeapSort', 'MergeSort', 'Selection Sort'], optionsHi: ['क्विकसॉर्ट', 'हीपसॉर्ट', 'मर्जसॉर्ट', 'सिलेक्शन सॉर्ट'], correctIndex: 2 },
      { id: 's3', question: 'Binary search requires the array to be?', questionHi: 'बाइनरी सर्च के लिए सरणी को क्या होना चाहिए?', options: ['Reversed', 'Sorted', 'Unique elements', 'Even length'], optionsHi: ['उलटा', 'क्रमबद्ध', 'अद्वितीय तत्व', 'सम लंबाई'], correctIndex: 1 },
      { id: 's4', question: 'Best case time complexity of Bubble Sort?', questionHi: 'बबल सॉर्ट की सर्वोत्तम समय जटिलता?', options: ['O(n²)', 'O(n)', 'O(n log n)', 'O(1)'], optionsHi: ['O(n²)', 'O(n)', 'O(n log n)', 'O(1)'], correctIndex: 1 },
      { id: 's5', question: 'Which sort has O(n+k) time complexity?', questionHi: 'किस सॉर्ट की O(n+k) समय जटिलता है?', options: ['MergeSort', 'QuickSort', 'Counting Sort', 'HeapSort'], optionsHi: ['मर्जसॉर्ट', 'क्विकसॉर्ट', 'काउंटिंग सॉर्ट', 'हीपसॉर्ट'], correctIndex: 2 },
      { id: 's6', question: 'In binary search, what happens when target < mid?', questionHi: 'बाइनरी सर्च में जब target < mid होता है तो क्या होता है?', options: ['Search right half', 'Search left half', 'Return mid', 'Search complete array'], optionsHi: ['दायां आधा खोजें', 'बायां आधा खोजें', 'mid लौटाएं', 'पूरी सरणी खोजें'], correctIndex: 1 },
      { id: 's7', question: 'HeapSort uses which data structure?', questionHi: 'हीपसॉर्ट किस डेटा संरचना का उपयोग करता है?', options: ['Stack', 'Queue', 'Binary Heap', 'BST'], optionsHi: ['स्टैक', 'क्यू', 'बाइनरी हीप', 'BST'], correctIndex: 2 },
      { id: 's8', question: 'Worst case of QuickSort occurs when?', questionHi: 'QuickSort का worst case कब होता है?', options: ['Random pivot', 'Median pivot', 'Already sorted array', 'Array with duplicates'], optionsHi: ['रैंडम पिवट', 'मीडियन पिवट', 'पहले से क्रमबद्ध सरणी', 'डुप्लिकेट वाली सरणी'], correctIndex: 2 },
      { id: 's9', question: 'Lower bound of comparison-based sorting?', questionHi: 'तुलना-आधारित सॉर्टिंग की निचली सीमा?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], optionsHi: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], correctIndex: 1 },
      { id: 's10', question: 'Ternary search divides the array into how many parts?', questionHi: 'टर्नरी सर्च सरणी को कितने भागों में विभाजित करता है?', options: ['2', '3', '4', '5'], optionsHi: ['2', '3', '4', '5'], correctIndex: 1 },
    ],
  },
  {
    id: 'oops',
    title: 'OOPs & System Design',
    titleHi: 'OOPs और सिस्टम डिज़ाइन',
    icon: '🏗️',
    color: 'from-accent to-accent/60',
    totalQuestions: 10,
    duration: 90,
    questions: [
      { id: 'o1', question: 'Which OOP principle allows a child class to inherit from a parent class?', questionHi: 'कौन सा OOP सिद्धांत चाइल्ड क्लास को पैरेंट क्लास से इनहेरिट करने देता है?', options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'], optionsHi: ['एनकैप्सुलेशन', 'इनहेरिटेंस', 'पॉलीमॉर्फिज़्म', 'एब्स्ट्रैक्शन'], correctIndex: 1 },
      { id: 'o2', question: 'What is polymorphism?', questionHi: 'पॉलीमॉर्फिज़्म क्या है?', options: ['Hiding data', 'One interface, multiple implementations', 'Code reuse', 'Data binding'], optionsHi: ['डेटा छिपाना', 'एक इंटरफेस, कई कार्यान्वयन', 'कोड पुनः उपयोग', 'डेटा बाइंडिंग'], correctIndex: 1 },
      { id: 'o3', question: 'SOLID: What does the "S" stand for?', questionHi: 'SOLID: "S" का क्या मतलब है?', options: ['Substitution', 'Single Responsibility', 'Segregation', 'Simple'], optionsHi: ['प्रतिस्थापन', 'एकल उत्तरदायित्व', 'पृथक्करण', 'सरल'], correctIndex: 1 },
      { id: 'o4', question: 'Which design pattern ensures only one instance of a class?', questionHi: 'कौन सा डिज़ाइन पैटर्न एक क्लास का केवल एक इंस्टेंस सुनिश्चित करता है?', options: ['Factory', 'Singleton', 'Observer', 'Strategy'], optionsHi: ['फैक्टरी', 'सिंगलटन', 'ऑब्ज़र्वर', 'स्ट्रैटेजी'], correctIndex: 1 },
      { id: 'o5', question: 'CAP theorem states a distributed system can guarantee at most how many of C, A, P?', questionHi: 'CAP प्रमेय कहता है कि वितरित सिस्टम C, A, P में से अधिकतम कितने गारंटी दे सकता है?', options: ['1', '2', '3', 'All'], optionsHi: ['1', '2', '3', 'सभी'], correctIndex: 1 },
      { id: 'o6', question: 'What is horizontal scaling?', questionHi: 'हॉरिज़ॉन्टल स्केलिंग क्या है?', options: ['Adding more power to one machine', 'Adding more machines', 'Adding more memory', 'Adding more disk'], optionsHi: ['एक मशीन में अधिक शक्ति जोड़ना', 'अधिक मशीनें जोड़ना', 'अधिक मेमोरी जोड़ना', 'अधिक डिस्क जोड़ना'], correctIndex: 1 },
      { id: 'o7', question: 'What is encapsulation?', questionHi: 'एनकैप्सुलेशन क्या है?', options: ['Inheriting methods', 'Bundling data and methods, restricting access', 'Multiple forms', 'Abstract classes'], optionsHi: ['विधियां इनहेरिट करना', 'डेटा और विधियों को बंडल करना, पहुंच सीमित करना', 'कई रूप', 'एब्सट्रैक्ट क्लास'], correctIndex: 1 },
      { id: 'o8', question: 'Load balancer distributes traffic using which strategy?', questionHi: 'लोड बैलेंसर ट्रैफ़िक वितरित करने के लिए कौन सी रणनीति उपयोग करता है?', options: ['Round Robin, Least Connections', 'Only random', 'FIFO only', 'Stack-based'], optionsHi: ['राउंड रॉबिन, कम कनेक्शन', 'केवल रैंडम', 'केवल FIFO', 'स्टैक-आधारित'], correctIndex: 0 },
      { id: 'o9', question: 'What is an abstract class?', questionHi: 'एब्सट्रैक्ट क्लास क्या है?', options: ['A class that can be instantiated', 'A class that cannot be instantiated, may have abstract methods', 'A final class', 'A static class'], optionsHi: ['जो इंस्टैंशिएट हो सकती है', 'जो इंस्टैंशिएट नहीं हो सकती, एब्सट्रैक्ट विधियां हो सकती हैं', 'एक फाइनल क्लास', 'एक स्टैटिक क्लास'], correctIndex: 1 },
      { id: 'o10', question: 'Database sharding means?', questionHi: 'डेटाबेस शार्डिंग का मतलब क्या है?', options: ['Replicating data', 'Splitting data across multiple databases', 'Encrypting data', 'Compressing data'], optionsHi: ['डेटा की प्रतिकृति', 'कई डेटाबेस में डेटा विभाजित करना', 'डेटा एन्क्रिप्ट करना', 'डेटा संपीड़ित करना'], correctIndex: 1 },
    ],
  },
];
