/** @type {import('next').NextConfig} */
const GAMES_ORIGIN = "https://ralf-game.vercel.app";

const nextConfig = {
  output: "standalone",
  async headers() {
    return ["/personal/:path*", "/info/:path*", "/widget-preview/:path*", "/api/:path*"].map(source => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
    }));
  },
  async redirects() {
    return [
      {
        source: "/live-parkour-duel.html",
        destination: "/games/live-parkour-duel.html",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/games", destination: `${GAMES_ORIGIN}/index.html` },
      { source: "/games/:path*", destination: `${GAMES_ORIGIN}/:path*` },
    ];
  },
};

export default nextConfig;

