import { projects } from '../data/portfolio';

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">Selected work</p>
            <h2 className="font-serif text-3xl font-semibold text-espresso sm:text-4xl">
              Things I've actually built
            </h2>
            <p className="mt-3 max-w-xl text-cocoa">
              Real systems — distributed backends, inference runtimes, and ML infrastructure — not skill badges.
            </p>
          </div>
          <a
            href="#projects-all"
            className="rounded-full border-2 border-espresso/15 px-5 py-2.5 text-sm font-semibold text-espresso transition-colors hover:border-gold"
          >
            All projects →
          </a>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {featured.map((p) => (
            <li key={p.id}>
              <article className="group flex h-full flex-col rounded-2xl border border-butter/50 bg-cream/60 p-6 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-studio)]">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-butter/70 px-3 py-1 font-mono text-[11px] font-medium text-espresso">
                    {p.category}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-espresso">{p.title}</h3>
                <p className="mt-2 flex-grow text-sm leading-relaxed text-cocoa">{p.tagline}</p>

                {p.outcomes.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.outcomes.slice(0, 2).map((o) => (
                      <li
                        key={o}
                        className="rounded-md bg-ivory px-2.5 py-1 font-mono text-[11px] text-sage ring-1 ring-sage/20"
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 5).map((t) => (
                    <span key={t} className="text-[11px] font-medium text-cocoa/70">
                      {t}
                      <span className="mx-1 text-butter-deep last:hidden">·</span>
                    </span>
                  ))}
                </div>

                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-espresso underline-offset-4 hover:text-gold hover:underline"
                  >
                    View on GitHub
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
