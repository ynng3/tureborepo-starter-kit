import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@repo/database';
import { JWT_SECRET } from '../config/index.js';
import type { LoginUserInput, RegisterUserInput, UserRecord } from '../models/user.model.js';
import { serializeUser } from '../views/user.view.js';

export async function registerUserService(input: RegisterUserInput) {
  const { name, email, password } = input;

  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const normalizedEmail = String(email).toLowerCase();
  const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (existingUser) {
    throw new Error('User already exists.');
  }

  const passwordHash = await bcrypt.hash(String(password), 10);
  const user = await prisma.user.create({
    data: {
      name: name ? String(name) : null,
      email: normalizedEmail,
      password: passwordHash,
    },
  });

  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return {
    token,
    user: serializeUser(user as UserRecord),
  };
}

export async function loginUserService(input: LoginUserInput) {
  const { email, password } = input;

  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const user = await prisma.user.findUnique({
    where: { email: String(email).toLowerCase() },
  });

  if (!user) {
    throw new Error('Invalid credentials.');
  }

  const isValidPassword = await bcrypt.compare(String(password), user.password);

  if (!isValidPassword) {
    throw new Error('Invalid credentials.');
  }

  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return {
    token,
    user: serializeUser(user as UserRecord),
  };
}
