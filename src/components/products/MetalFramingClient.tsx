"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { generateItemId } from "@/lib/cart-store";
import DimensionCombobox from "./DimensionCombobox";
import {
  type CatalogueItem,
  type ChannelSeries,
  type ChannelVariant,
  type Fitting,
  type SpecTable,
  CANTILEVER_BRACKETS,
  CHANNEL_SERIES,
  CLAMPS,
  FASTENERS,
  FINISHES,
  FITTING_FAMILIES,
  FITTINGS,
  LENGTH_OPTIONS,
} from "@/data/metal-framing";

type ChannelProfile = ChannelVariant["profile"];

const MAIN_IMAGE = "/images/products/metal-framing-v4.png";
const PROFILE_IMAGES: Record<ChannelProfile, { src: string; heightClass: string }> = {
  "single-deep": { src: "/images/products/metal-framing/profiles/single-deep.png", heightClass: "h-10" },
  "back-to-back-deep": { src: "/images/products/metal-framing/profiles/back-to-back-deep.png", heightClass: "h-20" },
  "quad": { src: "/images/products/metal-framing/profiles/quad.png", heightClass: "h-20" },
  "single-shallow": { src: "/images/products/metal-framing/profiles/single-shallow.png", heightClass: "h-5" },
  "back-to-back-shallow": { src: "/images/products/metal-framing/profiles/back-to-back-shallow.png", heightClass: "h-10" },
};
const CHANNEL_DETAIL_IMAGES: Record<string, { iso: string; dims: string }> = {
  "UL1000": { iso: "/images/products/metal-framing/channels/ul1000-iso.png", dims: "/images/products/metal-framing/channels/ul1000-dims.png" },
  "UL1001": { iso: "/images/products/metal-framing/channels/ul1001-iso.png", dims: "/images/products/metal-framing/channels/ul1001-dims.png" },
  "UL1001-C41": { iso: "/images/products/metal-framing/channels/ul1001-c41-iso.png", dims: "/images/products/metal-framing/channels/ul1001-c41-dims.png" },
  "UL3300": { iso: "/images/products/metal-framing/channels/ul3300-iso.png", dims: "/images/products/metal-framing/channels/ul3300-dims.png" },
  "UL3301": { iso: "/images/products/metal-framing/channels/ul3301-iso.png", dims: "/images/products/metal-framing/channels/ul3301-dims.png" },
  "UL1000T": { iso: "/images/products/metal-framing/channels/ul1000t-iso.png", dims: "/images/products/metal-framing/channels/ul1000t-dims.png" },
  "UL3300T": { iso: "/images/products/metal-framing/channels/ul3300t-iso.png", dims: "/images/products/metal-framing/channels/ul3300t-dims.png" },
};
const FINISHING_OPTIONS = ["Hot-dip Galvanizing (HDG)", "Sheet Galvanizing (Pre-galvanized) (PG)", "Stainless Steel 316", "Stainless Steel 304"];
const COLORS = ["Grey", "White", "Orange", "Others / Custom Colour"];
const COLOR_MAP: Record<string, string> = { grey: "#9aa0a6", white: "#ffffff", orange: "#ff8905" };
const thClass = "font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20";
const tdClass = "font-raleway text-[13px] text-[#5C4A30] px-3 py-1.5 border-b border-[#1A0F00]/10";
const optionClass = (active: boolean) => `px-3 py-2 rounded-md font-raleway text-[11px] font-semibold border transition-all duration-150 leading-snug ${active ? "bg-[#ff8905] border-[#ff8905] text-white" : "bg-transparent border-[#1A0F00]/30 text-[#1A0F00] hover:border-[#1A0F00]"}`;

function CollapsibleSection({ id, title, children, defaultOpen = false }: { id: string; title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return <div id={id} className="border-t border-[#1A0F00]/20 scroll-mt-24">
    <button type="button" onClick={() => setOpen((value) => !value)} className="flex items-center justify-between w-full py-4 text-left">
      <span className="font-raleway text-[13px] font-bold uppercase tracking-widest text-[#1A0F00]">{title}</span>
      {open ? <ChevronUp size={16} strokeWidth={2.5} className="text-[#1A0F00] flex-shrink-0" /> : <ChevronDown size={16} strokeWidth={2.5} className="text-[#1A0F00] flex-shrink-0" />}
    </button>
    {open && <div className="pb-6">{children}</div>}
  </div>;
}

function ElementsRowTable({ row }: { row: SpecTable["rows"][number] }) {
  const groupedHeaderClass = `${thClass} text-center`;
  return <div>
    <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-2">Elements of Section</p>
    <div className="overflow-x-auto">
      <table className="w-full text-left min-w-[560px] border border-[#1A0F00]/20">
        <thead className="bg-[#F0E6CC]">
          <tr>
            <th rowSpan={2} className={thClass}>Channel</th>
            <th rowSpan={2} className={thClass}>Thickness mm</th>
            <th rowSpan={2} className={thClass}>Area of Section mm²</th>
            <th colSpan={3} className={groupedHeaderClass}>Axis X - X</th>
            <th colSpan={3} className={groupedHeaderClass}>Axis Y - Y</th>
          </tr>
          <tr>
            {["I·10³ mm⁴", "z·10³ mm³", "r mm", "I·10³ mm⁴", "z·10³ mm³", "r mm"].map((heading, index) => <th key={`${heading}-${index}`} className={thClass}>{heading}</th>)}
          </tr>
        </thead>
        <tbody><tr>{row.filter((_, index) => index !== 3).map((cell, index) => <td key={index} className={tdClass}>{cell}</td>)}</tr></tbody>
      </table>
    </div>
  </div>;
}

type TabKey = "channels" | "fittings" | "cantilever" | "fasteners" | "clamps";
const TAB_LABELS: [TabKey, string][] = [
  ["channels", "Channels & Combinations"],
  ["fittings", "General Fittings"],
  ["cantilever", "Cantilever Brackets"],
  ["fasteners", "Fasteners"],
  ["clamps", "Clamps & Trolley Assemblies"],
];

function CatalogueCard({ item, added, onAdd }: { item: { code: string; description: string; specs?: string[]; image: string }; added: boolean; onAdd: () => void }) {
  return <div className="border border-[#1A0F00]/15 rounded-lg bg-white p-3 flex flex-col">
    <img src={item.image} alt={item.code} loading="lazy" className="h-36 w-full object-contain mb-2" />
    <p className="font-raleway font-bold text-[13px] text-[#1A0F00]">{item.code}</p>
    <p className="font-raleway text-[12px] text-[#5C4A30] leading-snug line-clamp-3">{item.description}</p>
    {item.specs && <div className="mt-1">{item.specs.map((spec) => <p key={spec} className="font-raleway text-[11px] text-[#5C4A30]">{spec}</p>)}</div>}
    <div className="mt-auto pt-2"><button type="button" onClick={onAdd} className="w-full rounded-md bg-[#ff8905] hover:bg-[#e67b00] text-white py-2 px-3 font-raleway text-[12px] font-bold transition-colors">{added ? "Added ✓" : "Add to Enquiry"}</button></div>
  </div>;
}

export default function MetalFramingClient() {
  const { addToCart } = useCart();
  const [tab, setTab] = useState<TabKey>("channels");
  const [series, setSeries] = useState<ChannelSeries>(CHANNEL_SERIES[0]);
  const [variant, setVariant] = useState<ChannelVariant>(CHANNEL_SERIES[0].variants[0]);
  const [length, setLength] = useState("3000");
  const [finishing, setFinishing] = useState(FINISHING_OPTIONS[0]);
  const [colour, setColour] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [family, setFamily] = useState<string>("All");
  const [addedFitting, setAddedFitting] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (TAB_LABELS.some(([key]) => key === hash)) setTab(hash as TabKey);
  }, []);

  function switchTab(next: TabKey) {
    setTab(next);
    history.replaceState(null, "", `#${next}`);
  }

  function selectSeries(next: ChannelSeries) {
    setSeries(next);
    setVariant(next.variants[0]);
    setColour("");
  }

  function addChannel() {
    const specs: Record<string, string> = {
      Series: series.label,
      "Product Code": variant.code,
      Profile: variant.name,
      "Width × Height (mm)": `${variant.widthMm} × ${variant.heightMm}`,
      "Thickness (mm)": String(variant.thicknessMm),
      "Length (mm)": length,
      Finishing: finishing,
      ...(colour ? { "Finishing Colour": colour } : {}),
    };
    addToCart({ id: generateItemId("metal-framing-" + variant.code, specs), productName: `Metal Framing Channel ${variant.code}`, category: "Metal Framing Systems", slug: "metal-framing-system", image: MAIN_IMAGE, quantity: qty, specs });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  }

  function addFitting(fitting: Fitting) {
    const specs: Record<string, string> = { "Product No.": fitting.code, Family: fitting.family };
    addToCart({ id: generateItemId("mf-fitting-" + fitting.code, specs), productName: `${fitting.code} · ${fitting.family}`, category: "Metal Framing Systems", slug: "metal-framing-system", image: fitting.image, quantity: 1, specs });
    setAddedFitting(fitting.code);
    setTimeout(() => setAddedFitting(null), 2000);
  }

  function addCatalogueItem(item: CatalogueItem, category: string) {
    const specs: Record<string, string> = { "Product No.": item.code, Category: category };
    addToCart({ id: generateItemId("mf-item-" + item.code, specs), productName: `${item.code} · ${category}`, category: "Metal Framing Systems", slug: "metal-framing-system", image: item.image, quantity: 1, specs });
    setAddedFitting(item.code);
    setTimeout(() => setAddedFitting(null), 2000);
  }

  const powderCoated = finishing.includes("Powder Coating");
  const filteredFittings = family === "All" ? FITTINGS : FITTINGS.filter((fitting) => fitting.family === family);
  const detail = CHANNEL_DETAIL_IMAGES[variant.code];
  const elementsRow = series.elementsOfSection?.rows.find((row) => String(row[0]) === String(variant.code));

  return <>
    <div className="site-container pt-5 pb-2"><nav className="flex items-center gap-2 font-raleway text-[12px] text-[#5C4A30]"><Link href="/" className="hover:text-[#ff8905] transition-colors">Home</Link><span>/</span><Link href="/products" className="hover:text-[#ff8905] transition-colors">Products</Link><span>/</span><span className="text-[#1A0F00] font-semibold">Metal Framing System</span></nav></div>
    <div className="site-container"><img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" /></div>
    <div className="site-container"><div className="flex flex-wrap border-b border-[#1A0F00]/15">{TAB_LABELS.map(([key, label]) => <button key={key} type="button" onClick={() => switchTab(key)} className={`font-raleway text-[13px] font-bold uppercase tracking-widest px-5 py-4 border-b-[3px] transition-colors ${tab === key ? "text-[#1A0F00] border-[#ff8905]" : "text-[#5C4A30]/70 hover:text-[#1A0F00] border-transparent"}`}>{label}</button>)}</div></div>

    {tab === "channels" && <div id="channels" className="site-container py-10 lg:py-12"><div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_540px] gap-10 lg:gap-14 items-start">
      <div className="min-w-0">
        <div className="mb-10 relative aspect-square overflow-hidden rounded-2xl border border-[#1A0F00]/20"><Image fill src={MAIN_IMAGE} alt="U-LI Metal Framing System" className="object-cover object-center" sizes="(max-width:1024px) 100vw, 50vw" priority /></div>
        <CollapsibleSection id="description" title="Description" defaultOpen><p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed mb-4">UliStrut® metal framing / slotted strut channel system comprises roll-formed carbon steel channels in UL1000 (41.3 × 41.3) and UL3300 (41.3 × 20.6) profiles with back-to-back and 2×2 combinations, pierced (T) versions and stainless steel variants; used for supports, racks, and electrical/mechanical services.</p><p className="font-raleway text-[12px] text-[#5C4A30]">All dimensions and weights are subject to a manufacturing tolerance of ±10%. All dimensions are in millimetres (mm).</p></CollapsibleSection>
        <CollapsibleSection id="finishes" title="Finishes"><dl className="space-y-4">{FINISHES.map((item) => <div key={item.name}><dt className="font-raleway text-[13px] font-bold text-[#1A0F00]">{item.name}</dt><dd className="font-raleway text-[12px] text-[#5C4A30] leading-relaxed mt-1">{item.detail}</dd></div>)}</dl><p className="font-raleway text-[11px] text-[#5C4A30] mt-4">Alternative steel grades and surface finishes are available upon request and may be subject to minimum order quantities.</p></CollapsibleSection>
      </div>

      <div className="lg:sticky lg:top-24"><div className="border border-white/40 p-6 bg-white/15 rounded-2xl shadow-[0_8px_30px_rgba(26,15,0,0.12)]">
        <h1 className="font-typewriter text-[clamp(1.4rem,2vw,1.9rem)] leading-tight text-[#1A0F00] mb-5">UliStrut® Channel</h1>
        <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Series</p><div className="grid grid-cols-2 gap-2">{CHANNEL_SERIES.map((item) => <button key={item.key} type="button" onClick={() => selectSeries(item)} className={optionClass(series.key === item.key)}>{item.label}</button>)}</div></div>
        <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Profile / Version</p><div className="flex flex-wrap gap-2">{series.variants.map((item) => <button key={item.code} type="button" onClick={() => setVariant(item)} className={`rounded-md border p-2 flex flex-col items-center gap-1 transition-colors ${variant.code === item.code ? "border-[#ff8905] bg-[#ff8905]/5" : "border-[#1A0F00]/20 hover:border-[#1A0F00]/50"}`}><span className="h-20 w-20 flex items-center justify-center"><img src={PROFILE_IMAGES[item.profile].src} alt={`${item.code} profile`} className={`${PROFILE_IMAGES[item.profile].heightClass} w-auto`} /></span><span className="font-raleway text-[10px] font-bold text-[#1A0F00]">{item.code}</span></button>)}</div></div>
        {detail && (
          <div className="mb-5 rounded-xl border border-[#1A0F00]/15 bg-white p-4">
            <div className="flex justify-center mb-4">
              <img src={detail.iso} alt={`${variant.code} channel`} className="w-auto h-auto max-h-[160px] max-w-[280px] object-contain" />
            </div>
            {elementsRow && <ElementsRowTable row={elementsRow} />}
          </div>
        )}
        <div className="bg-[#F0E6CC]/40 border border-[#1A0F00]/15 rounded-md p-3 mb-5 space-y-1">{[["Code", variant.code], ["Profile", variant.name], ["Width × Height (mm)", `${variant.widthMm} × ${variant.heightMm}`], ["Thickness (mm)", String(variant.thicknessMm)]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 font-raleway text-[11px]"><span className="text-[#5C4A30]">{label}</span><span className="font-semibold text-[#1A0F00] text-right">{value}</span></div>)}{variant.notes?.map((note) => <p key={note} className="font-raleway text-[10px] text-[#5C4A30] leading-relaxed pt-2">{note}</p>)}</div>
        <div className="mb-5"><label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">Length (mm)</label><DimensionCombobox value={length} onChange={setLength} options={LENGTH_OPTIONS} /></div>
        <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Finishing</p><div className="grid grid-cols-2 gap-2">{[...FINISHING_OPTIONS, "Others / Custom Finishing"].map((option) => <button key={option} type="button" onClick={() => { setFinishing(option); if (!option.includes("Powder Coating")) setColour(""); }} className={`${optionClass(finishing === option)} text-left`}>{option}</button>)}</div></div>{powderCoated && <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Finishing Colour</p><div className="flex flex-wrap gap-2">{COLORS.map((option) => { const active = colour === option; return <button key={option} type="button" onClick={() => setColour(active ? "" : option)} className={`flex items-center gap-2 ${optionClass(active)}`}>{option !== "Others / Custom Colour" && <span className="w-3 h-3 rounded-full border border-[#1A0F00]/20" style={{ backgroundColor: COLOR_MAP[option.toLowerCase()] }} />}{option}</button>; })}</div></div>}
        <div className="mb-6"><label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">Quantity</label><div className="flex items-center border border-[#1A0F00]/30 w-fit rounded-md overflow-hidden"><button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} className="w-9 h-9 font-raleway text-lg border-r border-[#1A0F00]/30">−</button><span className="w-12 text-center font-typewriter text-[15px]">{qty}</span><button type="button" onClick={() => setQty((value) => value + 1)} className="w-9 h-9 font-raleway text-lg border-l border-[#1A0F00]/30">+</button></div></div>
        <button type="button" onClick={addChannel} className="w-full btn-primary justify-center mb-4">{added ? <><CheckCircle size={15} /> Added ✓</> : <><ShoppingBag size={15} /> Add to Enquiry</>}</button><Link href="/enquiry" className="btn-outline w-full justify-center text-center">Go to Enquiry →</Link>
      </div></div>
    </div></div>}

    {tab === "fittings" && <div id="fittings" className="site-container py-10 lg:py-12">
      <div className="mb-8"><h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.2rem)] text-[#1A0F00] mb-3">General Fittings</h2></div>
      <div className="flex flex-wrap gap-2 my-8">{["All", ...FITTING_FAMILIES].map((option) => <button key={option} type="button" onClick={() => setFamily(option)} className={optionClass(family === option)}>{option}</button>)}</div>
      {family === "Accessories" && <div className="mb-8 border border-[#1A0F00]/15 rounded-lg bg-white p-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Typical Channel Assembly</p><img src="/images/products/metal-framing/fittings/accessories-assembly.png" alt="UL2335 channel hanger and UL2540 fluorescent adapter with spring nut, assembled on a channel" className="w-full max-w-2xl mx-auto object-contain" /><p className="font-raleway text-[12px] text-[#5C4A30] leading-relaxed mt-3 text-center">The UL2335 channel hanger suspends the channel from a threaded rod; the UL2540 fluorescent adapter locks into the slot with a spring nut to carry a light fitting below.</p></div>}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">{filteredFittings.map((fitting) => <CatalogueCard key={fitting.code} item={fitting} added={addedFitting === fitting.code} onAdd={() => addFitting(fitting)} />)}</div>
    </div>}

    {tab === "cantilever" && <div id="cantilever" className="site-container py-10 lg:py-12">
      <div className="mb-8"><h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.2rem)] text-[#1A0F00] mb-3">Cantilever Brackets</h2></div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">{CANTILEVER_BRACKETS.map((item) => <CatalogueCard key={item.code} item={item} added={addedFitting === item.code} onAdd={() => addCatalogueItem(item, "Cantilever Brackets")} />)}</div>
    </div>}

    {tab === "fasteners" && <div id="fasteners" className="site-container py-10 lg:py-12">
      <div className="mb-8"><h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.2rem)] text-[#1A0F00] mb-3">Fasteners</h2></div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">{FASTENERS.map((item) => <CatalogueCard key={item.code} item={item} added={addedFitting === item.code} onAdd={() => addCatalogueItem(item, "Fasteners")} />)}</div>
    </div>}

    {tab === "clamps" && <div id="clamps" className="site-container py-10 lg:py-12">
      <div className="mb-8"><h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.2rem)] text-[#1A0F00] mb-3">Clamps & Trolley Assemblies</h2></div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">{CLAMPS.map((item) => <CatalogueCard key={item.code} item={item} added={addedFitting === item.code} onAdd={() => addCatalogueItem(item, "Clamps & Trolley Assemblies")} />)}</div>
    </div>}
  </>;
}
