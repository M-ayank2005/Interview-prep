import mongoose from 'mongoose';
import { Problem, StudyPlan, CompanyPattern } from '../models';
import config from '../config';

// Comprehensive problem data
const problems = [
  // Arrays & Hashing
  { name: 'Two Sum', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy', topics: ['Array', 'Hash Table'], companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Uber'], frequency: 95, leetcodeId: 1, patterns: ['Hash Map'], hints: ['Use a hash map to store seen values', 'For each element, check if target - element exists'] },
  { name: 'Contains Duplicate', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/contains-duplicate/', difficulty: 'Easy', topics: ['Array', 'Hash Table', 'Sorting'], companies: ['Amazon', 'Apple', 'Microsoft'], frequency: 85, leetcodeId: 217, patterns: ['Hash Set'], hints: ['Use a set to track seen elements'] },
  { name: 'Product of Array Except Self', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/product-of-array-except-self/', difficulty: 'Medium', topics: ['Array', 'Prefix Sum'], companies: ['Amazon', 'Facebook', 'Microsoft', 'Apple', 'Uber'], frequency: 90, leetcodeId: 238, patterns: ['Prefix/Suffix'], hints: ['Use prefix and suffix products', 'Can you do it without division?'] },
  { name: 'Maximum Subarray', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium', topics: ['Array', 'Dynamic Programming', 'Divide and Conquer'], companies: ['Amazon', 'Microsoft', 'Facebook', 'Apple', 'LinkedIn', 'Uber'], frequency: 95, leetcodeId: 53, patterns: ['Kadane\'s Algorithm', 'Dynamic Programming'], hints: ['Keep track of current sum and max sum', 'Reset current sum if it becomes negative'] },
  { name: 'Best Time to Buy and Sell Stock', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'Easy', topics: ['Array', 'Dynamic Programming'], companies: ['Amazon', 'Facebook', 'Microsoft', 'Goldman Sachs', 'Uber'], frequency: 92, leetcodeId: 121, patterns: ['One Pass'], hints: ['Track minimum price so far', 'Calculate profit at each step'] },
  { name: 'Subarray Sum Equals K', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium', topics: ['Array', 'Hash Table', 'Prefix Sum'], companies: ['Facebook', 'Google', 'Amazon', 'Microsoft'], frequency: 88, leetcodeId: 560, patterns: ['Prefix Sum', 'Hash Map'], hints: ['Use prefix sum with hash map', 'Count prefix sums'] },
  { name: 'Longest Consecutive Sequence', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/longest-consecutive-sequence/', difficulty: 'Medium', topics: ['Array', 'Hash Table', 'Union Find'], companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'], frequency: 85, leetcodeId: 128, patterns: ['Hash Set'], hints: ['Use a set for O(1) lookups', 'Only start counting from sequence start'] },
  { name: 'Majority Element', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/majority-element/', difficulty: 'Easy', topics: ['Array', 'Hash Table', 'Sorting'], companies: ['Amazon', 'Microsoft', 'Google'], frequency: 82, leetcodeId: 169, patterns: ['Boyer-Moore Voting'], hints: ['Boyer-Moore Voting algorithm', 'Element that appears more than n/2 times'] },
  { name: 'Set Matrix Zeroes', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/set-matrix-zeroes/', difficulty: 'Medium', topics: ['Array', 'Matrix'], companies: ['Microsoft', 'Amazon', 'Facebook'], frequency: 78, leetcodeId: 73, patterns: ['In-place'], hints: ['Use first row and column as markers', 'Be careful with the order of operations'] },
  { name: 'Merge Intervals', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium', topics: ['Array', 'Sorting'], companies: ['Google', 'Facebook', 'Amazon', 'Microsoft', 'Uber'], frequency: 92, leetcodeId: 56, patterns: ['Interval Merging'], hints: ['Sort by start time', 'Merge overlapping intervals'] },
  { name: 'Rotate Array', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/rotate-array/', difficulty: 'Medium', topics: ['Array', 'Two Pointers'], companies: ['Amazon', 'Microsoft'], frequency: 75, leetcodeId: 189, patterns: ['Array Reversal'], hints: ['Reverse entire array, then reverse parts'] },
  { name: 'Move Zeroes', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/move-zeroes/', difficulty: 'Easy', topics: ['Array', 'Two Pointers'], companies: ['Facebook', 'Amazon', 'Microsoft'], frequency: 80, leetcodeId: 283, patterns: ['Two Pointers'], hints: ['Use two pointers', 'Swap non-zero elements'] },
  
  // Two Pointers
  { name: 'Valid Palindrome', category: 'Two Pointers', url: 'https://leetcode.com/problems/valid-palindrome/', difficulty: 'Easy', topics: ['Two Pointers', 'String'], companies: ['Facebook', 'Microsoft', 'Amazon'], frequency: 85, leetcodeId: 125, patterns: ['Two Pointers'], hints: ['Skip non-alphanumeric characters', 'Compare from both ends'] },
  { name: 'Container With Most Water', category: 'Two Pointers', url: 'https://leetcode.com/problems/container-with-most-water/', difficulty: 'Medium', topics: ['Array', 'Two Pointers', 'Greedy'], companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], frequency: 88, leetcodeId: 11, patterns: ['Two Pointers'], hints: ['Start from both ends', 'Move the shorter pointer'] },
  { name: '3Sum', category: 'Two Pointers', url: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium', topics: ['Array', 'Two Pointers', 'Sorting'], companies: ['Facebook', 'Amazon', 'Microsoft', 'Google', 'Apple', 'Uber'], frequency: 95, leetcodeId: 15, patterns: ['Two Pointers', 'Sorting'], hints: ['Sort first', 'Fix one element and use two pointers', 'Skip duplicates'] },
  { name: '4Sum', category: 'Two Pointers', url: 'https://leetcode.com/problems/4sum/', difficulty: 'Medium', topics: ['Array', 'Two Pointers', 'Sorting'], companies: ['Amazon', 'Microsoft'], frequency: 70, leetcodeId: 18, patterns: ['Two Pointers'], hints: ['Similar to 3Sum', 'Fix two elements'] },
  { name: 'Remove Duplicates from Sorted Array', category: 'Two Pointers', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', difficulty: 'Easy', topics: ['Array', 'Two Pointers'], companies: ['Microsoft', 'Amazon', 'Facebook'], frequency: 82, leetcodeId: 26, patterns: ['Two Pointers'], hints: ['Use slow and fast pointers', 'Keep unique elements at the front'] },
  { name: 'Trapping Rain Water', category: 'Two Pointers', url: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'Hard', topics: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack'], companies: ['Amazon', 'Facebook', 'Google', 'Microsoft', 'Apple', 'Uber'], frequency: 95, leetcodeId: 42, patterns: ['Two Pointers', 'Dynamic Programming'], hints: ['Track left max and right max', 'Water at each position = min(leftMax, rightMax) - height'] },
  { name: 'Sort Colors', category: 'Two Pointers', url: 'https://leetcode.com/problems/sort-colors/', difficulty: 'Medium', topics: ['Array', 'Two Pointers', 'Sorting'], companies: ['Microsoft', 'Amazon', 'Facebook'], frequency: 82, leetcodeId: 75, patterns: ['Dutch National Flag', 'Three Pointers'], hints: ['Use three pointers', 'Dutch National Flag algorithm'] },
  
  // Sliding Window
  { name: 'Longest Substring Without Repeating Characters', category: 'Sliding Window', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium', topics: ['String', 'Sliding Window', 'Hash Table'], companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Apple', 'Uber'], frequency: 95, leetcodeId: 3, patterns: ['Sliding Window', 'Hash Map'], hints: ['Expand window while valid', 'Shrink when duplicate found'] },
  { name: 'Longest Repeating Character Replacement', category: 'Sliding Window', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/', difficulty: 'Medium', topics: ['String', 'Sliding Window'], companies: ['Google', 'Amazon'], frequency: 80, leetcodeId: 424, patterns: ['Sliding Window'], hints: ['Track most frequent character', 'Window is valid if (windowSize - maxFreq) <= k'] },
  { name: 'Minimum Window Substring', category: 'Sliding Window', url: 'https://leetcode.com/problems/minimum-window-substring/', difficulty: 'Hard', topics: ['String', 'Sliding Window', 'Hash Table'], companies: ['Facebook', 'Amazon', 'Microsoft', 'Google', 'Uber'], frequency: 92, leetcodeId: 76, patterns: ['Sliding Window', 'Hash Map'], hints: ['Expand to find valid window', 'Shrink to find minimum'] },
  { name: 'Permutation in String', category: 'Sliding Window', url: 'https://leetcode.com/problems/permutation-in-string/', difficulty: 'Medium', topics: ['String', 'Sliding Window'], companies: ['Microsoft', 'Amazon'], frequency: 78, leetcodeId: 567, patterns: ['Sliding Window', 'Fixed Size Window'], hints: ['Use fixed size window', 'Compare character frequencies'] },
  { name: 'Find All Anagrams in a String', category: 'Sliding Window', url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', difficulty: 'Medium', topics: ['String', 'Sliding Window', 'Hash Table'], companies: ['Amazon', 'Facebook', 'Microsoft'], frequency: 85, leetcodeId: 438, patterns: ['Sliding Window', 'Hash Map'], hints: ['Similar to permutation in string', 'Track all start indices'] },
  { name: 'Sliding Window Maximum', category: 'Sliding Window', url: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'Hard', topics: ['Array', 'Sliding Window', 'Monotonic Queue'], companies: ['Amazon', 'Google', 'Microsoft', 'Uber'], frequency: 88, leetcodeId: 239, patterns: ['Monotonic Deque', 'Sliding Window'], hints: ['Use monotonic decreasing deque', 'Remove elements out of window'] },
  
  // Binary Search
  { name: 'Binary Search', category: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/', difficulty: 'Easy', topics: ['Array', 'Binary Search'], companies: ['Microsoft', 'Amazon'], frequency: 85, leetcodeId: 704, patterns: ['Binary Search'], hints: ['Classic binary search', 'Be careful with mid calculation'] },
  { name: 'Search in Rotated Sorted Array', category: 'Binary Search', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'Medium', topics: ['Array', 'Binary Search'], companies: ['Facebook', 'Amazon', 'Microsoft', 'Google', 'Uber'], frequency: 92, leetcodeId: 33, patterns: ['Modified Binary Search'], hints: ['Find which half is sorted', 'Check if target is in sorted half'] },
  { name: 'Find Minimum in Rotated Sorted Array', category: 'Binary Search', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium', topics: ['Array', 'Binary Search'], companies: ['Amazon', 'Microsoft', 'Facebook'], frequency: 85, leetcodeId: 153, patterns: ['Modified Binary Search'], hints: ['Compare with rightmost element', 'Minimum is at rotation point'] },
  { name: 'Find First and Last Position', category: 'Binary Search', url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', difficulty: 'Medium', topics: ['Array', 'Binary Search'], companies: ['Facebook', 'Amazon', 'Microsoft'], frequency: 88, leetcodeId: 34, patterns: ['Binary Search Variants'], hints: ['Two binary searches', 'Find leftmost and rightmost'] },
  { name: 'Koko Eating Bananas', category: 'Binary Search', url: 'https://leetcode.com/problems/koko-eating-bananas/', difficulty: 'Medium', topics: ['Array', 'Binary Search'], companies: ['Facebook', 'Google'], frequency: 82, leetcodeId: 875, patterns: ['Binary Search on Answer'], hints: ['Binary search on eating speed', 'Check if speed is feasible'] },
  { name: 'Median of Two Sorted Arrays', category: 'Binary Search', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', difficulty: 'Hard', topics: ['Array', 'Binary Search', 'Divide and Conquer'], companies: ['Amazon', 'Google', 'Microsoft', 'Apple'], frequency: 88, leetcodeId: 4, patterns: ['Binary Search'], hints: ['Binary search on shorter array', 'Find correct partition'] },
  
  // Stack
  { name: 'Valid Parentheses', category: 'Stack', url: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'Easy', topics: ['String', 'Stack'], companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Apple'], frequency: 92, leetcodeId: 20, patterns: ['Stack'], hints: ['Push opening brackets', 'Pop and match for closing'] },
  { name: 'Next Greater Element I', category: 'Stack', url: 'https://leetcode.com/problems/next-greater-element-i/', difficulty: 'Easy', topics: ['Array', 'Stack', 'Hash Table'], companies: ['Amazon', 'Facebook'], frequency: 78, leetcodeId: 496, patterns: ['Monotonic Stack'], hints: ['Process from right to left', 'Maintain decreasing stack'] },
  { name: 'Daily Temperatures', category: 'Stack', url: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'Medium', topics: ['Array', 'Stack'], companies: ['Facebook', 'Amazon', 'Microsoft'], frequency: 85, leetcodeId: 739, patterns: ['Monotonic Stack'], hints: ['Use monotonic decreasing stack', 'Store indices'] },
  { name: 'Largest Rectangle in Histogram', category: 'Stack', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', difficulty: 'Hard', topics: ['Array', 'Stack'], companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'], frequency: 88, leetcodeId: 84, patterns: ['Monotonic Stack'], hints: ['Use monotonic increasing stack', 'Calculate area when popping'] },
  { name: 'Min Stack', category: 'Stack', url: 'https://leetcode.com/problems/min-stack/', difficulty: 'Medium', topics: ['Stack', 'Design'], companies: ['Amazon', 'Microsoft', 'Google'], frequency: 85, leetcodeId: 155, patterns: ['Stack Design'], hints: ['Store min with each element', 'Or use two stacks'] },
  
  // Trees
  { name: 'Maximum Depth of Binary Tree', category: 'Trees', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy', topics: ['Tree', 'DFS', 'BFS'], companies: ['Amazon', 'Microsoft', 'LinkedIn'], frequency: 88, leetcodeId: 104, patterns: ['DFS', 'Recursion'], hints: ['Recursive: 1 + max(left, right)', 'Iterative: use BFS with level count'] },
  { name: 'Diameter of Binary Tree', category: 'Trees', url: 'https://leetcode.com/problems/diameter-of-binary-tree/', difficulty: 'Easy', topics: ['Tree', 'DFS'], companies: ['Facebook', 'Amazon', 'Google'], frequency: 90, leetcodeId: 543, patterns: ['DFS'], hints: ['Diameter passes through some node', 'Track max(leftDepth + rightDepth)'] },
  { name: 'Invert Binary Tree', category: 'Trees', url: 'https://leetcode.com/problems/invert-binary-tree/', difficulty: 'Easy', topics: ['Tree', 'DFS', 'BFS'], companies: ['Google', 'Amazon'], frequency: 85, leetcodeId: 226, patterns: ['DFS', 'Recursion'], hints: ['Swap left and right children', 'Recursively invert subtrees'] },
  { name: 'Binary Tree Level Order Traversal', category: 'Trees', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'Medium', topics: ['Tree', 'BFS'], companies: ['Amazon', 'Facebook', 'Microsoft'], frequency: 90, leetcodeId: 102, patterns: ['BFS'], hints: ['Use queue', 'Process level by level'] },
  { name: 'Lowest Common Ancestor of BST', category: 'Trees', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', difficulty: 'Medium', topics: ['Tree', 'DFS', 'BST'], companies: ['Facebook', 'Amazon', 'Microsoft'], frequency: 88, leetcodeId: 235, patterns: ['BST Properties'], hints: ['Use BST property', 'Split point is LCA'] },
  { name: 'Validate Binary Search Tree', category: 'Trees', url: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'Medium', topics: ['Tree', 'DFS', 'BST'], companies: ['Amazon', 'Facebook', 'Microsoft'], frequency: 90, leetcodeId: 98, patterns: ['DFS', 'Range Validation'], hints: ['Track valid range', 'Inorder traversal should be sorted'] },
  { name: 'Kth Smallest Element in a BST', category: 'Trees', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', difficulty: 'Medium', topics: ['Tree', 'DFS', 'BST'], companies: ['Amazon', 'Facebook'], frequency: 85, leetcodeId: 230, patterns: ['Inorder Traversal'], hints: ['Inorder gives sorted order', 'Return kth element'] },
  { name: 'Serialize and Deserialize Binary Tree', category: 'Trees', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', difficulty: 'Hard', topics: ['Tree', 'DFS', 'BFS', 'Design'], companies: ['Facebook', 'Amazon', 'Microsoft', 'Google', 'Uber'], frequency: 92, leetcodeId: 297, patterns: ['Tree Serialization'], hints: ['Preorder with null markers', 'Use queue for deserialization'] },
  
  // Graphs
  { name: 'Number of Islands', category: 'Graphs', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium', topics: ['Graph', 'DFS', 'BFS', 'Union Find'], companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Apple', 'Uber'], frequency: 95, leetcodeId: 200, patterns: ['DFS/BFS Grid'], hints: ['DFS/BFS from each land cell', 'Mark visited cells'] },
  { name: 'Clone Graph', category: 'Graphs', url: 'https://leetcode.com/problems/clone-graph/', difficulty: 'Medium', topics: ['Graph', 'DFS', 'BFS'], companies: ['Facebook', 'Amazon', 'Microsoft'], frequency: 85, leetcodeId: 133, patterns: ['Graph Cloning', 'Hash Map'], hints: ['Use hash map to track cloned nodes', 'DFS/BFS traversal'] },
  { name: 'Course Schedule', category: 'Graphs', url: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium', topics: ['Graph', 'DFS', 'BFS', 'Topological Sort'], companies: ['Amazon', 'Facebook', 'Microsoft', 'Google'], frequency: 90, leetcodeId: 207, patterns: ['Topological Sort', 'Cycle Detection'], hints: ['Detect cycle in directed graph', 'Use topological sort'] },
  { name: 'Course Schedule II', category: 'Graphs', url: 'https://leetcode.com/problems/course-schedule-ii/', difficulty: 'Medium', topics: ['Graph', 'DFS', 'BFS', 'Topological Sort'], companies: ['Amazon', 'Facebook', 'Microsoft'], frequency: 88, leetcodeId: 210, patterns: ['Topological Sort'], hints: ['Return topological order', 'Empty if cycle exists'] },
  { name: 'Rotting Oranges', category: 'Graphs', url: 'https://leetcode.com/problems/rotting-oranges/', difficulty: 'Medium', topics: ['Graph', 'BFS'], companies: ['Amazon', 'Microsoft'], frequency: 85, leetcodeId: 994, patterns: ['Multi-source BFS'], hints: ['Start BFS from all rotten oranges', 'Track time/levels'] },
  { name: 'Word Ladder', category: 'Graphs', url: 'https://leetcode.com/problems/word-ladder/', difficulty: 'Hard', topics: ['Graph', 'BFS'], companies: ['Amazon', 'Facebook', 'Google', 'Microsoft'], frequency: 88, leetcodeId: 127, patterns: ['BFS', 'Graph Construction'], hints: ['BFS for shortest path', 'Preprocess word patterns'] },
  { name: 'Pacific Atlantic Water Flow', category: 'Graphs', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', difficulty: 'Medium', topics: ['Graph', 'DFS', 'BFS'], companies: ['Amazon', 'Google'], frequency: 80, leetcodeId: 417, patterns: ['Multi-source DFS/BFS'], hints: ['Start from ocean borders', 'Find intersection'] },
  { name: 'Network Delay Time', category: 'Graphs', url: 'https://leetcode.com/problems/network-delay-time/', difficulty: 'Medium', topics: ['Graph', 'Shortest Path', 'Dijkstra'], companies: ['Google', 'Amazon'], frequency: 82, leetcodeId: 743, patterns: ['Dijkstra\'s Algorithm'], hints: ['Use Dijkstra\'s algorithm', 'Return max distance'] },
  
  // Dynamic Programming
  { name: 'Climbing Stairs', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy', topics: ['Dynamic Programming'], companies: ['Amazon', 'Google', 'Microsoft'], frequency: 88, leetcodeId: 70, patterns: ['Fibonacci DP'], hints: ['dp[i] = dp[i-1] + dp[i-2]', 'Optimize to O(1) space'] },
  { name: 'House Robber', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/house-robber/', difficulty: 'Medium', topics: ['Dynamic Programming'], companies: ['Amazon', 'Google', 'Microsoft'], frequency: 90, leetcodeId: 198, patterns: ['1D DP'], hints: ['dp[i] = max(dp[i-1], dp[i-2] + nums[i])', 'Take or skip current house'] },
  { name: 'House Robber II', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/house-robber-ii/', difficulty: 'Medium', topics: ['Dynamic Programming'], companies: ['Amazon', 'Google'], frequency: 82, leetcodeId: 213, patterns: ['Circular DP'], hints: ['Circular array - two cases', 'Exclude first or last'] },
  { name: 'Coin Change', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/coin-change/', difficulty: 'Medium', topics: ['Dynamic Programming'], companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'], frequency: 92, leetcodeId: 322, patterns: ['Unbounded Knapsack'], hints: ['dp[i] = min coins to make amount i', 'Try each coin'] },
  { name: 'Longest Increasing Subsequence', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'Medium', topics: ['Dynamic Programming', 'Binary Search'], companies: ['Amazon', 'Microsoft', 'Google', 'Facebook'], frequency: 90, leetcodeId: 300, patterns: ['LIS', 'Binary Search DP'], hints: ['O(n²) DP solution', 'O(n log n) with binary search'] },
  { name: 'Longest Common Subsequence', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/longest-common-subsequence/', difficulty: 'Medium', topics: ['Dynamic Programming', 'String'], companies: ['Amazon', 'Google'], frequency: 85, leetcodeId: 1143, patterns: ['2D DP', 'LCS'], hints: ['2D DP table', 'Match or max of skip'] },
  { name: 'Edit Distance', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/edit-distance/', difficulty: 'Medium', topics: ['Dynamic Programming', 'String'], companies: ['Amazon', 'Google', 'Microsoft'], frequency: 88, leetcodeId: 72, patterns: ['2D DP', 'String DP'], hints: ['Insert, delete, replace operations', 'dp[i][j] = min operations'] },
  { name: 'Partition Equal Subset Sum', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/partition-equal-subset-sum/', difficulty: 'Medium', topics: ['Dynamic Programming'], companies: ['Facebook', 'Amazon'], frequency: 85, leetcodeId: 416, patterns: ['0/1 Knapsack'], hints: ['Sum must be even', 'Find subset with sum/2'] },
  { name: 'Unique Paths', category: 'Dynamic Programming', url: 'https://leetcode.com/problems/unique-paths/', difficulty: 'Medium', topics: ['Dynamic Programming', 'Math'], companies: ['Amazon', 'Google', 'Microsoft'], frequency: 85, leetcodeId: 62, patterns: ['Grid DP'], hints: ['dp[i][j] = dp[i-1][j] + dp[i][j-1]', 'Can reduce to 1D'] },
  
  // Greedy
  { name: 'Jump Game', category: 'Greedy', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'Medium', topics: ['Greedy', 'Dynamic Programming'], companies: ['Amazon', 'Microsoft', 'Facebook'], frequency: 88, leetcodeId: 55, patterns: ['Greedy'], hints: ['Track maximum reachable index', 'Return false if stuck'] },
  { name: 'Jump Game II', category: 'Greedy', url: 'https://leetcode.com/problems/jump-game-ii/', difficulty: 'Medium', topics: ['Greedy', 'Dynamic Programming'], companies: ['Amazon', 'Facebook'], frequency: 85, leetcodeId: 45, patterns: ['Greedy', 'BFS'], hints: ['Minimum jumps = BFS levels', 'Greedy: maximize reach'] },
  { name: 'Gas Station', category: 'Greedy', url: 'https://leetcode.com/problems/gas-station/', difficulty: 'Medium', topics: ['Greedy'], companies: ['Amazon', 'Microsoft'], frequency: 82, leetcodeId: 134, patterns: ['Greedy'], hints: ['Total gas >= total cost', 'Start from where deficit starts'] },
  { name: 'Non-overlapping Intervals', category: 'Greedy', url: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'Medium', topics: ['Greedy', 'Sorting'], companies: ['Facebook', 'Amazon'], frequency: 82, leetcodeId: 435, patterns: ['Interval Scheduling'], hints: ['Sort by end time', 'Greedy: keep non-overlapping'] },
  
  // Heap/Priority Queue
  { name: 'Kth Largest Element in an Array', category: 'Heap', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'Medium', topics: ['Heap', 'Sorting', 'Quickselect'], companies: ['Facebook', 'Amazon', 'Microsoft', 'Google'], frequency: 92, leetcodeId: 215, patterns: ['Min Heap', 'Quickselect'], hints: ['Min heap of size k', 'Or use quickselect O(n) avg'] },
  { name: 'Top K Frequent Elements', category: 'Heap', url: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'Medium', topics: ['Heap', 'Hash Table', 'Bucket Sort'], companies: ['Amazon', 'Facebook', 'Google'], frequency: 90, leetcodeId: 347, patterns: ['Min Heap', 'Bucket Sort'], hints: ['Count frequencies first', 'Heap or bucket sort'] },
  { name: 'Find Median from Data Stream', category: 'Heap', url: 'https://leetcode.com/problems/find-median-from-data-stream/', difficulty: 'Hard', topics: ['Heap', 'Design', 'Data Stream'], companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'], frequency: 90, leetcodeId: 295, patterns: ['Two Heaps'], hints: ['Max heap for lower half', 'Min heap for upper half'] },
  { name: 'Merge K Sorted Lists', category: 'Heap', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'Hard', topics: ['Heap', 'Linked List', 'Divide and Conquer'], companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Uber'], frequency: 95, leetcodeId: 23, patterns: ['Min Heap', 'Divide and Conquer'], hints: ['Min heap with k elements', 'Or merge pairwise'] },
  
  // Linked List
  { name: 'Reverse Linked List', category: 'Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'Easy', topics: ['Linked List'], companies: ['Amazon', 'Microsoft', 'Facebook', 'Google'], frequency: 92, leetcodeId: 206, patterns: ['Iterative Reversal'], hints: ['Three pointers: prev, curr, next', 'Recursive also works'] },
  { name: 'Merge Two Sorted Lists', category: 'Linked List', url: 'https://leetcode.com/problems/merge-two-sorted-lists/', difficulty: 'Easy', topics: ['Linked List'], companies: ['Amazon', 'Microsoft', 'Facebook'], frequency: 90, leetcodeId: 21, patterns: ['Two Pointers'], hints: ['Compare and link', 'Use dummy head'] },
  { name: 'Linked List Cycle', category: 'Linked List', url: 'https://leetcode.com/problems/linked-list-cycle/', difficulty: 'Easy', topics: ['Linked List', 'Two Pointers'], companies: ['Amazon', 'Microsoft'], frequency: 88, leetcodeId: 141, patterns: ['Floyd\'s Cycle Detection'], hints: ['Slow and fast pointers', 'They meet if cycle exists'] },
  { name: 'Reorder List', category: 'Linked List', url: 'https://leetcode.com/problems/reorder-list/', difficulty: 'Medium', topics: ['Linked List'], companies: ['Amazon', 'Facebook'], frequency: 82, leetcodeId: 143, patterns: ['Fast-Slow Pointers', 'Reversal'], hints: ['Find middle', 'Reverse second half', 'Merge'] },
  { name: 'LRU Cache', category: 'Linked List', url: 'https://leetcode.com/problems/lru-cache/', difficulty: 'Medium', topics: ['Linked List', 'Hash Table', 'Design'], companies: ['Amazon', 'Facebook', 'Microsoft', 'Google', 'Apple', 'Uber'], frequency: 95, leetcodeId: 146, patterns: ['Hash Map + Doubly Linked List'], hints: ['HashMap for O(1) access', 'DLL for O(1) remove/add'] },
  
  // Backtracking
  { name: 'Subsets', category: 'Backtracking', url: 'https://leetcode.com/problems/subsets/', difficulty: 'Medium', topics: ['Backtracking', 'Bit Manipulation'], companies: ['Amazon', 'Facebook', 'Microsoft'], frequency: 88, leetcodeId: 78, patterns: ['Backtracking', 'Include/Exclude'], hints: ['For each element: include or exclude', '2^n subsets'] },
  { name: 'Permutations', category: 'Backtracking', url: 'https://leetcode.com/problems/permutations/', difficulty: 'Medium', topics: ['Backtracking'], companies: ['Amazon', 'Microsoft', 'Facebook'], frequency: 90, leetcodeId: 46, patterns: ['Backtracking'], hints: ['Swap and recurse', 'Or use visited array'] },
  { name: 'Combination Sum', category: 'Backtracking', url: 'https://leetcode.com/problems/combination-sum/', difficulty: 'Medium', topics: ['Backtracking'], companies: ['Amazon', 'Facebook', 'Microsoft'], frequency: 88, leetcodeId: 39, patterns: ['Backtracking'], hints: ['Unlimited use of each element', 'Sort for pruning'] },
  { name: 'Word Search', category: 'Backtracking', url: 'https://leetcode.com/problems/word-search/', difficulty: 'Medium', topics: ['Backtracking', 'Matrix'], companies: ['Amazon', 'Microsoft', 'Facebook'], frequency: 88, leetcodeId: 79, patterns: ['DFS Backtracking'], hints: ['DFS from each cell', 'Mark visited, unmark on backtrack'] },
  { name: 'N-Queens', category: 'Backtracking', url: 'https://leetcode.com/problems/n-queens/', difficulty: 'Hard', topics: ['Backtracking'], companies: ['Amazon', 'Facebook'], frequency: 80, leetcodeId: 51, patterns: ['Backtracking', 'Constraint Satisfaction'], hints: ['Place row by row', 'Check column and diagonals'] },
];

// Company patterns
const companyPatterns = [
  {
    name: 'Google',
    slug: 'google',
    description: 'Google is known for asking challenging algorithm questions with focus on optimization and scalability.',
    interviewProcess: [
      { round: 1, name: 'Phone Screen', type: 'coding', duration: 45, description: 'One medium-hard coding problem', tips: ['Think aloud', 'Ask clarifying questions'] },
      { round: 2, name: 'Onsite 1', type: 'coding', duration: 45, description: 'Algorithm and data structures', tips: ['Focus on optimal solutions', 'Discuss trade-offs'] },
      { round: 3, name: 'Onsite 2', type: 'coding', duration: 45, description: 'Algorithm and data structures', tips: ['Expect harder problems', 'Show problem-solving process'] },
      { round: 4, name: 'Onsite 3', type: 'system-design', duration: 45, description: 'System design (for senior)', tips: ['Draw diagrams', 'Discuss scalability'] },
      { round: 5, name: 'Behavioral', type: 'behavioral', duration: 45, description: 'Googleyness and leadership', tips: ['Use STAR method', 'Show collaboration'] },
    ],
    frequentTopics: [
      { topic: 'Dynamic Programming', frequency: 30 },
      { topic: 'Graph Algorithms', frequency: 25 },
      { topic: 'Binary Search', frequency: 20 },
      { topic: 'Trees', frequency: 15 },
      { topic: 'String Manipulation', frequency: 10 },
    ],
    difficultyDistribution: { easy: 10, medium: 50, hard: 40 },
    avgDifficulty: 7,
    tips: [
      'Focus on optimal time and space complexity',
      'Be prepared for follow-up questions',
      'Practice problems with multiple solutions',
      'System design is crucial for senior roles',
    ],
  },
  {
    name: 'Amazon',
    slug: 'amazon',
    description: 'Amazon emphasizes Leadership Principles alongside technical skills. Expect behavioral questions in every round.',
    interviewProcess: [
      { round: 1, name: 'Online Assessment', type: 'coding', duration: 70, description: 'Two coding problems + work simulation', tips: ['Practice OA format', 'Time management is key'] },
      { round: 2, name: 'Phone Screen', type: 'coding', duration: 60, description: 'One coding problem + LP questions', tips: ['Know your projects well', 'Use STAR method'] },
      { round: 3, name: 'Loop 1', type: 'coding', duration: 60, description: 'Coding + Leadership Principles', tips: ['Prepare LP stories', 'Think of metrics'] },
      { round: 4, name: 'Loop 2', type: 'coding', duration: 60, description: 'Coding + Leadership Principles', tips: ['Different LP each round', 'Be specific with examples'] },
      { round: 5, name: 'Loop 3', type: 'system-design', duration: 60, description: 'System Design + LP', tips: ['Design for scale', 'Consider AWS services'] },
      { round: 6, name: 'Bar Raiser', type: 'mixed', duration: 60, description: 'Cross-team evaluation', tips: ['Show growth mindset', 'Demonstrate ownership'] },
    ],
    frequentTopics: [
      { topic: 'Arrays & Strings', frequency: 30 },
      { topic: 'Trees & Graphs', frequency: 25 },
      { topic: 'Dynamic Programming', frequency: 20 },
      { topic: 'OOP Design', frequency: 15 },
      { topic: 'System Design', frequency: 10 },
    ],
    difficultyDistribution: { easy: 20, medium: 60, hard: 20 },
    avgDifficulty: 6,
    tips: [
      'Master the 16 Leadership Principles',
      'Prepare 2-3 stories for each LP',
      'Focus on metrics and impact',
      'Practice OA-style problems',
    ],
  },
  {
    name: 'Microsoft',
    slug: 'microsoft',
    description: 'Microsoft values problem-solving ability and cultural fit. Interviews are collaborative.',
    interviewProcess: [
      { round: 1, name: 'Phone Screen', type: 'coding', duration: 45, description: 'One coding problem', tips: ['Write clean code', 'Explain your approach'] },
      { round: 2, name: 'Onsite 1', type: 'coding', duration: 45, description: 'Coding round', tips: ['Focus on correctness', 'Handle edge cases'] },
      { round: 3, name: 'Onsite 2', type: 'coding', duration: 45, description: 'Coding round', tips: ['Optimize your solution', 'Think about testing'] },
      { round: 4, name: 'Onsite 3', type: 'system-design', duration: 45, description: 'Design round', tips: ['Consider Azure services', 'Scale for millions'] },
      { round: 5, name: 'As Appropriate', type: 'behavioral', duration: 45, description: 'Hiring manager round', tips: ['Show enthusiasm', 'Ask good questions'] },
    ],
    frequentTopics: [
      { topic: 'Arrays & Hashing', frequency: 30 },
      { topic: 'Trees', frequency: 25 },
      { topic: 'Linked Lists', frequency: 20 },
      { topic: 'Dynamic Programming', frequency: 15 },
      { topic: 'Design', frequency: 10 },
    ],
    difficultyDistribution: { easy: 25, medium: 55, hard: 20 },
    avgDifficulty: 5.5,
    tips: [
      'Practice on whiteboard or shared editor',
      'Focus on communication',
      'Be ready to discuss your projects',
      'Show growth mindset',
    ],
  },
  {
    name: 'Facebook',
    slug: 'meta',
    description: 'Meta (Facebook) focuses on fast execution and practical problem-solving. Code must compile and run.',
    interviewProcess: [
      { round: 1, name: 'Phone Screen', type: 'coding', duration: 45, description: 'Two medium problems', tips: ['Be fast', 'Your code must run'] },
      { round: 2, name: 'Onsite 1', type: 'coding', duration: 45, description: 'Two coding problems', tips: ['45 mins = 2 problems', 'Practice speed'] },
      { round: 3, name: 'Onsite 2', type: 'coding', duration: 45, description: 'Two coding problems', tips: ['Optimal solutions expected', 'Clean code matters'] },
      { round: 4, name: 'System Design', type: 'system-design', duration: 45, description: 'Design a system', tips: ['Know Facebook products', 'Think about scale'] },
      { round: 5, name: 'Behavioral', type: 'behavioral', duration: 45, description: 'Core values fit', tips: ['Move fast mindset', 'Show impact'] },
    ],
    frequentTopics: [
      { topic: 'Arrays & Strings', frequency: 35 },
      { topic: 'Trees & Graphs', frequency: 25 },
      { topic: 'Dynamic Programming', frequency: 20 },
      { topic: 'Binary Search', frequency: 10 },
      { topic: 'Design', frequency: 10 },
    ],
    difficultyDistribution: { easy: 15, medium: 60, hard: 25 },
    avgDifficulty: 6.5,
    tips: [
      'Speed is crucial - practice timed problems',
      'Code must compile and run',
      'Prepare for 2 problems per round',
      'Know the product well',
    ],
  },
  {
    name: 'Uber',
    slug: 'uber',
    description: 'Uber interviews focus on practical problems and system design for their ride-sharing platform.',
    interviewProcess: [
      { round: 1, name: 'Phone Screen', type: 'coding', duration: 45, description: 'One coding problem with discussion', tips: ['Explain your thought process', 'Consider edge cases'] },
      { round: 2, name: 'Onsite 1', type: 'coding', duration: 45, description: 'Algorithm problem', tips: ['Focus on optimal solution', 'Discuss complexity'] },
      { round: 3, name: 'Onsite 2', type: 'coding', duration: 45, description: 'Data structures problem', tips: ['Know your data structures', 'Implement cleanly'] },
      { round: 4, name: 'System Design', type: 'system-design', duration: 60, description: 'Design Uber-like system', tips: ['Think about geolocation', 'Real-time updates'] },
      { round: 5, name: 'Behavioral', type: 'behavioral', duration: 45, description: 'Culture fit', tips: ['Know Uber values', 'Show ownership'] },
    ],
    frequentTopics: [
      { topic: 'Graphs & BFS/DFS', frequency: 30 },
      { topic: 'Arrays & Hashing', frequency: 25 },
      { topic: 'Dynamic Programming', frequency: 20 },
      { topic: 'Design', frequency: 15 },
      { topic: 'Heap/Priority Queue', frequency: 10 },
    ],
    difficultyDistribution: { easy: 15, medium: 55, hard: 30 },
    avgDifficulty: 6.5,
    tips: [
      'Understand ride-sharing system design',
      'Practice geolocation problems',
      'Focus on real-time systems',
      'Know about surge pricing algorithms',
    ],
  },
  {
    name: 'Apple',
    slug: 'apple',
    description: 'Apple values deep technical knowledge and attention to detail. Interviews are thorough.',
    interviewProcess: [
      { round: 1, name: 'Phone Screen', type: 'coding', duration: 60, description: 'Technical discussion + coding', tips: ['Know your domain', 'Clean solutions'] },
      { round: 2, name: 'Onsite 1', type: 'coding', duration: 60, description: 'Coding round', tips: ['Attention to detail', 'Edge cases matter'] },
      { round: 3, name: 'Onsite 2', type: 'coding', duration: 60, description: 'Coding round', tips: ['Optimal solutions', 'Clean code'] },
      { round: 4, name: 'Onsite 3', type: 'system-design', duration: 60, description: 'System design', tips: ['Think about user experience', 'Security matters'] },
      { round: 5, name: 'Hiring Manager', type: 'behavioral', duration: 60, description: 'Fit and culture', tips: ['Show passion for Apple', 'Discuss impact'] },
    ],
    frequentTopics: [
      { topic: 'Arrays & Strings', frequency: 30 },
      { topic: 'Trees', frequency: 25 },
      { topic: 'Dynamic Programming', frequency: 20 },
      { topic: 'Linked Lists', frequency: 15 },
      { topic: 'System Design', frequency: 10 },
    ],
    difficultyDistribution: { easy: 20, medium: 50, hard: 30 },
    avgDifficulty: 6,
    tips: [
      'Know Apple products deeply',
      'Show attention to detail',
      'Privacy and security focus',
      'Be prepared for longer interviews',
    ],
  },
];

// Curated study plans
const studyPlans = [
  {
    name: 'Blind 75',
    slug: 'blind-75',
    description: 'The famous Blind 75 list - essential problems that cover all major patterns for technical interviews.',
    type: 'curated',
    durationDays: 30,
    difficulty: 'mixed',
    tags: ['essential', 'popular', 'all-patterns'],
    isPublic: true,
  },
  {
    name: 'NeetCode 150',
    slug: 'neetcode-150',
    description: 'Extended version of Blind 75 with 150 carefully selected problems.',
    type: 'curated',
    durationDays: 45,
    difficulty: 'mixed',
    tags: ['comprehensive', 'popular'],
    isPublic: true,
  },
  {
    name: 'Dynamic Programming Mastery',
    slug: 'dp-mastery',
    description: 'Master dynamic programming from basics to advanced patterns.',
    type: 'topic',
    durationDays: 21,
    difficulty: 'advanced',
    tags: ['dp', 'advanced', 'pattern-focused'],
    isPublic: true,
  },
  {
    name: 'Graph Algorithms Deep Dive',
    slug: 'graph-deep-dive',
    description: 'Comprehensive coverage of graph algorithms including BFS, DFS, shortest paths, and advanced topics.',
    type: 'topic',
    durationDays: 14,
    difficulty: 'intermediate',
    tags: ['graphs', 'dfs', 'bfs', 'shortest-path'],
    isPublic: true,
  },
  {
    name: 'Two Week Sprint',
    slug: 'two-week-sprint',
    description: 'Intensive 2-week preparation covering all essential topics.',
    type: 'curated',
    durationDays: 14,
    difficulty: 'mixed',
    tags: ['intensive', 'short-term'],
    isPublic: true,
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      Problem.deleteMany({}),
      StudyPlan.deleteMany({}),
      CompanyPattern.deleteMany({}),
    ]);

    // Insert problems
    console.log('Seeding problems...');
    const createdProblems = await Problem.insertMany(
      problems.map((p) => ({
        ...p,
        slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        solution: {
          approach: `Standard ${p.patterns?.[0] || p.category} approach`,
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
          explanation: `This problem uses the ${p.patterns?.[0] || 'standard'} pattern.`,
        },
      }))
    );
    console.log(`Created ${createdProblems.length} problems`);

    // Insert company patterns
    console.log('Seeding company patterns...');
    const createdCompanies = await CompanyPattern.insertMany(
      companyPatterns.map((c) => ({
        ...c,
        topProblems: createdProblems
          .filter((p) => p.companies.includes(c.name))
          .slice(0, 10)
          .map((p) => p._id),
      }))
    );
    console.log(`Created ${createdCompanies.length} company patterns`);

    // Insert study plans with problems
    console.log('Seeding study plans...');
    const createdPlans = await StudyPlan.insertMany(
      studyPlans.map((plan) => {
        const planProblems = createdProblems
          .slice(0, plan.durationDays * 3)
          .map((p, idx) => ({
            problemId: p._id,
            day: Math.floor(idx / 3) + 1,
            order: (idx % 3) + 1,
            isOptional: idx % 5 === 0,
          }));

        return {
          ...plan,
          problems: planProblems,
        };
      })
    );
    console.log(`Created ${createdPlans.length} study plans`);

    console.log('\n✅ Database seeded successfully!');
    console.log(`   Problems: ${createdProblems.length}`);
    console.log(`   Companies: ${createdCompanies.length}`);
    console.log(`   Study Plans: ${createdPlans.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
