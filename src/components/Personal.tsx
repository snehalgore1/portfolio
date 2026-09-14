import { personal } from '../data/portfolio';

const icons: Record<string, React.ReactNode> = {
  soccer: (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      <circle cx="20" cy="20" r="17" fill="#fffdf7" stroke="#2c2521" strokeWidth="2" />
      <path d="M20 12 27 17 24 26 16 26 13 17Z" fill="#2c2521" />
      <path d="M20 12V4M27 17l7-4M24 26l6 7M16 26l-6 7M13 17l-7-4" stroke="#2c2521" strokeWidth="1.4" />
    </svg>
  ),
  pingpong: (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      <circle cx="17" cy="16" r="13" fill="#c0392b" stroke="#2c2521" strokeWidth="2" />
      <rect x="13" y="27" width="8" height="12" rx="3" fill="#8f6238" />
      <circle cx="33" cy="10" r="4.5" fill="#fffdf7" stroke="#2c2521" strokeWidth="1.5" />
    </svg>
  ),
  pickleball: (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      <rect x="6" y="4" width="22" height="26" rx="10" fill="#f4c542" stroke="#2c2521" strokeWidth="2" />
      <rect x="14" y="28" width="6" height="10" rx="2.5" fill="#8f6238" />
      <circle cx="32" cy="20" r="5" fill="#fffdf7" stroke="#2c2521" strokeWidth="1.5" />
      <circle cx="30" cy="18" r="0.9" fill="#2c2521" /><circle cx="34" cy="18" r="0.9" fill="#2c2521" />
      <circle cx="32" cy="22" r="0.9" fill="#2c2521" /><circle cx="30" cy="21" r="0.9" fill="#2c2521" />
    </svg>
  ),
};

export function Personal() {
  return (
    <section aria-labelledby="personal-heading" className="bg-cream/50 py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="rounded-3xl border border-butter/50 bg-ivory p-8 sm:p-10">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-sage">Off the clock</p>
          <h2 id="personal-heading" className="font-serif text-2xl font-semibold text-espresso sm:text-3xl">
            {personal.heading}
          </h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <ul className="grid gap-4 sm:grid-cols-3">
              {personal.sports.map((s) => (
                <li key={s.label} className="flex items-center gap-3 rounded-xl bg-cream/70 p-4">
                  <span className="flex-shrink-0">{icons[s.icon]}</span>
                  <span>
                    <span className="block font-serif text-lg text-espresso">{s.label}</span>
                    <span className="block text-xs text-cocoa">{s.note}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Cooking, styled like a little recipe card */}
            <div className="relative rounded-xl bg-cream/70 p-5 ring-1 ring-butter/40">
              <div className="mb-2 flex items-center gap-2">
                <span aria-hidden="true" className="text-lg">🍳</span>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-gold">Recipe card</span>
              </div>
              <p className="text-sm leading-relaxed text-cocoa">{personal.cooking}</p>
              <span aria-hidden="true" className="absolute -right-1 -top-2 rotate-12 text-xl">📌</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
