import { experience } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

export function Experience() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section id="experience" className="scroll-mt-20 py-24 sm:py-36">
      <div ref={ref} className={`reveal ${shown ? 'reveal-in' : ''} mx-auto max-w-6xl px-5 sm:px-8`}>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">Experience</p>
        <h2 className="font-serif text-[2rem] font-semibold leading-[1.08] text-espresso sm:text-5xl">
          Where I've shipped
        </h2>

        <ol className="mt-10 space-y-8">
          {experience.map((job) => (
            <li
              key={job.company}
              className="rounded-2xl border border-butter/50 bg-cream/50 p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-serif text-xl font-semibold text-espresso sm:text-2xl">
                  {job.company}
                  {job.context && (
                    <span className="ml-2 align-middle font-sans text-xs font-medium text-cocoa/70">
                      {job.context}
                    </span>
                  )}
                </h3>
                <span className="font-mono text-xs text-cocoa/70">{job.period}</span>
              </div>
              <p className="mt-0.5 text-sm font-semibold text-gold">
                {job.role} · <span className="font-normal text-cocoa">{job.location}</span>
              </p>

              <ul className="mt-4 space-y-2.5">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-cocoa">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-butter-deep" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.tech.map((t) => (
                  <span key={t} className="rounded-md bg-ivory px-2.5 py-1 font-mono text-[11px] text-cocoa ring-1 ring-butter/40">
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
