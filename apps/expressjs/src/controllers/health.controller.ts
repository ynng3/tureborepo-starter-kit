import type { Request, Response } from 'express';
import { getDatabaseHealth } from '@repo/database';

export async function getHealth(_req: Request, res: Response) {
  const health = await getDatabaseHealth();

  return res.json({
    app: 'Turborepo Starter Kit',
    status: health.ok ? 'ok' : 'error',
    database: health,
  });
}
