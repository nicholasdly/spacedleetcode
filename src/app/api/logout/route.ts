import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateExpiredSessions,
  invalidateSession,
} from "@/lib/auth/sessions";

/**
 * Logs out a user, invalidating their session and expired sessions.
 * @param request The HTTP request.
 * @returns An HTTP response.
 */
export async function DELETE(): Promise<Response> {
  const { session } = await getCurrentSession();
  if (!session) return new Response(null, { status: 401 });

  await Promise.all([
    invalidateSession(session.id),
    deleteSessionTokenCookie(),
  ]);

  invalidateExpiredSessions();

  return new Response(null, { status: 200 });
}
