import { asc, desc, eq, getTableColumns } from "drizzle-orm";

import { db } from ".";
import { problemsTable, studiesTable } from "./schema";

export async function getStudyProblems(userId: string) {
  const data = await db
    .select({
      problem: getTableColumns(problemsTable),
      study: getTableColumns(studiesTable),
    })
    .from(studiesTable)
    .innerJoin(problemsTable, eq(studiesTable.problemId, problemsTable.id))
    .where(eq(studiesTable.userId, userId))
    .orderBy(
      asc(studiesTable.dueAt),
      desc(studiesTable.ease),
      asc(problemsTable.difficulty),
    );

  return data;
}
