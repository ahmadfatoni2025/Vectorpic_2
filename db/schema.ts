import { pgTable, serial, text, timestamp, uuid, integer, boolean, AnyPgColumn } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
	id: serial("id").primaryKey(),
	name: text("name").notNull().unique(),
	slug: text("slug").notNull().unique(),
	description: text("description"),
	icon: text("icon"), // Nama icon Lucide
});

export const vectors = pgTable("vectors", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: text("title").notNull(),
	description: text("description"),
	imageUrl: text("image_url").notNull(),
	thumbnailUrl: text("thumbnail_url"),
	categoryId: integer("category_id").references(() => categories.id),
	authorId: uuid("author_id").references(() => users.id),
	price: integer("price").default(0), // If premium
	isPremium: boolean("is_premium").default(false),
	tags: text("tags").array(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
	vectors: many(vectors),
	collections: many(collections),
	discussions: many(discussions),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
	vectors: many(vectors),
}));

export const vectorsRelations = relations(vectors, ({ one }) => ({
	category: one(categories, {
		fields: [vectors.categoryId],
		references: [categories.id],
	}),
	author: one(users, {
		fields: [vectors.authorId],
		references: [users.id],
	}),
}));

export const collections = pgTable("collections", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	userId: uuid("user_id").references(() => users.id),
	isPublic: boolean("is_public").default(true),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const collectionItems = pgTable("collection_items", {
	id: serial("id").primaryKey(),
	collectionId: uuid("collection_id").references(() => collections.id),
	vectorId: uuid("vector_id").references(() => vectors.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collectionsRelations = relations(collections, ({ one, many }) => ({
	user: one(users, {
		fields: [collections.userId],
		references: [users.id],
	}),
	items: many(collectionItems),
}));

export const collectionItemsRelations = relations(collectionItems, ({ one }) => ({
	collection: one(collections, {
		fields: [collectionItems.collectionId],
		references: [collections.id],
	}),
	vector: one(vectors, {
		fields: [collectionItems.vectorId],
		references: [vectors.id],
	}),
}));

export const navbarItems = pgTable("navbar_items", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	href: text("href").notNull(),
	icon: text("icon"), // Nama icon (misal: 'Palette', 'Zap')
	sub: text("sub"),
	parentId: uuid("parent_id").references((): AnyPgColumn => navbarItems.id),
	order: integer("order").default(0),
	type: text("type").default("main"), // 'main', 'dropdown-item', 'discover-link'
	megaMenuType: text("mega_menu_type"), // 'showcase' | 'leadership' | 'community'
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const imageStacks = pgTable("image_stacks", {
	id: serial("id").primaryKey(),
	label: text("label").notNull(),
	imageUrl: text("image_url").notNull(),
	order: integer("order").default(0),
});

export const videoProfiles = pgTable("video_profiles", {
	id: serial("id").primaryKey(),
	tab: text("tab").notNull(),
	highlight: text("highlight").notNull(),
	subtext: text("subtext").notNull(),
	quote: text("quote").notNull(),
	author: text("author").notNull(),
	role: text("role").notNull(),
	image: text("image").notNull(),
	videoId: text("video_id").notNull(),
	bgColor: text("bg_color").notNull(),
	order: integer("order").default(0),
});

export const testimonials = pgTable("testimonials", {
	id: serial("id").primaryKey(),
	content: text("content").notNull(),
	author: text("author").notNull(),
	avatar: text("avatar").notNull(),
	role: text("role").notNull(),
	order: integer("order").default(0),
});

export const sponsors = pgTable("sponsors", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	logo: text("logo").notNull(),
	order: integer("order").default(0),
});

export const contactSubmissions = pgTable("contact_submissions", {
	id: serial("id").primaryKey(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	email: text("email").notNull(),
	phone: text("phone"),
	subject: text("subject"),
	message: text("message").notNull(),
	status: text("status").default("pending"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const statistics = pgTable("statistics", {
	id: serial("id").primaryKey(),
	label: text("label").notNull(),
	value: text("value").notNull(),
	suffix: text("suffix"),
	order: integer("order").default(0),
});

export const ourDesigns = pgTable("our_designs", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description"),
	youtubeUrl: text("youtube_url").notNull(),
	tag: text("tag").default("Design"),
	order: integer("order").default(0),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const discussions = pgTable("discussions", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	category: text("category").notNull(), // 'ON BOARDING', 'FEEDBACK', etc.
	visibility: text("visibility").default("Public"), // 'Public', 'Followers Only', 'Private'
	authorId: uuid("author_id").references(() => users.id),
	likesCount: integer("likes_count").default(0),
	commentsCount: integer("comments_count").default(0),
	viewsCount: integer("views_count").default(0),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const discussionImages = pgTable("discussion_images", {
	id: serial("id").primaryKey(),
	discussionId: uuid("discussion_id").references(() => discussions.id),
	imageUrl: text("image_url").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const discussionComments = pgTable("discussion_comments", {
	id: serial("id").primaryKey(),
	discussionId: uuid("discussion_id").references(() => discussions.id).notNull(),
	authorId: uuid("author_id").references(() => users.id),
	guestSessionId: text("guest_session_id"),
	guestName: text("guest_name"),
	content: text("content").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const discussionReactions = pgTable("discussion_reactions", {
	id: serial("id").primaryKey(),
	discussionId: uuid("discussion_id").references(() => discussions.id).notNull(),
	userId: uuid("user_id").references(() => users.id),
	guestSessionId: text("guest_session_id"),
	reactionType: text("reaction_type").notNull(), // 'like', 'love', 'laugh', 'sad', etc.
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const commentLikes = pgTable("comment_likes", {
	id: serial("id").primaryKey(),
	commentId: integer("comment_id").references(() => discussionComments.id).notNull(),
	guestSessionId: text("guest_session_id"),
	userId: uuid("user_id").references(() => users.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations for discussions
export const discussionsRelations = relations(discussions, ({ one, many }) => ({
	author: one(users, {
		fields: [discussions.authorId],
		references: [users.id],
	}),
	images: many(discussionImages),
	comments: many(discussionComments),
	reactions: many(discussionReactions),
}));

export const discussionImagesRelations = relations(discussionImages, ({ one }) => ({
	discussion: one(discussions, {
		fields: [discussionImages.discussionId],
		references: [discussions.id],
	}),
}));

export const discussionCommentsRelations = relations(discussionComments, ({ one, many }) => ({
	discussion: one(discussions, {
		fields: [discussionComments.discussionId],
		references: [discussions.id],
	}),
	author: one(users, {
		fields: [discussionComments.authorId],
		references: [users.id],
	}),
	likes: many(commentLikes),
}));

export const discussionReactionsRelations = relations(discussionReactions, ({ one }) => ({
	discussion: one(discussions, {
		fields: [discussionReactions.discussionId],
		references: [discussions.id],
	}),
	user: one(users, {
		fields: [discussionReactions.userId],
		references: [users.id],
	}),
}));

export const commentLikesRelations = relations(commentLikes, ({ one }) => ({
	comment: one(discussionComments, {
		fields: [commentLikes.commentId],
		references: [discussionComments.id],
	}),
	user: one(users, {
		fields: [commentLikes.userId],
		references: [users.id],
	}),
}));

export const trackTabs = pgTable("track_tabs", {
	id: serial("id").primaryKey(),
	tabId: text("tab_id").notNull().unique(),
	data: text("data").notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
