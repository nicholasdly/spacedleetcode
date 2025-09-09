import { eq } from "drizzle-orm";

import { db } from "@/db";
import { seedUser } from "@/db/queries";
import { usersTable } from "@/db/schema";
import { hashPassword } from "@/lib/auth/passwords";
import {
  createSession,
  generateSessionToken,
  getCurrentSession,
  setSessionTokenCookie,
} from "@/lib/auth/sessions";
import { registerFormSchema } from "@/lib/validation";

/**
 * Creates a new user and logs them in.
 * @param request The HTTP request.
 * @returns An HTTP response.
 */
export async function POST(request: Request): Promise<Response> {
  // TODO: Implement rate limiting

  const { session: currentSession } = await getCurrentSession();
  if (currentSession) return new Response(null, { status: 403 });

  const body = await request.json();
  const { success, data } = registerFormSchema.safeParse(body);
  if (!success) return new Response(null, { status: 400 });

  const { email, password } = data;

  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existingUser?.email === email) return new Response(null, { status: 409 });

  const passwordHash = await hashPassword(password);

  const user = await db.transaction(async (tx) => {
    const [user] = await tx
      .insert(usersTable)
      .values({ email, passwordHash })
      .returning();

    return user!;
  });

  // TODO: Implement email verification

  await seedUser(user.id);

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);

  return new Response(null, { status: 200 });
}
