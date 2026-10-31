'use client';

import ProjectGallery from '@/components/ProjectGallery';
import { projects } from '@/data/projects';
import type { ProjectId } from '@/data/projectSummaries';

export default function ProjectDetails({ projectId }: { projectId: ProjectId }) {
  const project = projects.find(item => item.id === projectId);
  if (!project) return null;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-3" aria-label="Project topics">
        {project.tags.map(tag => <span key={tag.label} className="rounded-full border border-white/15 px-3 py-2 text-xs text-sky-200">{tag.label}</span>)}
      </div>
      <ProjectGallery project={project} />
      <div className="portfolio-modal portfolio-modal-prose">{project.content}</div>
    </>
  );
}
