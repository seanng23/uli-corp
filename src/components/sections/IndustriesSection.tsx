import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";
import Typewriter from "@/components/motion/Typewriter";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import SanityMedia from "@/components/SanityMedia";
import type { SiteSettings } from "@/sanity/lib/queries";

type SectionMedia = NonNullable<SiteSettings["sectionImages"]>[number];

const industries: { name: string; src: string; big?: boolean }[] = [
  { name: "Construction", src: "/images/homepage/industry-construction.png" },
  { name: "Commercial & Industrial", src: "/images/homepage/industry-commercial.png" },
  { name: "Telecom & Data Centres", src: "/images/homepage/industry-telecom.png" },
  { name: "Energy & Utilities", src: "/images/homepage/industry-energy.png" },
  { name: "Transportation & Marine", src: "/images/homepage/industry-transport.png" },
  { name: "Oil and Gas", src: "/images/homepage/industry-oilgas.png", big: true },
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
    <section className="site-container py-20 lg:py-28">
      {/* Section padding insets the grid so the vertical rule floats between the
          top/bottom Dividers (gap above & below), while the middle rule still
          meets the vertical rule. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* Left text — thin textured vertical rule on its right edge */}
        <div className="relative flex flex-col">
          <img
            src="/images/lines/line-thin-vertical.png"
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute -top-[72px] right-0 h-[calc(100%_+_144px)] w-[4px] object-fill"
          />
          <div className="pb-14 lg:pb-20 lg:pr-12">
            <h2 className="font-typewriter text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[#1A0F00] mb-4">
              <Typewriter text="Supporting Every Layer of the Built Environment." />
            </h2>
            <FadeUp delay={0.1}>
              <p className="font-raleway font-bold text-[20px] text-[#ff8905] mb-4">
                We power essential infrastructure across key industries.
              </p>
              <p className="font-raleway text-[20px] text-[#1A0F00] leading-relaxed">
                From Malaysia to the Middle East and beyond, our products and solutions are recognized
                by industry professionals across diverse markets around the world.
              </p>
            </FadeUp>
          </div>

          {/* Middle rule (thin texture) meets the vertical rule on its right */}
          <div className="relative pt-14 lg:pt-20 lg:pr-12">
            <img
              src="/images/lines/line-thin.png"
              alt=""
              aria-hidden="true"
              className="absolute top-0 left-0 w-full h-auto"
            />
            <h2 className="font-typewriter text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[#1A0F00] mb-4">
              <Typewriter text="A Proven Track Record Across Sectors." />
            </h2>
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

        {/* Right: industry icons + project links */}
        <div className="lg:pl-12">
          <StaggerGroup className="grid grid-cols-3 gap-6 mb-8">
            {industries.map((ind, i) => (
              <StaggerItem key={ind.name} className={`flex flex-col items-center gap-3${i === industries.length - 1 ? " col-start-2" : ""}`}>
                <div className={`relative ${ind.big ? "w-[124px] h-[124px] lg:w-[145px] lg:h-[145px]" : "w-[106px] h-[106px] lg:w-[124px] lg:h-[124px]"}`}>
                  <Image
                    src={ind.src}
                    alt={ind.name}
                    fill
                    className="object-contain"
                    sizes={ind.big ? "(max-width: 1024px) 124px, 145px" : "(max-width: 1024px) 106px, 124px"}
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
                {/* Bottom gradient only — keeps the photo bright, label readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F00]/70 via-[#1A0F00]/10 to-transparent group-hover:from-[#1A0F00]/55 transition-all duration-500" />
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
