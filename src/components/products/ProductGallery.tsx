"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryImage = string | { src: string; alt: string };

type Props = {
  images: GalleryImage[];
  active: number;
  onChange: (index: number) => void;
  /** Alt text used when `images` are plain URLs. */
  alt?: string;
  fit?: "cover" | "contain";
  mainSizes?: string;
  className?: string;
  /** Extra overlays for the main image (e.g. a logo badge). */
  children?: React.ReactNode;
};

/**
 * Product image gallery shared by every product page.
 * Desktop: thumbnail strip on the left, square main image on the right.
 * Mobile: square main image only, with previous / next arrows and position dots (Shopee style).
 */
export default function ProductGallery({ images, active, onChange, alt = "Product image", fit = "cover", mainSizes = "(max-width:1024px) 100vw, 50vw", className = "", children }: Props) {
  const items = images.map((img, i) =>
    typeof img === "string" ? { src: img, alt, thumbAlt: `${alt} thumbnail ${i + 1}` } : { src: img.src, alt: img.alt, thumbAlt: img.alt },
  );
  const count = items.length;
  const index = Math.min(Math.max(active, 0), Math.max(count - 1, 0));
  const current = items[index];
  const fitClass = fit === "contain" ? "object-contain object-center" : "object-cover object-center";
  const arrowClass = "lg:hidden absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#1A0F00]/80 text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform";

  if (!current) return null;

  return (
    <div className={`flex flex-col-reverse lg:flex-row gap-3 lg:gap-4 items-start ${className}`}>
      {/* Desktop-only thumbnail strip */}
      <div className="hidden lg:flex lg:flex-col gap-3 lg:w-[104px] lg:shrink-0">
        {items.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            onClick={() => onChange(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative aspect-square w-full overflow-hidden rounded-lg border transition-colors cursor-pointer ${index === i ? "border-[#ff8905] border-2" : "border-[#1A0F00]/20 hover:border-[#1A0F00]/40"}`}
          >
            <Image src={img.src} alt={img.thumbAlt} fill className={fitClass} sizes="104px" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className={`relative w-full lg:flex-1 aspect-square overflow-hidden rounded-2xl border border-[#1A0F00]/20 ${fit === "contain" ? "bg-white" : ""}`}>
        <Image src={current.src} alt={current.alt} fill priority className={fitClass} sizes={mainSizes} />
        {children}
        {count > 1 && (
          <>
            <button type="button" aria-label="Previous image" onClick={() => onChange((index - 1 + count) % count)} className={`${arrowClass} left-3`}>
              <ChevronLeft size={26} strokeWidth={2.5} />
            </button>
            <button type="button" aria-label="Next image" onClick={() => onChange((index + 1) % count)} className={`${arrowClass} right-3`}>
              <ChevronRight size={26} strokeWidth={2.5} />
            </button>
            <div className="lg:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {items.map((_, i) => (
                <span key={i} className={`w-2 h-2 rounded-full ${i === index ? "bg-[#ff8905]" : "bg-white/90 border border-[#1A0F00]/30"}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
