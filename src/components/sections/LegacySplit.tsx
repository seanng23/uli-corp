import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";
import Typewriter from "@/components/motion/Typewriter";
import RevealImage from "@/components/motion/RevealImage";
import SanityMedia from "@/components/SanityMedia";
import type { SiteSettings } from "@/sanity/lib/queries";

type SectionMedia = NonNullable<SiteSettings["sectionImages"]>[number];

export default function LegacySplit({
  media,
}: {
  media?: SectionMedia | null;
}) {
  return (
    <section className="site-container">
      {/* No section padding — the vertical rule runs flush into the top/bottom
          Dividers (all lines connect). Text blocks carry their own padding. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* Image — inset with equal space on all sides so it doesn't touch the rules */}
        <div className="p-6 lg:p-10">
          <RevealImage className="relative h-[440px] lg:h-full lg:min-h-[440px]">
            <SanityMedia
              videoUrl={media?.videoUrl}
              imageUrl={media?.imageUrl}
              fallbackSrc="/images/homepage/dsc09658.jpg"
              alt="U-LI manufacturing facility"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </RevealImage>
        </div>

        {/* Text column — thin textured vertical rule on its left edge (desktop) */}
        <div className="relative flex flex-col">
          <img
            src="/images/lines/line-thin-vertical.png"
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute top-[-5px] left-0 h-[calc(100%+10px)] w-[4px] object-fill"
          />
          {/* Block 1 */}
          <div className="py-10 lg:py-14 lg:pl-14">
            <h2 className="font-typewriter text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[#1A0F00] mb-6">
              <Typewriter text={"A Legacy of Steel\nand Precision."} />
            </h2>
            <FadeUp delay={0.1}>
              <p className="font-raleway font-bold text-[20px] text-[#ff8905] leading-relaxed mb-4">
                From humble beginnings to industry leadership.<br />Our story reflects growth, innovation, and trust.
              </p>
              <p className="font-raleway text-[20px] text-[#1A0F00] leading-relaxed mb-8">
                Proudly manufactured in Malaysia and listed on the Bursa Malaysia (7133), U-LI has grown
                into one of the most respected and trusted names in Cable Support Systems. With five
                production sites and a deep commitment to quality, we continue shaping infrastructure
                across ASEAN and beyond.
              </p>
              <Link href="/about" className="link-underline inline-flex text-[#1A0F00]">
                Learn About Our Group »
              </Link>
            </FadeUp>
          </div>

          {/* Middle horizontal rule (thin texture) meets the vertical rule */}
          <div className="relative py-10 lg:py-14 lg:pl-14">
            <img
              src="/images/lines/line-thin.png"
              alt=""
              aria-hidden="true"
              className="absolute top-0 left-0 w-full h-auto"
            />
            <h3 className="font-typewriter text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[#1A0F00] mb-4">
              <Typewriter text={"Built in Malaysia.\nCertified for the World."} />
            </h3>
            <FadeUp delay={0.1}>
              <p className="font-raleway font-bold text-[20px] text-[#ff8905] leading-relaxed mb-4">
                We embed quality into every product from start to finish.
              </p>
              <p className="font-raleway text-[20px] text-[#1A0F00] leading-relaxed mb-8">
                U-LI operates five integrated manufacturing sites that process over 40,000 metric tonnes
                of steel each year. Our facilities follow strict ISO and SIRIM standards. In-house quality
                assurance labs and R&D teams ensure every product meets exacting performance and safety benchmarks.
              </p>
              <Link href="/technology" className="link-underline text-[#1A0F00]">
                See Our Capabilities »
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
