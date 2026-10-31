import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';

export default function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const label = project.type === 'hackathon' ? 'Hackathon' : project.tags?.some(tag => tag.label === 'ETH Project') ? 'ETH Project' : 'Personal Project';
  return (
    <article className="portfolio-project group" data-project-id={project.id}>
      <Link href={`/projects/${project.id}`} prefetch={false} className="flex flex-1 flex-col text-left">
        {project.backgroundImage && (
          <div className="portfolio-project-image relative">
            <Image src={project.backgroundImage} alt={`${project.shortTitle} project preview`} fill sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1128px) 50vw, 528px" className="object-cover" />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-4 text-xs font-medium uppercase tracking-widest text-sky-300">
            <span>{label}</span><ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-white">{project.shortTitle}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{project.description}</p>
          {project.metadata.place && <p className="mt-3 text-sm leading-6 text-slate-300">{project.metadata.place}</p>}
          {project.metadata.earnings && <p className="mt-2 text-sm text-slate-400">{project.metadata.earnings}</p>}
          <span className="mt-auto pt-6 text-sm text-sky-200">Read case study <span aria-hidden="true">↗</span></span>
        </div>
      </Link>
      <button onClick={() => onOpen(project)} className="border-t border-white/10 px-6 py-4 text-left text-sm text-slate-400 hover:text-white sm:px-7" aria-label={`Quick preview: ${project.shortTitle}`}>Quick preview</button>
    </article>
  );
}
