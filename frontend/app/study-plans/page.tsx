'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Clock, Target, Calendar, ChevronRight, Play,
  CheckCircle2, Lock, Rocket, Star, Zap, Trophy, Brain
} from 'lucide-react';

interface StudyPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalProblems: number;
  topics: string[];
  icon: React.ReactNode;
  weeks: { week: number; focus: string; problems: string[] }[];
  enrolled?: boolean;
  progress?: number;
}

const STUDY_PLANS: StudyPlan[] = [
  {
    id: 'beginner',
    name: 'DSA Fundamentals',
    description: 'Start your coding interview journey with fundamental patterns and easy problems.',
    duration: '4 weeks',
    difficulty: 'Beginner',
    totalProblems: 40,
    topics: ['Arrays', 'Strings', 'Hash Maps', 'Two Pointers', 'Basic Recursion'],
    icon: <Rocket className="w-6 h-6" />,
    weeks: [
      { week: 1, focus: 'Arrays & Strings Basics', problems: ['Two Sum', 'Contains Duplicate', 'Valid Palindrome', 'Reverse String', 'Valid Anagram', 'Best Time to Buy and Sell Stock', 'Merge Sorted Array', 'Remove Duplicates from Sorted Array', 'Maximum Subarray', 'Plus One'] },
      { week: 2, focus: 'Hash Maps & Sets', problems: ['Single Number', 'Intersection of Two Arrays', 'Happy Number', 'Roman to Integer', 'Missing Number', 'First Unique Character in a String', 'Isomorphic Strings', 'Word Pattern', 'Ransom Note', 'Majority Element'] },
      { week: 3, focus: 'Two Pointers', problems: ['Move Zeroes', 'Squares of a Sorted Array', 'Backspace String Compare', 'Remove Element', 'Reverse Linked List', 'Middle of the Linked List', 'Linked List Cycle', 'Merge Two Sorted Lists', 'Remove Linked List Elements', 'Palindrome Linked List'] },
      { week: 4, focus: 'Intro to Recursion', problems: ['Fibonacci Number', 'Climbing Stairs', 'Power of Two', 'Power of Three', 'Reverse Linked List', 'Merge Two Sorted Lists', 'Maximum Depth of Binary Tree', 'Invert Binary Tree', 'Same Tree', 'Symmetric Tree'] },
    ],
  },
  {
    id: 'blind75',
    name: 'Blind 75',
    description: 'The famous 75 problems curated for efficient interview preparation.',
    duration: '6 weeks',
    difficulty: 'Intermediate',
    totalProblems: 75,
    topics: ['Arrays', 'Two Pointers', 'Binary Search', 'Trees', 'Graphs', 'DP', 'Heap'],
    icon: <Star className="w-6 h-6" />,
    weeks: [
      { week: 1, focus: 'Arrays & Hashing', problems: ['Two Sum', 'Best Time to Buy and Sell Stock', 'Contains Duplicate', 'Product of Array Except Self', 'Maximum Subarray', 'Maximum Product Subarray', 'Find Minimum in Rotated Sorted Array', 'Search in Rotated Sorted Array', 'Three Sum', 'Container With Most Water', 'Longest Consecutive Sequence'] },
      { week: 2, focus: 'Two Pointers & Sliding Window', problems: ['Valid Palindrome', 'Three Sum', 'Container With Most Water', 'Longest Substring Without Repeating Characters', 'Longest Repeating Character Replacement', 'Minimum Window Substring'] },
      { week: 3, focus: 'Linked Lists & Trees', problems: ['Reverse Linked List', 'Merge Two Sorted Lists', 'Linked List Cycle', 'Remove Nth Node From End', 'Reorder List', 'Maximum Depth of Binary Tree', 'Same Tree', 'Invert Binary Tree', 'Binary Tree Maximum Path Sum', 'Binary Tree Level Order Traversal', 'Serialize and Deserialize Binary Tree', 'Subtree of Another Tree', 'Construct Binary Tree from Preorder and Inorder Traversal', 'Validate Binary Search Tree', 'Kth Smallest Element in a BST', 'Lowest Common Ancestor of BST'] },
      { week: 4, focus: 'Graphs', problems: ['Number of Islands', 'Clone Graph', 'Pacific Atlantic Water Flow', 'Course Schedule', 'Number of Connected Components in an Undirected Graph', 'Graph Valid Tree', 'Alien Dictionary', 'Longest Consecutive Sequence'] },
      { week: 5, focus: 'Dynamic Programming', problems: ['Climbing Stairs', 'House Robber', 'House Robber II', 'Longest Palindromic Substring', 'Palindromic Substrings', 'Decode Ways', 'Coin Change', 'Maximum Product Subarray', 'Word Break', 'Longest Increasing Subsequence', 'Unique Paths', 'Jump Game'] },
      { week: 6, focus: 'DP & Intervals', problems: ['Merge Intervals', 'Non-overlapping Intervals', 'Meeting Rooms', 'Meeting Rooms II', 'Rotate Image', 'Spiral Matrix', 'Set Matrix Zeroes', 'Word Search', 'Longest Common Subsequence', 'Combination Sum', 'Combination Sum IV'] },
    ],
  },
  {
    id: 'neetcode150',
    name: 'NeetCode 150',
    description: 'Extended and improved version of Blind 75 with better problem selection.',
    duration: '8 weeks',
    difficulty: 'Intermediate',
    totalProblems: 150,
    topics: ['Arrays', 'Stack', 'Binary Search', 'Heap', 'Backtracking', 'Tries', 'Graphs', 'DP'],
    icon: <Zap className="w-6 h-6" />,
    weeks: [
      { week: 1, focus: 'Arrays & Hashing', problems: ['Contains Duplicate', 'Valid Anagram', 'Two Sum', 'Group Anagrams', 'Top K Frequent Elements', 'Product of Array Except Self', 'Valid Sudoku', 'Encode and Decode Strings', 'Longest Consecutive Sequence'] },
      { week: 2, focus: 'Two Pointers & Stack', problems: ['Valid Palindrome', '3Sum', 'Container With Most Water', 'Trapping Rain Water', 'Valid Parentheses', 'Min Stack', 'Evaluate Reverse Polish Notation', 'Generate Parentheses', 'Daily Temperatures', 'Car Fleet', 'Largest Rectangle In Histogram'] },
      { week: 3, focus: 'Binary Search & Sliding Window', problems: ['Binary Search', 'Search a 2D Matrix', 'Koko Eating Bananas', 'Find Minimum In Rotated Sorted Array', 'Search In Rotated Sorted Array', 'Time Based Key Value Store', 'Median of Two Sorted Arrays', 'Best Time to Buy And Sell Stock', 'Longest Substring Without Repeating Characters', 'Longest Repeating Character Replacement', 'Permutation In String', 'Minimum Window Substring', 'Sliding Window Maximum'] },
      { week: 4, focus: 'Linked Lists', problems: ['Reverse Linked List', 'Merge Two Sorted Lists', 'Reorder List', 'Remove Nth Node From End of List', 'Copy List With Random Pointer', 'Add Two Numbers', 'Linked List Cycle', 'Find The Duplicate Number', 'LRU Cache', 'Merge K Sorted Lists', 'Reverse Nodes In K Group'] },
      { week: 5, focus: 'Trees', problems: ['Invert Binary Tree', 'Maximum Depth of Binary Tree', 'Diameter of Binary Tree', 'Balanced Binary Tree', 'Same Tree', 'Subtree of Another Tree', 'Lowest Common Ancestor of a Binary Search Tree', 'Binary Tree Level Order Traversal', 'Binary Tree Right Side View', 'Count Good Nodes In Binary Tree', 'Validate Binary Search Tree', 'Kth Smallest Element In a BST', 'Construct Binary Tree From Preorder And Inorder Traversal', 'Binary Tree Maximum Path Sum', 'Serialize And Deserialize Binary Tree'] },
      { week: 6, focus: 'Heap, Backtracking & Tries', problems: ['Kth Largest Element In a Stream', 'Last Stone Weight', 'K Closest Points to Origin', 'Kth Largest Element In An Array', 'Task Scheduler', 'Design Twitter', 'Find Median From Data Stream', 'Subsets', 'Combination Sum', 'Permutations', 'Subsets II', 'Combination Sum II', 'Word Search', 'Palindrome Partitioning', 'Letter Combinations of a Phone Number', 'N Queens', 'Implement Trie Prefix Tree', 'Design Add And Search Words Data Structure', 'Word Search II'] },
      { week: 7, focus: 'Graphs', problems: ['Number of Islands', 'Clone Graph', 'Max Area of Island', 'Pacific Atlantic Water Flow', 'Surrounded Regions', 'Rotting Oranges', 'Walls And Gates', 'Course Schedule', 'Course Schedule II', 'Redundant Connection', 'Number of Connected Components In An Undirected Graph', 'Graph Valid Tree', 'Word Ladder', 'Reconstruct Itinerary', 'Min Cost to Connect All Points', 'Network Delay Time', 'Swim In Rising Water', 'Alien Dictionary', 'Cheapest Flights Within K Stops'] },
      { week: 8, focus: 'Dynamic Programming', problems: ['Climbing Stairs', 'Min Cost Climbing Stairs', 'House Robber', 'House Robber II', 'Longest Palindromic Substring', 'Palindromic Substrings', 'Decode Ways', 'Coin Change', 'Maximum Product Subarray', 'Word Break', 'Longest Increasing Subsequence', 'Partition Equal Subset Sum', 'Unique Paths', 'Longest Common Subsequence', 'Best Time to Buy and Sell Stock with Cooldown', 'Coin Change II', 'Target Sum', 'Interleaving String', 'Longest Increasing Path In a Matrix', 'Distinct Subsequences', 'Edit Distance', 'Burst Balloons', 'Regular Expression Matching'] },
    ],
  },
  {
    id: 'company-prep',
    name: 'FAANG Interview Prep',
    description: 'Focused preparation for top tech company interviews.',
    duration: '10 weeks',
    difficulty: 'Advanced',
    totalProblems: 120,
    topics: ['System Design', 'Behavioral', 'Hard DP', 'Advanced Graphs', 'Concurrency'],
    icon: <Trophy className="w-6 h-6" />,
    weeks: [
      { week: 1, focus: 'Foundation Review', problems: ['Review core patterns', 'Time complexity optimization', 'Space complexity optimization'] },
      { week: 2, focus: 'Google-style Problems', problems: ['Hard DP problems', 'Advanced graph algorithms', 'String manipulation'] },
      { week: 3, focus: 'Amazon-style Problems', problems: ['System design basics', 'Leadership principles prep', 'OOP design'] },
      { week: 4, focus: 'Meta-style Problems', problems: ['Speed practice', 'Two problems per session', 'Edge cases'] },
      { week: 5, focus: 'System Design I', problems: ['Design Twitter', 'Design URL Shortener', 'Design Rate Limiter'] },
      { week: 6, focus: 'System Design II', problems: ['Design Netflix', 'Design Uber', 'Design Messenger'] },
      { week: 7, focus: 'Behavioral Prep', problems: ['STAR method stories', 'Company research', 'Culture fit'] },
      { week: 8, focus: 'Mock Interviews', problems: ['Full interview simulations', 'Feedback sessions', 'Improvement areas'] },
      { week: 9, focus: 'Hard Problems', problems: ['Hard DP', 'Hard graphs', 'Hard trees'] },
      { week: 10, focus: 'Final Review', problems: ['Review weak areas', 'Company-specific prep', 'Final mock interviews'] },
    ],
  },
  {
    id: 'advanced-dp',
    name: 'Advanced DP Mastery',
    description: 'Deep dive into dynamic programming for those who want to master the hardest problems.',
    duration: '6 weeks',
    difficulty: 'Advanced',
    totalProblems: 50,
    topics: ['1D DP', '2D DP', 'State Machine', 'Interval DP', 'Bitmask DP', 'Digit DP'],
    icon: <Brain className="w-6 h-6" />,
    weeks: [
      { week: 1, focus: '1D Dynamic Programming', problems: ['House Robber', 'House Robber II', 'Decode Ways', 'Coin Change', 'Word Break', 'Maximum Product Subarray', 'Longest Increasing Subsequence', 'Perfect Squares'] },
      { week: 2, focus: '2D Dynamic Programming', problems: ['Unique Paths', 'Unique Paths II', 'Minimum Path Sum', 'Triangle', 'Maximal Square', 'Edit Distance', 'Longest Common Subsequence', 'Distinct Subsequences'] },
      { week: 3, focus: 'String DP', problems: ['Longest Palindromic Substring', 'Palindromic Substrings', 'Longest Palindromic Subsequence', 'Shortest Common Supersequence', 'Interleaving String', 'Regular Expression Matching', 'Wildcard Matching'] },
      { week: 4, focus: 'State Machine DP', problems: ['Best Time to Buy and Sell Stock II', 'Best Time to Buy and Sell Stock III', 'Best Time to Buy and Sell Stock IV', 'Best Time to Buy and Sell Stock with Cooldown', 'Best Time to Buy and Sell Stock with Transaction Fee'] },
      { week: 5, focus: 'Interval & Game DP', problems: ['Burst Balloons', 'Matrix Chain Multiplication', 'Minimum Cost to Merge Stones', 'Stone Game', 'Stone Game II', 'Predict the Winner', 'Partition Array for Maximum Sum'] },
      { week: 6, focus: 'Advanced Techniques', problems: ['Target Sum', 'Partition Equal Subset Sum', 'Ones and Zeroes', 'Coin Change II', 'Combination Sum IV', 'Cherry Pickup', 'Frog Jump', 'Concatenated Words'] },
    ],
  },
];

const difficultyColors = {
  Beginner: 'bg-green-500/10 text-green-700 border-green-500/20',
  Intermediate: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
  Advanced: 'bg-red-500/10 text-red-700 border-red-500/20',
};

export default function StudyPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [enrolledPlans, setEnrolledPlans] = useState<string[]>([]);

  const handleEnroll = (planId: string) => {
    if (enrolledPlans.includes(planId)) {
      setEnrolledPlans(enrolledPlans.filter(id => id !== planId));
    } else {
      setEnrolledPlans([...enrolledPlans, planId]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Study Plans</h1>
          </div>
          <p className="text-muted-foreground">
            Structured learning paths to prepare for your technical interviews
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedPlan ? (
          <div className="space-y-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedPlan(null)}
              className="mb-4"
            >
              ← Back to all plans
            </Button>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {selectedPlan.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{selectedPlan.name}</CardTitle>
                      <CardDescription>{selectedPlan.description}</CardDescription>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleEnroll(selectedPlan.id)}
                    variant={enrolledPlans.includes(selectedPlan.id) ? "outline" : "default"}
                  >
                    {enrolledPlans.includes(selectedPlan.id) ? 'Enrolled ✓' : 'Start Plan'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <p className="font-semibold">{selectedPlan.duration}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Target className="w-4 h-4" />
                      <span className="text-sm">Problems</span>
                    </div>
                    <p className="font-semibold">{selectedPlan.totalProblems}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Weeks</span>
                    </div>
                    <p className="font-semibold">{selectedPlan.weeks.length}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">Level</span>
                    </div>
                    <p className="font-semibold">{selectedPlan.difficulty}</p>
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <h3 className="font-semibold mb-2">Topics Covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlan.topics.map((topic) => (
                      <Badge key={topic} variant="secondary">{topic}</Badge>
                    ))}
                  </div>
                </div>

                {/* Weekly Breakdown */}
                <div>
                  <h3 className="font-semibold mb-4">Weekly Schedule</h3>
                  <div className="space-y-4">
                    {selectedPlan.weeks.map((week, idx) => (
                      <Card key={idx} className="border-l-4 border-l-primary">
                        <CardContent className="py-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold flex items-center gap-2">
                                Week {week.week}: {week.focus}
                                {enrolledPlans.includes(selectedPlan.id) && idx === 0 && (
                                  <Badge className="bg-primary">Current</Badge>
                                )}
                              </h4>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {week.problems.slice(0, 5).map((problem, pIdx) => (
                                  <Badge key={pIdx} variant="outline" className="text-xs">
                                    {problem}
                                  </Badge>
                                ))}
                                {week.problems.length > 5 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{week.problems.length - 5} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {enrolledPlans.includes(selectedPlan.id) ? (
                              idx === 0 ? (
                                <Button size="sm">
                                  <Play className="w-4 h-4 mr-2" /> Start
                                </Button>
                              ) : (
                                <Lock className="w-5 h-5 text-muted-foreground" />
                              )
                            ) : null}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STUDY_PLANS.map((plan) => (
              <Card 
                key={plan.id} 
                className="cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setSelectedPlan(plan)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                      {plan.icon}
                    </div>
                    <Badge className={difficultyColors[plan.difficulty]}>
                      {plan.difficulty}
                    </Badge>
                  </div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {plan.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" /> {plan.totalProblems} problems
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {plan.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {plan.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{plan.topics.length - 3}
                      </Badge>
                    )}
                  </div>

                  {enrolledPlans.includes(plan.id) ? (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                  ) : (
                    <Button variant="outline" className="w-full">
                      View Plan <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
