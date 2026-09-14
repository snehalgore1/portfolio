// The five explorable studio sections, in exploration order.
// Used by the studio scene, the modal, progress tracking, and the guided hint.
export const studioSections = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'resume', label: 'Resume', href: '#resume' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

export type SectionId = (typeof studioSections)[number]['id'];

export const sectionOrder: SectionId[] = studioSections.map((s) => s.id);

export function hrefFor(id: SectionId): string {
  return studioSections.find((s) => s.id === id)!.href;
}

export function labelFor(id: SectionId): string {
  return studioSections.find((s) => s.id === id)!.label;
}

/** Smooth-scroll to a section by id. */
export function scrollToSection(id: SectionId) {
  const el = document.querySelector(hrefFor(id));
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
