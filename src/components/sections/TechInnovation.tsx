import Image from "next/image";
import FadeUp from "@/components/motion/FadeUp";

export default function TechInnovation() {
  return (
    <section className="site-container py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_4px_1fr] gap-0 lg:gap-x-14 items-stretch">

        {/* Text */}
        <FadeUp className="flex flex-col justify-center pb-10 lg:pb-0">
          <p className="font-raleway text-[11px] font-semibold tracking-widest uppercase text-[#ff8905] mb-3">
            Innovation
          </p>
          <h2 className="font-typewriter text-[clamp(1.75rem,4.5vw,2.875rem)] leading-[1.05] text-[#1A0F00] mb-6">
            Evolving for Tomorrow&apos;s Infrastructure
          </h2>
          <p className="font-raleway text-[18px] text-[#1A0F00] leading-relaxed">
            U-LI is actively researching next-generation fabrication techniques including
            predictive maintenance, IoT-powered factory sensors, smart robotics, and material
            innovations. These efforts aim to reduce downtime, lower waste, and increase
            customization capabilities.
          </p>
        </FadeUp>

        {/* Vertical divider */}
        <div className="hidden lg:block bg-[#1A0F00] self-stretch" />

        {/* Image */}
        <FadeUp delay={0.1} className="relative h-[420px] lg:h-auto">
          <Image
            src="/images/technology/DSC09722.jpg"
            alt="U-LI future innovation and research"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </FadeUp>

      </div>
    </section>
  );
}
