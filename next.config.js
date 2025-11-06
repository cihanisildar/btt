/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel deployment için gerekli konfigürasyonlar
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
