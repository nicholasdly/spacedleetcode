import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { attemptsTable, studiesTable } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth/sessions";
import {
  calculateDueDate,
  calculateNewEase,
  calculateNewInterval,
} from "@/lib/repetition";
import { attemptSchema } from "@/lib/validation";

/**
 * Saves a new study attempt and applies the spaced repetition algorithm.
 * @param request The HTTP request.
 * @returns An HTTP response.
 */
export async function POST(request: Request): Promise<Response> {
  const { user } = await getCurrentSession();
  if (!user) return new Response(null, { status: 401 });

  const body = await request.json();
  const { success, data } = attemptSchema.safeParse(body);
  if (!success) return new Response(null, { status: 400 });

  const { studyId, rating } = data;

  return await db.transaction(async (tx) => {
    const [study] = await tx
      .select()
      .from(studiesTable)
      .where(
        and(eq(studiesTable.id, studyId), eq(studiesTable.userId, user.id)),
      )
      .limit(1);

    if (!study) return new Response(null, { status: 404 });

    const ease = calculateNewEase(study.ease, rating);
    const interval = calculateNewInterval(study.interval, study.ease, rating);
    const dueAt = calculateDueDate(interval);

    await tx
      .update(studiesTable)
      .set({ ease, interval, dueAt })
      .where(and(eq(studiesTable.id, study.id)));

    await tx
      .insert(attemptsTable)
      .values({ userId: user.id, studyId: study.id, rating });

    return new Response(null, { status: 200 });
  });
}
