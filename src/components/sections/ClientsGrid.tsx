import Image from "next/image";
import FadeUp from "@/components/motion/FadeUp";

const logoRows = [
  { src: "/images/homepage/logo-row-1.png", alt: "Client logos row 1" },
  { src: "/images/homepage/logo-row-2.png", alt: "Client logos row 2" },
  { src: "/images/homepage/logo-row-3.png", alt: "Client logos row 3" },
];

export default function ClientsGrid() {
  return (
    <section className="site-container py-16">
      <FadeUp>
        <h2 className="font-typewriter text-[clamp(1.75rem,4.5vw,2.875rem)] leading-[1.1] text-[#1A0F00] mb-12 text-center">
          Trusted by Industry Leaders<br />Across the Region.
        </h2>
      </FadeUp>
      <div className="flex flex-col gap-0 max-w-[1000px] mx-auto">
        {logoRows.map((row, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="relative w-full">
              <Image
                src={row.src}
                alt={row.alt}
                width={1037}
                height={121}
                className="w-full h-auto"
                sizes="720px"
              />
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
