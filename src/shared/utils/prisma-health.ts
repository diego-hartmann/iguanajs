import { getPrisma } from '../../../store/prisma-client';

export async function assertDatabaseConnection(): Promise<void> {
  try {
    await getPrisma().$queryRaw`SELECT 1`;
  } catch (err) {
    console.error('❌ Database connection failed');
    throw err;
  }
}
