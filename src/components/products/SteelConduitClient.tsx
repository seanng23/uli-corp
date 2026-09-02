"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, FileText, Award, ShoppingBag, CheckCircle } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { generateItemId } from "@/lib/cart-store";
import {
  ACCESSORIES,
  CABLE_MGMT,
  ELECTRICAL_WIRING,
} from "@/data/steel-conduit";
import ProductGallery from "./ProductGallery";
import MobileDocuments from "./MobileDocuments";

const MAIN_IMAGE = "/images/products/steel-conduit-v2.png";
const SYSTEMS = ["Cable Management", "Electrical Wiring"];
const STANDARD_OPTIONS: Record<string, string[]> = {
  "Cable Management": ["MS IEC 61386-1 / MS 61386-21", "Others"],
  "Electrical Wiring": ["BS 31 : 1940", "Others"],
};
const FINISHING = [
  "Pre-Galvanised Steel (Unpainted)",
  "Pre-Galvanised Steel with Epoxy Powder Coated",
  "Others / Custom Finishing",
];
const COLORS = ["Orange", "White", "Green", "Red", "Grey", "Others / Custom Colour"];
const COLOR_MAP: Record<string, string> = {
  orange: "#ff8905",
  white: "#ffffff",
  green: "#4a7c59",
  red: "#cc2222",
  grey: "#9aa0a6",
};

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
      <button onClick={() => setOpen((o) => !o)} className="flex items-center justify-between w-full py-4 text-left">
        <span className="font-raleway text-[13px] font-bold uppercase tracking-widest text-[#1A0F00]">{title}</span>
        {open ? <ChevronUp size={16} strokeWidth={2.5} className="text-[#1A0F00] flex-shrink-0" /> : <ChevronDown size={16} strokeWidth={2.5} className="text-[#1A0F00] flex-shrink-0" />}
      </button>
      {open && <div className="pb-6">{children}</div>}
    </div>
  );
}

const thClass = "font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20";
const tdClass = "font-raleway text-[13px] text-[#5C4A30] px-3 py-1.5 border-b border-[#1A0F00]/10";

function CableManagementTable({ classNumber }: { classNumber: 3 | 4 }) {
  return (
    <div>
      <p className="font-raleway text-[12px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Class {classNumber}</p>
      <div className="border border-[#1A0F00]/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
          <thead><tr className="bg-[#F0E6CC]">
            {[
              "Item Code", "Nominal Size (mm)", "Outside Dia. Min (mm)", "Outside Dia. Max (mm)",
              "Inside Dia. Min (mm)", "Ext. Thread Length Min (mm)",
            ].map((heading) => <th key={heading} className={thClass}>{heading}</th>)}
          </tr></thead>
          <tbody>{CABLE_MGMT.rows.map((row, i) => (
            <tr key={row.nominalSize} className={i % 2 === 1 ? "bg-[#1A0F00]/[0.03]" : ""}>
              <td className={tdClass}>{classNumber === 3 ? row.class3Code : row.class4Code}</td>
              <td className={tdClass}>{row.nominalSize}</td><td className={tdClass}>{row.odMin.toFixed(1)}</td>
              <td className={tdClass}>{row.odMax.toFixed(1)}</td><td className={tdClass}>{row.idMin.toFixed(1)}</td>
              <td className={tdClass}>{row.extThreadMin.toFixed(1)}</td>
            </tr>
          ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function SteelConduitClient() {
  const { addToCart } = useCart();
  const galleryImages = Array.from({ length: 4 }, () => MAIN_IMAGE);
  const [activeImage, setActiveImage] = useState(0);
  const [system, setSystem] = useState(SYSTEMS[0]);
  const [selectedStandard, setSelectedStandard] = useState(STANDARD_OPTIONS[SYSTEMS[0]][0]);
  const [nominalSize, setNominalSize] = useState(20);
  const [wiringSize, setWiringSize] = useState(ELECTRICAL_WIRING.rows[0].sizeInch);
  const [selectedFinishing, setSelectedFinishing] = useState(FINISHING[0]);
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [certOpen, setCertOpen] = useState(false);

  const isCableManagement = system === "Cable Management";
  const cableRow = CABLE_MGMT.rows.find((row) => row.nominalSize === nominalSize) ?? CABLE_MGMT.rows[0];
  const wiringRow = ELECTRICAL_WIRING.rows.find((row) => row.sizeInch === wiringSize) ?? ELECTRICAL_WIRING.rows[0];
  const standardOptions = STANDARD_OPTIONS[system];

  function handleSystemChange(option: string) {
    setSystem(option);
    setSelectedStandard(STANDARD_OPTIONS[option][0]);
  }

  function handleAddToCart() {
    const specs: Record<string, string> = {
      System: system,
      Standard: selectedStandard,
      Size: isCableManagement ? `${nominalSize}mm` : wiringSize,
      Finishing: selectedFinishing,
      ...(selectedColor ? { "Finishing Color": selectedColor } : {}),
    };
    const id = generateItemId("steel-conduit", specs);
    addToCart({ id, productName: "Steel Conduit", category: "Cable Support Systems", specs, quantity: qty, slug: "steel-conduit", image: MAIN_IMAGE });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  }

  return (
    <>
      <div className="site-container pt-5 pb-2">
        <nav className="flex items-center gap-2 font-raleway text-[12px] text-[#5C4A30]">
          <Link href="/" className="hover:text-[#ff8905] transition-colors">Home</Link><span>/</span>
          <Link href="/products" className="hover:text-[#ff8905] transition-colors">Products</Link><span>/</span>
          <span className="text-[#1A0F00] font-semibold">Steel Conduit</span>
        </nav>
      </div>
      <div className="site-container"><img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" /></div>

      <div className="site-container py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_540px] gap-10 lg:gap-14 items-start">
          <div className="contents lg:block">
            <ProductGallery images={galleryImages} alt="U-LI Steel Conduit" active={activeImage} onChange={setActiveImage} className="order-1 lg:order-none lg:mb-10" />
            <div className="order-3 lg:order-none">

            <CollapsibleSection id="description" title="Description" defaultOpen>
              <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed">Electrical steel conduits for enclosed cable protection in industrial, commercial, and residential installations. Supplied in 3.81-metre lengths threaded at both ends, with a coupling fitted on one end and a plastic end cap protecting the other. Available as a conduit system for cable management certified to MS IEC 61386-1 / MS 61386-21 (Class 3 and Class 4), or as steel conduit for electrical wiring certified to BS 31 : 1940 by SIRIM QAS International. Colour epoxy powder-coated conduits are supplied upon request in 3.0-metre lengths.</p>
            </CollapsibleSection>

            <CollapsibleSection id="cable-management" title="Conduit System for Cable Management">
              <div className="space-y-5">
                <div><p className="font-raleway text-[14px] text-[#5C4A30] leading-relaxed">{CABLE_MGMT.certification}</p><p className="font-raleway text-[14px] text-[#5C4A30] leading-relaxed">Standard: {CABLE_MGMT.standard} | Classification: {CABLE_MGMT.classification}</p></div>
                <CableManagementTable classNumber={3} /><CableManagementTable classNumber={4} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection id="electrical-wiring" title="Steel Conduit for Electrical Wiring">
              <div className="space-y-4">
                <div><p className="font-raleway text-[14px] text-[#5C4A30] leading-relaxed">{ELECTRICAL_WIRING.certification}</p><p className="font-raleway text-[14px] text-[#5C4A30] leading-relaxed">Standard: {ELECTRICAL_WIRING.standard}</p></div>
                <div className="border border-[#1A0F00]/20"><div className="overflow-x-auto"><table className="w-full text-left min-w-[1200px]">
                  <thead><tr className="bg-[#F0E6CC]">{["Item Code", "Nominal Size (inch)", "Outside Dia. Min (mm)", "Outside Dia. Max (mm)", "Wall Thickness Min (mm)", "Wall Thickness Nominal (mm)", "Threads per Inch", "Thread Length (mm)"].map((heading) => <th key={heading} className={thClass}>{heading}</th>)}</tr></thead>
                  <tbody>{ELECTRICAL_WIRING.rows.map((row, i) => <tr key={row.itemCode} className={i % 2 === 1 ? "bg-[#1A0F00]/[0.03]" : ""}>
                    <td className={tdClass}>{row.itemCode}</td><td className={tdClass}>{row.sizeInch}</td><td className={tdClass}>{row.odMin.toFixed(2)}</td><td className={tdClass}>{row.odMax.toFixed(2)}</td><td className={tdClass}>{row.wallMin.toFixed(2)}</td><td className={tdClass}>{row.wallNominal.toFixed(2)}</td><td className={tdClass}>{row.threadsPerInch}</td><td className={tdClass}>{row.threadLenMin.toFixed(1)} - {row.threadLenMax.toFixed(1)}</td>
                  </tr>)}</tbody>
                </table></div></div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection id="accessories" title="Accessories">
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-[#1A0F00]/20"><thead><tr className="bg-[#1A0F00]/5"><th className={`${thClass} w-[60px]`}>No.</th><th className={thClass}>Description</th></tr></thead>
                  <tbody>{ACCESSORIES.map((accessory, i) => <tr key={accessory} className={i % 2 === 1 ? "bg-[#1A0F00]/[0.03]" : ""}><td className={`${tdClass} py-2`}>{i + 1}</td><td className={`${tdClass} py-2`}>{accessory}</td></tr>)}</tbody>
                </table>
              </div>
            </CollapsibleSection>
                      <MobileDocuments onEnlargeCertificate={() => setCertOpen(true)} />
            </div>
          </div>

          <div className="order-2 lg:order-none">
            <div className="border border-white/40 p-6 bg-white/15 rounded-2xl shadow-[0_8px_30px_rgba(26,15,0,0.12)]">
              <h1 className="font-typewriter text-[clamp(1.4rem,2vw,1.9rem)] leading-tight text-[#1A0F00] mb-2">Steel Conduit</h1>
              <p className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#5C4A30] mb-5">Item No: <span className="text-[#1A0F00]">C-ULI</span></p>
              <div className="mb-5 pb-5 border-b border-[#1A0F00]/15"><div className="flex flex-wrap gap-x-4 gap-y-1"><span className="font-raleway text-[12px] text-[#5C4A30]">L: 3.81m (3.0m for colour conduits)</span></div></div>

              <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">System</p><div className="flex flex-wrap gap-2">{SYSTEMS.map((option) => <button key={option} onClick={() => handleSystemChange(option)} className={`px-3 py-2 rounded-md font-raleway text-[11px] font-semibold border transition-all duration-150 ${system === option ? "bg-[#ff8905] border-[#ff8905] text-white" : "bg-transparent border-[#1A0F00]/40 text-[#1A0F00] hover:border-[#1A0F00]"}`}>{option}</button>)}</div></div>
              <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Standard</p><div className="flex flex-wrap gap-2">{standardOptions.map((option) => <button key={option} type="button" onClick={() => setSelectedStandard(option)} className={`px-3 py-1.5 rounded-md font-raleway text-[11px] font-semibold border transition-all duration-150 ${selectedStandard === option ? "bg-[#ff8905] border-[#ff8905] text-white" : "bg-transparent border-[#1A0F00]/40 text-[#1A0F00] hover:border-[#1A0F00]"}`}>{option}</button>)}</div></div>

              {isCableManagement
                ? <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Nominal Size</p><div className="flex gap-2">{CABLE_MGMT.rows.map((row) => <button key={row.nominalSize} onClick={() => setNominalSize(row.nominalSize)} className={`px-3 py-2 rounded-md font-raleway text-[11px] font-semibold border transition-all duration-150 ${nominalSize === row.nominalSize ? "bg-[#ff8905] border-[#ff8905] text-white" : "bg-transparent border-[#1A0F00]/40 text-[#1A0F00] hover:border-[#1A0F00]"}`}>{row.nominalSize}mm</button>)}</div></div>
                : <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Nominal Size</p><div className="flex flex-wrap gap-2">{ELECTRICAL_WIRING.rows.map((row) => <button key={row.itemCode} onClick={() => setWiringSize(row.sizeInch)} className={`px-3 py-2 rounded-md font-raleway text-[11px] font-semibold border transition-all duration-150 ${wiringSize === row.sizeInch ? "bg-[#ff8905] border-[#ff8905] text-white" : "bg-transparent border-[#1A0F00]/40 text-[#1A0F00] hover:border-[#1A0F00]"}`}>{row.sizeInch}</button>)}</div></div>}

              <div className="border border-[#1A0F00]/15 rounded-md p-4 mb-5">
                <div className="grid grid-cols-[1fr_auto] gap-x-5 gap-y-3 items-baseline">
                  <span className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00]">Outside Diameter</span>
                  <span className="font-raleway text-[13px] text-[#5C4A30] text-right"><span className="text-[#1A0F00] font-semibold">{isCableManagement ? cableRow.odMin.toFixed(1) : wiringRow.odMin.toFixed(2)} - {isCableManagement ? cableRow.odMax.toFixed(1) : wiringRow.odMax.toFixed(2)}</span> mm</span>
                  {isCableManagement ? <>
                    <span className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00]">Inside Diameter</span>
                    <span className="font-raleway text-[13px] text-[#5C4A30] text-right">Min <span className="text-[#1A0F00] font-semibold">{cableRow.idMin.toFixed(1)}</span> mm</span>
                    <span className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00]">External Thread Length</span>
                    <span className="font-raleway text-[13px] text-[#5C4A30] text-right">Min <span className="text-[#1A0F00] font-semibold">{cableRow.extThreadMin.toFixed(1)}</span> mm</span>
                  </> : <>
                    <span className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00]">Wall Thickness</span>
                    <span className="font-raleway text-[13px] text-[#5C4A30] text-right">Min <span className="text-[#1A0F00] font-semibold">{wiringRow.wallMin.toFixed(2)}</span> / Nominal <span className="text-[#1A0F00] font-semibold">{wiringRow.wallNominal.toFixed(2)}</span> mm</span>
                    <span className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00]">Threads per Inch</span>
                    <span className="font-raleway text-[13px] text-[#5C4A30] text-right"><span className="text-[#1A0F00] font-semibold">{wiringRow.threadsPerInch}</span></span>
                    <span className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00]">Thread Length</span>
                    <span className="font-raleway text-[13px] text-[#5C4A30] text-right"><span className="text-[#1A0F00] font-semibold">{wiringRow.threadLenMin.toFixed(1)} - {wiringRow.threadLenMax.toFixed(1)}</span> mm</span>
                  </>}
                </div>
              </div>

              <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Finishing</p><div className="grid grid-cols-3 gap-2 auto-rows-fr">{FINISHING.map((option) => <button key={option} onClick={() => setSelectedFinishing(option)} className={`px-3 py-2 rounded-md font-raleway text-[11px] font-semibold border transition-all duration-150 text-left leading-snug ${selectedFinishing === option ? "bg-[#ff8905] border-[#ff8905] text-white" : "bg-transparent border-[#1A0F00]/30 text-[#1A0F00] hover:border-[#1A0F00]"}`}>{option}</button>)}</div></div>

              <div className="mb-5"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Finishing Color</p><div className="flex flex-wrap gap-2">{COLORS.map((colour) => { const active = selectedColor === colour; return <button key={colour} onClick={() => setSelectedColor(active ? "" : colour)} className={`flex items-center gap-2 px-3 py-1.5 rounded-md border font-raleway text-[11px] font-semibold transition-all duration-150 ${active ? "border-[#ff8905] bg-[#ff8905]/10 text-[#1A0F00]" : "border-[#1A0F00]/30 text-[#1A0F00] hover:border-[#1A0F00]"}`}>{colour !== "Others / Custom Colour" && <span className="w-3 h-3 rounded-full border border-[#1A0F00]/20 flex-shrink-0" style={{ backgroundColor: COLOR_MAP[colour.toLowerCase()] }} />}{colour}</button>; })}</div><p className="font-raleway text-[11px] text-[#5C4A30] leading-relaxed mt-3">Colour conduits are supplied in 3.0m lengths. Other colours available upon request.</p></div>

              <div className="mb-6"><label className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5">Quantity</label><div className="flex items-center gap-0 border border-[#1A0F00]/30 w-fit rounded-md overflow-hidden"><button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center font-raleway text-lg text-[#1A0F00] hover:bg-[#1A0F00]/10 transition-colors border-r border-[#1A0F00]/30">−</button><span className="w-12 text-center font-typewriter text-[15px] text-[#1A0F00]">{qty}</span><button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 flex items-center justify-center font-raleway text-lg text-[#1A0F00] hover:bg-[#1A0F00]/10 transition-colors border-l border-[#1A0F00]/30">+</button></div></div>
              <button onClick={handleAddToCart} className="w-full btn-primary justify-center mb-4">{added ? <><CheckCircle size={15} /> Added to Enquiry</> : <><ShoppingBag size={15} /> Request a Quote</>}</button>
              {added && <Link href="/enquiry" className="btn-outline w-full justify-center text-center">View Enquiry →</Link>}
            </div>

            <div className="hidden lg:block mt-8"><p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#5C4A30] mb-3">Table of Contents</p><ul className="space-y-2">{[["description", "Description"], ["cable-management", "Conduit System for Cable Management"], ["electrical-wiring", "Steel Conduit for Electrical Wiring"], ["accessories", "Accessories"]].map(([id, label]) => <li key={id}><a href={`#${id}`} className="font-raleway text-[13px] text-[#1A0F00] hover:text-[#ff8905] transition-colors">{label}</a></li>)}</ul></div>
            <div className="hidden lg:block mt-8 pt-6 border-t border-[#1A0F00]/15"><button className="flex items-center gap-2.5 font-raleway text-[12px] font-semibold text-[#1A0F00] hover:text-[#ff8905] transition-colors uppercase tracking-wide"><FileText size={14} strokeWidth={2} />Data Sheet</button><div className="mt-6"><p className="flex items-center gap-2.5 font-raleway text-[12px] font-semibold uppercase tracking-wide text-[#1A0F00] mb-3"><Award size={14} strokeWidth={2} className="text-[#ff8905]" />Certificate</p><button onClick={() => setCertOpen(true)} aria-label="Enlarge certificate" className="group relative block w-full max-w-[280px] border border-[#1A0F00]/20 rounded-md overflow-hidden hover:border-[#ff8905] transition-colors"><Image src="/images/product-certificate.png" alt="U-LI Product Certificate" width={400} height={550} className="w-full h-auto" /><span className="absolute inset-0 flex items-center justify-center bg-[#1A0F00]/0 group-hover:bg-[#1A0F00]/10 transition-colors"><span className="opacity-0 group-hover:opacity-100 transition-opacity font-raleway text-[11px] font-semibold text-white bg-[#1A0F00]/75 px-2.5 py-1 rounded">Click to enlarge</span></span></button></div></div>
          </div>
        </div>
      </div>

      {certOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setCertOpen(false)}><div className="relative max-w-2xl w-full bg-white p-4" onClick={(e) => e.stopPropagation()}><button onClick={() => setCertOpen(false)} className="absolute top-2 right-3 font-raleway text-[20px] text-[#1A0F00] hover:text-[#ff8905] transition-colors leading-none">×</button><Image src="/images/product-certificate.png" alt="U-LI Product Certificate" width={800} height={1100} className="w-full h-auto" /></div></div>}
    </>
  );
}
