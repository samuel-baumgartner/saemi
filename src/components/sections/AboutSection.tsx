import React, { useState } from 'react';
import { PersonalInfo } from '@/types';

interface AboutSectionProps {
  personalInfo: PersonalInfo;
}

export default function AboutSection({ personalInfo }: AboutSectionProps) {
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);

  return (
    <section id="about" className="relative min-h-[40vh] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 z-10">
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">About</h2>
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-4 sm:space-y-6 text-white text-base sm:text-lg leading-relaxed">
              {personalInfo.about.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center relative z-20 mb-6 md:mb-0">
            <div
              className="relative w-full max-w-[220px] sm:max-w-[240px] aspect-square rounded-lg overflow-hidden cursor-pointer bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-800/20 backdrop-blur-sm border border-white/10 shadow-xl"
              onMouseEnter={() => setIsPortraitHovered(true)}
              onMouseLeave={() => setIsPortraitHovered(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-indigo-500/30"></div>
              <img
                src="/Portrait.png"
                alt={personalInfo.name}
                className="relative w-full h-full object-cover transition-transform duration-500 ease-out"
                style={{
                  transform: isPortraitHovered ? 'scale(1.1)' : 'scale(1)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

