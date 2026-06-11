import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";
import SanityMedia from "@/components/SanityMedia";
import type { SiteSettings } from "@/sanity/lib/queries";

type SectionMedia = NonNullable<SiteSettings["sectionImages"]>[number];

export default function QualityCertified({
  fieldMedia,
}: {
  fieldMedia?: SectionMedia | null;
}) {
  return (
    <>
      {/* Certified by Trusted Institutions */}
      <section className="site-container py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          <FadeUp className="pb-10 lg:pb-0">
            <h2 className="font-typewriter text-[clamp(2rem,3.4vw,3.25rem)] leading-tight text-[#1A0F00] mb-5">
              Certified by Trusted Institutions
            </h2>
            <p className="font-raleway text-[16px] text-[#5C4A30] leading-relaxed">
              All our products undergo independent third-party testing and certification. Our quality
              system complies with ISO 9001:2015, and many of our products are certified by SIRIM
              and tested to local and international load and safety standards. Every batch is
              traceable and compliant with the specifications it promises.
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="flex items-center justify-center lg:justify-end">
            <Image
              src="/images/quality/Group-2618.png"
              alt="ISO 9001, IQNET, QAS, SIRIM, Buatan Malaysia certifications"
              width={944}
              height={291}
              className="w-full max-w-[640px] h-auto object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeUp>

        </div>
      </section>

      {/* Solid bar between Certified and Proven on the Field */}
      <div className="site-container">
        <div className="border-t-[5px] border-[#1A0F00]" />
      </div>

      {/* Proven on the Field */}
      <section className="site-container py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">

          <FadeUp className="relative h-[380px] lg:h-[600px] mb-10 lg:mb-0">
            <SanityMedia
              videoUrl={fieldMedia?.videoUrl}
              imageUrl={fieldMedia?.imageUrl}
              fallbackSrc="/images/quality/DSC09795.jpg"
              alt="U-LI proven on the field"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeUp>

          <FadeUp delay={0.1} className="flex flex-col justify-center">
            <h2 className="font-typewriter text-[clamp(2rem,3.4vw,3.25rem)] leading-tight text-[#1A0F00] mb-3">
              Proven on the Field
            </h2>
            <p className="font-raleway text-[15px] font-semibold text-[#ff8905] mb-5">
              Real Projects, Real Performance, Real Trust
            </p>
            <p className="font-raleway text-[16px] text-[#5C4A30] leading-relaxed mb-6">
              Proudly manufactured in Malaysia and listed on the KLSE, U-LI has grown into one of
              the most respected and trusted names in Cable Support Systems. With five production
              sites and a deep commitment to quality, we continue shaping infrastructure across
              ASEAN and beyond.
            </p>
            <Link href="/projects" className="link-underline text-[#1A0F00]">
              View Projects »
            </Link>
          </FadeUp>

        </div>
      </section>
    </>
  );
}
