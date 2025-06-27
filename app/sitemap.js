import { fetchAPI } from '../lib'

const BASE_URL = 'https://www.wearenew.studio'

export default async function sitemap() {
  const now = new Date().toISOString()

  // 1. static routes
  const staticPaths = [
    { path: '/', changeFrequency: 'daily', priority: 1.0 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/work', changeFrequency: 'daily', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.5 },
  ]

  const pages = staticPaths.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  // 2. dynamic /work/[slug] (from /projects)
  const projectsRes = await fetchAPI('/projects', {
    fields: ['slug'],
    pagination: { pageSize: 100 },
  })
  if (projectsRes?.data) {
    projectsRes.data.forEach((item) => {
      const slug = item.attributes.slug
      pages.push({
        url: `${BASE_URL}/work/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })
  }

  return pages
}
