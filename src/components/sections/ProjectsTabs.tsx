"use client";

import { useState } from "react";
import Image from "next/image";

const CATEGORIES = [
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

// 3-column layout matching reference site
const COLUMNS: string[][] = [
  [
    "/images/projects/Group-2599.jpg",
    "/images/projects/Group-2600.jpg",
    "/images/projects/Group-2607.jpg",
  ],
  [
    "/images/projects/Group-2603.jpg",
    "/images/projects/Group-2602.jpg",
    "/images/projects/Group-2601.jpg",
  ],
  [
    "/images/projects/Group-2604.jpg",
    "/images/projects/Group-2605.jpg",
    "/images/projects/Group-2606.jpg",
  ],
];

function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-8">
      {COLUMNS.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-3">
          {col.map((src, ri) => (
            <div key={ri} className="relative w-full overflow-hidden">
              <Image
                src={src}
                alt=""
                width={439}
                height={484}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 33vw, 460px"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function ProjectsTabs() {
  const [location, setLocation] = useState<"Local" | "International">("Local");
  const [category, setCategory] = useState(CATEGORIES[0]);

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
      <ProjectGrid />
    </section>
  );
}
