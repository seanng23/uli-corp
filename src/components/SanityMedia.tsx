import Image from "next/image";

// ── SanityMedia ───────────────────────────────────────────────────────────────
// Renders either an auto-playing <video> (when videoUrl is set) or a Next.js
// <Image>. Falls back to `fallbackSrc` (a local /public path) when Sanity has
// no asset for this slot yet.
//
// fill mode  → mirrors Next/Image fill behaviour; the parent must be `relative`
// sized mode → supply width + height integers

type FillMode = { fill: true; width?: never; height?: never };
type SizedMode = { fill?: false; width: number; height: number };

type Props = (FillMode | SizedMode) & {
  /** Sanity video file URL (if uploaded). Renders <video> when present. */
  videoUrl?: string | null;
  /** Optional poster image for the video (shown before playback starts). */
  videoThumbnailUrl?: string | null;
  /** Sanity image asset URL. Used when no video is present. */
  imageUrl?: string | null;
  /** Local /public path used when Sanity has no asset yet. */
  fallbackSrc: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export default function SanityMedia({
  videoUrl,
  videoThumbnailUrl,
  imageUrl,
  fallbackSrc,
  alt,
  className = "",
  priority,
  sizes,
  fill,
  width,
  height,
}: Props) {
  // ── Video ─────────────────────────────────────────────────────────────────
  if (videoUrl) {
    // In fill mode the video needs to behave like position:absolute from Next/Image.
    // We prepend the positioning classes and let the caller's className handle
    // object-fit / object-position.
    const videoClass = fill
      ? `absolute inset-0 w-full h-full object-cover ${className}`
      : className;

    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video
        src={videoUrl}
        poster={videoThumbnailUrl ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt}
        className={videoClass.trim()}
      />
    );
  }

  // ── Image ─────────────────────────────────────────────────────────────────
  const src = imageUrl ?? fallbackSrc;

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width!}
      height={height!}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
