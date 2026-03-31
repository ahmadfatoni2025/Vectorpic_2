CREATE TABLE "contact_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"subject" text,
	"message" text NOT NULL,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "image_stacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"image_url" text NOT NULL,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "navbar_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"href" text NOT NULL,
	"icon" text,
	"sub" text,
	"parent_id" uuid,
	"order" integer DEFAULT 0,
	"type" text DEFAULT 'main',
	"mega_menu_type" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sponsors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text NOT NULL,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "statistics" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL,
	"suffix" text,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"author" text NOT NULL,
	"avatar" text NOT NULL,
	"role" text NOT NULL,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "video_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"tab" text NOT NULL,
	"highlight" text NOT NULL,
	"subtext" text NOT NULL,
	"quote" text NOT NULL,
	"author" text NOT NULL,
	"role" text NOT NULL,
	"image" text NOT NULL,
	"video_id" text NOT NULL,
	"bg_color" text NOT NULL,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "navbar_items" ADD CONSTRAINT "navbar_items_parent_id_navbar_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."navbar_items"("id") ON DELETE no action ON UPDATE no action;