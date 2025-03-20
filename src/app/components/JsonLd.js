import Script from 'next/script';

export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pavlo Bondarenko',
    url: 'https://pavlobondarenko.net',
    jobTitle: 'Full-Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: '',
    },
    image: 'https://pavlobondarenko.net/images/about_me_profile_pic.png',
    sameAs: [
      'https://github.com/pavlo-bondarchuk',
      'https://www.linkedin.com/in/pavlo-bondarenko/',
    ],
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'Frontend Development',
      'Backend Development',
    ],
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="afterInteractive"
    />
  );
} 