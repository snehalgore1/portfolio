import { useMemo, useState } from 'react';
import { projects, type Project } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

const CATEGORIES = ['All', 'Systems', 'ML Systems', 'AI / LLM', 'Tools'] as const;
type Filter = (typeof CATEGORIES)[number];

function CaseStudy({ p }: { p: Project }) {
  return (
    <div className="mt-5 grid gap-6 border-t border-butter/40 pt-5 lg:grid-cols-2">
      <div>
        <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">What it is</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-cocoa">{p.whatItIs}</p>
        <h4 className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-gold">Why it matters</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-cocoa">{p.whyItMatters}</p>
      </div>
      <div>
        <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">What I built</h4>
        <ul className="mt-1.5 space-y-1.5">
          {p.whatIBuilt.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-cocoa">
              <span aria-hidden="true" className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-butter-deep" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-2">
        <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">Results</h4>
        <ul className="mt-2 flex flex-wrap gap-2">
          {p.outcomes.map((o) => (
            <li key={o} className="rounded-md bg-ivory px-3 py-1.5 font-mono text-xs text-sage ring-1 ring-sage/25">
              {o}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  const panelId = `case-${p.id}`;

  return (
    <article
      className={`flex flex-col rounded-2xl border bg-cream/60 p-6 transition-all ${
        open
          ? 'border-gold shadow-[var(--shadow-studio)] sm:col-span-2 lg:col-span-3'
          : 'border-butter/50 hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-studio)]'
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-butter/70 px-3 py-1 font-mono text-[11px] font-medium text-espresso">
          {p.category}
        </span>
        {p.featured && !open && (
          <span className="font-mono text-[10px] uppercase tracking-wide text-gold">★ featured</span>
        )}
      </div>

      <h3 className="font-serif text-xl font-semibold text-espresso">{p.title}</h3>
      <p className="mt-2 flex-grow text-sm leading-relaxed text-cocoa">{p.tagline}</p>

      {!open && p.outcomes.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {p.outcomes.slice(0, 2).map((o) => (
            <li key={o} className="rounded-md bg-ivory px-2.5 py-1 font-mono text-[11px] text-sage ring-1 ring-sage/20">
              {o}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.tech.slice(0, open ? p.tech.length : 5).map((t) => (
          <span key={t} className="rounded bg-ivory/70 px-2 py-0.5 font-mono text-[10px] text-cocoa/80">
            {t}
          </span>
        ))}
      </div>

      {open && <CaseStudy p={p} />}

      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="inline-flex items-center gap-1.5 rounded-full bg-butter px-4 py-2 text-sm font-semibold text-espresso transition-transform hover:-translate-y-0.5 hover:bg-butter-deep"
        >
          {open ? 'Show less' : 'Read the case study'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-espresso underline-offset-4 hover:text-gold hover:underline"
          >
            GitHub
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
      <div id={panelId} className="sr-only" aria-hidden={!open} />
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All');
  const { ref, shown } = useReveal<HTMLDivElement>();

  const shown_projects = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-24">
      <div ref={ref} className={`reveal ${shown ? 'reveal-in' : ''} mx-auto max-w-6xl px-5 sm:px-8`}>
        <div className="mb-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">Selected work</p>
          <h2 className="font-serif text-3xl font-semibold text-espresso sm:text-4xl">
            Things I've actually built
          </h2>
          <p className="mt-3 max-w-xl text-cocoa">
            Real systems: distributed backends, inference runtimes, and ML infrastructure. Open any card
            for the full case study.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
          {CATEGORIES.map((c) => {
            const active = filter === c;
            const count = c === 'All' ? projects.length : projects.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-espresso text-ivory'
                    : 'border-2 border-espresso/15 text-cocoa hover:border-gold'
                }`}
              >
                {c} <span className={active ? 'text-ivory/60' : 'text-cocoa/50'}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown_projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
