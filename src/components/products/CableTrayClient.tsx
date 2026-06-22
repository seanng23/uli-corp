"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, FileText, Award, ShoppingBag, CheckCircle } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { generateItemId } from "@/lib/cart-store";
import DimensionCombobox from "./DimensionCombobox";
import {
  CABLE_TRAY_PROFILES,
  CABLE_TRAY_STANDARD,
  CABLE_TRAY_STANDARDS,
  CABLE_TRAY_LENGTHS,
  type TrayDim,
} from "@/data/cable-tray";

const MAIN_IMAGE = "/images/products/cable-tray.png";
const STANDARDS = CABLE_TRAY_STANDARDS;
const FINISH_CUSTOM = "Others / Custom Finishing";
const RAW_FINISHING = [
  "Aluminum",
  "Electro-Galvanised Steel with Epoxy Powder Coated",
  "Epoxy Powder Coated",
  "Hot Dip Galvanised",
  "Hot Dip Galvanised with Epoxy Powder Coated",
  "Polyester Powder Coated",
  "Pre-Galvanised Steel (Unpainted)",
  "Pre-Galvanised Steel with Epoxy Powder Coated",
  "Stainless Steel 304 / 316",
  "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)",
  "Electro Galvanised Steel (Unpainted)",
  "Others/ Custom Sizes",
];

function normalizeFinishing(list: string[]): string[] {
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
const FINISHING = normalizeFinishing(RAW_FINISHING);

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

function DimTable({ dims }: { dims: TrayDim[] }) {
  return (
    <div className="max-h-[420px] overflow-y-auto border border-[#1A0F00]/20">
      <table className="w-full text-left">
        <thead className="sticky top-0">
          <tr className="bg-[#F0E6CC]">
            <th className="font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20">Components Reference</th>
            <th className="font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20">Nominal Size (mm) H X W</th>
            <th className="font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20">Recommended Thickness (mm)</th>
          </tr>
        </thead>
        <tbody>
          {dims.map((row, i) => (
            <tr key={row.ref} className={i % 2 === 1 ? "bg-[#1A0F00]/[0.03]" : ""}>
              <td className="font-raleway text-[13px] text-[#5C4A30] px-3 py-1.5 border-b border-[#1A0F00]/10">{row.ref}</td>
              <td className="font-raleway text-[13px] text-[#5C4A30] px-3 py-1.5 border-b border-[#1A0F00]/10">{row.h} X {row.w}</td>
              <td className="font-raleway text-[13px] text-[#5C4A30] px-3 py-1.5 border-b border-[#1A0F00]/10">{row.t.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProfileAccordion({
  code,
  itemCode,
  defaultOpen = false,
  children,
}: {
  code: string;
  itemCode: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#1A0F00]/20 rounded-md overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-4 py-3 bg-[#1A0F00]/[0.04] hover:bg-[#1A0F00]/[0.07] transition-colors text-left"
      >
        <span className="font-raleway text-[13px] font-bold uppercase tracking-wide text-[#1A0F00]">
          {code} <span className="text-[#ff8905] normal-case">({itemCode})</span>
        </span>
        {open ? (
          <ChevronUp size={15} strokeWidth={2.5} className="text-[#1A0F00] flex-shrink-0" />
        ) : (
          <ChevronDown size={15} strokeWidth={2.5} className="text-[#1A0F00] flex-shrink-0" />
        )}
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

function AccessoryList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="font-raleway text-[12px] font-bold uppercase tracking-widest text-[#1A0F00] mb-2">
        {title}
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
        {items.map((a) => (
          <li key={a} className="font-raleway text-[14px] text-[#5C4A30] flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#ff8905] flex-shrink-0" />
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CableTrayClient() {
  const { addToCart } = useCart();

  const [profileCode, setProfileCode] = useState("TU");
  const profile = CABLE_TRAY_PROFILES.find((p) => p.code === profileCode) ?? CABLE_TRAY_PROFILES[0];

  const dims = profile.dimensions;
  const heights = [...new Set(dims.map((d) => d.h))].sort((a, b) => a - b);
  const widths = [...new Set(dims.map((d) => d.w))].sort((a, b) => a - b);
  const thicknesses = [...new Set(dims.map((d) => d.t))].sort((a, b) => a - b);

  const galleryImages = Array.from({ length: 4 }, () => MAIN_IMAGE);
  const [activeImage, setActiveImage] = useState(0);

  const [selectedStandard, setSelectedStandard] = useState<string>(STANDARDS[0]);
  const [selectedDimensions, setSelectedDimensions] = useState<Record<string, string>>({});
  const [selectedFinishing, setSelectedFinishing] = useState<string>(FINISHING[0]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [certOpen, setCertOpen] = useState(false);

  function selectProfile(code: string) {
    setProfileCode(code);
    setSelectedDimensions({}); // dimension options differ per profile
  }

  function handleAddToCart() {
    const specs: Record<string, string> = {
      Profile: profile.code,
      ...selectedDimensions,
      Length: selectedDimensions["Length"] ?? "",
      Standard: selectedStandard,
      Finishing: selectedFinishing,
    };
    if (selectedColor) specs["Finishing Color"] = selectedColor;
    const id = generateItemId(`cable-tray-${profile.code.toLowerCase()}`, specs);
    addToCart({
      id,
      productName: `Cable Tray (${profile.code})`,
      category: "Cable Tray",
      specs,
      quantity: qty,
      slug: "cable-tray",
      image: MAIN_IMAGE,
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
          <span className="text-[#1A0F00] font-semibold">Cable Tray</span>
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
                      <Image src={img} alt={`Cable tray thumbnail ${i + 1}`} fill className="object-cover object-center" sizes="104px" />
                    </button>
                  );
                })}
              </div>

              <div className="relative flex-1 aspect-square overflow-hidden rounded-2xl border border-[#1A0F00]/20">
                <Image
                  src={galleryImages[activeImage]}
                  alt={`U-LI Cable Tray ${profile.code}`}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Collapsible sections */}
            <CollapsibleSection id="description" title="Description" defaultOpen>
              <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed">
                U-LI steel cable trays provide robust, ventilated support for power and data cabling
                across commercial, industrial and infrastructure installations. Available in four
                profiles — TU, TT, TC and TR — and certified to IEC 61537 (SIRIM QAS International)
                and NEMA VE-1, with preferred lengths of 2.44m and 3.0m and widths up to 1000mm.
              </p>
            </CollapsibleSection>

            <CollapsibleSection id="properties" title="Properties">
              <div className="space-y-5">
                <div>
                  <p className="font-raleway text-[12px] font-bold uppercase tracking-widest text-[#1A0F00] mb-2">
                    Finishing Options
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                    {FINISHING.map((f) => (
                      <li key={f} className="font-raleway text-[14px] text-[#5C4A30] flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#ff8905] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-raleway text-[12px] font-bold uppercase tracking-widest text-[#1A0F00] mb-2">
                    Applicable Standards
                  </p>
                  <ul className="space-y-1">
                    <li className="font-raleway text-[14px] text-[#5C4A30] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#ff8905] flex-shrink-0" />
                      IEC 61537 (certified by SIRIM QAS International)
                    </li>
                    <li className="font-raleway text-[14px] text-[#5C4A30] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#ff8905] flex-shrink-0" />
                      NEMA VE-1
                    </li>
                  </ul>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection id="dimensions" title="Available Dimensions">
              <p className="font-raleway text-[13px] text-[#5C4A30] mb-4">
                Standard sizes per design profile — expand a profile to view its range. Preferred
                lengths 2.44m and 3.0m.
              </p>
              <div className="space-y-3">
                {CABLE_TRAY_PROFILES.map((p) => (
                  <ProfileAccordion key={p.code} code={p.code} itemCode={p.itemCode} defaultOpen={false}>
                    <DimTable dims={p.dimensions} />
                  </ProfileAccordion>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection id="accessories" title="Accessories">
              <p className="font-raleway text-[13px] text-[#5C4A30] mb-4">
                Compatible accessories per design profile — expand a profile to view its range.
              </p>
              <div className="space-y-3">
                {CABLE_TRAY_PROFILES.map((p) => (
                  <ProfileAccordion key={p.code} code={p.code} itemCode={p.itemCode} defaultOpen={false}>
                    <div className="space-y-5">
                      <AccessoryList title="Standard Accessories" items={p.standardAccessories} />
                      <AccessoryList title="Cover Accessories" items={p.coverAccessories} />
                      <AccessoryList title="Angular Type" items={p.angularAccessories} />
                    </div>
                  </ProfileAccordion>
                ))}
              </div>
            </CollapsibleSection>
          </div>

          {/* RIGHT — configurator panel (glass) */}
          <div>
            <div className="border border-white/40 p-6 bg-white/15 rounded-2xl shadow-[0_8px_30px_rgba(26,15,0,0.12)]">
              {/* Title */}
              <h1 className="font-typewriter text-[clamp(1.4rem,2vw,1.9rem)] leading-tight text-[#1A0F00] mb-4">
                Cable Tray
              </h1>

              {/* Profile selector */}
              <div className="mb-5">
                <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">
                  Design Profile
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {CABLE_TRAY_PROFILES.map((p) => (
                    <button
                      key={p.code}
                      onClick={() => selectProfile(p.code)}
                      className={`px-2 py-2 rounded-md font-raleway text-[13px] font-bold border transition-all duration-150 ${
                        profileCode === p.code
                          ? "bg-[#ff8905] border-[#ff8905] text-white"
                          : "bg-transparent border-[#1A0F00]/40 text-[#1A0F00] hover:border-[#1A0F00]"
                      }`}
                    >
                      {p.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Item No */}
              <p className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#5C4A30] mb-5">
                Item No: <span className="text-[#1A0F00]">{profile.itemCode}</span>
              </p>

              {/* Dimension range summary */}
              <div className="mb-5 pb-5 border-b border-[#1A0F00]/15">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <span className="font-raleway text-[12px] text-[#5C4A30]">H: {heights[0]}–{heights[heights.length - 1]}mm</span>
                  <span className="font-raleway text-[12px] text-[#5C4A30]">W: {widths[0]}–{widths[widths.length - 1]}mm</span>
                  <span className="font-raleway text-[12px] text-[#5C4A30]">L: 2440mm or 3000mm</span>
                  <span className="font-raleway text-[12px] text-[#5C4A30]">T: {thicknesses[0].toFixed(1)}–{thicknesses[thicknesses.length - 1].toFixed(1)}mm</span>
                </div>
              </div>

              {/* Standard pills */}
              <div className="mb-5">
                <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">
                  Standard
                </p>
                <div className="flex flex-wrap gap-2">
                  {STANDARDS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedStandard(s)}
                      className={`inline-flex items-center justify-center px-3 py-2 rounded-md font-raleway text-[11px] font-semibold leading-none tabular-nums border transition-all duration-150 ${
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

              {/* Dimension dropdowns */}
              <div className="mb-5 grid grid-cols-2 gap-3">
                {([
                  { key: "Height", label: "Height (mm)", opts: heights.map(String) },
                  { key: "Width", label: "Width (mm)", opts: widths.map(String) },
                  { key: "Length", label: "Length (mm)", opts: CABLE_TRAY_LENGTHS.map(String) },
                  { key: "Thickness", label: "Thickness (mm)", opts: thicknesses.map((t) => t.toFixed(1)) },
                ] as const).map((field) => (
                  <div key={field.key}>
                    <label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">
                      {field.label}
                    </label>
                    <DimensionCombobox
                      value={selectedDimensions[field.key] ?? ""}
                      onChange={(v) => setSelectedDimensions((p) => ({ ...p, [field.key]: v }))}
                      options={[...field.opts]}
                      allowDecimal={field.key === "Thickness"}
                    />
                  </div>
                ))}
              </div>

              {/* Finishing grid */}
              <div className="mb-5">
                <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">
                  Finishing
                </p>
                <div className="grid grid-cols-3 gap-2 auto-rows-fr">
                  {FINISHING.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFinishing(f)}
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

              {/* Finishing color */}
              <div className="mb-5">
                <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">
                  Finishing Color
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Orange", "White", "Green", "Red", "Custom"].map((c) => {
                    const map: Record<string, string> = {
                      orange: "#ff8905", white: "#ffffff", green: "#4a7c59", red: "#cc2222", custom: "#d9cba8",
                    };
                    const active = selectedColor === c;
                    return (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(active ? "" : c)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md border font-raleway text-[11px] font-semibold transition-all duration-150 ${
                          active ? "border-[#ff8905] bg-[#ff8905]/10 text-[#1A0F00]" : "border-[#1A0F00]/30 text-[#1A0F00] hover:border-[#1A0F00]"
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-[#1A0F00]/20 flex-shrink-0" style={{ backgroundColor: map[c.toLowerCase()] }} />
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">
                  Quantity
                </label>
                <div className="flex items-center gap-0 border border-[#1A0F00]/30 w-fit rounded-md overflow-hidden">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center font-raleway text-lg text-[#1A0F00] hover:bg-[#1A0F00]/10 transition-colors border-r border-[#1A0F00]/30">−</button>
                  <span className="w-12 text-center font-typewriter text-[15px] text-[#1A0F00]">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 flex items-center justify-center font-raleway text-lg text-[#1A0F00] hover:bg-[#1A0F00]/10 transition-colors border-l border-[#1A0F00]/30">+</button>
                </div>
              </div>

              {/* Request a quote */}
              <button onClick={handleAddToCart} className="w-full btn-primary justify-center mb-4">
                {added ? (<><CheckCircle size={15} /> Added to Enquiry</>) : (<><ShoppingBag size={15} /> Request a Quote</>)}
              </button>
              {added && (
                <Link href="/enquiry" className="btn-outline w-full justify-center text-center">View Enquiry →</Link>
              )}
            </div>

            {/* Table of Contents — separate section */}
            <div className="mt-8">
              <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#5C4A30] mb-3">
                Table of Contents
              </p>
              <ul className="space-y-2">
                <li><a href="#description" className="font-raleway text-[13px] text-[#1A0F00] hover:text-[#ff8905] transition-colors">Description</a></li>
                <li><a href="#properties" className="font-raleway text-[13px] text-[#1A0F00] hover:text-[#ff8905] transition-colors">Properties</a></li>
                <li><a href="#dimensions" className="font-raleway text-[13px] text-[#1A0F00] hover:text-[#ff8905] transition-colors">Available Dimensions</a></li>
                <li><a href="#accessories" className="font-raleway text-[13px] text-[#1A0F00] hover:text-[#ff8905] transition-colors">Accessories</a></li>
              </ul>
            </div>

            {/* Documents — separate section */}
            <div className="mt-8 pt-6 border-t border-[#1A0F00]/15">
              <button className="flex items-center gap-2.5 font-raleway text-[12px] font-semibold text-[#1A0F00] hover:text-[#ff8905] transition-colors uppercase tracking-wide">
                <FileText size={14} strokeWidth={2} />
                Data Sheet
              </button>
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
                  <Image src="/images/product-certificate.png" alt="U-LI Product Certificate" width={400} height={550} className="w-full h-auto" />
                  <span className="absolute inset-0 flex items-center justify-center bg-[#1A0F00]/0 group-hover:bg-[#1A0F00]/10 transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity font-raleway text-[11px] font-semibold text-white bg-[#1A0F00]/75 px-2.5 py-1 rounded">Click to enlarge</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate lightbox */}
      {certOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setCertOpen(false)}>
          <div className="relative max-w-2xl w-full bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setCertOpen(false)} className="absolute top-2 right-3 font-raleway text-[20px] text-[#1A0F00] hover:text-[#ff8905] transition-colors leading-none">×</button>
            <Image src="/images/product-certificate.png" alt="U-LI Product Certificate" width={800} height={1100} className="w-full h-auto" />
          </div>
        </div>
      )}
    </>
  );
}
