/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gorest.co.in'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable Server-Side Rendering for better SEO
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://gorest.co.in/public/v2',
  },
}

module.exports = nextConfig