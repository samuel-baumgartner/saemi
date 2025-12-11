import React from 'react';
import { ProjectSection, FeatureItem, TechStackItem } from '@/types';

export const createSectionHeader = (
  title: string,
  gradient: string = 'from-blue-500 to-purple-500'
): React.ReactNode => {
  // Map gradient strings to darker, more visible versions
  const darkGradientMap: Record<string, string> = {
    'from-blue-500 to-purple-500': 'from-blue-700 to-purple-700',
    'from-green-500 to-emerald-500': 'from-green-700 to-emerald-700',
    'from-purple-500 to-pink-500': 'from-purple-700 to-pink-700',
    'from-indigo-500 to-blue-500': 'from-indigo-700 to-blue-700',
    'from-blue-500 to-cyan-500': 'from-blue-700 to-cyan-700',
    'from-orange-500 to-red-500': 'from-orange-700 to-red-700',
    'from-red-500 to-pink-500': 'from-red-700 to-pink-700',
  };
  const darkGradient = darkGradientMap[gradient] || 'from-gray-800 to-gray-900';
  
  return (
    <h4 className="text-3xl md:text-4xl font-extrabold flex items-center gap-4 mb-3">
      <span className={`w-3 h-10 bg-gradient-to-b ${gradient} rounded-full shadow-lg`}></span>
      <span className="text-gray-900">
        {title}
      </span>
    </h4>
  );
};

export const createFeatureList = (features: FeatureItem[]): React.ReactNode => {
  const getFeatureGradient = (color: string = 'bg-blue-500') => {
    const gradientMap: Record<string, string> = {
      'bg-blue-500': 'from-blue-50 via-indigo-50/30 to-blue-50',
      'bg-green-500': 'from-emerald-50 via-teal-50/30 to-emerald-50',
      'bg-purple-500': 'from-purple-50 via-violet-50/30 to-purple-50',
      'bg-orange-500': 'from-orange-50 via-amber-50/30 to-orange-50',
      'bg-pink-500': 'from-pink-50 via-rose-50/30 to-pink-50',
      'bg-indigo-500': 'from-indigo-50 via-blue-50/30 to-indigo-50',
      'bg-cyan-500': 'from-cyan-50 via-sky-50/30 to-cyan-50',
      'bg-red-500': 'from-red-50 via-rose-50/30 to-red-50',
    };
    return gradientMap[color] || 'from-blue-50 via-indigo-50/30 to-blue-50';
  };

  const getBorderColor = (color: string = 'bg-blue-500') => {
    const borderMap: Record<string, string> = {
      'bg-blue-500': 'border-blue-200/60',
      'bg-green-500': 'border-emerald-200/60',
      'bg-purple-500': 'border-purple-200/60',
      'bg-orange-500': 'border-orange-200/60',
      'bg-pink-500': 'border-pink-200/60',
      'bg-indigo-500': 'border-indigo-200/60',
      'bg-cyan-500': 'border-cyan-200/60',
      'bg-red-500': 'border-red-200/60',
    };
    return borderMap[color] || 'border-blue-200/60';
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
      {features.map((feature, index) => {
        const gradient = getFeatureGradient(feature.color);
        return (
          <div 
            key={index} 
            className={`group bg-gray-200 rounded-2xl p-4 md:p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-gray-200/60 shadow-sm text-center`}
          >
            <div className="flex flex-col items-center">
              <strong className="text-gray-900 font-bold text-lg md:text-xl block mb-3">{feature.title}:</strong>
              <span className="text-gray-700 text-sm md:text-base leading-relaxed block">{feature.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const createTechStack = (techItems: TechStackItem[]): React.ReactNode => {
  // Map color classes to actual color values for inline styles
  const getColorStyles = (color: string = 'bg-indigo-500') => {
    const colorMap: Record<string, { bgFrom: string; bgTo: string; border: string }> = {
      'bg-indigo-500': { 
        bgFrom: '#e0e7ff', 
        bgTo: '#c7d2fe', 
        border: '#a5b4fc' 
      },
      'bg-blue-500': { 
        bgFrom: '#dbeafe', 
        bgTo: '#bfdbfe', 
        border: '#93c5fd' 
      },
      'bg-green-500': { 
        bgFrom: '#dcfce7', 
        bgTo: '#bbf7d0', 
        border: '#86efac' 
      },
      'bg-purple-500': { 
        bgFrom: '#f3e8ff', 
        bgTo: '#e9d5ff', 
        border: '#d8b4fe' 
      },
      'bg-orange-500': { 
        bgFrom: '#ffedd5', 
        bgTo: '#fed7aa', 
        border: '#fdba74' 
      },
      'bg-pink-500': { 
        bgFrom: '#fce7f3', 
        bgTo: '#fbcfe8', 
        border: '#f9a8d4' 
      },
      'bg-cyan-500': { 
        bgFrom: '#cffafe', 
        bgTo: '#a5f3fc', 
        border: '#67e8f9' 
      },
      'bg-red-500': { 
        bgFrom: '#fee2e2', 
        bgTo: '#fecaca', 
        border: '#fca5a5' 
      },
      'bg-yellow-500': { 
        bgFrom: '#fef9c3', 
        bgTo: '#fef08a', 
        border: '#fde047' 
      },
      'bg-teal-500': { 
        bgFrom: '#ccfbf1', 
        bgTo: '#99f6e4', 
        border: '#5eead4' 
      },
    };
    return colorMap[color] || { bgFrom: '#f3f4f6', bgTo: '#e5e7eb', border: '#d1d5db' };
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {techItems.map((item, index) => {
        const colors = getColorStyles(item.color);
        return (
          <div 
            key={index} 
            className="rounded-2xl p-4 md:p-5 border border-gray-200/60 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group mb-4"
            style={{
              background: `linear-gradient(135deg, ${colors.bgFrom}, ${colors.bgTo})`,
            }}
          >
            <div className="flex-1">
              <span className="text-gray-900 font-bold text-base md:text-lg group-hover:text-gray-950 transition-colors">{item.category}: </span>
              <span className="text-gray-700 text-sm md:text-base font-medium">{item.technology}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const createHighlightedSection = (
  title: string,
  content: React.ReactNode,
  gradient: string = 'from-blue-500 to-cyan-500',
  bgColor: string = 'bg-blue-50',
  borderColor: string = 'border-blue-100'
): React.ReactNode => (
  <div className="space-y-5">
    {createSectionHeader(title, gradient)}
    <div className="pt-2">
      {content}
    </div>
  </div>
);

export const createProjectHeader = (
  title: string,
  tags: Array<{ label: string; color?: string }>,
  description: string
): React.ReactNode => (
  <div className="pb-8 pt-4 pr-4">
    <h4 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
      {title}
    </h4>
    <div className="flex flex-wrap gap-4 text-sm mb-8">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`${tag.color || 'bg-blue-100 text-blue-800'} px-4 py-2 rounded-full font-bold shadow-lg border border-gray-200/60 backdrop-blur-md hover:scale-105 transition-transform duration-200`}
        >
          {tag.label}
        </span>
      ))}
    </div>
    <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">{description}</p>
  </div>
);


