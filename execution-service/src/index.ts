import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { execDockerCode } from './docker/DockerManager';
import { startInterview, sendMessage, endInterview } from './ai/Interviewer';
import { getCodeSuggestion } from './ai/CodeAssist';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));

// ============================================================
// REST Endpoints
// ============================================================

// Health Check
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    status: 'Execution & Realtime Service is running',
    timestamp: new Date().toISOString(),
  });
});

// Docker Code Execution
app.post('/api/execute', async (req, res) => {
  const { language, code, testCases } = req.body;

  if (!language || !code) {
    return res.status(400).json({ success: false, message: 'Language and code are required' });
  }

  try {
    const result = await execDockerCode(language, code, testCases || []);
    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error('Execution Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Execution failed' });
  }
});

// AI Code Assist (IDE Suggestions)
app.post('/api/code-assist', async (req, res) => {
  const { code, language, query } = req.body;
  if (!query) {
    return res.status(400).json({ success: false, message: 'Query is required' });
  }

  try {
    const suggestion = await getCodeSuggestion(code || '', language || 'python', query);
    res.json({ success: true, suggestion });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================================
// Socket.io — Interview Rooms & Real-time Code Syncing
// ============================================================

io.on('connection', (socket) => {
  console.log(`[Socket] User connected: ${socket.id}`);

  // ---- Interview Room Management ----
  socket.on('join-room', (roomId: string) => {
    socket.join(roomId);
    console.log(`[Socket] ${socket.id} joined room: ${roomId}`);
    socket.to(roomId).emit('user-connected', socket.id);
  });

  // ---- AI Mock Interview Events ----
  socket.on('interview:start', async (data: { sessionId: string; difficulty: string; topic: string }) => {
    console.log(`[Interview] Starting session: ${data.sessionId}`);
    const aiResponse = await startInterview(data.sessionId, data.difficulty, data.topic);
    socket.emit('interview:ai-message', { text: aiResponse, timestamp: Date.now() });
  });

  socket.on('interview:message', async (data: { sessionId: string; message: string; code?: string }) => {
    const aiResponse = await sendMessage(data.sessionId, data.message, data.code);
    socket.emit('interview:ai-message', { text: aiResponse, timestamp: Date.now() });
  });

  socket.on('interview:end', async (data: { sessionId: string }) => {
    console.log(`[Interview] Ending session: ${data.sessionId}`);
    const evaluation = await endInterview(data.sessionId);
    socket.emit('interview:evaluation', { text: evaluation, timestamp: Date.now() });
  });

  // ---- Real-time Code Sync (for multiplayer / interviewer watching) ----
  socket.on('code:update', (data: { roomId: string; code: string; language: string }) => {
    // Broadcast the code update to everyone else in the room
    socket.to(data.roomId).emit('code:sync', { code: data.code, language: data.language, from: socket.id });
  });

  // ---- WebRTC Signaling (for audio/video P2P) ----
  socket.on('webrtc:offer', (data: { roomId: string; offer: any }) => {
    socket.to(data.roomId).emit('webrtc:offer', { offer: data.offer, from: socket.id });
  });

  socket.on('webrtc:answer', (data: { roomId: string; answer: any }) => {
    socket.to(data.roomId).emit('webrtc:answer', { answer: data.answer, from: socket.id });
  });

  socket.on('webrtc:ice-candidate', (data: { roomId: string; candidate: any }) => {
    socket.to(data.roomId).emit('webrtc:ice-candidate', { candidate: data.candidate, from: socket.id });
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🚀 Execution & Realtime Service running on port ${PORT}`);
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️  GEMINI_API_KEY not set — AI Interview features will be disabled.');
  }
});
