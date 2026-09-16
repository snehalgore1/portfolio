import { experience, education } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import { highlight } from '../lib/highlight';

export function Experience() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section id="experience" className="scroll-mt-20 py-24 sm:py-36">
      <div ref={ref} className={`reveal ${shown ? 'reveal-in' : ''} mx-auto max-w-6xl px-5 sm:px-8`}>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">Experience</p>
        <h2 className="font-serif text-[2rem] font-semibold leading-[1.08] text-espresso sm:text-5xl">
          Where I've shipped
        </h2>
        <p className="mt-3 max-w-xl text-cocoa">
          2.5+ years taking production systems from first commit to field rollout.
        </p>

        {/* Vertical timeline */}
        <ol className="relative mt-12 border-l-2 border-butter/50 pl-8 sm:pl-10">
          {experience.map((job) => (
            <li key={job.company} className="relative pb-12 last:pb-0">
              {/* Node */}
              <span
                aria-hidden="true"
                className="absolute -left-[41px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ivory ring-2 ring-butter-deep sm:-left-[49px]"
              >
                <span className="h-2 w-2 rounded-full bg-butter-deep" />
              </span>

              <span className="font-mono text-xs font-semibold text-gold">{job.period}</span>
              <h3 className="mt-1 font-serif text-xl font-semibold text-espresso sm:text-2xl">
                {job.company}
                {job.context && (
                  <span className="ml-2 align-middle font-sans text-xs font-medium text-cocoa/70">
                    {job.context}
                  </span>
                )}
              </h3>
              <p className="mt-0.5 text-sm font-semibold text-gold">
                {job.role} <span className="font-normal text-cocoa">· {job.location}</span>
              </p>
              {job.summary && (
                <p className="mt-3 font-serif text-base italic text-cocoa">{job.summary}</p>
              )}

              <ul className="mt-4 space-y-2.5">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-cocoa">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-butter-deep" />
                    <span>{highlight(b)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.tech.map((t) => (
                  <span key={t} className="rounded-md bg-cream/70 px-2.5 py-1 font-mono text-[11px] text-cocoa ring-1 ring-butter/40">
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}

          {/* Education node */}
          <li className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[41px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ivory ring-2 ring-sage sm:-left-[49px]"
            >
              <span className="h-2 w-2 rounded-full bg-sage" />
            </span>
            <span className="font-mono text-xs font-semibold text-sage">Education</span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {education.map((e) => (
                <div key={e.school} className="rounded-2xl border border-butter/50 bg-cream/40 p-5">
                  <h3 className="font-serif text-lg text-espresso">{e.school}</h3>
                  <p className="mt-0.5 text-sm text-cocoa">{e.degree}</p>
                  <p className="mt-1 font-mono text-[11px] text-cocoa/70">{e.period} · {e.location}</p>
                </div>
              ))}
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
