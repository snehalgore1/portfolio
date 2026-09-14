// Butter-toned floating dust motes / sunbeam specks — the warm analog of the
// reference site's bubbles. Decorative only; hidden from assistive tech and
// disabled under prefers-reduced-motion (see studio.css .anim-drift).

// Generated once at module load so re-renders don't re-randomize positions.
const MOTES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 10 + 4,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 6,
  duration: Math.random() * 10 + 12,
  opacity: Math.random() * 0.4 + 0.15,
}));

export function AmbientParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {MOTES.map((m) => (
        <span
          key={m.id}
          className="anim-drift absolute rounded-full bg-butter"
          style={{
            width: `${m.size}px`,
            height: `${m.size}px`,
            left: `${m.left}%`,
            top: `${m.top}%`,
            opacity: m.opacity,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
