/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.scorebat.com",
      "crests.football-data.org",
      "upload.wikimedia.org",
    ],
  },
};

module.exports = nextConfig;
