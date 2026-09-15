import './studio.css';
import { StudioObject } from './StudioObject';
import type { SectionId } from './sections';

interface StudioProps {
  onOpen: (id: SectionId) => void;
  visited: Set<SectionId>;
  hintId: SectionId | null;
  /** Normalized pointer offset (-1..1) for parallax. */
  parallax: { x: number; y: number };
  easterEggUnlocked: boolean;
  onEasterEgg: () => void;
}

/**
 * "Snehal's Little Yellow Studio" - an art-directed workspace in three parallax
 * layers (back wall / mid desk / front objects). The notebook, folder, laptop,
 * resume, and envelope open section modals; the coffee mug is a personality
 * easter egg once every section has been explored. All of it is enhancement -
 * the Navbar and full page below are the guaranteed way to navigate.
 */
export function Studio({ onOpen, visited, hintId, parallax, easterEggUnlocked, onEasterEgg }: StudioProps) {
  const layer = (mx: number, my: number) => ({
    transform: `translate(${parallax.x * mx}px, ${parallax.y * my}px)`,
    transition: 'transform 0.2s ease-out',
  });

  return (
    <svg
      viewBox="0 0 900 600"
      className="mx-auto h-auto w-full"
      style={{ maxHeight: '40svh' }}
      role="img"
      aria-label="An illustrated yellow studio desk with a laptop, notebook, folder, resume, envelope, and a coffee mug you can explore."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffdf7" />
          <stop offset="1" stopColor="#fff2c9" />
        </linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbedc0" />
          <stop offset="1" stopColor="#f5dd9c" />
        </linearGradient>
        <linearGradient id="desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cf9a63" />
          <stop offset="1" stopColor="#b07c4d" />
        </linearGradient>
        <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe9a3" />
          <stop offset="1" stopColor="#ffe9a3" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lampGlow" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#ffe9a3" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe9a3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a322c" />
          <stop offset="1" stopColor="#2c2521" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#7a5214" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* ══ BACK LAYER - wall, sun, window, shelf ══ */}
      <g style={layer(6, 6)}>
        <rect x="-40" y="0" width="980" height="440" fill="url(#wall)" />
        <rect x="-40" y="430" width="980" height="180" fill="url(#floor)" />
        <circle cx="180" cy="150" r="160" fill="url(#sun)" className="anim-glow" />

        {/* Window */}
        <g filter="url(#soft)">
          <rect x="70" y="70" width="180" height="150" rx="10" fill="#fffdf7" stroke="#e0b02f" strokeWidth="4" />
          <rect x="80" y="80" width="160" height="130" rx="6" fill="#ffeeb0" />
          <circle cx="160" cy="120" r="26" fill="#f4c542" />
          <path d="M118 150q22-26 44 0t44 0" fill="none" stroke="#fffdf7" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
          <line x1="160" y1="70" x2="160" y2="220" stroke="#e0b02f" strokeWidth="4" />
          <line x1="70" y1="145" x2="250" y2="145" stroke="#e0b02f" strokeWidth="4" />
        </g>

        {/* Framed picture on the wall - a little sunny landscape */}
        <g transform="translate(360 96)" filter="url(#soft)">
          <rect x="0" y="0" width="120" height="92" rx="8" fill="#fffdf7" stroke="#c89b19" strokeWidth="4" />
          <rect x="10" y="10" width="100" height="72" rx="4" fill="#ffeeb0" />
          <path d="M10 70 q26 -26 50 -8 t50 -6 v16 h-100 z" fill="#9aa877" />
          <path d="M10 74 q30 -14 52 -2 t48 -4 v14 h-100 z" fill="#78835a" />
          <circle cx="34" cy="30" r="11" fill="#f4c542" />
        </g>

        {/* Wall shelf + personality flavor */}
        <g filter="url(#soft)">
          <rect x="560" y="185" width="300" height="12" rx="4" fill="#b07c4d" />
          <rect x="560" y="197" width="300" height="6" rx="3" fill="#8f6238" />
        </g>
        <g transform="translate(575 135)">
          <rect x="0" y="0" width="16" height="50" rx="2" fill="#78835a" />
          <rect x="18" y="8" width="15" height="42" rx="2" fill="#f4c542" />
          <rect x="35" y="-4" width="15" height="54" rx="2" fill="#c89b19" />
          <rect x="52" y="6" width="15" height="44" rx="2" fill="#6b4e3d" />
        </g>
        <g transform="translate(660 120)">
          <g className="anim-sway">
            <path d="M20 65C10 45 0 40 -2 20" fill="none" stroke="#78835a" strokeWidth="5" strokeLinecap="round" />
            <path d="M20 65C30 45 40 42 44 22" fill="none" stroke="#78835a" strokeWidth="5" strokeLinecap="round" />
            <path d="M20 66C20 44 20 40 20 14" fill="none" stroke="#78835a" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="-2" cy="16" rx="9" ry="14" fill="#8a9668" transform="rotate(-20 -2 16)" />
            <ellipse cx="44" cy="18" rx="9" ry="14" fill="#8a9668" transform="rotate(20 44 18)" />
            <ellipse cx="20" cy="10" rx="9" ry="15" fill="#9aa877" />
          </g>
        </g>
        <path d="M652 185 h36 l-5 -20 h-26 z" fill="#e0b02f" />
        {/* Soccer ball */}
        <g transform="translate(745 158)">
          <circle cx="0" cy="0" r="22" fill="#fffdf7" stroke="#2c2521" strokeWidth="2" />
          <path d="M0 -9 8 -3 5 7 -5 7 -8 -3Z" fill="#2c2521" />
          <path d="M0 -9 0 -22M8 -3 20 -10M5 7 14 18M-5 7 -14 18M-8 -3 -20 -10" stroke="#2c2521" strokeWidth="1.6" />
        </g>
        {/* Table-tennis paddle */}
        <g transform="translate(810 150)">
          <circle cx="0" cy="0" r="18" fill="#c0392b" stroke="#2c2521" strokeWidth="2" opacity="0.9" />
          <rect x="-4" y="16" width="8" height="20" rx="3" fill="#8f6238" />
          <circle cx="26" cy="10" r="6" fill="#fffdf7" stroke="#2c2521" strokeWidth="1.5" />
        </g>
      </g>

      {/* ══ MID LAYER - desk, lamp, floor plant ══ */}
      <g style={layer(12, 10)}>
        {/* Soft rug grounds the scene */}
        <ellipse cx="450" cy="520" rx="330" ry="40" fill="#f4c542" opacity="0.28" />
        <ellipse cx="450" cy="520" rx="250" ry="28" fill="none" stroke="#e0b02f" strokeWidth="3" opacity="0.4" />
        {/* Desk shadow on floor */}
        <ellipse cx="450" cy="470" rx="410" ry="26" fill="#7a5214" opacity="0.12" />

        {/* Desk lamp (left) with warm pool of light */}
        <g transform="translate(150 250)">
          <ellipse className="anim-lamp" cx="30" cy="175" rx="120" ry="40" fill="url(#lampGlow)" />
          <rect x="24" y="150" width="14" height="20" rx="3" fill="#6b4e3d" />
          <rect x="4" y="168" width="54" height="8" rx="4" fill="#6b4e3d" />
          <line x1="31" y1="150" x2="70" y2="90" stroke="#8f6238" strokeWidth="6" strokeLinecap="round" />
          <line x1="70" y1="90" x2="110" y2="70" stroke="#8f6238" strokeWidth="6" strokeLinecap="round" />
          <path d="M96 58 q30 4 34 34 l-44 6 z" fill="#f4c542" stroke="#e0b02f" strokeWidth="2" />
          <circle cx="112" cy="92" r="5" fill="#fff3c0" className="anim-lamp" />
        </g>

        {/* Desk */}
        <g filter="url(#soft)">
          <rect x="50" y="420" width="800" height="26" rx="8" fill="url(#desk)" />
          <rect x="50" y="446" width="800" height="16" rx="4" fill="#8f6238" />
          <rect x="120" y="462" width="20" height="92" rx="4" fill="#8f6238" />
          <rect x="760" y="462" width="20" height="92" rx="4" fill="#8f6238" />
        </g>

        {/* Floor plant */}
        <g transform="translate(70 360)">
          <g className="anim-sway">
            <path d="M30 60C14 40 8 30 6 6" fill="none" stroke="#78835a" strokeWidth="6" strokeLinecap="round" />
            <path d="M30 60C46 40 52 32 56 8" fill="none" stroke="#78835a" strokeWidth="6" strokeLinecap="round" />
            <path d="M30 62C30 36 30 28 30 0" fill="none" stroke="#78835a" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="6" cy="4" rx="11" ry="17" fill="#8a9668" transform="rotate(-22 6 4)" />
            <ellipse cx="56" cy="6" rx="11" ry="17" fill="#8a9668" transform="rotate(22 56 6)" />
            <ellipse cx="30" cy="-4" rx="11" ry="18" fill="#9aa877" />
          </g>
        </g>
        <path d="M88 420 h44 l-6 -30 h-32 z" fill="#e0b02f" />

        {/* Sleeping cat on the desk (a warm personality touch) */}
        <g transform="translate(690 398)">
          <ellipse cx="34" cy="22" rx="40" ry="16" fill="#d9a441" />
          <path d="M8 20 q-6 -10 2 -16 q6 8 10 10 z" fill="#d9a441" />
          <ellipse cx="34" cy="20" rx="30" ry="11" fill="#e6b455" />
          <circle cx="8" cy="16" r="2.2" fill="#6b4e3d" />
          <path d="M2 6 l4 8 4 -6 z" fill="#c98f38" />
          <path d="M64 24 q10 -2 8 6" fill="none" stroke="#d9a441" strokeWidth="5" strokeLinecap="round" />
          <path d="M18 18 q-6 1 -10 0 M18 22 q-6 2 -10 2" stroke="#6b4e3d" strokeWidth="0.8" opacity="0.6" />
        </g>
      </g>

      {/* ══ FRONT LAYER - interactive desk objects ══ */}
      <g style={layer(20, 15)}>
        {/* Notebook → About */}
        <StudioObject
          label="About: my story and interests"
          tag="About"
          tagX={195}
          tagY={368}
          box={{ x: 140, y: 378, w: 124, h: 52 }}
          visited={visited.has('about')}
          hint={hintId === 'about'}
          onActivate={() => onOpen('about')}
        >
          <g transform="translate(150 392) rotate(-4)">
            <rect x="0" y="0" width="110" height="30" rx="4" fill="#fff8d9" stroke="#c89b19" strokeWidth="2" />
            <rect x="0" y="-6" width="110" height="30" rx="4" fill="#fffdf7" stroke="#e0b02f" strokeWidth="2" />
            <line x1="12" y1="-2" x2="98" y2="-2" stroke="#e7d6a0" strokeWidth="2" />
            <line x1="12" y1="5" x2="90" y2="5" stroke="#e7d6a0" strokeWidth="2" />
            <line x1="12" y1="12" x2="70" y2="12" stroke="#e7d6a0" strokeWidth="2" />
            <circle cx="55" cy="-6" r="4" fill="#f4c542" />
          </g>
        </StudioObject>

        {/* Envelope → Contact */}
        <StudioObject
          label="Contact: email, LinkedIn, GitHub"
          tag="Contact"
          tagX={330}
          tagY={380}
          box={{ x: 280, y: 392, w: 100, h: 70 }}
          visited={visited.has('contact')}
          hint={hintId === 'contact'}
          onActivate={() => onOpen('contact')}
        >
          <g transform="translate(285 396)">
            <rect x="0" y="0" width="90" height="60" rx="6" fill="#fffdf7" stroke="#c89b19" strokeWidth="2" />
            <path d="M0 2 L45 32 L90 2 L90 8 L45 38 L0 8 Z" fill="#f4c542" />
            <circle cx="45" cy="20" r="7" fill="#c0392b" opacity="0.85" />
          </g>
        </StudioObject>

        {/* Laptop → Projects */}
        <StudioObject
          label="Projects: my technical work"
          tag="Projects"
          tagX={455}
          tagY={278}
          box={{ x: 332, y: 296, w: 244, h: 150 }}
          visited={visited.has('projects')}
          hint={hintId === 'projects'}
          onActivate={() => onOpen('projects')}
        >
          <g transform="translate(360 300)">
            <rect x="0" y="0" width="190" height="120" rx="10" fill="#2c2521" />
            <rect x="8" y="8" width="174" height="104" rx="6" fill="url(#screen)" />
            <g className="anim-glow">
              <rect x="20" y="22" width="70" height="8" rx="4" fill="#f4c542" />
              <rect x="20" y="38" width="110" height="6" rx="3" fill="#78835a" />
              <rect x="34" y="52" width="90" height="6" rx="3" fill="#c89b19" />
              <rect x="34" y="66" width="70" height="6" rx="3" fill="#6b4e3d" />
              <rect x="20" y="80" width="120" height="6" rx="3" fill="#fff8d9" opacity="0.5" />
              <rect x="20" y="94" width="50" height="6" rx="3" fill="#f4c542" />
            </g>
            <path d="M-14 120 H204 L214 138 H-24 Z" fill="#cf9a63" />
            <rect x="-24" y="136" width="238" height="6" rx="3" fill="#8f6238" />
          </g>
        </StudioObject>

        {/* Coffee mug - easter egg (clickable once everything explored) */}
        <g
          className={easterEggUnlocked ? 'studio-obj' : ''}
          role={easterEggUnlocked ? 'button' : undefined}
          tabIndex={easterEggUnlocked ? 0 : undefined}
          aria-label={easterEggUnlocked ? 'A little surprise: open the recipe card' : undefined}
          onClick={easterEggUnlocked ? onEasterEgg : undefined}
          onKeyDown={
            easterEggUnlocked
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onEasterEgg();
                  }
                }
              : undefined
          }
        >
          <g className="studio-obj-body">
            <g transform="translate(585 388)">
              <g className="anim-steam">
                <path d="M14 -6 q6 -8 0 -16" fill="none" stroke="#d9c48a" strokeWidth="3" strokeLinecap="round" />
                <path d="M26 -6 q-6 -8 0 -16" fill="none" stroke="#d9c48a" strokeWidth="3" strokeLinecap="round" />
              </g>
              <rect x="4" y="4" width="34" height="32" rx="6" fill="#f4c542" />
              <rect x="4" y="4" width="34" height="9" rx="4" fill="#e0b02f" />
              <path d="M38 12 q14 2 0 18" fill="none" stroke="#e0b02f" strokeWidth="5" />
              {easterEggUnlocked && <text x="46" y="0" fontSize="16">✨</text>}
            </g>
          </g>
        </g>

        {/* Folder → Experience */}
        <StudioObject
          label="Experience: where I've worked"
          tag="Experience"
          tagX={685}
          tagY={368}
          box={{ x: 628, y: 386, w: 118, h: 74 }}
          visited={visited.has('experience')}
          hint={hintId === 'experience'}
          onActivate={() => onOpen('experience')}
        >
          <g transform="translate(635 392) rotate(3)">
            <path d="M0 6 H40 L48 0 H96 A6 6 0 0 1 102 6 V56 A6 6 0 0 1 96 62 H6 A6 6 0 0 1 0 56 Z" fill="#e0b02f" />
            <rect x="8" y="14" width="94" height="44" rx="5" fill="#fff8d9" />
            <path d="M0 6 H40 L48 0 H96 A6 6 0 0 1 102 6 V16 H0 Z" fill="#f4c542" />
            <line x1="18" y1="28" x2="92" y2="28" stroke="#c89b19" strokeWidth="2" />
            <line x1="18" y1="38" x2="80" y2="38" stroke="#c89b19" strokeWidth="2" />
            <line x1="18" y1="48" x2="70" y2="48" stroke="#c89b19" strokeWidth="2" />
          </g>
        </StudioObject>

        {/* Resume → Resume */}
        <StudioObject
          label="Resume: view and download"
          tag="Resume"
          tagX={800}
          tagY={314}
          box={{ x: 754, y: 330, w: 92, h: 98 }}
          visited={visited.has('resume')}
          hint={hintId === 'resume'}
          onActivate={() => onOpen('resume')}
        >
          <g transform="translate(760 336)">
            <rect x="0" y="0" width="80" height="86" rx="6" fill="#fffdf7" stroke="#c89b19" strokeWidth="2" />
            <circle cx="20" cy="18" r="8" fill="#f4c542" />
            <rect x="34" y="12" width="36" height="5" rx="2.5" fill="#6b4e3d" />
            <rect x="34" y="22" width="26" height="4" rx="2" fill="#c89b19" />
            <line x1="12" y1="40" x2="68" y2="40" stroke="#e7d6a0" strokeWidth="3" />
            <line x1="12" y1="50" x2="68" y2="50" stroke="#e7d6a0" strokeWidth="3" />
            <line x1="12" y1="60" x2="68" y2="60" stroke="#e7d6a0" strokeWidth="3" />
            <line x1="12" y1="70" x2="50" y2="70" stroke="#e7d6a0" strokeWidth="3" />
            <path d="M60 62 l14 14 -2 6 -6 -2 -14 -14 z" fill="#78835a" />
          </g>
        </StudioObject>
      </g>
    </svg>
  );
}
