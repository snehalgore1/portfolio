import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/portfolio';
import { Studio } from './studio/Studio';
import { AmbientParticles } from './studio/AmbientParticles';
import { studioSections, sectionOrder, scrollToSection, type SectionId } from './studio/sections';

// Tiny icons matching each desk object, for the legend chips.
const CHIP_ICON: Record<SectionId, React.ReactNode> = {
  about: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 8h6M8 12h6M8 16h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  experience: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 8a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
  ),
  projects: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M2 20h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  resume: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M13 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
  ),
  contact: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
  ),
};

interface HeroProps {
  onOpen: (id: SectionId) => void;
  visited: Set<SectionId>;
  easterEggUnlocked: boolean;
  onEasterEgg: () => void;
  dusk: boolean;
  onToggleDusk: () => void;
}

export function Hero({ onOpen, visited, easterEggUnlocked, onEasterEgg, dusk, onToggleDusk }: HeroProps) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [idle, setIdle] = useState(false);
  const [spot, setSpot] = useState<SectionId | null>(null);
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
      className={`relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-6 pt-20 transition-colors duration-700 sm:px-8 ${
        dusk ? 'bg-[#2c2521]' : ''
      }`}
      aria-labelledby="hero-heading"
    >
      <AmbientParticles />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-32 right-0 h-[560px] w-[560px] rounded-full blur-3xl transition-colors duration-700 ${
          dusk ? 'bg-gold/20' : 'bg-butter/25'
        }`}
      />

      {/* Dusk / daylight toggle */}
      <button
        type="button"
        onClick={onToggleDusk}
        aria-pressed={dusk}
        aria-label={dusk ? 'Switch to daylight' : 'Switch to evening'}
        title={dusk ? 'Daylight' : 'Evening'}
        className={`absolute right-5 top-24 z-20 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-500 sm:right-8 ${
          dusk
            ? 'border-white/15 bg-white/10 text-butter hover:bg-white/20'
            : 'border-espresso/10 bg-ivory/70 text-cocoa hover:border-gold'
        }`}
      >
        {dusk ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        )}
      </button>

      {/* Copy */}
      <div className="relative z-10 mb-2 text-center">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {profile.openToWork && (
            <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] backdrop-blur-sm transition-colors duration-700 ${
              dusk ? 'border-sage/40 bg-sage/15 text-cream' : 'border-sage/30 bg-sage/10 text-sage'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
              </span>
              Open to work
            </span>
          )}
          <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] backdrop-blur-sm transition-colors duration-700 ${
            dusk ? 'border-white/15 bg-white/5 text-cream/80' : 'border-butter/40 bg-cream/70 text-cocoa'
          }`}>
            {profile.location}
          </span>
        </div>
        <h1
          id="hero-heading"
          className={`font-serif text-[3.25rem] font-semibold leading-[0.98] tracking-[-0.03em] transition-colors duration-700 sm:text-7xl ${
            dusk ? 'text-ivory' : 'text-espresso'
          }`}
        >
          {profile.name}
        </h1>
        <p className="mt-2 font-serif text-xl italic text-gold sm:text-2xl">{profile.role}</p>
        <p className={`mx-auto mt-3 max-w-xl text-base leading-relaxed transition-colors duration-700 ${dusk ? 'text-cream/80' : 'text-cocoa'}`}>
          {profile.positioning}
        </p>
      </div>

      {/* Studio scene */}
      <div className="relative z-10 w-full max-w-[520px]">
        <Studio
          onOpen={onOpen}
          visited={visited}
          hintId={hintId}
          spotlightId={spot}
          parallax={parallax}
          easterEggUnlocked={easterEggUnlocked}
          onEasterEgg={onEasterEgg}
          dusk={dusk}
        />
      </div>

      {/* Legend: names each desk object, opens it, and spotlights it on hover */}
      <div className="relative z-10 mt-3 flex flex-wrap items-center justify-center gap-2">
        {studioSections.map((s) => {
          const isVisited = visited.has(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onOpen(s.id)}
              onMouseEnter={() => setSpot(s.id)}
              onMouseLeave={() => setSpot(null)}
              onFocus={() => setSpot(s.id)}
              onBlur={() => setSpot(null)}
              aria-label={`Open ${s.label}${isVisited ? ' (explored)' : ''}`}
              className={`group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 ease-out ${
                dusk
                  ? 'border-white/15 bg-white/5 text-cream/85 hover:border-gold hover:bg-white/10'
                  : 'border-espresso/12 bg-ivory/70 text-cocoa hover:border-gold hover:bg-cream/70'
              }`}
            >
              <span className="text-gold">{CHIP_ICON[s.id]}</span>
              {s.label}
              {isVisited && <span aria-hidden="true" className="text-sage">✓</span>}
            </button>
          );
        })}
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
          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] transition-colors duration-700 ${dusk ? 'bg-white/10 text-cream/80' : 'bg-cream/80 text-cocoa'}`}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
            explored {visited.size}/{sectionOrder.length}
          </span>
          <span className={`font-mono text-[11px] transition-colors duration-700 ${dusk ? 'text-cream/50' : 'text-cocoa/70'}`}>tap a label or its object on the desk</span>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#about" aria-label="Scroll to content" className={`relative z-10 mt-4 transition-colors hover:text-gold ${dusk ? 'text-cream/50' : 'text-cocoa/50'}`}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="animate-bounce">
          <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
