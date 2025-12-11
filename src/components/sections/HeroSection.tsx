import React from 'react';
import Link from 'next/link';
import Typewriter from '@/components/Typewriter';
import ScrollHint from '@/components/ScrollHint';
import { PersonalInfo } from '@/types';

interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

export default function HeroSection({ personalInfo }: HeroSectionProps) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center relative">
      <Link
        href="/"
        className="absolute top-4 left-4 text-white text-lg font-medium hover:underline z-10"
      >
        {personalInfo.name}
      </Link>
      <div className="text-center text-white space-y-8 max-w-2xl px-4 z-10">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            {personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-white font-light">
            {personalInfo.title},{' '}
            <a
              href={personalInfo.universityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-normal hover:underline"
            >
              {personalInfo.university}
            </a>
          </p>
        </div>
        <p className="text-lg text-white pt-4">
          I am a <Typewriter />
        </p>
        <p className="text-lg text-white">{personalInfo.interests}</p>
        <div className="flex gap-4 justify-center pt-6">
          <Link
            href="#cv"
            className="text-sm text-white hover:text-gray-200 transition-colors"
          >
            CV
          </Link>
          <Link
            href="#projects"
            className="text-sm text-white hover:text-gray-200 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="#contact"
            className="text-sm text-white hover:text-gray-200 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
      <ScrollHint />
    </div>
  );
}


