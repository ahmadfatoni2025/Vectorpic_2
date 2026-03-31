import { db, client } from "./index";
import { 
	users, vectors, categories, navbarItems, 
	imageStacks, videoProfiles, testimonials, 
	statistics, sponsors 
} from "./schema";

async function seed() {
	console.log("🌱 Seeding database...");

	// 1. Insert Categories (Using onConflictDoNothing to avoid unique constraint errors)
	const insertedCategories = await db.insert(categories).values([
		{ name: "3D Illustration", slug: "3d-illustration" },
		{ name: "Flat Vector", slug: "flat-vector" },
		{ name: "Minimalist", slug: "minimalist" },
		{ name: "Isometric", slug: "isometric" },
	]).onConflictDoNothing().returning();

    // If already exists, we might need to fetch them
    let finalCategories = insertedCategories;
    if (finalCategories.length === 0) {
        finalCategories = await db.select().from(categories);
    }

	// 2. Insert a User
	const [user] = await db.insert(users).values({
		name: "Admin User",
		email: "admin@vectorpic.com",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
	}).onConflictDoNothing().returning();

    const finalUser = user || (await db.select().from(users).limit(1))[0];

	// 3. Insert Vectors
	await db.insert(vectors).values([
		{
			title: "Abstract 3D Shape",
			description: "A beautiful abstract 3D shape for your landing page.",
			imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2070",
			thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=200",
			categoryId: finalCategories[0]?.id,
			authorId: finalUser?.id,
			isPremium: true,
			price: 15000,
			tags: ["3d", "abstract", "modern"],
		},
		{
			title: "Financial Flat UI",
			description: "Modern flat vector illustration for financial dashboard.",
			imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
			thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200",
			categoryId: finalCategories[1]?.id,
			authorId: finalUser?.id,
			isPremium: false,
			price: 0,
			tags: ["flat", "finance", "illustration"],
		},
	]).onConflictDoNothing();

	// 4. Insert Navbar Items
	const navbarMainItems = await db.insert(navbarItems).values([
        { name: "Showcase", href: "/showcase", type: "main", megaMenuType: "showcase", order: 1 },
        { name: "Management", href: "/management", type: "main", megaMenuType: "leadership", order: 2 },
        { name: "Home", href: "/", type: "main", order: 0 },
		{ name: "Community", href: "/community", type: "main", order: 3 },
		{ name: "About", href: "/about", type: "main", order: 4 },
    ]).onConflictDoNothing().returning();

    const showcaseTab = navbarMainItems.find(i => i.name === "Showcase") || (await db.select().from(navbarItems).where((t) => ({ name: t.name, eq: "Showcase" }) as any)).at(0);
    const managementTab = navbarMainItems.find(i => i.name === "Management") || (await db.select().from(navbarItems).where((t) => ({ name: t.name, eq: "Management" }) as any)).at(0);

	// 5. Image Stacks
	await db.insert(imageStacks).values([
		{ label: "Modern Vector Art", imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=400&q=70", order: 0 },
		{ label: "Brand Identity", imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=70", order: 1 },
		{ label: "Illustration", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&q=70", order: 2 },
		{ label: "Logo System", imageUrl: "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=400&q=70", order: 3 },
	]).onConflictDoNothing();

	// 6. Video Profiles
	await db.insert(videoProfiles).values([
		{
			tab: "Vector Illustration",
			highlight: "charming,",
			subtext: "clean, and modern.",
			quote: "Vectorpic made our landing page stand out with charming characters and a perfectly balanced color palette.",
			author: "Alex Rivera",
			role: "Product Manager @ TechFlow",
			image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
			videoId: "https://framerusercontent.com/assets/Kny5Ty8J6mn9PsM1TGpXsWNtNh4.mp4",
			bgColor: "bg-[#6366F1]",
			order: 0
		},
		{
			tab: "Brand Identity",
			highlight: "unique,",
			subtext: "bold, and iconic.",
			quote: "Their retro-modern aesthetic gave our brand a unique voice in a crowded market. Truly world-class design work.",
			author: "Sarah Jenkins",
			role: "Creative Director @ RetroWave",
			image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
			videoId: "29_u9_0Vv08",
			bgColor: "bg-[#8B5CF6]",
			order: 1
		}
	]).onConflictDoNothing();

	// 7. Testimonials
	await db.insert(testimonials).values([
		{
			content: "Vectorpic transformed our brand identity completely. The vector illustrations are top-notch and exactly what we needed for our scale-up.",
			author: "@sarah.design",
			avatar: "https://i.pravatar.cc/150?u=sarah",
			role: "Senior Designer",
			order: 0
		},
		{
			content: "The turnaround time is incredible. We usually get our complex illustrations back in less than 24 hours. A game changer.",
			author: "@marcus_v",
			avatar: "https://i.pravatar.cc/150?u=marcus",
			role: "Marketing Director",
			order: 1
		}
	]).onConflictDoNothing();

	// 8. Statistics
	await db.insert(statistics).values([
		{ label: "Design Projects", value: "2.5", suffix: "k+", order: 0 },
		{ label: "Happy Clients", value: "99", suffix: "%", order: 1 },
		{ label: "Years Experience", value: "10", suffix: "+", order: 2 },
	]).onConflictDoNothing();

	console.log("✅ Seeding completed!");
	process.exit(0);
}

seed().catch(err => {
	console.error("❌ Seeding failed:", err);
	process.exit(1);
});
