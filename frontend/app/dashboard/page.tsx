'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, Flame, Trophy, Clock, TrendingUp, BookOpen, 
  Calendar, Zap, Brain, Code, Building2, ArrowRight,
  CheckCircle2, Circle, Star, BarChart3
} from 'lucide-react';
import Link from 'next/link';

interface DashboardData {
  targetCompany?: string;
  targetRole?: string;
  daysUntilInterview?: number;
  dailyGoal: number;
  streakCount: number;
  longestStreak: number;
  totalSolvedCount: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  totalStudyTime: number;
}

interface DailyProblem {
  name: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  url: string;
}

// Fallback local data for problems
const PROBLEMS = [
  { name: 'Two Sum', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy' as const },
  { name: 'Maximum Subarray', category: 'Arrays & Hashing', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium' as const },
  { name: '3Sum', category: 'Two Pointers', url: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium' as const },
  { name: 'Trapping Rain Water', category: 'Two Pointers', url: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'Hard' as const },
  { name: 'Number of Islands', category: 'Graphs', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium' as const },
];

const difficultyColors = {
  Easy: 'bg-green-500/10 text-green-600 border-green-500/20',
  Medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  Hard: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const features = [
  { 
    icon: <BookOpen className="w-6 h-6" />, 
    title: 'DSA Problems', 
    description: 'Curated list of 150+ problems organized by patterns',
    href: '/problems',
    color: 'text-blue-500'
  },
  { 
    icon: <Building2 className="w-6 h-6" />, 
    title: 'Company Prep', 
    description: 'Company-specific questions and interview processes',
    href: '/companies',
    color: 'text-purple-500'
  },
  { 
    icon: <Calendar className="w-6 h-6" />, 
    title: 'Study Plans', 
    description: 'Structured plans like Blind 75, NeetCode 150',
    href: '/study-plans',
    color: 'text-green-500'
  },
  { 
    icon: <Brain className="w-6 h-6" />, 
    title: 'Spaced Review', 
    description: 'Smart revision based on your weak areas',
    href: '/review',
    color: 'text-orange-500'
  },
  { 
    icon: <Code className="w-6 h-6" />, 
    title: 'Code Templates', 
    description: 'Pattern templates in C++, Python, Java',
    href: '/patterns',
    color: 'text-cyan-500'
  },
  { 
    icon: <BarChart3 className="w-6 h-6" />, 
    title: 'Analytics', 
    description: 'Track progress with detailed insights',
    href: '/analytics',
    color: 'text-pink-500'
  },
];

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData>({
    dailyGoal: 5,
    streakCount: 0,
    longestStreak: 0,
    totalSolvedCount: 0,
    easyCount: 0,
    mediumCount: 0,
    hardCount: 0,
    totalStudyTime: 0,
  });
  const [dailyProblem, setDailyProblem] = useState<DailyProblem | null>(null);
  const [mounted, setMounted] = useState(false);
  const [todaysSolved, setTodaysSolved] = useState(0);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('problemStatus');
    if (saved) {
      try {
        const status = JSON.parse(saved);
        const solvedKeys = Object.keys(status).filter(k => status[k].solved);
        const easy = solvedKeys.filter(k => PROBLEMS.find(p => p.name === k)?.difficulty === 'Easy').length;
        const medium = solvedKeys.filter(k => PROBLEMS.find(p => p.name === k)?.difficulty === 'Medium').length;
        const hard = solvedKeys.filter(k => PROBLEMS.find(p => p.name === k)?.difficulty === 'Hard').length;
        
        // Calculate streak
        const savedStreak = localStorage.getItem('streak');
        const streak = savedStreak ? JSON.parse(savedStreak) : { count: 0, longest: 0 };
        
        setDashboard(prev => ({
          ...prev,
          totalSolvedCount: solvedKeys.length,
          easyCount: easy,
          mediumCount: medium,
          hardCount: hard,
          streakCount: streak.count,
          longestStreak: streak.longest,
        }));
      } catch (e) {
        console.error('Error loading dashboard:', e);
      }
    }
    
    // Set daily problem based on date
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % PROBLEMS.length;
    setDailyProblem(PROBLEMS[index]);
    
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  const goalProgress = Math.min((todaysSolved / dashboard.dailyGoal) * 100, 100);
  const totalProblems = 150; // Estimated total
  const overallProgress = (dashboard.totalSolvedCount / totalProblems) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Interview Prep Pro
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                The ultimate platform to ace your SDE interviews. Master DSA patterns, track progress, 
                and prepare with company-specific content.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                <Flame className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{dashboard.streakCount}</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-lg">
                <Trophy className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{dashboard.totalSolvedCount}</p>
                  <p className="text-xs text-muted-foreground">Solved</p>
                </div>
              </div>
              {dashboard.daysUntilInterview && (
                <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-lg">
                  <Target className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{dashboard.daysUntilInterview}</p>
                    <p className="text-xs text-muted-foreground">Days Left</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Daily Challenge & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Problem */}
          <Card className="lg:col-span-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <CardTitle>Daily Challenge</CardTitle>
                </div>
                <Badge variant="outline" className="text-xs">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </Badge>
              </div>
              <CardDescription>Complete today&apos;s problem to maintain your streak!</CardDescription>
            </CardHeader>
            <CardContent>
              {dailyProblem && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{dailyProblem.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{dailyProblem.category}</Badge>
                      <Badge className={difficultyColors[dailyProblem.difficulty]}>
                        {dailyProblem.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button asChild size="lg">
                    <a href={dailyProblem.url} target="_blank" rel="noopener noreferrer">
                      Solve Now <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Daily Goal */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Daily Goal</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>{todaysSolved} / {dashboard.dailyGoal} problems</span>
                <span className="text-muted-foreground">{Math.round(goalProgress)}%</span>
              </div>
              <Progress value={goalProgress} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {goalProgress >= 100 
                  ? '🎉 Goal completed! Great job!' 
                  : `${dashboard.dailyGoal - todaysSolved} more to hit your goal`}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <CardTitle>Progress Overview</CardTitle>
              </div>
              <Link href="/analytics">
                <Button variant="outline" size="sm">View Details</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Overall */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{dashboard.totalSolvedCount}/{totalProblems}</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </div>
              
              {/* Easy */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Easy</span>
                  <span>{dashboard.easyCount}</span>
                </div>
                <Progress value={(dashboard.easyCount / 50) * 100} className="h-2 [&>div]:bg-green-500" />
              </div>
              
              {/* Medium */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-600">Medium</span>
                  <span>{dashboard.mediumCount}</span>
                </div>
                <Progress value={(dashboard.mediumCount / 75) * 100} className="h-2 [&>div]:bg-yellow-500" />
              </div>
              
              {/* Hard */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-red-600">Hard</span>
                  <span>{dashboard.hardCount}</span>
                </div>
                <Progress value={(dashboard.hardCount / 25) * 100} className="h-2 [&>div]:bg-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Explore Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, idx) => (
              <Link key={idx} href={feature.href}>
                <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`${feature.color} p-2 rounded-lg bg-primary/5 group-hover:scale-110 transition-transform`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Link href="/problems">
                <Button variant="outline" className="gap-2">
                  <BookOpen className="w-4 h-4" /> Browse Problems
                </Button>
              </Link>
              <Link href="/scheduler">
                <Button variant="outline" className="gap-2">
                  <Calendar className="w-4 h-4" /> Schedule Mock Interview
                </Button>
              </Link>
              <Link href="/patterns">
                <Button variant="outline" className="gap-2">
                  <Code className="w-4 h-4" /> View Patterns
                </Button>
              </Link>
              <Link href="/tips">
                <Button variant="outline" className="gap-2">
                  <Star className="w-4 h-4" /> Interview Tips
                </Button>
              </Link>
              <Link href="/complexity">
                <Button variant="outline" className="gap-2">
                  <BarChart3 className="w-4 h-4" /> Complexity Guide
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
