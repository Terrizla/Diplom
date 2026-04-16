import { Router } from 'express';
import authRoutes from './routes/auth.routes';
import profileRoutes from './routes/profiles.routes';
import catalogRoutes from './routes/catalog.routes';

export const apiRouter = Router();

// Define API Domain Routes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/profiles', profileRoutes);
apiRouter.use('/catalog', catalogRoutes);

// Health check endpoint
apiRouter.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});
