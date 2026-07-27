"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { generateItemId } from "@/lib/cart-store";
import DimensionCombobox from "./DimensionCombobox";
import {
  type ChannelSeries,
  type ChannelVariant,
  type Fitting,
  type SpecTable,
  CHANNEL_ACCESSORIES,
  CHANNEL_SERIES,
  CLOSURE_STRIPS,
  DESIGN_FUNDAMENTALS,
  DESIGN_LOAD_DATA,
  FINISHES,
  FITTING_FAMILIES,
  FITTINGS,
  FITTINGS_SHARED_SPEC,
  LENGTH_OPTIONS,
  SCREW_TORQUE,
  STAINLESS_RANGE,
} from "@/data/metal-framing";

type ChannelProfile = ChannelVariant["profile"];

const MAIN_IMAGE = "/images/products/metal-framing-v3.png";
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

function DataTable({ table }: { table: SpecTable }) {
  return <div>
    {table.title && <p className="font-raleway text-[12px] font-bold text-[#1A0F00] mb-2">{table.title}</p>}
    <div className="overflow-x-auto"><table className="w-full text-left min-w-[620px] border border-[#1A0F00]/20"><thead><tr className="bg-[#F0E6CC]">{table.columns.map((heading, index) => <th key={`${heading}-${index}`} className={thClass}>{heading}</th>)}</tr></thead><tbody>{table.rows.map((row, rowIndex) => <tr key={rowIndex} className={rowIndex % 2 === 1 ? "bg-[#1A0F00]/[0.03]" : ""}>{row.map((cell, cellIndex) => <td key={cellIndex} className={tdClass}>{cell}</td>)}</tr>)}</tbody></table></div>
    {table.footnotes?.map((note) => <p key={note} className="font-raleway text-[10px] text-[#5C4A30] leading-relaxed mt-1.5">{note}</p>)}
  </div>;
}

function channelPath(height: number) {
  return `M 13 11 L 13 7 Q 13 3.5 9.5 3.5 L 3.5 3.5 Q 0 3.5 0 7 L 0 ${height - 2} Q 0 ${height} 2 ${height} L 39.3 ${height} Q 41.3 ${height} 41.3 ${height - 2} L 41.3 7 Q 41.3 3.5 37.8 3.5 L 31.8 3.5 Q 28.3 3.5 28.3 7 L 28.3 11`;
}

function Slots({ y }: { y: number }) {
  return <>{[6, 16.65, 27.3].map((x) => <rect key={x} x={x} y={y} width="8" height="2.5" rx="1.25" strokeWidth="1.5" opacity="0.55" />)}</>;
}

function ChannelProfileSVG({ profile, pierced = false, className = "" }: { profile: ChannelProfile; pierced?: boolean; className?: string }) {
  const shallow = profile === "single-shallow" || profile === "back-to-back-shallow";
  const h = shallow ? 20.6 : 41.3;
  const paired = profile === "back-to-back-deep" || profile === "back-to-back-shallow" || profile === "quad";
  const totalW = profile === "quad" ? 82.6 : 41.3;
  const totalH = paired ? h * 2 : h;
  const pair = (x = 0) => <g transform={`translate(${x} 0)`}><path d={channelPath(h)} />{pierced && <Slots y={h - 1.25} />}{paired && <g transform={`translate(0 ${h * 2}) scale(1 -1)`}><path d={channelPath(h)} />{pierced && <Slots y={h - 1.25} />}</g>}</g>;
  return <svg viewBox={`-8 -8 ${totalW + 16} ${totalH + 16}`} className={className} role="img" aria-label={`${profile.replaceAll("-", " ")} channel profile`} fill="none" stroke="#1A0F00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{pair()}{profile === "quad" && pair(41.3)}</svg>;
}

function ReferenceTable({ rows }: { rows: { code: string; description: string }[] }) {
  return <DataTable table={{ columns: ["Code", "Description"], rows: rows.map((item) => [item.code, item.description]) }} />;
}

export default function MetalFramingClient() {
  const { addToCart } = useCart();
  const [tab, setTab] = useState<"channels" | "fittings">("channels");
  const [series, setSeries] = useState<ChannelSeries>(CHANNEL_SERIES[0]);
  const [variant, setVariant] = useState<ChannelVariant>(CHANNEL_SERIES[0].variants[0]);
  const [length, setLength] = useState("3000");
  const [finishing, setFinishing] = useState(FINISHES[0].name);
  const [colour, setColour] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [family, setFamily] = useState<string>("All");
  const [addedFitting, setAddedFitting] = useState<string | null>(null);

  useEffect(() => { if (window.location.hash === "#fittings") setTab("fittings"); }, []);

  function switchTab(next: "channels" | "fittings") {
    setTab(next);
    history.replaceState(null, "", next === "fittings" ? "#fittings" : "#channels");
  }

  function selectSeries(next: ChannelSeries) {
    setSeries(next);
    setVariant(next.variants[0]);
    setColour("");
  }

  function addChannel() {
    const stainless = series.key === "stainless";
    const specs: Record<string, string> = {
      Series: series.label,
      "Product Code": variant.code,
      Profile: variant.name,
      "Width × Height (mm)": `${variant.widthMm} × ${variant.heightMm}`,
      "Thickness (mm)": String(variant.thicknessMm),
      "Length (mm)": length,
      ...(!stainless ? { Finishing: finishing } : {}),
      ...(colour ? { "Finishing Colour": colour } : {}),
    };
    addToCart({ id: generateItemId("metal-framing-" + variant.code, specs), productName: `Metal Framing Channel ${variant.code}`, category: "Metal Framing Systems", slug: "metal-framing-system", image: MAIN_IMAGE, quantity: qty, specs });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  }

  function addFitting(fitting: Fitting) {
    const specs: Record<string, string> = { "Product No.": fitting.code, Family: fitting.family, ...(fitting.weightG ? { "Weight (g)": String(fitting.weightG) } : {}) };
    addToCart({ id: generateItemId("mf-fitting-" + fitting.code, specs), productName: `${fitting.code} · ${fitting.family}`, category: "Metal Framing Systems", slug: "metal-framing-system", image: fitting.image, quantity: 1, specs });
    setAddedFitting(fitting.code);
    setTimeout(() => setAddedFitting(null), 2000);
  }

  const powderCoated = finishing.includes("Powder Coating");
  const filteredFittings = family === "All" ? FITTINGS : FITTINGS.filter((fitting) => fitting.family === family);

  return <>
    <div className="site-container pt-5 pb-2"><nav className="flex items-center gap-2 font-raleway text-[12px] text-[#5C4A30]"><Link href="/" className="hover:text-[#ff8905] transition-colors">Home</Link><span>/</span><Link href="/products" className="hover:text-[#ff8905] transition-colors">Products</Link><span>/</span><span className="text-[#1A0F00] font-semibold">Metal Framing System</span></nav></div>
    <div className="site-container"><img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" /></div>
    <div className="site-container"><div className="flex border-b border-[#1A0F00]/15">{[["channels", "Channels & Combinations"], ["fittings", "General Fittings"]].map(([key, label]) => <button key={key} type="button" onClick={() => switchTab(key as "channels" | "fittings")} className={`font-raleway text-[13px] font-bold uppercase tracking-widest px-5 py-4 border-b-[3px] transition-colors ${tab === key ? "text-[#1A0F00] border-[#ff8905]" : "text-[#5C4A30]/70 hover:text-[#1A0F00] border-transparent"}`}>{label}</button>)}</div></div>

    {tab === "channels" ? <div id="channels" className="site-container py-10 lg:py-12"><div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_540px] gap-10 lg:gap-14 items-start">
      <div className="min-w-0">
        <div className="mb-10 relative aspect-square overflow-hidden rounded-2xl border border-[#1A0F00]/20"><Image fill src={MAIN_IMAGE} alt="U-LI Metal Framing System" className="object-cover object-center" sizes="(max-width:1024px) 100vw, 50vw" priority /></div>
        <CollapsibleSection id="description" title="Description" defaultOpen><p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed mb-5">UliStrut® metal framing / slotted strut channel system comprises roll-formed carbon steel channels in UL1000 (41.3 × 41.3) and UL3300 (41.3 × 20.6) profiles with back-to-back and 2×2 combinations, pierced (T) versions and stainless steel variants; used for supports, racks, and electrical/mechanical services.</p><p className="font-raleway text-[12px] font-bold uppercase tracking-widest text-[#1A0F00] mb-2">Design basis</p><ul className="list-disc pl-5 space-y-1.5">{DESIGN_FUNDAMENTALS.map((item) => <li key={item} className="font-raleway text-[13px] text-[#5C4A30] leading-relaxed">{item}</li>)}</ul></CollapsibleSection>
        <CollapsibleSection id="finishes" title="Finishes"><dl className="space-y-4">{FINISHES.map((item) => <div key={item.name}><dt className="font-raleway text-[13px] font-bold text-[#1A0F00]">{item.name}</dt><dd className="font-raleway text-[12px] text-[#5C4A30] leading-relaxed mt-1">{item.detail}</dd></div>)}</dl><p className="font-raleway text-[11px] text-[#5C4A30] mt-4">Alternative steel grades and surface finishes are available upon request and may be subject to minimum order quantities.</p></CollapsibleSection>
        <CollapsibleSection id="elements" title="Elements of Section"><div className="space-y-7">{CHANNEL_SERIES.filter((item) => item.elementsOfSection).map((item) => <div key={item.key}><p className="font-raleway text-[12px] font-bold text-[#1A0F00] mb-2">{item.label}</p><DataTable table={item.elementsOfSection!} /></div>)}</div></CollapsibleSection>
        <CollapsibleSection id="loading" title="Loading Data (Beam & Column)"><div className="space-y-10">{CHANNEL_SERIES.map((item) => item.variants.filter((v) => v.beamLoad || v.columnLoad).map((v) => <div key={v.code}><p className="font-raleway text-[13px] font-bold text-[#1A0F00] mb-3">{v.code}</p><div className="space-y-6">{v.beamLoad && <DataTable table={v.beamLoad} />}{v.columnLoad && <DataTable table={v.columnLoad} />}</div></div>))}</div></CollapsibleSection>
        <CollapsibleSection id="accessories" title="Closure Strips & Channel Accessories"><div className="space-y-6"><ReferenceTable rows={CLOSURE_STRIPS.items} /><ReferenceTable rows={CHANNEL_ACCESSORIES} /></div></CollapsibleSection>
        <CollapsibleSection id="stainless-range" title="Stainless Steel Range"><ReferenceTable rows={STAINLESS_RANGE} /></CollapsibleSection>
      </div>

      <div className="lg:sticky lg:top-24"><div className="border border-white/40 p-6 bg-white/15 rounded-2xl shadow-[0_8px_30px_rgba(26,15,0,0.12)]">
        <h1 className="font-typewriter text-[clamp(1.4rem,2vw,1.9rem)] leading-tight text-[#1A0F00] mb-5">Configure Channel</h1>
        <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Series</p><div className="grid grid-cols-2 gap-2">{CHANNEL_SERIES.map((item) => <button key={item.key} type="button" onClick={() => selectSeries(item)} className={optionClass(series.key === item.key)}>{item.label}</button>)}</div></div>
        <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Profile / Version</p><div className="flex flex-wrap gap-2">{series.variants.map((item) => <button key={item.code} type="button" onClick={() => setVariant(item)} className={`rounded-md border p-2 flex flex-col items-center gap-1 transition-colors ${variant.code === item.code ? "border-[#ff8905] bg-[#ff8905]/5" : "border-[#1A0F00]/20 hover:border-[#1A0F00]/50"}`}><ChannelProfileSVG profile={item.profile} pierced={item.pierced} className="w-16 h-16" /><span className="font-raleway text-[10px] font-bold text-[#1A0F00]">{item.code}</span></button>)}</div></div>
        <div className="bg-[#F0E6CC]/40 border border-[#1A0F00]/15 rounded-md p-3 mb-5 space-y-1">{[["Code", variant.code], ["Profile", variant.name], ["Width × Height (mm)", `${variant.widthMm} × ${variant.heightMm}`], ["Thickness (mm)", String(variant.thicknessMm)], ["Weight (kg/m)", String(variant.weightKgPerM)]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 font-raleway text-[11px]"><span className="text-[#5C4A30]">{label}</span><span className="font-semibold text-[#1A0F00] text-right">{value}</span></div>)}{variant.notes?.map((note) => <p key={note} className="font-raleway text-[10px] text-[#5C4A30] leading-relaxed pt-2">{note}</p>)}</div>
        <div className="mb-5"><label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">Length (mm)</label><DimensionCombobox value={length} onChange={setLength} options={LENGTH_OPTIONS} /></div>
        {series.key === "stainless" ? <div className="mb-5 rounded-md border border-[#1A0F00]/15 bg-[#F0E6CC]/40 p-3 font-raleway text-[12px] font-semibold text-[#1A0F00]">Material: Stainless Steel 316-S31</div> : <><div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Finishing</p><div className="grid grid-cols-2 gap-2">{[...FINISHES.map((item) => item.name), "Others / Custom Finishing"].map((option) => <button key={option} type="button" onClick={() => { setFinishing(option); if (!option.includes("Powder Coating")) setColour(""); }} className={`${optionClass(finishing === option)} text-left`}>{option}</button>)}</div></div>{powderCoated && <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Finishing Colour</p><div className="flex flex-wrap gap-2">{COLORS.map((option) => { const active = colour === option; return <button key={option} type="button" onClick={() => setColour(active ? "" : option)} className={`flex items-center gap-2 ${optionClass(active)}`}>{option !== "Others / Custom Colour" && <span className="w-3 h-3 rounded-full border border-[#1A0F00]/20" style={{ backgroundColor: COLOR_MAP[option.toLowerCase()] }} />}{option}</button>; })}</div></div>}</>}
        <div className="mb-6"><label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">Quantity</label><div className="flex items-center border border-[#1A0F00]/30 w-fit rounded-md overflow-hidden"><button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} className="w-9 h-9 font-raleway text-lg border-r border-[#1A0F00]/30">−</button><span className="w-12 text-center font-typewriter text-[15px]">{qty}</span><button type="button" onClick={() => setQty((value) => value + 1)} className="w-9 h-9 font-raleway text-lg border-l border-[#1A0F00]/30">+</button></div></div>
        <button type="button" onClick={addChannel} className="w-full btn-primary justify-center mb-4">{added ? <><CheckCircle size={15} /> Added ✓</> : <><ShoppingBag size={15} /> Add to Enquiry</>}</button><Link href="/enquiry" className="btn-outline w-full justify-center text-center">Go to Enquiry →</Link>
      </div></div>
    </div></div> : <div id="fittings" className="site-container py-10 lg:py-12">
      <div className="mb-8"><h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.2rem)] text-[#1A0F00] mb-3">General Fittings</h2><p className="font-raleway text-[14px] text-[#5C4A30] leading-relaxed">{FITTINGS_SHARED_SPEC}</p></div>
      <CollapsibleSection id="design-load-data" title="Design Load Data"><div className="space-y-6">{DESIGN_LOAD_DATA.map((table, index) => <DataTable key={index} table={table} />)}</div></CollapsibleSection>
      <CollapsibleSection id="screw-torque" title="Design Screw Torque"><DataTable table={SCREW_TORQUE} /></CollapsibleSection>
      <div className="flex flex-wrap gap-2 my-8">{["All", ...FITTING_FAMILIES].map((option) => <button key={option} type="button" onClick={() => setFamily(option)} className={optionClass(family === option)}>{option}</button>)}</div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">{filteredFittings.map((fitting) => <div key={fitting.code} className="border border-[#1A0F00]/15 rounded-lg bg-white p-3 flex flex-col"><img src={fitting.image} alt={fitting.code} loading="lazy" className="h-36 w-full object-contain mb-2" /><p className="font-raleway font-bold text-[13px] text-[#1A0F00]">{fitting.code}</p><p className="font-raleway text-[12px] text-[#5C4A30] leading-snug line-clamp-3">{fitting.description}</p><p className="font-raleway text-[11px] text-[#5C4A30] mt-1">{fitting.weightG ? `${fitting.weightG} g` : ""}{fitting.weightG && fitting.dims ? " · " : ""}{fitting.dims ?? ""}</p>{fitting.table && <details><summary className="cursor-pointer text-[11px] font-bold uppercase tracking-widest text-[#ff8905] mt-1">Data</summary><div className="mt-2"><DataTable table={fitting.table} /></div></details>}<div className="mt-auto pt-2"><button type="button" onClick={() => addFitting(fitting)} className="w-full rounded-md bg-[#ff8905] hover:bg-[#e67b00] text-white py-2 px-3 font-raleway text-[12px] font-bold transition-colors">{addedFitting === fitting.code ? "Added ✓" : "Add to Enquiry"}</button></div></div>)}</div>
    </div>}
  </>;
}
