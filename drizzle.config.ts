import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const tables = [
  "categories", "vectors", "users", "collections", "collection_items", 
  "navbar_items", "image_stacks", "video_profiles", "testimonials", 
  "sponsors", "contact_submissions", "statistics", "our_designs"
];

export default defineConfig({
	schema: "./db/schema.ts",
	out: "./db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
	tablesFilter: tables,
	schemaFilter: ["public"],
	verbose: true,
	strict: true,
});