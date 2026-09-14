interface AppLoaderProps {
  leaving: boolean;
}

/** Brief branded splash shown on first load. Fades out via `leaving`. */
export function AppLoader({ leaving }: AppLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading Snehal's studio"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ivory transition-opacity duration-500 ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative h-16 w-16">
        <div className="loader-ring absolute inset-0 rounded-full border-4 border-cream border-t-butter-deep" />
        <span className="absolute inset-0 flex items-center justify-center text-2xl">☕</span>
      </div>
      <p className="mt-5 font-serif text-lg italic text-cocoa">Warming up the studio…</p>
    </div>
  );
}
