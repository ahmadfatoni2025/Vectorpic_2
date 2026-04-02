import { db } from './db';
import { sql } from 'drizzle-orm';

async function main() {
  try {
    await db.execute(sql`
      ALTER TABLE discussion_comments ADD COLUMN IF NOT EXISTS guest_session_id text;
      ALTER TABLE discussion_comments ADD COLUMN IF NOT EXISTS guest_name text;
      ALTER TABLE discussion_comments ALTER COLUMN author_id DROP NOT NULL;
      ALTER TABLE discussion_reactions ADD COLUMN IF NOT EXISTS guest_session_id text;
      ALTER TABLE discussion_reactions ALTER COLUMN user_id DROP NOT NULL;
    `);
    console.log("Migration applied successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

main();
