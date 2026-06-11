import FadeUp from "@/components/motion/FadeUp";
import SanityMedia from "@/components/SanityMedia";
import type { SiteSettings } from "@/sanity/lib/queries";

type SectionMedia = NonNullable<SiteSettings["sectionImages"]>[number];

const HEADING =
  "font-typewriter text-[clamp(2rem,3.4vw,3.25rem)] leading-tight text-[#1A0F00] mb-4";

export default function QualityControls({ media }: { media?: SectionMedia | null }) {
  return (
    <>
      <section className="site-container py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_4px_3fr] gap-0 lg:gap-x-10 items-stretch">

          {/* Left — two text blocks separated by a thin line (column width only) */}
          <FadeUp className="flex flex-col justify-center pb-10 lg:pb-0">
            <div>
              <h2 className={HEADING}>Stringent Quality Controls Across Every Step</h2>
              <p className="font-raleway text-[16px] text-[#5C4A30] leading-relaxed">
                We implement comprehensive quality checks at every stage of production. This includes
                raw material inspection, in-line dimensional checks, post-production load and strength
                testing, and visual inspection before delivery. These practices ensure that every U‑LI
                system performs reliably on-site, from day one.
              </p>
            </div>

            {/* Thin horizontal line between the two blocks (pinned to 4px to match site-wide thin lines) */}
            <img
              src="/images/lines/line-thin.png"
              alt=""
              aria-hidden="true"
              className="w-full h-[4px] object-fill block my-9"
            />

            <div>
              <h2 className={HEADING}>Investing in Research and Development</h2>
              <p className="font-raleway text-[16px] text-[#5C4A30] leading-relaxed">
                We operate in-house R&amp;D and prototyping labs that focus on improving product
                strength, ease of installation, and cost-efficiency. Using advanced design software,
                custom tooling, and engineering feedback from the field, we evolve our systems to meet
                the demands of tomorrow&apos;s infrastructure projects.
              </p>
            </div>
          </FadeUp>

          {/* Thin vertical line */}
          <div className="hidden lg:block relative">
            <img
              src="/images/lines/line-thin-vertical.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-fill"
            />
          </div>

          {/* Right (wider) — image + quote below */}
          <FadeUp delay={0.1} className="flex flex-col">
            <div className="relative flex-1 min-h-[420px]">
              <SanityMedia
                videoUrl={media?.videoUrl}
                imageUrl={media?.imageUrl}
                fallbackSrc="/images/quality/Mask-Group-51.jpg"
                alt="U-LI quality manufacturing process"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed mt-5">
              At U‑LI, quality is not a checkbox. It is a commitment that runs through every part of
              our manufacturing process. From raw material inspection to final packaging, every
              product is checked, tested, and validated to meet the highest standards of safety,
              durability, and performance.
            </p>
          </FadeUp>

        </div>
      </section>

      {/* Thick textured line before "Certified" — a major section break */}
      <div className="site-container">
        <img src="/images/lines/line-thick.png" alt="" aria-hidden="true" className="w-full block" />
      </div>
    </>
  );
}
