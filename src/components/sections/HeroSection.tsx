"use client";

import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PersonalInfo } from '@/types';

interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

export default function HeroSection({ personalInfo }: HeroSectionProps) {
  return (
    <header className="portfolio-hero">
      <div className="portfolio-hero-screen">
        <nav className="portfolio-nav" aria-label="Main navigation">
          <a href="#" className="font-semibold tracking-tight">Samuel Baumgartner<span className="text-sky-300">.</span></a>
          <div className="flex gap-5 text-sm text-slate-300 sm:gap-8">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
        <div className="portfolio-hero-content">
          <div className="portfolio-hero-layout">
            <div className="portfolio-hero-copy">
              <p className="portfolio-eyebrow">Electrical engineering · ETH Zürich</p>
              <h1>{personalInfo.name}</h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-200 sm:text-xl">{personalInfo.interests}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/CV/Samuel_Baumgartner.pdf" download="Samuel_Baumgartner_CV.pdf" className="portfolio-cv-link">Download CV <Download size={16} /></a>
              </div>
            </div>
          <Image src="/Portrait.png" alt={`${personalInfo.name}, electrical engineering student at ETH Zürich`} width={260} height={300} sizes="(max-width: 640px) 112px, (max-width: 1263px) 19vw, 240px" className="portfolio-hero-portrait" priority />
          </div>
        </div>
        <a href="#about" className="portfolio-scroll-cue" aria-label="Scroll to About me">
          <span>Scroll to explore</span><ArrowDown size={18} />
        </a>
      </div>
      <div className="portfolio-hero-footer">
        <a href="#about" className="inline-flex items-center gap-2">About me <ArrowDown size={15} /></a>
        <Link href="/projects/remote-ball" prefetch={false} className="hidden items-center gap-2 sm:inline-flex">Behind the animation <ArrowUpRight size={15} /></Link>
      </div>
    </header>
  );
}
