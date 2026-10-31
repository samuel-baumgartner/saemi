'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { projects } from '@/data/projects';
import type { ProjectId } from '@/data/projectSummaries';

const EducationModal = dynamic(() => import('@/components/EducationModal'));

export default function ProjectDetails({ projectId }: { projectId: ProjectId }) {
  const project = projects.find(item => item.id === projectId);
  const [galleryOpen, setGalleryOpen] = useState(false);
  if (!project) return null;

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <button className="portfolio-button portfolio-button-primary" onClick={() => setGalleryOpen(true)}>Explore images & interactive demos</button>
        {project.tags.map(tag => <span key={tag.label} className="rounded-full border border-white/15 px-3 py-2 text-xs text-sky-200">{tag.label}</span>)}
      </div>
      <div className="portfolio-modal portfolio-modal-prose">{project.content}</div>
      {galleryOpen && <EducationModal
        isOpen
        onClose={() => setGalleryOpen(false)}
        title={project.title}
        description={project.description}
        carouselItems={project.carouselItems}
        headerContent={project.headerContent}
      />}
    </>
  );
}
