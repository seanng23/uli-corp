"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { generateItemId } from "@/lib/cart-store";
import type { FloorTrunkingFamily, FloorTrunkingSystem, FloorTrunkingTab } from "@/data/floor-trunking";
import ProductGallery from "./ProductGallery";

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

function FamilyCard({ family, added, onAdd }: { family: FloorTrunkingFamily; added: boolean; onAdd: () => void }) {
  return <div className="border border-[#1A0F00]/15 rounded-lg bg-white p-4 flex flex-col">
    <img src={family.image} alt={`${family.name} (${family.code})`} loading="lazy" className="h-40 w-full object-contain mb-3" />
    <p className="font-raleway font-bold text-[14px] text-[#1A0F00] leading-snug">{family.name}</p>
    <p className="font-raleway text-[11px] font-semibold text-[#ff8905] tracking-wide mb-1.5">{family.code}</p>
    <p className="font-raleway text-[12px] text-[#5C4A30] leading-snug">{family.description}</p>
    {family.specs && <ul className="mt-2 space-y-0.5">{family.specs.map((spec) => <li key={spec} className="font-raleway text-[11px] text-[#5C4A30] leading-snug pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-[#ff8905] before:font-bold">{spec}</li>)}</ul>}
    <div className="mt-auto pt-3"><button type="button" onClick={onAdd} className="w-full rounded-md bg-[#ff8905] hover:bg-[#e67b00] text-white py-2 px-3 font-raleway text-[12px] font-bold transition-colors">{added ? "Added ✓" : "Add to Enquiry"}</button></div>
  </div>;
}

export default function FloorTrunkingClient({ system }: { system: FloorTrunkingSystem }) {
  const { addToCart } = useCart();
  const [tab, setTab] = useState<string>(system.tabs[0].key);
  const [addedCode, setAddedCode] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (system.tabs.some((t) => t.key === hash)) setTab(hash);
  }, [system.tabs]);

  function switchTab(next: string) {
    setTab(next);
    history.replaceState(null, "", `#${next}`);
  }

  function addFamily(family: FloorTrunkingFamily, section: string) {
    const specs: Record<string, string> = { "Component Ref.": family.code, Section: section, System: system.name };
    addToCart({ id: generateItemId("ft-" + system.slug + "-" + family.code, specs), productName: `${family.name} (${family.code})`, category: system.cartCategory, slug: system.slug, image: family.image, quantity: 1, specs });
    setAddedCode(family.code);
    setTimeout(() => setAddedCode(null), 2000);
  }

  const activeTab: FloorTrunkingTab = system.tabs.find((t) => t.key === tab) ?? system.tabs[0];

  return <>
    <div className="site-container pt-5 pb-2"><nav className="flex items-center gap-2 font-raleway text-[12px] text-[#5C4A30]"><Link href="/" className="hover:text-[#ff8905] transition-colors">Home</Link><span>/</span><Link href="/products" className="hover:text-[#ff8905] transition-colors">Products</Link><span>/</span><span className="text-[#1A0F00] font-semibold">{system.name}</span></nav></div>
    <div className="site-container"><img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" /></div>

    {/* Header: gallery + description */}
    <div className="site-container py-10 lg:py-12"><div className="grid grid-cols-1 lg:grid-cols-[minmax(0,480px)_1fr] gap-10 lg:gap-14 items-start">
      <ProductGallery images={system.gallery} active={activeImage} onChange={setActiveImage} fit="contain" mainSizes="(max-width:1024px) 100vw, 480px" />
      <div className="min-w-0">
        <h1 className="font-typewriter text-[clamp(1.6rem,2.5vw,2.3rem)] leading-tight text-[#1A0F00] mb-5">{system.name}</h1>
        {system.description.map((para) => <p key={para} className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed mb-4">{para}</p>)}
        {system.features && <CollapsibleSection id="key-components" title="Key Features & Components" defaultOpen>
          <ul className="space-y-1.5">{system.features.map((f) => <li key={f} className="font-raleway text-[13px] text-[#5C4A30] leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#ff8905] before:font-bold">{f}</li>)}</ul>
        </CollapsibleSection>}
        <CollapsibleSection id="typical-installation" title="Typical Installation" defaultOpen={!system.features}>
          <div className="space-y-6">{system.typicals.map((t) => <figure key={t.src} className="border border-[#1A0F00]/15 rounded-lg bg-white p-4"><img src={t.src} alt={t.alt} loading="lazy" className="w-full object-contain" /><figcaption className="font-raleway text-[12px] text-[#5C4A30] leading-relaxed mt-3">{t.caption}</figcaption></figure>)}</div>
        </CollapsibleSection>
      </div>
    </div></div>

    {/* Tabs */}
    <div className="site-container"><div className="flex flex-wrap border-b border-[#1A0F00]/15">{system.tabs.map((t) => <button key={t.key} type="button" onClick={() => switchTab(t.key)} className={`font-raleway text-[13px] font-bold uppercase tracking-widest px-5 py-4 border-b-[3px] transition-colors ${tab === t.key ? "text-[#1A0F00] border-[#ff8905]" : "text-[#5C4A30]/70 hover:text-[#1A0F00] border-transparent"}`}>{t.label}</button>)}</div></div>

    <div id={activeTab.key} className="site-container py-10 lg:py-12">
      <div className="mb-8"><h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.2rem)] text-[#1A0F00]">{activeTab.label}</h2></div>
      {activeTab.explainer && <div className="mb-8 border border-[#1A0F00]/15 rounded-lg bg-white p-5 max-w-3xl">
        <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">{activeTab.explainer.title}</p>
        <img src={activeTab.explainer.image} alt={activeTab.explainer.title} loading="lazy" className="w-full max-w-xl mx-auto object-contain" />
        <p className="font-raleway text-[12px] text-[#5C4A30] leading-relaxed mt-3 text-center">{activeTab.explainer.caption}</p>
      </div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">{activeTab.families.map((family) => <FamilyCard key={family.code} family={family} added={addedCode === family.code} onAdd={() => addFamily(family, activeTab.label)} />)}</div>
      {activeTab.note && <div className="mt-8 border border-[#1A0F00]/15 rounded-lg bg-white p-5 max-w-3xl">
        <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">{activeTab.note.title}</p>
        <div className="space-y-1.5">{activeTab.note.lines.map((line) => <p key={line} className="font-raleway text-[12px] text-[#5C4A30] leading-relaxed">{line}</p>)}</div>
      </div>}
      <div className="mt-10 flex flex-wrap gap-4 items-center">
        <Link href="/enquiry" className="btn-outline justify-center text-center">Go to Enquiry →</Link>
        <p className="font-raleway text-[12px] text-[#5C4A30]">All dimensions are in millimetres. Thickness tolerance ±10%. Custom sizes are subject to confirmation and availability.</p>
      </div>
    </div>
  </>;
}
