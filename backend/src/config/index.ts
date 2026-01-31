import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

interface Config {
  nodeEnv: string;
  port: number;
  mongodbUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  rateLimitWindowMs: number;
  rateLimitMax: number;
  frontendUrl: string;
  logLevel: string;
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/interview-prep',
  jwtSecret: process.env.JWT_SECRET || 'default-secret-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  logLevel: process.env.LOG_LEVEL || 'info',
};

export default config;
