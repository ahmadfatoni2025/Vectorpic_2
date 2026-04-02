import { sql } from 'drizzle-orm';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function main() {
  console.log("Running migration manually...");
  
  const query = fs.readFileSync(path.join(__dirname, 'migrations', '0006_ordinary_falcon.sql'), 'utf-8');
  
  try {
    await client.unsafe(query);
    console.log("Migration successful!");
  } catch(e: any) {
    console.error("Migration failed:", e);
  } finally {
    await client.end();
  }
}

main();
