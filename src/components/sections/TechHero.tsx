import FadeUp from "@/components/motion/FadeUp";
import SanityMedia from "@/components/SanityMedia";
import type { HeroMedia } from "@/sanity/lib/queries";

export default function TechHero({ media }: { media?: HeroMedia | null }) {
  return (
    <section>
      {/* Single-line below nav */}
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      <div className="site-container">
        {/* Hero image / video */}
        <FadeUp>
          <div className="relative w-full h-[340px] lg:h-[500px]">
            <SanityMedia
              videoUrl={media?.videoUrl}
              videoThumbnailUrl={media?.videoThumbnailUrl}
              imageUrl={media?.imageUrl}
              fallbackSrc="/images/technology/DSC09722.jpg"
              alt="U-LI manufacturing facility"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1400px) 100vw, 1400px"
              priority
            />
          </div>
        </FadeUp>

        {/* Title left · Body right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 pt-10 pb-12">
          <FadeUp>
            <h1 className="font-typewriter uppercase text-[clamp(2rem,4vw,4rem)] leading-[1.0] text-[#1A0F00] tracking-tight">
              Engineering Beyond Steel
            </h1>
          </FadeUp>
          <FadeUp delay={0.1} className="flex items-center pt-6 lg:pt-0">
            <p className="font-raleway text-[18px] text-[#1A0F00] leading-relaxed">
              At U-LI, technology goes beyond equipment. It is rooted in how we design, improve,
              and problem-solve. Every product we build reflects ongoing R&amp;D, precision
              engineering, and a commitment to delivering better outcomes for today&apos;s and
              tomorrow&apos;s infrastructure.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Double-line below hero */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>
    </section>
  );
}
