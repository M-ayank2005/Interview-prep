'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Clock, CheckCircle2, Circle } from 'lucide-react';

interface MockInterview {
  id: string;
  date: string;
  duration: number;
  topics: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  notes: string;
  performance?: 'Excellent' | 'Good' | 'Average' | 'Poor';
}

const difficultyColors = {
  Easy: 'bg-green-500/10 text-green-700 border-green-500/20',
  Medium: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
  Hard: 'bg-red-500/10 text-red-700 border-red-500/20',
};

const performanceColors = {
  Excellent: 'bg-green-500/10 border-green-500/20',
  Good: 'bg-blue-500/10 border-blue-500/20',
  Average: 'bg-yellow-500/10 border-yellow-500/20',
  Poor: 'bg-red-500/10 border-red-500/20',
};

export default function SchedulerPage() {
  const [interviews, setInterviews] = useState<MockInterview[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    date: '',
    duration: 45,
    difficulty: 'Medium' as const,
    topics: '',
    notes: '',
    performance: 'Good' as const,
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mockInterviews');
    if (saved) {
      try {
        setInterviews(JSON.parse(saved));
      } catch (e) {
        console.error('[v0] Error parsing interviews:', e);
      }
    }
    setMounted(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('mockInterviews', JSON.stringify(interviews));
    }
  }, [interviews, mounted]);

  const handleAddInterview = () => {
    if (!formData.date) {
      alert('Please select a date');
      return;
    }

    const topicsArray = formData.topics
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t);

    if (editingId) {
      setInterviews((prev) =>
        prev.map((i) =>
          i.id === editingId
            ? {
                ...i,
                date: formData.date,
                duration: formData.duration,
                difficulty: formData.difficulty,
                topics: topicsArray,
                notes: formData.notes,
                performance: formData.performance,
              }
            : i,
        ),
      );
      setEditingId(null);
    } else {
      const newInterview: MockInterview = {
        id: Date.now().toString(),
        date: formData.date,
        duration: formData.duration,
        topics: topicsArray,
        difficulty: formData.difficulty,
        completed: false,
        notes: formData.notes,
        performance: formData.performance,
      };
      setInterviews((prev) => [newInterview, ...prev]);
    }

    setFormData({
      date: '',
      duration: 45,
      difficulty: 'Medium',
      topics: '',
      notes: '',
      performance: 'Good',
    });
    setShowForm(false);
  };

  const toggleCompleted = (id: string) => {
    setInterviews((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)),
    );
  };

  const deleteInterview = (id: string) => {
    setInterviews((prev) => prev.filter((i) => i.id !== id));
  };

  const handleEdit = (interview: MockInterview) => {
    setFormData({
      date: interview.date,
      duration: interview.duration,
      difficulty: interview.difficulty,
      topics: interview.topics.join(', '),
      notes: interview.notes,
      performance: interview.performance || 'Good',
    });
    setEditingId(interview.id);
    setShowForm(true);
  };

  const completedCount = interviews.filter((i) => i.completed).length;

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Mock Interview Scheduler</h1>
          <p className="text-muted-foreground">Plan and track your mock interview sessions</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-3xl font-bold text-primary">{interviews.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {completedCount}/{interviews.length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-3xl font-bold text-blue-600">
                  {(interviews.reduce((sum, i) => sum + i.duration, 0) / 60).toFixed(1)}h
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Button */}
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            if (showForm) {
              setFormData({
                date: '',
                duration: 45,
                difficulty: 'Medium',
                topics: '',
                notes: '',
                performance: 'Good',
              });
            }
          }}
          className="w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? 'Cancel' : 'Schedule Mock Interview'}
        </Button>

        {/* Form */}
        {showForm && (
          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit' : 'Schedule New'} Mock Interview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold block mb-2">Date & Time</label>
                  <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    min="15"
                    max="180"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold block mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard',
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-2">Performance (if completed)</label>
                  <select
                    value={formData.performance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        performance: e.target.value as 'Excellent' | 'Good' | 'Average' | 'Poor',
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Average</option>
                    <option>Poor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold block mb-2">Topics (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g., Arrays, DFS, Dynamic Programming"
                  value={formData.topics}
                  onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-2">Notes</label>
                <textarea
                  placeholder="e.g., Practice two pointers, focus on edge cases"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background h-24 resize-none"
                />
              </div>

              <Button onClick={handleAddInterview} className="w-full">
                {editingId ? 'Update' : 'Schedule'} Interview
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Interviews List */}
        <div className="space-y-3">
          {interviews.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground py-12">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No mock interviews scheduled yet. Create your first one!</p>
              </CardContent>
            </Card>
          ) : (
            interviews
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((interview) => {
                const date = new Date(interview.date);
                const dateStr = date.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                });
                const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                return (
                  <Card
                    key={interview.id}
                    className={`${interview.completed ? 'opacity-75' : ''} border-l-4 ${
                      interview.completed ? 'border-l-green-500' : 'border-l-primary'
                    }`}
                  >
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <button
                                onClick={() => toggleCompleted(interview.id)}
                                className="flex-shrink-0"
                              >
                                {interview.completed ? (
                                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                                ) : (
                                  <Circle className="w-6 h-6 text-muted-foreground" />
                                )}
                              </button>
                              <div>
                                <p className="font-semibold">
                                  {dateStr} at {timeStr}
                                </p>
                                <p className="text-xs text-muted-foreground">{interview.duration} minutes</p>
                              </div>
                            </div>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 mb-3 ml-9">
                              <span
                                className={`text-xs px-2 py-1 rounded-full border ${
                                  difficultyColors[interview.difficulty]
                                }`}
                              >
                                {interview.difficulty}
                              </span>
                              {interview.completed && interview.performance && (
                                <span
                                  className={`text-xs px-2 py-1 rounded-full border ${
                                    performanceColors[interview.performance]
                                  }`}
                                >
                                  {interview.performance}
                                </span>
                              )}
                            </div>

                            {/* Topics */}
                            {interview.topics.length > 0 && (
                              <div className="ml-9 mb-3">
                                <p className="text-xs text-muted-foreground font-semibold mb-1">Topics:</p>
                                <div className="flex flex-wrap gap-1">
                                  {interview.topics.map((topic, i) => (
                                    <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Notes */}
                            {interview.notes && (
                              <div className="ml-9 mb-3 text-sm text-muted-foreground italic">
                                "{interview.notes}"
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleEdit(interview)}
                              className="p-2 hover:bg-muted rounded-lg transition-colors"
                              aria-label="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteInterview(interview.id)}
                              className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                              aria-label="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
          )}
        </div>

        {/* Tips */}
        {interviews.length > 0 && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Mock Interview Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Schedule mocks regularly - at least 2-3 per week</p>
              <p>• Use a timer to simulate real interview conditions</p>
              <p>• Record yourself and review your communication</p>
              <p>• Mix easy and hard problems for variety</p>
              <p>• Review performance and track improvement over time</p>
              <p>• Practice explaining solutions out loud clearly</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
