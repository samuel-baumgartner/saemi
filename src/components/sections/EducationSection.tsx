import { ArrowUpRight } from 'lucide-react';
import { EducationItem } from '@/types';

export default function EducationSection({ educationItems, onOpenModal }: { educationItems: EducationItem[]; onOpenModal: (item: EducationItem) => void }) {
  return (
    <section id="education" className="portfolio-section">
      <div className="portfolio-container">
        <p className="portfolio-eyebrow">02 / Background</p>
        <h2>Education & experience</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {educationItems.map(item => (
            <button key={item.id} onClick={() => onOpenModal(item)} className="portfolio-panel flex flex-col p-6 text-left">
              <div className="mb-6 flex w-full justify-between gap-3 text-xs uppercase tracking-wider text-slate-400"><span>{item.subtitle}</span><ArrowUpRight size={16} className="shrink-0" /></div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              {item.id === 'eth' && <p className="mt-3 text-sm text-sky-300">Top 5% of cohort · Average 5.7</p>}
              <span className="mt-auto pt-6 text-sm text-slate-400">View details</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
