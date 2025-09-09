ALTER TYPE "public"."topic_enum" ADD VALUE 'Heap / Priority Queue' BEFORE 'Graphs';--> statement-breakpoint
ALTER TYPE "public"."topic_enum" ADD VALUE 'Backtracking' BEFORE 'Graphs';--> statement-breakpoint
ALTER TYPE "public"."topic_enum" ADD VALUE 'Tries' BEFORE 'Graphs';--> statement-breakpoint
CREATE TABLE "collection_problems" (
	"collection_id" uuid NOT NULL,
	"problem_id" uuid NOT NULL,
	CONSTRAINT "collection_problems_collection_id_problem_id_pk" PRIMARY KEY("collection_id","problem_id")
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "collections_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "collection_problems" ADD CONSTRAINT "collection_problems_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "collection_problems" ADD CONSTRAINT "collection_problems_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "studies" ADD CONSTRAINT "studies_userId_problemId_unique" UNIQUE("user_id","problem_id");