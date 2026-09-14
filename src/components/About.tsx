import { profile, skills, education } from '../data/portfolio';

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-cream/50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">About</p>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-espresso sm:text-4xl">
              A real person behind the terminal
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cocoa">{profile.summary}</p>

            <div className="mt-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-gold">Education</h3>
              <ul className="mt-3 space-y-3">
                {education.map((e) => (
                  <li key={e.school} className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <div>
                      <p className="font-serif text-lg text-espresso">{e.school}</p>
                      <p className="text-sm text-cocoa">{e.degree}</p>
                    </div>
                    <span className="font-mono text-xs text-cocoa/70">{e.period}</span>
                  </li>
                ))}
              </ul>
            </div>
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
