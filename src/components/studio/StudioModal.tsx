import { useEffect } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { ModalSectionBody } from './modalSections';
import { sectionOrder, labelFor, scrollToSection, type SectionId } from './sections';

interface StudioModalProps {
  active: SectionId;
  onClose: () => void;
  onNavigate: (id: SectionId) => void;
}

export function StudioModal({ active, onClose, onNavigate }: StudioModalProps) {
  const trapRef = useFocusTrap<HTMLDivElement>(true);
  const index = sectionOrder.indexOf(active);
  const prev = sectionOrder[(index - 1 + sectionOrder.length) % sectionOrder.length];
  const next = sectionOrder[(index + 1) % sectionOrder.length];

  // Keyboard: Esc closes, ←/→ move between sections.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); onNavigate(prev); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); onNavigate(next); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onNavigate, prev, next]);

  const seeFull = () => {
    onClose();
    // wait for the modal to unmount / scroll lock to release
    setTimeout(() => scrollToSection(active), 60);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="presentation"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div aria-hidden="true" className="absolute inset-0 bg-espresso/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease]" />

      {/* Panel */}
      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${labelFor(active)}: quick view`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-butter/60 bg-ivory shadow-[0_30px_60px_-20px_rgba(120,82,20,0.5)]"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-butter/40 bg-cream/60 px-5 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-butter-deep" />
            <span className="h-3 w-3 rounded-full bg-gold" />
            <span className="h-3 w-3 rounded-full bg-sage" />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-cocoa transition-colors hover:bg-butter/40"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body (scrolls if tall) */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
          <ModalSectionBody id={active} />
        </div>

        {/* Footer: prev/next + see full */}
        <div className="flex items-center justify-between gap-2 border-t border-butter/40 bg-cream/40 px-5 py-3">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => onNavigate(prev)}
              aria-label={`Previous: ${labelFor(prev)}`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-espresso/15 text-cocoa transition-colors hover:border-gold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(next)}
              aria-label={`Next: ${labelFor(next)}`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-espresso/15 text-cocoa transition-colors hover:border-gold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <button
            type="button"
            onClick={seeFull}
            className="rounded-full bg-butter px-4 py-2 text-xs font-semibold text-espresso transition-transform hover:-translate-y-0.5 hover:bg-butter-deep"
          >
            See full section ↓
          </button>
        </div>
      </div>
    </div>
  );
}
