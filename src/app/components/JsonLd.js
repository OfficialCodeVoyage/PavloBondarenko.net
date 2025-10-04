import Script from 'next/script';

export default function JsonLd() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Pavlo Bondarenko',
      url: 'https://pavlobondarenko.net',
      jobTitle: 'Associate Product Manager',
      worksFor: {
        '@type': 'Organization',
        name: 'Xe.com',
        url: 'https://www.xe.com',
      },
      image: 'https://pavlobondarenko.net/images/about_me_profile_pic.png',
      sameAs: [
        'https://github.com/OfficialCodeVoyage',
        'https://www.linkedin.com/in/mrbondarenko/',
        'https://www.instagram.com/pasha.369.bond/',
        'https://www.youtube.com/@OfficialCodeVoyage',
      ],
      knowsAbout: [
        'Product Management',
        'Web Development',
        'Cloud Computing',
        'Azure',
        'AWS',
        'Python',
        'React',
        'Next.js',
        'JavaScript',
        'TypeScript',
        'Frontend Development',
        'Backend Development',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Pavlo Bondarenko Portfolio',
      url: 'https://pavlobondarenko.net',
      description: 'Personal portfolio and project showcase of Pavlo Bondarenko - Associate Product Manager at Xe.com',
      author: {
        '@type': 'Person',
        name: 'Pavlo Bondarenko',
      },
      inLanguage: 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Pavlo Bondarenko',
        url: 'https://pavlobondarenko.net',
      },
    },
  ];

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="afterInteractive"
    />
  );
} 