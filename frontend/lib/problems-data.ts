// Comprehensive DSA Problems Data for Interview Preparation
// Curated from LeetCode, NeetCode, and FAANG interview experiences

export interface TestCase {
  input: string;
  output: string;
}

export interface Problem {
  id: number;
  name: string;
  slug?: string; // Add slug for routing
  url: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  companies: string[];
  pattern: string;
  isBlind75: boolean;
  isNeetCode150: boolean;
  isFaangFavorite: boolean;
  description?: string;
  examples?: TestCase[];
  constraints?: string[];
  starterCode?: {
    [key: string]: string;
    cpp: string;
    java: string;
    python: string;
    go: string;
  };
}

const TWO_SUM_DESC = `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`;

const CONTAINS_DUPLICATE_DESC = `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`;

export const PROBLEMS: Problem[] = [
  // ============================================
  // ARRAYS & HASHING (25 problems)
  // ============================================
  { 
    id: 1, 
    name: 'Two Sum', 
    slug: 'two-sum',
    url: 'https://leetcode.com/problems/two-sum/', 
    difficulty: 'Easy', 
    category: 'Arrays & Hashing', 
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple'], 
    pattern: 'Hash Map', 
    isBlind75: true, 
    isNeetCode150: true, 
    isFaangFavorite: true,
    description: TWO_SUM_DESC,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        `,
      go: `func twoSum(nums []int, target int) []int {
    
}`
    }
  },
  { 
    id: 2, 
    name: 'Contains Duplicate', 
    slug: 'contains-duplicate',
    url: 'https://leetcode.com/problems/contains-duplicate/', 
    difficulty: 'Easy', 
    category: 'Arrays & Hashing', 
    companies: ['Amazon', 'Google', 'Microsoft'], 
    pattern: 'Hash Set', 
    isBlind75: true, 
    isNeetCode150: true, 
    isFaangFavorite: true,
    description: CONTAINS_DUPLICATE_DESC,
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    starterCode: {
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        
    }
};`,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        
    }
}`,
      python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        `,
      go: `func containsDuplicate(nums []int) bool {
    
}`
    }
  },
  { id: 3, name: 'Valid Anagram', url: 'https://leetcode.com/problems/valid-anagram/', difficulty: 'Easy', category: 'Arrays & Hashing', companies: ['Amazon', 'Microsoft', 'Google'], pattern: 'Hash Map', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 4, name: 'Group Anagrams', url: 'https://leetcode.com/problems/group-anagrams/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Amazon', 'Meta', 'Google', 'Microsoft'], pattern: 'Hash Map', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 5, name: 'Top K Frequent Elements', url: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Amazon', 'Meta', 'Google'], pattern: 'Bucket Sort', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 6, name: 'Product of Array Except Self', url: 'https://leetcode.com/problems/product-of-array-except-self/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Amazon', 'Meta', 'Microsoft', 'Apple'], pattern: 'Prefix Sum', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 7, name: 'Valid Sudoku', url: 'https://leetcode.com/problems/valid-sudoku/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Amazon', 'Microsoft', 'Uber'], pattern: 'Hash Set', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 8, name: 'Encode and Decode Strings', url: 'https://leetcode.com/problems/encode-and-decode-strings/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Google', 'Meta'], pattern: 'String', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 9, name: 'Longest Consecutive Sequence', url: 'https://leetcode.com/problems/longest-consecutive-sequence/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Google', 'Amazon', 'Meta'], pattern: 'Hash Set', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 10, name: 'Maximum Subarray', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Amazon', 'Microsoft', 'Google', 'Apple'], pattern: 'Kadane', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 11, name: 'Maximum Product Subarray', url: 'https://leetcode.com/problems/maximum-product-subarray/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Amazon', 'Google', 'Microsoft'], pattern: 'DP', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 12, name: 'Find Minimum in Rotated Sorted Array', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Amazon', 'Microsoft', 'Meta'], pattern: 'Binary Search', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 13, name: 'Search in Rotated Sorted Array', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Amazon', 'Meta', 'Microsoft', 'Google'], pattern: 'Binary Search', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 14, name: 'Majority Element', url: 'https://leetcode.com/problems/majority-element/', difficulty: 'Easy', category: 'Arrays & Hashing', companies: ['Amazon', 'Google', 'Microsoft'], pattern: 'Boyer-Moore', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 15, name: 'Missing Number', url: 'https://leetcode.com/problems/missing-number/', difficulty: 'Easy', category: 'Arrays & Hashing', companies: ['Amazon', 'Microsoft'], pattern: 'Math', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 16, name: 'Find All Duplicates in an Array', url: 'https://leetcode.com/problems/find-all-duplicates-in-an-array/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Amazon', 'Google'], pattern: 'Cyclic Sort', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 17, name: 'Set Matrix Zeroes', url: 'https://leetcode.com/problems/set-matrix-zeroes/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Amazon', 'Microsoft', 'Meta'], pattern: 'Matrix', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 18, name: 'Spiral Matrix', url: 'https://leetcode.com/problems/spiral-matrix/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Amazon', 'Microsoft', 'Google', 'Apple'], pattern: 'Matrix', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 19, name: 'Rotate Image', url: 'https://leetcode.com/problems/rotate-image/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Amazon', 'Microsoft', 'Apple'], pattern: 'Matrix', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 20, name: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Google', 'Meta', 'Amazon', 'Microsoft'], pattern: 'Intervals', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 21, name: 'Insert Interval', url: 'https://leetcode.com/problems/insert-interval/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Google', 'Meta', 'Amazon'], pattern: 'Intervals', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 22, name: 'Non-overlapping Intervals', url: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Amazon', 'Google'], pattern: 'Intervals', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 23, name: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium', category: 'Arrays & Hashing', companies: ['Meta', 'Google', 'Amazon'], pattern: 'Prefix Sum', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 24, name: 'Move Zeroes', url: 'https://leetcode.com/problems/move-zeroes/', difficulty: 'Easy', category: 'Arrays & Hashing', companies: ['Meta', 'Amazon', 'Microsoft'], pattern: 'Two Pointers', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 25, name: 'First Missing Positive', url: 'https://leetcode.com/problems/first-missing-positive/', difficulty: 'Hard', category: 'Arrays & Hashing', companies: ['Amazon', 'Google', 'Microsoft'], pattern: 'Cyclic Sort', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },

  // ============================================
  // TWO POINTERS (15 problems)
  // ============================================
  { id: 26, name: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/', difficulty: 'Easy', category: 'Two Pointers', companies: ['Meta', 'Amazon', 'Microsoft'], pattern: 'Two Pointers', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 27, name: 'Two Sum II - Input Array Is Sorted', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', difficulty: 'Medium', category: 'Two Pointers', companies: ['Amazon', 'Google'], pattern: 'Two Pointers', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 28, name: '3Sum', url: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium', category: 'Two Pointers', companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Apple'], pattern: 'Two Pointers', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 29, name: 'Container With Most Water', url: 'https://leetcode.com/problems/container-with-most-water/', difficulty: 'Medium', category: 'Two Pointers', companies: ['Amazon', 'Meta', 'Google', 'Microsoft'], pattern: 'Two Pointers', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 30, name: 'Trapping Rain Water', url: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'Hard', category: 'Two Pointers', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'], pattern: 'Two Pointers', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 31, name: 'Remove Duplicates from Sorted Array', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', difficulty: 'Easy', category: 'Two Pointers', companies: ['Meta', 'Amazon', 'Microsoft'], pattern: 'Two Pointers', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 32, name: 'Squares of a Sorted Array', url: 'https://leetcode.com/problems/squares-of-a-sorted-array/', difficulty: 'Easy', category: 'Two Pointers', companies: ['Meta', 'Amazon'], pattern: 'Two Pointers', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 33, name: 'Sort Colors', url: 'https://leetcode.com/problems/sort-colors/', difficulty: 'Medium', category: 'Two Pointers', companies: ['Amazon', 'Microsoft', 'Meta'], pattern: 'Dutch National Flag', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 34, name: '4Sum', url: 'https://leetcode.com/problems/4sum/', difficulty: 'Medium', category: 'Two Pointers', companies: ['Amazon', 'Google'], pattern: 'Two Pointers', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 35, name: 'Backspace String Compare', url: 'https://leetcode.com/problems/backspace-string-compare/', difficulty: 'Easy', category: 'Two Pointers', companies: ['Google', 'Meta'], pattern: 'Two Pointers', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 36, name: 'Partition Labels', url: 'https://leetcode.com/problems/partition-labels/', difficulty: 'Medium', category: 'Two Pointers', companies: ['Amazon', 'Google'], pattern: 'Greedy', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 37, name: 'Remove Element', url: 'https://leetcode.com/problems/remove-element/', difficulty: 'Easy', category: 'Two Pointers', companies: ['Amazon'], pattern: 'Two Pointers', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },
  { id: 38, name: 'Reverse String', url: 'https://leetcode.com/problems/reverse-string/', difficulty: 'Easy', category: 'Two Pointers', companies: ['Amazon', 'Microsoft'], pattern: 'Two Pointers', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },
  { id: 39, name: 'Merge Sorted Array', url: 'https://leetcode.com/problems/merge-sorted-array/', difficulty: 'Easy', category: 'Two Pointers', companies: ['Meta', 'Amazon', 'Microsoft'], pattern: 'Two Pointers', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 40, name: 'Is Subsequence', url: 'https://leetcode.com/problems/is-subsequence/', difficulty: 'Easy', category: 'Two Pointers', companies: ['Google'], pattern: 'Two Pointers', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },

  // ============================================
  // SLIDING WINDOW (15 problems)
  // ============================================
  { id: 41, name: 'Best Time to Buy and Sell Stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'Easy', category: 'Sliding Window', companies: ['Amazon', 'Meta', 'Microsoft', 'Google'], pattern: 'Sliding Window', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 42, name: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium', category: 'Sliding Window', companies: ['Amazon', 'Meta', 'Microsoft', 'Google', 'Apple'], pattern: 'Sliding Window', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 43, name: 'Longest Repeating Character Replacement', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/', difficulty: 'Medium', category: 'Sliding Window', companies: ['Google', 'Amazon'], pattern: 'Sliding Window', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 44, name: 'Permutation in String', url: 'https://leetcode.com/problems/permutation-in-string/', difficulty: 'Medium', category: 'Sliding Window', companies: ['Microsoft', 'Amazon', 'Meta'], pattern: 'Sliding Window', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 45, name: 'Minimum Window Substring', url: 'https://leetcode.com/problems/minimum-window-substring/', difficulty: 'Hard', category: 'Sliding Window', companies: ['Meta', 'Amazon', 'Google', 'Microsoft'], pattern: 'Sliding Window', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 46, name: 'Sliding Window Maximum', url: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'Hard', category: 'Sliding Window', companies: ['Amazon', 'Google', 'Microsoft'], pattern: 'Monotonic Deque', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 47, name: 'Find All Anagrams in a String', url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', difficulty: 'Medium', category: 'Sliding Window', companies: ['Amazon', 'Meta', 'Microsoft'], pattern: 'Sliding Window', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 48, name: 'Max Consecutive Ones III', url: 'https://leetcode.com/problems/max-consecutive-ones-iii/', difficulty: 'Medium', category: 'Sliding Window', companies: ['Google', 'Meta'], pattern: 'Sliding Window', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 49, name: 'Fruits Into Baskets', url: 'https://leetcode.com/problems/fruit-into-baskets/', difficulty: 'Medium', category: 'Sliding Window', companies: ['Google', 'Amazon'], pattern: 'Sliding Window', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 50, name: 'Longest Subarray of 1s After Deleting One Element', url: 'https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/', difficulty: 'Medium', category: 'Sliding Window', companies: ['Google'], pattern: 'Sliding Window', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },
  { id: 51, name: 'Subarrays with K Different Integers', url: 'https://leetcode.com/problems/subarrays-with-k-different-integers/', difficulty: 'Hard', category: 'Sliding Window', companies: ['Amazon', 'Google'], pattern: 'Sliding Window', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 52, name: 'Minimum Size Subarray Sum', url: 'https://leetcode.com/problems/minimum-size-subarray-sum/', difficulty: 'Medium', category: 'Sliding Window', companies: ['Meta', 'Amazon'], pattern: 'Sliding Window', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 53, name: 'Substring with Concatenation of All Words', url: 'https://leetcode.com/problems/substring-with-concatenation-of-all-words/', difficulty: 'Hard', category: 'Sliding Window', companies: ['Amazon'], pattern: 'Sliding Window', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },
  { id: 54, name: 'Grumpy Bookstore Owner', url: 'https://leetcode.com/problems/grumpy-bookstore-owner/', difficulty: 'Medium', category: 'Sliding Window', companies: ['Amazon'], pattern: 'Sliding Window', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },
  { id: 55, name: 'Minimum Number of Flips to Make Binary String Alternating', url: 'https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-string-alternating/', difficulty: 'Medium', category: 'Sliding Window', companies: ['Microsoft'], pattern: 'Sliding Window', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },

  // ============================================
  // STACK (15 problems)
  // ============================================
  { id: 56, name: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'Easy', category: 'Stack', companies: ['Amazon', 'Meta', 'Google', 'Microsoft'], pattern: 'Stack', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 57, name: 'Min Stack', url: 'https://leetcode.com/problems/min-stack/', difficulty: 'Medium', category: 'Stack', companies: ['Amazon', 'Microsoft', 'Google'], pattern: 'Stack', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 58, name: 'Evaluate Reverse Polish Notation', url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', difficulty: 'Medium', category: 'Stack', companies: ['Amazon', 'Google', 'Microsoft'], pattern: 'Stack', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 59, name: 'Generate Parentheses', url: 'https://leetcode.com/problems/generate-parentheses/', difficulty: 'Medium', category: 'Stack', companies: ['Amazon', 'Google', 'Meta'], pattern: 'Backtracking', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 60, name: 'Daily Temperatures', url: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'Medium', category: 'Stack', companies: ['Amazon', 'Meta', 'Google'], pattern: 'Monotonic Stack', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 61, name: 'Car Fleet', url: 'https://leetcode.com/problems/car-fleet/', difficulty: 'Medium', category: 'Stack', companies: ['Google'], pattern: 'Monotonic Stack', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 62, name: 'Largest Rectangle in Histogram', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', difficulty: 'Hard', category: 'Stack', companies: ['Amazon', 'Google', 'Microsoft'], pattern: 'Monotonic Stack', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 63, name: 'Next Greater Element I', url: 'https://leetcode.com/problems/next-greater-element-i/', difficulty: 'Easy', category: 'Stack', companies: ['Amazon', 'Google'], pattern: 'Monotonic Stack', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 64, name: 'Next Greater Element II', url: 'https://leetcode.com/problems/next-greater-element-ii/', difficulty: 'Medium', category: 'Stack', companies: ['Amazon', 'Google'], pattern: 'Monotonic Stack', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 65, name: 'Simplify Path', url: 'https://leetcode.com/problems/simplify-path/', difficulty: 'Medium', category: 'Stack', companies: ['Meta', 'Amazon'], pattern: 'Stack', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 66, name: 'Remove K Digits', url: 'https://leetcode.com/problems/remove-k-digits/', difficulty: 'Medium', category: 'Stack', companies: ['Amazon', 'Google'], pattern: 'Monotonic Stack', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 67, name: 'Asteroid Collision', url: 'https://leetcode.com/problems/asteroid-collision/', difficulty: 'Medium', category: 'Stack', companies: ['Amazon', 'Google'], pattern: 'Stack', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 68, name: 'Basic Calculator', url: 'https://leetcode.com/problems/basic-calculator/', difficulty: 'Hard', category: 'Stack', companies: ['Amazon', 'Meta', 'Google'], pattern: 'Stack', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 69, name: 'Basic Calculator II', url: 'https://leetcode.com/problems/basic-calculator-ii/', difficulty: 'Medium', category: 'Stack', companies: ['Amazon', 'Meta', 'Microsoft'], pattern: 'Stack', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 70, name: 'Decode String', url: 'https://leetcode.com/problems/decode-string/', difficulty: 'Medium', category: 'Stack', companies: ['Google', 'Amazon', 'Microsoft'], pattern: 'Stack', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },

  // ============================================
  // BINARY SEARCH (15 problems)
  // ============================================
  { id: 71, name: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/', difficulty: 'Easy', category: 'Binary Search', companies: ['Amazon', 'Microsoft'], pattern: 'Binary Search', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 72, name: 'Search a 2D Matrix', url: 'https://leetcode.com/problems/search-a-2d-matrix/', difficulty: 'Medium', category: 'Binary Search', companies: ['Amazon', 'Microsoft', 'Google'], pattern: 'Binary Search', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 73, name: 'Koko Eating Bananas', url: 'https://leetcode.com/problems/koko-eating-bananas/', difficulty: 'Medium', category: 'Binary Search', companies: ['Google', 'Amazon'], pattern: 'Binary Search', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 74, name: 'Find Minimum in Rotated Sorted Array', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium', category: 'Binary Search', companies: ['Amazon', 'Microsoft', 'Meta'], pattern: 'Binary Search', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 75, name: 'Search in Rotated Sorted Array', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'Medium', category: 'Binary Search', companies: ['Amazon', 'Meta', 'Google', 'Microsoft'], pattern: 'Binary Search', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 76, name: 'Time Based Key-Value Store', url: 'https://leetcode.com/problems/time-based-key-value-store/', difficulty: 'Medium', category: 'Binary Search', companies: ['Google', 'Amazon'], pattern: 'Binary Search', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 77, name: 'Median of Two Sorted Arrays', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', difficulty: 'Hard', category: 'Binary Search', companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'], pattern: 'Binary Search', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 78, name: 'Find First and Last Position of Element', url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', difficulty: 'Medium', category: 'Binary Search', companies: ['Amazon', 'Meta', 'Google'], pattern: 'Binary Search', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 79, name: 'Search Insert Position', url: 'https://leetcode.com/problems/search-insert-position/', difficulty: 'Easy', category: 'Binary Search', companies: ['Amazon', 'Google'], pattern: 'Binary Search', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 80, name: 'Capacity To Ship Packages Within D Days', url: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', difficulty: 'Medium', category: 'Binary Search', companies: ['Amazon', 'Google'], pattern: 'Binary Search', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 81, name: 'Split Array Largest Sum', url: 'https://leetcode.com/problems/split-array-largest-sum/', difficulty: 'Hard', category: 'Binary Search', companies: ['Google', 'Amazon'], pattern: 'Binary Search', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 82, name: 'Find Peak Element', url: 'https://leetcode.com/problems/find-peak-element/', difficulty: 'Medium', category: 'Binary Search', companies: ['Meta', 'Google', 'Amazon'], pattern: 'Binary Search', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 83, name: 'Single Element in a Sorted Array', url: 'https://leetcode.com/problems/single-element-in-a-sorted-array/', difficulty: 'Medium', category: 'Binary Search', companies: ['Amazon', 'Google'], pattern: 'Binary Search', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 84, name: 'Search a 2D Matrix II', url: 'https://leetcode.com/problems/search-a-2d-matrix-ii/', difficulty: 'Medium', category: 'Binary Search', companies: ['Amazon', 'Microsoft', 'Google'], pattern: 'Binary Search', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 85, name: 'Sqrt(x)', url: 'https://leetcode.com/problems/sqrtx/', difficulty: 'Easy', category: 'Binary Search', companies: ['Amazon', 'Meta', 'Microsoft'], pattern: 'Binary Search', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },

  // ============================================
  // LINKED LIST (15 problems)
  // ============================================
  { id: 86, name: 'Reverse Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'Easy', category: 'Linked List', companies: ['Amazon', 'Microsoft', 'Google', 'Meta'], pattern: 'Linked List', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 87, name: 'Merge Two Sorted Lists', url: 'https://leetcode.com/problems/merge-two-sorted-lists/', difficulty: 'Easy', category: 'Linked List', companies: ['Amazon', 'Microsoft', 'Google', 'Apple'], pattern: 'Linked List', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 88, name: 'Reorder List', url: 'https://leetcode.com/problems/reorder-list/', difficulty: 'Medium', category: 'Linked List', companies: ['Amazon', 'Meta', 'Microsoft'], pattern: 'Linked List', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 89, name: 'Remove Nth Node From End of List', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', difficulty: 'Medium', category: 'Linked List', companies: ['Amazon', 'Meta', 'Google'], pattern: 'Two Pointers', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 90, name: 'Copy List with Random Pointer', url: 'https://leetcode.com/problems/copy-list-with-random-pointer/', difficulty: 'Medium', category: 'Linked List', companies: ['Amazon', 'Meta', 'Microsoft'], pattern: 'Linked List', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 91, name: 'Add Two Numbers', url: 'https://leetcode.com/problems/add-two-numbers/', difficulty: 'Medium', category: 'Linked List', companies: ['Amazon', 'Microsoft', 'Google', 'Apple'], pattern: 'Linked List', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 92, name: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle/', difficulty: 'Easy', category: 'Linked List', companies: ['Amazon', 'Microsoft', 'Meta'], pattern: 'Fast Slow Pointers', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 93, name: 'Find the Duplicate Number', url: 'https://leetcode.com/problems/find-the-duplicate-number/', difficulty: 'Medium', category: 'Linked List', companies: ['Amazon', 'Microsoft', 'Google'], pattern: 'Fast Slow Pointers', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 94, name: 'LRU Cache', url: 'https://leetcode.com/problems/lru-cache/', difficulty: 'Medium', category: 'Linked List', companies: ['Amazon', 'Meta', 'Google', 'Microsoft'], pattern: 'Linked List + HashMap', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 95, name: 'Merge k Sorted Lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'Hard', category: 'Linked List', companies: ['Amazon', 'Meta', 'Google', 'Microsoft'], pattern: 'Heap', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 96, name: 'Reverse Nodes in k-Group', url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', difficulty: 'Hard', category: 'Linked List', companies: ['Amazon', 'Microsoft', 'Meta'], pattern: 'Linked List', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 97, name: 'Middle of the Linked List', url: 'https://leetcode.com/problems/middle-of-the-linked-list/', difficulty: 'Easy', category: 'Linked List', companies: ['Amazon', 'Meta'], pattern: 'Fast Slow Pointers', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 98, name: 'Palindrome Linked List', url: 'https://leetcode.com/problems/palindrome-linked-list/', difficulty: 'Easy', category: 'Linked List', companies: ['Meta', 'Amazon', 'Microsoft'], pattern: 'Fast Slow Pointers', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 99, name: 'Linked List Cycle II', url: 'https://leetcode.com/problems/linked-list-cycle-ii/', difficulty: 'Medium', category: 'Linked List', companies: ['Amazon', 'Microsoft'], pattern: 'Fast Slow Pointers', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 100, name: 'Remove Linked List Elements', url: 'https://leetcode.com/problems/remove-linked-list-elements/', difficulty: 'Easy', category: 'Linked List', companies: ['Amazon'], pattern: 'Linked List', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },

  // ============================================
  // TREES (25 problems)
  // ============================================
  { id: 101, name: 'Invert Binary Tree', url: 'https://leetcode.com/problems/invert-binary-tree/', difficulty: 'Easy', category: 'Trees', companies: ['Google', 'Amazon', 'Microsoft'], pattern: 'DFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 102, name: 'Maximum Depth of Binary Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy', category: 'Trees', companies: ['Amazon', 'Microsoft', 'Google'], pattern: 'DFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 103, name: 'Diameter of Binary Tree', url: 'https://leetcode.com/problems/diameter-of-binary-tree/', difficulty: 'Easy', category: 'Trees', companies: ['Meta', 'Amazon', 'Google'], pattern: 'DFS', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 104, name: 'Balanced Binary Tree', url: 'https://leetcode.com/problems/balanced-binary-tree/', difficulty: 'Easy', category: 'Trees', companies: ['Amazon', 'Google'], pattern: 'DFS', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 105, name: 'Same Tree', url: 'https://leetcode.com/problems/same-tree/', difficulty: 'Easy', category: 'Trees', companies: ['Amazon', 'Microsoft'], pattern: 'DFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 106, name: 'Subtree of Another Tree', url: 'https://leetcode.com/problems/subtree-of-another-tree/', difficulty: 'Easy', category: 'Trees', companies: ['Amazon', 'Meta', 'Microsoft'], pattern: 'DFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 107, name: 'Lowest Common Ancestor of a BST', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', difficulty: 'Medium', category: 'Trees', companies: ['Meta', 'Amazon', 'Microsoft'], pattern: 'BST', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 108, name: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'Medium', category: 'Trees', companies: ['Amazon', 'Meta', 'Microsoft', 'Google'], pattern: 'BFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 109, name: 'Binary Tree Right Side View', url: 'https://leetcode.com/problems/binary-tree-right-side-view/', difficulty: 'Medium', category: 'Trees', companies: ['Meta', 'Amazon', 'Microsoft'], pattern: 'BFS', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 110, name: 'Count Good Nodes in Binary Tree', url: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/', difficulty: 'Medium', category: 'Trees', companies: ['Microsoft', 'Amazon'], pattern: 'DFS', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 111, name: 'Validate Binary Search Tree', url: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'Medium', category: 'Trees', companies: ['Amazon', 'Meta', 'Microsoft', 'Google'], pattern: 'DFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 112, name: 'Kth Smallest Element in a BST', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', difficulty: 'Medium', category: 'Trees', companies: ['Amazon', 'Meta', 'Microsoft'], pattern: 'DFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 113, name: 'Construct Binary Tree from Preorder and Inorder', url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', difficulty: 'Medium', category: 'Trees', companies: ['Amazon', 'Microsoft', 'Google'], pattern: 'DFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 114, name: 'Binary Tree Maximum Path Sum', url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', difficulty: 'Hard', category: 'Trees', companies: ['Meta', 'Amazon', 'Google', 'Microsoft'], pattern: 'DFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 115, name: 'Serialize and Deserialize Binary Tree', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', difficulty: 'Hard', category: 'Trees', companies: ['Meta', 'Amazon', 'Google', 'Microsoft'], pattern: 'DFS/BFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 116, name: 'Lowest Common Ancestor of a Binary Tree', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', difficulty: 'Medium', category: 'Trees', companies: ['Meta', 'Amazon', 'Microsoft', 'Google'], pattern: 'DFS', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 117, name: 'Path Sum', url: 'https://leetcode.com/problems/path-sum/', difficulty: 'Easy', category: 'Trees', companies: ['Amazon', 'Microsoft'], pattern: 'DFS', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 118, name: 'Path Sum II', url: 'https://leetcode.com/problems/path-sum-ii/', difficulty: 'Medium', category: 'Trees', companies: ['Amazon', 'Meta'], pattern: 'DFS', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 119, name: 'Path Sum III', url: 'https://leetcode.com/problems/path-sum-iii/', difficulty: 'Medium', category: 'Trees', companies: ['Amazon', 'Meta'], pattern: 'Prefix Sum', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 120, name: 'Binary Tree Zigzag Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', difficulty: 'Medium', category: 'Trees', companies: ['Amazon', 'Meta', 'Microsoft'], pattern: 'BFS', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 121, name: 'Symmetric Tree', url: 'https://leetcode.com/problems/symmetric-tree/', difficulty: 'Easy', category: 'Trees', companies: ['Amazon', 'Microsoft'], pattern: 'DFS', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 122, name: 'Populating Next Right Pointers', url: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/', difficulty: 'Medium', category: 'Trees', companies: ['Meta', 'Amazon'], pattern: 'BFS', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 123, name: 'Flatten Binary Tree to Linked List', url: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/', difficulty: 'Medium', category: 'Trees', companies: ['Meta', 'Amazon', 'Microsoft'], pattern: 'DFS', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 124, name: 'Convert BST to Greater Tree', url: 'https://leetcode.com/problems/convert-bst-to-greater-tree/', difficulty: 'Medium', category: 'Trees', companies: ['Amazon'], pattern: 'DFS', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },
  { id: 125, name: 'All Nodes Distance K in Binary Tree', url: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/', difficulty: 'Medium', category: 'Trees', companies: ['Amazon', 'Meta'], pattern: 'BFS', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },

  // ============================================
  // TRIES (5 problems)
  // ============================================
  { id: 126, name: 'Implement Trie (Prefix Tree)', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/', difficulty: 'Medium', category: 'Tries', companies: ['Amazon', 'Google', 'Microsoft'], pattern: 'Trie', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 127, name: 'Design Add and Search Words Data Structure', url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', difficulty: 'Medium', category: 'Tries', companies: ['Amazon', 'Meta'], pattern: 'Trie', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 128, name: 'Word Search II', url: 'https://leetcode.com/problems/word-search-ii/', difficulty: 'Hard', category: 'Tries', companies: ['Amazon', 'Google', 'Microsoft'], pattern: 'Trie + Backtracking', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 129, name: 'Replace Words', url: 'https://leetcode.com/problems/replace-words/', difficulty: 'Medium', category: 'Tries', companies: ['Amazon'], pattern: 'Trie', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },
  { id: 130, name: 'Longest Word in Dictionary', url: 'https://leetcode.com/problems/longest-word-in-dictionary/', difficulty: 'Medium', category: 'Tries', companies: ['Amazon'], pattern: 'Trie', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },

  // ============================================
  // HEAP / PRIORITY QUEUE (12 problems)
  // ============================================
  { id: 131, name: 'Kth Largest Element in a Stream', url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/', difficulty: 'Easy', category: 'Heap', companies: ['Amazon', 'Meta'], pattern: 'Heap', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 132, name: 'Last Stone Weight', url: 'https://leetcode.com/problems/last-stone-weight/', difficulty: 'Easy', category: 'Heap', companies: ['Amazon'], pattern: 'Heap', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 133, name: 'K Closest Points to Origin', url: 'https://leetcode.com/problems/k-closest-points-to-origin/', difficulty: 'Medium', category: 'Heap', companies: ['Amazon', 'Meta', 'Google'], pattern: 'Heap', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 134, name: 'Kth Largest Element in an Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'Medium', category: 'Heap', companies: ['Meta', 'Amazon', 'Microsoft', 'Google'], pattern: 'Heap/Quick Select', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 135, name: 'Task Scheduler', url: 'https://leetcode.com/problems/task-scheduler/', difficulty: 'Medium', category: 'Heap', companies: ['Meta', 'Amazon', 'Microsoft'], pattern: 'Heap + Greedy', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 136, name: 'Design Twitter', url: 'https://leetcode.com/problems/design-twitter/', difficulty: 'Medium', category: 'Heap', companies: ['Amazon'], pattern: 'Heap', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 137, name: 'Find Median from Data Stream', url: 'https://leetcode.com/problems/find-median-from-data-stream/', difficulty: 'Hard', category: 'Heap', companies: ['Amazon', 'Meta', 'Google', 'Microsoft'], pattern: 'Two Heaps', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 138, name: 'Merge k Sorted Lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'Hard', category: 'Heap', companies: ['Amazon', 'Meta', 'Google', 'Microsoft'], pattern: 'Heap', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 139, name: 'Top K Frequent Words', url: 'https://leetcode.com/problems/top-k-frequent-words/', difficulty: 'Medium', category: 'Heap', companies: ['Amazon', 'Google'], pattern: 'Heap', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 140, name: 'Reorganize String', url: 'https://leetcode.com/problems/reorganize-string/', difficulty: 'Medium', category: 'Heap', companies: ['Amazon', 'Meta', 'Google'], pattern: 'Heap', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 141, name: 'Meeting Rooms II', url: 'https://leetcode.com/problems/meeting-rooms-ii/', difficulty: 'Medium', category: 'Heap', companies: ['Google', 'Amazon', 'Meta', 'Microsoft'], pattern: 'Heap', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 142, name: 'Smallest Range Covering Elements from K Lists', url: 'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/', difficulty: 'Hard', category: 'Heap', companies: ['Google', 'Amazon'], pattern: 'Heap', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },

  // ============================================
  // BACKTRACKING (15 problems)
  // ============================================
  { id: 143, name: 'Subsets', url: 'https://leetcode.com/problems/subsets/', difficulty: 'Medium', category: 'Backtracking', companies: ['Amazon', 'Meta', 'Google'], pattern: 'Backtracking', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 144, name: 'Combination Sum', url: 'https://leetcode.com/problems/combination-sum/', difficulty: 'Medium', category: 'Backtracking', companies: ['Amazon', 'Meta', 'Google'], pattern: 'Backtracking', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 145, name: 'Permutations', url: 'https://leetcode.com/problems/permutations/', difficulty: 'Medium', category: 'Backtracking', companies: ['Amazon', 'Meta', 'Google', 'Microsoft'], pattern: 'Backtracking', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 146, name: 'Subsets II', url: 'https://leetcode.com/problems/subsets-ii/', difficulty: 'Medium', category: 'Backtracking', companies: ['Amazon', 'Meta'], pattern: 'Backtracking', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 147, name: 'Combination Sum II', url: 'https://leetcode.com/problems/combination-sum-ii/', difficulty: 'Medium', category: 'Backtracking', companies: ['Amazon', 'Meta'], pattern: 'Backtracking', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 148, name: 'Word Search', url: 'https://leetcode.com/problems/word-search/', difficulty: 'Medium', category: 'Backtracking', companies: ['Amazon', 'Meta', 'Microsoft'], pattern: 'Backtracking', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 149, name: 'Palindrome Partitioning', url: 'https://leetcode.com/problems/palindrome-partitioning/', difficulty: 'Medium', category: 'Backtracking', companies: ['Amazon', 'Google'], pattern: 'Backtracking', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 150, name: 'Letter Combinations of a Phone Number', url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', difficulty: 'Medium', category: 'Backtracking', companies: ['Amazon', 'Meta', 'Google'], pattern: 'Backtracking', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 151, name: 'N-Queens', url: 'https://leetcode.com/problems/n-queens/', difficulty: 'Hard', category: 'Backtracking', companies: ['Amazon', 'Google', 'Microsoft'], pattern: 'Backtracking', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 152, name: 'Permutations II', url: 'https://leetcode.com/problems/permutations-ii/', difficulty: 'Medium', category: 'Backtracking', companies: ['Amazon', 'Meta'], pattern: 'Backtracking', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 153, name: 'Combination Sum III', url: 'https://leetcode.com/problems/combination-sum-iii/', difficulty: 'Medium', category: 'Backtracking', companies: ['Amazon'], pattern: 'Backtracking', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },
  { id: 154, name: 'Generate Parentheses', url: 'https://leetcode.com/problems/generate-parentheses/', difficulty: 'Medium', category: 'Backtracking', companies: ['Amazon', 'Google', 'Meta'], pattern: 'Backtracking', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 155, name: 'Sudoku Solver', url: 'https://leetcode.com/problems/sudoku-solver/', difficulty: 'Hard', category: 'Backtracking', companies: ['Amazon', 'Google'], pattern: 'Backtracking', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 156, name: 'Restore IP Addresses', url: 'https://leetcode.com/problems/restore-ip-addresses/', difficulty: 'Medium', category: 'Backtracking', companies: ['Amazon', 'Meta'], pattern: 'Backtracking', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 157, name: 'Matchsticks to Square', url: 'https://leetcode.com/problems/matchsticks-to-square/', difficulty: 'Medium', category: 'Backtracking', companies: ['Amazon'], pattern: 'Backtracking', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },

  // ============================================
  // GRAPHS (25 problems)
  // ============================================
  { id: 158, name: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium', category: 'Graphs', companies: ['Amazon', 'Meta', 'Google', 'Microsoft'], pattern: 'DFS/BFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 159, name: 'Clone Graph', url: 'https://leetcode.com/problems/clone-graph/', difficulty: 'Medium', category: 'Graphs', companies: ['Amazon', 'Meta', 'Google'], pattern: 'DFS/BFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 160, name: 'Max Area of Island', url: 'https://leetcode.com/problems/max-area-of-island/', difficulty: 'Medium', category: 'Graphs', companies: ['Amazon', 'Meta', 'Google'], pattern: 'DFS', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 161, name: 'Pacific Atlantic Water Flow', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', difficulty: 'Medium', category: 'Graphs', companies: ['Amazon', 'Google'], pattern: 'DFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 162, name: 'Surrounded Regions', url: 'https://leetcode.com/problems/surrounded-regions/', difficulty: 'Medium', category: 'Graphs', companies: ['Amazon', 'Google'], pattern: 'DFS', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 163, name: 'Rotting Oranges', url: 'https://leetcode.com/problems/rotting-oranges/', difficulty: 'Medium', category: 'Graphs', companies: ['Amazon', 'Meta', 'Microsoft'], pattern: 'BFS', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 164, name: 'Walls and Gates', url: 'https://leetcode.com/problems/walls-and-gates/', difficulty: 'Medium', category: 'Graphs', companies: ['Meta', 'Google'], pattern: 'BFS', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 165, name: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium', category: 'Graphs', companies: ['Amazon', 'Google', 'Meta', 'Microsoft'], pattern: 'Topological Sort', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 166, name: 'Course Schedule II', url: 'https://leetcode.com/problems/course-schedule-ii/', difficulty: 'Medium', category: 'Graphs', companies: ['Amazon', 'Google', 'Meta'], pattern: 'Topological Sort', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 167, name: 'Redundant Connection', url: 'https://leetcode.com/problems/redundant-connection/', difficulty: 'Medium', category: 'Graphs', companies: ['Google', 'Amazon'], pattern: 'Union Find', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 168, name: 'Number of Connected Components', url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', difficulty: 'Medium', category: 'Graphs', companies: ['Amazon', 'Google', 'Meta'], pattern: 'Union Find', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 169, name: 'Graph Valid Tree', url: 'https://leetcode.com/problems/graph-valid-tree/', difficulty: 'Medium', category: 'Graphs', companies: ['Google', 'Amazon', 'Meta'], pattern: 'Union Find', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 170, name: 'Word Ladder', url: 'https://leetcode.com/problems/word-ladder/', difficulty: 'Hard', category: 'Graphs', companies: ['Amazon', 'Meta', 'Google'], pattern: 'BFS', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 171, name: 'Reconstruct Itinerary', url: 'https://leetcode.com/problems/reconstruct-itinerary/', difficulty: 'Hard', category: 'Graphs', companies: ['Google', 'Amazon'], pattern: 'DFS', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 172, name: 'Min Cost to Connect All Points', url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', difficulty: 'Medium', category: 'Graphs', companies: ['Amazon'], pattern: 'MST', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 173, name: 'Network Delay Time', url: 'https://leetcode.com/problems/network-delay-time/', difficulty: 'Medium', category: 'Graphs', companies: ['Google', 'Amazon'], pattern: 'Dijkstra', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 174, name: 'Swim in Rising Water', url: 'https://leetcode.com/problems/swim-in-rising-water/', difficulty: 'Hard', category: 'Graphs', companies: ['Google'], pattern: 'Binary Search + BFS', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 175, name: 'Alien Dictionary', url: 'https://leetcode.com/problems/alien-dictionary/', difficulty: 'Hard', category: 'Graphs', companies: ['Meta', 'Amazon', 'Google'], pattern: 'Topological Sort', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 176, name: 'Cheapest Flights Within K Stops', url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', difficulty: 'Medium', category: 'Graphs', companies: ['Amazon', 'Google'], pattern: 'Bellman-Ford', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 177, name: 'Flood Fill', url: 'https://leetcode.com/problems/flood-fill/', difficulty: 'Easy', category: 'Graphs', companies: ['Amazon', 'Google'], pattern: 'DFS', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 178, name: 'Shortest Path in Binary Matrix', url: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/', difficulty: 'Medium', category: 'Graphs', companies: ['Meta', 'Amazon', 'Google'], pattern: 'BFS', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 179, name: 'As Far from Land as Possible', url: 'https://leetcode.com/problems/as-far-from-land-as-possible/', difficulty: 'Medium', category: 'Graphs', companies: ['Amazon', 'Google'], pattern: 'BFS', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 180, name: 'Accounts Merge', url: 'https://leetcode.com/problems/accounts-merge/', difficulty: 'Medium', category: 'Graphs', companies: ['Meta', 'Amazon', 'Google'], pattern: 'Union Find', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 181, name: 'Critical Connections in a Network', url: 'https://leetcode.com/problems/critical-connections-in-a-network/', difficulty: 'Hard', category: 'Graphs', companies: ['Amazon', 'Google'], pattern: 'Tarjan', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 182, name: 'Minimum Height Trees', url: 'https://leetcode.com/problems/minimum-height-trees/', difficulty: 'Medium', category: 'Graphs', companies: ['Amazon', 'Google'], pattern: 'Topological Sort', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },

  // ============================================
  // DYNAMIC PROGRAMMING (35 problems)
  // ============================================
  { id: 183, name: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy', category: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Microsoft'], pattern: '1D DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 184, name: 'Min Cost Climbing Stairs', url: 'https://leetcode.com/problems/min-cost-climbing-stairs/', difficulty: 'Easy', category: 'Dynamic Programming', companies: ['Amazon'], pattern: '1D DP', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 185, name: 'House Robber', url: 'https://leetcode.com/problems/house-robber/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Microsoft'], pattern: '1D DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 186, name: 'House Robber II', url: 'https://leetcode.com/problems/house-robber-ii/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Google'], pattern: '1D DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 187, name: 'Longest Palindromic Substring', url: 'https://leetcode.com/problems/longest-palindromic-substring/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Meta', 'Microsoft', 'Google'], pattern: '2D DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 188, name: 'Palindromic Substrings', url: 'https://leetcode.com/problems/palindromic-substrings/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Meta'], pattern: '2D DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 189, name: 'Decode Ways', url: 'https://leetcode.com/problems/decode-ways/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Meta', 'Amazon', 'Google'], pattern: '1D DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 190, name: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Microsoft', 'Google'], pattern: '1D DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 191, name: 'Maximum Product Subarray', url: 'https://leetcode.com/problems/maximum-product-subarray/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Microsoft'], pattern: '1D DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 192, name: 'Word Break', url: 'https://leetcode.com/problems/word-break/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Meta', 'Google', 'Microsoft'], pattern: '1D DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 193, name: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Microsoft'], pattern: '1D DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 194, name: 'Partition Equal Subset Sum', url: 'https://leetcode.com/problems/partition-equal-subset-sum/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Meta'], pattern: '0/1 Knapsack', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 195, name: 'Unique Paths', url: 'https://leetcode.com/problems/unique-paths/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Microsoft'], pattern: '2D DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 196, name: 'Longest Common Subsequence', url: 'https://leetcode.com/problems/longest-common-subsequence/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Google'], pattern: '2D DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 197, name: 'Best Time to Buy and Sell Stock with Cooldown', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Google'], pattern: 'State Machine DP', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 198, name: 'Coin Change II', url: 'https://leetcode.com/problems/coin-change-ii/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Google'], pattern: 'Unbounded Knapsack', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 199, name: 'Target Sum', url: 'https://leetcode.com/problems/target-sum/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Meta', 'Amazon'], pattern: '0/1 Knapsack', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 200, name: 'Interleaving String', url: 'https://leetcode.com/problems/interleaving-string/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Microsoft'], pattern: 'DP', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 201, name: 'Longest Increasing Path in a Matrix', url: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', difficulty: 'Hard', category: 'Dynamic Programming', companies: ['Google', 'Amazon', 'Meta'], pattern: 'DP + DFS', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 202, name: 'Distinct Subsequences', url: 'https://leetcode.com/problems/distinct-subsequences/', difficulty: 'Hard', category: 'Dynamic Programming', companies: ['Amazon', 'Google'], pattern: '2D DP', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 203, name: 'Edit Distance', url: 'https://leetcode.com/problems/edit-distance/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Microsoft'], pattern: '2D DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 204, name: 'Burst Balloons', url: 'https://leetcode.com/problems/burst-balloons/', difficulty: 'Hard', category: 'Dynamic Programming', companies: ['Google', 'Amazon'], pattern: 'Interval DP', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 205, name: 'Regular Expression Matching', url: 'https://leetcode.com/problems/regular-expression-matching/', difficulty: 'Hard', category: 'Dynamic Programming', companies: ['Meta', 'Amazon', 'Google'], pattern: '2D DP', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 206, name: 'Jump Game', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Microsoft', 'Google'], pattern: 'Greedy', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 207, name: 'Jump Game II', url: 'https://leetcode.com/problems/jump-game-ii/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Microsoft', 'Google'], pattern: 'Greedy', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 208, name: 'Unique Paths II', url: 'https://leetcode.com/problems/unique-paths-ii/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Google'], pattern: '2D DP', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 209, name: 'Minimum Path Sum', url: 'https://leetcode.com/problems/minimum-path-sum/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Goldman Sachs'], pattern: '2D DP', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 210, name: 'Triangle', url: 'https://leetcode.com/problems/triangle/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon'], pattern: '2D DP', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },
  { id: 211, name: 'Maximal Square', url: 'https://leetcode.com/problems/maximal-square/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Apple'], pattern: '2D DP', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 212, name: 'Perfect Squares', url: 'https://leetcode.com/problems/perfect-squares/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Google'], pattern: '1D DP', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 213, name: 'Longest Palindromic Subsequence', url: 'https://leetcode.com/problems/longest-palindromic-subsequence/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Amazon', 'Google'], pattern: '2D DP', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 214, name: 'Wildcard Matching', url: 'https://leetcode.com/problems/wildcard-matching/', difficulty: 'Hard', category: 'Dynamic Programming', companies: ['Amazon', 'Google', 'Meta'], pattern: '2D DP', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 215, name: 'Word Break II', url: 'https://leetcode.com/problems/word-break-ii/', difficulty: 'Hard', category: 'Dynamic Programming', companies: ['Amazon', 'Meta', 'Google'], pattern: 'DP + Backtracking', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 216, name: 'Combination Sum IV', url: 'https://leetcode.com/problems/combination-sum-iv/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Google', 'Amazon'], pattern: '1D DP', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 217, name: 'Uncrossed Lines', url: 'https://leetcode.com/problems/uncrossed-lines/', difficulty: 'Medium', category: 'Dynamic Programming', companies: ['Google'], pattern: '2D DP', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },

  // ============================================
  // GREEDY (10 problems)
  // ============================================
  { id: 218, name: 'Maximum Subarray', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium', category: 'Greedy', companies: ['Amazon', 'Microsoft', 'Google', 'Apple'], pattern: 'Kadane', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 219, name: 'Jump Game', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'Medium', category: 'Greedy', companies: ['Amazon', 'Microsoft', 'Google'], pattern: 'Greedy', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 220, name: 'Gas Station', url: 'https://leetcode.com/problems/gas-station/', difficulty: 'Medium', category: 'Greedy', companies: ['Amazon', 'Google'], pattern: 'Greedy', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 221, name: 'Hand of Straights', url: 'https://leetcode.com/problems/hand-of-straights/', difficulty: 'Medium', category: 'Greedy', companies: ['Google'], pattern: 'Greedy', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },
  { id: 222, name: 'Merge Triplets to Form Target', url: 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/', difficulty: 'Medium', category: 'Greedy', companies: ['Google'], pattern: 'Greedy', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },
  { id: 223, name: 'Partition Labels', url: 'https://leetcode.com/problems/partition-labels/', difficulty: 'Medium', category: 'Greedy', companies: ['Amazon', 'Google'], pattern: 'Greedy', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 224, name: 'Valid Parenthesis String', url: 'https://leetcode.com/problems/valid-parenthesis-string/', difficulty: 'Medium', category: 'Greedy', companies: ['Amazon', 'Meta'], pattern: 'Greedy', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 225, name: 'Meeting Rooms', url: 'https://leetcode.com/problems/meeting-rooms/', difficulty: 'Easy', category: 'Greedy', companies: ['Meta', 'Amazon', 'Google'], pattern: 'Intervals', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 226, name: 'Candy', url: 'https://leetcode.com/problems/candy/', difficulty: 'Hard', category: 'Greedy', companies: ['Amazon', 'Google'], pattern: 'Greedy', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 227, name: 'Assign Cookies', url: 'https://leetcode.com/problems/assign-cookies/', difficulty: 'Easy', category: 'Greedy', companies: ['Amazon'], pattern: 'Greedy', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },

  // ============================================
  // BIT MANIPULATION (8 problems)
  // ============================================
  { id: 228, name: 'Single Number', url: 'https://leetcode.com/problems/single-number/', difficulty: 'Easy', category: 'Bit Manipulation', companies: ['Amazon', 'Google'], pattern: 'XOR', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 229, name: 'Number of 1 Bits', url: 'https://leetcode.com/problems/number-of-1-bits/', difficulty: 'Easy', category: 'Bit Manipulation', companies: ['Amazon', 'Microsoft'], pattern: 'Bit Counting', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 230, name: 'Counting Bits', url: 'https://leetcode.com/problems/counting-bits/', difficulty: 'Easy', category: 'Bit Manipulation', companies: ['Amazon'], pattern: 'Bit DP', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 231, name: 'Reverse Bits', url: 'https://leetcode.com/problems/reverse-bits/', difficulty: 'Easy', category: 'Bit Manipulation', companies: ['Amazon', 'Apple'], pattern: 'Bit Manipulation', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 232, name: 'Missing Number', url: 'https://leetcode.com/problems/missing-number/', difficulty: 'Easy', category: 'Bit Manipulation', companies: ['Amazon', 'Microsoft'], pattern: 'XOR', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 233, name: 'Sum of Two Integers', url: 'https://leetcode.com/problems/sum-of-two-integers/', difficulty: 'Medium', category: 'Bit Manipulation', companies: ['Amazon', 'Meta'], pattern: 'Bit Manipulation', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 234, name: 'Reverse Integer', url: 'https://leetcode.com/problems/reverse-integer/', difficulty: 'Medium', category: 'Bit Manipulation', companies: ['Amazon', 'Bloomberg'], pattern: 'Math', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 235, name: 'Power of Two', url: 'https://leetcode.com/problems/power-of-two/', difficulty: 'Easy', category: 'Bit Manipulation', companies: ['Google'], pattern: 'Bit Manipulation', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },

  // ============================================
  // MATH & GEOMETRY (10 problems)
  // ============================================
  { id: 236, name: 'Rotate Image', url: 'https://leetcode.com/problems/rotate-image/', difficulty: 'Medium', category: 'Math & Geometry', companies: ['Amazon', 'Microsoft', 'Apple'], pattern: 'Matrix', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 237, name: 'Spiral Matrix', url: 'https://leetcode.com/problems/spiral-matrix/', difficulty: 'Medium', category: 'Math & Geometry', companies: ['Amazon', 'Microsoft', 'Google', 'Apple'], pattern: 'Matrix', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 238, name: 'Set Matrix Zeroes', url: 'https://leetcode.com/problems/set-matrix-zeroes/', difficulty: 'Medium', category: 'Math & Geometry', companies: ['Amazon', 'Microsoft', 'Meta'], pattern: 'Matrix', isBlind75: true, isNeetCode150: true, isFaangFavorite: true },
  { id: 239, name: 'Happy Number', url: 'https://leetcode.com/problems/happy-number/', difficulty: 'Easy', category: 'Math & Geometry', companies: ['Amazon', 'Uber'], pattern: 'Math', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 240, name: 'Plus One', url: 'https://leetcode.com/problems/plus-one/', difficulty: 'Easy', category: 'Math & Geometry', companies: ['Google', 'Amazon'], pattern: 'Math', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 241, name: 'Pow(x, n)', url: 'https://leetcode.com/problems/powx-n/', difficulty: 'Medium', category: 'Math & Geometry', companies: ['Meta', 'Amazon', 'Google'], pattern: 'Math', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 242, name: 'Multiply Strings', url: 'https://leetcode.com/problems/multiply-strings/', difficulty: 'Medium', category: 'Math & Geometry', companies: ['Meta', 'Amazon'], pattern: 'Math', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 243, name: 'Detect Squares', url: 'https://leetcode.com/problems/detect-squares/', difficulty: 'Medium', category: 'Math & Geometry', companies: ['Google'], pattern: 'Math', isBlind75: false, isNeetCode150: true, isFaangFavorite: true },
  { id: 244, name: 'Roman to Integer', url: 'https://leetcode.com/problems/roman-to-integer/', difficulty: 'Easy', category: 'Math & Geometry', companies: ['Amazon', 'Microsoft'], pattern: 'Math', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 245, name: 'Integer to Roman', url: 'https://leetcode.com/problems/integer-to-roman/', difficulty: 'Medium', category: 'Math & Geometry', companies: ['Amazon', 'Microsoft'], pattern: 'Math', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },

  // ============================================
  // STRING (10 problems)
  // ============================================
  { id: 246, name: 'Longest Common Prefix', url: 'https://leetcode.com/problems/longest-common-prefix/', difficulty: 'Easy', category: 'String', companies: ['Amazon', 'Google'], pattern: 'String', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 247, name: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'Easy', category: 'String', companies: ['Amazon', 'Meta', 'Google'], pattern: 'Stack', isBlind75: true, isNeetCode150: false, isFaangFavorite: true },
  { id: 248, name: 'Longest Palindrome', url: 'https://leetcode.com/problems/longest-palindrome/', difficulty: 'Easy', category: 'String', companies: ['Amazon', 'Google'], pattern: 'Hash Map', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 249, name: 'String to Integer (atoi)', url: 'https://leetcode.com/problems/string-to-integer-atoi/', difficulty: 'Medium', category: 'String', companies: ['Amazon', 'Microsoft', 'Meta'], pattern: 'String', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 250, name: 'Zigzag Conversion', url: 'https://leetcode.com/problems/zigzag-conversion/', difficulty: 'Medium', category: 'String', companies: ['Amazon'], pattern: 'String', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },
  { id: 251, name: 'Implement strStr()', url: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/', difficulty: 'Easy', category: 'String', companies: ['Amazon', 'Microsoft'], pattern: 'String', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 252, name: 'Count and Say', url: 'https://leetcode.com/problems/count-and-say/', difficulty: 'Medium', category: 'String', companies: ['Meta', 'Amazon'], pattern: 'String', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 253, name: 'Text Justification', url: 'https://leetcode.com/problems/text-justification/', difficulty: 'Hard', category: 'String', companies: ['Google', 'LinkedIn'], pattern: 'String', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 254, name: 'Compare Version Numbers', url: 'https://leetcode.com/problems/compare-version-numbers/', difficulty: 'Medium', category: 'String', companies: ['Amazon', 'Microsoft'], pattern: 'String', isBlind75: false, isNeetCode150: false, isFaangFavorite: true },
  { id: 255, name: 'Repeated DNA Sequences', url: 'https://leetcode.com/problems/repeated-dna-sequences/', difficulty: 'Medium', category: 'String', companies: ['Google', 'LinkedIn'], pattern: 'Hash Map', isBlind75: false, isNeetCode150: false, isFaangFavorite: false },
];

// Helper functions to filter problems
export const getBlind75Problems = () => PROBLEMS.filter(p => p.isBlind75);
export const getNeetCode150Problems = () => PROBLEMS.filter(p => p.isNeetCode150);
export const getFaangFavoriteProblems = () => PROBLEMS.filter(p => p.isFaangFavorite);
export const getEasyProblems = () => PROBLEMS.filter(p => p.difficulty === 'Easy');
export const getMediumProblems = () => PROBLEMS.filter(p => p.difficulty === 'Medium');
export const getHardProblems = () => PROBLEMS.filter(p => p.difficulty === 'Hard');
export const getProblemsByCategory = (category: string) => PROBLEMS.filter(p => p.category === category);
export const getProblemsByCompany = (company: string) => PROBLEMS.filter(p => p.companies.includes(company));
export function getProblemBySlug(slug: string) {
  return PROBLEMS.find(p => p.slug === slug || p.name.toLowerCase().replace(/[']/g, '').replace(/[^a-z0-9]+/g, '-') === slug);
}

export const CATEGORIES = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Stack',
  'Binary Search',
  'Linked List',
  'Trees',
  'Tries',
  'Heap',
  'Backtracking',
  'Graphs',
  'Dynamic Programming',
  'Greedy',
  'Bit Manipulation',
  'Math & Geometry',
  'String',
];

export const COMPANIES = [
  'Google',
  'Amazon',
  'Meta',
  'Microsoft',
  'Apple',
  'Uber',
  'Netflix',
  'LinkedIn',
  'Twitter',
  'Bloomberg',
  'Goldman Sachs',
];
