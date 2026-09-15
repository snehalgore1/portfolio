import { useState, useEffect } from 'react';
import { profile, nav } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTION_IDS = nav.map((n) => n.href.replace('#', ''));

export function Navbar({ dusk = false }: { dusk?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  // Over the dark dusk hero (before the bar gets its light glass), flip to light text.
  const dark = dusk && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-butter/30 bg-ivory/70 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className={`group flex items-baseline gap-2 font-serif text-xl font-semibold tracking-tight transition-colors duration-500 ${
            dark ? 'text-ivory' : 'text-espresso'
          }`}
        >
          {profile.name}
          <span className="hidden text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-gold sm:inline">
            {profile.role}
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => {
            const isActive = active === item.href.replace('#', '');
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    dark
                      ? isActive ? 'text-ivory' : 'text-cream/70 hover:text-ivory'
                      : isActive ? 'text-espresso' : 'text-cocoa hover:text-espresso'
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 -z-10 rounded-full ${dark ? 'bg-white/15' : 'bg-butter/25'}`}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={profile.resumeFile}
              className={`ml-2 rounded-full px-5 py-2 text-sm font-semibold shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:brightness-110 ${
                dark ? 'bg-butter text-espresso' : 'bg-espresso text-ivory'
              }`}
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden ${
            dark ? 'text-ivory hover:bg-white/10' : 'text-espresso hover:bg-cream'
          }`}
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
        <div id="mobile-menu" className="border-t border-butter/30 bg-ivory/95 backdrop-blur-xl md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {nav.map((item) => {
              const isActive = active === item.href.replace('#', '');
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                      isActive ? 'bg-butter/20 text-espresso' : 'text-cocoa hover:bg-cream hover:text-espresso'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li className="pt-2">
              <a
                href={profile.resumeFile}
                onClick={() => setOpen(false)}
                className="block rounded-full bg-espresso px-5 py-3 text-center text-base font-semibold text-ivory"
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
