import { InferEnum, InferSelectModel } from "drizzle-orm";

import {
  attemptsTable,
  difficultyEnum,
  problemsTable,
  ratingEnum,
  sessionsTable,
  studiesTable,
  topicEnum,
  usersTable,
} from "./schema";

export type Difficulty = InferEnum<typeof difficultyEnum>;
export type Topic = InferEnum<typeof topicEnum>;
export type Rating = InferEnum<typeof ratingEnum>;

export type User = InferSelectModel<typeof usersTable>;
export type Session = InferSelectModel<typeof sessionsTable>;
export type Problem = InferSelectModel<typeof problemsTable>;
export type Study = InferSelectModel<typeof studiesTable>;
export type Attempt = InferSelectModel<typeof attemptsTable>;
