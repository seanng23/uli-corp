"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PROJECTS, type ProjectCategory } from "@/data/projects";

const CATEGORIES: ProjectCategory[] = [
  "Commercial Building", "Data Center", "Education Facilities", "Government Facilities",
  "Healthcare", "Hotels & Hospitality", "Industrial Buildings", "Oil, Gas & Chemical",
  "Power Plant", "Residential", "Solar (Renewable Energy)", "Telecommunication",
  "Transportation Infrastructure", "Water Works & Treatment Plant",
];
const DEFAULT_LOCATION = "Local" as const;
const DEFAULT_CATEGORY = CATEGORIES[0];
type ProjectLocation = "Local" | "International";

function catSlug(name: string) {
  return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
const CATEGORY_BY_SLUG = new Map(CATEGORIES.map((cat) => [catSlug(cat), cat]));

export default function ProjectsTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const hasFilterParams = searchParams.has("location") || searchParams.has("category");
  const [location, setLocation] = useState<ProjectLocation>(
    searchParams.get("location") === "international" ? "International" : DEFAULT_LOCATION,
  );
  const [category, setCategory] = useState<ProjectCategory>(
    CATEGORY_BY_SLUG.get(searchParams.get("category") ?? "") ?? DEFAULT_CATEGORY,
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const userChangeRef = useRef(false);
  const mountedRef = useRef(false);

  const visible = useMemo(() => PROJECTS.filter((p) =>
    p.category === category && (location === "International" ? !!p.location : !p.location)
  ), [category, location]);
  const counts = useMemo(() => CATEGORIES.reduce((result, cat) => {
    result[cat] = PROJECTS.filter((p) =>
      p.category === cat && (location === "International" ? !!p.location : !p.location)
    ).length;
    return result;
  }, {} as Record<ProjectCategory, number>), [location]);

  function replaceFilters(nextLocation: ProjectLocation, nextCategory: ProjectCategory) {
    const params = new URLSearchParams();
    if (nextLocation !== DEFAULT_LOCATION) params.set("location", nextLocation.toLowerCase());
    if (nextCategory !== DEFAULT_CATEGORY) params.set("category", catSlug(nextCategory));
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }
  function handleLocationChange(nextLocation: ProjectLocation) {
    if (nextLocation === location) return;
    userChangeRef.current = true;
    setLocation(nextLocation);
    replaceFilters(nextLocation, category);
  }
  function handleCategoryChange(nextCategory: ProjectCategory) {
    setSidebarOpen(false);
    if (nextCategory === category) return;
    userChangeRef.current = true;
    setCategory(nextCategory);
    replaceFilters(location, nextCategory);
  }
  function resetFilters() {
    userChangeRef.current = true;
    setLocation(DEFAULT_LOCATION);
    setCategory(DEFAULT_CATEGORY);
    replaceFilters(DEFAULT_LOCATION, DEFAULT_CATEGORY);
  }

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      if (!hasFilterParams && window.location.hash === "#international") {
        setLocation("International");
        replaceFilters("International", DEFAULT_CATEGORY);
      }
      return;
    }
    setLocation(searchParams.get("location") === "international" ? "International" : DEFAULT_LOCATION);
    setCategory(CATEGORY_BY_SLUG.get(searchParams.get("category") ?? "") ?? DEFAULT_CATEGORY);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!userChangeRef.current) return;
    userChangeRef.current = false;
    const grid = gridRef.current;
    if (!grid) return;
    const top = grid.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight) grid.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, [category, location]);

  const optionClass = (selected: boolean, dimmed = false) =>
    `w-full text-left font-raleway text-[13px] min-h-[44px] lg:min-h-[38px] px-2.5 py-1.5 flex items-center justify-between transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8905] ${selected ? "bg-[#ff8905] text-white font-semibold" : "text-[#1A0F00] hover:text-[#cc6e00]"} ${dimmed ? "opacity-45" : ""}`;
  const hasNonDefaultFilters = location !== DEFAULT_LOCATION || category !== DEFAULT_CATEGORY;

  function FilterContent() {
    return (
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-typewriter text-[15px] text-[#1A0F00]">Filters</h3>
          {hasNonDefaultFilters && <button type="button" onClick={resetFilters} className="min-h-[44px] font-raleway text-[12px] text-[#ff8905] hover:text-[#cc6e00] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8905]">Reset</button>}
        </div>
        <div className="border-t border-[#1A0F00]/20 py-4">
          <p className="font-raleway text-[12px] font-bold uppercase tracking-wide text-[#5C4A30] mb-2">Location</p>
          {(["Local", "International"] as const).map((loc) => (
            <button key={loc} type="button" aria-pressed={location === loc} onClick={() => handleLocationChange(loc)} className={optionClass(location === loc)}>{loc}</button>
          ))}
        </div>
        <div className="border-t border-[#1A0F00]/20 py-4">
          <p className="font-raleway text-[12px] font-bold uppercase tracking-wide text-[#5C4A30] mb-2">Category</p>
          {CATEGORIES.map((cat) => (
            <button key={cat} type="button" aria-pressed={category === cat} onClick={() => handleCategoryChange(cat)} className={optionClass(category === cat, counts[cat] === 0)}>
              <span>{cat}</span><span className="text-[11px] opacity-70">{counts[cat]}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="site-container py-12 lg:py-16">
      <div className="lg:hidden mb-6 flex items-center gap-3">
        <button type="button" onClick={() => setSidebarOpen(true)} className="flex items-center gap-2 font-raleway text-[13px] font-semibold border border-[#1A0F00] px-4 py-2 min-h-[44px] text-[#1A0F00] hover:bg-[#1A0F00] hover:text-[#F5EDD6] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8905]">
          <SlidersHorizontal size={14} /> Filters <span className="font-normal">— {category}</span>
        </button>
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[300] flex">
          <div className="absolute inset-0 bg-[#1A0F00]/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 w-[280px] max-w-[80vw] bg-[#F5EDD6] h-full overflow-y-auto p-5">
            <div className="flex items-center justify-end mb-2">
              <button type="button" aria-label="Close filters" onClick={() => setSidebarOpen(false)} className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#1A0F00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8905]"><X size={20} strokeWidth={2} /></button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      <div className="flex gap-10 items-start">
        <aside className="hidden lg:block w-[240px] flex-shrink-0 sticky top-[90px]"><FilterContent /></aside>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between mb-2 gap-4">
            <h2 className="font-typewriter text-[clamp(1.1rem,2vw,1.4rem)] text-[#1A0F00]">{category}</h2>
            <span className="font-raleway text-[12px] text-[#5C4A30] text-right">{visible.length} projects — {location}</span>
          </div>
          <div aria-live="polite" className="sr-only">{visible.length} {category} projects — {location}</div>
          <div id="projects-grid" ref={gridRef} className="scroll-mt-24">
            {visible.length === 0 ? (
              <div className="pt-8">
                <p className="font-raleway text-[15px] text-[#5C4A30]">No {location === "International" ? "international" : "local"} projects listed in this category yet.</p>
                {location === "International" && <button type="button" onClick={() => handleLocationChange("Local")} className="mt-3 min-h-[44px] font-raleway text-[14px] font-semibold text-[#cc6e00] underline underline-offset-4 hover:text-[#ff8905] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8905]">View Local {category} projects →</button>}
              </div>
            ) : (
              <div key={`${location}-${category}`} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 pt-4">
                {visible.map((p, i) => (
                  <motion.div key={p.image} initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: prefersReducedMotion ? 0 : Math.min(i * 0.03, 0.3) }} className="relative overflow-hidden aspect-[4/3]">
                    <Image src={p.image} alt={p.name} fill loading="eager" className="object-cover object-center" sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F00]/60 via-[#1A0F00]/10 to-transparent" />
                    {p.location && <span className="absolute top-3 right-3 font-raleway text-[10px] font-bold uppercase tracking-wider text-[#F5EDD6] bg-[#1A0F00]/70 border border-[#F5EDD6]/40 px-2 py-1">{p.location}</span>}
                    <div className="absolute bottom-0 left-0 right-0 p-3 pt-8"><p className="line-clamp-3 font-raleway text-[12px] sm:text-[13px] font-semibold uppercase tracking-wide leading-snug text-[#F5EDD6]">{p.name}</p></div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
