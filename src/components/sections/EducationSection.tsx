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
    <section id="education" className="relative min-h-[40vh] flex items-center justify-center px-4 py-6 z-10">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Education</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {educationItems.map((item) => (
            <SpotlightCard
              key={item.id}
              onClick={() => onOpenModal(item)}
              className="p-6 h-full flex flex-col gap-4 cursor-pointer"
              spotlightColor={spotlightColorMap[item.id] || "rgba(255, 255, 255, 0.15)"}
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700">
                {iconMap[item.id] || <GraduationCap className="text-white h-5 w-5" />}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-400">{item.subtitle}</p>
                {item.id === 'eth' && (
                  <p className="text-xs text-purple-300 font-medium mt-2">
                    ⭐ Top 5% of cohort (Average: 5.7)
                  </p>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

