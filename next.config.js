/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Vercel deployment için gerekli konfigürasyonlar
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
