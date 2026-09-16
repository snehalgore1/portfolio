import { useState, useCallback } from 'react';

const TREATS = ['🍵', '🍡', '🧁', '🍥', '🥮', '🍰'];

interface Treat {
  id: number;
  left: number;
  emoji: string;
  duration: number;
  size: number;
}

let nextId = 0;

/** A tiny corner button that rains matcha treats for a little joy. */
export function TakeABreak() {
  const [treats, setTreats] = useState<Treat[]>([]);

  const drop = useCallback(() => {
    const batch: Treat[] = Array.from({ length: 8 }, () => ({
      id: nextId++,
      left: Math.random() * 100,
      emoji: TREATS[Math.floor(Math.random() * TREATS.length)],
      duration: 2.6 + Math.random() * 1.8,
      size: 22 + Math.random() * 18,
    }));
    setTreats((prev) => [...prev, ...batch]);
    const ids = new Set(batch.map((t) => t.id));
    // Clean up after the longest fall completes.
    setTimeout(() => setTreats((prev) => prev.filter((t) => !ids.has(t.id))), 5000);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={drop}
        aria-label="Take a break — rain some matcha treats"
        className="fixed bottom-5 left-5 z-[350] inline-flex items-center gap-1.5 rounded-full border border-matcha/50 bg-ivory/90 px-3.5 py-2 font-mono text-xs font-semibold text-matcha-deep shadow-[var(--shadow-sm)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-matcha/15 hover:shadow-[var(--shadow-md)]"
      >
        🍵 Take a break
      </button>

      <div aria-hidden="true">
        {treats.map((t) => (
          <span
            key={t.id}
            className="treat"
            style={{ left: `${t.left}vw`, fontSize: `${t.size}px`, animationDuration: `${t.duration}s` }}
          >
            {t.emoji}
          </span>
        ))}
      </div>
    </>
  );
}
