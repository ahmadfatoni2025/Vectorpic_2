import { client } from "../db";

async function main() {
  console.log("Adding columns to categories table...");
  try {
    await client`ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "description" text;`;
    await client`ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "icon" text;`;
    console.log("Success!");
  } catch (error) {
    console.error("Error adding columns:", error);
  } finally {
    process.exit(0);
  }
}

main();
