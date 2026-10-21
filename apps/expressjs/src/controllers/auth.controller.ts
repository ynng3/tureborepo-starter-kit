import type { Request, Response } from 'express';
import {
  loginUserService,
  registerUserService,
} from '../services/auth.service.js';

export async function registerUser(req: Request, res: Response) {
  try {
    const result = await registerUserService(req.body ?? {});
    return res.status(201).json({
      message: 'User registered successfully.',
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const status = message === 'User already exists.' ? 409 : message.includes('required') ? 400 : 500;

    return res.status(status).json({
      message: status === 500 ? 'User registration failed.' : message,
      error: status === 500 ? (error instanceof Error ? error.message : 'Unknown error') : undefined,
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const result = await loginUserService(req.body ?? {});
    return res.json({
      message: 'Login successful.',
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const status = message === 'Invalid credentials.' ? 401 : message.includes('required') ? 400 : 500;

    return res.status(status).json({
      message: status === 500 ? 'Login failed.' : message,
      error: status === 500 ? (error instanceof Error ? error.message : 'Unknown error') : undefined,
    });
  }
}
