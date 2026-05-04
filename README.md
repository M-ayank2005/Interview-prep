# Interview Prep Platform

A production-grade, AI-powered interview preparation platform for SDE roles. Built with Next.js 15+, React 19, Node.js/Express, MongoDB, Docker, WebRTC, and Google Gemini AI.

## 🚀 Features

### 🤖 AI Mock Interviews
- **Live AI Interviewer**: Conduct real-time mock interviews with an AI powered by Gemini Flash models.
- **WebRTC Integration**: Video and audio capabilities for a realistic interview environment.
- **Real-time Code Evaluation**: The AI monitors your code snapshots during the interview.
- **Comprehensive Feedback**: Structured evaluation covering Problem Solving, Code Quality, Communication, and Complexity Analysis.

### 💻 Integrated Development Environment (IDE)
- **Monaco Editor**: VS Code-like coding experience in the browser.
- **Sandboxed Execution**: Safe, isolated code execution using Docker containers for multiple languages (Python, JavaScript, C++).
- **AI Code Assistant**: Get hints, explanations, and optimization suggestions powered by Gemini AI without leaving the editor.

### 📐 System Design Whiteboard
- **Excalidraw Integration**: Built-in interactive whiteboard for High-Level (HLD) and Low-Level Design (LLD).
- **RESHADED Framework**: Structured approach guide for system design interviews.
- **Curated Topics**: Common HLD and LLD questions with key discussion points and expected patterns.

### 📚 Problem Tracker & Study Plans
- **Curated Problems**: Advanced filtering by category, difficulty, and completion status.
- **Spaced Repetition System**: Optimal review scheduling to retain algorithmic concepts.
- **Targeted Study Plans**: DSA Fundamentals, Blind 75, NeetCode 150, FAANG Prep, and more.
- **Company-Specific Prep**: Interview patterns for top tech companies.

### 📈 Analytics Dashboard
- Progress tracking with streaks and daily goals.
- Category-wise completion rates and visual analytics.

## 📁 Project Structure

The project follows a microservices-inspired architecture to handle real-time and heavy processing workloads separately from the main API.

```
Interview-prep/
├── frontend/                 # Next.js Frontend (React 19, Tailwind CSS 4)
│   ├── app/                  # App router pages (dashboard, problems, mock-interview, etc.)
│   ├── components/           # React components (Monaco editor, WebRTC room, Excalidraw)
│   ├── hooks/                # Custom React hooks (use-docker-runner, etc.)
│   └── lib/                  # Utilities and API clients
│
├── backend/                  # Main Node.js/Express API Server
│   ├── src/
│   │   ├── controllers/      # Route handlers (Auth, Problems, Progress, etc.)
│   │   ├── models/           # MongoDB models (Mongoose)
│   │   ├── routes/           # API routes
│   │   └── middleware/       # Auth (JWT/Cookies) and validation
│   └── package.json
│
└── execution-service/        # Heavy-workload Microservice (Docker, AI, WebSockets)
    ├── src/
    │   ├── ai/               # Gemini AI integration (Interviewer, CodeAssist)
    │   ├── docker/           # Docker container management for code execution
    │   └── index.ts          # Express server with Socket.io and WebRTC signaling
    ├── .env.example
    └── package.json
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js (App Router), React 19
- **Styling**: Tailwind CSS 4, Radix UI, Shadcn UI
- **State/Fetching**: TanStack Query
- **Editor & Canvas**: Monaco Editor, Excalidraw
- **Communication**: Socket.io-client, WebRTC

### Backend (Main API)
- **Server**: Node.js, Express, TypeScript
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, HttpOnly Cookies
- **Security**: Helmet, Express Rate Limit

### Execution & AI Service
- **Server**: Node.js, Express, Socket.io
- **Execution Engine**: Docker SDK
- **AI**: Google Gen AI SDK (Gemini 1.5/2.0 Flash)

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- Docker Desktop (must be running for code execution)
- MongoDB (local or Atlas)
- pnpm (for frontend) and npm (for backend services)
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Interview-prep
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   pnpm install
   ```

3. **Setup Main Backend**
   ```bash
   cd ../backend
   npm install
   ```
   Create `backend/.env`:
   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/interview-prep
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Setup Execution Service**
   ```bash
   cd ../execution-service
   npm install
   ```
   Create `execution-service/.env`:
   ```env
   PORT=5001
   FRONTEND_URL=http://localhost:3000
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-1.5-flash
   ```

5. **Start all services** (in separate terminals)
   - **Main Backend**: `cd backend && npm start` (or `npm run dev`)
   - **Execution Service**: `cd execution-service && npm run dev`
   - **Frontend**: `cd frontend && pnpm dev`

6. **Open the app**
   - Navigate to http://localhost:3000

## 📡 API Architecture

- **Frontend** talks to **Main Backend** (`:8000`) for data persistence (auth, progress, problems).
- **Frontend** talks to **Execution Service** (`:5001`) via REST for code execution (`/api/execute`) and AI Code Assist (`/api/code-assist`).
- **Frontend** connects to **Execution Service** via WebSockets (`Socket.io`) for real-time AI Mock Interviews and WebRTC signaling.

## 🔐 Authentication

The application uses secure, HttpOnly cookie-based JWT authentication. 
- Login/Signup endpoints generate JWTs stored securely in the browser.
- Protected routes on both the frontend and backend ensure data privacy.

## 📝 License

MIT

---

Built with ❤️ for interview success.
