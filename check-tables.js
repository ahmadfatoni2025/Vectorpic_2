const postgres = require('postgres');
require('dotenv').config();

const client = postgres(process.env.DATABASE_URL, { prepare: false });

async function main() {
  try {
    const res = await client`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    console.log("Tables found:", res.map(t => t.table_name));
  } catch (e) {
    console.error("Error:", e);
  } finally {
    process.exit(0);
  }
}

main();
