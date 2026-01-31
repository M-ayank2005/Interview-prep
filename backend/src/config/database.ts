import mongoose from 'mongoose';
import config from './index';
import logger from '../utils/logger';

let isConnected = false;

const connectDB = async (): Promise<void> => {
  if (isConnected) {
    return;
  }

  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(config.mongodbUri);
    isConnected = true;
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    if (process.env.VERCEL !== '1') {
      process.exit(1);
    }
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  logger.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB error:', err);
});

export default connectDB;
