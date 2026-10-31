'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Box, Play } from 'lucide-react';
import type { Project } from '@/types';

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
  ssr: false,
  loading: () => <p role="status" className="p-6 text-slate-300">Loading the 3D viewer…</p>,
});

function videoUrl(src: string) {
  const source = new URL(src);
  const id = source.hostname === 'youtu.be' ? source.pathname.slice(1) : source.searchParams.get('v');
  if (!id) return src;
  const start = parseInt(source.searchParams.get('t') ?? source.searchParams.get('start') ?? '0', 10);
  return `https://www.youtube.com/embed/${encodeURIComponent(id)}?start=${Number.isFinite(start) ? start : 0}`;
}

export default function ProjectGallery({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const items = project.carouselItems;
  const item = items[active];
  if (!item) return null;

  const label = item.caption ?? `${project.shortTitle} — ${item.type === 'model' || item.type === 'custom' ? 'interactive 3D model' : item.type === 'video' ? 'project video' : `image ${active + 1}`}`;

  return (
    <section id="project-gallery" aria-labelledby="project-gallery-title" className="mb-12 scroll-mt-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2 id="project-gallery-title" className="text-2xl font-medium text-white">Images & interactive demos</h2>
        {items.length > 1 && (
          <div className="flex items-center gap-3">
            <button type="button" className="portfolio-button !p-3" aria-label="Previous media" onClick={() => setActive(index => (index - 1 + items.length) % items.length)}><ArrowLeft size={18} /></button>
            <span role="status" className="min-w-12 text-center text-sm text-slate-400">{active + 1} / {items.length}</span>
            <button type="button" className="portfolio-button !p-3" aria-label="Next media" onClick={() => setActive(index => (index + 1) % items.length)}><ArrowRight size={18} /></button>
          </div>
        )}
      </div>
      <figure key={active}>
        {item.type === 'custom' ? item.content : item.type === 'model' ? (
          <div className="aspect-square max-h-[700px] w-full overflow-hidden rounded-xl border border-white/10 bg-[#0c131e]">
            <ModelViewer modelPath={item.src!} />
          </div>
        ) : item.type === 'video' ? (
          <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#0c131e]">
            <iframe src={videoUrl(item.src!)} title={label} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="h-full w-full" />
          </div>
        ) : (
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#0c131e]">
            <Image src={item.src!} alt={label} fill priority={active === 0} sizes="(max-width: 1128px) calc(100vw - 48px), 1080px" className="object-contain" />
          </div>
        )}
        <figcaption className="mt-3 text-sm text-slate-400">{label}{item.type === 'model' && ' · Drag to rotate'}</figcaption>
      </figure>
      {items.length > 1 && (
        <div className="mt-5 flex flex-wrap gap-3" aria-label="Choose project media">
          {items.map((media, index) => (
            <button
              key={index}
              type="button"
              aria-label={`View media ${index + 1}: ${media.caption ?? (media.type === 'image' ? 'Screenshot' : media.type === 'video' ? 'Video' : '3D model')}`}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              className={`relative flex h-16 w-24 items-center justify-center overflow-hidden rounded-md border-2 ${active === index ? 'border-sky-300' : 'border-white/15 hover:border-sky-200/60'}`}
            >
              {media.type === 'image' ? <Image src={media.src!} alt="" fill sizes="96px" className="object-cover" /> : media.type === 'video' ? <Play size={20} /> : <Box size={20} />}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
