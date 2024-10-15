import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { schemas } from 'src/schemas';
import env from 'src/services/env';

const { DATABASE_URL } = env;

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
});

export const database = drizzle(pool, {
  logger: true,
  schema: schemas,
});
