import React from 'react';
import { EducationItem } from '@/types';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { GraduationCap, Shield, School } from 'lucide-react';

interface EducationSectionProps {
  educationItems: EducationItem[];
  onOpenModal: (item: EducationItem) => void;
}

const iconMap: Record<string, React.ReactElement> = {
  gymnasium: <GraduationCap className="text-white h-5 w-5" />,
  military: <Shield className="text-white h-5 w-5" />,
  eth: <School className="text-white h-5 w-5" />,
};

const spotlightColorMap: Record<string, string> = {
  gymnasium: "rgba(255, 255, 255, 0.15)",
  military: "rgba(59, 130, 246, 0.25)",
  eth: "rgba(168, 85, 247, 0.25)",
};

export default function EducationSection({
  educationItems,
  onOpenModal,
}: EducationSectionProps) {
  return (
    <section id="education" className="relative min-h-[40vh] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 z-10">
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">Education</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {educationItems.map((item) => (
            <SpotlightCard
              key={item.id}
              onClick={() => onOpenModal(item)}
              className="p-4 sm:p-6 h-full flex flex-col gap-3 sm:gap-4 cursor-pointer active:scale-95 transition-transform md:transition-none border-2 md:border border-neutral-700 md:border-neutral-800 hover:border-neutral-600 md:hover:border-neutral-700 relative group"
              spotlightColor={spotlightColorMap[item.id] || "rgba(255, 255, 255, 0.15)"}
            >
              {/* Mobile tap indicator */}
              <div className="absolute top-2 right-2 md:hidden opacity-60 group-active:opacity-100 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700">
                {iconMap[item.id] || <GraduationCap className="text-white h-5 w-5" />}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400">{item.subtitle}</p>
                {item.id === 'eth' && (
                  <p className="text-xs text-purple-300 font-medium mt-2">
                    ⭐ Top 5% of cohort (Average: 5.7)
                  </p>
                )}
              </div>
              {/* Mobile tap hint text */}
              <p className="text-xs text-neutral-500 mt-auto pt-2 md:hidden">
                Tap to view details
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

