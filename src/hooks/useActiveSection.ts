import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view so the navbar can highlight it.
 * Deterministic scroll-position approach: the active section is the last one
 * whose top has passed a line near the top of the viewport. Returns '' when
 * above the first section (e.g. in the hero), so nothing is falsely highlighted.
 *
 * @param ids     section element ids (without '#'), in document order
 * @param offset  px from the top of the viewport used as the "current" line
 */
export function useActiveSection(ids: string[], offset = 120) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const compute = () => {
      // At the very bottom of the page, force the last section (it may be short).
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ids[ids.length - 1] ?? '');
        return;
      }

      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = id;
        else break; // sections are in document order; stop at the first one below the line
      }
      setActive(current);
    };

    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [ids, offset]);

  return active;
}
