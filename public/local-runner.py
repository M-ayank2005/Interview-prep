import http.server
import json
import subprocess
import os
import tempfile
import sys

PORT = 3001

class RequestHandler(http.server.BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_GET(self):
        if self.path == '/health':
            self._set_headers()
            self.wfile.write(json.dumps({"status": "ok"}).encode())
        else:
            self.send_error(404)

    def do_POST(self):
        if self.path == '/run':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            language = data.get('language')
            code = data.get('code')
            
            result = self.run_code(language, code)
            self._set_headers()
            self.wfile.write(json.dumps(result).encode())
        else:
            self.send_error(404)

    def run_code(self, language, code):
        try:
            if language == 'python':
                return self.run_python(code)
            elif language == 'cpp':
                return self.run_cpp(code)
            elif language == 'java':
                return self.run_java(code)
            elif language == 'go':
                return self.run_go(code)
            else:
                return {"error": "Unsupported language"}
        except Exception as e:
            return {"error": str(e)}

    def run_command(self, command, timeout=5):
        try:
            result = subprocess.run(
                command, 
                capture_output=True, 
                text=True, 
                timeout=timeout,
                shell=True # Needed for some windows path issues, but risky. For local dev tool it's okay.
            )
            return {
                "stdout": result.stdout,
                "stderr": result.stderr,
                "exitCode": result.returncode
            }
        except subprocess.TimeoutExpired:
            return {"error": "Execution timed out (5s limit)"}
        except FileNotFoundError:
             return {"error": "Compiler/Interpreter not found. Is it installed and in your PATH?"}

    def run_python(self, code):
        # Check if python is installed
        check = subprocess.run(['python', '--version'], capture_output=True)
        if check.returncode != 0:
             return {"error": "Python not found. Please install Python."}

        with tempfile.NamedTemporaryFile(suffix='.py', delete=False, mode='w+') as f:
            f.write(code)
            f_path = f.name
        
        try:
            return self.run_command(['python', f_path])
        finally:
            os.remove(f_path)

    def run_cpp(self, code):
        # Check if g++ is installed
        try:
             subprocess.run(['g++', '--version'], capture_output=True, check=True)
        except:
             return {"error": "G++ not found. Please install MinGW or G++."}

        with tempfile.NamedTemporaryFile(suffix='.cpp', delete=False, mode='w+') as f:
            f.write(code)
            src_path = f.name
            exe_path = src_path.replace('.cpp', '.exe')
        
        try:
            # Compile
            compile_res = subprocess.run(['g++', src_path, '-o', exe_path], capture_output=True, text=True)
            if compile_res.returncode != 0:
                return {"stdout": "", "stderr": compile_res.stderr, "exitCode": compile_res.returncode}
            
            # Run
            return self.run_command([exe_path])
        finally:
            if os.path.exists(src_path): os.remove(src_path)
            if os.path.exists(exe_path): os.remove(exe_path)

    def run_java(self, code):
        # Simple single file java runner. 
        # Note: Java requires class name to match file name. 
        # We'll assume the user uses 'class Main' and we name file 'Main.java'
        if "class Main" not in code:
             return {"error": "Java code must contain 'class Main'."}
        
        temp_dir = tempfile.mkdtemp()
        src_path = os.path.join(temp_dir, "Main.java")
        
        with open(src_path, 'w') as f:
             f.write(code)
             
        try:
             # Compile
             compile_cmd = ['javac', src_path]
             compile_res = subprocess.run(compile_cmd, capture_output=True, text=True)
             if compile_res.returncode != 0:
                  return {"stdout": "", "stderr": compile_res.stderr, "exitCode": compile_res.returncode}
             
             # Run
             return self.run_command(['java', '-cp', temp_dir, 'Main'])
        finally:
             # Cleanup dir
             import shutil
             shutil.rmtree(temp_dir)

    def run_go(self, code):
        # Check go
        try:
             subprocess.run(['go', 'version'], capture_output=True, check=True)
        except:
             return {"error": "Go not found. Please install Go."}

        with tempfile.NamedTemporaryFile(suffix='.go', delete=False, mode='w+') as f:
            f.write(code)
            src_path = f.name
        
        try:
            return self.run_command(['go', 'run', src_path])
        finally:
             os.remove(src_path)

print(f"Starting Local Runner for Interview Prep on port {PORT}...")
print("Keep this window open to execute code from the website.")
http.server.HTTPServer(('localhost', PORT), RequestHandler).serve_forever()
