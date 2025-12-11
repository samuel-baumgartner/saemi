import React from 'react';
import { EducationItem } from '@/types';

interface EducationSectionProps {
  educationItems: EducationItem[];
  onOpenModal: (item: EducationItem) => void;
}

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
            <button
              key={item.id}
              onClick={() => onOpenModal(item)}
              className={`${
                item.bgColor === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-900'
                  : 'bg-gray-200 hover:bg-gray-400'
              } rounded-lg p-6 transition-all duration-300 hover:shadow-lg cursor-pointer text-left`}
            >
              <h3
                className={`text-xl font-bold mb-2 ${
                  item.bgColor === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {item.title}
              </h3>
              <p className={item.bgColor === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {item.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

