'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';

interface RoundStep {
  title: string;
  description: string;
  tips: string[];
  whatToSay: string[];
  whatNotToSay: string[];
}

const roundSteps: RoundStep[] = [
  {
    title: 'Introduction & Small Talk (1-2 minutes)',
    description: 'Build rapport and show enthusiasm for the role and company.',
    tips: [
      'Make eye contact and smile (if on video)',
      'Keep it brief and professional',
      'Show genuine interest in the company',
      'Be relaxed and confident',
    ],
    whatToSay: [
      'Hi! Thanks for taking the time to chat with me today.',
      'I am really excited about this opportunity at Uber and the work you do in distributed systems.',
      'I have been preparing for this interview and looking forward to discussing some interesting problems.',
      'How are you doing today?',
    ],
    whatNotToSay: [
      'I am so nervous...',
      'I have no idea what I am about to do',
      'I just want this job for the money',
      'I did not prepare much',
    ],
  },
  {
    title: 'Problem Statement Understanding (1-2 minutes)',
    description: 'Clarify the problem before jumping into coding.',
    tips: [
      'Read the problem statement carefully',
      'Ask clarifying questions',
      'Repeat the problem in your own words',
      'Confirm edge cases and constraints',
    ],
    whatToSay: [
      'Let me understand the problem correctly. So we need to...',
      'What is the expected input size? Are we talking about arrays of size up to 10^6?',
      'Can the input contain duplicates?',
      'Should I return the result in a specific format?',
      'What are the constraints on memory usage?',
      'Let me repeat: we are given [example] and we need to find [example]. Is that correct?',
      'What should we do if there are multiple valid answers?',
    ],
    whatNotToSay: [
      'Yeah, I think I understand, let me start coding',
      'I already know how to solve this',
      'Can you just give me the solution?',
      'This is too easy / too hard',
    ],
  },
  {
    title: 'Approach Discussion (2-3 minutes)',
    description: 'Talk through your approach before writing any code.',
    tips: [
      'Think out loud - this is important!',
      'Discuss multiple approaches if possible',
      'Analyze time and space complexity',
      'Ask for feedback before coding',
      'Be willing to discuss trade-offs',
    ],
    whatToSay: [
      'Let me think about different approaches here.',
      'Approach 1: We could use a brute force method which would be O(n^2). But we can optimize it.',
      'Approach 2: We can use a hash map to store seen elements, which would give us O(n) time and O(n) space.',
      'I think Approach 2 is better because it is more efficient.',
      'Let me walk through the algorithm: First, I will [step 1], then [step 2], and finally [step 3].',
      'The time complexity would be O(n log n) due to sorting, and space would be O(n) for the output.',
      'Does this approach sound good to you?',
      'I considered [alternative], but I think [my approach] is better because...',
    ],
    whatNotToSay: [
      'Umm, I don\'t know where to start',
      'Can you give me a hint?',
      'I will just try something and see if it works',
      'The brute force solution is fine, right?',
      '[Just starts coding without explaining]',
    ],
  },
  {
    title: 'Coding Implementation (8-12 minutes)',
    description: 'Write clean, readable code with proper comments.',
    tips: [
      'Write code slowly and carefully',
      'Use meaningful variable names',
      'Add comments for complex logic',
      'Handle edge cases',
      'Test with examples as you go',
      'Don\'t worry about small syntax errors',
    ],
    whatToSay: [
      'I am going to start implementing this now. Let me begin with [first step].',
      'I am creating a hash map here to store [what and why].',
      'Now I am iterating through the array and for each element, [what I am doing].',
      'I need to handle the edge case where [edge case], so I am checking [condition].',
      'Let me trace through an example: If input is [example], then [step by step trace].',
      'I think this handles all cases. Let me review the code once.',
    ],
    whatNotToSay: [
      'Wait, I need to erase this and start again',
      'I don\'t remember the syntax',
      'Hold on, I am writing too slowly',
      '[Code that has obvious bugs without checking]',
    ],
  },
  {
    title: 'Testing & Tracing (2-3 minutes)',
    description: 'Test your code with examples and edge cases.',
    tips: [
      'Test with the given example first',
      'Test with edge cases (empty, single element, duplicates)',
      'Trace through the code step by step',
      'Explain what happens at each iteration',
      'Be ready to fix bugs quickly',
    ],
    whatToSay: [
      'Let me test this with the example: Input = [1, 2, 3], target = 5.',
      'First iteration: [step by step explanation]',
      'After this loop, result is [what it is], which is correct.',
      'Let me also test edge cases. If input is empty [], we should return [expected output].',
      'My code returns [what it returns], which is correct.',
      'If there are duplicates like [1, 1, 2], we should handle it correctly and we do.',
    ],
    whatNotToSay: [
      'I think it should work',
      'I don\'t need to test',
      'Let me assume this case won\'t appear',
      '[Doesn\'t catch obvious bugs in testing]',
    ],
  },
  {
    title: 'Complexity Analysis (1-2 minutes)',
    description: 'Explain time and space complexity clearly.',
    tips: [
      'Be specific about complexity',
      'Explain why it is that complexity',
      'Discuss space usage',
      'Be ready to optimize if asked',
      'Compare with your initial approach',
    ],
    whatToSay: [
      'The time complexity is O(n) because we iterate through the array once.',
      'The space complexity is O(n) for the hash map in the worst case.',
      'This is much better than the brute force O(n^2) approach we discussed earlier.',
      'If we need to optimize further, we could [mention if possible].',
      'Given the constraints [mention constraints], this solution should work well.',
    ],
    whatNotToSay: [
      'I am not sure about the complexity',
      'It is just O(n) and O(1) or something',
      '[Says wrong complexity]',
      'I didn\'t think about that',
    ],
  },
  {
    title: 'Follow-up Questions & Discussion (2-3 minutes)',
    description: 'Be prepared for follow-ups and discuss improvements.',
    tips: [
      'Listen carefully to the follow-up question',
      'Don\'t panic if you get a follow-up',
      'Adapt your solution if needed',
      'Ask clarifying questions for follow-ups too',
      'Show you can think on your feet',
    ],
    whatToSay: [
      'Great question! Let me think about that.',
      'So if we add the constraint [constraint], we would need to [adjustment].',
      'One way to handle this is [approach 1], another way is [approach 2].',
      'If space is limited, we could [space-optimized approach].',
      'I could also implement [follow-up requirement] like this: [explanation].',
      'This is a good follow-up. Let me think about the new approach...',
    ],
    whatNotToSay: [
      'I don\'t know how to do that',
      'That is too hard',
      '[Defensive attitude]',
      'I don\'t need to optimize',
      '[Ignoring the question]',
    ],
  },
  {
    title: 'Closing & Questions (1-2 minutes)',
    description: 'End on a positive note and show genuine interest.',
    tips: [
      'Summarize what you did',
      'Thank them for the time',
      'Ask thoughtful questions about the role/team',
      'Show enthusiasm and confidence',
      'Keep it brief and professional',
    ],
    whatToSay: [
      'Thank you for taking the time for this interview. This was a great problem!',
      'I enjoyed solving this and discussing the approach with you.',
      'Do you have any feedback on my solution?',
      'Can you tell me more about the team I would be working with?',
      'What would be the key focus areas for someone in this role?',
      'I am really excited about the opportunity to work with Uber and contribute to [mention something about Uber].',
    ],
    whatNotToSay: [
      'I hope I did okay',
      'That was hard. I am not sure about this job now',
      '[No questions at all]',
      'What is the salary?',
      'Can I have the job?',
    ],
  },
];

const generalTips = [
  {
    title: 'Communication Best Practices',
    icon: <Lightbulb className="w-5 h-5" />,
    tips: [
      'Speak clearly and at a moderate pace',
      'Make the interviewer feel like a collaborator, not a judge',
      'Explain your thought process - silence is bad',
      'Use simple, clear English',
      'Ask permission before writing code: "Can I start coding now?"',
      'For every complex line, add a comment',
      'When stuck, talk about what you are thinking, don\'t just stare',
    ],
  },
  {
    title: 'Things to Avoid',
    icon: <AlertCircle className="w-5 h-5" />,
    tips: [
      'Don\'t say "I don\'t know" without thinking first - say "Let me think about this"',
      'Don\'t code in complete silence - explain as you code',
      'Don\'t make assumptions without asking',
      'Don\'t get defensive if the interviewer asks you to optimize',
      'Don\'t rush - it is better to be slow and correct than fast and wrong',
      'Don\'t give up if your first approach does not work',
      'Don\'t use complicated words to sound smart - simple explanations are best',
    ],
  },
  {
    title: 'Debugging Mindset',
    icon: <CheckCircle2 className="w-5 h-5" />,
    tips: [
      'If you have a bug, trace through it step-by-step with an example',
      'Say: "I think the issue might be here because..."',
      'Ask: "Let me trace through with an example to verify"',
      'Don\'t panic - bugs are normal, fixing them shows problem-solving skills',
      'Explain your debugging process out loud',
      'Test small parts of your code individually if needed',
    ],
  },
];

export default function InterviewGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">DSA Interview Communication Guide</h1>
          <p className="text-muted-foreground">
            Learn how to communicate effectively during your Uber DSA interview rounds
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* General Tips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {generalTips.map((section, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="text-primary">{section.icon}</div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interview Rounds */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Complete Interview Round Flow</h2>
              <p className="text-muted-foreground">
                Here is a breakdown of each phase of the interview with examples of what to say and what to avoid
              </p>
            </div>

            {roundSteps.map((step, idx) => (
              <Card key={idx} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          {idx + 1}
                        </span>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </div>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {/* Tips */}
                  <div>
                    <h4 className="font-semibold mb-3 text-sm">Key Tips</h4>
                    <div className="space-y-2">
                      {step.tips.map((tip, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What to Say */}
                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold mb-3 text-sm text-green-500">What To Say</h4>
                    <div className="space-y-2 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                      {step.whatToSay.map((text, i) => (
                        <div key={i} className="text-sm text-foreground pl-4 relative">
                          <span className="absolute left-0 text-green-500 font-bold">"{'"'}</span>
                          {text}
                          <span className="text-green-500 font-bold">{"'"}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What NOT to Say */}
                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold mb-3 text-sm text-red-500">What NOT To Say</h4>
                    <div className="space-y-2 bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                      {step.whatNotToSay.map((text, i) => (
                        <div key={i} className="text-sm text-foreground pl-4 relative line-through opacity-75">
                          <span className="absolute left-0 text-red-500 font-bold">✗</span>
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Reference */}
          <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">Quick Reference Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-3">Before You Code</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Ask clarifying questions</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Discuss approach (brute force first, then optimize)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Get feedback on approach</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Identify constraints and edge cases</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">While Coding</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Explain each step</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Use clear variable names</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Add comments for complex logic</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Test with examples</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">After Coding</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Trace through with examples</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Check edge cases</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Analyze time/space complexity</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Discuss potential optimizations</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Communication</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Think out loud</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Be confident and positive</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Ask for clarifications</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Show your problem-solving process</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
