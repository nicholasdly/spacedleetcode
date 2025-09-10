import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

import { db } from "@/db";
import { problemsTable, studiesTable, usersTable } from "@/db/schema";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

async function handleUserCreate(userId: string) {
  await db.transaction(async (tx) => {
    const problemsPromise = tx.select().from(problemsTable);
    const userPromise = tx
      .insert(usersTable)
      .values({ id: userId })
      .returning();

    const [problems, [user]] = await Promise.all([
      problemsPromise,
      userPromise,
    ]);

    if (!user) throw new Error("Failed to create new user.");
    if (problems.length <= 0) return;

    await tx
      .insert(studiesTable)
      .values(
        problems.map((problem) => ({
          userId: user!.id,
          problemId: problem.id,
        })),
      )
      .onConflictDoNothing();
  });
}

async function handleUserDelete(userId?: string) {
  if (!userId) return;

  await db.delete(usersTable).where(eq(usersTable.id, userId));
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const event = await verifyWebhook(request);

    console.log(`Received "${event.type}" webhook with ID: ${event.data.id}`);

    if (event.type === "user.created") {
      await handleUserCreate(event.data.id);
    }

    if (event.type === "user.deleted") {
      await handleUserDelete(event.data.id);
    }

    return new Response(null, { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response(null, { status: 400 });
  }
}
