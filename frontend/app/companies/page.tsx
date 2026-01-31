'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Building2, Search, ExternalLink, Clock, Target,
  TrendingUp, Star, ChevronRight, Users, BookOpen
} from 'lucide-react';

interface Company {
  name: string;
  slug: string;
  description: string;
  difficulty: { easy: number; medium: number; hard: number };
  avgDifficulty: number;
  topicsFrequency: { topic: string; frequency: number }[];
  rounds: { name: string; type: string; duration: number; description: string }[];
  tips: string[];
  problemCount: number;
}

const COMPANIES: Company[] = [
  {
    name: 'Google',
    slug: 'google',
    description: 'Google is known for challenging algorithm questions with focus on optimization and scalability.',
    difficulty: { easy: 10, medium: 50, hard: 40 },
    avgDifficulty: 7,
    topicsFrequency: [
      { topic: 'Dynamic Programming', frequency: 30 },
      { topic: 'Graph Algorithms', frequency: 25 },
      { topic: 'Binary Search', frequency: 20 },
      { topic: 'Trees', frequency: 15 },
      { topic: 'String Manipulation', frequency: 10 },
    ],
    rounds: [
      { name: 'Phone Screen', type: 'Coding', duration: 45, description: 'One medium-hard coding problem' },
      { name: 'Onsite 1', type: 'Coding', duration: 45, description: 'Algorithm and data structures' },
      { name: 'Onsite 2', type: 'Coding', duration: 45, description: 'Algorithm and data structures' },
      { name: 'Onsite 3', type: 'System Design', duration: 45, description: 'System design (for senior)' },
      { name: 'Behavioral', type: 'Behavioral', duration: 45, description: 'Googleyness and leadership' },
    ],
    tips: [
      'Focus on optimal time and space complexity',
      'Be prepared for follow-up questions',
      'Practice problems with multiple solutions',
      'System design is crucial for senior roles',
    ],
    problemCount: 45,
  },
  {
    name: 'Amazon',
    slug: 'amazon',
    description: 'Amazon emphasizes Leadership Principles alongside technical skills. Expect behavioral questions in every round.',
    difficulty: { easy: 20, medium: 60, hard: 20 },
    avgDifficulty: 6,
    topicsFrequency: [
      { topic: 'Arrays & Strings', frequency: 30 },
      { topic: 'Trees & Graphs', frequency: 25 },
      { topic: 'Dynamic Programming', frequency: 20 },
      { topic: 'OOP Design', frequency: 15 },
      { topic: 'System Design', frequency: 10 },
    ],
    rounds: [
      { name: 'Online Assessment', type: 'Coding', duration: 70, description: 'Two coding problems + work simulation' },
      { name: 'Phone Screen', type: 'Coding', duration: 60, description: 'One coding problem + LP questions' },
      { name: 'Loop 1-3', type: 'Coding + LP', duration: 60, description: 'Coding + Leadership Principles' },
      { name: 'System Design', type: 'Design', duration: 60, description: 'System Design + LP' },
      { name: 'Bar Raiser', type: 'Mixed', duration: 60, description: 'Cross-team evaluation' },
    ],
    tips: [
      'Master the 16 Leadership Principles',
      'Prepare 2-3 stories for each LP',
      'Focus on metrics and impact',
      'Practice OA-style problems',
    ],
    problemCount: 52,
  },
  {
    name: 'Meta (Facebook)',
    slug: 'meta',
    description: 'Meta focuses on fast execution and practical problem-solving. Code must compile and run.',
    difficulty: { easy: 15, medium: 60, hard: 25 },
    avgDifficulty: 6.5,
    topicsFrequency: [
      { topic: 'Arrays & Strings', frequency: 35 },
      { topic: 'Trees & Graphs', frequency: 25 },
      { topic: 'Dynamic Programming', frequency: 20 },
      { topic: 'Binary Search', frequency: 10 },
      { topic: 'Design', frequency: 10 },
    ],
    rounds: [
      { name: 'Phone Screen', type: 'Coding', duration: 45, description: 'Two medium problems' },
      { name: 'Onsite 1', type: 'Coding', duration: 45, description: 'Two coding problems' },
      { name: 'Onsite 2', type: 'Coding', duration: 45, description: 'Two coding problems' },
      { name: 'System Design', type: 'Design', duration: 45, description: 'Design a system' },
      { name: 'Behavioral', type: 'Behavioral', duration: 45, description: 'Core values fit' },
    ],
    tips: [
      'Speed is crucial - practice timed problems',
      'Code must compile and run',
      'Prepare for 2 problems per round',
      'Know the product well',
    ],
    problemCount: 48,
  },
  {
    name: 'Microsoft',
    slug: 'microsoft',
    description: 'Microsoft values problem-solving ability and cultural fit. Interviews are collaborative.',
    difficulty: { easy: 25, medium: 55, hard: 20 },
    avgDifficulty: 5.5,
    topicsFrequency: [
      { topic: 'Arrays & Hashing', frequency: 30 },
      { topic: 'Trees', frequency: 25 },
      { topic: 'Linked Lists', frequency: 20 },
      { topic: 'Dynamic Programming', frequency: 15 },
      { topic: 'Design', frequency: 10 },
    ],
    rounds: [
      { name: 'Phone Screen', type: 'Coding', duration: 45, description: 'One coding problem' },
      { name: 'Onsite 1', type: 'Coding', duration: 45, description: 'Coding round' },
      { name: 'Onsite 2', type: 'Coding', duration: 45, description: 'Coding round' },
      { name: 'Design', type: 'Design', duration: 45, description: 'Design round' },
      { name: 'As Appropriate', type: 'Behavioral', duration: 45, description: 'Hiring manager round' },
    ],
    tips: [
      'Practice on whiteboard or shared editor',
      'Focus on communication',
      'Be ready to discuss your projects',
      'Show growth mindset',
    ],
    problemCount: 40,
  },
  {
    name: 'Uber',
    slug: 'uber',
    description: 'Uber interviews focus on practical problems and system design for their ride-sharing platform.',
    difficulty: { easy: 15, medium: 55, hard: 30 },
    avgDifficulty: 6.5,
    topicsFrequency: [
      { topic: 'Graphs & BFS/DFS', frequency: 30 },
      { topic: 'Arrays & Hashing', frequency: 25 },
      { topic: 'Dynamic Programming', frequency: 20 },
      { topic: 'Design', frequency: 15 },
      { topic: 'Heap/Priority Queue', frequency: 10 },
    ],
    rounds: [
      { name: 'Phone Screen', type: 'Coding', duration: 45, description: 'One coding problem with discussion' },
      { name: 'Onsite 1', type: 'Coding', duration: 45, description: 'Algorithm problem' },
      { name: 'Onsite 2', type: 'Coding', duration: 45, description: 'Data structures problem' },
      { name: 'System Design', type: 'Design', duration: 60, description: 'Design Uber-like system' },
      { name: 'Behavioral', type: 'Behavioral', duration: 45, description: 'Culture fit' },
    ],
    tips: [
      'Understand ride-sharing system design',
      'Practice geolocation problems',
      'Focus on real-time systems',
      'Know about surge pricing algorithms',
    ],
    problemCount: 35,
  },
  {
    name: 'Apple',
    slug: 'apple',
    description: 'Apple values deep technical knowledge and attention to detail. Interviews are thorough.',
    difficulty: { easy: 20, medium: 50, hard: 30 },
    avgDifficulty: 6,
    topicsFrequency: [
      { topic: 'Arrays & Strings', frequency: 30 },
      { topic: 'Trees', frequency: 25 },
      { topic: 'Dynamic Programming', frequency: 20 },
      { topic: 'Linked Lists', frequency: 15 },
      { topic: 'System Design', frequency: 10 },
    ],
    rounds: [
      { name: 'Phone Screen', type: 'Coding', duration: 60, description: 'Technical discussion + coding' },
      { name: 'Onsite 1', type: 'Coding', duration: 60, description: 'Coding round' },
      { name: 'Onsite 2', type: 'Coding', duration: 60, description: 'Coding round' },
      { name: 'Design', type: 'Design', duration: 60, description: 'System design' },
      { name: 'Hiring Manager', type: 'Behavioral', duration: 60, description: 'Fit and culture' },
    ],
    tips: [
      'Know Apple products deeply',
      'Show attention to detail',
      'Privacy and security focus',
      'Be prepared for longer interviews',
    ],
    problemCount: 32,
  },
];

const difficultyColors = {
  Easy: 'bg-green-500',
  Medium: 'bg-yellow-500',
  Hard: 'bg-red-500',
};

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const filteredCompanies = COMPANIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Company Interview Prep</h1>
          </div>
          <p className="text-muted-foreground">
            Prepare for interviews at top tech companies with targeted content
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-2">
              {filteredCompanies.map((company) => (
                <Card
                  key={company.slug}
                  className={`cursor-pointer transition-all hover:border-primary/50 ${
                    selectedCompany?.slug === company.slug ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedCompany(company)}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{company.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {company.problemCount} problems
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Avg difficulty: {company.avgDifficulty}/10
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Company Details */}
          <div className="lg:col-span-2">
            {selectedCompany ? (
              <Tabs defaultValue="overview" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCompany.name}</h2>
                    <p className="text-muted-foreground">{selectedCompany.description}</p>
                  </div>
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="process">Interview Process</TabsTrigger>
                    <TabsTrigger value="tips">Tips</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview" className="space-y-6">
                  {/* Difficulty Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Difficulty Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-4 rounded-full overflow-hidden bg-muted flex">
                          <div 
                            className="bg-green-500 h-full" 
                            style={{ width: `${selectedCompany.difficulty.easy}%` }} 
                          />
                          <div 
                            className="bg-yellow-500 h-full" 
                            style={{ width: `${selectedCompany.difficulty.medium}%` }} 
                          />
                          <div 
                            className="bg-red-500 h-full" 
                            style={{ width: `${selectedCompany.difficulty.hard}%` }} 
                          />
                        </div>
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-green-500" />
                          Easy {selectedCompany.difficulty.easy}%
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-yellow-500" />
                          Medium {selectedCompany.difficulty.medium}%
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-red-500" />
                          Hard {selectedCompany.difficulty.hard}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Topics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Most Frequent Topics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedCompany.topicsFrequency.map((topic, idx) => (
                        <div key={topic.topic} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="flex items-center gap-2">
                              <span className="font-medium text-muted-foreground">#{idx + 1}</span>
                              {topic.topic}
                            </span>
                            <span>{topic.frequency}%</span>
                          </div>
                          <Progress value={topic.frequency} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-4 text-center">
                        <p className="text-3xl font-bold text-primary">{selectedCompany.problemCount}</p>
                        <p className="text-sm text-muted-foreground">Total Problems</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4 text-center">
                        <p className="text-3xl font-bold text-primary">{selectedCompany.rounds.length}</p>
                        <p className="text-sm text-muted-foreground">Interview Rounds</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4 text-center">
                        <p className="text-3xl font-bold text-primary">{selectedCompany.avgDifficulty}/10</p>
                        <p className="text-sm text-muted-foreground">Avg Difficulty</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="process" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Interview Process</CardTitle>
                      <CardDescription>
                        Typical interview rounds at {selectedCompany.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedCompany.rounds.map((round, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                                {idx + 1}
                              </div>
                              {idx < selectedCompany.rounds.length - 1 && (
                                <div className="w-0.5 h-full bg-border mt-2" />
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{round.name}</h4>
                                <Badge variant="outline">{round.type}</Badge>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {round.duration} min
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {round.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tips" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Interview Tips for {selectedCompany.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {selectedCompany.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Star className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">General Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-primary mt-0.5" />
                          Practice company-tagged problems on LeetCode
                        </li>
                        <li className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-primary mt-0.5" />
                          Research the company&apos;s products and culture
                        </li>
                        <li className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-primary mt-0.5" />
                          Prepare behavioral stories using STAR method
                        </li>
                        <li className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-primary mt-0.5" />
                          Practice mock interviews with time constraints
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center">
                  <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a Company</h3>
                  <p className="text-muted-foreground">
                    Choose a company from the list to see interview details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
