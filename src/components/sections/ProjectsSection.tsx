import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";
import SanityMedia from "@/components/SanityMedia";
import type { SiteSettings } from "@/sanity/lib/queries";

type SectionMedia = NonNullable<SiteSettings["sectionImages"]>[number];

export default function ProjectsSection({
  internationalMedia,
  localMedia,
}: {
  internationalMedia?: SectionMedia | null;
  localMedia?: SectionMedia | null;
}) {
  const projectCards = [
    {
      label: "International Projects",
      href: "/projects#international",
      media: internationalMedia,
      fallback: "/images/homepage/project-1.jpg",
    },
    {
      label: "Local Projects",
      href: "/projects",
      media: localMedia,
      fallback: "/images/homepage/project-2.jpg",
    },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-start">
        {/* Left text */}
        <div className="lg:sticky lg:top-28">
          <FadeUp>
            <h2 className="font-typewriter text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-[#1A0F00] mb-4">
              A Proven Track Record Across Sectors.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-raleway font-bold text-sm text-[#ff8905] mb-4">
              Explore highlights from our project portfolio in commercial, industrial, and infrastructure environments.
            </p>
            <p className="font-raleway text-sm text-[#1A0F00] leading-relaxed mb-6">
              From high-rise buildings to complex transport networks, U-LI provides Cable Support
              Systems solutions tailored to diverse environments. Our proven expertise, flexible approach,
              and customer-first mindset deliver dependable results.
            </p>
            <Link href="/projects" className="link-underline text-[#1A0F00]">
              Read More »
            </Link>
          </FadeUp>
        </div>

        {/* Right: project image stack */}
        <div className="space-y-4">
          {projectCards.map((p, i) => (
            <FadeUp key={p.label} delay={i * 0.1}>
              <Link href={p.href} className="block relative w-full h-80 overflow-hidden group">
                <SanityMedia
                  videoUrl={p.media?.videoUrl}
                  imageUrl={p.media?.imageUrl}
                  fallbackSrc={p.fallback}
                  alt={p.label}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#1A0F00]/30 group-hover:bg-[#1A0F00]/10 transition-all duration-500" />
                <div className="absolute bottom-5 right-6">
                  <span className="font-raleway text-base font-semibold text-[#F5EDD6] underline underline-offset-4 decoration-[#F5EDD6]/60 group-hover:decoration-[#F5EDD6] transition-all duration-300">
                    {p.label} ↗
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
