import { useState, useEffect } from 'react';

type LanguageAvailability = {
  language: string;
  installed: boolean;
  version?: string;
  command?: string;
  installPrompt?: string;
  installCommand?: string;
  docsUrl?: string;
  error?: string;
};

export function useLocalRunner() {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [languageAvailability, setLanguageAvailability] = useState<Record<string, LanguageAvailability>>({});

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

  const checkLanguageInstalled = async (language: string, force = false): Promise<LanguageAvailability> => {
    const key = language.toLowerCase();

    if (!force && languageAvailability[key]) {
      return languageAvailability[key];
    }

    if (!isConnected) {
      return {
        language: key,
        installed: false,
        error: 'Runner not connected',
      };
    }

    try {
      const res = await fetch(`http://localhost:3001/languages/${key}`);
      const data = await res.json();

      setLanguageAvailability((prev) => ({
        ...prev,
        [key]: data,
      }));

      return data;
    } catch (_e) {
      return {
        language: key,
        installed: false,
        error: 'Failed to check language installation',
      };
    }
  };

  const runCode = async (language: string, code: string) => {
    if (!isConnected) throw new Error("Runner not connected");

    const availability = await checkLanguageInstalled(language, true);
    if (!availability.installed) {
      return {
        error: availability.installPrompt || `${language} is not installed on your system`,
        code: 'LANGUAGE_NOT_INSTALLED',
        language,
        installPrompt: availability.installPrompt,
        installCommand: availability.installCommand,
        docsUrl: availability.docsUrl,
      };
    }
    
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

  return { isConnected, isChecking, runCode, checkLanguageInstalled, languageAvailability };
}
