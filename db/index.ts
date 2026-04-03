import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

if (!connectionString && process.env.NODE_ENV === "production") {
  console.warn("DATABASE_URL is not defined. Database connectivity may fail.");
}

// Disable prefetch as it is not supported for "Transaction" pool mode if using Supabase
// Added ssl: 'require' for better compatibility with Supabase/Vercel
export const client = postgres(connectionString, { 
  prepare: false,
  ssl: 'require'
});

export const db = drizzle(client, { schema });
