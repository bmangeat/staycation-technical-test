import { z } from 'zod';
import { formatZodError } from '@/lib/zod';

const envSchema = z.object({
HOST: z.string().min(1).default('127.0.0.1'),
  PORT: z.coerce.number().int().min(1).max(65_535).default(3000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DB_USER: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_PASSWORD: z.string().min(12),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().min(1).max(65_535).default(3000),
});

export interface Env {
  nodeEnv: 'development' | 'test' | 'production';
  host: string;
  port: number;
  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbPassword: string;
  dbName: string;
}

export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    throw new Error(`Invalid environment variables: ${formatZodError(result.error)}`);
  }
  const env = result.data;
  return {
    nodeEnv: env.NODE_ENV,
    host: env.HOST,
    port: env.PORT,
    dbPassword: env.DB_PASSWORD,
    dbUser: env.DB_USER,
    dbPort: env.DB_PORT,
    dbHost: env.DB_HOST,
    dbName: env.DB_NAME,
  };
}