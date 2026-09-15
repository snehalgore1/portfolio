import { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal';

// Truthful, resume-sourced highlight numbers.
const STATS = [
  { value: 2.5, decimals: 1, prefix: '', suffix: '+', label: 'years shipping production systems' },
  { value: 1, decimals: 0, prefix: '', suffix: 'M+', label: 'devices running my ML in the field' },
  { value: 180, decimals: 0, prefix: '', suffix: '×', label: 'faster inference in MiniTensorRT' },
  { value: 10, decimals: 0, prefix: '', suffix: '', label: 'projects built end to end' },
] as const;

function CountUp({ value, decimals, start }: { value: number; decimals: number; start: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value);
      return;
    }
    const duration = 1200;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return <>{n.toFixed(decimals)}</>;
}

export function Stats() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.3);

  return (
    <section aria-label="Highlights by the numbers" className="border-y border-butter/30 bg-cream/40">
      <div
        ref={ref}
        className={`stagger ${shown ? 'reveal-in' : ''} mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-14 sm:px-8 lg:grid-cols-4`}
      >
        {STATS.map((s, i) => (
          <div key={s.label} style={{ ['--i' as string]: i }} className="text-center lg:text-left">
            <div className="font-serif text-4xl font-semibold tracking-tight text-espresso sm:text-5xl">
              {s.prefix}
              <CountUp value={s.value} decimals={s.decimals} start={shown} />
              {s.suffix}
            </div>
            <p className="mt-2 text-sm leading-snug text-cocoa">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
