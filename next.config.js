// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const csp = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://embed.twitch.tv;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https://static-cdn.jtvnw.net;
      frame-src https://player.twitch.tv https://clips.twitch.tv;
      connect-src 'self' wss://irc-ws.chat.twitch.tv;
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
