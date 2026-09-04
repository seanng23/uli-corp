import { MapPin } from "lucide-react";
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
      {/* Same eyebrow + heading treatment as the form section above, so the page reads as one system */}
      <div className="mb-8 lg:mb-10">
        <p className="font-raleway text-[11px] font-bold tracking-[0.2em] uppercase text-[#ff8905] mb-3">
          Our Locations
        </p>
        <h2 className="font-typewriter uppercase text-[clamp(1.6rem,2.8vw,2.4rem)] leading-tight text-[#1A0F00] tracking-tight">
          Where to find us.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {items.map((loc) => (
          <div key={loc.name} className="flex flex-col">
            {/* Image with name overlay */}
            <div className="relative overflow-hidden rounded-2xl h-[240px]">
              <SanityMedia
                videoUrl={undefined}
                imageUrl={loc.imageUrl}
                fallbackSrc="/images/contact/Group-2608.jpg"
                alt={loc.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
                <p className="font-typewriter uppercase text-white text-[1.1rem] tracking-wide">
                  {loc.name}
                </p>
              </div>
            </div>
            {/* Address below */}
            <p className="font-raleway text-[14px] text-[#5C4A30] leading-relaxed mt-4">
              {loc.address}
            </p>
            {loc.mapsUrl && (
              <a
                href={loc.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 w-fit font-raleway text-[13px] font-semibold text-[#ff8905] hover:underline"
              >
                <MapPin size={14} strokeWidth={2.5} /> Open in Google Maps
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
