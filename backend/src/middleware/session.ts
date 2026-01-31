import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { UserSession } from '../models';
import logger from '../utils/logger';

// Extend Express Request to include session
declare global {
  namespace Express {
    interface Request {
      sessionId: string;
      userSession?: InstanceType<typeof UserSession>;
    }
  }
}

export const sessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get session ID from header or create new one
    let sessionId = req.headers['x-session-id'] as string;

    if (!sessionId) {
      sessionId = uuidv4();
      res.setHeader('X-Session-Id', sessionId);
    }

    req.sessionId = sessionId;

    // Try to find or create user session
    let userSession = await UserSession.findOne({ sessionId });
    
    if (!userSession) {
      userSession = await UserSession.create({
        sessionId,
        lastActiveDate: new Date(),
      });
      logger.info(`New session created: ${sessionId}`);
    } else {
      // Update last active date
      userSession.lastActiveDate = new Date();
      await userSession.save();
    }

    req.userSession = userSession;
    next();
  } catch (error) {
    logger.error('Session middleware error:', error);
    next(error);
  }
};
