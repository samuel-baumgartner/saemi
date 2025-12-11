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
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-4 sm:space-y-6 text-white text-base sm:text-lg leading-relaxed">
              {personalInfo.about.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center relative z-20 mb-6 md:mb-0">
            <div
              className="relative w-full max-w-[280px] sm:max-w-sm aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-700 flex items-center justify-center"
              onMouseEnter={() => setIsPortraitHovered(true)}
              onMouseLeave={() => setIsPortraitHovered(false)}
            >
              <img
                src="/Portrait.png"
                alt={personalInfo.name}
                className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 ease-out"
                style={{
                  transform: isPortraitHovered ? 'scale(1.15)' : 'scale(1.05)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

