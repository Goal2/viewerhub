"use client";

type Props = {
  channel: string;
  playerHeight?: number;
  chatHeight?: number;
  className?: string;
};

export default function LiveDock({
  channel,
  playerHeight = 220,
  chatHeight = 320,
  className = "",
}: Props) {
  const playerSrc = `https://player.twitch.tv/?channel=${encodeURIComponent(
    channel
  )}&parent=${typeof window !== "undefined" ? window.location.hostname : "localhost"}&muted=true`;
  const chatSrc = `https://www.twitch.tv/embed/${encodeURIComponent(
    channel
  )}/chat?parent=${typeof window !== "undefined" ? window.location.hostname : "localhost"}`;

  return (
    <div className={`rounded-2xl overflow-hidden border border-white/10 bg-white/5 ${className}`}>
      <div className="grid md:grid-cols-2">
        <iframe
          title="Twitch player"
          src={playerSrc}
          height={playerHeight}
          className="w-full"
          allowFullScreen
        />
        <iframe
          title="Twitch chat"
          src={chatSrc}
          height={playerHeight}
          className="w-full"
        />
      </div>
      <div className="md:hidden">
        <iframe
          title="Twitch chat mobile"
          src={chatSrc}
          height={chatHeight}
          className="w-full"
        />
      </div>
    </div>
  );
}
