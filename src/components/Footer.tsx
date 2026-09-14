import { profile } from '../data/portfolio';

export function Footer() {
  return (
    <>
      {/* Resume */}
      <section id="resume" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-butter px-6 py-12 text-center sm:px-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-espresso/70">Résumé</p>
            <h2 className="max-w-2xl font-serif text-3xl font-semibold text-espresso sm:text-4xl">
              Want the one-page version?
            </h2>
            <p className="max-w-xl text-espresso/80">
              Everything above, condensed and printable — never buried behind the studio.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={profile.resumeFile}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-ivory transition-transform hover:-translate-y-0.5"
              >
                View résumé
              </a>
              <a
                href={profile.resumeFile}
                download
                className="rounded-full border-2 border-espresso/25 px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-espresso"
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
          <h2 className="font-serif text-3xl font-semibold text-espresso sm:text-4xl">
            Let's build something
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-cocoa">
            I'm open to AI/ML engineering roles and interesting problems. The fastest way to reach me is email.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-butter px-6 py-3 text-sm font-semibold text-espresso transition-transform hover:-translate-y-0.5 hover:bg-butter-deep"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-espresso/15 px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-gold"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-espresso/15 px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-gold"
            >
              GitHub
            </a>
          </div>

          <p className="mt-12 font-mono text-xs text-cocoa/60">
            © {new Date().getFullYear()} {profile.name} · Built in a little yellow studio.
          </p>
        </div>
      </footer>
    </>
  );
}
