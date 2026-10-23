import { PersonalInfo } from '@/types';

export default function AboutSection({ personalInfo }: { personalInfo: PersonalInfo }) {
  return (
    <section id="about" className="portfolio-section">
      <div className="portfolio-container">
        <p className="portfolio-eyebrow">01 / Introduction</p>
        <h2>About me</h2>
        <div className="max-w-3xl">
          <div className="max-w-2xl space-y-5 text-base leading-8 text-slate-300 sm:text-lg">
            {personalInfo.about.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
