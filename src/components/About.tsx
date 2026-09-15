import { profile, skills } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

export function About() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="scroll-mt-20 bg-cream/50 py-24 sm:py-36">
      <div ref={ref} className={`reveal ${shown ? 'reveal-in' : ''} mx-auto max-w-6xl px-5 sm:px-8`}>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">About</p>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-serif text-[2rem] font-semibold leading-[1.08] text-espresso sm:text-5xl">
              A real person behind the terminal
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cocoa">{profile.summary}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-1.5 font-mono text-xs text-cocoa ring-1 ring-butter/40">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              {profile.nowNote}
            </p>
          </div>

          {/* Skills */}
          <div className="rounded-2xl border border-butter/50 bg-ivory p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-gold">What I work with</h3>
            <div className="mt-4 space-y-4">
              {skills.map((s) => (
                <div key={s.group}>
                  <p className="mb-1.5 text-sm font-semibold text-espresso">{s.group}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((i) => (
                      <span
                        key={i}
                        className="rounded-md bg-cream px-2.5 py-1 font-mono text-[11px] text-cocoa"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
