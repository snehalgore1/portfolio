import { profile } from '../data/portfolio';

export function Footer() {
  return (
    <>
      {/* Resume */}
      <section id="resume" className="scroll-mt-20 py-24 sm:py-36">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-butter to-butter-deep px-6 py-16 text-center shadow-[var(--shadow-lg)] sm:px-12">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-ivory/25 blur-2xl" />
            <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-espresso/70">Résumé</p>
            <h2 className="relative max-w-2xl font-serif text-[2rem] font-semibold leading-[1.08] text-espresso sm:text-5xl">
              Want the one-page version?
            </h2>
            <p className="relative max-w-xl text-espresso/80">
              Everything above, condensed and printable, never buried behind the studio.
            </p>
            <div className="relative flex flex-wrap justify-center gap-3">
              <a
                href={profile.resumeFile}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-ivory shadow-[var(--shadow-md)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] hover:brightness-110"
              >
                View résumé
              </a>
              <a
                href={profile.resumeFile}
                download
                className="rounded-full border border-espresso/25 bg-ivory/20 px-6 py-3 text-sm font-semibold text-espresso backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-espresso hover:bg-ivory/40"
              >
                Download PDF ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer id="contact" className="scroll-mt-20 border-t border-butter/40 bg-cream/60 py-16">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">Contact</p>
          <h2 className="font-serif text-[2rem] font-semibold leading-[1.08] text-espresso sm:text-5xl">
            Let's build something
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-cocoa">
            I'm open to AI/ML engineering roles and interesting problems. The fastest way to reach me is email.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-ivory shadow-[var(--shadow-sm)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] hover:brightness-110"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-espresso/15 px-6 py-3 text-sm font-semibold text-espresso transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-espresso/15 px-6 py-3 text-sm font-semibold text-espresso transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold"
            >
              GitHub
            </a>
          </div>

          <p className="mt-12 font-mono text-xs text-cocoa/60">
            © {new Date().getFullYear()} {profile.name} · Built in a little yellow studio.{' '}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-terminal'))}
              aria-label="Open the hidden terminal"
              title="psst… try me (or press the ` key)"
              className="ml-1 rounded px-1 text-gold transition-colors hover:bg-espresso hover:text-ivory"
            >
              &gt;<span className="cursor-blink">_</span>
            </button>
          </p>
        </div>
      </footer>
    </>
  );
}
