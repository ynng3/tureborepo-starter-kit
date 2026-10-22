import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { prisma } from '@repo/database';
import { JWT_SECRET } from '../config';

type UserPayload = {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AuthService {
  async registerUser(input: Record<string, unknown>) {
    const { name, email, password } = input;

    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const normalizedEmail = String(email).toLowerCase();
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

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
      user: this.serializeUser(user),
    };
  }

  async loginUser(input: Record<string, unknown>) {
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
      user: this.serializeUser(user),
    };
  }

  private serializeUser(user: {
    id: string;
    name: string | null;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }): UserPayload {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
