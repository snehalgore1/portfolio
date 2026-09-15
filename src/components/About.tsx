import { profile } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

export function About() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="scroll-mt-20 bg-cream/50 py-24 sm:py-36">
      <div ref={ref} className={`reveal ${shown ? 'reveal-in' : ''} mx-auto max-w-3xl px-5 sm:px-8`}>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">About</p>
        <h2 className="font-serif text-[2rem] font-semibold leading-[1.08] text-espresso sm:text-5xl">
          A real person behind the terminal
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-cocoa">{profile.summary}</p>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-1.5 font-mono text-xs text-cocoa ring-1 ring-butter/40">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" />
          {profile.nowNote}
        </p>
      </div>
    </section>
  );
}
