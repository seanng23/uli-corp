"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle, ChevronDown, ChevronUp, FileText, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { generateItemId } from "@/lib/cart-store";
import DimensionCombobox from "./DimensionCombobox";
import { ACCESSORIES, COVERS, TRAY_PROFILES } from "@/data/wire-cable-tray";

const MAIN_IMAGE = "/images/products/wire-mesh-tray-v4.png";
const STANDARDS = ["DIN EN IEC 61537", "Others"];
const FINISHING = [
  "Aluminum",
  "Electro Galvanised Steel (Unpainted)",
  "Electro-Galvanised Steel with Epoxy Powder Coated",
  "Epoxy Powder Coated",
  "Hot Dip Galvanised",
  "Hot Dip Galvanised with Epoxy Powder Coated",
  "Polyester Powder Coated",
  "Pre-Galvanised Steel (Unpainted)",
  "Pre-Galvanised Steel with Epoxy Powder Coated",
  "Stainless Steel 304",
  "Stainless Steel 316",
  "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)",
  "Others / Custom Finishing",
];
const COLORS = ["Orange", "White", "Green", "Red", "Grey", "Others / Custom Colour"];
const HEIGHT_OPTIONS = ["25", "50", "75", "100", "150"];
const FULL_WIDTH_OPTIONS = ["60", "75", "100", "150", "200", "250", "300", "400", "500", "600"];
const COVER_WIDTH_OPTIONS = ["50", "75", "100", "150", "200", "250", "300", "400", "500", "600"];
const COVER_INTERNAL_WIDTH_OPTIONS = COVERS.map((item) => String(item.internalWidth));
const COLOR_MAP: Record<string, string> = { orange: "#ff8905", white: "#ffffff", green: "#4a7c59", red: "#cc2222", grey: "#9aa0a6" };
const thClass = "font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20";
const tdClass = "font-raleway text-[13px] text-[#5C4A30] px-3 py-1.5 border-b border-[#1A0F00]/10";

function CollapsibleSection({ id, title, children, defaultOpen = false }: { id: string; title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return <div id={id} className="border-t border-[#1A0F00]/20 scroll-mt-24">
    <button onClick={() => setOpen((value) => !value)} className="flex items-center justify-between w-full py-4 text-left">
      <span className="font-raleway text-[13px] font-bold uppercase tracking-widest text-[#1A0F00]">{title}</span>
      {open ? <ChevronUp size={16} strokeWidth={2.5} className="text-[#1A0F00] flex-shrink-0" /> : <ChevronDown size={16} strokeWidth={2.5} className="text-[#1A0F00] flex-shrink-0" />}
    </button>
    {open && <div className="pb-6">{children}</div>}
  </div>;
}

export default function WireCableTrayClient() {
  const { addToCart } = useCart();
  const galleryImages = Array.from({ length: 4 }, () => MAIN_IMAGE);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedStandard, setSelectedStandard] = useState(STANDARDS[0]);
  const [height, setHeight] = useState("25");
  const [width, setWidth] = useState("60");
  const [length, setLength] = useState("3000");
  const [withCover, setWithCover] = useState(false);
  const [selectedFinishing, setSelectedFinishing] = useState(FINISHING[0]);
  const [selectedColor, setSelectedColor] = useState("");
  const [coverWidth, setCoverWidth] = useState("50");
  const [coverInternalWidth, setCoverInternalWidth] = useState(String(COVERS[0].internalWidth));
  const [coverThickness, setCoverThickness] = useState("1.2");
  const [coverLength, setCoverLength] = useState("3000");
  const [coverFinishing, setCoverFinishing] = useState(FINISHING[0]);
  const [coverColor, setCoverColor] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [certOpen, setCertOpen] = useState(false);

  const profile = TRAY_PROFILES.find((item) => String(item.height) === height);
  const standardRow = profile?.rows.find((item) => String(item.width) === width);
  const cover = COVERS.find((item) => String(item.fwbWidth) === coverWidth);
  const reference = standardRow ? `FWB${height} - ${standardRow.refSuffix}` : "";

  function changeHeight(nextHeight: string) {
    setHeight(nextHeight);
  }

  function changeCoverWidth(nextWidth: string) {
    setCoverWidth(nextWidth);
    const nextCover = COVERS.find((item) => String(item.fwbWidth) === nextWidth);
    if (nextCover) {
      setCoverInternalWidth(String(nextCover.internalWidth));
      setCoverThickness(nextCover.thickness.toFixed(1));
    }
  }

  function changeCover(option: boolean) {
    setWithCover(option);
    if (option) {
      const defaultWidth = COVER_WIDTH_OPTIONS.includes(width) ? width : COVER_WIDTH_OPTIONS[0];
      setCoverWidth(defaultWidth);
      const defaultCover = COVERS.find((item) => String(item.fwbWidth) === defaultWidth);
      if (defaultCover) {
        setCoverInternalWidth(String(defaultCover.internalWidth));
        setCoverThickness(defaultCover.thickness.toFixed(1));
      }
    }
  }

  function handleAddToCart() {
    const specs: Record<string, string> = {
      Standard: selectedStandard,
      "Height (mm)": height,
      "Width (mm)": width,
      "Length (mm)": length,
      Finishing: selectedFinishing,
      ...(selectedColor ? { "Finishing Color": selectedColor } : {}),
      ...(reference ? { Reference: reference } : {}),
      Cover: withCover ? "With Cover" : "Without Cover",
      ...(withCover ? {
        "Cover Width (mm)": coverWidth,
        "Cover Internal Width (mm)": coverInternalWidth,
        "Cover Thickness (mm)": coverThickness,
        "Cover Length (mm)": coverLength,
        "Cover Finishing": coverFinishing,
        ...(coverColor ? { "Cover Finishing Color": coverColor } : {}),
        ...(cover ? { "Cover Reference": cover.ref } : {}),
      } : {}),
    };
    const id = generateItemId("wire-cable-tray", specs);
    addToCart({ id, productName: "Wire Mesh Tray", category: "Cable Support Systems", specs, quantity: qty, slug: "wire-cable-tray", image: MAIN_IMAGE });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  }

  return <>
    <div className="site-container pt-5 pb-2"><nav className="flex items-center gap-2 font-raleway text-[12px] text-[#5C4A30]"><Link href="/" className="hover:text-[#ff8905] transition-colors">Home</Link><span>/</span><Link href="/products" className="hover:text-[#ff8905] transition-colors">Products</Link><span>/</span><span className="text-[#1A0F00] font-semibold">Wire Mesh Tray</span></nav></div>
    <div className="site-container"><img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" /></div>

    <div className="site-container py-10 lg:py-12"><div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_540px] gap-10 lg:gap-14 items-start">
      <div className="min-w-0">
        <div className="mb-10 flex gap-4 items-start">
          <div className="flex flex-col gap-3 w-[104px] shrink-0">{galleryImages.map((image, index) => <button key={index} type="button" onClick={() => setActiveImage(index)} aria-label={`View image ${index + 1}`} className={`relative aspect-square w-full overflow-hidden rounded-lg border transition-colors cursor-pointer ${activeImage === index ? "border-[#ff8905] border-2" : "border-[#1A0F00]/20 hover:border-[#1A0F00]/40"}`}><Image src={image} alt={`Wire mesh tray thumbnail ${index + 1}`} fill className="object-cover object-center" sizes="104px" /></button>)}</div>
          <div className="relative flex-1 aspect-square overflow-hidden rounded-2xl border border-[#1A0F00]/20"><Image src={galleryImages[activeImage]} alt="U-LI Wire Mesh Tray" fill priority className="object-contain object-center" sizes="(max-width:1024px) 100vw, 50vw" /></div>
        </div>

        <CollapsibleSection id="description" title="Description" defaultOpen><p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed">Wire mesh trays provide a safe, open solution for routing cables and wires. The wire-frame construction allows air to circulate for proper cable ventilation and gives a track that lets cables be routed around a building in an easily maintainable manner. Manufactured with a 50 x 100 mm screen from 5.00 mm cross and alongside wires, load tested according to DIN EN IEC 61537, and supplied in 3000 mm lengths. Other sizes, lengths, wire diameters and finishes are available upon request.</p></CollapsibleSection>

        <CollapsibleSection id="dimensions" title="Dimensions"><div className="space-y-6">{TRAY_PROFILES.map((item) => <div key={item.height}><p className="font-raleway text-[12px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">FWB {item.height}</p><div className="overflow-x-auto"><table className="w-full text-left min-w-[760px] border border-[#1A0F00]/20"><thead><tr className="bg-[#F0E6CC]">{["Reference", "Height (mm)", "Width (mm)", "Length (mm)", "Theoretical Weight (kg)"].map((heading) => <th key={heading} className={thClass}>{heading}</th>)}</tr></thead><tbody>{item.rows.map((tray, index) => <tr key={tray.refSuffix} className={index % 2 === 1 ? "bg-[#1A0F00]/[0.03]" : ""}><td className={tdClass}>FWB{item.height} - {tray.refSuffix}</td><td className={tdClass}>{item.height}</td><td className={tdClass}>{tray.width}</td><td className={tdClass}>{tray.length}</td><td className={tdClass}>{tray.weight.toFixed(2)}</td></tr>)}</tbody></table></div></div>)}</div></CollapsibleSection>

        <CollapsibleSection id="fwb-cover" title="FWB Cover"><p className="font-raleway text-[14px] text-[#5C4A30] leading-relaxed mb-4">Matching covers for FWB wire mesh trays. Mainly used for horizontal and vertical sections; the cover height is 10 mm.</p><div className="overflow-x-auto"><table className="w-full text-left min-w-[900px] border border-[#1A0F00]/20"><thead><tr className="bg-[#F0E6CC]">{["Reference", "FWB Width (mm)", "Internal Width (mm)", "Thickness (mm)", "Length (mm)", "Theoretical Weight (kg)"].map((heading) => <th key={heading} className={thClass}>{heading}</th>)}</tr></thead><tbody>{COVERS.map((item, index) => <tr key={item.ref} className={index % 2 === 1 ? "bg-[#1A0F00]/[0.03]" : ""}><td className={tdClass}>{item.ref}</td><td className={tdClass}>{item.fwbWidth}</td><td className={tdClass}>{item.internalWidth}</td><td className={tdClass}>{item.thickness.toFixed(1)}</td><td className={tdClass}>{item.length}</td><td className={tdClass}>{item.weight.toFixed(2)}</td></tr>)}</tbody></table></div></CollapsibleSection>

        <CollapsibleSection id="accessories" title="Accessories"><div className="overflow-x-auto"><table className="w-full text-left min-w-[620px] border border-[#1A0F00]/20"><thead><tr className="bg-[#1A0F00]/5"><th className={`${thClass} w-[60px]`}>No.</th><th className={thClass}>Reference</th><th className={thClass}>Description</th></tr></thead><tbody>{ACCESSORIES.map((item, index) => <tr key={item.no} className={index % 2 === 1 ? "bg-[#1A0F00]/[0.03]" : ""}><td className={`${tdClass} py-2`}>{item.no}</td><td className={`${tdClass} py-2`}>{item.ref}</td><td className={`${tdClass} py-2`}>{item.description}</td></tr>)}</tbody></table></div></CollapsibleSection>
      </div>

      <div><div className="border border-white/40 p-6 bg-white/15 rounded-2xl shadow-[0_8px_30px_rgba(26,15,0,0.12)]">
        <h1 className="font-typewriter text-[clamp(1.4rem,2vw,1.9rem)] leading-tight text-[#1A0F00] mb-2">Wire Mesh Tray</h1>
        <p className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#5C4A30] mb-5">Item No: <span className="text-[#1A0F00]">FWB</span></p>
        <div className="mb-5 pb-5 border-b border-[#1A0F00]/15"><p className="font-raleway text-[12px] text-[#5C4A30]">Screen: 50 x 100 mm&nbsp; | &nbsp;Wire: 5.00 mm&nbsp; | &nbsp;L: 3000 mm</p></div>

        <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Standard</p><div className="flex flex-wrap gap-2">{STANDARDS.map((option) => <button key={option} type="button" onClick={() => setSelectedStandard(option)} className={`px-3 py-1.5 rounded-md font-raleway text-[11px] font-semibold border transition-all duration-150 ${selectedStandard === option ? "bg-[#ff8905] border-[#ff8905] text-white" : "bg-transparent border-[#1A0F00]/40 text-[#1A0F00] hover:border-[#1A0F00]"}`}>{option}</button>)}</div></div>
        <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Tray Dimensions</p><div className="grid grid-cols-2 gap-3"><div><label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">Height (mm)</label><DimensionCombobox value={height} onChange={changeHeight} options={HEIGHT_OPTIONS} /></div><div><label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">Width (mm)</label><DimensionCombobox value={width} onChange={setWidth} options={FULL_WIDTH_OPTIONS} /></div><div><label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">Length (mm)</label><DimensionCombobox value={length} onChange={setLength} options={["3000"]} /></div></div></div>
        <p className="font-raleway text-[11px] text-[#5C4A30] leading-relaxed mb-5">Other sizes, lengths, wire diameters and finishes are available upon request.</p>

        <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Finishing</p><div className="grid grid-cols-3 gap-2 auto-rows-fr">{FINISHING.map((option) => <button key={option} onClick={() => setSelectedFinishing(option)} className={`px-3 py-2 rounded-md font-raleway text-[11px] font-semibold border transition-all duration-150 text-left leading-snug ${selectedFinishing === option ? "bg-[#ff8905] border-[#ff8905] text-white" : "bg-transparent border-[#1A0F00]/30 text-[#1A0F00] hover:border-[#1A0F00]"}`}>{option}</button>)}</div></div>
        <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Finishing Color</p><div className="flex flex-wrap gap-2">{COLORS.map((colour) => { const active = selectedColor === colour; return <button key={colour} onClick={() => setSelectedColor(active ? "" : colour)} className={`flex items-center gap-2 px-3 py-1.5 rounded-md border font-raleway text-[11px] font-semibold transition-all duration-150 ${active ? "border-[#ff8905] bg-[#ff8905]/10 text-[#1A0F00]" : "border-[#1A0F00]/30 text-[#1A0F00] hover:border-[#1A0F00]"}`}>{colour !== "Others / Custom Colour" && <span className="w-3 h-3 rounded-full border border-[#1A0F00]/20 flex-shrink-0" style={{ backgroundColor: COLOR_MAP[colour.toLowerCase()] }} />}{colour}</button>; })}</div><p className="font-raleway text-[11px] text-[#5C4A30] leading-relaxed mt-3">Colour availability depends on the selected finishing. Other colours available upon request.</p></div>

        <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">FWB Cover</p><div className="flex flex-wrap gap-2">{[false, true].map((option) => <button key={String(option)} type="button" onClick={() => changeCover(option)} className={`px-3 py-1.5 rounded-md font-raleway text-[11px] font-semibold border transition-all duration-150 ${withCover === option ? "bg-[#ff8905] border-[#ff8905] text-white" : "bg-transparent border-[#1A0F00]/40 text-[#1A0F00] hover:border-[#1A0F00]"}`}>{option ? "With Cover" : "Without Cover"}</button>)}</div>
          {withCover && <div className="mt-4 pl-4 border-l-2 border-[#ff8905]/40 space-y-4">
            <div className="grid grid-cols-2 gap-3"><div><label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">Cover Width (mm)</label><DimensionCombobox value={coverWidth} onChange={changeCoverWidth} options={COVER_WIDTH_OPTIONS} /></div><div><label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">Cover Internal Width (mm)</label><DimensionCombobox value={coverInternalWidth} onChange={setCoverInternalWidth} options={COVER_INTERNAL_WIDTH_OPTIONS} /></div><div><label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">Cover Thickness (mm)</label><DimensionCombobox value={coverThickness} onChange={setCoverThickness} options={["1.2", "1.5"]} allowDecimal /></div><div><label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">Cover Length (mm)</label><DimensionCombobox value={coverLength} onChange={setCoverLength} options={["3000"]} /></div></div>
            <div><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Cover Finishing</p><div className="grid grid-cols-3 gap-2 auto-rows-fr">{FINISHING.map((option) => <button key={option} onClick={() => setCoverFinishing(option)} className={`px-3 py-2 rounded-md font-raleway text-[11px] font-semibold border transition-all duration-150 text-left leading-snug ${coverFinishing === option ? "bg-[#ff8905] border-[#ff8905] text-white" : "bg-transparent border-[#1A0F00]/30 text-[#1A0F00] hover:border-[#1A0F00]"}`}>{option}</button>)}</div></div>
            <div><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Cover Finishing Color</p><div className="flex flex-wrap gap-2">{COLORS.map((colour) => { const active = coverColor === colour; return <button key={colour} onClick={() => setCoverColor(active ? "" : colour)} className={`flex items-center gap-2 px-3 py-1.5 rounded-md border font-raleway text-[11px] font-semibold transition-all duration-150 ${active ? "border-[#ff8905] bg-[#ff8905]/10 text-[#1A0F00]" : "border-[#1A0F00]/30 text-[#1A0F00] hover:border-[#1A0F00]"}`}>{colour !== "Others / Custom Colour" && <span className="w-3 h-3 rounded-full border border-[#1A0F00]/20 flex-shrink-0" style={{ backgroundColor: COLOR_MAP[colour.toLowerCase()] }} />}{colour}</button>; })}</div></div>
          </div>}
        </div>

        <div className="mb-6"><label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">Quantity</label><div className="flex items-center gap-0 border border-[#1A0F00]/30 w-fit rounded-md overflow-hidden"><button onClick={() => setQty((value) => Math.max(1, value - 1))} className="w-9 h-9 flex items-center justify-center font-raleway text-lg text-[#1A0F00] hover:bg-[#1A0F00]/10 transition-colors border-r border-[#1A0F00]/30">−</button><span className="w-12 text-center font-typewriter text-[15px] text-[#1A0F00]">{qty}</span><button onClick={() => setQty((value) => value + 1)} className="w-9 h-9 flex items-center justify-center font-raleway text-lg text-[#1A0F00] hover:bg-[#1A0F00]/10 transition-colors border-l border-[#1A0F00]/30">+</button></div></div>
        <button onClick={handleAddToCart} className="w-full btn-primary justify-center mb-4">{added ? <><CheckCircle size={15} /> Added to Enquiry</> : <><ShoppingBag size={15} /> Request a Quote</>}</button>{added && <Link href="/enquiry" className="btn-outline w-full justify-center text-center">View Enquiry →</Link>}
      </div>

      <div className="mt-8"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#5C4A30] mb-3">Table of Contents</p><ul className="space-y-2">{[["description", "Description"], ["dimensions", "Dimensions"], ["fwb-cover", "FWB Cover"], ["accessories", "Accessories"]].map(([id, label]) => <li key={id}><a href={`#${id}`} className="font-raleway text-[13px] text-[#1A0F00] hover:text-[#ff8905] transition-colors">{label}</a></li>)}</ul></div>
      <div className="mt-8 pt-6 border-t border-[#1A0F00]/15"><button className="flex items-center gap-2.5 font-raleway text-[12px] font-semibold text-[#1A0F00] hover:text-[#ff8905] transition-colors uppercase tracking-wide"><FileText size={14} strokeWidth={2} />Data Sheet</button><div className="mt-6"><p className="flex items-center gap-2.5 font-raleway text-[12px] font-semibold uppercase tracking-wide text-[#1A0F00] mb-3"><Award size={14} strokeWidth={2} className="text-[#ff8905]" />Certificate</p><button onClick={() => setCertOpen(true)} aria-label="Enlarge certificate" className="group relative block w-full max-w-[280px] border border-[#1A0F00]/20 rounded-md overflow-hidden hover:border-[#ff8905] transition-colors"><Image src="/images/product-certificate.png" alt="U-LI Product Certificate" width={400} height={550} className="w-full h-auto" /><span className="absolute inset-0 flex items-center justify-center bg-[#1A0F00]/0 group-hover:bg-[#1A0F00]/10 transition-colors"><span className="opacity-0 group-hover:opacity-100 transition-opacity font-raleway text-[11px] font-semibold text-white bg-[#1A0F00]/75 px-2.5 py-1 rounded">Click to enlarge</span></span></button></div></div>
      </div>
    </div></div>

    {certOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setCertOpen(false)}><div className="relative max-w-2xl w-full bg-white p-4" onClick={(event) => event.stopPropagation()}><button onClick={() => setCertOpen(false)} className="absolute top-2 right-3 font-raleway text-[20px] text-[#1A0F00] hover:text-[#ff8905] transition-colors leading-none">×</button><Image src="/images/product-certificate.png" alt="U-LI Product Certificate" width={800} height={1100} className="w-full h-auto" /></div></div>}
  </>;
}
