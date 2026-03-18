'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle2, Circle, ExternalLink, Search, Filter,
  ChevronDown, ChevronUp, Bookmark, Clock, Star,
  TrendingUp, BarChart3, Flame, Zap, Target
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  PROBLEMS as ALL_PROBLEMS, 
  Problem,
  CATEGORIES, 
  COMPANIES,
  getBlind75Problems,
  getNeetCode150Problems,
  getFaangFavoriteProblems 
} from '@/lib/problems-data';

interface SolvedStatus {
  solved: boolean;
  timestamp: number;
  notes: string;
  confidence?: number;
  attempts?: number;
}

const difficultyColors = {
  Easy: 'bg-green-500/10 text-green-600 border-green-500/20',
  Medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  Hard: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const confidenceLabels = ['Not confident', 'Somewhat', 'Okay', 'Good', 'Mastered'];

function ProblemsPageContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [sheetFilter, setSheetFilter] = useState('all');
  const [problemStatus, setProblemStatus] = useState<Record<string, SolvedStatus>>({});
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(CATEGORIES));

  useEffect(() => {
    setMounted(true);
    const savedStatus = localStorage.getItem('problemStatus');
    if (savedStatus) {
      setProblemStatus(JSON.parse(savedStatus));
    }
    
    // Check URL params
    const companyParam = searchParams.get('company');
    if (companyParam) {
      // url param is often a slug (e.g. 'google'). Find the matching structured Company name.
      const matchedCompany = COMPANIES.find(c => c.toLowerCase() === companyParam.toLowerCase());
      if (matchedCompany) {
        setCompanyFilter(matchedCompany);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('problemStatus', JSON.stringify(problemStatus));
    }
  }, [problemStatus, mounted]);

  const toggleProblem = (problemName: string) => {
    setProblemStatus(prev => ({
      ...prev,
      [problemName]: {
        ...prev[problemName],
        solved: !prev[problemName]?.solved,
        timestamp: !prev[problemName]?.solved ? Date.now() : prev[problemName]?.timestamp,
        notes: prev[problemName]?.notes || '',
      },
    }));
  };

  const updateConfidence = (problemName: string, confidence: number) => {
    setProblemStatus(prev => ({
      ...prev,
      [problemName]: {
        ...prev[problemName],
        confidence,
        solved: prev[problemName]?.solved || false,
        timestamp: prev[problemName]?.timestamp || Date.now(),
        notes: prev[problemName]?.notes || '',
      },
    }));
  };

  const filteredProblems = useMemo(() => {
    return ALL_PROBLEMS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.pattern.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesCompany = companyFilter === 'all' || p.companies.includes(companyFilter);
      
      let matchesSheet = true;
      if (sheetFilter === 'blind75') {
        matchesSheet = p.isBlind75;
      } else if (sheetFilter === 'neetcode150') {
        matchesSheet = p.isNeetCode150;
      } else if (sheetFilter === 'faang') {
        matchesSheet = p.isFaangFavorite;
      }
      
      let matchesStatus = true;
      if (statusFilter === 'solved') {
        matchesStatus = problemStatus[p.name]?.solved === true;
      } else if (statusFilter === 'unsolved') {
        matchesStatus = !problemStatus[p.name]?.solved;
      }
      
      return matchesSearch && matchesDifficulty && matchesCategory && matchesStatus && matchesCompany && matchesSheet;
    });
  }, [searchQuery, difficultyFilter, categoryFilter, statusFilter, companyFilter, sheetFilter, problemStatus]);

  const groupedProblems = useMemo(() => {
    const grouped: Record<string, Problem[]> = {};
    filteredProblems.forEach(p => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    });
    return grouped;
  }, [filteredProblems]);

  const stats = useMemo(() => {
    const solved = Object.values(problemStatus).filter(s => s.solved).length;
    const easy = ALL_PROBLEMS.filter(p => p.difficulty === 'Easy' && problemStatus[p.name]?.solved).length;
    const medium = ALL_PROBLEMS.filter(p => p.difficulty === 'Medium' && problemStatus[p.name]?.solved).length;
    const hard = ALL_PROBLEMS.filter(p => p.difficulty === 'Hard' && problemStatus[p.name]?.solved).length;
    const blind75Solved = ALL_PROBLEMS.filter(p => p.isBlind75 && problemStatus[p.name]?.solved).length;
    const neetcode150Solved = ALL_PROBLEMS.filter(p => p.isNeetCode150 && problemStatus[p.name]?.solved).length;
    return { 
      solved, easy, medium, hard, 
      total: ALL_PROBLEMS.length,
      blind75Solved,
      blind75Total: getBlind75Problems().length,
      neetcode150Solved,
      neetcode150Total: getNeetCode150Problems().length
    };
  }, [problemStatus]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                DSA Problems
                <Badge variant="outline" className="text-sm">{ALL_PROBLEMS.length}+</Badge>
              </h1>
              <p className="text-muted-foreground">
                {stats.solved} / {stats.total} solved • 
                <span className="text-green-600 ml-2">{stats.easy} Easy</span> • 
                <span className="text-yellow-600 ml-2">{stats.medium} Medium</span> • 
                <span className="text-red-600 ml-2">{stats.hard} Hard</span>
              </p>
            </div>
            
            {/* Sheet Progress Cards */}
            <div className="flex gap-3">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg px-3 py-2 text-center">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Target className="w-3 h-3" /> Blind 75
                </div>
                <div className="font-bold text-blue-600">{stats.blind75Solved}/{stats.blind75Total}</div>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-lg px-3 py-2 text-center">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Zap className="w-3 h-3" /> NeetCode 150
                </div>
                <div className="font-bold text-green-600">{stats.neetcode150Solved}/{stats.neetcode150Total}</div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="w-full lg:w-64">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{Math.round((stats.solved / stats.total) * 100)}%</span>
              </div>
              <Progress value={(stats.solved / stats.total) * 100} className="h-2" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4">
              <div className="sm:col-span-2 md:col-span-3 xl:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search problems, patterns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={sheetFilter} onValueChange={setSheetFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Problem Sheet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Problems</SelectItem>
                  <SelectItem value="blind75">🎯 Blind 75</SelectItem>
                  <SelectItem value="neetcode150">⚡ NeetCode 150</SelectItem>
                  <SelectItem value="faang">🔥 FAANG Favorites</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {COMPANIES.map(company => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="solved">✅ Solved</SelectItem>
                  <SelectItem value="unsolved">⭕ Unsolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Problems List */}
        <div className="space-y-4">
          {Object.entries(groupedProblems).map(([category, problems]) => (
            <Collapsible
              key={category}
              open={expandedCategories.has(category)}
              onOpenChange={() => toggleCategory(category)}
            >
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {expandedCategories.has(category) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                        <CardTitle className="text-xl">{category}</CardTitle>
                        <Badge variant="secondary">
                          {problems.filter(p => problemStatus[p.name]?.solved).length}/{problems.length}
                        </Badge>
                      </div>
                      <Progress 
                        value={(problems.filter(p => problemStatus[p.name]?.solved).length / problems.length) * 100} 
                        className="w-32 h-2"
                      />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="divide-y divide-border">
                      {problems.map((problem) => {
                        const status = problemStatus[problem.name];
                        const isSolved = status?.solved;
                        
                        return (
                          <div
                            key={problem.name}
                            className={`py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                              isSolved ? 'bg-green-500/5' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3 flex-1">
                              <button
                                onClick={() => toggleProblem(problem.name)}
                                className="mt-1 hover:scale-110 transition-transform"
                              >
                                {isSolved ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Circle className="w-5 h-5 text-muted-foreground" />
                                )}
                              </button>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Link
                                    href={`/problems/${problem.slug || problem.name.toLowerCase().replace(/[']/g, '').replace(/[^a-z0-9]+/g, '-')}`}
                                    className="font-medium hover:text-primary transition-colors flex items-center gap-1 text-lg"
                                  >
                                    {problem.name}
                                  </Link>
                                  <a
                                    href={problem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                    title="Solve on LeetCode"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                  <Badge className={difficultyColors[problem.difficulty]}>
                                    {problem.difficulty}
                                  </Badge>
                                  {problem.isBlind75 && (
                                    <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20 text-xs">
                                      🎯 Blind 75
                                    </Badge>
                                  )}
                                  {problem.isNeetCode150 && (
                                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                                      ⚡ NC 150
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 mt-1 flex-wrap">
                                  <Badge variant="outline" className="text-xs">
                                    {problem.pattern}
                                  </Badge>
                                </div>
                                {problem.companies && problem.companies.length > 0 && (
                                  <div className="text-xs text-muted-foreground mt-1">
                                    Asked at: {problem.companies.slice(0, 4).join(', ')}
                                    {problem.companies.length > 4 && ` +${problem.companies.length - 4} more`}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Confidence Rating */}
                            <div className="flex items-center gap-1 ml-8 md:ml-0">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <button
                                  key={level}
                                  onClick={() => updateConfidence(problem.name, level)}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                    (status?.confidence || 0) >= level
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-muted hover:bg-muted-foreground/20'
                                  }`}
                                  title={confidenceLabels[level - 1]}
                                >
                                  <Star className="w-3 h-3" />
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <Card className="py-12">
            <CardContent className="text-center text-muted-foreground">
              <p className="text-lg">No problems found matching your filters.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setDifficultyFilter('all');
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setCompanyFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

export default function ProblemsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProblemsPageContent />
    </Suspense>
  );
}
