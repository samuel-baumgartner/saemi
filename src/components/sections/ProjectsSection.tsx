import React from 'react';
import { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';

interface ProjectsSectionProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export default function ProjectsSection({ projects, onOpenProject }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative min-h-[40vh] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 z-10">
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 auto-rows-fr">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={onOpenProject} />
          ))}
        </div>
      </div>
    </section>
  );
}

