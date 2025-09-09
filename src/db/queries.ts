import {
  InferInsertModel,
  and,
  asc,
  desc,
  eq,
  getTableColumns,
  isNull,
  sql,
} from "drizzle-orm";

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

export async function seedUser(userId: string) {
  await db.transaction(async (tx) => {
    const problems = await tx
      .select({ ...getTableColumns(problemsTable) })
      .from(problemsTable)
      .leftJoin(
        studiesTable,
        and(
          eq(studiesTable.problemId, problemsTable.id),
          eq(studiesTable.userId, userId),
        ),
      )
      .where(isNull(studiesTable.id));

    if (problems.length <= 0) return;

    const studies: InferInsertModel<typeof studiesTable>[] = problems.map(
      (problem) => ({
        userId,
        problemId: problem.id,
      }),
    );

    await tx.insert(studiesTable).values(studies);
  });
}
