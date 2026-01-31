import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import config from './config';
import connectDB from './config/database';
import routes from './routes';
import { sessionMiddleware, errorHandler, notFoundHandler } from './middleware';
import logger from './utils/logger';

// Initialize express app
const app: Application = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
    exposedHeaders: ['X-Session-Id'],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  message: {
    success: false,
    error: { message: 'Too many requests, please try again later.' },
  },
});
app.use('/api/', limiter);

// Request logging
app.use(
  morgan('combined', {
    stream: { write: (message) => logger.http(message.trim()) },
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session middleware (for all /api routes)
app.use('/api', sessionMiddleware);

// API routes
app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`🚀 Server running in ${config.nodeEnv} mode on port ${PORT}`);
  logger.info(`📚 API Documentation: http://localhost:${PORT}/api/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

export default app;
