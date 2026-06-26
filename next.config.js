/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['openai'],
  },
  async redirects() {
    return [
      { source: '/employees', destination: '/agents', permanent: true },
      { source: '/employee/:id', destination: '/agent/:id', permanent: true },
      { source: '/jobs', destination: '/agents', permanent: true },
      { source: '/creators', destination: '/agents', permanent: true },
      { source: '/submit', destination: '/agents', permanent: true },
      { source: '/post-job', destination: '/agents', permanent: true },
      { source: '/employers', destination: '/agents', permanent: true },
      { source: '/post-ai-employee', destination: '/agents', permanent: true },
    ]
  },
}

module.exports = nextConfig
