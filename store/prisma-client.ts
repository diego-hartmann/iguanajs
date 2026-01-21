import { configDotenv } from 'dotenv';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/prisma/client';
import { ENV } from '../src/config/env';

declare global {
  // eslint-disable-next-line no-var
  var __prismaClient: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  configDotenv();
  const url = ENV.POSTGRES_URL;
  if (!url) throw new Error('Missing POSTGRES_URL');

  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({ adapter });
}

export function getPrisma(): PrismaClient {
  if (!globalThis.__prismaClient) globalThis.__prismaClient = createPrismaClient();
  return globalThis.__prismaClient;
}

export async function connectPrisma(): Promise<void> {
  const prisma = getPrisma();
  await prisma.$connect();
  // opcional:
  // await prisma.$queryRaw`SELECT 1`;
}

export async function disconnectPrisma(): Promise<void> {
  const prisma = globalThis.__prismaClient;
  if (!prisma) return;

  await prisma.$disconnect();
  globalThis.__prismaClient = undefined;
}
