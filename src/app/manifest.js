export default function manifest() {
  return {
    name: 'Pavlo Bondarenko - Full-Stack Developer',
    short_name: 'Pavlo Bondarenko',
    description: 'Personal website of Pavlo Bondarenko - Full-stack developer & tech enthusiast.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#111111',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
} 