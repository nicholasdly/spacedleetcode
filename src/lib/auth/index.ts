import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { cache } from "react";

import { db } from "@/db";
import { Session, User, sessions, users } from "@/db/schema";
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
            id: users.id,
            email: users.email,
            createdAt: users.createdAt,
          },
          session: sessions,
        })
        .from(sessions)
        .innerJoin(users, eq(sessions.userId, users.id))
        .where(eq(sessions.id, sessionId))
        .limit(1);

      const user = data?.user as SanitizedUser;
      const session = data?.session;

      if (!user || !session) return { session: null, user: null };

      // Deletes session if expired.
      if (Date.now() >= session.expiresAt.getTime()) {
        await tx.delete(sessions).where(eq(sessions.id, session.id));
        return { session: null, user: null };
      }

      // Extends the session expiration when it's near expiration (half of life).
      if (Date.now() >= session.expiresAt.getTime() - sessionDuration / 2) {
        session.expiresAt = new Date(Date.now() + sessionDuration);
        await tx
          .update(sessions)
          .set({ expiresAt: session.expiresAt })
          .where(eq(sessions.id, session.id));
      }

      return { session, user };
    });
  },
);
