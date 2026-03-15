import http.server
import json
import subprocess
import os
import tempfile
from urllib.parse import urlparse
import shutil

PORT = 3001

LANGUAGE_CONFIG = {
    'python': {
        'name': 'Python 3',
        'commands': [['python'], ['py', '-3'], ['py']],
        'install_prompt': 'Python is not installed. Install Python and ensure it is added to PATH.',
        'install_command': 'winget install -e --id Python.Python.3.12',
        'docs_url': 'https://www.python.org/downloads/'
    },
    'cpp': {
        'name': 'C++ (g++)',
        'commands': [['g++'], ['clang++']],
        'install_prompt': 'C++ compiler not found. Install MinGW-w64 (g++) or LLVM (clang++).',
        'install_command': 'winget install -e --id MSYS2.MSYS2',
        'docs_url': 'https://www.msys2.org/'
    },
    'java': {
        'name': 'Java',
        'commands': [['java']],
        'install_prompt': 'Java is not installed. Install JDK and ensure java/javac are in PATH.',
        'install_command': 'winget install -e --id EclipseAdoptium.Temurin.21.JDK',
        'docs_url': 'https://adoptium.net/'
    },
    'go': {
        'name': 'Go',
        'commands': [['go']],
        'install_prompt': 'Go is not installed. Install Go and ensure go is in PATH.',
        'install_command': 'winget install -e --id GoLang.Go',
        'docs_url': 'https://go.dev/dl/'
    }
}

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
        path = urlparse(self.path).path

        if path == '/health':
            self._set_headers()
            self.wfile.write(json.dumps({
                "status": "ok",
                "supportedLanguages": list(LANGUAGE_CONFIG.keys())
            }).encode())
        elif path == '/languages':
            statuses = {}
            for language in LANGUAGE_CONFIG:
                statuses[language] = self.check_language(language)

            self._set_headers()
            self.wfile.write(json.dumps({"languages": statuses}).encode())
        elif path.startswith('/languages/'):
            language = path.split('/languages/', 1)[1].strip().lower()
            status = self.check_language(language)
            self._set_headers(200 if language in LANGUAGE_CONFIG else 400)
            self.wfile.write(json.dumps(status).encode())
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

    def find_available_command(self, commands):
        for command in commands:
            try:
                result = subprocess.run(
                    command + ['--version'],
                    capture_output=True,
                    text=True,
                    timeout=3
                )
                if result.returncode == 0:
                    version = (result.stdout or result.stderr).strip().splitlines()
                    return {
                        "command": command,
                        "version": version[0] if version else "Unknown version"
                    }
            except (FileNotFoundError, subprocess.TimeoutExpired):
                continue
            except Exception:
                continue

        return None

    def check_language(self, language):
        language = (language or '').lower()
        config = LANGUAGE_CONFIG.get(language)

        if not config:
            return {
                "language": language,
                "installed": False,
                "error": "Unsupported language"
            }

        command_info = self.find_available_command(config['commands'])
        if command_info:
            return {
                "language": language,
                "installed": True,
                "version": command_info['version'],
                "command": ' '.join(command_info['command'])
            }

        return {
            "language": language,
            "installed": False,
            "installPrompt": config['install_prompt'],
            "installCommand": config['install_command'],
            "docsUrl": config['docs_url']
        }

    def run_code(self, language, code):
        try:
            language_status = self.check_language(language)
            if not language_status.get('installed'):
                return {
                    "error": language_status.get('installPrompt') or "Selected language is not installed.",
                    "code": "LANGUAGE_NOT_INSTALLED",
                    "language": language,
                    "installPrompt": language_status.get('installPrompt'),
                    "installCommand": language_status.get('installCommand'),
                    "docsUrl": language_status.get('docsUrl')
                }

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
                shell=False
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
        command_info = self.find_available_command(LANGUAGE_CONFIG['python']['commands'])
        if not command_info:
            return {"error": LANGUAGE_CONFIG['python']['install_prompt']}

        with tempfile.NamedTemporaryFile(suffix='.py', delete=False, mode='w+') as f:
            f.write(code)
            f_path = f.name
        
        try:
            return self.run_command(command_info['command'] + [f_path])
        finally:
            os.remove(f_path)

    def run_cpp(self, code):
        command_info = self.find_available_command(LANGUAGE_CONFIG['cpp']['commands'])
        if not command_info:
            return {"error": LANGUAGE_CONFIG['cpp']['install_prompt']}

        with tempfile.NamedTemporaryFile(suffix='.cpp', delete=False, mode='w+') as f:
            f.write(code)
            src_path = f.name
            exe_path = src_path.replace('.cpp', '.exe')
        
        try:
            # Compile
            compile_res = subprocess.run(command_info['command'] + [src_path, '-o', exe_path], capture_output=True, text=True)
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

        java_check = self.find_available_command([['java']])
        javac_check = self.find_available_command([['javac']])
        if not java_check or not javac_check:
            return {"error": LANGUAGE_CONFIG['java']['install_prompt']}
        
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
             shutil.rmtree(temp_dir)

    def run_go(self, code):
        command_info = self.find_available_command(LANGUAGE_CONFIG['go']['commands'])
        if not command_info:
            return {"error": LANGUAGE_CONFIG['go']['install_prompt']}

        with tempfile.NamedTemporaryFile(suffix='.go', delete=False, mode='w+') as f:
            f.write(code)
            src_path = f.name
        
        try:
            return self.run_command(command_info['command'] + ['run', src_path])
        finally:
            os.remove(src_path)

print(f"Starting Local Runner for Interview Prep on port {PORT}...")
print("Keep this window open to execute code from the website.")
http.server.HTTPServer(('localhost', PORT), RequestHandler).serve_forever()
