import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { profile, projects, experience, skills, personal } from '../data/portfolio';

interface Line {
  type: 'in' | 'out' | 'sys';
  text: string;
}

const BANNER: Line[] = [
  { type: 'sys', text: "snehal@studio:~$ welcome to the little yellow terminal" },
  { type: 'sys', text: "type 'help' to see what you can do. press Esc to close." },
];

interface MiniTerminalProps {
  onClose: () => void;
}

export function MiniTerminal({ onClose }: MiniTerminalProps) {
  const trapRef = useFocusTrap<HTMLDivElement>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const print = (out: Line[]) => setLines((prev) => [...prev, ...out]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const [name] = cmd.toLowerCase().split(/\s+/);
    const echo: Line = { type: 'in', text: `snehal@studio:~$ ${cmd}` };

    if (!cmd) {
      print([echo]);
      return;
    }

    const out: Line[] = [echo];

    switch (name) {
      case 'help':
        out.push(
          { type: 'out', text: 'available commands:' },
          { type: 'out', text: '  whoami        who is this' },
          { type: 'out', text: '  ls            list what lives here' },
          { type: 'out', text: '  about         the short story' },
          { type: 'out', text: '  skills        languages & tools' },
          { type: 'out', text: '  projects      what I have built' },
          { type: 'out', text: '  experience    where I have worked' },
          { type: 'out', text: '  contact       how to reach me' },
          { type: 'out', text: '  resume        open my resume' },
          { type: 'out', text: '  fun           life outside the terminal' },
          { type: 'out', text: '  matcha        essential' },
          { type: 'out', text: '  clear         wipe the screen' },
        );
        break;
      case 'whoami':
        out.push({ type: 'out', text: `${profile.name} · ${profile.role} · ${profile.location}` });
        break;
      case 'ls':
        out.push({ type: 'out', text: 'about.txt   experience/   projects/   skills.txt   contact.txt   resume.pdf' });
        break;
      case 'about':
      case 'cat':
        out.push({ type: 'out', text: profile.summary });
        break;
      case 'skills':
        skills.forEach((g) => out.push({ type: 'out', text: `${g.group.padEnd(14)} ${g.items.join(', ')}` }));
        break;
      case 'projects':
        projects.forEach((p) => out.push({ type: 'out', text: `• ${p.title} — ${p.tagline}` }));
        out.push({ type: 'sys', text: 'tip: scroll up to the Projects section for full case studies.' });
        break;
      case 'experience':
        experience.forEach((e) =>
          out.push({ type: 'out', text: `${e.company} — ${e.role} (${e.period})` }),
        );
        break;
      case 'contact':
        out.push(
          { type: 'out', text: `email:    ${profile.email}` },
          { type: 'out', text: `linkedin: ${profile.linkedin}` },
          { type: 'out', text: `github:   ${profile.github}` },
        );
        break;
      case 'resume':
        out.push({ type: 'sys', text: 'opening resume…' });
        window.open(profile.resumeFile, '_blank');
        break;
      case 'fun':
      case 'sports':
        personal.sports.forEach((s) => out.push({ type: 'out', text: `• ${s.label} (${s.note})` }));
        out.push({ type: 'out', text: `• ${personal.cooking}` });
        break;
      case 'matcha':
      case 'coffee':
        out.push(
          { type: 'out', text: '      ( (' },
          { type: 'out', text: '       ) )' },
          { type: 'out', text: '    ........' },
          { type: 'out', text: '    | 🍵   |]' },
          { type: 'out', text: '    \\      /' },
          { type: 'out', text: "     `----'   always matcha." },
        );
        break;
      case 'sudo':
        out.push({ type: 'sys', text: "nice try. you already have all the access you need :)" });
        break;
      case 'clear':
        setLines([]);
        return;
      case 'exit':
      case 'close':
        onClose();
        return;
      default:
        out.push({ type: 'sys', text: `command not found: ${name}. type 'help'.` });
    }
    print(out);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(value);
      if (value.trim()) {
        setHistory((h) => [...h, value.trim()]);
      }
      setHistIdx(-1);
      setValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length) {
        const idx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(idx);
        setValue(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx >= 0) {
        const idx = histIdx + 1;
        if (idx >= history.length) {
          setHistIdx(-1);
          setValue('');
        } else {
          setHistIdx(idx);
          setValue(history[idx]);
        }
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" role="presentation" onClick={onClose}>
      <div aria-hidden="true" className="absolute inset-0 bg-espresso/50 backdrop-blur-sm" />
      <motion.div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mini terminal"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex h-[420px] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-espresso/40 bg-[#211c19] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#2c2521] px-4 py-2.5">
          <button type="button" onClick={onClose} aria-label="Close terminal" className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
          <span className="ml-2 font-mono text-xs text-white/50">snehal — zsh</span>
        </div>

        {/* Output */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed">
          {lines.map((l, i) => (
            <p
              key={i}
              className={`whitespace-pre-wrap break-words ${
                l.type === 'in' ? 'text-butter' : l.type === 'sys' ? 'text-sage' : 'text-[#e6ddcf]'
              }`}
            >
              {l.text}
            </p>
          ))}
          {/* Input line */}
          <div className="mt-1 flex items-center gap-2">
            <span aria-hidden="true" className="text-butter">snehal@studio:~$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
              className="flex-1 bg-transparent font-mono text-[13px] text-[#e6ddcf] caret-butter outline-none"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
