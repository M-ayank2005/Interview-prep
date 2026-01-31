import { useState, useEffect } from 'react';

export function useLocalRunner() {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const checkConnection = async () => {
    try {
      const res = await fetch('http://localhost:3001/health');
      if (res.ok) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    } catch (e) {
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  const runCode = async (language: string, code: string) => {
    if (!isConnected) throw new Error("Runner not connected");
    
    try {
      const res = await fetch('http://localhost:3001/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code })
      });
      return await res.json();
    } catch (e) {
      return { error: "Failed to communicate with runner" };
    }
  };

  return { isConnected, isChecking, runCode };
}
