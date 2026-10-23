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
  const ballProjects = projects.filter(project => ['remote-ball', 'ball-on-plate'].includes(project.id));
  const remainingProjects = projects.filter(project => !['provincia', 'remote-ball', 'ball-on-plate'].includes(project.id));

  return (
    <section id="projects" className="portfolio-section">
      <div className="portfolio-container">
        <p className="portfolio-eyebrow">03 / Selected work</p>
        <h2>Projects</h2>

        <div className="mb-6 sm:mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 auto-rows-fr">
          {ballProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={onOpenProject} />
          ))}
        </div>

        {provincia && (
          <ProvinciaShowcase project={provincia} onOpen={onOpenProject} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 auto-rows-fr">
          {remainingProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={onOpenProject} />
          ))}
        </div>

      </div>
    </section>
  );
}

