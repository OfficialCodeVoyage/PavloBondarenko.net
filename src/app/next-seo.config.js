// This file contains the default SEO configuration for next-seo
// The DefaultSeo component will use these settings as a base

export default {
  titleTemplate: '%s | Pavlo Bondarenko',
  defaultTitle: 'Pavlo Bondarenko - Full-Stack Developer',
  description: 'Personal website of Pavlo Bondarenko - Full-stack developer & tech enthusiast. Explore my projects, skills, and professional journey.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pavlobondarenko.net',
    siteName: 'Pavlo Bondarenko',
    images: [
      {
        url: 'https://pavlobondarenko.net/api/og',
        width: 1200,
        height: 630,
        alt: 'Pavlo Bondarenko',
      },
    ],
  },
  twitter: {
    handle: '@pavlobondarenko',
    site: '@pavlobondarenko',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
}; 