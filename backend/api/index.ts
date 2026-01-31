import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Initialize express app
const app: Application = express();

// MongoDB connection with caching for serverless
let cachedConnection: typeof mongoose | null = null;

const connectDB = async (): Promise<typeof mongoose> => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  try {
    mongoose.set('strictQuery', true);
    cachedConnection = await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
    return cachedConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// CORS configuration
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Id'],
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root route - health check
app.get('/', async (req: Request, res: Response) => {
  try {
    await connectDB();
    res.json({ 
      status: 'ok', 
      message: '🚀 Interview Prep API Server is running!',
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check endpoint
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    await connectDB();
    res.json({ 
      success: true, 
      message: 'API is healthy',
      mongodb: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed'
    });
  }
});

// DB connection middleware for all /api routes
app.use('/api', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: 'Database connection failed' }
    });
  }
});

// Dynamic import of routes
let routesLoaded = false;
app.use('/api', async (req: Request, res: Response, next: NextFunction) => {
  if (!routesLoaded) {
    try {
      const { default: routes } = await import('../src/routes');
      app.use('/api', routes);
      routesLoaded = true;
    } catch (error) {
      console.error('Failed to load routes:', error);
      return res.status(500).json({ 
        success: false, 
        error: { message: 'Failed to load routes' }
      });
    }
  }
  next();
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: { message: `Route ${req.method} ${req.path} not found` }
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: { message: err.message || 'Internal server error' }
  });
});

export default app;
