import type { ReactNode } from 'react';

// Bold metric-like tokens ($250K+, 1M+, 180×, 60%, 99.5%, 112, 3×, 7×, 22 ms, 310 GFLOP/s).
const METRIC = /(\$?\d[\d.,]*(?:\s?(?:M|K|GB|ms|GFLOP\/s|×|x|%))?\+?)/g;

/** Returns the text with metric tokens wrapped in <strong>. */
export function highlight(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  METRIC.lastIndex = 0;
  while ((m = METRIC.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <strong key={key++} className="font-semibold text-espresso">
        {m[0]}
      </strong>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
