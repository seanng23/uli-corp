import Image from "next/image";
import FadeUp from "@/components/motion/FadeUp";

export default function QualityBuild() {
  return (
    <section className="site-container py-14 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-center">

        <FadeUp className="flex flex-col justify-center pb-10 lg:pb-0">
          <h2 className="font-typewriter text-[clamp(2rem,3.4vw,3.25rem)] leading-tight text-[#1A0F00] mb-5">
            Built to Improve Over Time
          </h2>
          <p className="font-raleway text-[16px] text-[#5C4A30] leading-relaxed">
            We treat quality as an evolving benchmark, not a one-time achievement. Through annual
            audits, ongoing staff development, and product enhancements, we continually refine our
            systems to meet the needs of modern infrastructure.
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="relative h-[340px] lg:h-[470px]">
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
