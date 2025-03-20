import Script from 'next/script';

export default function BlogPostSeo({ 
  title, 
  description, 
  url, 
  image, 
  publishedDate, 
  modifiedDate, 
  authorName = 'Pavlo Bondarenko'
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    url: `https://pavlobondarenko.net${url || ''}`,
    image: image ? `https://pavlobondarenko.net${image}` : undefined,
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Person',
      name: 'Pavlo Bondarenko',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pavlobondarenko.net/favicon.ico',
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://pavlobondarenko.net${url || ''}`,
    }
  };

  return (
    <Script
      id="structured-data-blog-post"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="afterInteractive"
    />
  );
} 