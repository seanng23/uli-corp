import FadeUp from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import SanityMedia from "@/components/SanityMedia";
import type { SiteSettings } from "@/sanity/lib/queries";

type SectionMedia = NonNullable<SiteSettings["sectionImages"]>[number];

export default function AboutLegacy({ media }: { media?: SectionMedia | null }) {
  return (
    <section className="site-container py-16">
      <FadeUp className="text-center mb-4">
        <h2 className="font-typewriter text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[#1A0F00]">
          From Local Beginnings to Global Reach
        </h2>
      </FadeUp>
      <FadeUp delay={0.1} className="text-center mb-10">
        <p className="font-raleway text-[18px] text-[#1A0F00] leading-relaxed max-w-3xl mx-auto">
          Our journey spans four decades of steady growth and innovation, supported by a long-term commitment to quality and service.
        </p>
      </FadeUp>

      {/* Full-width steel image */}
      <FadeUp delay={0.15}>
        <div className="relative w-full h-[300px] lg:h-[400px]">
          <SanityMedia
            videoUrl={media?.videoUrl}
            imageUrl={media?.imageUrl}
            fallbackSrc="/images/about/C9165T01.jpg"
            alt="U-LI steel cable tray"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>
      </FadeUp>

      {/* Timeline — 2002 spans 2 cols, all thick 4px dividers */}
      <div className="mt-10">
        <img src="/images/lines/line-thin.png" alt="" aria-hidden="true" className="block w-full h-auto" />
        <StaggerGroup className="grid grid-cols-[1fr_2fr_1fr_1fr]">

          {/* 1990s */}
          <StaggerItem className="py-8 px-6 text-center">
            <p className="font-typewriter text-[clamp(1.75rem,3vw,2.5rem)] text-[#1A0F00] mb-4">1990s</p>
            <p className="font-raleway font-medium text-[16px] text-[#5C4A30] leading-relaxed">
              First factory established in Seri Kembangan
            </p>
          </StaggerItem>

          {/* 2002 — double-width, year spans both cols, two text items below */}
          <StaggerItem className="relative flex flex-col">
            <img src="/images/lines/line-thin-vertical.png" alt="" aria-hidden="true" className="absolute top-0 left-0 h-full w-[4px] object-fill" />
            {/* Year spanning full width */}
            <div className="pt-8 pb-4 text-center">
              <p className="font-typewriter text-[clamp(1.75rem,3vw,2.5rem)] text-[#1A0F00]">2002</p>
            </div>
            {/* Two sub-columns with divider */}
            <div className="grid grid-cols-[1fr_4px_1fr] flex-1 pb-8">
              <div className="px-6 flex items-center justify-center text-center">
                <p className="font-raleway font-medium text-[16px] text-[#5C4A30] leading-relaxed">
                  Public listing on Bursa Malaysia
                </p>
              </div>
              <div className="relative">
                <img src="/images/lines/line-thin-vertical.png" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-fill" />
              </div>
              <div className="px-6 flex items-center justify-center text-center">
                <p className="font-raleway font-medium text-[16px] text-[#5C4A30] leading-relaxed">
                  Expanded to five integrated manufacturing plants
                </p>
              </div>
            </div>
          </StaggerItem>

          {/* 2020 */}
          <StaggerItem className="relative py-8 px-6 text-center">
            <img src="/images/lines/line-thin-vertical.png" alt="" aria-hidden="true" className="absolute top-0 left-0 h-full w-[4px] object-fill" />
            <p className="font-typewriter text-[clamp(1.75rem,3vw,2.5rem)] text-[#1A0F00] mb-4">2020</p>
            <p className="font-raleway font-medium text-[16px] text-[#5C4A30] leading-relaxed">
              Export operations across ASEAN, the Middle East, and Australia
            </p>
          </StaggerItem>

          {/* 2024 */}
          <StaggerItem className="relative py-8 px-6 text-center">
            <img src="/images/lines/line-thin-vertical.png" alt="" aria-hidden="true" className="absolute top-0 left-0 h-full w-[4px] object-fill" />
            <p className="font-typewriter text-[clamp(1.75rem,3vw,2.5rem)] text-[#1A0F00] mb-4">2024</p>
            <p className="font-raleway font-medium text-[16px] text-[#5C4A30] leading-relaxed">
              RM253 million revenue and over 40,000MT of steel processed
            </p>
          </StaggerItem>

        </StaggerGroup>
        <img src="/images/lines/line-thin.png" alt="" aria-hidden="true" className="block w-full h-auto" />
      </div>
    </section>
  );
}
