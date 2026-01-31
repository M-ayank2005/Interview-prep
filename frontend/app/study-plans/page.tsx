'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, Clock, Target, Calendar, ChevronRight, Play, ArrowLeft,
  CheckCircle2, Circle, Rocket, Star, Zap, Brain, 
  ExternalLink, Flame, Code
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ProblemItem {
  name: string;
  url: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface WeekData {
  week: number;
  focus: string;
  problems: ProblemItem[];
}

interface StudyPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalProblems: number;
  topics: string[];
  icon: React.ReactNode;
  weeks: WeekData[];
}

// Helper to create LeetCode problem URL
const lc = (slug: string) => `https://leetcode.com/problems/${slug}/`;

const STUDY_PLANS: StudyPlan[] = [
  {
    id: 'striver-sde',
    name: "Striver's SDE Sheet",
    description: "The famous Striver's SDE sheet - 191 problems covering all important topics for product-based company interviews.",
    duration: '8-10 weeks',
    difficulty: 'Intermediate',
    totalProblems: 191,
    topics: ['Arrays', 'Linked List', 'Greedy', 'Recursion', 'Backtracking', 'Binary Search', 'Heap', 'Stack', 'Queue', 'Trees', 'Graphs', 'DP', 'Tries'],
    icon: <Code className="w-6 h-6" />,
    weeks: [
      { 
        week: 1, 
        focus: 'Arrays Part I', 
        problems: [
          { name: 'Set Matrix Zeroes', url: lc('set-matrix-zeroes'), difficulty: 'Medium' },
          { name: 'Pascal\'s Triangle', url: lc('pascals-triangle'), difficulty: 'Easy' },
          { name: 'Next Permutation', url: lc('next-permutation'), difficulty: 'Medium' },
          { name: 'Maximum Subarray (Kadane\'s)', url: lc('maximum-subarray'), difficulty: 'Medium' },
          { name: 'Sort Colors (Dutch National Flag)', url: lc('sort-colors'), difficulty: 'Medium' },
          { name: 'Best Time to Buy and Sell Stock', url: lc('best-time-to-buy-and-sell-stock'), difficulty: 'Easy' },
        ]
      },
      { 
        week: 2, 
        focus: 'Arrays Part II', 
        problems: [
          { name: 'Rotate Image', url: lc('rotate-image'), difficulty: 'Medium' },
          { name: 'Merge Intervals', url: lc('merge-intervals'), difficulty: 'Medium' },
          { name: 'Merge Sorted Array', url: lc('merge-sorted-array'), difficulty: 'Easy' },
          { name: 'Find the Duplicate Number', url: lc('find-the-duplicate-number'), difficulty: 'Medium' },
          { name: 'Repeat and Missing Number', url: 'https://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/', difficulty: 'Medium' },
          { name: 'Inversion Count', url: 'https://www.geeksforgeeks.org/counting-inversions/', difficulty: 'Hard' },
        ]
      },
      { 
        week: 3, 
        focus: 'Arrays Part III & Math', 
        problems: [
          { name: 'Search in 2D Matrix', url: lc('search-a-2d-matrix'), difficulty: 'Medium' },
          { name: 'Pow(x, n)', url: lc('powx-n'), difficulty: 'Medium' },
          { name: 'Majority Element', url: lc('majority-element'), difficulty: 'Easy' },
          { name: 'Majority Element II', url: lc('majority-element-ii'), difficulty: 'Medium' },
          { name: 'Grid Unique Paths', url: lc('unique-paths'), difficulty: 'Medium' },
          { name: 'Reverse Pairs', url: lc('reverse-pairs'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 4, 
        focus: 'Arrays Part IV & Hashing', 
        problems: [
          { name: '2 Sum', url: lc('two-sum'), difficulty: 'Easy' },
          { name: '4 Sum', url: lc('4sum'), difficulty: 'Medium' },
          { name: 'Longest Consecutive Sequence', url: lc('longest-consecutive-sequence'), difficulty: 'Medium' },
          { name: 'Largest Subarray with 0 Sum', url: 'https://www.geeksforgeeks.org/find-the-largest-subarray-with-0-sum/', difficulty: 'Medium' },
          { name: 'Count Subarrays with XOR K', url: 'https://www.geeksforgeeks.org/count-number-subarrays-given-xor/', difficulty: 'Medium' },
          { name: 'Longest Substring Without Repeat', url: lc('longest-substring-without-repeating-characters'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 5, 
        focus: 'Linked List Part I', 
        problems: [
          { name: 'Reverse Linked List', url: lc('reverse-linked-list'), difficulty: 'Easy' },
          { name: 'Middle of Linked List', url: lc('middle-of-the-linked-list'), difficulty: 'Easy' },
          { name: 'Merge Two Sorted Lists', url: lc('merge-two-sorted-lists'), difficulty: 'Easy' },
          { name: 'Remove Nth Node From End', url: lc('remove-nth-node-from-end-of-list'), difficulty: 'Medium' },
          { name: 'Add Two Numbers', url: lc('add-two-numbers'), difficulty: 'Medium' },
          { name: 'Delete Node in Linked List', url: lc('delete-node-in-a-linked-list'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 6, 
        focus: 'Linked List Part II', 
        problems: [
          { name: 'Intersection of Two Linked Lists', url: lc('intersection-of-two-linked-lists'), difficulty: 'Easy' },
          { name: 'Linked List Cycle', url: lc('linked-list-cycle'), difficulty: 'Easy' },
          { name: 'Reverse Nodes in k-Group', url: lc('reverse-nodes-in-k-group'), difficulty: 'Hard' },
          { name: 'Palindrome Linked List', url: lc('palindrome-linked-list'), difficulty: 'Easy' },
          { name: 'Linked List Cycle II', url: lc('linked-list-cycle-ii'), difficulty: 'Medium' },
          { name: 'Flatten a Linked List', url: 'https://www.geeksforgeeks.org/flattening-a-linked-list/', difficulty: 'Medium' },
          { name: 'Rotate List', url: lc('rotate-list'), difficulty: 'Medium' },
          { name: 'Copy List with Random Pointer', url: lc('copy-list-with-random-pointer'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 7, 
        focus: 'Two Pointers & Greedy', 
        problems: [
          { name: '3Sum', url: lc('3sum'), difficulty: 'Medium' },
          { name: 'Trapping Rain Water', url: lc('trapping-rain-water'), difficulty: 'Hard' },
          { name: 'Remove Duplicates from Sorted Array', url: lc('remove-duplicates-from-sorted-array'), difficulty: 'Easy' },
          { name: 'Max Consecutive Ones', url: lc('max-consecutive-ones'), difficulty: 'Easy' },
          { name: 'N Meetings in One Room', url: 'https://www.geeksforgeeks.org/n-meetings-in-one-room/', difficulty: 'Easy' },
          { name: 'Minimum Platforms', url: 'https://www.geeksforgeeks.org/minimum-number-platforms-required-railwaybus-station/', difficulty: 'Medium' },
          { name: 'Job Sequencing Problem', url: 'https://www.geeksforgeeks.org/job-sequencing-problem/', difficulty: 'Medium' },
          { name: 'Fractional Knapsack', url: 'https://www.geeksforgeeks.org/fractional-knapsack-problem/', difficulty: 'Medium' },
          { name: 'Assign Cookies', url: lc('assign-cookies'), difficulty: 'Easy' },
        ]
      },
      { 
        week: 8, 
        focus: 'Recursion & Backtracking', 
        problems: [
          { name: 'Subset Sum', url: 'https://www.geeksforgeeks.org/subset-sum-problem-dp-25/', difficulty: 'Medium' },
          { name: 'Subsets II', url: lc('subsets-ii'), difficulty: 'Medium' },
          { name: 'Combination Sum', url: lc('combination-sum'), difficulty: 'Medium' },
          { name: 'Combination Sum II', url: lc('combination-sum-ii'), difficulty: 'Medium' },
          { name: 'Palindrome Partitioning', url: lc('palindrome-partitioning'), difficulty: 'Medium' },
          { name: 'Permutation Sequence', url: lc('permutation-sequence'), difficulty: 'Hard' },
          { name: 'Permutations', url: lc('permutations'), difficulty: 'Medium' },
          { name: 'N-Queens', url: lc('n-queens'), difficulty: 'Hard' },
          { name: 'Sudoku Solver', url: lc('sudoku-solver'), difficulty: 'Hard' },
          { name: 'M Coloring Problem', url: 'https://www.geeksforgeeks.org/m-coloring-problem-backtracking-5/', difficulty: 'Medium' },
          { name: 'Rat in a Maze', url: 'https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/', difficulty: 'Medium' },
          { name: 'Word Break', url: lc('word-break'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 9, 
        focus: 'Binary Search', 
        problems: [
          { name: 'Nth Root of M', url: 'https://www.geeksforgeeks.org/n-th-root-number/', difficulty: 'Medium' },
          { name: 'Single Element in Sorted Array', url: lc('single-element-in-a-sorted-array'), difficulty: 'Medium' },
          { name: 'Search in Rotated Sorted Array', url: lc('search-in-rotated-sorted-array'), difficulty: 'Medium' },
          { name: 'Median of Two Sorted Arrays', url: lc('median-of-two-sorted-arrays'), difficulty: 'Hard' },
          { name: 'Kth Element of Two Arrays', url: 'https://www.geeksforgeeks.org/k-th-element-two-sorted-arrays/', difficulty: 'Medium' },
          { name: 'Allocate Minimum Pages', url: 'https://www.geeksforgeeks.org/allocate-minimum-number-pages/', difficulty: 'Hard' },
          { name: 'Aggressive Cows', url: 'https://www.spoj.com/problems/AGGRCOW/', difficulty: 'Hard' },
        ]
      },
      { 
        week: 10, 
        focus: 'Stack & Queue', 
        problems: [
          { name: 'Implement Stack using Arrays', url: 'https://www.geeksforgeeks.org/stack-data-structure-introduction-program/', difficulty: 'Easy' },
          { name: 'Implement Queue using Arrays', url: 'https://www.geeksforgeeks.org/array-implementation-of-queue-simple/', difficulty: 'Easy' },
          { name: 'Implement Stack using Queue', url: lc('implement-stack-using-queues'), difficulty: 'Easy' },
          { name: 'Implement Queue using Stack', url: lc('implement-queue-using-stacks'), difficulty: 'Easy' },
          { name: 'Valid Parentheses', url: lc('valid-parentheses'), difficulty: 'Easy' },
          { name: 'Next Greater Element', url: lc('next-greater-element-i'), difficulty: 'Easy' },
          { name: 'Sort Stack', url: 'https://www.geeksforgeeks.org/sort-a-stack-using-recursion/', difficulty: 'Medium' },
          { name: 'Next Smaller Element', url: 'https://www.geeksforgeeks.org/next-smaller-element/', difficulty: 'Medium' },
          { name: 'LRU Cache', url: lc('lru-cache'), difficulty: 'Medium' },
          { name: 'LFU Cache', url: lc('lfu-cache'), difficulty: 'Hard' },
          { name: 'Largest Rectangle in Histogram', url: lc('largest-rectangle-in-histogram'), difficulty: 'Hard' },
          { name: 'Sliding Window Maximum', url: lc('sliding-window-maximum'), difficulty: 'Hard' },
          { name: 'Min Stack', url: lc('min-stack'), difficulty: 'Medium' },
          { name: 'Rotting Oranges', url: lc('rotting-oranges'), difficulty: 'Medium' },
          { name: 'Online Stock Span', url: lc('online-stock-span'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 11, 
        focus: 'Binary Trees Part I', 
        problems: [
          { name: 'Inorder Traversal', url: lc('binary-tree-inorder-traversal'), difficulty: 'Easy' },
          { name: 'Preorder Traversal', url: lc('binary-tree-preorder-traversal'), difficulty: 'Easy' },
          { name: 'Postorder Traversal', url: lc('binary-tree-postorder-traversal'), difficulty: 'Easy' },
          { name: 'Level Order Traversal', url: lc('binary-tree-level-order-traversal'), difficulty: 'Medium' },
          { name: 'Maximum Depth of Binary Tree', url: lc('maximum-depth-of-binary-tree'), difficulty: 'Easy' },
          { name: 'Balanced Binary Tree', url: lc('balanced-binary-tree'), difficulty: 'Easy' },
          { name: 'Diameter of Binary Tree', url: lc('diameter-of-binary-tree'), difficulty: 'Easy' },
          { name: 'Binary Tree Maximum Path Sum', url: lc('binary-tree-maximum-path-sum'), difficulty: 'Hard' },
          { name: 'Same Tree', url: lc('same-tree'), difficulty: 'Easy' },
          { name: 'Binary Tree Zigzag Level Order', url: lc('binary-tree-zigzag-level-order-traversal'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 12, 
        focus: 'Binary Trees Part II', 
        problems: [
          { name: 'Boundary Traversal', url: 'https://www.geeksforgeeks.org/boundary-traversal-of-binary-tree/', difficulty: 'Medium' },
          { name: 'Vertical Order Traversal', url: lc('vertical-order-traversal-of-a-binary-tree'), difficulty: 'Hard' },
          { name: 'Top View of Binary Tree', url: 'https://www.geeksforgeeks.org/print-nodes-top-view-binary-tree/', difficulty: 'Medium' },
          { name: 'Bottom View of Binary Tree', url: 'https://www.geeksforgeeks.org/bottom-view-binary-tree/', difficulty: 'Medium' },
          { name: 'Right Side View', url: lc('binary-tree-right-side-view'), difficulty: 'Medium' },
          { name: 'Left Side View', url: 'https://www.geeksforgeeks.org/print-left-view-binary-tree/', difficulty: 'Medium' },
          { name: 'Symmetric Tree', url: lc('symmetric-tree'), difficulty: 'Easy' },
          { name: 'Root to Node Path', url: 'https://www.geeksforgeeks.org/print-path-root-given-node-binary-tree/', difficulty: 'Medium' },
          { name: 'Lowest Common Ancestor', url: lc('lowest-common-ancestor-of-a-binary-tree'), difficulty: 'Medium' },
          { name: 'Width of Binary Tree', url: lc('maximum-width-of-binary-tree'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 13, 
        focus: 'Binary Trees Part III', 
        problems: [
          { name: 'Children Sum Property', url: 'https://www.geeksforgeeks.org/convert-an-arbitrary-binary-tree-to-a-tree-that-holds-children-sum-property/', difficulty: 'Medium' },
          { name: 'All Nodes at Distance K', url: lc('all-nodes-distance-k-in-binary-tree'), difficulty: 'Medium' },
          { name: 'Burning Tree', url: 'https://www.geeksforgeeks.org/burn-the-binary-tree-starting-from-the-target-node/', difficulty: 'Hard' },
          { name: 'Count Complete Tree Nodes', url: lc('count-complete-tree-nodes'), difficulty: 'Medium' },
          { name: 'Construct Tree from Inorder & Preorder', url: lc('construct-binary-tree-from-preorder-and-inorder-traversal'), difficulty: 'Medium' },
          { name: 'Construct Tree from Inorder & Postorder', url: lc('construct-binary-tree-from-inorder-and-postorder-traversal'), difficulty: 'Medium' },
          { name: 'Serialize and Deserialize Binary Tree', url: lc('serialize-and-deserialize-binary-tree'), difficulty: 'Hard' },
          { name: 'Flatten Binary Tree to Linked List', url: lc('flatten-binary-tree-to-linked-list'), difficulty: 'Medium' },
          { name: 'Morris Inorder Traversal', url: 'https://www.geeksforgeeks.org/inorder-tree-traversal-without-recursion-and-without-stack/', difficulty: 'Medium' },
          { name: 'Morris Preorder Traversal', url: 'https://www.geeksforgeeks.org/morris-traversal-for-preorder/', difficulty: 'Medium' },
        ]
      },
      { 
        week: 14, 
        focus: 'Binary Search Trees', 
        problems: [
          { name: 'Search in BST', url: lc('search-in-a-binary-search-tree'), difficulty: 'Easy' },
          { name: 'Ceil in BST', url: 'https://www.geeksforgeeks.org/floor-and-ceil-from-a-bst/', difficulty: 'Medium' },
          { name: 'Floor in BST', url: 'https://www.geeksforgeeks.org/floor-in-binary-search-tree-bst/', difficulty: 'Medium' },
          { name: 'Insert into BST', url: lc('insert-into-a-binary-search-tree'), difficulty: 'Medium' },
          { name: 'Delete Node in BST', url: lc('delete-node-in-a-bst'), difficulty: 'Medium' },
          { name: 'Kth Smallest in BST', url: lc('kth-smallest-element-in-a-bst'), difficulty: 'Medium' },
          { name: 'Kth Largest in BST', url: 'https://www.geeksforgeeks.org/kth-largest-element-bst-using-constant-extra-space/', difficulty: 'Medium' },
          { name: 'Validate BST', url: lc('validate-binary-search-tree'), difficulty: 'Medium' },
          { name: 'LCA in BST', url: lc('lowest-common-ancestor-of-a-binary-search-tree'), difficulty: 'Medium' },
          { name: 'Construct BST from Preorder', url: lc('construct-binary-search-tree-from-preorder-traversal'), difficulty: 'Medium' },
          { name: 'Inorder Successor in BST', url: lc('inorder-successor-in-bst'), difficulty: 'Medium' },
          { name: 'BST Iterator', url: lc('binary-search-tree-iterator'), difficulty: 'Medium' },
          { name: 'Two Sum IV - BST', url: lc('two-sum-iv-input-is-a-bst'), difficulty: 'Easy' },
          { name: 'Recover BST', url: lc('recover-binary-search-tree'), difficulty: 'Medium' },
          { name: 'Largest BST in Binary Tree', url: 'https://www.geeksforgeeks.org/largest-bst-binary-tree-set-2/', difficulty: 'Hard' },
        ]
      },
      { 
        week: 15, 
        focus: 'Graphs Part I', 
        problems: [
          { name: 'Clone Graph', url: lc('clone-graph'), difficulty: 'Medium' },
          { name: 'DFS of Graph', url: 'https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/', difficulty: 'Easy' },
          { name: 'BFS of Graph', url: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/', difficulty: 'Easy' },
          { name: 'Detect Cycle in Undirected (BFS)', url: 'https://www.geeksforgeeks.org/detect-cycle-undirected-graph/', difficulty: 'Medium' },
          { name: 'Detect Cycle in Undirected (DFS)', url: 'https://www.geeksforgeeks.org/detect-cycle-undirected-graph/', difficulty: 'Medium' },
          { name: 'Detect Cycle in Directed (BFS)', url: lc('course-schedule'), difficulty: 'Medium' },
          { name: 'Detect Cycle in Directed (DFS)', url: lc('course-schedule'), difficulty: 'Medium' },
          { name: 'Topological Sort (BFS)', url: 'https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/', difficulty: 'Medium' },
          { name: 'Topological Sort (DFS)', url: 'https://www.geeksforgeeks.org/topological-sorting/', difficulty: 'Medium' },
          { name: 'Number of Islands', url: lc('number-of-islands'), difficulty: 'Medium' },
          { name: 'Bipartite Graph (BFS)', url: lc('is-graph-bipartite'), difficulty: 'Medium' },
          { name: 'Bipartite Graph (DFS)', url: lc('is-graph-bipartite'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 16, 
        focus: 'Graphs Part II', 
        problems: [
          { name: 'Strongly Connected Components', url: 'https://www.geeksforgeeks.org/strongly-connected-components/', difficulty: 'Hard' },
          { name: "Dijkstra's Algorithm", url: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/', difficulty: 'Medium' },
          { name: 'Bellman Ford Algorithm', url: 'https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/', difficulty: 'Medium' },
          { name: 'Floyd Warshall Algorithm', url: 'https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/', difficulty: 'Medium' },
          { name: "Prim's MST", url: 'https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/', difficulty: 'Medium' },
          { name: "Kruskal's MST", url: 'https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/', difficulty: 'Medium' },
        ]
      },
      { 
        week: 17, 
        focus: 'Dynamic Programming Part I', 
        problems: [
          { name: 'Max Product Subarray', url: lc('maximum-product-subarray'), difficulty: 'Medium' },
          { name: 'Longest Increasing Subsequence', url: lc('longest-increasing-subsequence'), difficulty: 'Medium' },
          { name: 'Longest Common Subsequence', url: lc('longest-common-subsequence'), difficulty: 'Medium' },
          { name: '0/1 Knapsack', url: 'https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/', difficulty: 'Medium' },
          { name: 'Edit Distance', url: lc('edit-distance'), difficulty: 'Medium' },
          { name: 'Maximum Sum Increasing Subsequence', url: 'https://www.geeksforgeeks.org/maximum-sum-increasing-subsequence-dp-14/', difficulty: 'Medium' },
          { name: 'Matrix Chain Multiplication', url: 'https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/', difficulty: 'Hard' },
        ]
      },
      { 
        week: 18, 
        focus: 'Dynamic Programming Part II', 
        problems: [
          { name: 'Minimum Path Sum', url: lc('minimum-path-sum'), difficulty: 'Medium' },
          { name: 'Coin Change', url: lc('coin-change'), difficulty: 'Medium' },
          { name: 'Partition Equal Subset Sum', url: lc('partition-equal-subset-sum'), difficulty: 'Medium' },
          { name: 'Rod Cutting', url: 'https://www.geeksforgeeks.org/cutting-a-rod-dp-13/', difficulty: 'Medium' },
          { name: 'Egg Dropping Problem', url: lc('super-egg-drop'), difficulty: 'Hard' },
          { name: 'Word Break', url: lc('word-break'), difficulty: 'Medium' },
          { name: 'Palindrome Partitioning II', url: lc('palindrome-partitioning-ii'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 19, 
        focus: 'Trie', 
        problems: [
          { name: 'Implement Trie', url: lc('implement-trie-prefix-tree'), difficulty: 'Medium' },
          { name: 'Implement Trie II', url: 'https://www.naukri.com/code360/problems/implement-trie_1387095', difficulty: 'Medium' },
          { name: 'Longest Word with All Prefixes', url: 'https://www.naukri.com/code360/problems/complete-string_2687860', difficulty: 'Medium' },
          { name: 'Count Distinct Substrings', url: 'https://www.naukri.com/code360/problems/count-distinct-substrings_985292', difficulty: 'Hard' },
          { name: 'Maximum XOR of Two Numbers', url: lc('maximum-xor-of-two-numbers-in-an-array'), difficulty: 'Medium' },
          { name: 'Maximum XOR With Element From Array', url: lc('maximum-xor-with-an-element-from-array'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 20, 
        focus: 'Strings', 
        problems: [
          { name: 'Reverse Words in String', url: lc('reverse-words-in-a-string'), difficulty: 'Medium' },
          { name: 'Longest Palindromic Substring', url: lc('longest-palindromic-substring'), difficulty: 'Medium' },
          { name: 'Roman to Integer', url: lc('roman-to-integer'), difficulty: 'Easy' },
          { name: 'Integer to Roman', url: lc('integer-to-roman'), difficulty: 'Medium' },
          { name: 'Implement Atoi', url: lc('string-to-integer-atoi'), difficulty: 'Medium' },
          { name: 'Count and Say', url: lc('count-and-say'), difficulty: 'Medium' },
          { name: 'Rabin Karp Algorithm', url: 'https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/', difficulty: 'Hard' },
          { name: 'Z Algorithm', url: 'https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/', difficulty: 'Hard' },
          { name: 'KMP Algorithm', url: lc('find-the-index-of-the-first-occurrence-in-a-string'), difficulty: 'Medium' },
          { name: 'Shortest Palindrome (KMP)', url: lc('shortest-palindrome'), difficulty: 'Hard' },
        ]
      },
    ],
  },
  {
    id: 'blind75',
    name: 'Blind 75',
    description: 'The famous 75 problems curated for efficient interview preparation at top tech companies.',
    duration: '4-6 weeks',
    difficulty: 'Intermediate',
    totalProblems: 75,
    topics: ['Arrays', 'Two Pointers', 'Binary Search', 'Trees', 'Graphs', 'DP', 'Heap'],
    icon: <Star className="w-6 h-6" />,
    weeks: [
      { 
        week: 1, 
        focus: 'Arrays & Hashing', 
        problems: [
          { name: 'Two Sum', url: lc('two-sum'), difficulty: 'Easy' },
          { name: 'Contains Duplicate', url: lc('contains-duplicate'), difficulty: 'Easy' },
          { name: 'Valid Anagram', url: lc('valid-anagram'), difficulty: 'Easy' },
          { name: 'Group Anagrams', url: lc('group-anagrams'), difficulty: 'Medium' },
          { name: 'Top K Frequent Elements', url: lc('top-k-frequent-elements'), difficulty: 'Medium' },
          { name: 'Product of Array Except Self', url: lc('product-of-array-except-self'), difficulty: 'Medium' },
          { name: 'Encode and Decode Strings', url: lc('encode-and-decode-strings'), difficulty: 'Medium' },
          { name: 'Longest Consecutive Sequence', url: lc('longest-consecutive-sequence'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 2, 
        focus: 'Two Pointers & Sliding Window', 
        problems: [
          { name: 'Valid Palindrome', url: lc('valid-palindrome'), difficulty: 'Easy' },
          { name: '3Sum', url: lc('3sum'), difficulty: 'Medium' },
          { name: 'Container With Most Water', url: lc('container-with-most-water'), difficulty: 'Medium' },
          { name: 'Best Time to Buy and Sell Stock', url: lc('best-time-to-buy-and-sell-stock'), difficulty: 'Easy' },
          { name: 'Longest Substring Without Repeating', url: lc('longest-substring-without-repeating-characters'), difficulty: 'Medium' },
          { name: 'Longest Repeating Character Replacement', url: lc('longest-repeating-character-replacement'), difficulty: 'Medium' },
          { name: 'Minimum Window Substring', url: lc('minimum-window-substring'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 3, 
        focus: 'Stack & Binary Search', 
        problems: [
          { name: 'Valid Parentheses', url: lc('valid-parentheses'), difficulty: 'Easy' },
          { name: 'Find Minimum in Rotated Sorted Array', url: lc('find-minimum-in-rotated-sorted-array'), difficulty: 'Medium' },
          { name: 'Search in Rotated Sorted Array', url: lc('search-in-rotated-sorted-array'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 4, 
        focus: 'Linked Lists', 
        problems: [
          { name: 'Reverse Linked List', url: lc('reverse-linked-list'), difficulty: 'Easy' },
          { name: 'Merge Two Sorted Lists', url: lc('merge-two-sorted-lists'), difficulty: 'Easy' },
          { name: 'Linked List Cycle', url: lc('linked-list-cycle'), difficulty: 'Easy' },
          { name: 'Reorder List', url: lc('reorder-list'), difficulty: 'Medium' },
          { name: 'Remove Nth Node From End', url: lc('remove-nth-node-from-end-of-list'), difficulty: 'Medium' },
          { name: 'Merge K Sorted Lists', url: lc('merge-k-sorted-lists'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 5, 
        focus: 'Trees', 
        problems: [
          { name: 'Invert Binary Tree', url: lc('invert-binary-tree'), difficulty: 'Easy' },
          { name: 'Maximum Depth of Binary Tree', url: lc('maximum-depth-of-binary-tree'), difficulty: 'Easy' },
          { name: 'Same Tree', url: lc('same-tree'), difficulty: 'Easy' },
          { name: 'Subtree of Another Tree', url: lc('subtree-of-another-tree'), difficulty: 'Easy' },
          { name: 'Lowest Common Ancestor of BST', url: lc('lowest-common-ancestor-of-a-binary-search-tree'), difficulty: 'Medium' },
          { name: 'Binary Tree Level Order Traversal', url: lc('binary-tree-level-order-traversal'), difficulty: 'Medium' },
          { name: 'Validate BST', url: lc('validate-binary-search-tree'), difficulty: 'Medium' },
          { name: 'Kth Smallest Element in BST', url: lc('kth-smallest-element-in-a-bst'), difficulty: 'Medium' },
          { name: 'Construct from Preorder and Inorder', url: lc('construct-binary-tree-from-preorder-and-inorder-traversal'), difficulty: 'Medium' },
          { name: 'Binary Tree Maximum Path Sum', url: lc('binary-tree-maximum-path-sum'), difficulty: 'Hard' },
          { name: 'Serialize and Deserialize Binary Tree', url: lc('serialize-and-deserialize-binary-tree'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 6, 
        focus: 'Tries & Heap', 
        problems: [
          { name: 'Implement Trie', url: lc('implement-trie-prefix-tree'), difficulty: 'Medium' },
          { name: 'Design Add and Search Words', url: lc('design-add-and-search-words-data-structure'), difficulty: 'Medium' },
          { name: 'Word Search II', url: lc('word-search-ii'), difficulty: 'Hard' },
          { name: 'Find Median from Data Stream', url: lc('find-median-from-data-stream'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 7, 
        focus: 'Backtracking', 
        problems: [
          { name: 'Combination Sum', url: lc('combination-sum'), difficulty: 'Medium' },
          { name: 'Word Search', url: lc('word-search'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 8, 
        focus: 'Graphs', 
        problems: [
          { name: 'Number of Islands', url: lc('number-of-islands'), difficulty: 'Medium' },
          { name: 'Clone Graph', url: lc('clone-graph'), difficulty: 'Medium' },
          { name: 'Pacific Atlantic Water Flow', url: lc('pacific-atlantic-water-flow'), difficulty: 'Medium' },
          { name: 'Course Schedule', url: lc('course-schedule'), difficulty: 'Medium' },
          { name: 'Number of Connected Components', url: lc('number-of-connected-components-in-an-undirected-graph'), difficulty: 'Medium' },
          { name: 'Graph Valid Tree', url: lc('graph-valid-tree'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 9, 
        focus: '1D Dynamic Programming', 
        problems: [
          { name: 'Climbing Stairs', url: lc('climbing-stairs'), difficulty: 'Easy' },
          { name: 'House Robber', url: lc('house-robber'), difficulty: 'Medium' },
          { name: 'House Robber II', url: lc('house-robber-ii'), difficulty: 'Medium' },
          { name: 'Longest Palindromic Substring', url: lc('longest-palindromic-substring'), difficulty: 'Medium' },
          { name: 'Palindromic Substrings', url: lc('palindromic-substrings'), difficulty: 'Medium' },
          { name: 'Decode Ways', url: lc('decode-ways'), difficulty: 'Medium' },
          { name: 'Coin Change', url: lc('coin-change'), difficulty: 'Medium' },
          { name: 'Maximum Product Subarray', url: lc('maximum-product-subarray'), difficulty: 'Medium' },
          { name: 'Word Break', url: lc('word-break'), difficulty: 'Medium' },
          { name: 'Longest Increasing Subsequence', url: lc('longest-increasing-subsequence'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 10, 
        focus: '2D DP & Intervals', 
        problems: [
          { name: 'Unique Paths', url: lc('unique-paths'), difficulty: 'Medium' },
          { name: 'Longest Common Subsequence', url: lc('longest-common-subsequence'), difficulty: 'Medium' },
          { name: 'Jump Game', url: lc('jump-game'), difficulty: 'Medium' },
          { name: 'Merge Intervals', url: lc('merge-intervals'), difficulty: 'Medium' },
          { name: 'Non-overlapping Intervals', url: lc('non-overlapping-intervals'), difficulty: 'Medium' },
          { name: 'Meeting Rooms', url: lc('meeting-rooms'), difficulty: 'Easy' },
          { name: 'Meeting Rooms II', url: lc('meeting-rooms-ii'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 11, 
        focus: 'Bit Manipulation & Math', 
        problems: [
          { name: 'Number of 1 Bits', url: lc('number-of-1-bits'), difficulty: 'Easy' },
          { name: 'Counting Bits', url: lc('counting-bits'), difficulty: 'Easy' },
          { name: 'Reverse Bits', url: lc('reverse-bits'), difficulty: 'Easy' },
          { name: 'Missing Number', url: lc('missing-number'), difficulty: 'Easy' },
          { name: 'Sum of Two Integers', url: lc('sum-of-two-integers'), difficulty: 'Medium' },
          { name: 'Rotate Image', url: lc('rotate-image'), difficulty: 'Medium' },
          { name: 'Spiral Matrix', url: lc('spiral-matrix'), difficulty: 'Medium' },
          { name: 'Set Matrix Zeroes', url: lc('set-matrix-zeroes'), difficulty: 'Medium' },
        ]
      },
    ],
  },
  {
    id: 'neetcode150',
    name: 'NeetCode 150',
    description: 'Extended and improved version of Blind 75 with better problem selection and coverage.',
    duration: '6-8 weeks',
    difficulty: 'Intermediate',
    totalProblems: 150,
    topics: ['Arrays', 'Stack', 'Binary Search', 'Heap', 'Backtracking', 'Tries', 'Graphs', 'DP'],
    icon: <Zap className="w-6 h-6" />,
    weeks: [
      { 
        week: 1, 
        focus: 'Arrays & Hashing', 
        problems: [
          { name: 'Contains Duplicate', url: lc('contains-duplicate'), difficulty: 'Easy' },
          { name: 'Valid Anagram', url: lc('valid-anagram'), difficulty: 'Easy' },
          { name: 'Two Sum', url: lc('two-sum'), difficulty: 'Easy' },
          { name: 'Group Anagrams', url: lc('group-anagrams'), difficulty: 'Medium' },
          { name: 'Top K Frequent Elements', url: lc('top-k-frequent-elements'), difficulty: 'Medium' },
          { name: 'Product of Array Except Self', url: lc('product-of-array-except-self'), difficulty: 'Medium' },
          { name: 'Valid Sudoku', url: lc('valid-sudoku'), difficulty: 'Medium' },
          { name: 'Encode and Decode Strings', url: lc('encode-and-decode-strings'), difficulty: 'Medium' },
          { name: 'Longest Consecutive Sequence', url: lc('longest-consecutive-sequence'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 2, 
        focus: 'Two Pointers & Stack', 
        problems: [
          { name: 'Valid Palindrome', url: lc('valid-palindrome'), difficulty: 'Easy' },
          { name: 'Two Sum II', url: lc('two-sum-ii-input-array-is-sorted'), difficulty: 'Medium' },
          { name: '3Sum', url: lc('3sum'), difficulty: 'Medium' },
          { name: 'Container With Most Water', url: lc('container-with-most-water'), difficulty: 'Medium' },
          { name: 'Trapping Rain Water', url: lc('trapping-rain-water'), difficulty: 'Hard' },
          { name: 'Valid Parentheses', url: lc('valid-parentheses'), difficulty: 'Easy' },
          { name: 'Min Stack', url: lc('min-stack'), difficulty: 'Medium' },
          { name: 'Evaluate Reverse Polish Notation', url: lc('evaluate-reverse-polish-notation'), difficulty: 'Medium' },
          { name: 'Generate Parentheses', url: lc('generate-parentheses'), difficulty: 'Medium' },
          { name: 'Daily Temperatures', url: lc('daily-temperatures'), difficulty: 'Medium' },
          { name: 'Car Fleet', url: lc('car-fleet'), difficulty: 'Medium' },
          { name: 'Largest Rectangle in Histogram', url: lc('largest-rectangle-in-histogram'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 3, 
        focus: 'Binary Search & Sliding Window', 
        problems: [
          { name: 'Binary Search', url: lc('binary-search'), difficulty: 'Easy' },
          { name: 'Search a 2D Matrix', url: lc('search-a-2d-matrix'), difficulty: 'Medium' },
          { name: 'Koko Eating Bananas', url: lc('koko-eating-bananas'), difficulty: 'Medium' },
          { name: 'Find Minimum in Rotated Sorted Array', url: lc('find-minimum-in-rotated-sorted-array'), difficulty: 'Medium' },
          { name: 'Search in Rotated Sorted Array', url: lc('search-in-rotated-sorted-array'), difficulty: 'Medium' },
          { name: 'Time Based Key-Value Store', url: lc('time-based-key-value-store'), difficulty: 'Medium' },
          { name: 'Median of Two Sorted Arrays', url: lc('median-of-two-sorted-arrays'), difficulty: 'Hard' },
          { name: 'Best Time to Buy And Sell Stock', url: lc('best-time-to-buy-and-sell-stock'), difficulty: 'Easy' },
          { name: 'Longest Substring Without Repeating', url: lc('longest-substring-without-repeating-characters'), difficulty: 'Medium' },
          { name: 'Longest Repeating Character Replacement', url: lc('longest-repeating-character-replacement'), difficulty: 'Medium' },
          { name: 'Permutation In String', url: lc('permutation-in-string'), difficulty: 'Medium' },
          { name: 'Minimum Window Substring', url: lc('minimum-window-substring'), difficulty: 'Hard' },
          { name: 'Sliding Window Maximum', url: lc('sliding-window-maximum'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 4, 
        focus: 'Linked Lists', 
        problems: [
          { name: 'Reverse Linked List', url: lc('reverse-linked-list'), difficulty: 'Easy' },
          { name: 'Merge Two Sorted Lists', url: lc('merge-two-sorted-lists'), difficulty: 'Easy' },
          { name: 'Reorder List', url: lc('reorder-list'), difficulty: 'Medium' },
          { name: 'Remove Nth Node From End of List', url: lc('remove-nth-node-from-end-of-list'), difficulty: 'Medium' },
          { name: 'Copy List With Random Pointer', url: lc('copy-list-with-random-pointer'), difficulty: 'Medium' },
          { name: 'Add Two Numbers', url: lc('add-two-numbers'), difficulty: 'Medium' },
          { name: 'Linked List Cycle', url: lc('linked-list-cycle'), difficulty: 'Easy' },
          { name: 'Find The Duplicate Number', url: lc('find-the-duplicate-number'), difficulty: 'Medium' },
          { name: 'LRU Cache', url: lc('lru-cache'), difficulty: 'Medium' },
          { name: 'Merge K Sorted Lists', url: lc('merge-k-sorted-lists'), difficulty: 'Hard' },
          { name: 'Reverse Nodes In K Group', url: lc('reverse-nodes-in-k-group'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 5, 
        focus: 'Trees', 
        problems: [
          { name: 'Invert Binary Tree', url: lc('invert-binary-tree'), difficulty: 'Easy' },
          { name: 'Maximum Depth of Binary Tree', url: lc('maximum-depth-of-binary-tree'), difficulty: 'Easy' },
          { name: 'Diameter of Binary Tree', url: lc('diameter-of-binary-tree'), difficulty: 'Easy' },
          { name: 'Balanced Binary Tree', url: lc('balanced-binary-tree'), difficulty: 'Easy' },
          { name: 'Same Tree', url: lc('same-tree'), difficulty: 'Easy' },
          { name: 'Subtree of Another Tree', url: lc('subtree-of-another-tree'), difficulty: 'Easy' },
          { name: 'Lowest Common Ancestor of BST', url: lc('lowest-common-ancestor-of-a-binary-search-tree'), difficulty: 'Medium' },
          { name: 'Binary Tree Level Order Traversal', url: lc('binary-tree-level-order-traversal'), difficulty: 'Medium' },
          { name: 'Binary Tree Right Side View', url: lc('binary-tree-right-side-view'), difficulty: 'Medium' },
          { name: 'Count Good Nodes In Binary Tree', url: lc('count-good-nodes-in-binary-tree'), difficulty: 'Medium' },
          { name: 'Validate Binary Search Tree', url: lc('validate-binary-search-tree'), difficulty: 'Medium' },
          { name: 'Kth Smallest Element In a BST', url: lc('kth-smallest-element-in-a-bst'), difficulty: 'Medium' },
          { name: 'Construct from Preorder And Inorder', url: lc('construct-binary-tree-from-preorder-and-inorder-traversal'), difficulty: 'Medium' },
          { name: 'Binary Tree Maximum Path Sum', url: lc('binary-tree-maximum-path-sum'), difficulty: 'Hard' },
          { name: 'Serialize And Deserialize Binary Tree', url: lc('serialize-and-deserialize-binary-tree'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 6, 
        focus: 'Heap, Backtracking & Tries', 
        problems: [
          { name: 'Kth Largest Element In a Stream', url: lc('kth-largest-element-in-a-stream'), difficulty: 'Easy' },
          { name: 'Last Stone Weight', url: lc('last-stone-weight'), difficulty: 'Easy' },
          { name: 'K Closest Points to Origin', url: lc('k-closest-points-to-origin'), difficulty: 'Medium' },
          { name: 'Kth Largest Element In An Array', url: lc('kth-largest-element-in-an-array'), difficulty: 'Medium' },
          { name: 'Task Scheduler', url: lc('task-scheduler'), difficulty: 'Medium' },
          { name: 'Design Twitter', url: lc('design-twitter'), difficulty: 'Medium' },
          { name: 'Find Median From Data Stream', url: lc('find-median-from-data-stream'), difficulty: 'Hard' },
          { name: 'Subsets', url: lc('subsets'), difficulty: 'Medium' },
          { name: 'Combination Sum', url: lc('combination-sum'), difficulty: 'Medium' },
          { name: 'Permutations', url: lc('permutations'), difficulty: 'Medium' },
          { name: 'Subsets II', url: lc('subsets-ii'), difficulty: 'Medium' },
          { name: 'Combination Sum II', url: lc('combination-sum-ii'), difficulty: 'Medium' },
          { name: 'Word Search', url: lc('word-search'), difficulty: 'Medium' },
          { name: 'Palindrome Partitioning', url: lc('palindrome-partitioning'), difficulty: 'Medium' },
          { name: 'Letter Combinations of a Phone Number', url: lc('letter-combinations-of-a-phone-number'), difficulty: 'Medium' },
          { name: 'N Queens', url: lc('n-queens'), difficulty: 'Hard' },
          { name: 'Implement Trie Prefix Tree', url: lc('implement-trie-prefix-tree'), difficulty: 'Medium' },
          { name: 'Design Add And Search Words', url: lc('design-add-and-search-words-data-structure'), difficulty: 'Medium' },
          { name: 'Word Search II', url: lc('word-search-ii'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 7, 
        focus: 'Graphs', 
        problems: [
          { name: 'Number of Islands', url: lc('number-of-islands'), difficulty: 'Medium' },
          { name: 'Clone Graph', url: lc('clone-graph'), difficulty: 'Medium' },
          { name: 'Max Area of Island', url: lc('max-area-of-island'), difficulty: 'Medium' },
          { name: 'Pacific Atlantic Water Flow', url: lc('pacific-atlantic-water-flow'), difficulty: 'Medium' },
          { name: 'Surrounded Regions', url: lc('surrounded-regions'), difficulty: 'Medium' },
          { name: 'Rotting Oranges', url: lc('rotting-oranges'), difficulty: 'Medium' },
          { name: 'Walls And Gates', url: lc('walls-and-gates'), difficulty: 'Medium' },
          { name: 'Course Schedule', url: lc('course-schedule'), difficulty: 'Medium' },
          { name: 'Course Schedule II', url: lc('course-schedule-ii'), difficulty: 'Medium' },
          { name: 'Redundant Connection', url: lc('redundant-connection'), difficulty: 'Medium' },
          { name: 'Number of Connected Components', url: lc('number-of-connected-components-in-an-undirected-graph'), difficulty: 'Medium' },
          { name: 'Graph Valid Tree', url: lc('graph-valid-tree'), difficulty: 'Medium' },
          { name: 'Word Ladder', url: lc('word-ladder'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 8, 
        focus: 'Dynamic Programming', 
        problems: [
          { name: 'Climbing Stairs', url: lc('climbing-stairs'), difficulty: 'Easy' },
          { name: 'Min Cost Climbing Stairs', url: lc('min-cost-climbing-stairs'), difficulty: 'Easy' },
          { name: 'House Robber', url: lc('house-robber'), difficulty: 'Medium' },
          { name: 'House Robber II', url: lc('house-robber-ii'), difficulty: 'Medium' },
          { name: 'Longest Palindromic Substring', url: lc('longest-palindromic-substring'), difficulty: 'Medium' },
          { name: 'Palindromic Substrings', url: lc('palindromic-substrings'), difficulty: 'Medium' },
          { name: 'Decode Ways', url: lc('decode-ways'), difficulty: 'Medium' },
          { name: 'Coin Change', url: lc('coin-change'), difficulty: 'Medium' },
          { name: 'Maximum Product Subarray', url: lc('maximum-product-subarray'), difficulty: 'Medium' },
          { name: 'Word Break', url: lc('word-break'), difficulty: 'Medium' },
          { name: 'Longest Increasing Subsequence', url: lc('longest-increasing-subsequence'), difficulty: 'Medium' },
          { name: 'Partition Equal Subset Sum', url: lc('partition-equal-subset-sum'), difficulty: 'Medium' },
          { name: 'Unique Paths', url: lc('unique-paths'), difficulty: 'Medium' },
          { name: 'Longest Common Subsequence', url: lc('longest-common-subsequence'), difficulty: 'Medium' },
          { name: 'Best Time Buy Sell Stock with Cooldown', url: lc('best-time-to-buy-and-sell-stock-with-cooldown'), difficulty: 'Medium' },
          { name: 'Coin Change II', url: lc('coin-change-ii'), difficulty: 'Medium' },
          { name: 'Target Sum', url: lc('target-sum'), difficulty: 'Medium' },
          { name: 'Interleaving String', url: lc('interleaving-string'), difficulty: 'Medium' },
          { name: 'Edit Distance', url: lc('edit-distance'), difficulty: 'Medium' },
          { name: 'Burst Balloons', url: lc('burst-balloons'), difficulty: 'Hard' },
          { name: 'Regular Expression Matching', url: lc('regular-expression-matching'), difficulty: 'Hard' },
        ]
      },
    ],
  },
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
      { 
        week: 1, 
        focus: 'Arrays & Strings Basics', 
        problems: [
          { name: 'Two Sum', url: lc('two-sum'), difficulty: 'Easy' },
          { name: 'Contains Duplicate', url: lc('contains-duplicate'), difficulty: 'Easy' },
          { name: 'Valid Palindrome', url: lc('valid-palindrome'), difficulty: 'Easy' },
          { name: 'Reverse String', url: lc('reverse-string'), difficulty: 'Easy' },
          { name: 'Valid Anagram', url: lc('valid-anagram'), difficulty: 'Easy' },
          { name: 'Best Time to Buy and Sell Stock', url: lc('best-time-to-buy-and-sell-stock'), difficulty: 'Easy' },
          { name: 'Merge Sorted Array', url: lc('merge-sorted-array'), difficulty: 'Easy' },
          { name: 'Remove Duplicates from Sorted Array', url: lc('remove-duplicates-from-sorted-array'), difficulty: 'Easy' },
          { name: 'Maximum Subarray', url: lc('maximum-subarray'), difficulty: 'Medium' },
          { name: 'Plus One', url: lc('plus-one'), difficulty: 'Easy' },
        ]
      },
      { 
        week: 2, 
        focus: 'Hash Maps & Sets', 
        problems: [
          { name: 'Single Number', url: lc('single-number'), difficulty: 'Easy' },
          { name: 'Intersection of Two Arrays II', url: lc('intersection-of-two-arrays-ii'), difficulty: 'Easy' },
          { name: 'Happy Number', url: lc('happy-number'), difficulty: 'Easy' },
          { name: 'Roman to Integer', url: lc('roman-to-integer'), difficulty: 'Easy' },
          { name: 'Missing Number', url: lc('missing-number'), difficulty: 'Easy' },
          { name: 'First Unique Character in a String', url: lc('first-unique-character-in-a-string'), difficulty: 'Easy' },
          { name: 'Isomorphic Strings', url: lc('isomorphic-strings'), difficulty: 'Easy' },
          { name: 'Word Pattern', url: lc('word-pattern'), difficulty: 'Easy' },
          { name: 'Ransom Note', url: lc('ransom-note'), difficulty: 'Easy' },
          { name: 'Majority Element', url: lc('majority-element'), difficulty: 'Easy' },
        ]
      },
      { 
        week: 3, 
        focus: 'Two Pointers & Linked Lists', 
        problems: [
          { name: 'Move Zeroes', url: lc('move-zeroes'), difficulty: 'Easy' },
          { name: 'Squares of a Sorted Array', url: lc('squares-of-a-sorted-array'), difficulty: 'Easy' },
          { name: 'Backspace String Compare', url: lc('backspace-string-compare'), difficulty: 'Easy' },
          { name: 'Remove Element', url: lc('remove-element'), difficulty: 'Easy' },
          { name: 'Reverse Linked List', url: lc('reverse-linked-list'), difficulty: 'Easy' },
          { name: 'Middle of the Linked List', url: lc('middle-of-the-linked-list'), difficulty: 'Easy' },
          { name: 'Linked List Cycle', url: lc('linked-list-cycle'), difficulty: 'Easy' },
          { name: 'Merge Two Sorted Lists', url: lc('merge-two-sorted-lists'), difficulty: 'Easy' },
          { name: 'Remove Linked List Elements', url: lc('remove-linked-list-elements'), difficulty: 'Easy' },
          { name: 'Palindrome Linked List', url: lc('palindrome-linked-list'), difficulty: 'Easy' },
        ]
      },
      { 
        week: 4, 
        focus: 'Intro to Recursion & Trees', 
        problems: [
          { name: 'Fibonacci Number', url: lc('fibonacci-number'), difficulty: 'Easy' },
          { name: 'Climbing Stairs', url: lc('climbing-stairs'), difficulty: 'Easy' },
          { name: 'Power of Two', url: lc('power-of-two'), difficulty: 'Easy' },
          { name: 'Power of Three', url: lc('power-of-three'), difficulty: 'Easy' },
          { name: 'Maximum Depth of Binary Tree', url: lc('maximum-depth-of-binary-tree'), difficulty: 'Easy' },
          { name: 'Invert Binary Tree', url: lc('invert-binary-tree'), difficulty: 'Easy' },
          { name: 'Same Tree', url: lc('same-tree'), difficulty: 'Easy' },
          { name: 'Symmetric Tree', url: lc('symmetric-tree'), difficulty: 'Easy' },
          { name: 'Binary Tree Inorder Traversal', url: lc('binary-tree-inorder-traversal'), difficulty: 'Easy' },
          { name: 'Binary Tree Preorder Traversal', url: lc('binary-tree-preorder-traversal'), difficulty: 'Easy' },
        ]
      },
    ],
  },
  {
    id: 'leetcode-top-interview',
    name: 'LeetCode Top Interview 150',
    description: 'The official LeetCode curated list of 150 most common interview questions.',
    duration: '6-8 weeks',
    difficulty: 'Intermediate',
    totalProblems: 150,
    topics: ['Arrays', 'Matrix', 'Hashmap', 'Intervals', 'Stack', 'Linked List', 'Trees', 'Graphs', 'DP', 'Bit Manipulation'],
    icon: <Flame className="w-6 h-6" />,
    weeks: [
      { 
        week: 1, 
        focus: 'Array / String', 
        problems: [
          { name: 'Merge Sorted Array', url: lc('merge-sorted-array'), difficulty: 'Easy' },
          { name: 'Remove Element', url: lc('remove-element'), difficulty: 'Easy' },
          { name: 'Remove Duplicates from Sorted Array', url: lc('remove-duplicates-from-sorted-array'), difficulty: 'Easy' },
          { name: 'Remove Duplicates from Sorted Array II', url: lc('remove-duplicates-from-sorted-array-ii'), difficulty: 'Medium' },
          { name: 'Majority Element', url: lc('majority-element'), difficulty: 'Easy' },
          { name: 'Rotate Array', url: lc('rotate-array'), difficulty: 'Medium' },
          { name: 'Best Time to Buy and Sell Stock', url: lc('best-time-to-buy-and-sell-stock'), difficulty: 'Easy' },
          { name: 'Best Time to Buy and Sell Stock II', url: lc('best-time-to-buy-and-sell-stock-ii'), difficulty: 'Medium' },
          { name: 'Jump Game', url: lc('jump-game'), difficulty: 'Medium' },
          { name: 'Jump Game II', url: lc('jump-game-ii'), difficulty: 'Medium' },
          { name: 'H-Index', url: lc('h-index'), difficulty: 'Medium' },
          { name: 'Insert Delete GetRandom O(1)', url: lc('insert-delete-getrandom-o1'), difficulty: 'Medium' },
          { name: 'Product of Array Except Self', url: lc('product-of-array-except-self'), difficulty: 'Medium' },
          { name: 'Gas Station', url: lc('gas-station'), difficulty: 'Medium' },
          { name: 'Candy', url: lc('candy'), difficulty: 'Hard' },
          { name: 'Trapping Rain Water', url: lc('trapping-rain-water'), difficulty: 'Hard' },
          { name: 'Roman to Integer', url: lc('roman-to-integer'), difficulty: 'Easy' },
          { name: 'Integer to Roman', url: lc('integer-to-roman'), difficulty: 'Medium' },
          { name: 'Length of Last Word', url: lc('length-of-last-word'), difficulty: 'Easy' },
          { name: 'Longest Common Prefix', url: lc('longest-common-prefix'), difficulty: 'Easy' },
          { name: 'Reverse Words in a String', url: lc('reverse-words-in-a-string'), difficulty: 'Medium' },
          { name: 'Zigzag Conversion', url: lc('zigzag-conversion'), difficulty: 'Medium' },
          { name: 'Find the Index of First Occurrence', url: lc('find-the-index-of-the-first-occurrence-in-a-string'), difficulty: 'Easy' },
          { name: 'Text Justification', url: lc('text-justification'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 2, 
        focus: 'Two Pointers & Sliding Window', 
        problems: [
          { name: 'Valid Palindrome', url: lc('valid-palindrome'), difficulty: 'Easy' },
          { name: 'Is Subsequence', url: lc('is-subsequence'), difficulty: 'Easy' },
          { name: 'Two Sum II', url: lc('two-sum-ii-input-array-is-sorted'), difficulty: 'Medium' },
          { name: 'Container With Most Water', url: lc('container-with-most-water'), difficulty: 'Medium' },
          { name: '3Sum', url: lc('3sum'), difficulty: 'Medium' },
          { name: 'Minimum Size Subarray Sum', url: lc('minimum-size-subarray-sum'), difficulty: 'Medium' },
          { name: 'Longest Substring Without Repeating', url: lc('longest-substring-without-repeating-characters'), difficulty: 'Medium' },
          { name: 'Substring with Concatenation', url: lc('substring-with-concatenation-of-all-words'), difficulty: 'Hard' },
          { name: 'Minimum Window Substring', url: lc('minimum-window-substring'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 3, 
        focus: 'Matrix & Hashmap', 
        problems: [
          { name: 'Valid Sudoku', url: lc('valid-sudoku'), difficulty: 'Medium' },
          { name: 'Spiral Matrix', url: lc('spiral-matrix'), difficulty: 'Medium' },
          { name: 'Rotate Image', url: lc('rotate-image'), difficulty: 'Medium' },
          { name: 'Set Matrix Zeroes', url: lc('set-matrix-zeroes'), difficulty: 'Medium' },
          { name: 'Game of Life', url: lc('game-of-life'), difficulty: 'Medium' },
          { name: 'Ransom Note', url: lc('ransom-note'), difficulty: 'Easy' },
          { name: 'Isomorphic Strings', url: lc('isomorphic-strings'), difficulty: 'Easy' },
          { name: 'Word Pattern', url: lc('word-pattern'), difficulty: 'Easy' },
          { name: 'Valid Anagram', url: lc('valid-anagram'), difficulty: 'Easy' },
          { name: 'Group Anagrams', url: lc('group-anagrams'), difficulty: 'Medium' },
          { name: 'Two Sum', url: lc('two-sum'), difficulty: 'Easy' },
          { name: 'Happy Number', url: lc('happy-number'), difficulty: 'Easy' },
          { name: 'Contains Duplicate II', url: lc('contains-duplicate-ii'), difficulty: 'Easy' },
          { name: 'Longest Consecutive Sequence', url: lc('longest-consecutive-sequence'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 4, 
        focus: 'Intervals & Stack', 
        problems: [
          { name: 'Summary Ranges', url: lc('summary-ranges'), difficulty: 'Easy' },
          { name: 'Merge Intervals', url: lc('merge-intervals'), difficulty: 'Medium' },
          { name: 'Insert Interval', url: lc('insert-interval'), difficulty: 'Medium' },
          { name: 'Minimum Number of Arrows to Burst Balloons', url: lc('minimum-number-of-arrows-to-burst-balloons'), difficulty: 'Medium' },
          { name: 'Valid Parentheses', url: lc('valid-parentheses'), difficulty: 'Easy' },
          { name: 'Simplify Path', url: lc('simplify-path'), difficulty: 'Medium' },
          { name: 'Min Stack', url: lc('min-stack'), difficulty: 'Medium' },
          { name: 'Evaluate Reverse Polish Notation', url: lc('evaluate-reverse-polish-notation'), difficulty: 'Medium' },
          { name: 'Basic Calculator', url: lc('basic-calculator'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 5, 
        focus: 'Linked List', 
        problems: [
          { name: 'Linked List Cycle', url: lc('linked-list-cycle'), difficulty: 'Easy' },
          { name: 'Add Two Numbers', url: lc('add-two-numbers'), difficulty: 'Medium' },
          { name: 'Merge Two Sorted Lists', url: lc('merge-two-sorted-lists'), difficulty: 'Easy' },
          { name: 'Copy List with Random Pointer', url: lc('copy-list-with-random-pointer'), difficulty: 'Medium' },
          { name: 'Reverse Linked List II', url: lc('reverse-linked-list-ii'), difficulty: 'Medium' },
          { name: 'Reverse Nodes in k-Group', url: lc('reverse-nodes-in-k-group'), difficulty: 'Hard' },
          { name: 'Remove Nth Node From End of List', url: lc('remove-nth-node-from-end-of-list'), difficulty: 'Medium' },
          { name: 'Remove Duplicates from Sorted List II', url: lc('remove-duplicates-from-sorted-list-ii'), difficulty: 'Medium' },
          { name: 'Rotate List', url: lc('rotate-list'), difficulty: 'Medium' },
          { name: 'Partition List', url: lc('partition-list'), difficulty: 'Medium' },
          { name: 'LRU Cache', url: lc('lru-cache'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 6, 
        focus: 'Binary Tree', 
        problems: [
          { name: 'Maximum Depth of Binary Tree', url: lc('maximum-depth-of-binary-tree'), difficulty: 'Easy' },
          { name: 'Same Tree', url: lc('same-tree'), difficulty: 'Easy' },
          { name: 'Invert Binary Tree', url: lc('invert-binary-tree'), difficulty: 'Easy' },
          { name: 'Symmetric Tree', url: lc('symmetric-tree'), difficulty: 'Easy' },
          { name: 'Construct from Preorder and Inorder', url: lc('construct-binary-tree-from-preorder-and-inorder-traversal'), difficulty: 'Medium' },
          { name: 'Construct from Inorder and Postorder', url: lc('construct-binary-tree-from-inorder-and-postorder-traversal'), difficulty: 'Medium' },
          { name: 'Populating Next Right Pointers II', url: lc('populating-next-right-pointers-in-each-node-ii'), difficulty: 'Medium' },
          { name: 'Flatten Binary Tree to Linked List', url: lc('flatten-binary-tree-to-linked-list'), difficulty: 'Medium' },
          { name: 'Path Sum', url: lc('path-sum'), difficulty: 'Easy' },
          { name: 'Sum Root to Leaf Numbers', url: lc('sum-root-to-leaf-numbers'), difficulty: 'Medium' },
          { name: 'Binary Tree Maximum Path Sum', url: lc('binary-tree-maximum-path-sum'), difficulty: 'Hard' },
          { name: 'Binary Search Tree Iterator', url: lc('binary-search-tree-iterator'), difficulty: 'Medium' },
          { name: 'Count Complete Tree Nodes', url: lc('count-complete-tree-nodes'), difficulty: 'Medium' },
          { name: 'Lowest Common Ancestor', url: lc('lowest-common-ancestor-of-a-binary-tree'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 7, 
        focus: 'Binary Tree BFS & BST', 
        problems: [
          { name: 'Binary Tree Right Side View', url: lc('binary-tree-right-side-view'), difficulty: 'Medium' },
          { name: 'Average of Levels in Binary Tree', url: lc('average-of-levels-in-binary-tree'), difficulty: 'Easy' },
          { name: 'Binary Tree Level Order Traversal', url: lc('binary-tree-level-order-traversal'), difficulty: 'Medium' },
          { name: 'Binary Tree Zigzag Level Order Traversal', url: lc('binary-tree-zigzag-level-order-traversal'), difficulty: 'Medium' },
          { name: 'Minimum Absolute Difference in BST', url: lc('minimum-absolute-difference-in-bst'), difficulty: 'Easy' },
          { name: 'Kth Smallest Element in a BST', url: lc('kth-smallest-element-in-a-bst'), difficulty: 'Medium' },
          { name: 'Validate Binary Search Tree', url: lc('validate-binary-search-tree'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 8, 
        focus: 'Graph', 
        problems: [
          { name: 'Number of Islands', url: lc('number-of-islands'), difficulty: 'Medium' },
          { name: 'Surrounded Regions', url: lc('surrounded-regions'), difficulty: 'Medium' },
          { name: 'Clone Graph', url: lc('clone-graph'), difficulty: 'Medium' },
          { name: 'Evaluate Division', url: lc('evaluate-division'), difficulty: 'Medium' },
          { name: 'Course Schedule', url: lc('course-schedule'), difficulty: 'Medium' },
          { name: 'Course Schedule II', url: lc('course-schedule-ii'), difficulty: 'Medium' },
          { name: 'Snakes and Ladders', url: lc('snakes-and-ladders'), difficulty: 'Medium' },
          { name: 'Minimum Genetic Mutation', url: lc('minimum-genetic-mutation'), difficulty: 'Medium' },
          { name: 'Word Ladder', url: lc('word-ladder'), difficulty: 'Hard' },
        ]
      },
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
      { 
        week: 1, 
        focus: '1D Dynamic Programming', 
        problems: [
          { name: 'House Robber', url: lc('house-robber'), difficulty: 'Medium' },
          { name: 'House Robber II', url: lc('house-robber-ii'), difficulty: 'Medium' },
          { name: 'Decode Ways', url: lc('decode-ways'), difficulty: 'Medium' },
          { name: 'Coin Change', url: lc('coin-change'), difficulty: 'Medium' },
          { name: 'Word Break', url: lc('word-break'), difficulty: 'Medium' },
          { name: 'Maximum Product Subarray', url: lc('maximum-product-subarray'), difficulty: 'Medium' },
          { name: 'Longest Increasing Subsequence', url: lc('longest-increasing-subsequence'), difficulty: 'Medium' },
          { name: 'Perfect Squares', url: lc('perfect-squares'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 2, 
        focus: '2D Dynamic Programming', 
        problems: [
          { name: 'Unique Paths', url: lc('unique-paths'), difficulty: 'Medium' },
          { name: 'Unique Paths II', url: lc('unique-paths-ii'), difficulty: 'Medium' },
          { name: 'Minimum Path Sum', url: lc('minimum-path-sum'), difficulty: 'Medium' },
          { name: 'Triangle', url: lc('triangle'), difficulty: 'Medium' },
          { name: 'Maximal Square', url: lc('maximal-square'), difficulty: 'Medium' },
          { name: 'Edit Distance', url: lc('edit-distance'), difficulty: 'Medium' },
          { name: 'Longest Common Subsequence', url: lc('longest-common-subsequence'), difficulty: 'Medium' },
          { name: 'Distinct Subsequences', url: lc('distinct-subsequences'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 3, 
        focus: 'String DP', 
        problems: [
          { name: 'Longest Palindromic Substring', url: lc('longest-palindromic-substring'), difficulty: 'Medium' },
          { name: 'Palindromic Substrings', url: lc('palindromic-substrings'), difficulty: 'Medium' },
          { name: 'Longest Palindromic Subsequence', url: lc('longest-palindromic-subsequence'), difficulty: 'Medium' },
          { name: 'Shortest Common Supersequence', url: lc('shortest-common-supersequence'), difficulty: 'Hard' },
          { name: 'Interleaving String', url: lc('interleaving-string'), difficulty: 'Medium' },
          { name: 'Regular Expression Matching', url: lc('regular-expression-matching'), difficulty: 'Hard' },
          { name: 'Wildcard Matching', url: lc('wildcard-matching'), difficulty: 'Hard' },
        ]
      },
      { 
        week: 4, 
        focus: 'State Machine DP', 
        problems: [
          { name: 'Best Time Buy Sell Stock II', url: lc('best-time-to-buy-and-sell-stock-ii'), difficulty: 'Medium' },
          { name: 'Best Time Buy Sell Stock III', url: lc('best-time-to-buy-and-sell-stock-iii'), difficulty: 'Hard' },
          { name: 'Best Time Buy Sell Stock IV', url: lc('best-time-to-buy-and-sell-stock-iv'), difficulty: 'Hard' },
          { name: 'Best Time with Cooldown', url: lc('best-time-to-buy-and-sell-stock-with-cooldown'), difficulty: 'Medium' },
          { name: 'Best Time with Transaction Fee', url: lc('best-time-to-buy-and-sell-stock-with-transaction-fee'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 5, 
        focus: 'Interval & Game DP', 
        problems: [
          { name: 'Burst Balloons', url: lc('burst-balloons'), difficulty: 'Hard' },
          { name: 'Minimum Cost to Merge Stones', url: lc('minimum-cost-to-merge-stones'), difficulty: 'Hard' },
          { name: 'Stone Game', url: lc('stone-game'), difficulty: 'Medium' },
          { name: 'Stone Game II', url: lc('stone-game-ii'), difficulty: 'Medium' },
          { name: 'Predict the Winner', url: lc('predict-the-winner'), difficulty: 'Medium' },
          { name: 'Partition Array for Maximum Sum', url: lc('partition-array-for-maximum-sum'), difficulty: 'Medium' },
        ]
      },
      { 
        week: 6, 
        focus: 'Advanced Techniques', 
        problems: [
          { name: 'Target Sum', url: lc('target-sum'), difficulty: 'Medium' },
          { name: 'Partition Equal Subset Sum', url: lc('partition-equal-subset-sum'), difficulty: 'Medium' },
          { name: 'Ones and Zeroes', url: lc('ones-and-zeroes'), difficulty: 'Medium' },
          { name: 'Coin Change II', url: lc('coin-change-ii'), difficulty: 'Medium' },
          { name: 'Combination Sum IV', url: lc('combination-sum-iv'), difficulty: 'Medium' },
          { name: 'Cherry Pickup', url: lc('cherry-pickup'), difficulty: 'Hard' },
          { name: 'Frog Jump', url: lc('frog-jump'), difficulty: 'Hard' },
          { name: 'Concatenated Words', url: lc('concatenated-words'), difficulty: 'Hard' },
        ]
      },
    ],
  },
];

const difficultyColors = {
  Beginner: 'bg-green-500/10 text-green-700 border-green-500/20',
  Intermediate: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
  Advanced: 'bg-red-500/10 text-red-700 border-red-500/20',
};

const problemDifficultyColors = {
  Easy: 'text-green-600',
  Medium: 'text-yellow-600',
  Hard: 'text-red-600',
};

export default function StudyPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [enrolledPlans, setEnrolledPlans] = useState<string[]>([]);
  const [completedProblems, setCompletedProblems] = useState<Record<string, string[]>>({});
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1]));
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedEnrolled = localStorage.getItem('enrolledPlans');
    const savedCompleted = localStorage.getItem('studyPlanProgress');
    
    if (savedEnrolled) {
      try {
        setEnrolledPlans(JSON.parse(savedEnrolled));
      } catch (e) {
        console.error('Error parsing enrolled plans:', e);
      }
    }
    
    if (savedCompleted) {
      try {
        setCompletedProblems(JSON.parse(savedCompleted));
      } catch (e) {
        console.error('Error parsing completed problems:', e);
      }
    }
    
    setMounted(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('enrolledPlans', JSON.stringify(enrolledPlans));
      localStorage.setItem('studyPlanProgress', JSON.stringify(completedProblems));
    }
  }, [enrolledPlans, completedProblems, mounted]);

  const handleEnroll = (planId: string) => {
    if (enrolledPlans.includes(planId)) {
      setEnrolledPlans(enrolledPlans.filter(id => id !== planId));
    } else {
      setEnrolledPlans([...enrolledPlans, planId]);
      // Initialize completed problems for this plan if not exists
      if (!completedProblems[planId]) {
        setCompletedProblems(prev => ({ ...prev, [planId]: [] }));
      }
    }
  };

  const toggleProblem = (planId: string, problemName: string) => {
    setCompletedProblems(prev => {
      const planProblems = prev[planId] || [];
      if (planProblems.includes(problemName)) {
        return { ...prev, [planId]: planProblems.filter(p => p !== problemName) };
      } else {
        return { ...prev, [planId]: [...planProblems, problemName] };
      }
    });
  };

  const toggleWeek = (weekNum: number) => {
    setExpandedWeeks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(weekNum)) {
        newSet.delete(weekNum);
      } else {
        newSet.add(weekNum);
      }
      return newSet;
    });
  };

  const getPlanProgress = (planId: string, plan: StudyPlan) => {
    const completed = completedProblems[planId]?.length || 0;
    const total = plan.weeks.reduce((sum, week) => sum + week.problems.length, 0);
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Study Plans</h1>
          </div>
          <p className="text-muted-foreground">
            Structured learning paths to prepare for your technical interviews. Includes Striver's SDE Sheet, Blind 75, NeetCode 150 & more.
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
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to all plans
            </Button>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between flex-wrap gap-4">
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
                    size="lg"
                  >
                    {enrolledPlans.includes(selectedPlan.id) ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Enrolled
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" /> Start Plan
                      </>
                    )}
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

                {/* Progress Bar (if enrolled) */}
                {enrolledPlans.includes(selectedPlan.id) && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Your Progress</span>
                      <span className="text-primary font-bold">
                        {getPlanProgress(selectedPlan.id, selectedPlan).completed} / {getPlanProgress(selectedPlan.id, selectedPlan).total} problems
                      </span>
                    </div>
                    <Progress value={getPlanProgress(selectedPlan.id, selectedPlan).percentage} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {getPlanProgress(selectedPlan.id, selectedPlan).percentage}% complete
                    </p>
                  </div>
                )}

                {/* Topics */}
                <div>
                  <h3 className="font-semibold mb-2">Topics Covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlan.topics.map((topic) => (
                      <Badge key={topic} variant="secondary">{topic}</Badge>
                    ))}
                  </div>
                </div>

                {/* Weekly Breakdown with Problems */}
                <div>
                  <h3 className="font-semibold mb-4">Weekly Schedule & Problems</h3>
                  <div className="space-y-3">
                    {selectedPlan.weeks.map((week) => {
                      const weekCompleted = week.problems.filter(p => 
                        completedProblems[selectedPlan.id]?.includes(p.name)
                      ).length;
                      const isExpanded = expandedWeeks.has(week.week);
                      
                      return (
                        <Collapsible key={week.week} open={isExpanded} onOpenChange={() => toggleWeek(week.week)}>
                          <Card className="border-l-4 border-l-primary">
                            <CollapsibleTrigger asChild>
                              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors py-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    {isExpanded ? (
                                      <ChevronRight className="w-5 h-5 rotate-90 transition-transform" />
                                    ) : (
                                      <ChevronRight className="w-5 h-5 transition-transform" />
                                    )}
                                    <div>
                                      <h4 className="font-semibold">
                                        Week {week.week}: {week.focus}
                                      </h4>
                                      <p className="text-sm text-muted-foreground">
                                        {week.problems.length} problems
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    {enrolledPlans.includes(selectedPlan.id) && (
                                      <Badge variant={weekCompleted === week.problems.length ? "default" : "secondary"}>
                                        {weekCompleted}/{week.problems.length}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <CardContent className="pt-0 pb-4">
                                <div className="space-y-2 ml-8">
                                  {week.problems.map((problem, idx) => {
                                    const isCompleted = completedProblems[selectedPlan.id]?.includes(problem.name);
                                    const isEnrolled = enrolledPlans.includes(selectedPlan.id);
                                    
                                    return (
                                      <div 
                                        key={idx}
                                        className={`flex items-center justify-between p-3 rounded-lg border ${
                                          isCompleted ? 'bg-green-500/5 border-green-500/20' : 'bg-background border-border'
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          {isEnrolled && (
                                            <button
                                              onClick={() => toggleProblem(selectedPlan.id, problem.name)}
                                              className="hover:scale-110 transition-transform"
                                            >
                                              {isCompleted ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                              ) : (
                                                <Circle className="w-5 h-5 text-muted-foreground" />
                                              )}
                                            </button>
                                          )}
                                          <a
                                            href={problem.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium hover:text-primary transition-colors flex items-center gap-1"
                                          >
                                            {problem.name}
                                            <ExternalLink className="w-3 h-3" />
                                          </a>
                                        </div>
                                        <Badge 
                                          variant="outline" 
                                          className={problemDifficultyColors[problem.difficulty]}
                                        >
                                          {problem.difficulty}
                                        </Badge>
                                      </div>
                                    );
                                  })}
                                </div>
                              </CardContent>
                            </CollapsibleContent>
                          </Card>
                        </Collapsible>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STUDY_PLANS.map((plan) => {
              const progress = getPlanProgress(plan.id, plan);
              const isEnrolled = enrolledPlans.includes(plan.id);
              
              return (
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

                    {isEnrolled ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Progress
                          </span>
                          <span className="font-medium">{progress.percentage}%</span>
                        </div>
                        <Progress value={progress.percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {progress.completed} of {progress.total} problems completed
                        </p>
                      </div>
                    ) : (
                      <Button variant="outline" className="w-full">
                        View Plan <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
