import { asc, desc, eq, getTableColumns, sql } from "drizzle-orm";

import { db } from ".";
import {
  collectionProblemsTable,
  collectionsTable,
  problemsTable,
  studiesTable,
} from "./schema";

export const getStudyProblemCollections = db
  .select({
    study: getTableColumns(studiesTable),
    problem: getTableColumns(problemsTable),
    collection: getTableColumns(collectionsTable),
  })
  .from(studiesTable)
  .innerJoin(problemsTable, eq(problemsTable.id, studiesTable.problemId))
  .innerJoin(
    collectionProblemsTable,
    eq(collectionProblemsTable.problemId, problemsTable.id),
  )
  .innerJoin(
    collectionsTable,
    eq(collectionsTable.id, collectionProblemsTable.collectionId),
  )
  .where(eq(studiesTable.userId, sql.placeholder("userId")))
  .orderBy(
    asc(studiesTable.dueAt),
    desc(studiesTable.ease),
    asc(problemsTable.difficulty),
    asc(problemsTable.topic),
  )
  .prepare("get_study_problem_collections");
