"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Typewriter from '@/components/Typewriter';
import ScrollHint from '@/components/ScrollHint';
import { PersonalInfo } from '@/types';

interface HeroSectionProps {
  personalInfo: PersonalInfo;
  onOpenRemoteBallProject?: () => void;
}

export default function HeroSection({ personalInfo, onOpenRemoteBallProject }: HeroSectionProps) {
  const [showProjectHint, setShowProjectHint] = useState(true);
  const [showBubble, setShowBubble] = useState(false);

  // Show bubble after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowProjectHint(false);
      } else {
        setShowProjectHint(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenRemoteBallProject) {
      onOpenRemoteBallProject();
    } else {
      // Fallback: just scroll to projects
      const projectsSection = document.querySelector('#projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
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
      {showProjectHint && showBubble && (
        <button
          onClick={handleBackgroundClick}
          className="absolute z-10 group hover:opacity-100 transition-opacity duration-300"
          style={{
            top: '450px', // Change this value (in px, rem, %, etc.)
            right: '250px', // Change this value (in px, rem, %, etc.)
            animation: 'fadeInSlideUp 0.5s ease-out forwards',
          }}
        >
          <div className="relative flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 shadow-2xl hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] hover:scale-105"
            style={{
              background: 'rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderColor: 'rgba(255, 255, 255, 0.25)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <span className="relative text-white/90 text-xs md:text-sm font-medium group-hover:text-white transition-colors">
              Background: 
            </span>
            <span className="relative text-white text-xs md:text-sm font-semibold group-hover:underline">
              Remote Controlled Ball Project
            </span>
            <svg 
              className="relative w-3.5 h-3.5 text-white/90 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}


