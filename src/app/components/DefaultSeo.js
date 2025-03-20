import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

export default function DefaultSeo() {
  return (
    <NextDefaultSeo
      useAppDir={true}
      {...SEO}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
        {
          rel: 'canonical',
          href: 'https://pavlobondarenko.net',
        },
      ]}
    />
  );
} 