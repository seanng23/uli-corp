import SanityMedia from "@/components/SanityMedia";
import type { SiteLocation } from "@/sanity/lib/queries";

// Static fallback locations — used when Sanity isn't configured or has no data
const STATIC_LOCATIONS: SiteLocation[] = [
  {
    name: "Seri Kembangan",
    address:
      "Lot. 7 (PT 3475), Jalan 6/1, Kawasan Perusahaan Seri Kembangan, 43300 Seri Kembangan, Selangor Darul Ehsan, Malaysia.",
  },
  {
    name: "Balakong",
    address:
      "Lot. 5 (PT 7907), Jalan Balakong, 43300 Seri Kembangan, Selangor Darul Ehsan, Malaysia.",
  },
  {
    name: "Nilai",
    address:
      "Lot. 755 (PT 1481), Jalan Emas 1, Kawasan Perindustrian Nilai, 71800 Nilai, Negeri Sembilan Darul Khusus, Malaysia.",
  },
];

export default function ContactLocations({
  locations,
}: {
  locations?: SiteLocation[] | null;
}) {
  const items = locations?.length ? locations : STATIC_LOCATIONS;

  return (
    <section className="site-container py-12 lg:py-16">
      <h2 className="font-typewriter uppercase text-center text-[clamp(1.5rem,3vw,3rem)] leading-tight text-[#1A0F00] tracking-tight mb-10">
        Our Locations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((loc) => (
          <div key={loc.name}>
            {/* Image with name overlay */}
            <div className="relative overflow-hidden h-[240px]">
              <SanityMedia
                videoUrl={undefined}
                imageUrl={loc.imageUrl}
                fallbackSrc="/images/contact/Group-2608.jpg"
                alt={loc.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-4">
                <p className="font-typewriter uppercase text-white text-[1.1rem] tracking-wide">
                  {loc.name}
                </p>
              </div>
              {loc.mapsUrl && (
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                  aria-label={`View ${loc.name} on Google Maps`}
                />
              )}
            </div>
            {/* Address below */}
            <p className="font-raleway text-[13px] text-[#5C4A30] leading-relaxed mt-3">
              {loc.address}
            </p>
          </div>
        ))}
      </div>

      {/* Single-line divider */}
      <div className="mt-12 lg:mt-16">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>
    </section>
  );
}
