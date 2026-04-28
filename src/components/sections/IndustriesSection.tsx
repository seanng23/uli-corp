import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import SanityMedia from "@/components/SanityMedia";
import type { SiteSettings } from "@/sanity/lib/queries";

type SectionMedia = NonNullable<SiteSettings["sectionImages"]>[number];

const industries = [
  { name: "Construction", src: "/images/homepage/industry-construction.png" },
  { name: "Commercial & Industrial", src: "/images/homepage/industry-commercial.png" },
  { name: "Telecom & Data Centres", src: "/images/homepage/industry-telecom.png" },
  { name: "Energy & Utilities", src: "/images/homepage/industry-energy.png" },
  { name: "Transportation & Marine", src: "/images/homepage/industry-transport.png" },
  { name: "Oil and Gas", src: "/images/homepage/industry-oilgas.png" },
  { name: "Government Buildings", src: "/images/homepage/industry-government.png" },
];

export default function IndustriesSection({
  internationalMedia,
  localMedia,
}: {
  internationalMedia?: SectionMedia | null;
  localMedia?: SectionMedia | null;
}) {
  return (
    <section className="site-container py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_4px_1fr] gap-0 lg:gap-x-12 items-stretch">
        {/* Left text */}
        <div>
          <FadeUp>
            <h2 className="font-typewriter text-[clamp(1.75rem,4.5vw,2.875rem)] leading-[1.05] text-[#1A0F00] mb-4">
              Supporting Every Layer of the Built Environment.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-raleway font-bold text-[20px] text-[#ff8905] mb-4">
              We power essential infrastructure across key industries.
            </p>
            <p className="font-raleway text-[20px] text-[#1A0F00] leading-relaxed">
              From Malaysia to the Middle East and beyond, our products and solutions are recognized
              by industry professionals across diverse markets around the world.
            </p>
          </FadeUp>
          <div className="mt-10 pt-10 border-t-[4px] border-[#1A0F00]">
            <FadeUp delay={0.15}>
              <h2 className="font-typewriter text-[clamp(1.75rem,4.5vw,2.875rem)] leading-[1.05] text-[#1A0F00] mb-4">
                A Proven Track Record Across Sectors.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="font-raleway font-bold text-[20px] text-[#ff8905] mb-4">
                Explore highlights from our project portfolio in commercial, industrial, and infrastructure environments.
              </p>
              <p className="font-raleway text-[20px] text-[#1A0F00] leading-relaxed">
                From high-rise buildings to complex transport networks, U-LI provides Cable Support
                Systems solutions tailored to diverse environments and customer needs.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden lg:block bg-[#1A0F00] self-stretch" />

        {/* Right: industry icons + project links */}
        <div>
          <StaggerGroup className="grid grid-cols-3 gap-6 mb-8">
            {industries.map((ind, i) => (
              <StaggerItem key={ind.name} className={`flex flex-col items-center gap-3${i === industries.length - 1 ? " col-start-2" : ""}`}>
                <div className="relative w-[106px] h-[106px]">
                  <Image
                    src={ind.src}
                    alt={ind.name}
                    fill
                    className="object-contain"
                    sizes="106px"
                  />
                </div>
                <p className="font-raleway text-sm text-center text-[#1A0F00] font-medium leading-tight">
                  {ind.name}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Project image cards */}
          <div className="flex flex-col gap-3">
            {[
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
            ].map((p) => (
              <Link key={p.label} href={p.href} className="block relative w-full h-52 overflow-hidden group">
                <SanityMedia
                  videoUrl={p.media?.videoUrl}
                  imageUrl={p.media?.imageUrl}
                  fallbackSrc={p.fallback}
                  alt={p.label}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#1A0F00]/35 group-hover:bg-[#1A0F00]/15 transition-all duration-500" />
                <div className="absolute bottom-4 right-5">
                  <span className="font-raleway text-base font-semibold text-[#F5EDD6] underline underline-offset-4 decoration-[#F5EDD6]/60 group-hover:decoration-[#F5EDD6] transition-all duration-300">
                    {p.label} ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
