"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import PrettyLeaderboard from "@/components/PrettyLeaderboard";

type Item = { name: string; value: number; avatar?: string };
type Lb = { topChatters: Item[]; topDonors: Item[]; topSubs: Item[] };

const fetcher = (u: string) => fetch(u).then((r) => r.json());

const MOCK_LB: Lb = {
  topChatters: [
    { name: "poneytv", value: 12931 },
    { name: "alice__", value: 11002 },
    { name: "bobinator", value: 9988 },
  ],
  topDonors: [
    { name: "kind_whale", value: 420.5 },
    { name: "alice__", value: 180 },
  ],
  topSubs: [
    { name: "poneytv", value: 28 },
    { name: "luna", value: 21 },
  ],
};

function SideDecor() {
  return (
    <>
      <div className="pointer-events-none fixed inset-y-0 left-0 w-[22vw] bg-gradient-to-r from-[#7c3aed20] via-transparent to-transparent blur-2xl" />
      <div className="pointer-events-none fixed inset-y-0 right-0 w-[22vw] bg-gradient-to-l from-[#06b6d420] via-transparent to-transparent blur-2xl" />
    </>
  );
}

export default function LeaderboardsPage() {
  const { data, isLoading } = useSWR<Lb>("/api/leaderboards?mock=1", fetcher, {
    refreshInterval: 20000,
  });
  const { data: me } = useSWR("/api/stats/me?mock=1", fetcher);

  const lb = data ?? MOCK_LB;

  // ---- Bouton RETOUR (dans cette page directement) ----
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanGoBack(window.history.length > 1);
    }
  }, []);
  const goBack = () => {
    if (canGoBack) router.back();
    else router.push("/me");
  };
  // -----------------------------------------------------

  return (
    <main className="relative space-y-6 px-6">
      <SideDecor />

      <div className="flex items-end justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* BOUTON RETOUR */}
          <button
            onClick={goBack}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)]"
            aria-label="Retour"
          >
            <svg
              className="h-4 w-4 -ml-0.5 shrink-0 opacity-80 group-hover:opacity-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M15 18l-6-6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Retour</span>
          </button>

          <div>
            <h1 className="text-2xl font-bold">Classements</h1>
            <p className="text-white/70 text-sm">
              Messages, dons et mois de sub — mis à jour régulièrement.
            </p>
          </div>
        </div>
      </div>

      {isLoading && !data ? (
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-white/70">
          Chargement…
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <PrettyLeaderboard
            title="Top Chatters"
            subtitle="sur 30 jours"
            unit="msgs"
            accent="#9146ff"
            items={lb.topChatters}
          />
          <PrettyLeaderboard
            title="Top Dons (Tips)"
            unit="€"
            accent="#22d3ee"
            items={lb.topDonors}
          />
          <PrettyLeaderboard
            title="Top Subs (mois cumulés)"
            unit="mois"
            accent="#a78bfa"
            items={lb.topSubs}
          />
        </div>
      )}

      {/* Footer utile : rang perso + filtres + CTA */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <div className="text-white/80">
          Ton rang actuel :{" "}
          <span className="font-semibold">
            {me ? `#${me.rank} / ${me.totalViewers}` : "—"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
            7 jours
          </button>
          <button className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
            30 jours
          </button>
          <button className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
            All-time
          </button>
          <a
            href="?top=100"
            className="ml-2 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20"
          >
            Voir le Top 100
          </a>
        </div>
      </div>
    </main>
  );
}
