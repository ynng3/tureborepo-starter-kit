import express from 'express';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import healthRoutes from './routes/health.routes.js';
import { BASE_API_URL } from './config/index.js';

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get('/', (_req, res) => {
    res.json({
      app: 'Turborepo Starter Kit',
      api: BASE_API_URL,
    });
  });

  app.use(`${BASE_API_URL}/health`, healthRoutes);
  app.use(`${BASE_API_URL}/users`, userRoutes);
  app.use(`${BASE_API_URL}/auth`, authRoutes);

  return app;
}
