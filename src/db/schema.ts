import { pgEnum, pgTable, primaryKey, unique } from "drizzle-orm/pg-core";

import { UTCDate } from "@date-fns/utc";

export const difficultyEnum = pgEnum("difficulty_enum", [
  "Easy",
  "Medium",
  "Hard",
]);

export const topicEnum = pgEnum("topic_enum", [
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Binary Search",
  "Linked List",
  "Trees",
  "Heap / Priority Queue",
  "Backtracking",
  "Tries",
  "Graphs",
  "Advanced Graphs",
  "1-D Dynamic Programming",
  "2-D Dynamic Programming",
  "Greedy",
  "Intervals",
  "Math & Geometry",
  "Bit Manipulation",
]);

export const ratingEnum = pgEnum("rating_enum", [
  "again",
  "hard",
  "good",
  "easy",
]);

export const usersTable = pgTable("users", (t) => ({
  id: t.text().primaryKey(),
  createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),
}));

export const collectionsTable = pgTable("collections", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  name: t.text().notNull().unique(),
  description: t.text().notNull(),
}));

export const problemsTable = pgTable("problems", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  title: t.text().notNull().unique(),
  description: t.text().notNull(),
  url: t.text().notNull().unique(),
  solution: t.text().unique(),
  difficulty: difficultyEnum().notNull(),
  topic: topicEnum().notNull(),
}));

export const collectionProblemsTable = pgTable(
  "collection_problems",
  (t) => ({
    collectionId: t
      .uuid()
      .notNull()
      .references(() => collectionsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    problemId: t
      .uuid()
      .notNull()
      .references(() => problemsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  }),
  (t) => [primaryKey({ columns: [t.collectionId, t.problemId] })],
);

export const studiesTable = pgTable(
  "studies",
  (t) => ({
    id: t.uuid().primaryKey().defaultRandom(),
    userId: t
      .text()
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    problemId: t
      .uuid()
      .notNull()
      .references(() => problemsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    interval: t.real().notNull().default(1),
    ease: t.real().notNull().default(2.2),
    dueAt: t
      .timestamp({ withTimezone: true })
      .notNull()
      .default(new UTCDate(0)),
    updatedAt: t
      .timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new UTCDate()),
    createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),
  }),
  (t) => [unique().on(t.userId, t.problemId)],
);

export const attemptsTable = pgTable("attempts", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  userId: t
    .text()
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  studyId: t
    .uuid()
    .notNull()
    .references(() => studiesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  rating: ratingEnum().notNull(),
  createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),
}));
