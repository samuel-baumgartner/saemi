import { ArrowUpRight, Mail } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="portfolio-section">
      <div className="portfolio-container">
        <p className="portfolio-eyebrow">05 / Contact</p>
        <h2>Let’s connect.</h2>
        <div className="flex flex-wrap gap-3">
          <a href="mailto:sbaumgartn@ethz.ch" className="portfolio-button portfolio-button-primary"><Mail size={17} /> sbaumgartn@ethz.ch</a>
          <a href="https://www.linkedin.com/in/samuel-baumgartner-441a1a24b/" target="_blank" rel="noopener noreferrer" className="portfolio-button">LinkedIn <ArrowUpRight size={17} /></a>
        </div>
        <footer className="mt-16 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-500"><span>Samuel Baumgartner</span><a href="#" className="text-slate-400">Back to top ↑</a></footer>
      </div>
    </section>
  );
}
