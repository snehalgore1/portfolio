import { useState, useEffect } from 'react';
import { profile, nav } from '../data/portfolio';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ivory/85 backdrop-blur border-b border-butter/40' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="font-serif text-xl font-semibold text-espresso tracking-tight"
        >
          {profile.name}
          <span className="ml-2 hidden align-middle text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-gold sm:inline">
            {profile.role}
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-cocoa transition-colors hover:bg-cream hover:text-espresso"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resumeFile}
              className="ml-2 rounded-full bg-butter px-5 py-2 text-sm font-semibold text-espresso shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-butter-deep"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-espresso hover:bg-cream md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-butter/40 bg-ivory/95 backdrop-blur md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-cocoa hover:bg-cream hover:text-espresso"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={profile.resumeFile}
                onClick={() => setOpen(false)}
                className="block rounded-full bg-butter px-5 py-3 text-center text-base font-semibold text-espresso"
              >
                View Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
