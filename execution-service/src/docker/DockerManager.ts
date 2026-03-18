import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import os from 'os';

export interface ExecutionResult {
  output: string;
  error: string;
  executionTimeMs: number;
}

const SUPPORTED_LANGUAGES: Record<string, { image: string, extension: string, getRunCmd: (file: string) => string[] }> = {
  python: {
    image: 'python:3.10-slim',
    extension: '.py',
    getRunCmd: (file) => ['python3', file]
  },
  javascript: {
    image: 'node:20-slim',
    extension: '.js',
    getRunCmd: (file) => ['node', file]
  },
  cpp: {
    image: 'gcc:13',
    extension: '.cpp',
    getRunCmd: (file) => ['sh', '-c', `g++ -O3 ${file} -o /tmp/out && /tmp/out`]
  }
};

export const execDockerCode = async (language: string, code: string, inputs: string[]): Promise<ExecutionResult> => {
  if (!SUPPORTED_LANGUAGES[language.toLowerCase()]) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const langConfig = SUPPORTED_LANGUAGES[language.toLowerCase()];
  
  // Create a temporary directory for this specific execution
  const executionId = crypto.randomUUID();
  const tmpDir = path.join(os.tmpdir(), `execution-${executionId}`);
  
  await fs.mkdir(tmpDir, { recursive: true });
  const filePath = path.join(tmpDir, `main${langConfig.extension}`);
  await fs.writeFile(filePath, code, 'utf-8');

  // We mount the temp dir to /app in the docker container
  const containerPath = `/app/main${langConfig.extension}`;
  const runCmdArgs = langConfig.getRunCmd(containerPath);

  // Convert windows paths to docker-compatible format if strictly necessary, 
  // though Docker Desktop usually handles absolute paths fine if drives are shared.
  const hostDir = tmpDir.replace(/\\/g, '/');

  const dockerArgs = [
    'run',
    '--rm',                     // Remove container after run
    '--network', 'none',        // No internet access for security
    '--memory', '256m',         // Limit memory to 256MB
    '--cpus', '0.5',           // Limit CPU to half a core
    '-v', `${hostDir}:/app`,   // Mount the local directory to /app
    '-w', '/app',               // Set working directory
    langConfig.image,           // The docker image
    ...runCmdArgs               // The command to run the file
  ];

  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    let stdout = '';
    let stderr = '';

    // E.g., docker run --rm --network none --memory 256m -v C:/temp:/app -w /app python:3.10-slim python3 /app/main.py
    const process = spawn('docker', dockerArgs);

    // Timeout execution after 10 seconds
    const timeout = setTimeout(() => {
      process.kill('SIGKILL');
      stderr += '\nExecution Timeout (exceeded 10 seconds).';
    }, 10000);

    process.stdout.on('data', (data) => {
      // Limit output buffer size to prevent memory exhaustion attacks
      if (stdout.length < 50000) stdout += data.toString();
    });

    process.stderr.on('data', (data) => {
      if (stderr.length < 50000) stderr += data.toString();
    });

    process.on('close', async (codeStatus) => {
      clearTimeout(timeout);
      const executionTimeMs = Date.now() - startTime;
      
      // Cleanup the temporary file directory
      try {
        await fs.rm(tmpDir, { recursive: true, force: true });
      } catch (cleanupErr) {
        console.error(`Failed to cleanup temp dir ${tmpDir}`, cleanupErr);
      }

      resolve({
        output: stdout,
        error: stderr,
        executionTimeMs
      });
    });

    process.on('error', (err) => {
      clearTimeout(timeout);
      reject(new Error(`Failed to spawn Docker process. Is Docker Desktop running? Error: ${err.message}`));
    });

    // Write standard input to the process (if testcases are provided)
    if (inputs && inputs.length > 0) {
        // Just writing the first input as a simple demonstration
        // A real judge would iterate through inputs
        process.stdin.write(inputs[0] + '\n');
    }
    process.stdin.end();
  });
};
