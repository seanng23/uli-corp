import FadeUp from "@/components/motion/FadeUp";
import SanityMedia from "@/components/SanityMedia";
import type { SiteSettings } from "@/sanity/lib/queries";

type SectionMedia = NonNullable<SiteSettings["sectionImages"]>[number];

export default function AboutSplit({
  workerMedia,
  trayMedia,
  factoryMedia,
}: {
  workerMedia?: SectionMedia | null;
  trayMedia?: SectionMedia | null;
  factoryMedia?: SectionMedia | null;
}) {
  return (
    <section className="site-container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_4px_1fr] gap-0 lg:gap-x-10">
        {/* Left: tall worker photo + heading + body */}
        <div className="flex flex-col">
          <div className="relative w-full h-[480px] lg:h-[944px]">
            <SanityMedia
              videoUrl={workerMedia?.videoUrl}
              imageUrl={workerMedia?.imageUrl}
              fallbackSrc="/images/about/DSC09748.jpg"
              alt="U-LI manufacturing worker"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <FadeUp className="pt-6 pb-8 lg:pr-10">
            <h2 className="font-typewriter text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] text-[#1A0F00] mb-4">
              From Malaysia to the region. Powering progress through steel-based solutions.
            </h2>
            <p className="font-raleway text-[16px] text-[#1A0F00] leading-relaxed mb-4">
              Backed by over 40 years of industry experience, U-LI continues to contribute to infrastructure development across Malaysia and the region. We manufacture certified Cable Support Systems and lighting solutions.
            </p>
            <p className="font-raleway text-[16px] text-[#1A0F00] leading-relaxed">
              We are not just a supplier. We are a trusted partner to engineers, developers, and infrastructure teams across key international markets, including ASEAN, the Middle East, and Australia.
            </p>
          </FadeUp>
        </div>

        {/* Vertical divider — thin textured line */}
        <div className="hidden lg:block relative">
          <img
            src="/images/lines/line-thin-vertical.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-fill"
          />
        </div>

        {/* Right: two stacked sections */}
        <div className="flex flex-col">
          {/* Top: cable tray photo + text */}
          <div>
            <div className="relative w-full h-[300px] lg:h-[360px]">
              <SanityMedia
                videoUrl={trayMedia?.videoUrl}
                imageUrl={trayMedia?.imageUrl}
                fallbackSrc="/images/about/C9131T01.jpg"
                alt="U-LI perforated cable tray"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <FadeUp className="pt-5 pb-6">
              <h3 className="font-typewriter text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.1] text-[#1A0F00] mb-3">
                Made in Malaysia. Built for the World.
              </h3>
              <p className="font-raleway text-[16px] text-[#1A0F00] leading-relaxed">
                U-LI is a publicly listed company Bursa Malaysia (7133), with five factories operating across Malaysia. We process over 40,000 metric tonnes of steel each year to meet growing global demand.
              </p>
            </FadeUp>
          </div>

          {/* Bottom: yellow crane photo + text */}
          <div>
            <div className="relative w-full h-[300px] lg:h-[360px] mt-6">
              <SanityMedia
                videoUrl={factoryMedia?.videoUrl}
                imageUrl={factoryMedia?.imageUrl}
                fallbackSrc="/images/about/DSC02601.jpg"
                alt="U-LI factory manufacturing floor"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <FadeUp delay={0.1} className="pt-5 pb-8">
              <h3 className="font-typewriter text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.1] text-[#1A0F00] mb-3">
                End-to-End Manufacturing Expertise.
              </h3>
              <p className="font-raleway text-[16px] text-[#1A0F00] leading-relaxed">
                With multiple active subsidiaries, we manage everything in-house. From R&amp;D to fabrication and delivery, this control ensures consistency, speed, and product quality every step of the way.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
