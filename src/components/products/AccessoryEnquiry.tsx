"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Check, Plus } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { generateItemId } from "@/lib/cart-store";

/** One size choice for an accessory, e.g. Height (mm) or Width (mm). */
export type SizeField = { key: string; label: string; options: string[] };

export type AccessoryItem = { name: string; code?: string };
export type AccessoryGroup = { title?: string; items: AccessoryItem[] };

/** Cart details shared by every accessory in a section. */
export type AccessoryCartMeta = {
  idPrefix: string;
  category: string;
  slug: string;
  image?: string;
  /** Extra enquiry specs, e.g. { Profile: "LZ" }. */
  context?: Record<string, string>;
};

/** Empty value = the visitor left it for U-LI to confirm. */
export const TO_ADVISE = "To advise";

const labelCls = "font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] block mb-1.5";
const thCls = "font-raleway text-[11px] font-bold uppercase tracking-wider text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20";
const tdCls = "font-raleway text-[13px] text-[#5C4A30] px-3 py-2 border-b border-[#1A0F00]/10 align-middle";

/** Height and Width fields from a profile's dimension rows. */
export function hwFields(dims: { h: number; w: number }[]): SizeField[] {
  const sorted = (ns: number[]) => [...new Set(ns)].sort((a, b) => a - b).map(String);
  return [
    { key: "Height", label: "Height (mm)", options: sorted(dims.map((d) => d.h)) },
    { key: "Width", label: "Width (mm)", options: sorted(dims.map((d) => d.w)) },
  ];
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
// Some lists repeat a description under different refs, so the ref is part of the identity.
const itemKey = (item: AccessoryItem) => (item.code ? `${item.code}-${item.name}` : item.name);

export function SizeSelect({ field, value, onChange, small = false }: { field: SizeField; value: string; onChange: (value: string) => void; small?: boolean }) {
  return (
    <div className="min-w-0">
      <label className={small ? "font-raleway text-[10px] font-bold uppercase tracking-wider text-[#1A0F00] block mb-1" : labelCls}>{field.label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none font-raleway text-[#1A0F00] bg-[#F5EDD6] border border-[#1A0F00]/40 rounded-md pr-8 focus:outline-none focus:border-[#ff8905] cursor-pointer ${small ? "text-[12px] px-2 py-1.5" : "text-[13px] px-2.5 py-2"}`}
        >
          <option value="">{TO_ADVISE}</option>
          {/* A size typed into the main configurator may not be in the list */}
          {(value && !field.options.includes(value) ? [...field.options, value] : field.options).map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <ChevronDown size={14} strokeWidth={2} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#1A0F00]" />
      </div>
    </div>
  );
}

/** Enquiry specs for an accessory: section context, item code, then each size (or "To advise"). */
export function accessorySpecs(item: AccessoryItem, fields: SizeField[], values: Record<string, string>, context: Record<string, string> = {}) {
  const specs: Record<string, string> = { ...context };
  if (item.code) specs["Item No."] = item.code;
  for (const field of fields) specs[field.label] = values[field.key] || TO_ADVISE;
  return specs;
}

/** Add button that flips to "Added" for two seconds. */
export function useAccessoryAdd(meta: AccessoryCartMeta) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState<string | null>(null);
  function add(item: AccessoryItem, fields: SizeField[], values: Record<string, string>) {
    const specs = accessorySpecs(item, fields, values, meta.context);
    addToCart({
      id: generateItemId(meta.idPrefix + "accessory-" + slugify(itemKey(item)), specs),
      productName: item.code && item.code !== item.name ? `${item.name} (${item.code})` : item.name,
      category: meta.category,
      slug: meta.slug,
      image: meta.image,
      quantity: 1,
      specs,
    });
    const key = itemKey(item);
    setAdded(key);
    setTimeout(() => setAdded((current) => (current === key ? null : current)), 2000);
  }
  return { add, added };
}

/**
 * Accessories table with Add to Enquiry on every row. The visitor picks the size once in the bar
 * above (pre-filled from the main configurator) and it applies to every accessory they add.
 */
export default function AccessoryEnquiryTable({
  groups,
  fields,
  initial = {},
  meta,
  showNo = true,
  showCode = false,
}: {
  groups: AccessoryGroup[];
  fields: SizeField[];
  initial?: Record<string, string>;
  meta: AccessoryCartMeta;
  showNo?: boolean;
  showCode?: boolean;
}) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const { add, added } = useAccessoryAdd(meta);

  // Follow the main configurator until the visitor sets a size here themselves.
  const initialKey = JSON.stringify(initial);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (!touched) setValues(JSON.parse(initialKey));
  }, [initialKey, touched]);

  const visible = groups.filter((g) => g.items.length > 0);
  if (!visible.length) return null;
  let no = 0;

  return (
    <div>
      {fields.length > 0 && (
        <div className="rounded-lg border border-[#1A0F00]/15 bg-white/60 p-4 mb-4">
          <p className="font-raleway text-[12px] font-bold text-[#1A0F00] mb-3">Accessory size</p>
          <div className={`grid gap-3 ${fields.length > 1 ? "grid-cols-2" : "grid-cols-1 max-w-[260px]"}`}>
            {fields.map((field) => (
              <SizeSelect key={field.key} field={field} value={values[field.key] ?? ""} onChange={(v) => { setTouched(true); setValues((prev) => ({ ...prev, [field.key]: v })); }} />
            ))}
          </div>
          <p className="font-raleway text-[11px] text-[#5C4A30] leading-snug mt-3">
            Applies to each accessory you add below. Not sure? Leave it as {TO_ADVISE} and our team will confirm the size with you.
          </p>
        </div>
      )}
      <table className="w-full text-left border border-[#1A0F00]/20">
        <thead>
          <tr className="bg-[#1A0F00]/5">
            {showNo && <th className={`${thCls} w-[52px]`}>No.</th>}
            {showCode && <th className={`${thCls} hidden sm:table-cell`}>Ref.</th>}
            <th className={thCls}>Description</th>
            <th className={`${thCls} w-[1%] text-right`}><span className="sr-only">Add to Enquiry</span></th>
          </tr>
        </thead>
        <tbody>
          {visible.map((group) => (
            <GroupRows key={group.title ?? "items"} group={group} span={2 + (showNo ? 1 : 0) + (showCode ? 1 : 0)}>
              {group.items.map((item) => {
                no += 1;
                const isAdded = added === itemKey(item);
                return (
                  <tr key={itemKey(item)} className={no % 2 === 0 ? "bg-[#1A0F00]/[0.03]" : ""}>
                    {showNo && <td className={tdCls}>{no}</td>}
                    {showCode && <td className={`${tdCls} hidden sm:table-cell font-semibold text-[#1A0F00]`}>{item.code}</td>}
                    <td className={tdCls}>
                      {item.name}
                      {showCode && item.code && <span className="sm:hidden block text-[11px] text-[#ff8905] font-semibold">{item.code}</span>}
                    </td>
                    <td className={`${tdCls} text-right`}>
                      <button
                        type="button"
                        onClick={() => add(item, fields, values)}
                        aria-label={`Add ${item.name} to enquiry`}
                        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md border px-2.5 py-1.5 font-raleway text-[11px] font-bold transition-colors ${isAdded ? "bg-[#1A0F00] border-[#1A0F00] text-white" : "border-[#ff8905] text-[#ff8905] hover:bg-[#ff8905] hover:text-white"}`}
                      >
                        {isAdded ? <><Check size={12} strokeWidth={3} /> Added</> : <><Plus size={12} strokeWidth={3} /> Add</>}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </GroupRows>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GroupRows({ group, span, children }: { group: AccessoryGroup; span: number; children: React.ReactNode }) {
  return (
    <>
      {group.title && (
        <tr className="bg-[#1A0F00]/5">
          <td colSpan={span} className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] px-3 py-2 border-b border-[#1A0F00]/20">{group.title}</td>
        </tr>
      )}
      {children}
    </>
  );
}
