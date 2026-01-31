'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ComplexityInfo {
  notation: string;
  name: string;
  description: string;
  examples: string[];
  color: string;
}

const complexities: ComplexityInfo[] = [
  {
    notation: 'O(1)',
    name: 'Constant Time',
    description: 'The algorithm takes the same time regardless of input size. Independent of n.',
    examples: ['Array access by index', 'Hash table lookup', 'Simple arithmetic'],
    color: 'bg-green-500/10 border-green-500/20',
  },
  {
    notation: 'O(log n)',
    name: 'Logarithmic Time',
    description: 'The algorithm time grows logarithmically with input size. Typically divides problem in half each time.',
    examples: ['Binary search', 'Balanced binary search tree operations', 'Divide and conquer algorithms'],
    color: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    notation: 'O(n)',
    name: 'Linear Time',
    description: 'The algorithm time grows linearly with input size. Single loop through data.',
    examples: ['Linear search', 'Array traversal', 'Simple iteration'],
    color: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    notation: 'O(n log n)',
    name: 'Linearithmic Time',
    description: 'Grows linearly multiplied by logarithm. Common in efficient sorting algorithms.',
    examples: ['Merge sort', 'Quick sort (average)', 'Heap sort', 'Most optimal comparison-based sorts'],
    color: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    notation: 'O(n²)',
    name: 'Quadratic Time',
    description: 'The algorithm time grows proportionally to the square of input size. Nested loops.',
    examples: ['Bubble sort', 'Selection sort', 'Insertion sort', 'Nested iteration'],
    color: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    notation: 'O(n³)',
    name: 'Cubic Time',
    description: 'Time grows as the cube of input size. Triple nested loops.',
    examples: ['Floyd-Warshall algorithm', 'Triple nested iterations'],
    color: 'bg-red-500/10 border-red-500/20',
  },
  {
    notation: 'O(2ⁿ)',
    name: 'Exponential Time',
    description: 'Time doubles with each addition to input. Very inefficient for large inputs.',
    examples: ['Recursive fibonacci', 'Subsets generation', 'Power set problems'],
    color: 'bg-red-600/10 border-red-600/20',
  },
  {
    notation: 'O(n!)',
    name: 'Factorial Time',
    description: 'Time grows as factorial of input. Extremely inefficient even for small inputs.',
    examples: ['Permutations generation', 'Brute force TSP'],
    color: 'bg-red-800/10 border-red-800/20',
  },
];

const dataStructures = [
  {
    name: 'Array',
    access: 'O(1)',
    search: 'O(n)',
    insert: 'O(n)',
    delete: 'O(n)',
    space: 'O(n)',
  },
  {
    name: 'Hash Table',
    access: 'N/A',
    search: 'O(1) avg',
    insert: 'O(1) avg',
    delete: 'O(1) avg',
    space: 'O(n)',
  },
  {
    name: 'Singly Linked List',
    access: 'O(n)',
    search: 'O(n)',
    insert: 'O(1)',
    delete: 'O(1)',
    space: 'O(n)',
  },
  {
    name: 'Binary Search Tree',
    access: 'O(log n) avg',
    search: 'O(log n) avg',
    insert: 'O(log n) avg',
    delete: 'O(log n) avg',
    space: 'O(n)',
  },
  {
    name: 'Heap',
    access: 'O(n)',
    search: 'O(n)',
    insert: 'O(log n)',
    delete: 'O(log n)',
    space: 'O(n)',
  },
  {
    name: 'Graph (Adjacency List)',
    access: 'O(V + E)',
    search: 'O(V + E)',
    insert: 'O(1)',
    delete: 'O(V + E)',
    space: 'O(V + E)',
  },
];

const sortingAlgorithms = [
  { name: 'Bubble Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true },
  { name: 'Selection Sort', best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: false },
  { name: 'Insertion Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true },
  { name: 'Merge Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: true },
  { name: 'Quick Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: false },
  { name: 'Heap Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', stable: false },
  { name: 'Counting Sort', best: 'O(n + k)', avg: 'O(n + k)', worst: 'O(n + k)', space: 'O(k)', stable: true },
];

export default function ComplexityPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Time & Space Complexity Guide</h1>
          <p className="text-muted-foreground">Master Big O notation and analyze algorithm efficiency</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Complexity Classifications */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Complexity Classifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complexities.map((c, idx) => (
              <Card key={idx} className={`border ${c.color}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-baseline gap-2">
                    <CardTitle className="text-lg font-mono">{c.notation}</CardTitle>
                    <p className="text-sm text-muted-foreground">{c.name}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">{c.description}</p>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Examples:</p>
                    <ul className="text-xs space-y-1">
                      {c.examples.map((ex, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-primary">•</span> {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Complexity Comparison */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Complexity Comparison (Input size: 1,000,000)</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 font-semibold">Notation</th>
                      <th className="text-right p-2 font-semibold">Operations</th>
                      <th className="text-left p-2 font-semibold">Feasibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="p-2 font-mono text-primary">O(log n)</td>
                      <td className="text-right p-2">~20</td>
                      <td className="p-2 text-green-600">Excellent</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="p-2 font-mono text-primary">O(n)</td>
                      <td className="text-right p-2">1,000,000</td>
                      <td className="p-2 text-green-600">Very Good</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="p-2 font-mono text-primary">O(n log n)</td>
                      <td className="text-right p-2">~20,000,000</td>
                      <td className="p-2 text-green-600">Good</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="p-2 font-mono text-primary">O(n²)</td>
                      <td className="text-right p-2">1,000,000,000,000</td>
                      <td className="p-2 text-orange-600">Poor</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="p-2 font-mono text-primary">O(2ⁿ)</td>
                      <td className="text-right p-2">2^1,000,000</td>
                      <td className="p-2 text-red-600">Infeasible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Data Structure Complexity */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Data Structure Operations Complexity</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 font-semibold">Data Structure</th>
                      <th className="text-center p-2 font-semibold">Access</th>
                      <th className="text-center p-2 font-semibold">Search</th>
                      <th className="text-center p-2 font-semibold">Insert</th>
                      <th className="text-center p-2 font-semibold">Delete</th>
                      <th className="text-center p-2 font-semibold">Space</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataStructures.map((ds, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted/50">
                        <td className="p-2 font-semibold">{ds.name}</td>
                        <td className="text-center p-2 font-mono text-sm">{ds.access}</td>
                        <td className="text-center p-2 font-mono text-sm">{ds.search}</td>
                        <td className="text-center p-2 font-mono text-sm">{ds.insert}</td>
                        <td className="text-center p-2 font-mono text-sm">{ds.delete}</td>
                        <td className="text-center p-2 font-mono text-sm">{ds.space}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sorting Algorithms Complexity */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Sorting Algorithms Complexity</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 font-semibold">Algorithm</th>
                      <th className="text-center p-2 font-semibold">Best Case</th>
                      <th className="text-center p-2 font-semibold">Average</th>
                      <th className="text-center p-2 font-semibold">Worst Case</th>
                      <th className="text-center p-2 font-semibold">Space</th>
                      <th className="text-center p-2 font-semibold">Stable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortingAlgorithms.map((algo, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted/50">
                        <td className="p-2 font-semibold">{algo.name}</td>
                        <td className="text-center p-2 font-mono text-sm">{algo.best}</td>
                        <td className="text-center p-2 font-mono text-sm">{algo.avg}</td>
                        <td className="text-center p-2 font-mono text-sm">{algo.worst}</td>
                        <td className="text-center p-2 font-mono text-sm">{algo.space}</td>
                        <td className="text-center p-2">{algo.stable ? '✓' : '✗'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Quick Tips for Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Time Complexity Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Single loop = O(n)</p>
                <p>• Nested loops = multiply complexities</p>
                <p>• Dividing in half = O(log n)</p>
                <p>• Recursive calls = add levels</p>
                <p>• Drop constants: O(2n) → O(n)</p>
                <p>• Keep highest order term: O(n² + n) → O(n²)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Space Complexity Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Recursion depth = call stack space</p>
                <p>• Data structures store memory</p>
                <p>• Input size doesn't count in many contexts</p>
                <p>• Auxiliary space = extra memory used</p>
                <p>• In-place algorithms = O(1) space</p>
                <p>• Recursion can be O(n) space</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
