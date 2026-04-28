import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";

// Returns a URL string for a Sanity image asset, with optional transforms.
// Falls back to the provided fallback string if Sanity is not configured or source is null.
export function urlForImage(
  source: SanityImageSource | null | undefined,
  fallback: string = ""
): string {
  if (!source || !sanityClient) return fallback;
  try {
    const builder = imageUrlBuilder(sanityClient);
    return builder.image(source).auto("format").fit("max").url();
  } catch {
    return fallback;
  }
}

// Convenience helper that returns a URL with explicit width, for use in Next.js Image src
export function urlForImageWidth(
  source: SanityImageSource | null | undefined,
  width: number,
  fallback: string = ""
): string {
  if (!source || !sanityClient) return fallback;
  try {
    const builder = imageUrlBuilder(sanityClient);
    return builder.image(source).width(width).auto("format").fit("max").url();
  } catch {
    return fallback;
  }
}
