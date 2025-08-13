import { NextRequest } from "next/server";

export const runtime = "edge";

function makeDaily() {
  return Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const date = d.toISOString().slice(0, 10);
    return { date, messages: Math.floor(20 + Math.random() * 120) };
    });
}

export async function GET(_req: NextRequest) {
  return Response.json({ daily: makeDaily() });
}
