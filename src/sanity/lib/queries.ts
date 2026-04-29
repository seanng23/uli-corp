import { sanityClient } from "./client";
import { products as staticProducts, type Product } from "@/data/products";

// ── Image projection helper ───────────────────────────────────────────────────
const IMAGE_PROJECTION = `{
  "asset": asset->{url, metadata { dimensions, lqip }},
  hotspot,
  crop
}`;

// ── Products ──────────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  if (!sanityClient) return staticProducts;

  try {
    const results = await sanityClient.fetch(`
      *[_type == "product"] | order(order asc) {
        "slug": slug.current,
        name,
        subcategory,
        category,
        categorySlug,
        itemNo,
        description,
        "image": image.asset->url,
        "thumbnails": thumbnails[].asset->url,
        "videoUrl": video.asset->url,
        standards,
        finishing,
        finishingColors,
        "dimensionTable": dimensionTable[] { ref, nominalSize, minThickness, maxThickness },
        dimensions,
        properties {
          materials,
          finishings,
          standards,
          components[] { ref, description },
          notes
        },
        accessories[] { no, description },
        dataSheetUrl,
        certificateUrl,
        "specs": []
      }
    `);
    return results?.length ? results : staticProducts;
  } catch (err) {
    console.error("[Sanity] getAllProducts failed, using static fallback:", err);
    return staticProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!sanityClient) return staticProducts.find((p) => p.slug === slug);

  try {
    const result = await sanityClient.fetch(`
      *[_type == "product" && slug.current == $slug][0] {
        "slug": slug.current,
        name,
        subcategory,
        category,
        categorySlug,
        itemNo,
        description,
        "image": image.asset->url,
        "thumbnails": thumbnails[].asset->url,
        "videoUrl": video.asset->url,
        standards,
        finishing,
        finishingColors,
        "dimensionTable": dimensionTable[] { ref, nominalSize, minThickness, maxThickness },
        dimensions,
        properties {
          materials,
          finishings,
          standards,
          components[] { ref, description },
          notes
        },
        accessories[] { no, description },
        dataSheetUrl,
        certificateUrl,
        "specs": []
      }
    `, { slug });
    return result ?? staticProducts.find((p) => p.slug === slug);
  } catch (err) {
    console.error("[Sanity] getProductBySlug failed, using static fallback:", err);
    return staticProducts.find((p) => p.slug === slug);
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  if (!sanityClient) return staticProducts.map((p) => p.slug);

  try {
    const results = await sanityClient.fetch(`*[_type == "product"].slug.current`);
    return results?.length ? results : staticProducts.map((p) => p.slug);
  } catch {
    return staticProducts.map((p) => p.slug);
  }
}

// ── Projects ──────────────────────────────────────────────────────────────────

export type SanityProject = {
  _id: string;
  title: string;
  slug: string;
  location: "Local" | "International";
  category: string;
  description?: string;
  client?: string;
  year?: number;
  image?: string;
  gallery?: string[];
  videoUrl?: string;
  featured?: boolean;
};

export async function getAllProjects(): Promise<SanityProject[] | null> {
  if (!sanityClient) return null;

  try {
    const results = await sanityClient.fetch(`
      *[_type == "project"] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        location,
        category,
        description,
        client,
        year,
        "image": image.asset->url,
        "gallery": gallery[].asset->url,
        "videoUrl": video.asset->url,
        featured
      }
    `);
    return results ?? null;
  } catch (err) {
    console.error("[Sanity] getAllProjects failed:", err);
    return null;
  }
}

// ── Site Settings ─────────────────────────────────────────────────────────────

export type HeroMedia = {
  key: string;
  imageUrl?: string;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  image?: unknown; // raw Sanity image for urlForImage
};

export type SiteLocation = {
  name: string;
  address: string;
  imageUrl?: string;
  image?: unknown;
  mapsUrl?: string;
};

export type SiteSettings = {
  heroes: HeroMedia[];
  sectionImages: { key: string; imageUrl?: string; videoUrl?: string; alt?: string; image?: unknown }[];
  contact?: {
    phone1?: string;
    phone2?: string;
    fax?: string;
    email?: string;
    salesEmail?: string;
    suppliesEmail?: string;
    hrEmail?: string;
    irEmail?: string;
    address?: string;
  };
  locations?: SiteLocation[];
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!sanityClient) return null;

  try {
    const result = await sanityClient.fetch(`
      *[_type == "siteSettings"][0] {
        "heroes": heroes[] {
          key,
          "imageUrl": image.asset->url,
          "image": image,
          "videoUrl": video.asset->url,
          "videoThumbnailUrl": videoThumbnail.asset->url
        },
        "sectionImages": sectionImages[] {
          key,
          "imageUrl": image.asset->url,
          "image": image,
          "videoUrl": video.asset->url,
          alt
        },
        contact,
        "locations": locations[] {
          name,
          address,
          "imageUrl": image.asset->url,
          "image": image,
          mapsUrl
        }
      }
    `);
    return result ?? null;
  } catch (err) {
    console.error("[Sanity] getSiteSettings failed:", err);
    return null;
  }
}

// Helper: find a hero by page key from settings
export function getHero(settings: SiteSettings | null, key: string): HeroMedia | undefined {
  return settings?.heroes?.find((h) => h.key === key);
}

// Helper: find a section image by key from settings
export function getSectionImage(settings: SiteSettings | null, key: string) {
  return settings?.sectionImages?.find((s) => s.key === key);
}
