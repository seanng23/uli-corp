import Image from "next/image";
import FadeUp from "@/components/motion/FadeUp";

export default function QualityBuild() {
  return (
    <section className="site-container py-14 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_4px_1fr] gap-0 lg:gap-x-14 items-stretch">

        <FadeUp className="flex flex-col justify-center pb-10 lg:pb-0">
          <h2 className="font-typewriter text-[clamp(1.4rem,2.5vw,2rem)] leading-tight text-[#1A0F00] mb-5">
            Built to Improve Over Time
          </h2>
          <p className="font-raleway text-[16px] text-[#5C4A30] leading-relaxed">
            We treat quality as an evolving benchmark, not a one-time achievement. Through annual
            audits, ongoing staff development, and product enhancements, we continually refine our
            systems to meet the needs of modern infrastructure.
          </p>
        </FadeUp>

        {/* Vertical divider */}
        <div className="hidden lg:block bg-[#1A0F00] self-stretch" />

        <FadeUp delay={0.1} className="relative h-[380px] lg:h-auto">
          <Image
            src="/images/quality/C9165T01-1.jpg"
            alt="U-LI perforated cable tray — built to last"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </FadeUp>

      </div>
    </section>
  );
}
