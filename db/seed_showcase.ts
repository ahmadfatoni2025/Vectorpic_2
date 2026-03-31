import { db } from ".";
import { vectors, categories } from "./schema";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("Seeding database...");

  // 1. Ensure a default category exists
  let mainCategory = await db.query.categories.findFirst({
    where: eq(categories.slug, 'showcase')
  });

  if (!mainCategory) {
    const [inserted] = await db.insert(categories).values({
      name: 'Showcase',
      slug: 'showcase'
    }).returning();
    mainCategory = inserted;
  }

  // 2. Add some sample vectors if table is empty
  const existingVectors = await db.query.vectors.findMany();

  if (existingVectors.length === 0) {
    await db.insert(vectors).values([
      {
        title: "Abstract Geometric Flow",
        description: "A high-quality minimalist abstract geometric pattern with professional aesthetics.",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        categoryId: mainCategory.id,
        isPremium: false
      },
      {
        title: "Modern UI Kit Elements",
        description: "Comprehensive UI components for modern web and mobile applications.",
        imageUrl: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2680&auto=format&fit=crop",
        categoryId: mainCategory.id,
        isPremium: true,
        price: 49000
      },
      {
        title: "Nature Silhouette Vector",
        description: "Elegant nature silhouettes including trees and mountain peaks.",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop",
        categoryId: mainCategory.id,
        isPremium: false
      }
    ]);
    console.log("Sample vectors seeded.");
  } else {
    console.log("Database already has vectors, skipping seed.");
  }

  process.exit(0);
}

seed().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
