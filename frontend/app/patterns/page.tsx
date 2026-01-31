'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, CheckCircle2, Circle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Pattern {
  name: string;
  description: string;
  cppCode: string;
  useCases: string[];
  timeComplexity: string;
  spaceComplexity: string;
}

const patterns: Pattern[] = [
  {
    name: 'Two Pointers',
    description: 'Use two pointers to traverse an array from two ends or at different speeds to solve problems efficiently.',
    cppCode: `// Basic Two Pointers Pattern
vector<int> twoSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return {left, right};
        else if (sum < target) left++;
        else right--;
    }
    return {};
}`,
    useCases: ['Two Sum (sorted)', 'Container with Most Water', 'Valid Palindrome', 'Remove Duplicates', 'Trapping Rain Water'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    name: 'Sliding Window',
    description: 'Maintain a window of elements and slide it across the data structure to find subarrays/substrings satisfying a condition.',
    cppCode: `// Sliding Window Pattern
int maxSubarray(vector<int>& nums, int k) {
    int maxSum = 0, currentSum = 0;
    for (int i = 0; i < k; i++) {
        currentSum += nums[i];
    }
    maxSum = currentSum;
    for (int i = k; i < nums.size(); i++) {
        currentSum = currentSum - nums[i - k] + nums[i];
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}`,
    useCases: ['Max Sum Subarray', 'Longest Substring Without Repeating', 'Minimum Window Substring', 'Fruits into Baskets'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) or O(k)',
  },
  {
    name: 'Binary Search',
    description: 'Efficiently search in sorted data by dividing the search space in half at each step.',
    cppCode: `// Binary Search Pattern
int binarySearch(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    useCases: ['Binary Search', 'Search in Rotated Array', 'Koko Eating Bananas', 'Median of Two Sorted Arrays'],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
  },
  {
    name: 'DFS (Depth-First Search)',
    description: 'Explore a graph/tree by going as deep as possible before backtracking. Use recursion or stack.',
    cppCode: `// DFS Pattern
void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited);
        }
    }
}`,
    useCases: ['Number of Islands', 'Flood Fill', 'Clone Graph', 'Cycle Detection', 'Topological Sort'],
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
  },
  {
    name: 'BFS (Breadth-First Search)',
    description: 'Explore a graph/tree level by level using a queue. Great for finding shortest paths in unweighted graphs.',
    cppCode: `// BFS Pattern
void bfs(int start, vector<vector<int>>& adj) {
    queue<int> q;
    vector<bool> visited(adj.size(), false);
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`,
    useCases: ['Rotten Oranges', 'Word Ladder', 'Shortest Path', 'Level Order Traversal'],
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
  },
  {
    name: 'Recursion & Backtracking',
    description: 'Solve problems by breaking them into smaller subproblems and exploring all possibilities.',
    cppCode: `// Backtracking Pattern
void backtrack(int start, vector<int>& path, vector<vector<int>>& result) {
    if (start == n) {
        result.push_back(path);
        return;
    }
    for (int i = start; i < n; i++) {
        path.push_back(i);
        backtrack(i + 1, path, result);
        path.pop_back(); // Backtrack
    }
}`,
    useCases: ['Permutations', 'Combinations', 'Subsets', 'Word Search', 'N-Queens'],
    timeComplexity: 'O(N!)',
    spaceComplexity: 'O(N)',
  },
  {
    name: 'Dynamic Programming',
    description: 'Store solutions to subproblems to avoid redundant calculations (memoization or tabulation).',
    cppCode: `// DP with Memoization
unordered_map<int, long long> memo;

long long fib(int n) {
    if (n <= 1) return n;
    if (memo.find(n) != memo.end()) {
        return memo[n];
    }
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
}`,
    useCases: ['Climbing Stairs', 'Coin Change', 'LIS', 'Edit Distance', 'Knapsack'],
    timeComplexity: 'Varies',
    spaceComplexity: 'O(n)',
  },
  {
    name: 'Greedy Algorithm',
    description: 'Make locally optimal choices at each step, hoping to find a global optimum.',
    cppCode: `// Greedy Pattern - Jump Game
bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (i > maxReach) return false;
        maxReach = max(maxReach, i + nums[i]);
    }
    return true;
}`,
    useCases: ['Jump Game', 'Meeting Rooms', 'Gas Station', 'Interval Scheduling'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    name: 'Monotonic Stack',
    description: 'Maintain a stack where elements are in increasing or decreasing order for efficient computation.',
    cppCode: `// Monotonic Stack Pattern
vector<int> nextGreaterElement(vector<int>& nums) {
    vector<int> result(nums.size(), -1);
    stack<int> st;
    
    for (int i = nums.size() - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= nums[i]) {
            st.pop();
        }
        if (!st.empty()) result[i] = st.top();
        st.push(nums[i]);
    }
    return result;
}`,
    useCases: ['Next Greater Element', 'Daily Temperatures', 'Largest Rectangle in Histogram', 'Trapping Rain Water'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    name: 'Hash Map/Set',
    description: 'Use hash maps for O(1) lookups and frequency counting. Sets for eliminating duplicates.',
    cppCode: `// Hash Map Pattern
bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;
    for (int num : nums) {
        if (seen.find(num) != seen.end()) {
            return true;
        }
        seen.insert(num);
    }
    return false;
}`,
    useCases: ['Two Sum', 'Contains Duplicate', 'Longest Substring', 'Intersection of Arrays'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    name: 'Prefix Sum',
    description: 'Precompute prefix sums to answer range sum queries in O(1) time.',
    cppCode: `// Prefix Sum Pattern
vector<int> prefixSum(vector<int>& nums) {
    vector<int> prefix(nums.size() + 1, 0);
    for (int i = 0; i < nums.size(); i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    return prefix;
}

int rangeSum(vector<int>& prefix, int left, int right) {
    return prefix[right + 1] - prefix[left];
}`,
    useCases: ['Range Sum Query', 'Subarray Sum Equals K', '2D Prefix Sum', 'NumMatrix'],
    timeComplexity: 'O(n) preprocessing, O(1) query',
    spaceComplexity: 'O(n)',
  },
  {
    name: 'Union Find (Disjoint Set)',
    description: 'Efficiently track connected components and check if two elements belong to same set.',
    cppCode: `// Union Find Pattern
class UnionFind {
    vector<int> parent, rank;
public:
    UnionFind(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank[px] < rank[py]) swap(px, py);
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
};`,
    useCases: ['Number of Islands', 'Connected Components', 'Cycle Detection', 'Redundant Connection'],
    timeComplexity: 'O(α(n)) per operation',
    spaceComplexity: 'O(n)',
  },
  {
    name: 'Segment Tree',
    description: 'Efficient data structure for range queries and point updates in logarithmic time.',
    cppCode: `// Segment Tree Pattern
class SegmentTree {
    vector<int> tree;
    
    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
        } else {
            int mid = (start + end) / 2;
            build(arr, 2*node, start, mid);
            build(arr, 2*node+1, mid+1, end);
            tree[node] = tree[2*node] + tree[2*node+1];
        }
    }
    
    int query(int node, int start, int end, int l, int r) {
        if (r < start || l > end) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = (start + end) / 2;
        return query(2*node, start, mid, l, r) +
               query(2*node+1, mid+1, end, l, r);
    }
};`,
    useCases: ['Range Sum Query', 'Range Updates', 'Maximum in Range', 'Interval Problems'],
    timeComplexity: 'O(log n) per query/update',
    spaceComplexity: 'O(n)',
  },
  {
    name: 'Bit Manipulation',
    description: 'Use bitwise operations to solve problems efficiently, especially useful for subsets and flags.',
    cppCode: `// Bit Manipulation Patterns
// Check if bit is set
bool isBitSet(int num, int pos) {
    return (num >> pos) & 1;
}

// Count set bits
int countSetBits(int n) {
    int count = 0;
    while (n) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}

// Check if power of 2
bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}`,
    useCases: ['Single Number', 'Hamming Distance', 'Power of Two', 'Reverse Bits'],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
  },
  {
    name: 'Matrix Traversal',
    description: 'Traverse matrices in different patterns: spiral, diagonal, zigzag, layer-by-layer.',
    cppCode: `// Spiral Matrix Traversal
vector<int> spiralTraversal(vector<vector<int>>& matrix) {
    vector<int> result;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse right
        for (int i = left; i <= right; i++)
            result.push_back(matrix[top][i]);
        top++;
        
        // Traverse down, left, up...
        for (int i = top; i <= bottom; i++)
            result.push_back(matrix[i][right]);
        right--;
        
        if (top <= bottom) {
            for (int i = right; i >= left; i--)
                result.push_back(matrix[bottom][i]);
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--)
                result.push_back(matrix[i][left]);
            left++;
        }
    }
    return result;
}`,
    useCases: ['Spiral Matrix', 'Set Matrix Zeroes', 'Rotate Matrix', 'Diagonal Traversal'],
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(1) excluding output',
  },
  {
    name: 'Trie (Prefix Tree)',
    description: 'Efficient data structure for storing and searching strings with common prefixes.',
    cppCode: `// Trie Pattern
struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEndOfWord = false;
};

class Trie {
public:
    TrieNode* root = new TrieNode();
    
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c])
                node->children[c] = new TrieNode();
            node = node->children[c];
        }
        node->isEndOfWord = true;
    }
    
    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c]) return false;
            node = node->children[c];
        }
        return node->isEndOfWord;
    }
};`,
    useCases: ['Word Search', 'Autocomplete', 'Spell Checker', 'Longest Word'],
    timeComplexity: 'O(m) where m is word length',
    spaceComplexity: 'O(26^m)',
  },
  {
    name: 'Dijkstra / BFS Distance',
    description: 'Find shortest paths in weighted graphs (Dijkstra) or unweighted graphs (BFS).',
    cppCode: `// Dijkstra\'s Algorithm
vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& adj, int src) {
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    
    dist[src] = 0;
    pq.push({0, src});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
    useCases: ['Network Delay Time', 'Cheapest Flights', 'Path with Minimum Effort', 'Shortest Path'],
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
  },
  {
    name: 'Merge Intervals',
    description: 'Sort and merge overlapping intervals efficiently by comparing boundaries.',
    cppCode: `// Merge Intervals Pattern
vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> result = {intervals[0]};
    
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= result.back()[1]) {
            result.back()[1] = max(result.back()[1], intervals[i][1]);
        } else {
            result.push_back(intervals[i]);
        }
    }
    return result;
}`,
    useCases: ['Merge Intervals', 'Insert Interval', 'Meeting Rooms', 'Non-overlapping Intervals'],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
  },
  {
    name: 'LRU Cache',
    description: 'Implement a cache with fixed capacity using hash map and doubly linked list.',
    cppCode: `// LRU Cache Pattern
class LRUCache {
    unordered_map<int, pair<int, list<int>::iterator>> cache;
    list<int> lru;
    int capacity;
    
public:
    LRUCache(int cap) : capacity(cap) {}
    
    int get(int key) {
        if (!cache.count(key)) return -1;
        lru.erase(cache[key].second);
        lru.push_back(key);
        cache[key].second = prev(lru.end());
        return cache[key].first;
    }
    
    void put(int key, int value) {
        if (cache.count(key)) lru.erase(cache[key].second);
        else if (cache.size() == capacity) {
            cache.erase(lru.front());
            lru.pop_front();
        }
        lru.push_back(key);
        cache[key] = {value, prev(lru.end())};
    }
};`,
    useCases: ['LRU Cache', 'Least Recently Used', 'Cache Implementation'],
    timeComplexity: 'O(1) for get and put',
    spaceComplexity: 'O(capacity)',
  },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
      <button
        onClick={copyCode}
        className="absolute top-2 right-2 p-2 rounded-md hover:bg-accent transition-colors"
        aria-label="Copy code"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
      <pre className="whitespace-pre-wrap break-words pr-8">{code}</pre>
    </div>
  );
}

export default function PatternsPage() {
  const [masteredPatterns, setMasteredPatterns] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('masteredPatterns');
    if (saved) setMasteredPatterns(JSON.parse(saved));
  }, []);

  const toggleMastered = (patternName: string) => {
    const newMastered = masteredPatterns.includes(patternName)
      ? masteredPatterns.filter(p => p !== patternName)
      : [...masteredPatterns, patternName];
    setMasteredPatterns(newMastered);
    localStorage.setItem('masteredPatterns', JSON.stringify(newMastered));
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">DSA Patterns & Techniques</h1>
          <p className="text-muted-foreground">Master the essential algorithms and patterns used in coding interviews</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {patterns.map((pattern, idx) => (
            <Card key={idx} className={masteredPatterns.includes(pattern.name) ? 'border-green-500/50 bg-green-500/5' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                       {pattern.name}
                       {masteredPatterns.includes(pattern.name) && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    </CardTitle>
                    <CardDescription>{pattern.description}</CardDescription>
                  </div>
                  <Button
                    variant={masteredPatterns.includes(pattern.name) ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleMastered(pattern.name)}
                  >
                    {masteredPatterns.includes(pattern.name) ? 'Mastered' : 'Mark as Mastered'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">C++ Implementation</h4>
                  <CodeBlock code={pattern.cppCode} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground font-medium">Time Complexity</p>
                    <p className="text-sm font-mono font-semibold text-primary">{pattern.timeComplexity}</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground font-medium">Space Complexity</p>
                    <p className="text-sm font-mono font-semibold text-primary">{pattern.spaceComplexity}</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground font-medium">Common Use Cases</p>
                    <p className="text-xs font-semibold text-foreground">{pattern.useCases.length} patterns</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-sm">Common Problems</h4>
                  <div className="flex flex-wrap gap-2">
                    {pattern.useCases.map((useCase, i) => (
                      <span key={i} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
