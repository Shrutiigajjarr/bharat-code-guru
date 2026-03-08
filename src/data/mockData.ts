export type Role = 'student' | 'mentor' | 'admin';

export interface User {
  id: string;
  name: string;
  nameHi: string;
  email: string;
  role: Role;
  avatar: string;
  streak: number;
  points: number;
  problemsSolved: number;
  joinDate: string;
}

export interface Problem {
  id: string;
  title: string;
  titleHi: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  status: 'solved' | 'attempted' | 'unsolved';
  description: string;
  descriptionHi: string;
  sampleInput: string;
  sampleOutput: string;
  acceptance: number;
}

export interface LearningTrack {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  color: string;
  modules: { id: string; title: string; titleHi: string; completed: boolean; duration: string; videoUrl?: string }[];
  progress: number;
  totalStudents: number;
}

export interface MentorRequest {
  id: string;
  studentId: string;
  studentName: string;
  mentorId: string;
  topic: string;
  message: string;
  status: 'pending' | 'accepted' | 'completed';
  date: string;
}

export interface Notification {
  id: string;
  message: string;
  messageHi: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  date: string;
}

export const mockStudents: User[] = [
  { id: 's1', name: 'Aarav Sharma', nameHi: 'आरव शर्मा', email: 'aarav@demo.com', role: 'student', avatar: '👨‍💻', streak: 15, points: 2450, problemsSolved: 87, joinDate: '2025-01-15' },
  { id: 's2', name: 'Priya Patel', nameHi: 'प्रिया पटेल', email: 'priya@demo.com', role: 'student', avatar: '👩‍💻', streak: 22, points: 3100, problemsSolved: 112, joinDate: '2024-11-20' },
  { id: 's3', name: 'Rohan Gupta', nameHi: 'रोहन गुप्ता', email: 'rohan@demo.com', role: 'student', avatar: '🧑‍💻', streak: 8, points: 1800, problemsSolved: 54, joinDate: '2025-02-01' },
  { id: 's4', name: 'Ananya Singh', nameHi: 'अनन्या सिंह', email: 'ananya@demo.com', role: 'student', avatar: '👩‍🎓', streak: 30, points: 4200, problemsSolved: 145, joinDate: '2024-08-10' },
  { id: 's5', name: 'Vikram Reddy', nameHi: 'विक्रम रेड्डी', email: 'vikram@demo.com', role: 'student', avatar: '👨‍🎓', streak: 5, points: 950, problemsSolved: 28, joinDate: '2025-03-01' },
  { id: 's6', name: 'Kavya Nair', nameHi: 'काव्या नायर', email: 'kavya@demo.com', role: 'student', avatar: '👩‍💻', streak: 12, points: 2100, problemsSolved: 73, joinDate: '2025-01-05' },
  { id: 's7', name: 'Arjun Kumar', nameHi: 'अर्जुन कुमार', email: 'arjun@demo.com', role: 'student', avatar: '🧑‍💻', streak: 18, points: 2800, problemsSolved: 96, joinDate: '2024-10-15' },
  { id: 's8', name: 'Meera Joshi', nameHi: 'मीरा जोशी', email: 'meera@demo.com', role: 'student', avatar: '👩‍🎓', streak: 3, points: 600, problemsSolved: 15, joinDate: '2025-02-20' },
  { id: 's9', name: 'Karthik Iyer', nameHi: 'कार्तिक अय्यर', email: 'karthik@demo.com', role: 'student', avatar: '👨‍💻', streak: 25, points: 3500, problemsSolved: 130, joinDate: '2024-09-01' },
  { id: 's10', name: 'Diya Verma', nameHi: 'दिया वर्मा', email: 'diya@demo.com', role: 'student', avatar: '👩‍💻', streak: 10, points: 1650, problemsSolved: 48, joinDate: '2025-01-25' },
];

export const mockMentors: User[] = [
  { id: 'm1', name: 'Dr. Rajesh Khanna', nameHi: 'डॉ. राजेश खन्ना', email: 'rajesh@demo.com', role: 'mentor', avatar: '👨‍🏫', streak: 0, points: 0, problemsSolved: 0, joinDate: '2024-01-01' },
  { id: 'm2', name: 'Prof. Sunita Rao', nameHi: 'प्रो. सुनीता राव', email: 'sunita@demo.com', role: 'mentor', avatar: '👩‍🏫', streak: 0, points: 0, problemsSolved: 0, joinDate: '2024-02-15' },
  { id: 'm3', name: 'Amit Deshmukh', nameHi: 'अमित देशमुख', email: 'amit@demo.com', role: 'mentor', avatar: '🧑‍🏫', streak: 0, points: 0, problemsSolved: 0, joinDate: '2024-03-10' },
  { id: 'm4', name: 'Neha Kulkarni', nameHi: 'नेहा कुलकर्णी', email: 'neha@demo.com', role: 'mentor', avatar: '👩‍🏫', streak: 0, points: 0, problemsSolved: 0, joinDate: '2024-04-20' },
  { id: 'm5', name: 'Suresh Pillai', nameHi: 'सुरेश पिल्लई', email: 'suresh@demo.com', role: 'mentor', avatar: '👨‍🏫', streak: 0, points: 0, problemsSolved: 0, joinDate: '2024-05-05' },
];

export const mockAdmin: User = {
  id: 'a1', name: 'Admin User', nameHi: 'व्यवस्थापक', email: 'admin@demo.com', role: 'admin', avatar: '🛡️', streak: 0, points: 0, problemsSolved: 0, joinDate: '2024-01-01'
};

export const mockProblems: Problem[] = [
  { id: 'p1', title: 'Two Sum', titleHi: 'दो का योग', difficulty: 'Easy', tags: ['Array', 'HashMap'], status: 'solved', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', descriptionHi: 'एक पूर्णांक सरणी nums और एक पूर्णांक target दिया गया है, उन दो संख्याओं के सूचकांक लौटाएं जो target तक जुड़ते हैं।', sampleInput: 'nums = [2,7,11,15], target = 9', sampleOutput: '[0,1]', acceptance: 82 },
  { id: 'p2', title: 'Reverse Linked List', titleHi: 'लिंक्ड लिस्ट उलटाएं', difficulty: 'Easy', tags: ['LinkedList'], status: 'solved', description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.', descriptionHi: 'एक सिंगली लिंक्ड लिस्ट का हेड दिया गया है, लिस्ट को उलटाएं।', sampleInput: 'head = [1,2,3,4,5]', sampleOutput: '[5,4,3,2,1]', acceptance: 75 },
  { id: 'p3', title: 'Valid Parentheses', titleHi: 'मान्य कोष्ठक', difficulty: 'Easy', tags: ['Stack', 'String'], status: 'attempted', description: 'Given a string s containing just the characters (, ), {, }, [, ], determine if the input string is valid.', descriptionHi: 'एक स्ट्रिंग दी गई है जिसमें केवल (, ), {, }, [, ] हैं, जांचें कि स्ट्रिंग मान्य है या नहीं।', sampleInput: 's = "([])"', sampleOutput: 'true', acceptance: 70 },
  { id: 'p4', title: 'Maximum Subarray', titleHi: 'अधिकतम उपसरणी', difficulty: 'Medium', tags: ['Array', 'DP'], status: 'solved', description: 'Given an integer array nums, find the subarray with the largest sum.', descriptionHi: 'एक पूर्णांक सरणी दी गई है, सबसे बड़े योग वाली उपसरणी खोजें।', sampleInput: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', sampleOutput: '6', acceptance: 65 },
  { id: 'p5', title: 'Merge Intervals', titleHi: 'अंतराल मिलाएं', difficulty: 'Medium', tags: ['Array', 'Sorting'], status: 'unsolved', description: 'Given an array of intervals, merge all overlapping intervals.', descriptionHi: 'अंतरालों की एक सरणी दी गई है, सभी ओवरलैपिंग अंतरालों को मिलाएं।', sampleInput: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', sampleOutput: '[[1,6],[8,10],[15,18]]', acceptance: 58 },
  { id: 'p6', title: 'Binary Tree Level Order', titleHi: 'बाइनरी ट्री लेवल ऑर्डर', difficulty: 'Medium', tags: ['Tree', 'BFS'], status: 'unsolved', description: 'Given the root of a binary tree, return the level order traversal.', descriptionHi: 'एक बाइनरी ट्री की जड़ दी गई है, लेवल ऑर्डर ट्रैवर्सल लौटाएं।', sampleInput: 'root = [3,9,20,null,null,15,7]', sampleOutput: '[[3],[9,20],[15,7]]', acceptance: 62 },
  { id: 'p7', title: 'Longest Palindromic Substring', titleHi: 'सबसे लंबी पैलिंड्रोम उपस्ट्रिंग', difficulty: 'Medium', tags: ['String', 'DP'], status: 'attempted', description: 'Given a string s, return the longest palindromic substring.', descriptionHi: 'एक स्ट्रिंग दी गई है, सबसे लंबी पैलिंड्रोमिक उपस्ट्रिंग लौटाएं।', sampleInput: 's = "babad"', sampleOutput: '"bab"', acceptance: 55 },
  { id: 'p8', title: 'LRU Cache', titleHi: 'एलआरयू कैश', difficulty: 'Medium', tags: ['Design', 'HashMap'], status: 'unsolved', description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.', descriptionHi: 'एक डेटा संरचना डिज़ाइन करें जो LRU कैश की बाधाओं का पालन करती है।', sampleInput: 'LRUCache(2)', sampleOutput: 'null', acceptance: 48 },
  { id: 'p9', title: 'Word Search', titleHi: 'शब्द खोज', difficulty: 'Medium', tags: ['Backtracking', 'Matrix'], status: 'unsolved', description: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid.', descriptionHi: 'एक m x n ग्रिड और एक शब्द दिया गया है, जांचें कि शब्द ग्रिड में मौजूद है या नहीं।', sampleInput: 'board = [["A","B"],["C","D"]], word = "AB"', sampleOutput: 'true', acceptance: 52 },
  { id: 'p10', title: 'Course Schedule', titleHi: 'कोर्स शेड्यूल', difficulty: 'Medium', tags: ['Graph', 'Topological Sort'], status: 'unsolved', description: 'Determine if you can finish all courses given their prerequisites.', descriptionHi: 'निर्धारित करें कि क्या आप सभी कोर्स पूरे कर सकते हैं।', sampleInput: 'numCourses = 2, prerequisites = [[1,0]]', sampleOutput: 'true', acceptance: 50 },
  { id: 'p11', title: 'Median of Two Sorted Arrays', titleHi: 'दो क्रमबद्ध सरणियों का मध्यिका', difficulty: 'Hard', tags: ['Array', 'Binary Search'], status: 'unsolved', description: 'Given two sorted arrays, return the median of the two sorted arrays.', descriptionHi: 'दो क्रमबद्ध सरणियां दी गई हैं, उनका मध्यिका लौटाएं।', sampleInput: 'nums1 = [1,3], nums2 = [2]', sampleOutput: '2.0', acceptance: 38 },
  { id: 'p12', title: 'Trapping Rain Water', titleHi: 'बारिश का पानी रोकना', difficulty: 'Hard', tags: ['Array', 'Stack', 'Two Pointers'], status: 'unsolved', description: 'Given n non-negative integers representing an elevation map, compute how much water it can trap.', descriptionHi: 'n गैर-ऋणात्मक पूर्णांक दिए गए हैं जो एक ऊंचाई नक्शे का प्रतिनिधित्व करते हैं, गणना करें कि कितना पानी रोका जा सकता है।', sampleInput: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', sampleOutput: '6', acceptance: 42 },
  { id: 'p13', title: 'Serialize Binary Tree', titleHi: 'बाइनरी ट्री सीरियलाइज़', difficulty: 'Hard', tags: ['Tree', 'BFS', 'Design'], status: 'unsolved', description: 'Design an algorithm to serialize and deserialize a binary tree.', descriptionHi: 'एक बाइनरी ट्री को सीरियलाइज़ और डीसीरियलाइज़ करने का एल्गोरिदम डिज़ाइन करें।', sampleInput: 'root = [1,2,3,null,null,4,5]', sampleOutput: '"[1,2,3,null,null,4,5]"', acceptance: 35 },
  { id: 'p14', title: 'Longest Valid Parentheses', titleHi: 'सबसे लंबा मान्य कोष्ठक', difficulty: 'Hard', tags: ['String', 'Stack', 'DP'], status: 'unsolved', description: 'Given a string containing just ( and ), return the length of the longest valid parentheses substring.', descriptionHi: 'केवल ( और ) वाली स्ट्रिंग दी गई है, सबसे लंबी मान्य कोष्ठक उपस्ट्रिंग की लंबाई लौटाएं।', sampleInput: 's = "(()"', sampleOutput: '2', acceptance: 33 },
  { id: 'p15', title: 'Palindrome Pairs', titleHi: 'पैलिंड्रोम जोड़ियां', difficulty: 'Hard', tags: ['Trie', 'String', 'HashMap'], status: 'unsolved', description: 'Given a list of unique words, return all pairs of indices that form palindromes when concatenated.', descriptionHi: 'अद्वितीय शब्दों की एक सूची दी गई है, सभी जोड़ियां लौटाएं जो जोड़ने पर पैलिंड्रोम बनाती हैं।', sampleInput: 'words = ["abcd","dcba","lls","s","sssll"]', sampleOutput: '[[0,1],[1,0],[3,2],[2,4]]', acceptance: 30 },
  { id: 'p16', title: 'Climbing Stairs', titleHi: 'सीढ़ियां चढ़ना', difficulty: 'Easy', tags: ['DP', 'Math'], status: 'solved', description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps.', descriptionHi: 'आप एक सीढ़ी चढ़ रहे हैं। शीर्ष तक पहुंचने के लिए n कदम लगते हैं।', sampleInput: 'n = 3', sampleOutput: '3', acceptance: 85 },
  { id: 'p17', title: 'Best Time to Buy Stock', titleHi: 'स्टॉक खरीदने का सर्वोत्तम समय', difficulty: 'Easy', tags: ['Array', 'Greedy'], status: 'solved', description: 'Find the maximum profit from buying and selling a stock once.', descriptionHi: 'एक बार स्टॉक खरीदने और बेचने से अधिकतम लाभ खोजें।', sampleInput: 'prices = [7,1,5,3,6,4]', sampleOutput: '5', acceptance: 78 },
  { id: 'p18', title: 'Container With Most Water', titleHi: 'सबसे अधिक पानी वाला कंटेनर', difficulty: 'Medium', tags: ['Array', 'Two Pointers'], status: 'attempted', description: 'Find two lines that together with the x-axis form a container that holds the most water.', descriptionHi: 'दो रेखाएं खोजें जो x-अक्ष के साथ सबसे अधिक पानी रखने वाला कंटेनर बनाती हैं।', sampleInput: 'height = [1,8,6,2,5,4,8,3,7]', sampleOutput: '49', acceptance: 60 },
  { id: 'p19', title: 'N-Queens', titleHi: 'एन-क्वीन्स', difficulty: 'Hard', tags: ['Backtracking'], status: 'unsolved', description: 'Place n queens on an n×n chessboard such that no two queens attack each other.', descriptionHi: 'n×n शतरंज बोर्ड पर n रानियां रखें ताकि कोई दो रानियां एक-दूसरे पर हमला न करें।', sampleInput: 'n = 4', sampleOutput: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', acceptance: 28 },
  { id: 'p20', title: 'Implement Trie', titleHi: 'ट्राई लागू करें', difficulty: 'Medium', tags: ['Trie', 'Design'], status: 'unsolved', description: 'Implement a trie with insert, search, and startsWith methods.', descriptionHi: 'insert, search और startsWith विधियों के साथ एक ट्राई लागू करें।', sampleInput: 'Trie()', sampleOutput: 'null', acceptance: 56 },
];

export const mockTracks: LearningTrack[] = [
  {
    id: 't1', title: 'Web Development', titleHi: 'वेब डेवलपमेंट',
    description: 'Master full-stack web development from HTML to React', descriptionHi: 'HTML से React तक फुल-स्टैक वेब डेवलपमेंट सीखें',
    icon: '🌐', color: 'from-primary to-warning',
    modules: [
      { id: 'tm1', title: 'HTML & CSS Basics', titleHi: 'HTML और CSS मूलभूत', completed: true, duration: '4h' },
      { id: 'tm2', title: 'JavaScript Fundamentals', titleHi: 'JavaScript मूलभूत', completed: true, duration: '8h' },
      { id: 'tm3', title: 'React Basics', titleHi: 'React मूलभूत', completed: true, duration: '6h' },
      { id: 'tm4', title: 'State Management', titleHi: 'स्टेट मैनेजमेंट', completed: false, duration: '5h' },
      { id: 'tm5', title: 'Backend with Node.js', titleHi: 'Node.js के साथ बैकएंड', completed: false, duration: '7h' },
    ],
    progress: 60, totalStudents: 1250,
  },
  {
    id: 't2', title: 'Data Structures & Algorithms', titleHi: 'डेटा संरचनाएं और एल्गोरिदम',
    description: 'Crack coding interviews with DSA mastery', descriptionHi: 'DSA में महारत हासिल करके कोडिंग इंटरव्यू क्रैक करें',
    icon: '🧮', color: 'from-secondary to-primary',
    modules: [
      { id: 'tm6', title: 'Arrays & Strings', titleHi: 'सरणी और स्ट्रिंग', completed: true, duration: '5h' },
      { id: 'tm7', title: 'Linked Lists & Stacks', titleHi: 'लिंक्ड लिस्ट और स्टैक', completed: true, duration: '4h' },
      { id: 'tm8', title: 'Trees & Graphs', titleHi: 'ट्री और ग्राफ', completed: false, duration: '8h' },
      { id: 'tm9', title: 'Dynamic Programming', titleHi: 'डायनामिक प्रोग्रामिंग', completed: false, duration: '10h' },
      { id: 'tm10', title: 'Advanced Algorithms', titleHi: 'उन्नत एल्गोरिदम', completed: false, duration: '6h' },
    ],
    progress: 40, totalStudents: 2100,
  },
  {
    id: 't3', title: 'AI & Machine Learning', titleHi: 'एआई और मशीन लर्निंग',
    description: 'Learn AI/ML from basics to deployment', descriptionHi: 'AI/ML की मूल बातें से लेकर डिप्लॉयमेंट तक सीखें',
    icon: '🤖', color: 'from-success to-secondary',
    modules: [
      { id: 'tm11', title: 'Python for ML', titleHi: 'ML के लिए Python', completed: true, duration: '6h' },
      { id: 'tm12', title: 'Linear Algebra & Stats', titleHi: 'रैखिक बीजगणित और सांख्यिकी', completed: false, duration: '5h' },
      { id: 'tm13', title: 'Supervised Learning', titleHi: 'पर्यवेक्षित शिक्षण', completed: false, duration: '8h' },
      { id: 'tm14', title: 'Deep Learning', titleHi: 'डीप लर्निंग', completed: false, duration: '10h' },
    ],
    progress: 25, totalStudents: 890,
  },
  {
    id: 't4', title: 'Mobile App Development', titleHi: 'मोबाइल ऐप डेवलपमेंट',
    description: 'Build cross-platform mobile apps with React Native', descriptionHi: 'React Native के साथ क्रॉस-प्लेटफ़ॉर्म मोबाइल ऐप बनाएं',
    icon: '📱', color: 'from-warning to-destructive',
    modules: [
      { id: 'tm15', title: 'React Native Setup', titleHi: 'React Native सेटअप', completed: true, duration: '3h' },
      { id: 'tm16', title: 'Components & Navigation', titleHi: 'कंपोनेंट और नेविगेशन', completed: true, duration: '5h' },
      { id: 'tm17', title: 'APIs & State', titleHi: 'API और स्टेट', completed: false, duration: '6h' },
      { id: 'tm18', title: 'Publishing Apps', titleHi: 'ऐप प्रकाशित करना', completed: false, duration: '4h' },
    ],
    progress: 50, totalStudents: 670,
  },
];

export const mockMentorRequests: MentorRequest[] = [
  { id: 'mr1', studentId: 's1', studentName: 'Aarav Sharma', mentorId: 'm1', topic: 'Dynamic Programming', message: 'I need help understanding memoization vs tabulation.', status: 'pending', date: '2026-03-07' },
  { id: 'mr2', studentId: 's2', studentName: 'Priya Patel', mentorId: 'm2', topic: 'React Hooks', message: 'Can you explain useCallback vs useMemo?', status: 'accepted', date: '2026-03-06' },
  { id: 'mr3', studentId: 's4', studentName: 'Ananya Singh', mentorId: 'm1', topic: 'System Design', message: 'How to design a URL shortener?', status: 'completed', date: '2026-03-05' },
  { id: 'mr4', studentId: 's7', studentName: 'Arjun Kumar', mentorId: 'm3', topic: 'Graph Algorithms', message: 'Need clarification on Dijkstra vs Bellman-Ford.', status: 'pending', date: '2026-03-08' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', message: 'You solved "Two Sum" — Great job!', messageHi: 'आपने "दो का योग" हल किया — शाबाश!', type: 'success', read: false, date: '2026-03-08' },
  { id: 'n2', message: 'New mentor session available', messageHi: 'नया मेंटर सत्र उपलब्ध', type: 'info', read: false, date: '2026-03-07' },
  { id: 'n3', message: 'Your streak is on fire! 🔥 15 days', messageHi: 'आपकी स्ट्रीक आग पर है! 🔥 15 दिन', type: 'success', read: true, date: '2026-03-06' },
  { id: 'n4', message: 'Weekly contest starts tomorrow', messageHi: 'साप्ताहिक प्रतियोगिता कल शुरू होगी', type: 'warning', read: false, date: '2026-03-08' },
];

export const weeklyActivityData = [
  { day: 'Mon', problems: 5, hours: 2.5 },
  { day: 'Tue', problems: 3, hours: 1.5 },
  { day: 'Wed', problems: 7, hours: 3 },
  { day: 'Thu', problems: 4, hours: 2 },
  { day: 'Fri', problems: 6, hours: 2.8 },
  { day: 'Sat', problems: 8, hours: 4 },
  { day: 'Sun', problems: 2, hours: 1 },
];

export const topicMasteryData = [
  { topic: 'Arrays', mastery: 85 },
  { topic: 'Strings', mastery: 72 },
  { topic: 'Trees', mastery: 45 },
  { topic: 'Graphs', mastery: 30 },
  { topic: 'DP', mastery: 55 },
  { topic: 'Stack', mastery: 68 },
];

export const monthlyProgressData = [
  { month: 'Oct', solved: 12 },
  { month: 'Nov', solved: 18 },
  { month: 'Dec', solved: 25 },
  { month: 'Jan', solved: 22 },
  { month: 'Feb', solved: 30 },
  { month: 'Mar', solved: 15 },
];
