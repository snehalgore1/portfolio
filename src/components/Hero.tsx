import { useEffect, useRef, useState } from 'react';
import { profile, avatars } from '../data/portfolio';
import { Studio } from './studio/Studio';
import { AmbientParticles } from './studio/AmbientParticles';
import { Avatar } from './Avatar';
import { scrollToSection, type SectionId } from './studio/sections';

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
  const interactive = useRef(false);

  // Enable parallax only for fine pointers without reduced-motion.
  useEffect(() => {
    interactive.current =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    setParallax({ x, y });
  };

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
        <div className="mb-4 flex justify-center">
          <Avatar src={avatars.hero} alt="Snehal, AI/ML engineer at her laptop" size={112} />
        </div>
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

      {/* Studio scene (decorative; objects still open sections on click) */}
      <div className="relative z-10 w-full max-w-[520px]">
        <Studio
          onOpen={onOpen}
          visited={visited}
          hintId={null}
          spotlightId={null}
          showBadges={false}
          parallax={parallax}
          easterEggUnlocked={easterEggUnlocked}
          onEasterEgg={onEasterEgg}
          dusk={dusk}
        />
      </div>

      {/* CTAs */}
      <div className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollToSection('projects')}
          className="rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-ivory shadow-[var(--shadow-md)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] hover:brightness-110"
        >
          Explore my work →
        </button>
        <a
          href={profile.resumeFile}
          className={`rounded-full border px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 ${
            dusk ? 'border-white/20 text-ivory hover:border-gold' : 'border-espresso/15 bg-ivory/70 text-espresso hover:border-gold'
          }`}
        >
          View résumé
        </a>
      </div>

      {/* Scroll cue */}
      <a href="#about" aria-label="Scroll to content" className={`relative z-10 mt-8 transition-colors hover:text-gold ${dusk ? 'text-cream/50' : 'text-cocoa/50'}`}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="animate-bounce">
          <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
