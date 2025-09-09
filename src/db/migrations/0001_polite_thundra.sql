CREATE TYPE "public"."difficulty_enum" AS ENUM('Easy', 'Medium', 'Hard');--> statement-breakpoint
CREATE TYPE "public"."rating_enum" AS ENUM('again', 'hard', 'good', 'easy');--> statement-breakpoint
CREATE TYPE "public"."topic_enum" AS ENUM('Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Stack', 'Binary Search', 'Linked List', 'Trees', 'Graphs', 'Advanced Graphs', '1-D Dynamic Programming', '2-D Dynamic Programming', 'Greedy', 'Intervals', 'Math & Geometry', 'Bit Manipulation');--> statement-breakpoint
CREATE TABLE "attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"study_id" uuid NOT NULL,
	"rating" "rating_enum" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "problems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"url" text NOT NULL,
	"solution" text,
	"difficulty" "difficulty_enum" NOT NULL,
	"topic" "topic_enum" NOT NULL,
	CONSTRAINT "problems_title_unique" UNIQUE("title"),
	CONSTRAINT "problems_url_unique" UNIQUE("url"),
	CONSTRAINT "problems_solution_unique" UNIQUE("solution")
);
--> statement-breakpoint
CREATE TABLE "studies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"problem_id" uuid NOT NULL,
	"interval" real DEFAULT 1 NOT NULL,
	"ease" real DEFAULT 2.2 NOT NULL,
	"due_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_study_id_studies_id_fk" FOREIGN KEY ("study_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "studies" ADD CONSTRAINT "studies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "studies" ADD CONSTRAINT "studies_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE cascade ON UPDATE cascade;