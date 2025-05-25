const nextConfig = {
  experimental: {
    optimizeCss: true,
    urlImports: ['https://cdn.skypack.dev', 'https://unpkg.com'],
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.PROTOCOL,
        hostname: process.env.STRAPI_HOSTNAME,
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
