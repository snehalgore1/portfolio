import { profile, avatars } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import { Avatar } from './Avatar';

export function About() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="scroll-mt-20 bg-cream/50 py-24 sm:py-36">
      <div ref={ref} className={`reveal ${shown ? 'reveal-in' : ''} mx-auto grid max-w-5xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.5fr_1fr]`}>
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-gold">About</p>
          <h2 className="font-serif text-[2rem] font-semibold leading-[1.08] text-espresso sm:text-5xl">
            A real person behind the terminal
          </h2>
          <div className="mt-6 space-y-4">
            {profile.aboutParagraphs.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-cocoa">{para}</p>
            ))}
          </div>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-1.5 font-mono text-xs text-cocoa ring-1 ring-matcha/40">
            <span className="h-1.5 w-1.5 rounded-full bg-matcha-deep" />
            {profile.nowNote}
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Avatar src={avatars.about} alt="Snehal with a matcha latte" size={180} caption="matcha in hand ☕→🍵" />
        </div>
      </div>
    </section>
  );
}
