import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/portfolio';
import { Studio } from './studio/Studio';
import { AmbientParticles } from './studio/AmbientParticles';
import { sectionOrder, scrollToSection, type SectionId } from './studio/sections';

interface HeroProps {
  onOpen: (id: SectionId) => void;
  visited: Set<SectionId>;
  easterEggUnlocked: boolean;
  onEasterEgg: () => void;
}

export function Hero({ onOpen, visited, easterEggUnlocked, onEasterEgg }: HeroProps) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [idle, setIdle] = useState(false);
  const interactive = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Enable parallax only for fine pointers without reduced-motion.
  useEffect(() => {
    interactive.current =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Idle detection → show the guided hint toward the next unexplored object.
  const bumpIdle = () => {
    setIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), 3500);
  };
  useEffect(() => {
    bumpIdle();
    return () => { if (idleTimer.current) clearTimeout(idleTimer.current); };
  }, [visited.size]);

  const onPointerMove = (e: React.PointerEvent) => {
    bumpIdle();
    if (!interactive.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    setParallax({ x, y });
  };

  const nextUnvisited = sectionOrder.find((id) => !visited.has(id)) ?? null;
  const hintId = idle ? nextUnvisited : null;

  return (
    <section
      id="top"
      onPointerMove={onPointerMove}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-6 pt-20 sm:px-8"
      aria-labelledby="hero-heading"
    >
      <AmbientParticles />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 right-0 h-[560px] w-[560px] rounded-full bg-butter/25 blur-3xl" />

      {/* Copy */}
      <div className="relative z-10 mb-1 text-center">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-cocoa">
          <span className="inline-block h-2 w-2 rounded-full bg-sage" /> {profile.location}
        </p>
        <h1 id="hero-heading" className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-espresso sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-1 font-serif text-xl italic text-gold sm:text-2xl">{profile.role}</p>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-cocoa sm:text-base">
          {profile.positioning}
        </p>
      </div>

      {/* Studio scene */}
      <div className="relative z-10 w-full max-w-[520px]">
        <Studio
          onOpen={onOpen}
          visited={visited}
          hintId={hintId}
          parallax={parallax}
          easterEggUnlocked={easterEggUnlocked}
          onEasterEgg={onEasterEgg}
        />
      </div>

      {/* CTAs + progress */}
      <div className="relative z-10 mt-1 flex flex-col items-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="rounded-full bg-butter px-6 py-3 text-sm font-semibold text-espresso shadow-[0_10px_24px_-10px_rgba(200,155,25,0.8)] transition-transform hover:-translate-y-0.5 hover:bg-butter-deep"
          >
            Explore my work →
          </button>
          <a
            href={profile.resumeFile}
            className="rounded-full border-2 border-espresso/15 bg-ivory px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-gold"
          >
            View résumé
          </a>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/80 px-3 py-1 font-mono text-[11px] text-cocoa">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
            explored {visited.size}/{sectionOrder.length}
          </span>
          <span className="font-mono text-[11px] text-cocoa/70">tap an object, or use the menu</span>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#about" aria-label="Scroll to content" className="relative z-10 mt-4 text-cocoa/50 transition-colors hover:text-gold">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="animate-bounce">
          <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
