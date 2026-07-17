import Image from "next/image";

// Single placeholder render reused across all five sites (matches the reference).
// Swap each `image` for a real per-location facility photo when available.
const locations = [
  { name: "Seri Kembangan", image: "/images/manufacturing/facility.png" },
  { name: "Balakong", image: "/images/manufacturing/facility.png" },
  { name: "Taming Jaya (Goodlite)", image: "/images/manufacturing/facility.png" },
  { name: "Ipoh (Goodlite)", image: "/images/manufacturing/facility.png" },
  { name: "Nilai", image: "/images/manufacturing/facility.png" },
];

export default function ManufacturingLocations() {
  return (
    <section className="site-container py-14">
      <h2 className="font-typewriter text-center text-[clamp(1.9rem,3.4vw,3.25rem)] leading-tight text-[#1A0F00] mb-4">
        Integrated Production Across 5 Locations
      </h2>
      <p className="font-raleway text-center text-[15px] lg:text-[16px] text-[#5C4A30] leading-relaxed max-w-[620px] mx-auto mb-12">
        Each site is equipped for specialised functions including rolling, punching, powder
        coating, assembly, and packaging.
      </p>

      <div className="flex flex-wrap justify-center gap-6 max-w-[1080px] mx-auto">
        {locations.map((loc) => (
          <div
            key={loc.name}
            className="relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] aspect-[4/3] overflow-hidden rounded-sm"
          >
            <Image
              src={loc.image}
              alt={`U-LI manufacturing facility — ${loc.name}`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <span className="absolute bottom-4 left-0 right-0 text-center font-raleway font-bold text-[15px] tracking-wide text-white">
              {loc.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
