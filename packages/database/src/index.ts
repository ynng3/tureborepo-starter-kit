import { PrismaClient } from '@prisma/client';

export * from '@prisma/client';

export const prisma = new PrismaClient();

export type PrismaHealthResult = {
  ok: boolean;
  error?: string;
};

export async function getDatabaseHealth(): Promise<PrismaHealthResult> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown database error',
    };
  }
}
