import { db } from "../db";
import { sql } from "drizzle-orm";
import fs from "fs";
import path from "path";

async function main() {
  const sqlFile = path.join(process.cwd(), "db/migrations/0005_polite_lethal_legion.sql");
  const query = fs.readFileSync(sqlFile, "utf-8");
  
  const statements = query.split("--> statement-breakpoint").map(s => s.trim()).filter(s => s.length > 0);
  
  for (const statement of statements) {
    try {
      await db.execute(sql.raw(statement));
      console.log("Executed successfully:", statement.substring(0, 50) + "...");
    } catch (e) {
      console.error("Error executing:", statement.substring(0, 50) + "...");
      console.error(e);
    }
  }
  
  console.log("Done.");
  process.exit(0);
}

main();
