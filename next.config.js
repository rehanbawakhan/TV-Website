/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  allowedDevOrigins: [
    'http://192.168.56.1',
  ],
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  async rewrites() {
    // Map common icon/OG paths to the existing logo to avoid 404s in dev
    const toLogo = '/images/Logo.png'
    return [
      { source: '/favicon.ico', destination: toLogo },
      { source: '/favicon-16x16.png', destination: toLogo },
      { source: '/favicon-32x32.png', destination: toLogo },
      { source: '/apple-touch-icon.png', destination: toLogo },
      { source: '/android-chrome-192x192.png', destination: toLogo },
      { source: '/android-chrome-512x512.png', destination: toLogo },
      { source: '/og-image.jpg', destination: toLogo },
    ]
  },
}

module.exports = nextConfig