import { Pool } from 'pg';
import { loadEnv } from './config/env';

const env = loadEnv();
const pool = new Pool({
  user: env.dbUser,
  host: env.dbHost,
  database: env.dbName,
  password: env.dbPassword,
  port: env.dbPort,
});

export default pool;
