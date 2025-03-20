import Script from 'next/script';

export default function PageSeo({ type = 'Website', title, description, url, image }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description: description,
    url: `https://pavlobondarenko.net${url || ''}`,
    ...(image && { image: `https://pavlobondarenko.net${image}` }),
  };

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="afterInteractive"
    />
  );
} 