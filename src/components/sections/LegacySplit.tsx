import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";
import SanityMedia from "@/components/SanityMedia";
import type { SiteSettings } from "@/sanity/lib/queries";

type SectionMedia = NonNullable<SiteSettings["sectionImages"]>[number];

export default function LegacySplit({
  media,
}: {
  media?: SectionMedia | null;
}) {
  return (
    <section className="site-container py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_4px_1fr] gap-0 lg:gap-x-14 items-stretch">
        {/* Image */}
        <div className="relative h-[480px] lg:h-auto">
          <SanityMedia
            videoUrl={media?.videoUrl}
            imageUrl={media?.imageUrl}
            fallbackSrc="/images/homepage/dsc09658.jpg"
            alt="U-Li manufacturing facility"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Vertical divider */}
        <div className="hidden lg:block bg-[#1A0F00] self-stretch" />

        {/* Text */}
        <div className="bg-[#F5EDD6] px-8 lg:px-0 pt-8 pb-8 lg:py-16 flex flex-col justify-between">
          <div>
            <FadeUp>
              <h2 className="font-typewriter text-[clamp(1.75rem,4.5vw,2.875rem)] leading-[1.05] text-[#1A0F00] mb-6">
                A Legacy of Steel<br />and Precision.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-raleway font-bold text-[20px] text-[#ff8905] leading-relaxed mb-4">
                From humble beginnings to industry leadership. Our story reflects growth, innovation, and trust.
              </p>
              <p className="font-raleway text-[20px] text-[#1A0F00] leading-relaxed">
                Proudly manufactured in Malaysia and listed on the Bursa Malaysia (7133), U-LI has grown
                into one of the most respected and trusted names in Cable Support Systems. With five
                production sites and a deep commitment to quality, we continue shaping infrastructure
                across ASEAN and beyond.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <Link href="/about" className="link-underline mt-8 inline-flex text-[#1A0F00]">
              Learn About Our Group »
            </Link>

            <div className="mt-8 pt-8 border-t-[4px] border-[#1A0F00]">
              <h3 className="font-typewriter text-[clamp(1.75rem,4.5vw,2.875rem)] leading-[1.05] text-[#1A0F00] mb-4">
                Built in Malaysia.<br />Certified for the World.
              </h3>
              <p className="font-raleway font-bold text-[20px] text-[#ff8905] leading-relaxed mb-4">
                From humble beginnings to industry leadership. Our story reflects growth, innovation, and trust.
              </p>
              <p className="font-raleway text-[20px] text-[#1A0F00] leading-relaxed mb-6">
                U-LI operates five integrated manufacturing sites that process over 40,000 metric tonnes
                of steel each year. Our facilities follow strict ISO and SIRIM standards. In-house quality
                assurance labs and R&D teams ensure every product meets exacting performance and safety benchmarks.
              </p>
              <Link href="/technology" className="link-underline text-[#1A0F00]">
                See Our Capabilities »
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
