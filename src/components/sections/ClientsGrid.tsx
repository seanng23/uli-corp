import Image from "next/image";
import Typewriter from "@/components/motion/Typewriter";

type Logo = { src: string; w: number; h: number; alt: string };

// Individual brand logos sliced from the original strips.
const rowA: Logo[] = [
  { src: "/images/clients/brands/brand-1.png", w: 279, h: 58, alt: "Gamuda" },
  { src: "/images/clients/brands/brand-2.png", w: 98, h: 97, alt: "GE" },
  { src: "/images/clients/brands/brand-3.png", w: 128, h: 97, alt: "JKR" },
  { src: "/images/clients/brands/brand-4.png", w: 159, h: 61, alt: "Setia" },
  { src: "/images/clients/brands/brand-5.png", w: 243, h: 57, alt: "Rapid KL" },
  { src: "/images/clients/brands/brand-6.png", w: 202, h: 78, alt: "Tenaga Nasional" },
  { src: "/images/clients/brands/brand-7.png", w: 271, h: 70, alt: "Resorts World Sentosa" },
];

const rowB: Logo[] = [
  { src: "/images/clients/brands/brand-8.png", w: 308, h: 49, alt: "Keppel Corporation" },
  { src: "/images/clients/brands/brand-9.png", w: 102, h: 105, alt: "Petronas" },
  { src: "/images/clients/brands/brand-10.png", w: 92, h: 105, alt: "Shell" },
  { src: "/images/clients/brands/brand-11.png", w: 178, h: 103, alt: "Suria KLCC" },
  { src: "/images/clients/brands/brand-12.png", w: 242, h: 77, alt: "KLIA" },
  { src: "/images/clients/brands/brand-13.png", w: 279, h: 83, alt: "Marina Bay Sands" },
  { src: "/images/clients/brands/brand-14.png", w: 125, h: 94, alt: "Mid Valley Megamall" },
];

function MarqueeRow({ logos, direction }: { logos: Logo[]; direction: "left" | "right" }) {
  // Duplicate the set so the -50% loop is seamless.
  const items = [...logos, ...logos];
  return (
    <div className="marquee">
      <div className={`marquee-track ${direction === "left" ? "marquee-track-left" : "marquee-track-right"}`}>
        {items.map((logo, i) => (
          <div
            key={i}
            className="shrink-0 px-8 lg:px-10"
            aria-hidden={i >= logos.length}
          >
            {/* Equal box per logo so each carries similar visual weight */}
            <div className="relative h-16 lg:h-20 w-[150px] lg:w-[190px]">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="190px"
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientsGrid() {
  return (
    <section className="site-container py-16">
      <h2 className="font-typewriter text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] text-[#1A0F00] mb-12 text-center">
        <Typewriter text={"Trusted by Industry Leaders\nAcross the Region."} />
      </h2>
      <div className="flex flex-col gap-12">
        <MarqueeRow logos={rowA} direction="left" />
        <MarqueeRow logos={rowB} direction="right" />
      </div>
    </section>
  );
}
