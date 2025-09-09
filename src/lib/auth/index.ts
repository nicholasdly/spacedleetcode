import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { cache } from "react";

import { db } from "@/db";
import { sessionsTable, usersTable } from "@/db/schema";
import { Session, User } from "@/db/types";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";

import { sessionDuration } from "./sessions";

type SanitizedUser = Omit<User, "passwordHash"> & { __brand: "SanitizedUser" };

/**
 * Retrieves the session and sanitized user from the database using the
 * current session token. This function is cached by React.
 * @returns The session and user objects, or `null` if nonexistent.
 */
export const auth = cache(
  async (): Promise<
    { session: Session; user: SanitizedUser } | { session: null; user: null }
  > => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) return { session: null, user: null };

    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    );

    return await db.transaction(async (tx) => {
      const [data] = await tx
        .select({
          user: {
            id: usersTable.id,
            email: usersTable.email,
            createdAt: usersTable.createdAt,
          },
          session: sessionsTable,
        })
        .from(sessionsTable)
        .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
        .where(eq(sessionsTable.id, sessionId))
        .limit(1);

      const user = data?.user as SanitizedUser;
      const session = data?.session;

      if (!user || !session) return { session: null, user: null };

      // Deletes session if expired.
      if (Date.now() >= session.expiresAt.getTime()) {
        await tx.delete(sessionsTable).where(eq(sessionsTable.id, session.id));
        return { session: null, user: null };
      }

      // Extends the session expiration when it's near expiration (half of life).
      if (Date.now() >= session.expiresAt.getTime() - sessionDuration / 2) {
        session.expiresAt = new Date(Date.now() + sessionDuration);
        await tx
          .update(sessionsTable)
          .set({ expiresAt: session.expiresAt })
          .where(eq(sessionsTable.id, session.id));
      }

      return { session, user };
    });
  },
);
