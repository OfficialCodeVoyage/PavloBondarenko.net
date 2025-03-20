export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/credentials/admin'],
    },
    sitemap: 'https://pavlobondarenko.net/sitemap.xml',
  }
} 