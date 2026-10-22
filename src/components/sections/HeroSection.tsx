"use client";

import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import { PersonalInfo } from '@/types';

interface HeroSectionProps {
  personalInfo: PersonalInfo;
  onOpenRemoteBallProject?: () => void;
}

export default function HeroSection({ personalInfo, onOpenRemoteBallProject }: HeroSectionProps) {
  return (
    <header className="portfolio-hero">
      <nav className="portfolio-nav" aria-label="Main navigation">
        <a href="#" className="font-semibold tracking-tight">Samuel Baumgartner<span className="text-sky-300">.</span></a>
        <div className="flex gap-5 text-sm text-slate-300 sm:gap-8">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <div className="portfolio-hero-content">
        <p className="portfolio-eyebrow">Electrical engineering · ETH Zürich</p>
        <h1>{personalInfo.name}</h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-200 sm:text-xl">{personalInfo.interests}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="/CV/Samuel_Baumgartner.pdf" download="Samuel_Baumgartner_CV.pdf" className="portfolio-button">Download CV <Download size={16} /></a>
        </div>
      </div>
      <div className="portfolio-hero-footer">
        <a href="#about" className="inline-flex items-center gap-2">About me <ArrowDown size={15} /></a>
        <button onClick={onOpenRemoteBallProject} className="hidden items-center gap-2 sm:inline-flex">Behind the animation <ArrowUpRight size={15} /></button>
      </div>
    </header>
  );
}
