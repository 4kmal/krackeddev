import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Disable prefetch as it's not supported for prepared statements in Supabase connection pooler
// max: connection pool size (good for serverless)
// idle_timeout: close idle connections after 20s
// connect_timeout: fail fast if can't connect within 10s
const client = postgres(process.env.DATABASE_URL!, {
  prepare: false, // Required for Supabase connection pooler
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create and export Drizzle instance with schema
export const db = drizzle(client, { schema });

// Export schema for type inference elsewhere
export { schema };
