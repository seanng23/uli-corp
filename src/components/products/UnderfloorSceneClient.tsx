"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { generateItemId } from "@/lib/cart-store";
import { UNDERFLOOR } from "@/data/floor-trunking";
import DimensionCombobox from "./DimensionCombobox";
import {
  COMPONENTS,
  SCENE_VARIANTS,
  UNDERFLOOR_ACCESSORIES,
  type ComponentDef,
  type SceneVariant,
} from "@/data/underfloor-scene";

const chipClass = (active: boolean) =>
  `px-3 py-2 rounded-md font-raleway text-[11px] font-semibold border transition-all duration-150 leading-snug text-left ${active ? "bg-[#ff8905] border-[#ff8905] text-white" : "bg-transparent border-[#1A0F00]/30 text-[#1A0F00] hover:border-[#1A0F00]"}`;
const fieldLabel = "font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5";

function defaultsFor(component: ComponentDef): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of component.fields) {
    if (field.type !== "static") values[field.key] = field.default;
  }
  return values;
}

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

export default function UnderfloorSceneClient() {
  const { addToCart } = useCart();
  const [variant, setVariant] = useState<SceneVariant>(SCENE_VARIANTS[0]);
  const [componentKey, setComponentKey] = useState<string>(SCENE_VARIANTS[0].hotspots[0].componentKey);
  const [allValues, setAllValues] = useState<Record<string, Record<string, string>>>({});
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const component = COMPONENTS[componentKey];
  const values = allValues[componentKey] ?? defaultsFor(component);
  const code = component.codeFor ? component.codeFor(values) : component.code;
  const image = component.imageFor ? component.imageFor(values) : component.image;

  function setValue(key: string, value: string) {
    setAllValues((prev) => ({ ...prev, [componentKey]: { ...(prev[componentKey] ?? defaultsFor(component)), [key]: value } }));
    setAdded(false);
  }

  function selectComponent(key: string) {
    setComponentKey(key);
    setQty(1);
    setAdded(false);
    if (window.innerWidth < 1024) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function switchVariant(next: SceneVariant) {
    setVariant(next);
    setComponentKey(next.hotspots[0].componentKey);
    setQty(1);
    setAdded(false);
  }

  function addToEnquiry() {
    const specs: Record<string, string> = { "Item No.": code, System: UNDERFLOOR.name, Material: variant.label };
    for (const field of component.fields) {
      if (field.type === "static") specs[field.label] = field.value;
      else if (values[field.key]) specs[field.label] = values[field.key];
    }
    addToCart({
      id: generateItemId("ft-underfloor-" + code + "-" + variant.key, specs),
      productName: `${component.name} (${code})`,
      category: UNDERFLOOR.cartCategory,
      slug: UNDERFLOOR.slug,
      image,
      quantity: qty,
      specs,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return <>
    <div className="site-container pt-5 pb-2"><nav className="flex items-center gap-2 font-raleway text-[12px] text-[#5C4A30]"><Link href="/" className="hover:text-[#ff8905] transition-colors">Home</Link><span>/</span><Link href="/products" className="hover:text-[#ff8905] transition-colors">Products</Link><span>/</span><span className="text-[#1A0F00] font-semibold">Underfloor Trunking Systems</span></nav></div>
    <div className="site-container"><img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" /></div>

    <div className="site-container py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-start">
        {/* Left: drawing + legend + extras + info sections */}
        <div className="min-w-0">
          <h1 className="font-typewriter text-[clamp(1.6rem,2.5vw,2.3rem)] leading-tight text-[#1A0F00] mb-5">Underfloor Trunking Systems</h1>

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
                const active = componentKey === h.componentKey;
                return (
                  <button key={`${variant.key}-${i}`} type="button" onClick={() => selectComponent(h.componentKey)} aria-label={h.label} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                    {!active && <span className="absolute inset-0 rounded-full bg-[#ff8905]/60 animate-ping" aria-hidden="true" />}
                    <span className={`relative flex items-center justify-center w-7 h-7 rounded-full font-raleway text-[12px] font-bold border-2 transition-all ${active ? "bg-[#1A0F00] border-white text-white scale-110 shadow-lg" : "bg-[#ff8905] border-white/90 text-white shadow-md group-hover:scale-110"}`}>{i + 1}</span>
                    <span className={`pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap rounded-md bg-[#1A0F00] text-[#F5EDD6] font-raleway text-[11px] font-semibold px-2.5 py-1 transition-opacity z-10 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>{h.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="font-raleway text-[12px] text-[#5C4A30] mt-3">Typical underfloor installation ({variant.label.toLowerCase()}). Tap a numbered marker to configure that component.</p>

          {/* Legend */}
          <div className="mt-5 flex flex-wrap gap-2">
            {variant.hotspots.map((h, i) => {
              const active = componentKey === h.componentKey;
              return (
                <button key={`${variant.key}-legend-${i}`} type="button" onClick={() => selectComponent(h.componentKey)} className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-raleway text-[12px] font-semibold transition-colors ${active ? "bg-[#ff8905] border-[#ff8905] text-white" : "border-[#1A0F00]/25 text-[#1A0F00] hover:border-[#1A0F00]"}`}>
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
                  const extra = COMPONENTS[key];
                  const active = componentKey === key;
                  return (
                    <button key={key} type="button" onClick={() => selectComponent(key)} className={`text-left border rounded-lg bg-white p-3 transition-all ${active ? "border-[#ff8905] ring-2 ring-[#ff8905]/25" : "border-[#1A0F00]/15 hover:border-[#1A0F00]/40"}`}>
                      <img src={extra.image} alt={extra.name} loading="lazy" className="h-20 w-full object-contain mb-2" />
                      <span className="block font-raleway text-[12px] font-bold text-[#1A0F00] leading-snug">{extra.name}</span>
                      <span className="block font-raleway text-[11px] font-semibold text-[#ff8905]">{extra.code}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom info sections */}
          <div className="mt-10">
            <CollapsibleSection id="description" title="Description" defaultOpen>
              {UNDERFLOOR.description.map((para) => <p key={para} className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed mb-4">{para}</p>)}
              <p className="font-raleway text-[12px] text-[#5C4A30]">All dimensions are in millimetres and subject to a manufacturing tolerance of ±10%. Custom sizes and thicknesses are subject to confirmation and availability.</p>
            </CollapsibleSection>
            <CollapsibleSection id="properties" title="Properties">
              <dl className="space-y-3">
                {[
                  ["Material", "Galvanised steel sheet, 1.6 mm standard thickness; heavy gauge high-impact uPVC ducts (2.5 to 3.2 mm)"],
                  ["Standard Depths", "25 / 32 / 38 mm (L / M / H)"],
                  ["Compartments", "Single, double or triple"],
                  ["Standard Lengths", "2440 mm or 3000 mm (GI trunking); 2900 mm (uPVC duct)"],
                  ["Standards", "MS IEC 61084 · SS 249 · JKR EMAL · Others"],
                ].map(([term, detail]) => <div key={term}><dt className="font-raleway text-[13px] font-bold text-[#1A0F00]">{term}</dt><dd className="font-raleway text-[12px] text-[#5C4A30] leading-relaxed mt-0.5">{detail}</dd></div>)}
              </dl>
            </CollapsibleSection>
            <CollapsibleSection id="accessories" title="Accessories">
              <ul className="space-y-1.5">
                {UNDERFLOOR_ACCESSORIES.map((a) => <li key={a.no} className="font-raleway text-[13px] text-[#5C4A30] leading-relaxed"><span className="font-bold text-[#1A0F00] mr-2">{a.no}.</span>{a.description}</li>)}
              </ul>
            </CollapsibleSection>
          </div>
        </div>

        {/* Right: configurator */}
        <div ref={panelRef} className="lg:sticky lg:top-24 scroll-mt-24">
          <div className="border border-white/40 bg-white/15 rounded-2xl shadow-[0_8px_30px_rgba(26,15,0,0.12)] p-6">
            <h2 className="font-typewriter text-[clamp(1.3rem,1.9vw,1.6rem)] leading-tight text-[#1A0F00] mb-1">{component.name}</h2>
            <p className="font-raleway text-[12px] text-[#5C4A30] mb-4"><span className="font-bold uppercase tracking-wider text-[#1A0F00]">Item No:</span> <span className="font-semibold text-[#ff8905]">{code}</span></p>

            <div className="rounded-xl border border-[#1A0F00]/15 bg-white p-4 mb-5">
              <img src={image} alt={`${component.name} drawing`} className="h-44 w-full object-contain" />
            </div>

            <p className="font-raleway text-[13px] text-[#5C4A30] leading-relaxed mb-4">{component.description}</p>
            {component.note && <p className="font-raleway text-[12px] font-semibold text-[#1A0F00] bg-[#F0E6CC]/60 border border-[#1A0F00]/15 rounded-md px-3 py-2 mb-4">? {component.note}</p>}

            {component.fields.map((field) => {
              if (field.type === "static") {
                return <div key={field.label} className="mb-4 flex justify-between gap-4 bg-[#F0E6CC]/40 border border-[#1A0F00]/15 rounded-md px-3 py-2"><span className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00]">{field.label}</span><span className="font-raleway text-[12px] font-semibold text-[#1A0F00] text-right">{field.value}</span></div>;
              }
              if (field.type === "chips") {
                return <div key={field.key} className="mb-4"><p className={fieldLabel}>{field.label}</p><div className="flex flex-wrap gap-2">{field.options.map((option) => <button key={option} type="button" onClick={() => setValue(field.key, option)} className={chipClass(values[field.key] === option)}>{option}</button>)}</div></div>;
              }
              if (field.type === "select") {
                return <div key={field.key} className="mb-4"><label className={fieldLabel}>{field.label}</label><div className="relative"><select value={values[field.key]} onChange={(e) => setValue(field.key, e.target.value)} className="w-full appearance-none font-raleway text-[13px] text-[#1A0F00] bg-[#F5EDD6] border border-[#1A0F00]/40 rounded-md px-2.5 py-2 pr-8 focus:outline-none focus:border-[#ff8905] cursor-pointer">{field.options.map((option) => <option key={option} value={option}>{option}</option>)}</select><ChevronDown size={15} strokeWidth={2} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#1A0F00]" /></div></div>;
              }
              return <div key={field.key} className="mb-4"><label className={fieldLabel}>{field.label}</label><DimensionCombobox value={values[field.key]} onChange={(v) => setValue(field.key, v)} options={field.options} /></div>;
            })}

            {component.enquire ? (
              <>
                <div className="mb-5"><label className={fieldLabel}>Quantity</label><div className="flex items-center border border-[#1A0F00]/30 w-fit rounded-md overflow-hidden"><button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} className="w-9 h-9 font-raleway text-lg border-r border-[#1A0F00]/30">−</button><span className="w-12 text-center font-typewriter text-[15px]">{qty}</span><button type="button" onClick={() => setQty((value) => value + 1)} className="w-9 h-9 font-raleway text-lg border-l border-[#1A0F00]/30">+</button></div></div>
                <button type="button" onClick={addToEnquiry} className="w-full btn-primary justify-center mb-3">
                  {added ? <><CheckCircle size={15} /> Added ✓</> : <><ShoppingBag size={15} /> Add to Enquiry</>}
                </button>
                <Link href="/enquiry" className="btn-outline w-full justify-center text-center">Go to Enquiry →</Link>
              </>
            ) : (
              component.linkHref && <Link href={component.linkHref} className="btn-outline w-full justify-center text-center">{component.linkLabel}</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  </>;
}
