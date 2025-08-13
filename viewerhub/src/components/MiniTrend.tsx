"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Point = { date: string; messages: number };

export default function MiniTrend({
  data,
  height = 160,
}: {
  data: Point[];
  height?: number;
}) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="font-semibold mb-2">Messages / 14 jours</div>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} hide />
            <YAxis tick={{ fontSize: 10 }} hide />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="messages"
              stroke="#22d3ee"
              fill="url(#g1)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
