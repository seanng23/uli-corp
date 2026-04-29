"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, FileText, Award, ShoppingBag, CheckCircle } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/cart/CartProvider";
import { generateItemId } from "@/lib/cart-store";

type Props = { product: Product };

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
  const allImages = [product.image ?? PLACEHOLDER, ...(product.thumbnails ?? [])].filter(Boolean) as string[];
  const [activeImage, setActiveImage] = useState(0);

  const [selectedStandard, setSelectedStandard] = useState<string>(product.standards?.[0] ?? "");
  const [selectedDimensions, setSelectedDimensions] = useState<Record<string, string>>({});
  const [selectedFinishing, setSelectedFinishing] = useState<string>(product.finishing?.[0] ?? "");
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

      {/* Product heading */}
      <div className="site-container py-5">
        <h1 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.2rem)] leading-tight text-[#1A0F00]">
          {product.name}
        </h1>
      </div>

      {/* Bottom divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Two-column layout */}
      <div className="site-container py-10 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_540px] gap-10 lg:gap-14 items-start">

        {/* LEFT — image gallery + collapsible sections */}
        <div>
          {/* Main image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1A0F00]/5 mb-3">
            <Image
              src={allImages[activeImage]}
              alt={product.name}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width:1024px) 100vw, 55vw"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mb-10">
            {allImages.slice(0, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative w-[72px] h-[54px] overflow-hidden border-2 transition-colors flex-shrink-0 ${
                  activeImage === i
                    ? "border-[#ff8905]"
                    : "border-[#1A0F00]/20 hover:border-[#1A0F00]/50"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover object-center"
                  sizes="72px"
                />
              </button>
            ))}
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
                {product.properties.materials && (
                  <div>
                    <p className="font-raleway text-[12px] font-bold uppercase tracking-widest text-[#1A0F00] mb-2">
                      Materials
                    </p>
                    <ul className="space-y-1">
                      {product.properties.materials.map((m) => (
                        <li key={m} className="font-raleway text-[14px] text-[#5C4A30] flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#ff8905] flex-shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.properties.finishings && (
                  <div>
                    <p className="font-raleway text-[12px] font-bold uppercase tracking-widest text-[#1A0F00] mb-2">
                      Finishing Options
                    </p>
                    <ul className="space-y-1">
                      {product.properties.finishings.map((f) => (
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
                      {product.properties.standards.map((s) => (
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
                          <th className="font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20">Components Reference</th>
                          <th className="font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20">Nominal Size (mm) H (Height) X W (Width)</th>
                          <th className="font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20">Nominal Min. Thickness of Body &amp; Cover (mm)</th>
                          <th className="font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20">Nominal Max. Thickness of Body &amp; Cover (mm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.dimensionTable.map((row, i) => (
                          <tr key={i} className={i % 2 === 1 ? "bg-[#1A0F00]/[0.03]" : ""}>
                            <td className="font-raleway text-[13px] text-[#5C4A30] px-3 py-2 border-b border-[#1A0F00]/10">{row.ref ?? "—"}</td>
                            <td className="font-raleway text-[13px] text-[#5C4A30] px-3 py-2 border-b border-[#1A0F00]/10">{row.nominalSize ?? "—"}</td>
                            <td className="font-raleway text-[13px] text-[#5C4A30] px-3 py-2 border-b border-[#1A0F00]/10">{row.minThickness ?? "—"}</td>
                            <td className="font-raleway text-[13px] text-[#5C4A30] px-3 py-2 border-b border-[#1A0F00]/10">{row.maxThickness ?? "—"}</td>
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
          <div className="border border-[#1A0F00]/20 p-6 bg-[#F5EDD6]">
            {/* Item No */}
            {product.itemNo && (
              <p className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#5C4A30] mb-5">
                Item No: <span className="text-[#1A0F00]">{product.itemNo}</span>
              </p>
            )}

            {/* Dimension range summary */}
            {product.dimensions && (
              <div className="mb-5 pb-5 border-b border-[#1A0F00]/15">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {product.dimensions.height && (
                    <span className="font-raleway text-[12px] text-[#5C4A30]">
                      H: {product.dimensions.height[0]}–{product.dimensions.height[product.dimensions.height.length - 1]}mm
                    </span>
                  )}
                  {product.dimensions.width && (
                    <span className="font-raleway text-[12px] text-[#5C4A30]">
                      W: {product.dimensions.width[0]}–{product.dimensions.width[product.dimensions.width.length - 1]}mm
                    </span>
                  )}
                  {product.dimensions.length && (
                    <span className="font-raleway text-[12px] text-[#5C4A30]">
                      L: {product.dimensions.length[0]}–{product.dimensions.length[product.dimensions.length.length - 1]}mm
                    </span>
                  )}
                  {product.dimensions.thickness && (
                    <span className="font-raleway text-[12px] text-[#5C4A30]">
                      T: {product.dimensions.thickness[0]}–{product.dimensions.thickness[product.dimensions.thickness.length - 1]}mm
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Standard pills */}
            {product.standards && product.standards.length > 0 && (
              <div className="mb-5">
                <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">
                  Standard
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.standards.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedStandard(s)}
                      className={`px-3 py-1.5 font-raleway text-[11px] font-semibold border transition-all duration-150 ${
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
            {product.dimensions && (
              <div className="mb-5 grid grid-cols-2 gap-3">
                {product.dimensions.height && (
                  <div>
                    <label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">
                      Height (mm)
                    </label>
                    <select
                      value={selectedDimensions["Height"] ?? ""}
                      onChange={(e) =>
                        setSelectedDimensions((p) => ({ ...p, Height: e.target.value }))
                      }
                      className="w-full font-raleway text-[13px] text-[#1A0F00] border border-[#1A0F00]/30 bg-white px-2.5 py-2 focus:outline-none focus:border-[#1A0F00]"
                    >
                      <option value="">Select</option>
                      {product.dimensions.height.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                )}
                {product.dimensions.width && (
                  <div>
                    <label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">
                      Width (mm)
                    </label>
                    <select
                      value={selectedDimensions["Width"] ?? ""}
                      onChange={(e) =>
                        setSelectedDimensions((p) => ({ ...p, Width: e.target.value }))
                      }
                      className="w-full font-raleway text-[13px] text-[#1A0F00] border border-[#1A0F00]/30 bg-white px-2.5 py-2 focus:outline-none focus:border-[#1A0F00]"
                    >
                      <option value="">Select</option>
                      {product.dimensions.width.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                )}
                {product.dimensions.length && (
                  <div>
                    <label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">
                      Length (mm)
                    </label>
                    <select
                      value={selectedDimensions["Length"] ?? ""}
                      onChange={(e) =>
                        setSelectedDimensions((p) => ({ ...p, Length: e.target.value }))
                      }
                      className="w-full font-raleway text-[13px] text-[#1A0F00] border border-[#1A0F00]/30 bg-white px-2.5 py-2 focus:outline-none focus:border-[#1A0F00]"
                    >
                      <option value="">Select</option>
                      {product.dimensions.length.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                )}
                {product.dimensions.thickness && (
                  <div>
                    <label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">
                      Thickness (mm)
                    </label>
                    <select
                      value={selectedDimensions["Thickness"] ?? ""}
                      onChange={(e) =>
                        setSelectedDimensions((p) => ({ ...p, Thickness: e.target.value }))
                      }
                      className="w-full font-raleway text-[13px] text-[#1A0F00] border border-[#1A0F00]/30 bg-white px-2.5 py-2 focus:outline-none focus:border-[#1A0F00]"
                    >
                      <option value="">Select</option>
                      {product.dimensions.thickness.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Finishing grid */}
            {product.finishing && product.finishing.length > 0 && (
              <div className="mb-5">
                <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">
                  Finishing
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {product.finishing.map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setSelectedFinishing(f);
                        if (f !== "Powder Coated") setSelectedColor("");
                      }}
                      className={`px-3 py-2 font-raleway text-[11px] font-semibold border transition-all duration-150 text-left leading-snug ${
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
                          className={`flex items-center gap-2 px-3 py-1.5 border font-raleway text-[11px] font-semibold transition-all duration-150 ${
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
              <div className="flex items-center gap-0 border border-[#1A0F00]/30 w-fit">
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

            {/* Table of Contents */}
            <div className="mt-6 pt-5 border-t border-[#1A0F00]/15">
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

            {/* Data Sheet + Certificate */}
            <div className="mt-5 pt-5 border-t border-[#1A0F00]/15 flex flex-col gap-2">
              <button className="flex items-center gap-2.5 font-raleway text-[12px] font-semibold text-[#1A0F00] hover:text-[#ff8905] transition-colors uppercase tracking-wide">
                <FileText size={14} strokeWidth={2} />
                Data Sheet
              </button>
              <button
                onClick={() => setCertOpen(true)}
                className="flex items-center gap-2.5 font-raleway text-[12px] font-semibold text-[#1A0F00] hover:text-[#ff8905] transition-colors uppercase tracking-wide"
              >
                <Award size={14} strokeWidth={2} />
                Certificate
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
