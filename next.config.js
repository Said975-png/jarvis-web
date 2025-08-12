/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    allowedDevOrigins: ['5f19439f155d402d95337f316c869491-0eb7b56765844170ba3f40b87.fly.dev']
  }
}

module.exports = nextConfig
