import postgres from "postgres";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL!;
console.log("Using URL:", connectionString ? "Found" : "Missing");
const sql = postgres(connectionString);

async function checkTables() {
  try {
    const result = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log("Tables in DB:", result.map(t => t.table_name));
    process.exit(0);
  } catch (error: any) {
    console.error("Error checking tables:", error);
    process.exit(1);
  }
}

checkTables();
