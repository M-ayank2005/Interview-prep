'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, Search, Copy, Check, Code, Zap, Brain, Clock
} from 'lucide-react';

const CHEATSHEETS = {
  dataStructures: {
    title: 'Data Structures',
    items: [
      {
        name: 'Array',
        operations: [
          { op: 'Access', time: 'O(1)', space: '-' },
          { op: 'Search', time: 'O(n)', space: '-' },
          { op: 'Insert', time: 'O(n)', space: '-' },
          { op: 'Delete', time: 'O(n)', space: '-' },
        ],
        notes: 'Contiguous memory, cache-friendly. Best for indexed access.',
      },
      {
        name: 'Dynamic Array (Vector)',
        operations: [
          { op: 'Access', time: 'O(1)', space: '-' },
          { op: 'Push Back', time: 'O(1)*', space: '-' },
          { op: 'Insert', time: 'O(n)', space: '-' },
          { op: 'Delete', time: 'O(n)', space: '-' },
        ],
        notes: '* Amortized. Doubles in size when full.',
      },
      {
        name: 'Linked List',
        operations: [
          { op: 'Access', time: 'O(n)', space: '-' },
          { op: 'Search', time: 'O(n)', space: '-' },
          { op: 'Insert (head)', time: 'O(1)', space: '-' },
          { op: 'Delete (head)', time: 'O(1)', space: '-' },
        ],
        notes: 'Non-contiguous memory. Pointer-based.',
      },
      {
        name: 'Hash Table',
        operations: [
          { op: 'Search', time: 'O(1)*', space: '-' },
          { op: 'Insert', time: 'O(1)*', space: '-' },
          { op: 'Delete', time: 'O(1)*', space: '-' },
          { op: 'Worst Case', time: 'O(n)', space: '-' },
        ],
        notes: '* Average case. Collisions can degrade performance.',
      },
      {
        name: 'Binary Search Tree',
        operations: [
          { op: 'Search', time: 'O(log n)*', space: '-' },
          { op: 'Insert', time: 'O(log n)*', space: '-' },
          { op: 'Delete', time: 'O(log n)*', space: '-' },
          { op: 'Worst (unbalanced)', time: 'O(n)', space: '-' },
        ],
        notes: '* Balanced tree. In-order traversal gives sorted elements.',
      },
      {
        name: 'Heap (Priority Queue)',
        operations: [
          { op: 'Find Min/Max', time: 'O(1)', space: '-' },
          { op: 'Insert', time: 'O(log n)', space: '-' },
          { op: 'Delete Min/Max', time: 'O(log n)', space: '-' },
          { op: 'Build Heap', time: 'O(n)', space: '-' },
        ],
        notes: 'Complete binary tree. Min-heap or max-heap.',
      },
      {
        name: 'Stack',
        operations: [
          { op: 'Push', time: 'O(1)', space: '-' },
          { op: 'Pop', time: 'O(1)', space: '-' },
          { op: 'Peek', time: 'O(1)', space: '-' },
          { op: 'Search', time: 'O(n)', space: '-' },
        ],
        notes: 'LIFO. Used for DFS, expression evaluation, backtracking.',
      },
      {
        name: 'Queue',
        operations: [
          { op: 'Enqueue', time: 'O(1)', space: '-' },
          { op: 'Dequeue', time: 'O(1)', space: '-' },
          { op: 'Peek', time: 'O(1)', space: '-' },
          { op: 'Search', time: 'O(n)', space: '-' },
        ],
        notes: 'FIFO. Used for BFS, level-order traversal.',
      },
    ],
  },
  algorithms: {
    title: 'Algorithms',
    items: [
      {
        name: 'Binary Search',
        complexity: 'O(log n)',
        code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
        when: 'Sorted array, minimize/maximize problems',
      },
      {
        name: 'DFS (Recursive)',
        complexity: 'O(V + E)',
        code: `def dfs(node, visited, graph):
    if node in visited:
        return
    visited.add(node)
    for neighbor in graph[node]:
        dfs(neighbor, visited, graph)`,
        when: 'Path finding, cycle detection, connected components',
      },
      {
        name: 'BFS',
        complexity: 'O(V + E)',
        code: `from collections import deque
def bfs(start, graph):
    visited = set([start])
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
        when: 'Shortest path (unweighted), level-order traversal',
      },
      {
        name: 'Two Pointers',
        complexity: 'O(n)',
        code: `def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        curr = arr[left] + arr[right]
        if curr == target:
            return [left, right]
        elif curr < target:
            left += 1
        else:
            right -= 1`,
        when: 'Sorted arrays, pairs, container problems',
      },
      {
        name: 'Sliding Window',
        complexity: 'O(n)',
        code: `def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i-k]
        max_sum = max(max_sum, window_sum)
    return max_sum`,
        when: 'Contiguous subarray/substring, fixed or variable window',
      },
      {
        name: 'Merge Sort',
        complexity: 'O(n log n)',
        code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)`,
        when: 'Stable sort, linked lists, external sorting',
      },
      {
        name: 'Quick Sort',
        complexity: 'O(n log n) avg',
        code: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)`,
        when: 'In-place sorting, average case performance',
      },
      {
        name: 'Dijkstra',
        complexity: 'O((V + E) log V)',
        code: `import heapq
def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
        when: 'Shortest path with non-negative weights',
      },
    ],
  },
  patterns: {
    title: 'Problem Patterns',
    items: [
      {
        pattern: 'Sliding Window',
        indicators: ['Contiguous subarray/substring', 'Maximum/minimum sum', 'K-sized window', 'At most K distinct'],
        problems: ['Maximum Sum Subarray of Size K', 'Longest Substring with K Distinct', 'Minimum Window Substring'],
      },
      {
        pattern: 'Two Pointers',
        indicators: ['Sorted array', 'Pair/triplet sum', 'In-place modification', 'Palindrome check'],
        problems: ['Two Sum (sorted)', '3Sum', 'Container With Most Water', 'Remove Duplicates'],
      },
      {
        pattern: 'Fast & Slow Pointers',
        indicators: ['Cycle detection', 'Middle of linked list', 'Palindrome linked list'],
        problems: ['Linked List Cycle', 'Happy Number', 'Find the Duplicate Number'],
      },
      {
        pattern: 'Merge Intervals',
        indicators: ['Overlapping intervals', 'Meeting rooms', 'Interval scheduling'],
        problems: ['Merge Intervals', 'Insert Interval', 'Meeting Rooms II'],
      },
      {
        pattern: 'Binary Search',
        indicators: ['Sorted array', 'Find position', 'Minimize maximum', 'Maximize minimum'],
        problems: ['Binary Search', 'Search in Rotated Array', 'Koko Eating Bananas'],
      },
      {
        pattern: 'BFS',
        indicators: ['Shortest path (unweighted)', 'Level by level', 'Nearest/minimum steps'],
        problems: ['Word Ladder', 'Rotten Oranges', 'Binary Tree Level Order'],
      },
      {
        pattern: 'DFS',
        indicators: ['All paths', 'Permutations', 'Subsets', 'Connected components'],
        problems: ['Number of Islands', 'Permutations', 'Path Sum'],
      },
      {
        pattern: 'Backtracking',
        indicators: ['Generate all combinations', 'Constraint satisfaction', 'Decision tree'],
        problems: ['N-Queens', 'Sudoku Solver', 'Combination Sum'],
      },
      {
        pattern: 'Dynamic Programming',
        indicators: ['Optimal substructure', 'Overlapping subproblems', 'Count ways', 'Min/max value'],
        problems: ['Climbing Stairs', 'Coin Change', 'Longest Common Subsequence'],
      },
      {
        pattern: 'Monotonic Stack',
        indicators: ['Next greater/smaller element', 'Histogram', 'Stock span'],
        problems: ['Daily Temperatures', 'Largest Rectangle in Histogram', 'Next Greater Element'],
      },
      {
        pattern: 'Union Find',
        indicators: ['Connected components', 'Cycle detection (undirected)', 'Group elements'],
        problems: ['Number of Provinces', 'Redundant Connection', 'Accounts Merge'],
      },
      {
        pattern: 'Topological Sort',
        indicators: ['Dependencies', 'Ordering tasks', 'Course prerequisites'],
        problems: ['Course Schedule', 'Alien Dictionary', 'Task Scheduling'],
      },
    ],
  },
  tips: {
    title: 'Interview Tips',
    items: [
      {
        category: 'Before Starting',
        tips: [
          'Clarify the problem - ask questions about edge cases, constraints, input size',
          'Discuss examples - walk through 2-3 examples including edge cases',
          'Identify the pattern - think about which pattern applies',
          'Discuss approach before coding - get confirmation from interviewer',
        ],
      },
      {
        category: 'While Coding',
        tips: [
          'Write clean, readable code with meaningful variable names',
          'Communicate your thought process out loud',
          'Start with brute force if stuck, then optimize',
          'Use helper functions to keep code modular',
        ],
      },
      {
        category: 'After Coding',
        tips: [
          'Walk through your code with an example',
          'Analyze time and space complexity',
          'Discuss possible optimizations',
          'Handle edge cases (empty input, single element, duplicates)',
        ],
      },
      {
        category: 'Common Mistakes',
        tips: [
          'Off-by-one errors in loops and array bounds',
          'Not handling null/empty inputs',
          'Integer overflow in calculations',
          'Modifying collection while iterating',
        ],
      },
    ],
  },
};

export default function CheatSheetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Cheat Sheets</h1>
          </div>
          <p className="text-muted-foreground">
            Quick reference for data structures, algorithms, and interview patterns
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="dataStructures" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dataStructures" className="flex items-center gap-2">
              <Zap className="w-4 h-4" /> Data Structures
            </TabsTrigger>
            <TabsTrigger value="algorithms" className="flex items-center gap-2">
              <Code className="w-4 h-4" /> Algorithms
            </TabsTrigger>
            <TabsTrigger value="patterns" className="flex items-center gap-2">
              <Brain className="w-4 h-4" /> Patterns
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dataStructures" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CHEATSHEETS.dataStructures.items.map((ds, idx) => (
                <Card key={idx}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{ds.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Operation</th>
                            <th className="text-left py-2">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ds.operations.map((op, opIdx) => (
                            <tr key={opIdx} className="border-b border-border/50">
                              <td className="py-1.5">{op.op}</td>
                              <td className="py-1.5">
                                <Badge variant="outline" className="font-mono">
                                  {op.time}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">{ds.notes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="algorithms" className="space-y-4">
            {CHEATSHEETS.algorithms.items.map((algo, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{algo.name}</CardTitle>
                    <Badge>{algo.complexity}</Badge>
                  </div>
                  <CardDescription>When to use: {algo.when}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{algo.code}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(algo.code, algo.name)}
                    >
                      {copiedCode === algo.name ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CHEATSHEETS.patterns.items.map((pattern, idx) => (
                <Card key={idx}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{pattern.pattern}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">INDICATORS</p>
                      <ul className="text-sm space-y-1">
                        {pattern.indicators.map((ind, iIdx) => (
                          <li key={iIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {ind}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">EXAMPLE PROBLEMS</p>
                      <div className="flex flex-wrap gap-1">
                        {pattern.problems.map((prob, pIdx) => (
                          <Badge key={pIdx} variant="secondary" className="text-xs">
                            {prob}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CHEATSHEETS.tips.items.map((section, idx) => (
                <Card key={idx}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.tips.map((tip, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
