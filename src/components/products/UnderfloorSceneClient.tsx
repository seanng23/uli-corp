"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { generateItemId } from "@/lib/cart-store";
import { UNDERFLOOR } from "@/data/floor-trunking";
import { SCENE_INFO, SCENE_VARIANTS, type SceneVariant } from "@/data/underfloor-scene";

type Selection = { type: "hotspot"; index: number } | { type: "extra"; key: string };

export default function UnderfloorSceneClient() {
  const { addToCart } = useCart();
  const [variant, setVariant] = useState<SceneVariant>(SCENE_VARIANTS[0]);
  const [selection, setSelection] = useState<Selection>({ type: "hotspot", index: 0 });
  const [added, setAdded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const infoKey = selection.type === "hotspot" ? variant.hotspots[selection.index].infoKey : selection.key;
  const info = SCENE_INFO[infoKey];

  function select(next: Selection) {
    setSelection(next);
    setAdded(false);
    if (window.innerWidth < 1024) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function switchVariant(next: SceneVariant) {
    setVariant(next);
    setSelection({ type: "hotspot", index: 0 });
    setAdded(false);
  }

  function addToEnquiry() {
    const specs: Record<string, string> = {
      "Component Ref.": info.code,
      Section: info.section,
      System: UNDERFLOOR.name,
      Material: variant.label,
    };
    addToCart({
      id: generateItemId("ft-underfloor-" + info.code + "-" + variant.key, specs),
      productName: `${info.name} (${info.code})`,
      category: UNDERFLOOR.cartCategory,
      slug: UNDERFLOOR.slug,
      image: info.image,
      quantity: 1,
      specs,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return <>
    <div className="site-container pt-5 pb-2"><nav className="flex items-center gap-2 font-raleway text-[12px] text-[#5C4A30]"><Link href="/" className="hover:text-[#ff8905] transition-colors">Home</Link><span>/</span><Link href="/products" className="hover:text-[#ff8905] transition-colors">Products</Link><span>/</span><span className="text-[#1A0F00] font-semibold">Underfloor Trunking Systems</span></nav></div>
    <div className="site-container"><img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" /></div>

    {/* Intro */}
    <div className="site-container pt-8 lg:pt-10 pb-6">
      <h1 className="font-typewriter text-[clamp(1.6rem,2.5vw,2.3rem)] leading-tight text-[#1A0F00] mb-4">Underfloor Trunking Systems</h1>
      <div className="max-w-3xl">
        {UNDERFLOOR.description.map((para) => <p key={para} className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed mb-3">{para}</p>)}
      </div>
    </div>

    <div className="site-container pb-12 lg:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
        {/* Scene */}
        <div className="min-w-0">
          {/* Variant toggle */}
          <div className="flex flex-wrap gap-2 mb-4">
            {SCENE_VARIANTS.map((v) => {
              const active = variant.key === v.key;
              return (
                <button key={v.key} type="button" onClick={() => switchVariant(v)} className={`rounded-full border px-5 py-2.5 text-left transition-all ${active ? "bg-[#1A0F00] border-[#1A0F00]" : "bg-transparent border-[#1A0F00]/25 hover:border-[#1A0F00]"}`}>
                  <span className={`block font-raleway text-[13px] font-bold ${active ? "text-[#F5EDD6]" : "text-[#1A0F00]"}`}>{v.label}</span>
                  <span className={`block font-raleway text-[10px] uppercase tracking-wider ${active ? "text-[#F5EDD6]/70" : "text-[#5C4A30]"}`}>{v.sublabel}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive drawing */}
          <div className="relative overflow-hidden rounded-2xl border border-[#1A0F00]/15 bg-white p-2 sm:p-4 select-none">
            <div className="relative">
              <Image src={variant.image} alt={`Typical underfloor installation drawing, ${variant.label}`} width={variant.imageWidth} height={variant.imageHeight} className="w-full h-auto block" priority />
              {variant.hotspots.map((h, i) => {
                const active = selection.type === "hotspot" && selection.index === i;
                return (
                  <button
                    key={`${variant.key}-${i}`}
                    type="button"
                    onClick={() => select({ type: "hotspot", index: i })}
                    aria-label={h.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  >
                    {!active && <span className="absolute inset-0 rounded-full bg-[#ff8905]/60 animate-ping" aria-hidden="true" />}
                    <span className={`relative flex items-center justify-center w-7 h-7 rounded-full font-raleway text-[12px] font-bold border-2 transition-all ${active ? "bg-[#1A0F00] border-white text-white scale-110 shadow-lg" : "bg-[#ff8905] border-white/90 text-white shadow-md group-hover:scale-110"}`}>
                      {i + 1}
                    </span>
                    <span className={`pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap rounded-md bg-[#1A0F00] text-[#F5EDD6] font-raleway text-[11px] font-semibold px-2.5 py-1 transition-opacity z-10 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                      {h.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="font-raleway text-[12px] text-[#5C4A30] mt-3">Typical underfloor installation ({variant.label.toLowerCase()}). Tap a numbered marker to view that component.</p>

          {/* Legend */}
          <div className="mt-5 flex flex-wrap gap-2">
            {variant.hotspots.map((h, i) => {
              const active = selection.type === "hotspot" && selection.index === i;
              return (
                <button key={`${variant.key}-legend-${i}`} type="button" onClick={() => select({ type: "hotspot", index: i })} className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-raleway text-[12px] font-semibold transition-colors ${active ? "bg-[#ff8905] border-[#ff8905] text-white" : "border-[#1A0F00]/25 text-[#1A0F00] hover:border-[#1A0F00]"}`}>
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${active ? "bg-white text-[#ff8905]" : "bg-[#ff8905] text-white"}`}>{i + 1}</span>
                  {h.label}
                </button>
              );
            })}
          </div>

          {/* Components not shown in the drawing */}
          {variant.extras.length > 0 && (
            <div className="mt-8">
              <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Not shown in the drawing</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {variant.extras.map((key) => {
                  const extra = SCENE_INFO[key];
                  const active = selection.type === "extra" && selection.key === key;
                  return (
                    <button key={key} type="button" onClick={() => select({ type: "extra", key })} className={`text-left border rounded-lg bg-white p-3 transition-all ${active ? "border-[#ff8905] ring-2 ring-[#ff8905]/25" : "border-[#1A0F00]/15 hover:border-[#1A0F00]/40"}`}>
                      <img src={extra.image} alt={extra.name} loading="lazy" className="h-20 w-full object-contain mb-2" />
                      <span className="block font-raleway text-[12px] font-bold text-[#1A0F00] leading-snug">{extra.name}</span>
                      <span className="block font-raleway text-[11px] font-semibold text-[#ff8905]">{extra.code}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Info panel */}
        <div ref={panelRef} className="lg:sticky lg:top-24 scroll-mt-24">
          <div className="border border-white/40 bg-white/15 rounded-2xl shadow-[0_8px_30px_rgba(26,15,0,0.12)] p-6">
            <div className="rounded-xl border border-[#1A0F00]/15 bg-white p-4 mb-5 relative">
              <span className="absolute top-3 left-4 font-raleway text-[11px] font-bold uppercase tracking-widest text-[#5C4A30]">{info.section}</span>
              <img src={info.image} alt={`${info.name} drawing`} className="h-44 w-full object-contain pt-4" />
            </div>
            <p className="font-raleway text-[12px] font-bold text-[#ff8905] tracking-wide mb-1">{info.code}</p>
            <h2 className="font-typewriter text-[clamp(1.2rem,1.8vw,1.5rem)] leading-tight text-[#1A0F00] mb-3">{info.name}</h2>
            <p className="font-raleway text-[13px] text-[#5C4A30] leading-relaxed mb-3">{info.description}</p>
            {info.specs && (
              <ul className="space-y-1 mb-5">
                {info.specs.map((spec) => <li key={spec} className="font-raleway text-[12px] text-[#5C4A30] leading-snug pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-[#ff8905] before:font-bold">{spec}</li>)}
              </ul>
            )}
            {info.enquire ? (
              <>
                <button type="button" onClick={addToEnquiry} className="w-full btn-primary justify-center mb-3">
                  {added ? <><CheckCircle size={15} /> Added ✓</> : <><ShoppingBag size={15} /> Add to Enquiry</>}
                </button>
                <Link href="/enquiry" className="btn-outline w-full justify-center text-center">Go to Enquiry →</Link>
              </>
            ) : (
              info.linkHref && <Link href={info.linkHref} className="btn-outline w-full justify-center text-center">{info.linkLabel}</Link>
            )}
          </div>
          <p className="font-raleway text-[11px] text-[#5C4A30] mt-4 leading-relaxed">All dimensions are in millimetres. Thickness tolerance ±10%. Custom sizes are subject to confirmation and availability.</p>
        </div>
      </div>
    </div>
  </>;
}
