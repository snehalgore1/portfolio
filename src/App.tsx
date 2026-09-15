import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Stats } from './components/Stats';
import { Projects } from './components/Projects';
import { Personal } from './components/Personal';
import { Footer } from './components/Footer';
import { AppLoader } from './components/ui/AppLoader';
import { StudioModal } from './components/studio/StudioModal';
import { MiniTerminal } from './components/MiniTerminal';
import { sectionOrder, type SectionId } from './components/studio/sections';

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [visited, setVisited] = useState<Set<SectionId>>(new Set());
  const [activeModal, setActiveModal] = useState<SectionId | null>(null);
  const [eggUnlocked, setEggUnlocked] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [dusk, setDusk] = useState(false);

  // Intro loader - brief, and instant under reduced-motion.
  useEffect(() => {
    const hold = reduceMotion() ? 0 : 850;
    const t1 = setTimeout(() => setLeaving(true), hold);
    const t2 = setTimeout(() => setLoading(false), hold + (reduceMotion() ? 0 : 500));
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Lock background scroll while an overlay is open.
  useEffect(() => {
    const open = activeModal !== null || terminalOpen;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeModal, terminalOpen]);

  // Global shortcuts: backtick opens the hidden terminal. A window event lets
  // any component (e.g. the footer hint, the studio mug) open it too.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (e.key === '`' && !typing) {
        e.preventDefault();
        setTerminalOpen((v) => !v);
      }
    };
    const onOpen = () => setTerminalOpen(true);
    document.addEventListener('keydown', onKey);
    window.addEventListener('open-terminal', onOpen);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('open-terminal', onOpen);
    };
  }, []);

  const openModal = (id: SectionId) => {
    setActiveModal(id);
    setVisited((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  };

  // Unlock the studio's hidden terminal once every section has been explored.
  useEffect(() => {
    if (visited.size >= sectionOrder.length && !eggUnlocked) {
      setEggUnlocked(true);
      if (!reduceMotion()) {
        import('canvas-confetti').then(({ default: confetti }) => {
          const colors = ['#F4C542', '#C89B19', '#FFF8D9', '#78835A'];
          confetti({ particleCount: 90, spread: 72, origin: { y: 0.7 }, colors });
          setTimeout(() => confetti({ particleCount: 45, angle: 60, spread: 55, origin: { x: 0 }, colors }), 200);
          setTimeout(() => confetti({ particleCount: 45, angle: 120, spread: 55, origin: { x: 1 }, colors }), 350);
        });
      }
    }
  }, [visited, eggUnlocked]);

  return (
    <MotionConfig reducedMotion="user">
      {loading && <AppLoader leaving={leaving} />}

      <a href="#main" className="sr-only skip-link">Skip to main content</a>
      <Navbar dusk={dusk} />
      <main id="main">
        <Hero
          onOpen={openModal}
          visited={visited}
          easterEggUnlocked={eggUnlocked}
          onEasterEgg={() => setTerminalOpen(true)}
          dusk={dusk}
          onToggleDusk={() => setDusk((v) => !v)}
        />
        <About />
        <Experience />
        <Stats />
        <Projects />
        <Personal />
        <Footer />
      </main>

      {activeModal && (
        <StudioModal
          active={activeModal}
          onClose={() => setActiveModal(null)}
          onNavigate={openModal}
        />
      )}

      {terminalOpen && <MiniTerminal onClose={() => setTerminalOpen(false)} />}
    </MotionConfig>
  );
}
