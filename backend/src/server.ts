import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
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
const allowedOrigins = (process.env.FRONTEND_URLS || config.frontendUrl || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const isOriginAllowed = (origin: string): boolean => {
  if (allowedOrigins.length === 0) {
    return process.env.NODE_ENV !== 'production';
  }

  return allowedOrigins.some((allowedOrigin) => {
    if (allowedOrigin === '*' || allowedOrigin === origin) {
      return true;
    }

    if (allowedOrigin.startsWith('*.')) {
      return origin.endsWith(allowedOrigin.slice(1));
    }

    return false;
  });
};

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || isOriginAllowed(origin)) {
      return callback(null, true);
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Id'],
  exposedHeaders: ['X-Session-Id'],
};

app.use(
  cors(corsOptions)
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

// Cookie parsing
app.use(cookieParser());

// Root route - health check
app.get('/', (req, res) => {
  res.send('🚀 Interview Prep API Server is running!');
});

// Session middleware (for all /api routes)
app.use('/api', sessionMiddleware);

// API routes
app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Only start server if not in Vercel serverless environment
if (process.env.VERCEL !== '1') {
  const PORT = config.port;
  app.listen(PORT, () => {
    logger.info(`🚀 Server running in ${config.nodeEnv} mode on port ${PORT}`);
    logger.info(`📚 API Documentation: http://localhost:${PORT}/api/health`);
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  if (process.env.VERCEL !== '1') {
    process.exit(1);
  }
});

// Export for Vercel serverless
export default app;
module.exports = app;
