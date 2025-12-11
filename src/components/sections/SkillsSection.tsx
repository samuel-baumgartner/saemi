"use client";

import React, { useState } from 'react';
import { Skill } from '@/data/skills';

interface SkillsSectionProps {
  skills: Skill[];
}

// Color mapping for icons
const iconColors: Record<string, string> = {
  embedded: "#16a34a", // green-600
  programming: "#2563eb", // blue-600
  "ml-ai": "#9333ea", // purple-600
  scientific: "#ea580c", // orange-600
  "3d-modeling": "#db2777", // pink-600
  control: "#dc2626", // red-600
  systems: "#ca8a04", // yellow-600
  devops: "#0891b2", // cyan-600
  documentation: "#4f46e5", // indigo-600
  fabrication: "#0d9488", // teal-600
};

// Icon components for each skill category
const SkillIcon = ({ skillId, color }: { skillId: string; color: string }) => {
  const iconSize = 40;
  const iconColor = iconColors[skillId] || iconColors.programming;
  
  const icons: Record<string, React.ReactElement> = {
    embedded: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" style={{ color: iconColor }}>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
        <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
        <path d="M8 12h8M8 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    programming: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" style={{ color: iconColor }}>
        <path d="M8 3L4 7l4 4M16 21l4-4-4-4M14 3l-4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    "ml-ai": (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" style={{ color: iconColor }}>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
      </svg>
    ),
    scientific: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" style={{ color: iconColor }}>
        <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
    "3d-modeling": (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" style={{ color: iconColor }}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
    control: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" style={{ color: iconColor }}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 4v4M12 16v4M4 12h4M16 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),
    systems: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" style={{ color: iconColor }}>
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M3 10h18M8 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="7" cy="15" r="1" fill="currentColor"/>
        <circle cx="12" cy="15" r="1" fill="currentColor"/>
        <circle cx="17" cy="15" r="1" fill="currentColor"/>
      </svg>
    ),
    devops: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" style={{ color: iconColor }}>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M9 9h6v6H9z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M3 9h6M15 9h6M9 3v6M9 15v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
    documentation: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" style={{ color: iconColor }}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    fabrication: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" style={{ color: iconColor }}>
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M3 10h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
  };

  return icons[skillId] || icons.programming;
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleCardClick = (skillId: string) => {
    setExpandedCard(expandedCard === skillId ? null : skillId);
  };

  return (
    <section id="skills" className="relative min-h-[40vh] flex items-center justify-center px-4 py-6 z-10">
      <div className="max-w-7xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Skills</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill) => {
            const isExpanded = expandedCard === skill.id;
            
            return (
              <div
                key={skill.id}
                onClick={() => handleCardClick(skill.id)}
                className={`
                  bg-white rounded-lg p-4 shadow-lg 
                  hover:shadow-xl transition-all duration-300 
                  flex flex-col items-center text-center cursor-pointer
                  transform hover:scale-105 hover:-translate-y-1
                  border-2 border-transparent hover:border-gray-200
                  relative group
                  ${isExpanded ? 'shadow-xl scale-105 border-gray-300' : ''}
                `}
              >
                <div className="mb-3 flex items-center justify-center relative">
                  <div className={`transition-transform duration-300 ${isExpanded ? 'scale-110' : 'group-hover:scale-110'}`}>
                    <SkillIcon skillId={skill.id} color={skill.iconColor} />
                  </div>
                  {!isExpanded && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                        <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                
                <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base leading-tight group-hover:text-gray-700 transition-colors">
                  {skill.category}
                </h3>
                
                <div className="w-full mb-3">
                  <p className="text-gray-600 text-xs md:text-sm font-medium">
                    {skill.tools}
                  </p>
                </div>
                
                <div
                  className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isExpanded ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}
                  `}
                >
                  <p className="text-gray-500 text-xs leading-relaxed text-left">
                    {skill.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
