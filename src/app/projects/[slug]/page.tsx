import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectDetails from '@/components/ProjectDetails';
import StructuredData from '@/components/StructuredData';
import { getProjectSummary, projectSummaries } from '@/data/projectSummaries';
import { absoluteUrl, pageMetadata, site } from '@/lib/seo';

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(projectSummaries).map(project => ({ slug: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectSummary((await params).slug);
  if (!project) notFound();

  return pageMetadata({
    title: project.shortTitle,
    description: project.description,
    path: `/projects/${project.id}`,
    projectId: project.id,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectSummary((await params).slug);
  if (!project) notFound();
  const url = absoluteUrl(`/projects/${project.id}`);

  return (
    <main className="portfolio min-h-screen bg-[#0b1018] px-6 py-8 sm:py-12">
      <a href="#project-content" className="portfolio-skip-link">Skip to project details</a>
      <article className="portfolio-container">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-slate-400">
          <ol className="flex flex-wrap items-center gap-3">
            <li><Link href="/" className="hover:text-white">{site.name}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/#projects" className="hover:text-white">Projects</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-sky-200">{project.shortTitle}</li>
          </ol>
        </nav>
        <header className="mb-10 max-w-4xl">
          <p className="portfolio-eyebrow">Selected work / Project case study</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">{project.title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">{project.description}</p>
        </header>
        <div id="project-content" className="scroll-mt-6">
          <ProjectDetails projectId={project.id} />
        </div>
        <aside aria-labelledby="more-projects-title" className="mt-16 border-t border-white/10 pt-8">
          <h2 id="more-projects-title" className="mb-5 text-2xl font-medium text-white">More projects</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-4 text-sky-200">
            {Object.values(projectSummaries).filter(item => item.id !== project.id).map(item => (
              <li key={item.id}><Link href={`/projects/${item.id}`} prefetch={false} className="underline-offset-4 hover:underline">{item.shortTitle}</Link></li>
            ))}
          </ul>
          <Link href="/#contact" className="portfolio-button mt-8">Contact Samuel</Link>
        </aside>
      </article>
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${url}#webpage`,
            url,
            name: project.title,
            description: project.description,
            inLanguage: 'en',
            isPartOf: { '@id': absoluteUrl('/#website') },
            mainEntity: { '@id': `${url}#project` },
            breadcrumb: { '@id': `${url}#breadcrumb` },
          },
          {
            '@type': 'CreativeWork',
            '@id': `${url}#project`,
            url,
            name: project.title,
            description: project.description,
            image: absoluteUrl(project.backgroundImage),
            author: { '@type': 'Person', '@id': absoluteUrl('/#person'), name: site.name, url: absoluteUrl('/') },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: site.name, item: absoluteUrl('/') },
              { '@type': 'ListItem', position: 2, name: project.shortTitle, item: url },
            ],
          },
        ],
      }} />
    </main>
  );
}
