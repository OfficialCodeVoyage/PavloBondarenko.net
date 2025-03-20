import { ArticleJsonLd } from 'next-seo';

export default function ArticleSeo({ title, description, publishedTime, modifiedTime, url, images = [], authorName = 'Pavlo Bondarenko' }) {
  return (
    <ArticleJsonLd
      useAppDir={true}
      url={`https://pavlobondarenko.net${url}`}
      title={title}
      images={images}
      datePublished={publishedTime}
      dateModified={modifiedTime || publishedTime}
      authorName={authorName}
      publisherName="Pavlo Bondarenko"
      publisherLogo="https://pavlobondarenko.net/favicon.ico"
      description={description}
      isAccessibleForFree={true}
    />
  );
} 