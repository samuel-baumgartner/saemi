import { PersonalInfo } from '@/types';

export default function AboutSection({ personalInfo }: { personalInfo: PersonalInfo }) {
  return (
    <section id="about" className="portfolio-section">
      <div className="portfolio-container">
        <p className="portfolio-eyebrow">01 / Introduction</p>
        <h2>About me</h2>
        <div className="grid items-start gap-10 md:grid-cols-[1fr_260px] md:gap-20">
          <div className="max-w-2xl space-y-5 text-base leading-8 text-slate-300 sm:text-lg">
            {personalInfo.about.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <img src="/Portrait.png" alt={personalInfo.name} width={260} height={300} className="aspect-[13/15] w-full max-w-[260px] rounded-xl border border-white/10 object-cover" />
        </div>
      </div>
    </section>
  );
}
