CREATE TABLE "track_tabs" (
	"id" serial PRIMARY KEY NOT NULL,
	"tab_id" text NOT NULL,
	"data" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "track_tabs_tab_id_unique" UNIQUE("tab_id")
);
