/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  generateBuildId: async () => {
    // Стабильный build ID для Vercel
    return 'jarvis-build'
  }
}

module.exports = nextConfig
