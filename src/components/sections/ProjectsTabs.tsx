"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PROJECTS, type ProjectCategory } from "@/data/projects";

const CATEGORIES: ProjectCategory[] = [
  "Commercial Building",
  "Data Center",
  "Education Facilities",
  "Government Facilities",
  "Healthcare",
  "Hotels & Hospitality",
  "Industrial Buildings",
  "Oil, Gas & Chemical",
  "Power Plant",
  "Residential",
  "Solar (Renewable Energy)",
  "Telecommunication",
  "Transportation Infrastructure",
  "Water Works & Treatment Plant",
];

function ProjectGrid({
  category,
  location,
}: {
  category: ProjectCategory;
  location: "Local" | "International";
}) {
  const projects = PROJECTS.filter(
    (p) =>
      p.category === category &&
      (location === "International" ? !!p.location : !p.location),
  );

  if (projects.length === 0) {
    return (
      <p className="font-raleway text-[15px] text-[#5C4A30] pt-8">
        No {location === "International" ? "international" : "local"} projects
        listed in this category yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-8">
      {projects.map((p) => (
        <div key={p.name} className="relative aspect-[4/3] overflow-hidden group">
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 33vw, 460px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F00]/75 via-[#1A0F00]/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-raleway text-[13px] font-semibold uppercase tracking-wide leading-snug text-[#F5EDD6]">
              {p.name}
            </p>
            {p.location && (
              <p className="font-raleway text-[11px] text-[#F5EDD6]/75 mt-1">
                {p.location}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectsTabs() {
  const [location, setLocation] = useState<"Local" | "International">("Local");
  const [category, setCategory] = useState(CATEGORIES[0]);

  // Read URL hash on mount so /projects#international opens the correct tab
  useEffect(() => {
    if (window.location.hash === "#international") {
      setLocation("International");
    }
  }, []);

  function handleLocationChange(loc: "Local" | "International") {
    setLocation(loc);
    setCategory(CATEGORIES[0]);
  }

  return (
    <section className="site-container py-12 lg:py-16">
      {/* Primary tabs: Local / International — bordered box style */}
      <div className="flex justify-center gap-0 mb-8">
        {(["Local", "International"] as const).map((loc) => (
          <button
            key={loc}
            onClick={() => handleLocationChange(loc)}
            className={[
              "font-raleway font-semibold text-[15px] lg:text-[17px] tracking-wide px-10 py-3 border border-[#1A0F00] transition-all duration-200",
              location === loc
                ? "bg-[#ff8905] border-[#ff8905] text-white"
                : "bg-transparent text-[#1A0F00] hover:bg-[#1A0F00]/5",
            ].join(" ")}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* Sub-tabs: 14 categories — bordered boxes, wrapping layout */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={[
              "font-raleway text-[13px] lg:text-[14px] font-medium tracking-wide px-4 py-2 border transition-all duration-200",
              category === cat
                ? "border-[#ff8905] text-[#ff8905]"
                : "border-[#1A0F00] text-[#1A0F00] hover:border-[#ff8905] hover:text-[#ff8905]",
            ].join(" ")}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <ProjectGrid category={category} location={location} />
    </section>
  );
}
