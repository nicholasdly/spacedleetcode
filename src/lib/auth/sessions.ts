import "server-only";

import { eq, lt } from "drizzle-orm";
import { cookies } from "next/headers";

import { db } from "@/db";
import { Session, User, sessions, users } from "@/db/schema";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";

/**
 * The duration of a user's session in milliseconds, by default 7 days.
 */
// NOTE: Should match the cookie age set in middleware.
export const sessionDuration = 1000 * 60 * 60 * 24 * 7;

/**
 * Generates and returns a new cryptographically secure session token.
 * @returns A session token.
 */
export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

/**
 * Creates a new session in the database.
 * @param token A session token.
 * @param userId The user's ID.
 * @returns The session object.
 */
export async function createSession(
  token: string,
  userId: string,
): Promise<Session> {
  const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const expiresAt = new Date(Date.now() + sessionDuration);

  const [session] = await db
    .insert(sessions)
    .values({ id, userId, expiresAt })
    .returning();

  return session!;
}

/**
 * Retrieves the session and user from the database using the current session
 * token. **This function returns sensitive data, and is not safe to use on
 * the frontend.**
 * @returns The session and user objects, or `null` if nonexistent.
 */
export async function getCurrentSession(): Promise<
  { session: Session; user: User } | { session: null; user: null }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return { session: null, user: null };

  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  return await db.transaction(async (tx) => {
    const [data] = await tx
      .select({
        user: users,
        session: sessions,
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(eq(sessions.id, sessionId))
      .limit(1);

    const user = data?.user;
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
}

/**
 * Deletes a specific session from the database.
 * @param sessionId The session's ID.
 */
export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

/**
 * Deletes all sessions from the database that belong to a specific user.
 * @param userId The user's ID.
 */
export async function invalidateAllSessions(userId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.userId, userId));
}

/**
 * Deletes all expired sessions from the database.
 */
export async function invalidateExpiredSessions() {
  await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
}

/**
 * Sets the session token cookie.
 * @param token The session token.
 * @param expiresAt The session token expiry date.
 */
export async function setSessionTokenCookie(
  token: string,
  expiresAt: Date,
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

/**
 * Deletes the session token cookie.
 */
export async function deleteSessionTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}
