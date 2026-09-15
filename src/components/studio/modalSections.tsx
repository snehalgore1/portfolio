import { profile, skills, education, experience, projects } from '../../data/portfolio';
import type { SectionId } from './sections';

// Compact "quick-peek" bodies rendered inside the studio modal.
// Everything reads from the single source of truth (portfolio.ts).

function ModalHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
      <h2 className="font-serif text-2xl font-semibold text-espresso">{title}</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <ModalHeading eyebrow="About" title="A quick hello" />
      <p className="text-sm leading-relaxed text-cocoa">{profile.summary}</p>
      <div className="mt-4 space-y-3">
        {skills.slice(0, 3).map((s) => (
          <div key={s.group}>
            <p className="mb-1 text-xs font-semibold text-espresso">{s.group}</p>
            <div className="flex flex-wrap gap-1.5">
              {s.items.map((i) => (
                <span key={i} className="rounded-md bg-cream px-2 py-0.5 font-mono text-[10px] text-cocoa">{i}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-cocoa/80">
        {education[0].degree} · {education[0].school}
      </p>
    </div>
  );
}

function Experience() {
  return (
    <div>
      <ModalHeading eyebrow="Experience" title="Where I've shipped" />
      <ul className="space-y-4">
        {experience.map((job) => (
          <li key={job.company}>
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-serif text-lg text-espresso">{job.company}</p>
              <span className="font-mono text-[10px] text-cocoa/70">{job.period}</span>
            </div>
            <p className="text-xs font-semibold text-gold">{job.role}</p>
            <ul className="mt-1.5 space-y-1">
              {job.bullets.slice(0, 2).map((b, i) => (
                <li key={i} className="flex gap-2 text-xs leading-relaxed text-cocoa">
                  <span aria-hidden="true" className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-butter-deep" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Projects() {
  const featured = projects.filter((p) => p.featured);
  return (
    <div>
      <ModalHeading eyebrow="Projects" title="Selected work" />
      <ul className="space-y-3">
        {featured.map((p) => (
          <li key={p.id} className="rounded-xl bg-cream/60 p-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-butter/70 px-2 py-0.5 font-mono text-[9px] text-espresso">{p.category}</span>
              <p className="font-serif text-base text-espresso">{p.title}</p>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-cocoa">{p.tagline}</p>
            {p.outcomes[0] && (
              <p className="mt-1 font-mono text-[10px] text-sage">{p.outcomes[0]}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Resume() {
  return (
    <div>
      <ModalHeading eyebrow="Résumé" title="The one-page version" />
      <p className="text-sm leading-relaxed text-cocoa">
        Everything here, condensed and printable, never buried behind the studio.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={profile.resumeFile}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-espresso px-5 py-2.5 text-sm font-semibold text-ivory transition-transform hover:-translate-y-0.5"
        >
          View résumé
        </a>
        <a
          href={profile.resumeFile}
          download
          className="rounded-full border-2 border-espresso/25 px-5 py-2.5 text-sm font-semibold text-espresso transition-colors hover:border-espresso"
        >
          Download PDF ↓
        </a>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <ModalHeading eyebrow="Contact" title="Let's build something" />
      <p className="text-sm leading-relaxed text-cocoa">
        I'm open to AI/ML engineering roles and interesting problems. Email is fastest.
      </p>
      <div className="mt-5 flex flex-col gap-2">
        <a href={`mailto:${profile.email}`} className="rounded-full bg-butter px-5 py-2.5 text-center text-sm font-semibold text-espresso transition-transform hover:-translate-y-0.5 hover:bg-butter-deep">
          {profile.email}
        </a>
        <div className="flex gap-2">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex-1 rounded-full border-2 border-espresso/15 px-5 py-2.5 text-center text-sm font-semibold text-espresso transition-colors hover:border-gold">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="flex-1 rounded-full border-2 border-espresso/15 px-5 py-2.5 text-center text-sm font-semibold text-espresso transition-colors hover:border-gold">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export function ModalSectionBody({ id }: { id: SectionId }) {
  switch (id) {
    case 'about': return <About />;
    case 'experience': return <Experience />;
    case 'projects': return <Projects />;
    case 'resume': return <Resume />;
    case 'contact': return <Contact />;
  }
}
