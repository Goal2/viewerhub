// src/app/api/admin/save-broadcaster-token/route.ts
import { auth } from "@/auth";   // <-- ON PREND auth depuis src/auth.ts
import { kv } from "@/lib/kv";

export async function POST() {
  // v5 : on appelle simplement auth() (PLUS besoin d'importer getServerSession)
  const session = await auth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const s = session as any;
  if (s.provider !== "twitch-creator") {
    return new Response(JSON.stringify({ error: "Use twitch-creator provider" }), { status: 400 });
  }

  const key = `broadcaster:${s.twitch_user_id}`;
  await kv.set(key, {
    access_token: s.access_token,
    refresh_token: s.refresh_token ?? null,
    saved_at: Date.now(),
  });

  return Response.json({ ok: true });
}
