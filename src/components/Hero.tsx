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
      <div className="relative z-10 mb-2 text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-butter/40 bg-cream/70 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cocoa backdrop-blur-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" /> {profile.location}
        </p>
        <h1 id="hero-heading" className="font-serif text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.02em] text-espresso sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-2 font-serif text-xl italic text-gold sm:text-2xl">{profile.role}</p>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-cocoa">
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
            className="rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-ivory shadow-[var(--shadow-md)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] hover:brightness-110"
          >
            Explore my work →
          </button>
          <a
            href={profile.resumeFile}
            className="rounded-full border border-espresso/15 bg-ivory/70 px-6 py-3 text-sm font-semibold text-espresso backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold"
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
