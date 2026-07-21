import Image from "next/image";
import ProductsClientPage from "@/components/products/ProductsClientPage";
import { getAllProducts } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse U-LI's complete range of ISO-certified Cable Support Systems, Metal Framing Systems, and Floor Trunking Systems.",
  alternates: { canonical: "/products" },
};

const SUBCATEGORY_RENAMES: Record<string, string> = {
  "Cable Trays": "Cable Tray",
  "Cable Ladders": "Cable Ladder",
};

const ITEM_CODE_OVERRIDES: Record<string, string> = {
  "cable-trunking": "UL/TG",
};

// Categories without a finished product page yet — hidden from the listing.
const EXCLUDED_SUBCATEGORIES = new Set([
  "Threaded Rod & Hanger",
  "Conduit",
  "Strut Channel",
  "Floor Trunking",
  "Wire Mesh Tray",
]);

// Card images that match the product's inner detail page.
const CARD_IMAGES: Record<string, string> = {
  "cable-trunking": "/images/products/cable-trunking-v5.png",
};

export default async function ProductsPage() {
  const renamed = (await getAllProducts())
    .filter((p) => !EXCLUDED_SUBCATEGORIES.has(p.subcategory))
    .map((p) => ({
      ...p,
      subcategory: SUBCATEGORY_RENAMES[p.subcategory] ?? p.subcategory,
      itemNo: ITEM_CODE_OVERRIDES[p.slug] ?? p.itemNo,
      image: CARD_IMAGES[p.slug] ?? p.image,
    }));

  // Collapse multi-profile categories into a single card linking to their
  // combined product page (Cable Tray = TU/TT/TC/TR, Cable Ladder = LZ/LN/LG/LC/L6N).
  const makeCard = (subcat: string, overrides: Partial<(typeof renamed)[number]>) => {
    const first = renamed.find((p) => p.subcategory === subcat);
    return first ? { ...first, subcategory: subcat, thumbnails: [], ...overrides } : null;
  };
  const collapsed: Record<string, (typeof renamed)[number] | null> = {
    "Cable Tray": makeCard("Cable Tray", {
      slug: "cable-tray",
      name: "Cable Tray",
      itemNo: "TU · TT · TC · TR",
      image: "/images/products/cable-tray.png",
    }),
    "Cable Ladder": makeCard("Cable Ladder", {
      slug: "cable-ladder",
      name: "Cable Ladder",
      itemNo: "LZ · LN · LG · LC · L6N",
      image: "/images/products/cable-ladder.png",
    }),
  };

  const products: typeof renamed = [];
  const insertedCards = new Set<string>();
  for (const p of renamed) {
    if (p.subcategory in collapsed) {
      const card = collapsed[p.subcategory];
      if (card && !insertedCards.has(p.subcategory)) {
        products.push(card);
        insertedCards.add(p.subcategory);
      }
      continue;
    }
    products.push(p);
  }

  return (
    <>
      {/* Double-line top */}
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Hero — split layout */}
      <section className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center py-8 lg:py-10">
          {/* Left: text */}
          <div>
            <p className="font-raleway text-[11px] font-bold tracking-[0.2em] uppercase text-[#ff8905] mb-3">
              Our Products
            </p>
            <h1 className="font-typewriter text-[clamp(1.6rem,2.5vw,2.5rem)] leading-tight text-[#1A0F00] mb-4">
              Cable Support Systems.
            </h1>
            <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed max-w-[480px]">
              The Cable Support System is the foundation of any efficient electrical infrastructure.
              U‑LI manufactures a complete range of steel-based solutions engineered to perform in
              demanding environments across commercial, industrial, and infrastructure projects.
            </p>
          </div>

          {/* Right: image */}
          <div className="relative h-[300px] lg:h-[420px]">
            <Image
              src="/images/products-hero.jpg"
              alt="U-LI Cable Support Systems"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Double-line divider */}
      <div className="site-container">
        <img
          src="/images/double-line.png"
          alt=""
          aria-hidden="true"
          className="w-full block"
        />
      </div>

      {/* Sidebar + grid */}
      <ProductsClientPage products={products} />
    </>
  );
}
