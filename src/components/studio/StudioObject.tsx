import type { KeyboardEvent, ReactNode } from 'react';

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface StudioObjectProps {
  /** Accessible name, e.g. "Projects — my technical work" */
  label: string;
  /** Short tag shown on hover/focus above the object */
  tag: string;
  tagX: number;
  tagY: number;
  /** Bounding box (SVG coords) for the highlight ring / hint / visited badge */
  box: Box;
  onActivate: () => void;
  /** Already explored — shows a small check and dims slightly */
  visited?: boolean;
  /** Guided hint — pulses to point the visitor here next */
  hint?: boolean;
  children: ReactNode;
}

/**
 * A clickable, keyboard-focusable object inside the studio SVG.
 * Objects are *flavor* — real navigation always exists in the Navbar, so this is
 * progressive enhancement. On hover/focus: bounce + pulsing ring + label tag.
 */
export function StudioObject({
  label,
  tag,
  tagX,
  tagY,
  box,
  onActivate,
  visited,
  hint,
  children,
}: StudioObjectProps) {
  const onKeyDown = (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate();
    }
  };

  return (
    <g
      className={`studio-obj ${visited ? 'is-visited' : ''} ${hint ? 'is-hint' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={visited ? `${label} (explored)` : label}
      onClick={onActivate}
      onKeyDown={onKeyDown}
    >
      <title>{label}</title>

      {/* Highlight ring — appears on hover/focus, or pulses when hinted */}
      <rect
        className="studio-ring"
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx={12}
        fill="none"
        stroke="#c89b19"
        strokeWidth={3}
      />

      <g className="studio-obj-body">{children}</g>

      {/* Visited check badge */}
      {visited && (
        <g transform={`translate(${box.x + box.w - 4} ${box.y + 4})`} aria-hidden="true">
          <circle r={10} fill="#78835a" />
          <path d="M-5 0 L-1.5 4 L5 -4" fill="none" stroke="#fffdf7" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {/* Hover / focus tag */}
      <g className="studio-tag" aria-hidden="true" transform={`translate(${tagX} ${tagY})`}>
        <rect
          x={-tag.length * 4.4 - 12}
          y={-16}
          width={tag.length * 8.8 + 24}
          height={28}
          rx={14}
          fill="#2c2521"
        />
        <text x={0} y={3} textAnchor="middle" fontSize={13} fontWeight={600} fill="#fffdf7" fontFamily="Inter, sans-serif">
          {tag}
        </text>
      </g>
    </g>
  );
}
