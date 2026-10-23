import React from 'react';
import { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import ProvinciaShowcase from '@/components/ProvinciaShowcase';

interface ProjectsSectionProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export default function ProjectsSection({ projects, onOpenProject }: ProjectsSectionProps) {
  const provincia = projects.find(project => project.id === 'provincia');

  return (
    <section id="projects" className="portfolio-section">
      <div className="portfolio-container">
        <p className="portfolio-eyebrow">03 / Selected work</p>
        <h2>Projects</h2>

        {provincia && (
          <ProvinciaShowcase project={provincia} onOpen={onOpenProject} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 auto-rows-fr">
          {projects.filter(project => project.id !== 'provincia').map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={onOpenProject} />
          ))}
        </div>

      </div>
    </section>
  );
}

