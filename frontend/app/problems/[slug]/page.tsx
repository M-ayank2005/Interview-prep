'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Editor, { OnMount } from "@monaco-editor/react";
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from "@/components/ui/resizable";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useLocalRunner } from '@/hooks/use-local-runner';
import { PROBLEMS, getProblemBySlug } from '@/lib/problems-data';
import { 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Settings, 
  Maximize2, 
  RotateCcw,
  ChevronLeft
} from 'lucide-react';
import { toast } from 'sonner';

// Helper if not exported
function findProblem(slug: string) {
    if ((getProblemBySlug as any)) return (getProblemBySlug as any)(slug);
    return PROBLEMS.find(p => p.slug === slug || p.name.toLowerCase().replace(/[']/g, '').replace(/[^a-z0-9]+/g, '-') === slug);
}

const LANGUAGES = {
  python: { 
     name: 'Python 3', 
     monaco: 'python', 
     default: 'class Solution:\n    def solve(self):\n        pass' 
  },
  cpp: { 
     name: 'C++', 
     monaco: 'cpp', 
     default: 'class Solution {\npublic:\n    void solve() {\n        \n    }\n};' 
  },
  java: { 
     name: 'Java', 
     monaco: 'java', 
     default: 'class Solution {\n    public void solve() {\n        \n    }\n}' 
  },
  go: { 
     name: 'Go', 
     monaco: 'go', 
     default: 'package main\n\nfunc solve() {\n    \n}' 
  },
};

export default function ProblemWorkspace() {
  const params = useParams();
  const router = useRouter();
  const { isConnected, isChecking, runCode } = useLocalRunner();
  const [problem, setProblem] = useState<any>(null);
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (params.slug) {
      const p = findProblem(params.slug as string);
      if (p) {
         setProblem(p);
         // Set code if available
         if (p.starterCode && p.starterCode[language]) {
            setCode(p.starterCode[language]);
         } else {
            setCode(LANGUAGES[language as keyof typeof LANGUAGES].default);
         }
      }
    }
  }, [params.slug]);

  // Update code when language changes
  useEffect(() => {
    if (problem?.starterCode?.[language]) {
        setCode(problem.starterCode[language]);
    } else {
        setCode(LANGUAGES[language as keyof typeof LANGUAGES].default);
    }
  }, [language, problem]);

  const handleRun = async () => {
    if (!isConnected) {
        toast.error("Local Runner not connected");
        return;
    }

    setIsRunning(true);
    setOutput(null);
    try {
        const res = await runCode(language, code);
        setOutput(res);
        if (res.exitCode === 0) {
            toast.success("Code executed successfully");
        } else {
            toast.error("Execution failed");
        }
    } catch (e) {
        toast.error("Failed to run code");
    } finally {
        setIsRunning(false);
    }
  };

  const downloadRunner = () => {
     // Create a blob and download the python script
     const link = document.createElement('a');
     link.href = '/local-runner.py';
     link.download = 'local-runner.py';
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  };

  if (!problem) return <div className="p-8">Loading problem...</div>;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-muted/20">
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="w-5 h-5" />
           </Button>
           <h1 className="font-semibold text-lg">{problem.id}. {problem.name}</h1>
           <Badge variant={
                problem.difficulty === 'Easy' ? 'default' : 
                problem.difficulty === 'Medium' ? 'secondary' : 'destructive'
           } className="bg-opacity-20 text-current">
              {problem.difficulty}
           </Badge>
        </div>
        
        <div className="flex items-center gap-2">
           {!isConnected && !isChecking && (
              <Button variant="destructive" size="sm" onClick={downloadRunner} className="animate-pulse">
                 <Download className="w-4 h-4 mr-2" />
                 Download Runner Agent
              </Button>
           )}
           <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
               isConnected ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
           }`}>
               <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
               {isConnected ? 'Connected to Localhost' : 'Agent Disconnected'}
           </div>
           
           <Button variant="outline" size="sm" onClick={handleRun} disabled={isRunning || !isConnected}>
               {isRunning ? <RotateCcw className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
               Run Code
           </Button>
           <Button size="sm">Submit</Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden">
         <ResizablePanelGroup direction="horizontal">
            {/* Left Panel: Description */}
            <ResizablePanel defaultSize={40} minSize={30}>
               <div className="h-full overflow-auto p-6">
                  <Tabs defaultValue="description">
                     <TabsList className="mb-4">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="solution">Solution</TabsTrigger>
                        <TabsTrigger value="editorial">Editorial</TabsTrigger>
                     </TabsList>
                     
                     <TabsContent value="description" className="space-y-6">
                        <div className="prose dark:prose-invert max-w-none">
                           <h2 className="text-xl font-bold mb-4">{problem.name}</h2>
                           <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                              {problem.description || "No description available."}
                           </div>
                           
                           {problem.examples && (
                              <div className="mt-6 space-y-4">
                                 <h3 className="font-semibold text-lg">Examples</h3>
                                 {problem.examples.map((ex: any, i: number) => (
                                    <div key={i} className="bg-muted p-4 rounded-lg space-y-2">
                                       <div className="font-medium">Example {i + 1}:</div>
                                       <div className="pl-4 border-l-2 border-primary/20">
                                          <div className="text-sm"><span className="font-semibold">Input:</span> <code className="bg-background px-1 rounded">{ex.input}</code></div>
                                          <div className="text-sm mt-1"><span className="font-semibold">Output:</span> <code className="bg-background px-1 rounded">{ex.output}</code></div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}

                           {problem.constraints && (
                              <div className="mt-6">
                                 <h3 className="font-semibold text-lg mb-2">Constraints</h3>
                                 <ul className="list-disc pl-5 space-y-1">
                                    {problem.constraints.map((c: string, i: number) => (
                                       <li key={i} className="text-sm font-mono bg-muted/30 px-2 py-0.5 rounded w-fit">{c}</li>
                                    ))}
                                 </ul>
                              </div>
                           )}
                           
                           <div className="mt-8 pt-8 border-t border-border">
                               <h3 className="font-semibold mb-2">Companies</h3>
                               <div className="flex flex-wrap gap-2">
                                  {problem.companies.map((c: string) => (
                                     <Badge key={c} variant="outline">{c}</Badge>
                                  ))}
                               </div>
                           </div>
                        </div>
                     </TabsContent>
                     <TabsContent value="solution">
                        <div className="flex items-center justify-center h-64 text-muted-foreground p-8 text-center bg-muted/10 rounded-lg border border-dashed">
                           <p>Official solution not available. Try solving it yourself first!</p>
                        </div>
                     </TabsContent>
                  </Tabs>
               </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Right Panel: Editor & Output */}
            <ResizablePanel defaultSize={60}>
               <ResizablePanelGroup direction="vertical">
                  {/* Editor Area */}
                  <ResizablePanel defaultSize={70}>
                     <div className="h-full flex flex-col">
                        <div className="h-10 border-b border-border flex items-center justify-between px-4 bg-muted/10">
                           <Select value={language} onValueChange={setLanguage}>
                              <SelectTrigger className="w-32 h-8 text-xs border-none bg-transparent focus:ring-0">
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 {Object.entries(LANGUAGES).map(([key, lang]) => (
                                    <SelectItem key={key} value={key}>{lang.name}</SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           
                           <div className="flex items-center gap-2">
                               <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Settings className="w-4 h-4" />
                               </Button>
                               <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Maximize2 className="w-4 h-4" />
                               </Button>
                           </div>
                        </div>
                        <div className="flex-1">
                           <Editor
                              height="100%"
                              language={LANGUAGES[language as keyof typeof LANGUAGES].monaco}
                              value={code}
                              onChange={(val) => setCode(val || '')}
                              theme="vs-dark"
                              options={{
                                 minimap: { enabled: false },
                                 fontSize: 14,
                                 scrollBeyondLastLine: false,
                                 automaticLayout: true,
                              }}
                              onMount={(editor) => editorRef.current = editor}
                           />
                        </div>
                     </div>
                  </ResizablePanel>

                  <ResizableHandle />

                  {/* Output Area */}
                  <ResizablePanel defaultSize={30}>
                     <div className="h-full bg-slate-950 p-4 overflow-auto font-mono text-sm">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Output Console</span>
                           {output && (
                              <Badge variant={output.exitCode === 0 ? "default" : "destructive"} className="text-[10px] h-5">
                                 {output.exitCode === 0 ? "Success" : "Error"}
                              </Badge>
                           )}
                        </div>
                        
                        {!output && !isRunning && (
                           <div className="text-muted-foreground/50 italic mt-4">
                              Run your code to see output here...
                           </div>
                        )}
                        
                        {isRunning && (
                           <div className="flex items-center gap-2 text-blue-400 mt-4">
                              <RotateCcw className="w-4 h-4 animate-spin" />
                              Running locally...
                           </div>
                        )}

                        {output && (
                           <div className="space-y-4">
                              {output.stdout && (
                                 <div>
                                    <div className="text-xs text-muted-foreground mb-1">STDOUT:</div>
                                    <pre className="text-green-400 whitespace-pre-wrap">{output.stdout}</pre>
                                 </div>
                              )}
                              {output.stderr && (
                                 <div>
                                    <div className="text-xs text-muted-foreground mb-1">STDERR:</div>
                                    <pre className="text-red-400 whitespace-pre-wrap">{output.stderr}</pre>
                                 </div>
                              )}
                              {output.error && (
                                 <div className="bg-red-900/20 border border-red-900 p-3 rounded text-red-300">
                                    <div className="font-bold flex items-center gap-2 mb-1">
                                        <AlertCircle className="w-4 h-4" /> Execution Error
                                    </div>
                                    {output.error}
                                 </div>
                              )}
                           </div>
                        )}
                     </div>
                  </ResizablePanel>
               </ResizablePanelGroup>
            </ResizablePanel>
         </ResizablePanelGroup>
      </div>
    </div>
  );
}
