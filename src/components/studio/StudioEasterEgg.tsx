import { useState } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

// Personality-only reveals (per the brief — never gates resume info).
const FORTUNES = [
  "Off the clock: soccer since I was 14, and a table-tennis rally I refuse to lose.",
  "Currently learning pickleball — about a year in, and the dinks are improving.",
  "I treat recipes like systems: experiment, combine cuisines, iterate until it works.",
  "Best debugging happens away from the keyboard — usually mid-run or mid-stir.",
  "A good kernel and a good curry have the same secret: everything in the right order.",
];

interface StudioEasterEggProps {
  onClose: () => void;
}

export function StudioEasterEgg({ onClose }: StudioEasterEggProps) {
  const trapRef = useFocusTrap<HTMLDivElement>(true);
  const [i, setI] = useState(() => Math.floor(Math.random() * FORTUNES.length));

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" role="presentation" onClick={onClose}>
      <div aria-hidden="true" className="absolute inset-0 bg-espresso/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease]" />
      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-label="A little surprise"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-sm rounded-3xl border border-butter/60 bg-ivory p-6 text-center shadow-[0_30px_60px_-20px_rgba(120,82,20,0.5)] animate-[popIn_0.28s_cubic-bezier(0.34,1.56,0.64,1)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-cocoa transition-colors hover:bg-butter/40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>

        <div className="text-3xl">🥠</div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">You found the studio secret</p>
        <p className="mt-3 font-serif text-lg italic leading-snug text-espresso">"{FORTUNES[i]}"</p>

        <button
          type="button"
          onClick={() => setI((n) => (n + 1) % FORTUNES.length)}
          className="mt-5 rounded-full bg-butter px-5 py-2 text-sm font-semibold text-espresso transition-transform hover:-translate-y-0.5 hover:bg-butter-deep"
        >
          One more ✨
        </button>
      </div>
    </div>
  );
}
