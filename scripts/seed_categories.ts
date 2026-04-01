import { db } from "../db";
import { categories } from "../db/schema";

const categorySeeds = [
  { name: 'Vector Art', slug: 'vector-art', icon: 'Palette', description: 'Premium vector illustrations' },
  { name: 'Motion', slug: 'motion', icon: 'Play', description: 'Engaging animation' },
  { name: 'Branding', slug: 'branding', icon: 'Zap', description: 'Modern visual identity' },
  { name: 'Packaging', slug: 'packaging', icon: 'Box', description: 'Luxury product packaging' },
  { name: 'UI/UX Design', slug: 'ui-ux-design', icon: 'Smartphone', description: 'Digital experience design' },
  { name: 'Illustration', slug: 'illustration', icon: 'PenTool', description: 'Bespoke digital artwork' }
];

async function main() {
  console.log("Seeding categories...");
  for (const seed of categorySeeds) {
    try {
      await db.insert(categories).values(seed).onConflictDoNothing();
      console.log(`Success: ${seed.name}`);
    } catch (e) {
      console.log(`Failed: ${seed.name}`, e);
    }
  }
  process.exit(0);
}

main();
