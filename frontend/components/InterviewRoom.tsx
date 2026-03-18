'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { io, Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Play,
  Send,
  PhoneOff,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Bot,
  User,
  Clock,
  ChevronLeft,
  RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';
import { useDockerRunner } from '@/hooks/use-docker-runner';

const Editor = dynamic(() => import('@monaco-editor/react').then(m => m.default), { ssr: false });

const EXECUTION_URL = process.env.NEXT_PUBLIC_EXECUTION_URL || 'http://localhost:5001';

const LANGUAGES: Record<string, { name: string; monaco: string; default: string }> = {
  python: { name: 'Python 3', monaco: 'python', default: '# Write your solution here\n\n' },
  cpp: { name: 'C++', monaco: 'cpp', default: '// Write your solution here\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n' },
  javascript: { name: 'JavaScript', monaco: 'javascript', default: '// Write your solution here\n\n' },
};

interface ChatMessage {
  role: 'ai' | 'user';
  text: string;
  timestamp: number;
}

export default function InterviewRoom() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isRunning, runCode } = useDockerRunner();

  const [sessionId] = useState(() => `interview-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || 'medium');
  const [topic, setTopic] = useState(searchParams.get('topic') || 'Arrays & Hashing');
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(LANGUAGES.python.default);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [output, setOutput] = useState<any>(null);

  // Camera / Mic
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Socket
  const socketRef = useRef<Socket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Connect Socket.io
  useEffect(() => {
    const socket = io(EXECUTION_URL, { transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[Interview] Connected to Execution Service');
    });

    socket.on('connect_error', () => {
      console.warn('[Interview] Cannot connect to Execution Service');
    });

    socket.on('interview:ai-message', (data: { text: string; timestamp: number }) => {
      setMessages(prev => [...prev, { role: 'ai', text: data.text, timestamp: data.timestamp }]);
    });

    socket.on('interview:evaluation', (data: { text: string; timestamp: number }) => {
      setEvaluation(data.text);
      setIsEnded(true);
      if (timerRef.current) clearInterval(timerRef.current);
    });

    return () => {
      socket.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Camera toggle
  const toggleCamera = useCallback(async () => {
    if (cameraOn) {
      streamRef.current?.getTracks().forEach(t => t.stop());
      streamRef.current = null;
      setCameraOn(false);
      setMicOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraOn(true);
        setMicOn(true);
      } catch {
        toast.error('Camera/Mic access denied');
      }
    }
  }, [cameraOn]);

  const toggleMic = useCallback(() => {
    if (!streamRef.current) return;
    const audioTracks = streamRef.current.getAudioTracks();
    audioTracks.forEach(t => { t.enabled = !t.enabled; });
    setMicOn(prev => !prev);
  }, []);

  // Start Interview
  const handleStart = () => {
    if (!socketRef.current?.connected) {
      toast.error('Execution Service is offline. Cannot start interview.');
      return;
    }

    setIsStarted(true);
    socketRef.current.emit('interview:start', { sessionId, difficulty, topic });

    // Start timer
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
  };

  // Send chat message
  const handleSendMessage = () => {
    if (!inputMessage.trim() || !socketRef.current?.connected) return;

    const msg: ChatMessage = { role: 'user', text: inputMessage, timestamp: Date.now() };
    setMessages(prev => [...prev, msg]);

    socketRef.current.emit('interview:message', {
      sessionId,
      message: inputMessage,
      code: code, // Send current code snapshot with every message
    });

    setInputMessage('');
  };

  // End Interview
  const handleEnd = () => {
    if (!socketRef.current?.connected) return;
    socketRef.current.emit('interview:end', { sessionId });
  };

  // Run Code
  const handleRunCode = async () => {
    setOutput(null);
    const result = await runCode(language, code);
    setOutput(result);
    if (result.exitCode === 0) {
      toast.success('Code executed successfully');
    } else {
      toast.error('Execution failed');
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // ---- Pre-start Setup Screen ----
  if (!isStarted) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
        <div className="max-w-lg w-full p-8 space-y-6 bg-card border border-border rounded-2xl shadow-xl">
          <div className="text-center space-y-2">
            <Bot className="w-12 h-12 mx-auto text-primary" />
            <h1 className="text-2xl font-bold">AI Mock Interview</h1>
            <p className="text-muted-foreground text-sm">Set up your session and start coding under pressure!</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Difficulty</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Topic</label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arrays & Hashing">Arrays & Hashing</SelectItem>
                  <SelectItem value="Two Pointers">Two Pointers</SelectItem>
                  <SelectItem value="Sliding Window">Sliding Window</SelectItem>
                  <SelectItem value="Stack">Stack</SelectItem>
                  <SelectItem value="Binary Search">Binary Search</SelectItem>
                  <SelectItem value="Linked List">Linked List</SelectItem>
                  <SelectItem value="Trees">Trees</SelectItem>
                  <SelectItem value="Graphs">Graphs</SelectItem>
                  <SelectItem value="Dynamic Programming">Dynamic Programming</SelectItem>
                  <SelectItem value="Backtracking">Backtracking</SelectItem>
                  <SelectItem value="System Design">System Design</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Language</label>
              <Select value={language} onValueChange={(v) => { setLanguage(v); setCode(LANGUAGES[v].default); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(LANGUAGES).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={handleStart}>
            <Play className="w-5 h-5 mr-2" />
            Start Interview
          </Button>

          <Button variant="ghost" className="w-full" onClick={() => router.back()}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
        </div>
      </div>
    );
  }

  // ---- Evaluation Screen ----
  if (isEnded && evaluation) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-background p-4">
        <div className="max-w-2xl w-full p-8 bg-card border border-border rounded-2xl shadow-xl space-y-6 max-h-[80vh] overflow-auto">
          <div className="text-center space-y-2">
            <Bot className="w-12 h-12 mx-auto text-green-500" />
            <h1 className="text-2xl font-bold">Interview Complete!</h1>
            <p className="text-muted-foreground">Duration: {formatTime(elapsedTime)}</p>
          </div>
          <div className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap">
            {evaluation}
          </div>
          <Button className="w-full" onClick={() => router.push('/scheduler')}>
            Back to Mock Interviews
          </Button>
        </div>
      </div>
    );
  }

  // ---- Main Interview Room ----
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="h-12 border-b border-border flex items-center justify-between px-4 bg-muted/20 shrink-0">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="capitalize">{difficulty}</Badge>
          <span className="text-sm font-medium">{topic}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm font-mono">
            <Clock className="w-4 h-4" />
            {formatTime(elapsedTime)}
          </div>
          <Button variant="outline" size="sm" onClick={toggleCamera}>
            {cameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={toggleMic} disabled={!cameraOn}>
            {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
          <Button variant="destructive" size="sm" onClick={handleEnd}>
            <PhoneOff className="w-4 h-4 mr-1" /> End
          </Button>
        </div>
      </header>

      {/* Main split: Left (Editor+Output) | Right (Chat+Video) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left — Code Editor & Output */}
        <div className="flex-1 flex flex-col border-r border-border min-w-0">
          {/* Editor toolbar */}
          <div className="h-10 border-b border-border flex items-center justify-between px-3 bg-muted/10 shrink-0">
            <Select value={language} onValueChange={(v) => { setLanguage(v); setCode(LANGUAGES[v].default); }}>
              <SelectTrigger className="w-32 h-7 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(LANGUAGES).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleRunCode} disabled={isRunning} className="h-7 text-xs">
              {isRunning ? <RotateCcw className="w-3 h-3 mr-1 animate-spin" /> : <Play className="w-3 h-3 mr-1" />}
              Run
            </Button>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              language={LANGUAGES[language].monaco}
              value={code}
              onChange={(val) => setCode(val || '')}
              theme="vs-dark"
              options={{ minimap: { enabled: false }, fontSize: 14, scrollBeyondLastLine: false, automaticLayout: true }}
            />
          </div>

          {/* Output Panel */}
          <div className="h-32 border-t border-border bg-slate-950 p-3 overflow-auto font-mono text-xs shrink-0">
            <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">Output</span>
            {output ? (
              <div className="mt-1 space-y-1">
                {output.stdout && <pre className="text-green-400 whitespace-pre-wrap">{output.stdout}</pre>}
                {output.stderr && <pre className="text-red-400 whitespace-pre-wrap">{output.stderr}</pre>}
                {output.error && <pre className="text-red-400 whitespace-pre-wrap">{output.error}</pre>}
              </div>
            ) : (
              <div className="text-muted-foreground/50 mt-1 italic">Run code to see output...</div>
            )}
          </div>
        </div>

        {/* Right — Chat + Camera */}
        <div className="w-[380px] flex flex-col shrink-0">
          {/* Camera Preview */}
          {cameraOn && (
            <div className="h-40 bg-black border-b border-border shrink-0">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-auto p-3 space-y-3 min-h-0">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground/50 text-sm mt-8">
                <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
                Waiting for AI interviewer...
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-muted rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-blue-500" />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-border bg-muted/10 shrink-0">
            <div className="flex gap-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your response..."
                className="min-h-[40px] max-h-20 resize-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button size="icon" onClick={handleSendMessage} disabled={!inputMessage.trim()} className="shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
