import { eq } from "drizzle-orm";

import { db } from "@/db";
import { seedUser } from "@/db/queries";
import { usersTable } from "@/db/schema";
import { verifyPassword } from "@/lib/auth/passwords";
import {
  createSession,
  generateSessionToken,
  getCurrentSession,
  invalidateExpiredSessions,
  setSessionTokenCookie,
} from "@/lib/auth/sessions";
import { loginFormSchema } from "@/lib/validation";

/**
 * Logs in a user, creating a new database session.
 * @param request The HTTP request.
 * @returns An HTTP response.
 */
export async function POST(request: Request): Promise<Response> {
  // TODO: Implement rate limiting

  const { session: currentSession } = await getCurrentSession();
  if (currentSession) return new Response(null, { status: 403 });

  const body = await request.json();
  const { success, data } = loginFormSchema.safeParse(body);
  if (!success) return new Response(null, { status: 400 });

  const { email, password } = data;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  // Avoid returning at early here to prevent malicious actors from easily
  // discovering genuine usernames via error message or response time.

  const isCorrectPassword = user
    ? await verifyPassword(user.passwordHash, password)
    : false;

  if (!user || !isCorrectPassword) {
    // TODO: Implement throttling on failed login attempts
    return new Response(null, { status: 401 });
  }

  await seedUser(user.id);

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);

  invalidateExpiredSessions();

  return new Response(null, { status: 200 });
}
