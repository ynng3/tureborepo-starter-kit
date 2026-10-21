import type { Request, Response } from 'express';
import { getUsers as listUsers } from '../services/user.service.js';

export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await listUsers();

    return res.json({
      data: users,
      count: users.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch users.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
