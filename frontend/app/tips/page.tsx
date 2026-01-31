'use client';

import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Clock, Users, Brain, Lightbulb } from 'lucide-react';

interface Tip {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string[];
}

const tips: Tip[] = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Problem Understanding',
    description: 'Spend time understanding the problem before coding',
    points: [
      'Read the problem carefully 2-3 times',
      'Identify input constraints and edge cases',
      'Ask clarifying questions: What are the limits? Can there be duplicates?',
      'Work through examples manually',
      'State your understanding back to the interviewer',
      'Confirm the expected output format',
    ],
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Approach & Discussion',
    description: 'Discuss your approach before jumping to code',
    points: [
      'Think of multiple approaches (brute force, optimized)',
      'Discuss trade-offs between time and space',
      'Explain why you chose your approach',
      'Walk through the algorithm on the example',
      'Estimate complexity before coding',
      'Get interviewer approval before coding',
    ],
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: 'Edge Cases & Validation',
    description: 'Always handle edge cases and validate your solution',
    points: [
      'Empty input/array',
      'Single element',
      'All same elements',
      'Large numbers/overflow',
      'Negative numbers',
      'Duplicates in input',
      'Test on multiple examples',
    ],
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: 'Code Quality',
    description: 'Write clean, readable, production-quality code',
    points: [
      'Use meaningful variable names',
      'Avoid single-letter variables except loop counters',
      'Add comments for complex logic',
      'Use proper indentation and formatting',
      'Break code into helper functions if needed',
      'Check for syntax errors',
      'Avoid hardcoding values',
    ],
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Time Management',
    description: 'Manage your interview time effectively',
    points: [
      '5-7 mins: Problem understanding & questions',
      '5-10 mins: Discuss approach & complexity',
      '15-25 mins: Code the solution',
      '5-10 mins: Test & edge cases',
      'Ask for hints if stuck for >5 mins',
      'Focus on correctness over optimization first',
      'Optimize only if time permits',
    ],
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Communication',
    description: 'Communicate clearly throughout the interview',
    points: [
      'Think aloud - explain your logic',
      'Walk through code line by line',
      'Explain variable purpose',
      'Say complexity out loud',
      'Ask for feedback',
      'Acknowledge mistakes gracefully',
      'Show willingness to learn',
    ],
  },
];

const commonMistakes = [
  'Not clarifying ambiguous requirements',
  'Jumping to code without planning',
  'Ignoring edge cases',
  'Not testing the solution',
  'Poor variable naming',
  'Not explaining thought process',
  'Panicking when stuck',
  'Rushing through the problem',
  'Not asking for hints when needed',
  'Arguing with the interviewer',
];

const quickChecklist = [
  'Read problem carefully',
  'Identify constraints and limits',
  'Work through example manually',
  'Discuss approach before coding',
  'Estimate complexity',
  'Write clean code with good naming',
  'Add comments for complex parts',
  'Test with multiple examples',
  'Check edge cases',
  'Walk through code with interviewer',
];

const dsa60Techniques = [
  'Two Pointers on sorted arrays',
  'Sliding Window for subproblems',
  'Binary Search for sorted data',
  'Hash Maps for O(1) lookups',
  'DFS/BFS for tree/graph traversal',
  'Dynamic Programming for optimization',
  'Stack/Monotonic Stack patterns',
  'Greedy for local optimizations',
  'Recursion & Backtracking',
  'Heap for k-element problems',
];

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Coding Interview Tips & Strategy</h1>
          <p className="text-muted-foreground">Master the art of technical interviews with proven strategies</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Interview Tips Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Interview Execution Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary">{tip.icon}</div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </div>
                  <CardDescription>{tip.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tip.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* DSA 60 Techniques */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Top 10 DSA Techniques (Must Master)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {dsa60Techniques.map((technique, idx) => (
              <Card key={idx} className="border-primary/20">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-bold text-lg">{idx + 1}.</span>
                    <p className="font-medium text-sm">{technique}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Common Mistakes to Avoid</h2>
          <Card className="border-red-500/20 bg-red-500/5">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commonMistakes.map((mistake, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{mistake}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Interview Checklist */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Pre-Interview Checklist</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{idx + 1}</span>
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* C++ Specific Tips */}
        <section>
          <h2 className="text-2xl font-bold mb-4">C++ Specific Tips for Interviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Must-Know STL Containers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm font-mono">
                <p>• vector - Dynamic array</p>
                <p>• unordered_map - Hash table</p>
                <p>• unordered_set - Hash set</p>
                <p>• stack - LIFO container</p>
                <p>• queue - FIFO container</p>
                <p>• priority_queue - Max/min heap</p>
                <p>• map - Ordered map</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Common STL Operations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm font-mono">
                <p>• sort(v.begin(), v.end())</p>
                <p>• v.push_back(), v.pop_back()</p>
                <p>• map[key] - O(1) lookup</p>
                <p>• set.find(x) != set.end()</p>
                <p>• v[i] - Array indexing O(1)</p>
                <p>• v.size(), v.empty()</p>
                <p>• reverse(v.begin(), v.end())</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Algorithm Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm font-mono">
                <p>#include &lt;bits/stdc++.h&gt;</p>
                <p>using namespace std;</p>
                <p>int main() {'{'}</p>
                <p>  ios_base::sync_with_stdio(0);</p>
                <p>  cin.tie(0);</p>
                <p>  // Solution code</p>
                <p>  return 0;</p>
                <p>{'\u007D'}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Conversions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm font-mono">
                <p>• to_string(num) - int to string</p>
                <p>• stoi(s) - string to int</p>
                <p>• max(a, b), min(a, b)</p>
                <p>• abs(x) - absolute value</p>
                <p>• pow(a, b) - exponentiation</p>
                <p>• sqrt(x) - square root</p>
                <p>• ceil/floor - rounding</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interview Flow */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Interview Flow</h2>
          <div className="space-y-3">
            {[
              { step: '1. Greetings & Intro', time: '1-2 min', desc: 'Brief introduction, setup screen' },
              {
                step: '2. Problem Statement',
                time: '2-3 min',
                desc: 'Interviewer reads the problem',
              },
              {
                step: '3. Clarification',
                time: '3-5 min',
                desc: 'Ask questions about constraints, edge cases',
              },
              { step: '4. Approach Discussion', time: '5-10 min', desc: 'Discuss solution approach' },
              { step: '5. Code Implementation', time: '15-25 min', desc: 'Write the actual code' },
              { step: '6. Testing & Debugging', time: '5-10 min', desc: 'Test with examples' },
              { step: '7. Optimization', time: '5-10 min', desc: 'Discuss improvements if time allows' },
              {
                step: '8. Wrap-up & Questions',
                time: '2-3 min',
                desc: 'Ask interviewer your questions',
              },
            ].map((item, idx) => (
              <Card key={idx}>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{item.step}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <p className="text-xs text-primary font-mono mt-1">~{item.time}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mindset & Preparation */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Mindset & Last-Minute Prep</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-base">Do's</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Be confident and enthusiastic
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Communicate your thought process
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Ask for help when stuck
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Acknowledge mistakes gracefully
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Test thoroughly
                </p>
              </CardContent>
            </Card>
            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-base">Don'ts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  Silence - always communicate
                </p>
                <p className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  Skip edge cases
                </p>
                <p className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  Argue with interviewer
                </p>
                <p className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  Copy-paste from memory
                </p>
                <p className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  Panic or give up
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
