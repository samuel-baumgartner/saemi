import type { Metadata } from 'next';

export const site = {
  url: 'https://www.samuelbaumgartner.ch',
  name: 'Samuel Baumgartner',
  title: 'Samuel Baumgartner | Electrical Engineering & Robotics',
  description: 'Samuel Baumgartner, electrical engineering student at ETH Zürich. Explore projects in robotics, control systems, embedded software, AI, and game development.',
  profiles: [
    'https://github.com/samuel-baumgartner',
    'https://www.linkedin.com/in/samuel-baumgartner-441a1a24b/',
  ],
};

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

export function pageMetadata({ title, description, path, projectId }: {
  title: string;
  description: string;
  path: string;
  projectId?: string;
}): Metadata {
  const image = absoluteUrl(projectId ? `/social-image?project=${encodeURIComponent(projectId)}` : '/social-image');
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: site.name,
      url: absoluteUrl(path),
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: image, alt: title }],
    },
  };
}

export const privateMetadata: Metadata = {
  robots: { index: false, follow: false, noarchive: true },
};
