import type { MetadataRoute } from 'next';
import { projectSummaries } from '@/data/projectSummaries';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/') },
    ...Object.values(projectSummaries).map(project => ({ url: absoluteUrl(`/projects/${project.id}`) })),
  ];
}
