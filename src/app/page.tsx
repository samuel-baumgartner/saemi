import Portfolio from '@/components/Portfolio';
import StructuredData from '@/components/StructuredData';
import { absoluteUrl, pageMetadata, site } from '@/lib/seo';

export const metadata = {
  ...pageMetadata({ title: site.title, description: site.description, path: '/' }),
  title: { absolute: site.title },
};

export default function Home() {
  return (
    <>
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': absoluteUrl('/#website'),
            url: absoluteUrl('/'),
            name: site.name,
            inLanguage: 'en',
          },
          {
            '@type': 'ProfilePage',
            '@id': absoluteUrl('/#profile'),
            url: absoluteUrl('/'),
            name: site.title,
            description: site.description,
            isPartOf: { '@id': absoluteUrl('/#website') },
            mainEntity: { '@id': absoluteUrl('/#person') },
          },
          {
            '@type': 'Person',
            '@id': absoluteUrl('/#person'),
            name: site.name,
            url: absoluteUrl('/'),
            image: absoluteUrl('/Portrait.png'),
            description: site.description,
            affiliation: { '@type': 'CollegeOrUniversity', name: 'ETH Zürich', url: 'https://ethz.ch/' },
            knowsAbout: ['Electrical engineering', 'Robotics', 'Control systems', 'Embedded systems', 'Software development'],
            sameAs: site.profiles,
          },
        ],
      }} />
      <Portfolio />
    </>
  );
}
