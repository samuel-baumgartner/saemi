import React from 'react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const bgStyle = project.backgroundImage
    ? {
        backgroundImage: `url('${project.backgroundImage}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  // Improved styling with gradients and better visual appeal
  const bgClass = project.type === 'hackathon' 
    ? project.backgroundImage
      ? 'h-full min-h-[200px] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer text-left relative overflow-hidden bg-cover bg-center flex flex-col border border-gray-200/60 shadow-xl'
      : 'h-full min-h-[200px] bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer text-left relative overflow-hidden flex flex-col border border-gray-200/60 shadow-lg'
    : project.backgroundImage
      ? 'h-full min-h-[200px] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer text-left w-full relative overflow-hidden bg-cover bg-center flex flex-col border border-gray-200/60 shadow-xl'
      : 'h-full min-h-[200px] bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer text-left w-full relative flex flex-col border border-gray-200/60 shadow-xl';

  // Determine tag label and color
  const ethProjectTag = project.tags?.find(tag => tag.label === 'ETH Project');
  const tagLabel = project.type === 'hackathon' 
    ? 'Hackathon' 
    : ethProjectTag 
      ? 'ETH Project' 
      : 'Personal Project';
  
  const tagColor = project.type === 'hackathon' 
    ? 'bg-blue-100 text-blue-800'
    : ethProjectTag
      ? 'bg-purple-100 text-purple-800'
      : 'bg-green-100 text-green-800';

  return (
    <button 
      onClick={() => onOpen(project)} 
      className={`${bgClass} transition-all duration-500`}
      style={bgStyle}
      data-project-id={project.id}
    >
      {project.backgroundImage && (
        <div className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors"></div>
      )}
      <span className={`absolute top-4 right-4 text-xs ${tagColor} px-3 py-1.5 rounded-full font-semibold z-10 shadow-md backdrop-blur-sm`}>
        {tagLabel}
      </span>
      <div className={`relative z-10 flex-1 flex flex-col justify-center ${project.backgroundImage ? '' : ''}`}>
        <h3 className={`text-2xl md:text-3xl font-bold mb-3 pr-20 ${project.backgroundImage ? 'text-white drop-shadow-lg' : project.type === 'hackathon' ? 'text-gray-900' : 'text-white'}`}>
          {project.shortTitle}
        </h3>
        {project.metadata.place && (
          <p className={`${project.backgroundImage ? 'text-white/90 drop-shadow-md' : project.type === 'hackathon' ? 'text-gray-700' : 'text-gray-300'} mb-2 text-sm md:text-base`}>
            {project.metadata.place}
          </p>
        )}
        {project.metadata.earnings && (
          <p className={`${project.backgroundImage ? 'text-white font-semibold drop-shadow-md' : project.type === 'hackathon' ? 'text-gray-800 font-semibold' : 'text-gray-200'} text-sm md:text-base mt-1`}>
            💰 {project.metadata.earnings}
          </p>
        )}
      </div>
    </button>
  );
}

