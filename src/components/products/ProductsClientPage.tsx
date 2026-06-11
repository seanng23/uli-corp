"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/data/products";

type Filters = {
  subcategory: Set<string>;
  standard: Set<string>;
  height: Set<string>;
  width: Set<string>;
  length: Set<string>;
  thickness: Set<string>;
  finishing: Set<string>;
};

const EMPTY_FILTERS: Filters = {
  subcategory: new Set(),
  standard: new Set(),
  height: new Set(),
  width: new Set(),
  length: new Set(),
  thickness: new Set(),
  finishing: new Set(),
};

function toggleInSet(s: Set<string>, val: string): Set<string> {
  const next = new Set(s);
  next.has(val) ? next.delete(val) : next.add(val);
  return next;
}

function FilterSection({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: Set<string>;
  onToggle: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  if (!options.length) return null;
  return (
    <div className="border-t border-[#1A0F00]/20 py-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-raleway text-[12px] font-bold uppercase tracking-widest text-[#1A0F00]">
          {title}
        </span>
        {open ? (
          <Minus size={16} strokeWidth={2.5} className="text-[#ff8905] shrink-0" />
        ) : (
          <Plus size={16} strokeWidth={2.5} className="text-[#ff8905] shrink-0" />
        )}
      </button>
      {open && (
        <div className="mt-3 space-y-2.5">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selected.has(opt)}
                onChange={() => onToggle(opt)}
                className="w-3.5 h-3.5 accent-[#ff8905] cursor-pointer"
              />
              <span className="font-raleway text-[13px] text-[#5C4A30] group-hover:text-[#1A0F00] transition-colors leading-snug">
                {opt}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// Per-product image fallbacks (used until real images are uploaded via Sanity).
const PRODUCT_IMAGES: Record<string, string> = {
  "cable-trunking": "/images/products/placeholder.png",
  "cable-tray-perforated": "/images/products/cable-tray-perforated.jpg",
  "cable-tray-solid-bottom": "/images/products/cable-tray-solid.jpg",
  "cable-ladder": "/images/products/cable-ladder.jpg",
  "wire-mesh-tray": "/images/products/wire-mesh-tray.jpg",
  "conduit-pipe-accessories": "/images/products/conduit.jpg",
};

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-[#1A0F00]/15">
        <Image
          src={product.image || PRODUCT_IMAGES[product.slug] || "/images/products/placeholder.png"}
          alt={product.name}
          fill
          className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
        />
      </div>
      <p className="font-typewriter text-[14px] leading-snug text-[#1A0F00] group-hover:text-[#ff8905] transition-colors mt-2">
        {product.name}
      </p>
      {product.itemNo && (
        <p className="font-raleway text-[11px] text-[#5C4A30] mt-0.5">{product.itemNo}</p>
      )}
    </Link>
  );
}

export default function ProductsClientPage({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const allSubcategories = useMemo(
    () => [...new Set(products.map((p) => p.subcategory))],
    [products]
  );
  const allStandards = useMemo(
    () => [...new Set(products.flatMap((p) => p.standards ?? []))].sort(),
    [products]
  );
  const allHeights = useMemo(
    () =>
      [...new Set(products.flatMap((p) => p.dimensions?.height ?? []))].sort(
        (a, b) => Number(a) - Number(b)
      ),
    [products]
  );
  const allWidths = useMemo(
    () =>
      [...new Set(products.flatMap((p) => p.dimensions?.width ?? []))].sort(
        (a, b) => Number(a) - Number(b)
      ),
    [products]
  );
  const allLengths = useMemo(
    () =>
      [...new Set(products.flatMap((p) => p.dimensions?.length ?? []))].sort(
        (a, b) => Number(a) - Number(b)
      ),
    [products]
  );
  const allThicknesses = useMemo(
    () =>
      [...new Set(products.flatMap((p) => p.dimensions?.thickness ?? []))].sort(
        (a, b) => Number(a) - Number(b)
      ),
    [products]
  );
  const allFinishings = useMemo(
    () => [...new Set(products.flatMap((p) => p.finishing ?? []))].sort(),
    [products]
  );

  const hasFilters = Object.values(filters).some((s) => s.size > 0);

  function setFilter(key: keyof Filters, val: string) {
    setFilters((prev) => ({ ...prev, [key]: toggleInSet(prev[key], val) }));
  }
  function clearAll() {
    setFilters(EMPTY_FILTERS);
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filters.subcategory.size > 0 && !filters.subcategory.has(p.subcategory)) return false;
      if (filters.standard.size > 0 && !p.standards?.some((s) => filters.standard.has(s))) return false;
      if (filters.height.size > 0 && !p.dimensions?.height?.some((h) => filters.height.has(h))) return false;
      if (filters.width.size > 0 && !p.dimensions?.width?.some((w) => filters.width.has(w))) return false;
      if (filters.length.size > 0 && !p.dimensions?.length?.some((l) => filters.length.has(l))) return false;
      if (filters.thickness.size > 0 && !p.dimensions?.thickness?.some((t) => filters.thickness.has(t))) return false;
      if (filters.finishing.size > 0 && !p.finishing?.some((f) => filters.finishing.has(f))) return false;
      return true;
    });
  }, [products, filters]);

  const grouped = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const p of filteredProducts) {
      const arr = map.get(p.subcategory) ?? [];
      arr.push(p);
      map.set(p.subcategory, arr);
    }
    return map;
  }, [filteredProducts]);

  const sidebarContent = (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-typewriter text-[15px] text-[#1A0F00]">Filters</h3>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="font-raleway text-[12px] text-[#ff8905] hover:text-[#cc6e00] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      <FilterSection
        title="Product"
        options={allSubcategories}
        selected={filters.subcategory}
        onToggle={(v) => setFilter("subcategory", v)}
      />
      <FilterSection
        title="Standard"
        options={allStandards}
        selected={filters.standard}
        onToggle={(v) => setFilter("standard", v)}
      />
      <FilterSection
        title="Height (mm)"
        options={allHeights}
        selected={filters.height}
        onToggle={(v) => setFilter("height", v)}
      />
      <FilterSection
        title="Width (mm)"
        options={allWidths}
        selected={filters.width}
        onToggle={(v) => setFilter("width", v)}
      />
      <FilterSection
        title="Length (mm)"
        options={allLengths}
        selected={filters.length}
        onToggle={(v) => setFilter("length", v)}
      />
      <FilterSection
        title="Thickness (mm)"
        options={allThicknesses}
        selected={filters.thickness}
        onToggle={(v) => setFilter("thickness", v)}
      />
      <FilterSection
        title="Finishing"
        options={allFinishings}
        selected={filters.finishing}
        onToggle={(v) => setFilter("finishing", v)}
      />
    </div>
  );

  return (
    <div className="site-container py-10 lg:py-14">
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-6 flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 font-raleway text-[13px] font-semibold border border-[#1A0F00] px-4 py-2 text-[#1A0F00] hover:bg-[#1A0F00] hover:text-[#F5EDD6] transition-colors"
        >
          <SlidersHorizontal size={14} />
          Filters
          {hasFilters && (
            <span className="bg-[#ff8905] text-[#F5EDD6] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {Object.values(filters).reduce((sum, s) => sum + s.size, 0)}
            </span>
          )}
        </button>
        {hasFilters && (
          <button onClick={clearAll} className="font-raleway text-[12px] text-[#ff8905]">
            Clear all
          </button>
        )}
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[300] flex">
          <div
            className="absolute inset-0 bg-[#1A0F00]/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-[300px] max-w-[85vw] bg-[#F5EDD6] h-full overflow-y-auto p-6 z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-typewriter text-[16px] text-[#1A0F00]">Filters</h3>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            {sidebarContent}
            <div className="mt-8">
              <button
                onClick={() => setSidebarOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Show {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-10 lg:gap-14 items-start">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-[240px] flex-shrink-0 sticky top-[90px]">
          {sidebarContent}
        </aside>

        {/* Product content */}
        <div className="flex-1 min-w-0">
          {/* Grouped product sections */}
          {grouped.size === 0 ? (
            <div className="py-20 text-center">
              <p className="font-typewriter text-[18px] text-[#1A0F00] mb-3">No products match your filters.</p>
              <button onClick={clearAll} className="font-raleway text-[13px] text-[#ff8905] underline underline-offset-2">
                Clear all filters
              </button>
            </div>
          ) : (
            [...grouped.entries()].map(([subcat, prods]) => (
              <div
                key={subcat}
                id={`section-${subcat.toLowerCase().replace(/[\s/&]+/g, "-")}`}
                className="mb-14 scroll-mt-24"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="font-typewriter text-[clamp(1.1rem,2vw,1.4rem)] text-[#1A0F00]">
                    {subcat}
                  </h2>
                  <span className="font-raleway text-[12px] text-[#5C4A30]">
                    {prods.length} product{prods.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 lg:gap-6">
                  {prods.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
