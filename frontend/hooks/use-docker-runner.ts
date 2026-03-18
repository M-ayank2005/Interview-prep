import { useState, useCallback } from 'react';

export function useDockerRunner() {
  const [isRunning, setIsRunning] = useState(false);

  const runCode = useCallback(async (language: string, code: string, inputs: string[] = []) => {
    setIsRunning(true);
    
    const executionUrl = process.env.NEXT_PUBLIC_EXECUTION_URL || 'http://localhost:5001';
    
    try {
      const res = await fetch(`${executionUrl}/api/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code, testCases: inputs })
      });
      
      if (!res.ok) {
        // Backend is reachable but returned an error status (e.g. 500)
        return {
          exitCode: 1,
          stdout: '',
          stderr: '',
          error: `Execution Service returned an error (${res.status}). It might be misconfigured.`
        };
      }

      const data = await res.json();
      
      // Map API result to expected UI format
      if (data.success) {
         return {
            exitCode: data.error ? 1 : 0,
            stdout: data.output || '',
            stderr: data.error || '',
            executionTimeMs: data.executionTimeMs
         };
      } else {
         return {
            exitCode: 1,
            stdout: '',
            stderr: '',
            error: data.message || 'Execution failed.'
         };
      }
      
    } catch (e: any) {
      // Backend is completely unreachable/offline
      console.warn("Docker Execution Service unreachable:", e);
      return {
        exitCode: 1,
        stdout: '',
        stderr: '',
        error: "Code Execution Service is currently offline. You are in read-only mode."
      };
    } finally {
      setIsRunning(false);
    }
  }, []);

  return { isRunning, runCode };
}
