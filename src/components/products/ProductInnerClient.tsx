"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, FileText, Award, ShoppingBag, CheckCircle } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/cart/CartProvider";
import { generateItemId } from "@/lib/cart-store";

type Props = { product: Product };

const FINISH_CUSTOM = "Others / Custom Finishing";
function normalizeFinishing(list: string[] = []): string[] {
  const expanded = list.flatMap((f) =>
    f === "Stainless Steel 304 / 316"
      ? ["Stainless Steel 304", "Stainless Steel 316"]
      : f === "Others/ Custom Sizes"
        ? [FINISH_CUSTOM]
        : [f]
  );
  const custom = expanded.filter((f) => f === FINISH_CUSTOM);
  const rest = expanded.filter((f) => f !== FINISH_CUSTOM).sort((a, b) => a.localeCompare(b));
  return [...rest, ...custom];
}
function normalizeStandards(list: string[] = []): string[] {
  const renamed = list.map((s) => (s === "Others/Custom" ? "Others" : s));
  const others = renamed.filter((s) => s === "Others");
  const rest = renamed.filter((s) => s !== "Others").sort((a, b) => a.localeCompare(b));
  return [...rest, ...others];
}

function CollapsibleSection({
  id,
  title,
  children,
  defaultOpen = false,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div id={id} className="border-t border-[#1A0F00]/20 scroll-mt-24">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span className="font-raleway text-[13px] font-bold uppercase tracking-widest text-[#1A0F00]">
          {title}
        </span>
        {open ? (
          <ChevronUp size={16} strokeWidth={2.5} className="text-[#1A0F00] flex-shrink-0" />
        ) : (
          <ChevronDown size={16} strokeWidth={2.5} className="text-[#1A0F00] flex-shrink-0" />
        )}
      </button>
      {open && <div className="pb-6">{children}</div>}
    </div>
  );
}

export default function ProductInnerClient({ product }: Props) {
  const { addToCart } = useCart();

  const PLACEHOLDER = "/images/products/placeholder.png";
  const MAIN_IMAGES: Record<string, string> = {
    "cable-trunking": "/images/products/cable-trunking.png",
  };
  const mainImage = MAIN_IMAGES[product.slug] ?? product.image ?? PLACEHOLDER;
  const allImages = [mainImage, ...(product.thumbnails ?? [])].filter(Boolean) as string[];
  // Fill all four thumbnail slots — duplicate the main image into empty slots
  const galleryImages = Array.from({ length: 4 }, (_, i) => allImages[i] ?? allImages[0]);
  // Main images that already include the U-LI badge baked in (skip the overlay badge)
  const BADGED_MAIN = new Set(["cable-trunking"]);
  const showBadgeOverlay = !BADGED_MAIN.has(product.slug);

  const ITEM_CODES: Record<string, string> = { "cable-trunking": "UL/TG" };
  const itemCode = ITEM_CODES[product.slug] ?? product.itemNo;

  const TITLE_ICONS: Record<string, string> = {
    "cable-trunking": "/images/products/icon-cable-trunking.png",
  };
  const titleIcon = TITLE_ICONS[product.slug];

  const DIM_OVERRIDES: Record<string, { length?: number[]; thickness?: number[] }> = {
    "cable-trunking": {
      length: [2440, 3000],
      thickness: [0.6, 0.8, 1.0, 1.2, 1.5, 2.0, 2.5],
    },
  };
  const dims = product.dimensions
    ? { ...product.dimensions, ...(DIM_OVERRIDES[product.slug] ?? {}) }
    : product.dimensions;
  const lengthLabel = dims?.length
    ? dims.length.length === 2
      ? `${dims.length[0]}mm or ${dims.length[1]}mm`
      : `${dims.length[0]}–${dims.length[dims.length.length - 1]}mm`
    : null;
  const standards = (product.standards ?? []).map((s) =>
    s === "Others/Custom" ? "Others" : s
  );
  const finishing = normalizeFinishing(product.finishing ?? []);
  const [activeImage, setActiveImage] = useState(0);

  const [selectedStandard, setSelectedStandard] = useState<string>(standards[0] ?? "");
  const [selectedDimensions, setSelectedDimensions] = useState<Record<string, string>>({});
  const [selectedFinishing, setSelectedFinishing] = useState<string>(finishing[0] ?? "");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [certOpen, setCertOpen] = useState(false);

  function handleAddToCart() {
    const specs: Record<string, string> = {
      ...selectedDimensions,
      Standard: selectedStandard,
      Finishing: selectedFinishing,
    };
    if (selectedColor) specs["Finishing Color"] = selectedColor;
    const id = generateItemId(product.slug, specs);
    addToCart({
      id,
      productName: product.name,
      category: product.category,
      specs,
      quantity: qty,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="site-container pt-5 pb-2">
        <nav className="flex items-center gap-2 font-raleway text-[12px] text-[#5C4A30]">
          <Link href="/" className="hover:text-[#ff8905] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#ff8905] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#1A0F00] font-semibold">{product.name}</span>
        </nav>
      </div>

      {/* Top divider */}
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Two-column layout */}
      <div className="site-container py-10 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_540px] gap-10 lg:gap-14 items-start">

        {/* LEFT — image gallery + collapsible sections */}
        <div>
          {/* Image gallery — thumbnails left, main image right */}
          <div className="mb-10 flex gap-4 items-start">
            {/* Thumbnails — vertical strip on the left */}
            <div className="flex flex-col gap-3 w-[104px] shrink-0">
              {galleryImages.map((img, i) => {
                const isActive = activeImage === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`relative aspect-square w-full overflow-hidden rounded-lg border transition-colors cursor-pointer ${
                      isActive
                        ? "border-[#ff8905] border-2"
                        : "border-[#1A0F00]/20 hover:border-[#1A0F00]/40"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      fill
                      className="object-cover object-center"
                      sizes="80px"
                    />
                  </button>
                );
              })}
            </div>

            {/* Main image — rounded bordered box (transparent bg) with U-LI logo badge */}
            <div className="relative flex-1 aspect-square overflow-hidden rounded-2xl border border-[#1A0F00]/20">
              <Image
                src={galleryImages[activeImage]}
                alt={product.name}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              {showBadgeOverlay && (
                <Image
                  src="/images/products/logo-badge.png"
                  alt="United U-Li Corporation Berhad"
                  width={254}
                  height={223}
                  className="absolute top-5 left-5 w-[92px] h-auto drop-shadow-md"
                />
              )}
            </div>
          </div>

          {/* Collapsible sections */}
          <CollapsibleSection id="description" title="Description" defaultOpen>
            <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed">
              {product.description}
            </p>
          </CollapsibleSection>

          {product.properties && (
            <CollapsibleSection id="properties" title="Properties">
              <div className="space-y-5">
                {product.properties.finishings && (
                  <div>
                    <p className="font-raleway text-[12px] font-bold uppercase tracking-widest text-[#1A0F00] mb-2">
                      Finishing Options
                    </p>
                    <ul className="space-y-1">
                      {normalizeFinishing(product.properties.finishings).map((f) => (
                        <li key={f} className="font-raleway text-[14px] text-[#5C4A30] flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#ff8905] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.properties.standards && (
                  <div>
                    <p className="font-raleway text-[12px] font-bold uppercase tracking-widest text-[#1A0F00] mb-2">
                      Applicable Standards
                    </p>
                    <ul className="space-y-1">
                      {normalizeStandards(product.properties.standards).map((s) => (
                        <li key={s} className="font-raleway text-[14px] text-[#5C4A30] flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#ff8905] flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.dimensionTable && product.dimensionTable.length > 0 && (
                  <div>
                    <p className="font-raleway text-[12px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">
                      Available Dimensions (mm)
                    </p>
                    <table className="w-full text-left border border-[#1A0F00]/20">
                      <thead>
                        <tr className="bg-[#1A0F00]/5">
                          <th className="font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-1.5 border-b border-[#1A0F00]/20">Components Reference</th>
                          <th className="font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-1.5 border-b border-[#1A0F00]/20">Nominal Size (mm) H (Height) X W (Width)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.dimensionTable.map((row, i) => (
                          <tr key={i} className={i % 2 === 1 ? "bg-[#1A0F00]/[0.03]" : ""}>
                            <td className="font-raleway text-[13px] text-[#5C4A30] px-3 py-1.5 border-b border-[#1A0F00]/10">{row.ref ?? "—"}</td>
                            <td className="font-raleway text-[13px] text-[#5C4A30] px-3 py-1.5 border-b border-[#1A0F00]/10">{row.nominalSize ?? "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {product.properties.notes && (
                  <p className="font-raleway text-[14px] text-[#5C4A30] leading-relaxed whitespace-pre-line">
                    {product.properties.notes}
                  </p>
                )}
              </div>
            </CollapsibleSection>
          )}

          {product.accessories && product.accessories.length > 0 && (
            <CollapsibleSection id="accessories" title="Accessories">
              <table className="w-full text-left border border-[#1A0F00]/20">
                <thead>
                  <tr className="bg-[#1A0F00]/5">
                    <th className="font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20 w-[60px]">
                      No.
                    </th>
                    <th className="font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.accessories.map((a, i) => (
                    <tr key={a.no} className={i % 2 === 1 ? "bg-[#1A0F00]/[0.03]" : ""}>
                      <td className="font-raleway text-[13px] text-[#5C4A30] px-3 py-2 border-b border-[#1A0F00]/10">
                        {a.no}
                      </td>
                      <td className="font-raleway text-[13px] text-[#5C4A30] px-3 py-2 border-b border-[#1A0F00]/10">
                        {a.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CollapsibleSection>
          )}
        </div>

        {/* RIGHT — configurator panel */}
        <div>
          <div className="border border-white/40 p-6 bg-white/15 rounded-2xl shadow-[0_8px_30px_rgba(26,15,0,0.12)]">
            {/* Product name */}
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-typewriter text-[clamp(1.4rem,2vw,1.9rem)] leading-tight text-[#1A0F00]">
                {product.name}
              </h1>
              {titleIcon && (
                <Image
                  src={titleIcon}
                  alt=""
                  aria-hidden="true"
                  width={141}
                  height={81}
                  className="w-[56px] h-auto shrink-0"
                />
              )}
            </div>

            {/* Item No */}
            {itemCode && (
              <p className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#5C4A30] mb-5">
                Item No: <span className="text-[#1A0F00]">{itemCode}</span>
              </p>
            )}

            {/* Dimension range summary */}
            {dims && (
              <div className="mb-5 pb-5 border-b border-[#1A0F00]/15">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {dims.height && (
                    <span className="font-raleway text-[12px] text-[#5C4A30]">
                      H: {dims.height[0]}–{dims.height[dims.height.length - 1]}mm
                    </span>
                  )}
                  {dims.width && (
                    <span className="font-raleway text-[12px] text-[#5C4A30]">
                      W: {dims.width[0]}–{dims.width[dims.width.length - 1]}mm
                    </span>
                  )}
                  {lengthLabel && (
                    <span className="font-raleway text-[12px] text-[#5C4A30]">
                      L: {lengthLabel}
                    </span>
                  )}
                  {dims.thickness && (
                    <span className="font-raleway text-[12px] text-[#5C4A30]">
                      T: {dims.thickness[0]}–{dims.thickness[dims.thickness.length - 1]}mm
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Standard pills */}
            {standards.length > 0 && (
              <div className="mb-5">
                <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">
                  Standard
                </p>
                <div className="flex flex-wrap gap-2">
                  {standards.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedStandard(s)}
                      className={`px-3 py-1.5 rounded-md font-raleway text-[11px] font-semibold border transition-all duration-150 ${
                        selectedStandard === s
                          ? "bg-[#ff8905] border-[#ff8905] text-white"
                          : "bg-transparent border-[#1A0F00]/40 text-[#1A0F00] hover:border-[#1A0F00]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dimension dropdowns */}
            {dims && (
              <div className="mb-5 grid grid-cols-2 gap-3">
                {dims.height && (
                  <div>
                    <label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">
                      Height (mm)
                    </label>
                    <select
                      value={selectedDimensions["Height"] ?? ""}
                      onChange={(e) =>
                        setSelectedDimensions((p) => ({ ...p, Height: e.target.value }))
                      }
                      className="w-full font-raleway text-[13px] text-[#1A0F00] border border-[#1A0F00]/40 bg-[#F5EDD6] rounded-md px-2.5 py-2 focus:outline-none focus:border-[#ff8905] [&>option]:bg-[#F5EDD6] [&>option]:text-[#1A0F00]"
                    >
                      <option value="">Select</option>
                      {dims.height.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                )}
                {dims.width && (
                  <div>
                    <label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">
                      Width (mm)
                    </label>
                    <select
                      value={selectedDimensions["Width"] ?? ""}
                      onChange={(e) =>
                        setSelectedDimensions((p) => ({ ...p, Width: e.target.value }))
                      }
                      className="w-full font-raleway text-[13px] text-[#1A0F00] border border-[#1A0F00]/40 bg-[#F5EDD6] rounded-md px-2.5 py-2 focus:outline-none focus:border-[#ff8905] [&>option]:bg-[#F5EDD6] [&>option]:text-[#1A0F00]"
                    >
                      <option value="">Select</option>
                      {dims.width.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                )}
                {dims.length && (
                  <div>
                    <label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">
                      Length (mm)
                    </label>
                    <select
                      value={selectedDimensions["Length"] ?? ""}
                      onChange={(e) =>
                        setSelectedDimensions((p) => ({ ...p, Length: e.target.value }))
                      }
                      className="w-full font-raleway text-[13px] text-[#1A0F00] border border-[#1A0F00]/40 bg-[#F5EDD6] rounded-md px-2.5 py-2 focus:outline-none focus:border-[#ff8905] [&>option]:bg-[#F5EDD6] [&>option]:text-[#1A0F00]"
                    >
                      <option value="">Select</option>
                      {dims.length.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                )}
                {dims.thickness && (
                  <div>
                    <label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">
                      Thickness (mm)
                    </label>
                    <select
                      value={selectedDimensions["Thickness"] ?? ""}
                      onChange={(e) =>
                        setSelectedDimensions((p) => ({ ...p, Thickness: e.target.value }))
                      }
                      className="w-full font-raleway text-[13px] text-[#1A0F00] border border-[#1A0F00]/40 bg-[#F5EDD6] rounded-md px-2.5 py-2 focus:outline-none focus:border-[#ff8905] [&>option]:bg-[#F5EDD6] [&>option]:text-[#1A0F00]"
                    >
                      <option value="">Select</option>
                      {dims.thickness.map((v) => (
                        <option key={v} value={v}>{Number(v).toFixed(1)}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Finishing grid */}
            {finishing.length > 0 && (
              <div className="mb-5">
                <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">
                  Finishing
                </p>
                <div className="grid grid-cols-3 gap-2 auto-rows-fr">
                  {finishing.map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setSelectedFinishing(f);
                        if (f !== "Powder Coated") setSelectedColor("");
                      }}
                      className={`px-3 py-2 rounded-md font-raleway text-[11px] font-semibold border transition-all duration-150 text-left leading-snug ${
                        selectedFinishing === f
                          ? "bg-[#ff8905] border-[#ff8905] text-white"
                          : "bg-transparent border-[#1A0F00]/30 text-[#1A0F00] hover:border-[#1A0F00]"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Finishing color */}
            {(() => {
              const colors = product.finishingColors?.length
                ? product.finishingColors
                : ["Orange", "White", "Green", "Red"];
              const COLOR_MAP: Record<string, string> = {
                orange: "#ff8905", white: "#ffffff", green: "#4a7c59",
                red: "#cc2222", silver: "#c0c0c0", gold: "#c9a84c",
                black: "#1a0f00", blue: "#2563eb",
              };
              return (
                <div className="mb-5">
                  <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">
                    Finishing Color
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => {
                      const css = COLOR_MAP[c.toLowerCase()] ?? c.toLowerCase();
                      const active = selectedColor === c;
                      return (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(active ? "" : c)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-md border font-raleway text-[11px] font-semibold transition-all duration-150 ${
                            active
                              ? "border-[#ff8905] bg-[#ff8905]/10 text-[#1A0F00]"
                              : "border-[#1A0F00]/30 text-[#1A0F00] hover:border-[#1A0F00]"
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-[#1A0F00]/20 flex-shrink-0"
                            style={{ backgroundColor: css }}
                          />
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Quantity */}
            <div className="mb-6">
              <label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">
                Quantity
              </label>
              <div className="flex items-center gap-0 border border-[#1A0F00]/30 w-fit rounded-md overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center font-raleway text-lg text-[#1A0F00] hover:bg-[#1A0F00]/10 transition-colors border-r border-[#1A0F00]/30"
                >
                  −
                </button>
                <span className="w-12 text-center font-typewriter text-[15px] text-[#1A0F00]">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center font-raleway text-lg text-[#1A0F00] hover:bg-[#1A0F00]/10 transition-colors border-l border-[#1A0F00]/30"
                >
                  +
                </button>
              </div>
            </div>

            {/* REQUEST A QUOTE */}
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary justify-center mb-4"
            >
              {added ? (
                <>
                  <CheckCircle size={15} />
                  Added to Enquiry
                </>
              ) : (
                <>
                  <ShoppingBag size={15} />
                  Request a Quote
                </>
              )}
            </button>
            {added && (
              <Link
                href="/enquiry"
                className="btn-outline w-full justify-center text-center"
              >
                View Enquiry →
              </Link>
            )}
          </div>

          {/* Table of Contents — separate section */}
          <div className="mt-8">
            <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#5C4A30] mb-3">
              Table of Contents
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="#description"
                  className="font-raleway text-[13px] text-[#1A0F00] hover:text-[#ff8905] transition-colors"
                >
                  Description
                </a>
              </li>
              {product.properties && (
                <li>
                  <a
                    href="#properties"
                    className="font-raleway text-[13px] text-[#1A0F00] hover:text-[#ff8905] transition-colors"
                  >
                    Properties
                  </a>
                </li>
              )}
              {product.accessories && product.accessories.length > 0 && (
                <li>
                  <a
                    href="#accessories"
                    className="font-raleway text-[13px] text-[#1A0F00] hover:text-[#ff8905] transition-colors"
                  >
                    Accessories
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Documents — separate section */}
          <div className="mt-8 pt-6 border-t border-[#1A0F00]/15">
            <button className="flex items-center gap-2.5 font-raleway text-[12px] font-semibold text-[#1A0F00] hover:text-[#ff8905] transition-colors uppercase tracking-wide">
              <FileText size={14} strokeWidth={2} />
              Data Sheet
            </button>

            {/* Certificate — shown inline, click to enlarge */}
            <div className="mt-6">
              <p className="flex items-center gap-2.5 font-raleway text-[12px] font-semibold uppercase tracking-wide text-[#1A0F00] mb-3">
                <Award size={14} strokeWidth={2} className="text-[#ff8905]" />
                Certificate
              </p>
              <button
                onClick={() => setCertOpen(true)}
                aria-label="Enlarge certificate"
                className="group relative block w-full max-w-[280px] border border-[#1A0F00]/20 rounded-md overflow-hidden hover:border-[#ff8905] transition-colors"
              >
                <Image
                  src="/images/product-certificate.png"
                  alt="U-LI Product Certificate"
                  width={400}
                  height={550}
                  className="w-full h-auto"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-[#1A0F00]/0 group-hover:bg-[#1A0F00]/10 transition-colors">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity font-raleway text-[11px] font-semibold text-white bg-[#1A0F00]/75 px-2.5 py-1 rounded">
                    Click to enlarge
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Certificate lightbox */}
      {certOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setCertOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCertOpen(false)}
              className="absolute top-2 right-3 font-raleway text-[20px] text-[#1A0F00] hover:text-[#ff8905] transition-colors leading-none"
            >
              ×
            </button>
            <Image
              src="/images/product-certificate.png"
              alt="U-LI Product Certificate"
              width={800}
              height={1100}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </>
  );
}
