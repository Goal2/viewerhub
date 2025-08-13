import { NextRequest } from "next/server";

type Item = { name: string; value: number };
type Lb = { topChatters: Item[]; topDonors: Item[]; topSubs: Item[] };

export const runtime = "edge";

const MOCK_LB: Lb = {
  topChatters: [
    { name: "alpha", value: 1243 },
    { name: "beta", value: 996 },
    { name: "gamma", value: 842 },
    { name: "delta", value: 701 },
    { name: "epona", value: 560 },
    { name: "mika", value: 420 },
  ],
  topDonors: [
    { name: "superfan", value: 180 },
    { name: "natsu", value: 120 },
    { name: "sora", value: 95 },
  ],
  topSubs: [
    { name: "neo", value: 36 },
    { name: "jin", value: 20 },
    { name: "ayan", value: 14 },
  ],
};

export async function GET(_req: NextRequest) {
  return Response.json(MOCK_LB);
}
