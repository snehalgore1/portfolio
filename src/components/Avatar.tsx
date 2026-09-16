interface AvatarProps {
  /** Image path (e.g. `${import.meta.env.BASE_URL}avatars/about.png`). Empty = placeholder. */
  src?: string;
  alt: string;
  /** Pixel diameter. */
  size?: number;
  /** Small caption shown under the avatar. */
  caption?: string;
  className?: string;
}

/**
 * A situational avatar. Renders the provided illustration in a soft matcha
 * ring, or a branded monogram placeholder until the image is dropped in.
 */
export function Avatar({ src, alt, size = 128, caption, className = '' }: AvatarProps) {
  return (
    <figure className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        className="relative grid place-items-center rounded-full ring-4 ring-matcha/30"
        style={{ width: size, height: size }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            width={size}
            height={size}
            loading="lazy"
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div
            aria-label={alt}
            role="img"
            className="grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-matcha/40 via-cream to-butter/60"
          >
            <span className="font-serif font-semibold text-espresso/70" style={{ fontSize: size * 0.34 }}>
              SG
            </span>
            <span className="absolute right-2 top-2 text-sm" aria-hidden="true">🍵</span>
          </div>
        )}
      </div>
      {caption && <figcaption className="font-mono text-[11px] text-cocoa/70">{caption}</figcaption>}
    </figure>
  );
}
