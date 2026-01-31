'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle2, Circle, ExternalLink, Search, Filter,
  ChevronDown, ChevronUp, Bookmark, Clock, Star,
  TrendingUp, BarChart3, Flame
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface Problem {
  name: string;
  category: string;
  url: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companies?: string[];
  patterns?: string[];
}

interface SolvedStatus {
  solved: boolean;
  timestamp: number;
  notes: string;
  confidence?: number;
  attempts?: number;
}

const PROBLEMS: Problem[] = [
  // Arrays & Hashing
  { name: 'Two Sum', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy', companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Uber'], patterns: ['Hash Map'] },
  { name: 'Contains Duplicate', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/contains-duplicate/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], patterns: ['Hash Set'] },
  { name: 'Product of Array Except Self', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/product-of-array-except-self/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Uber'], patterns: ['Prefix Sum'] },
  { name: 'Maximum Subarray (Kadane)', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Uber'], patterns: ['Dynamic Programming'] },
  { name: 'Best Time to Buy and Sell Stock', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'Easy', companies: ['Amazon', 'Facebook', 'Uber'], patterns: ['One Pass'] },
  { name: 'Subarray Sum Equals K', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium', companies: ['Facebook', 'Google', 'Amazon'], patterns: ['Prefix Sum', 'Hash Map'] },
  { name: 'Longest Consecutive Sequence', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/longest-consecutive-sequence/', difficulty: 'Medium', companies: ['Google', 'Amazon', 'Microsoft'], patterns: ['Hash Set'] },
  { name: 'Merge Intervals', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium', companies: ['Google', 'Facebook', 'Amazon', 'Uber'], patterns: ['Interval Merging'] },
  { name: 'Set Matrix Zeroes', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/set-matrix-zeroes/', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], patterns: ['In-place'] },

  // Two Pointers
  { name: 'Valid Palindrome', category: 'Two Pointers', url: 'https://leetcode.com/problems/valid-palindrome/', difficulty: 'Easy', companies: ['Facebook', 'Microsoft'], patterns: ['Two Pointers'] },
  { name: 'Container With Most Water', category: 'Two Pointers', url: 'https://leetcode.com/problems/container-with-most-water/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], patterns: ['Two Pointers'] },
  { name: '3Sum', category: 'Two Pointers', url: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Microsoft', 'Uber'], patterns: ['Two Pointers', 'Sorting'] },
  { name: 'Trapping Rain Water', category: 'Two Pointers', url: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'Hard', companies: ['Amazon', 'Facebook', 'Google', 'Uber'], patterns: ['Two Pointers', 'DP'] },
  { name: 'Sort Colors', category: 'Two Pointers', url: 'https://leetcode.com/problems/sort-colors/', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], patterns: ['Dutch National Flag'] },

  // Sliding Window
  { name: 'Longest Substring Without Repeating Characters', category: 'Sliding Window', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft', 'Uber'], patterns: ['Sliding Window'] },
  { name: 'Minimum Window Substring', category: 'Sliding Window', url: 'https://leetcode.com/problems/minimum-window-substring/', difficulty: 'Hard', companies: ['Facebook', 'Amazon', 'Microsoft', 'Uber'], patterns: ['Sliding Window'] },
  { name: 'Permutation in String', category: 'Sliding Window', url: 'https://leetcode.com/problems/permutation-in-string/', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], patterns: ['Sliding Window'] },
  { name: 'Sliding Window Maximum', category: 'Sliding Window', url: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Uber'], patterns: ['Monotonic Deque'] },

  // Binary Search
  { name: 'Binary Search', category: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/', difficulty: 'Easy', companies: ['Microsoft', 'Amazon'], patterns: ['Binary Search'] },
  { name: 'Search in Rotated Sorted Array', category: 'Binary Search', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Microsoft', 'Uber'], patterns: ['Modified Binary Search'] },
  { name: 'Find Minimum in Rotated Sorted Array', category: 'Binary Search', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], patterns: ['Binary Search'] },
  { name: 'Median of Two Sorted Arrays', category: 'Binary Search', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft'], patterns: ['Binary Search'] },

  // Stack
  { name: 'Valid Parentheses', category: 'Stack', url: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'Easy', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google'], patterns: ['Stack'] },
  { name: 'Daily Temperatures', category: 'Stack', url: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'Medium', companies: ['Facebook', 'Amazon'], patterns: ['Monotonic Stack'] },
  { name: 'Largest Rectangle in Histogram', category: 'Stack', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Facebook'], patterns: ['Monotonic Stack'] },
  { name: 'Min Stack', category: 'Stack', url: 'https://leetcode.com/problems/min-stack/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Google'], patterns: ['Stack Design'] },

  // Trees
  { name: 'Maximum Depth of Binary Tree', category: 'Trees', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], patterns: ['DFS'] },
  { name: 'Diameter of Binary Tree', category: 'Trees', url: 'https://leetcode.com/problems/diameter-of-binary-tree/', difficulty: 'Easy', companies: ['Facebook', 'Amazon', 'Google'], patterns: ['DFS'] },
  { name: 'Binary Tree Level Order Traversal', category: 'Trees', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], patterns: ['BFS'] },
  { name: 'Validate Binary Search Tree', category: 'Trees', url: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], patterns: ['DFS', 'Inorder'] },
  { name: 'Serialize and Deserialize Binary Tree', category: 'Trees', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', difficulty: 'Hard', companies: ['Facebook', 'Amazon', 'Microsoft', 'Uber'], patterns: ['Tree Serialization'] },

  // Graphs
  { name: 'Number of Islands', category: 'Graphs', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Uber'], patterns: ['DFS', 'BFS'] },
  { name: 'Clone Graph', category: 'Graphs', url: 'https://leetcode.com/problems/clone-graph/', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Microsoft'], patterns: ['DFS', 'Hash Map'] },
  { name: 'Course Schedule', category: 'Graphs', url: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google'], patterns: ['Topological Sort'] },
  { name: 'Rotting Oranges', category: 'Graphs', url: 'https://leetcode.com/problems/rotting-oranges/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], patterns: ['BFS'] },
  { name: 'Word Ladder', category: 'Graphs', url: 'https://leetcode.com/problems/word-ladder/', difficulty: 'Hard', companies: ['Amazon', 'Facebook', 'Google'], patterns: ['BFS'] },

  // Dynamic Programming
  { name: 'Climbing Stairs', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy', companies: ['Amazon', 'Google', 'Microsoft'], patterns: ['DP'] },
  { name: 'House Robber', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/house-robber/', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], patterns: ['DP'] },
  { name: 'Coin Change', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/coin-change/', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'], patterns: ['DP', 'Unbounded Knapsack'] },
  { name: 'Longest Increasing Subsequence', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Google'], patterns: ['DP', 'Binary Search'] },
  { name: 'Edit Distance', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/edit-distance/', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], patterns: ['2D DP'] },

  // Heap
  { name: 'Kth Largest Element in an Array', category: 'Heap', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'Medium', companies: ['Facebook', 'Amazon', 'Microsoft', 'Google'], patterns: ['Heap', 'Quickselect'] },
  { name: 'Top K Frequent Elements', category: 'Heap', url: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Google'], patterns: ['Heap', 'Bucket Sort'] },
  { name: 'Merge K Sorted Lists', category: 'Heap', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'Hard', companies: ['Amazon', 'Facebook', 'Microsoft', 'Uber'], patterns: ['Heap', 'Divide and Conquer'] },
  { name: 'Find Median from Data Stream', category: 'Heap', url: 'https://leetcode.com/problems/find-median-from-data-stream/', difficulty: 'Hard', companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'], patterns: ['Two Heaps'] },

  // Linked List
  { name: 'Reverse Linked List', category: 'Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Facebook'], patterns: ['Iterative Reversal'] },
  { name: 'Merge Two Sorted Lists', category: 'Linked List', url: 'https://leetcode.com/problems/merge-two-sorted-lists/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Facebook'], patterns: ['Two Pointers'] },
  { name: 'Linked List Cycle', category: 'Linked List', url: 'https://leetcode.com/problems/linked-list-cycle/', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], patterns: ['Floyd\'s Cycle'] },
  { name: 'LRU Cache', category: 'Linked List', url: 'https://leetcode.com/problems/lru-cache/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Uber'], patterns: ['Hash Map + DLL'] },

  // Backtracking
  { name: 'Subsets', category: 'Backtracking', url: 'https://leetcode.com/problems/subsets/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], patterns: ['Backtracking'] },
  { name: 'Permutations', category: 'Backtracking', url: 'https://leetcode.com/problems/permutations/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], patterns: ['Backtracking'] },
  { name: 'Combination Sum', category: 'Backtracking', url: 'https://leetcode.com/problems/combination-sum/', difficulty: 'Medium', companies: ['Amazon', 'Facebook', 'Microsoft'], patterns: ['Backtracking'] },
  { name: 'Word Search', category: 'Backtracking', url: 'https://leetcode.com/problems/word-search/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], patterns: ['DFS Backtracking'] },
  { name: 'N-Queens', category: 'Backtracking', url: 'https://leetcode.com/problems/n-queens/', difficulty: 'Hard', companies: ['Amazon', 'Facebook'], patterns: ['Backtracking'] },

  // Greedy
  { name: 'Jump Game', category: 'Greedy', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft', 'Facebook'], patterns: ['Greedy'] },
  { name: 'Jump Game II', category: 'Greedy', url: 'https://leetcode.com/problems/jump-game-ii/', difficulty: 'Medium', companies: ['Amazon', 'Facebook'], patterns: ['Greedy'] },
  { name: 'Gas Station', category: 'Greedy', url: 'https://leetcode.com/problems/gas-station/', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], patterns: ['Greedy'] },
];

const difficultyColors = {
  Easy: 'bg-green-500/10 text-green-600 border-green-500/20',
  Medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  Hard: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const confidenceLabels = ['Not confident', 'Somewhat', 'Okay', 'Good', 'Mastered'];

export default function ProblemsPage() {
  const [problemStatus, setProblemStatus] = useState<Record<string, SolvedStatus>>({});
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'name' | 'difficulty'>('name');

  const categories = Array.from(new Set(PROBLEMS.map(p => p.category)));
  const companies = Array.from(new Set(PROBLEMS.flatMap(p => p.companies || []))).sort();

  useEffect(() => {
    const saved = localStorage.getItem('problemStatus');
    if (saved) {
      try {
        setProblemStatus(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing localStorage:', e);
      }
    }
    // Expand all categories by default
    setExpandedCategories(new Set(categories));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('problemStatus', JSON.stringify(problemStatus));
    }
  }, [problemStatus, mounted]);

  const toggleProblem = (problemName: string) => {
    setProblemStatus(prev => ({
      ...prev,
      [problemName]: {
        ...prev[problemName],
        solved: !prev[problemName]?.solved,
        timestamp: !prev[problemName]?.solved ? Date.now() : prev[problemName]?.timestamp,
        notes: prev[problemName]?.notes || '',
      },
    }));
  };

  const updateConfidence = (problemName: string, confidence: number) => {
    setProblemStatus(prev => ({
      ...prev,
      [problemName]: {
        ...prev[problemName],
        confidence,
        solved: prev[problemName]?.solved || false,
        timestamp: prev[problemName]?.timestamp || Date.now(),
        notes: prev[problemName]?.notes || '',
      },
    }));
  };

  const filteredProblems = useMemo(() => {
    return PROBLEMS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.patterns?.some(pat => pat.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesDifficulty = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesCompany = companyFilter === 'all' || p.companies?.includes(companyFilter);
      
      let matchesStatus = true;
      if (statusFilter === 'solved') {
        matchesStatus = problemStatus[p.name]?.solved === true;
      } else if (statusFilter === 'unsolved') {
        matchesStatus = !problemStatus[p.name]?.solved;
      }
      
      return matchesSearch && matchesDifficulty && matchesCategory && matchesStatus && matchesCompany;
    });
  }, [searchQuery, difficultyFilter, categoryFilter, statusFilter, companyFilter, problemStatus]);

  const groupedProblems = useMemo(() => {
    const grouped: Record<string, Problem[]> = {};
    filteredProblems.forEach(p => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    });
    return grouped;
  }, [filteredProblems]);

  const stats = useMemo(() => {
    const solved = Object.values(problemStatus).filter(s => s.solved).length;
    const easy = PROBLEMS.filter(p => p.difficulty === 'Easy' && problemStatus[p.name]?.solved).length;
    const medium = PROBLEMS.filter(p => p.difficulty === 'Medium' && problemStatus[p.name]?.solved).length;
    const hard = PROBLEMS.filter(p => p.difficulty === 'Hard' && problemStatus[p.name]?.solved).length;
    return { solved, easy, medium, hard, total: PROBLEMS.length };
  }, [problemStatus]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">DSA Problems</h1>
              <p className="text-muted-foreground">
                {stats.solved} / {stats.total} solved • 
                <span className="text-green-600 ml-2">{stats.easy} Easy</span> • 
                <span className="text-yellow-600 ml-2">{stats.medium} Medium</span> • 
                <span className="text-red-600 ml-2">{stats.hard} Hard</span>
              </p>
            </div>
            
            {/* Progress */}
            <div className="w-full lg:w-64">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{Math.round((stats.solved / stats.total) * 100)}%</span>
              </div>
              <Progress value={(stats.solved / stats.total) * 100} className="h-2" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search problems, patterns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map(company => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Problems</SelectItem>
                  <SelectItem value="solved">Solved</SelectItem>
                  <SelectItem value="unsolved">Unsolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Problems List */}
        <div className="space-y-4">
          {Object.entries(groupedProblems).map(([category, problems]) => (
            <Collapsible
              key={category}
              open={expandedCategories.has(category)}
              onOpenChange={() => toggleCategory(category)}
            >
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {expandedCategories.has(category) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                        <CardTitle className="text-xl">{category}</CardTitle>
                        <Badge variant="secondary">
                          {problems.filter(p => problemStatus[p.name]?.solved).length}/{problems.length}
                        </Badge>
                      </div>
                      <Progress 
                        value={(problems.filter(p => problemStatus[p.name]?.solved).length / problems.length) * 100} 
                        className="w-32 h-2"
                      />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="divide-y divide-border">
                      {problems.map((problem) => {
                        const status = problemStatus[problem.name];
                        const isSolved = status?.solved;
                        
                        return (
                          <div
                            key={problem.name}
                            className={`py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                              isSolved ? 'bg-green-500/5' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3 flex-1">
                              <button
                                onClick={() => toggleProblem(problem.name)}
                                className="mt-1 hover:scale-110 transition-transform"
                              >
                                {isSolved ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Circle className="w-5 h-5 text-muted-foreground" />
                                )}
                              </button>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <a
                                    href={problem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`font-medium hover:text-primary transition-colors ${
                                      isSolved ? 'line-through text-muted-foreground' : ''
                                    }`}
                                  >
                                    {problem.name}
                                    <ExternalLink className="inline w-3 h-3 ml-1" />
                                  </a>
                                  <Badge className={difficultyColors[problem.difficulty]}>
                                    {problem.difficulty}
                                  </Badge>
                                </div>
                                {problem.patterns && (
                                  <div className="flex items-center gap-1 mt-1 flex-wrap">
                                    {problem.patterns.map(pattern => (
                                      <Badge key={pattern} variant="outline" className="text-xs">
                                        {pattern}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                                {problem.companies && problem.companies.length > 0 && (
                                  <div className="text-xs text-muted-foreground mt-1">
                                    Asked at: {problem.companies.slice(0, 4).join(', ')}
                                    {problem.companies.length > 4 && ` +${problem.companies.length - 4} more`}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Confidence Rating */}
                            <div className="flex items-center gap-1 ml-8 md:ml-0">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <button
                                  key={level}
                                  onClick={() => updateConfidence(problem.name, level)}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                    (status?.confidence || 0) >= level
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-muted hover:bg-muted-foreground/20'
                                  }`}
                                  title={confidenceLabels[level - 1]}
                                >
                                  <Star className="w-3 h-3" />
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <Card className="py-12">
            <CardContent className="text-center text-muted-foreground">
              <p className="text-lg">No problems found matching your filters.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setDifficultyFilter('all');
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setCompanyFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
