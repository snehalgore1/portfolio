import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skillTracks, type SkillTrack } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Skills() {
  const [trackId, setTrackId] = useState<SkillTrack['id']>('all');
  const { ref, shown } = useReveal<HTMLDivElement>();
  const track = skillTracks.find((t) => t.id === trackId)!;

  return (
    <section id="skills" className="scroll-mt-20 bg-cream/50 py-24 sm:py-36">
      <div ref={ref} className={`reveal ${shown ? 'reveal-in' : ''} mx-auto max-w-6xl px-5 sm:px-8`}>
        <div className="mb-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">Skills</p>
          <h2 className="font-serif text-[2rem] font-semibold leading-[1.08] text-espresso sm:text-5xl">
            Hiring for a particular role?
          </h2>
          <p className="mt-3 max-w-xl text-cocoa">
            Flip to the stack that matters for your team. Everything here is something I've shipped or built with.
          </p>
        </div>

        {/* Role tabs with a sliding indicator */}
        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter skills by role">
          {skillTracks.map((t) => {
            const active = t.id === trackId;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTrackId(t.id)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  active ? 'text-ivory' : 'border border-espresso/15 text-cocoa hover:border-gold hover:bg-ivory/60'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="skill-pill"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-espresso shadow-[var(--shadow-sm)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {t.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <p className="mb-6 max-w-2xl font-serif text-lg italic text-cocoa">{track.blurb}</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {track.groups.map((g) => (
                <div key={g.group} className="rounded-2xl border border-butter/50 bg-ivory p-5">
                  <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-gold">{g.group}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((i) => (
                      <span key={i} className="rounded-md bg-cream px-2.5 py-1 font-mono text-[11px] text-cocoa">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
