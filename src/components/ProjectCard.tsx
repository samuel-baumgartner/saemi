import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';

export default function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const label = project.type === 'hackathon' ? 'Hackathon' : project.tags?.some(tag => tag.label === 'ETH Project') ? 'ETH Project' : 'Personal Project';
  return (
    <button onClick={() => onOpen(project)} className="portfolio-project group" data-project-id={project.id}>
      {project.backgroundImage && <div className="portfolio-project-image" style={{ backgroundImage: `url('${project.backgroundImage}')` }} />}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-4 text-xs font-medium uppercase tracking-widest text-sky-300">
          <span>{label}</span><ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight text-white">{project.shortTitle}</h3>
        {project.metadata.place && <p className="mt-3 text-sm leading-6 text-slate-300">{project.metadata.place}</p>}
        {project.metadata.earnings && <p className="mt-2 text-sm text-slate-400">{project.metadata.earnings}</p>}
        <span className="mt-auto pt-6 text-sm text-slate-400">View project</span>
      </div>
    </button>
  );
}
