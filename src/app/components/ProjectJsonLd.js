import Script from 'next/script';

export default function ProjectJsonLd({ 
  title, 
  description, 
  url, 
  image,
  techStack = []
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description: description,
    url: `https://pavlobondarenko.net${url || ''}`,
    image: image ? `https://pavlobondarenko.net${image}` : undefined,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    author: {
      '@type': 'Person',
      name: 'Pavlo Bondarenko',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
    ...(techStack.length > 0 ? { keywords: techStack.join(', ') } : {})
  };

  return (
    <Script
      id="structured-data-project"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="afterInteractive"
    />
  );
} 