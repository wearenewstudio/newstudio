export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/privacy', '/terms', '/sitemap.xml'],
    },
    sitemap: `https://www.wearenew.studio/sitemap.xml`,
  }
}
