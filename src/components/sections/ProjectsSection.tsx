import React from 'react';
import { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';

interface ProjectsSectionProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export default function ProjectsSection({ projects, onOpenProject }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative min-h-[40vh] flex items-center justify-center px-4 py-6 z-10">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={onOpenProject} />
          ))}
        </div>
      </div>
    </section>
  );
}

