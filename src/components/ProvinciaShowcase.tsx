'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';

export default function ProvinciaShowcase({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const shot = project.carouselItems[active];

  return (
    <article className="provincia-showcase mb-6 sm:mb-8" aria-labelledby="provincia-title" data-project-id={project.id}>
      <div className="provincia-copy">
        <p className="portfolio-eyebrow">Personal project / In development</p>
        <h3 id="provincia-title" className="text-4xl sm:text-5xl font-medium tracking-tight text-white">Provincia</h3>
        <p className="mt-3 text-lg text-sky-200">Build a colony. Command its defense.</p>
        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">A Roman-inspired colony simulation I’m developing in Godot. Grow a settlement, manage its resources, and lead your soldiers into battle.</p>
        <div className="mt-6 flex flex-wrap gap-2" aria-label="Project topics">
          {['Godot 4', 'Colony simulation', 'Tactical combat'].map(tag => <span key={tag} className="rounded-full border border-sky-200/15 px-3 py-1 text-xs text-slate-300">{tag}</span>)}
        </div>
        <Link href={`/projects/${project.id}`} prefetch={false} className="portfolio-button provincia-open mt-7">Explore the project <ArrowUpRight size={16} /></Link>
      </div>
      <div className="provincia-gallery">
        <Link href={`/projects/${project.id}#project-gallery`} prefetch={false} className="provincia-hero-shot group" aria-label="Explore Provincia screenshots on the project page">
          <Image src={shot.src!} alt={shot.caption!} width={1920} height={1080} sizes="(max-width: 767px) 100vw, 660px" className="h-full w-full object-cover" />
        </Link>
        <div className="flex items-center justify-between gap-3 px-4 pt-4 text-xs text-slate-300" aria-live="polite">
          <span>{shot.caption}</span><span className="shrink-0 text-slate-500">0{active + 1} / 0{project.carouselItems.length}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 p-4" aria-label="Provincia screenshots">
          {project.carouselItems.map((item, index) => (
            <button key={item.src} onClick={() => setActive(index)} aria-label={`Show ${item.caption}`} aria-pressed={active === index} className={`provincia-thumbnail ${active === index ? 'is-active' : ''}`}>
              <Image src={item.src!} alt="" width={320} height={180} sizes="(max-width: 767px) 30vw, 200px" className="aspect-video w-full object-cover" />
            </button>
          ))}
        </div>
        <p className="px-4 pb-4 text-[11px] text-slate-500">Captured in-engine · Development screenshots</p>
      </div>
    </article>
  );
}
