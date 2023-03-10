/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["health.gov", "tecdn.b-cdn.net"],
  },
};

module.exports = nextConfig;
