import FadeUp from "@/components/motion/FadeUp";

export default function TechInnovation() {
  return (
    <section className="site-container py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Headline — left */}
        <FadeUp>
          <h2 className="font-typewriter text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[#1A0F00]">
            Evolving for Tomorrow&apos;s Infrastructure
          </h2>
        </FadeUp>

        {/* Text — right */}
        <FadeUp delay={0.1}>
          <p className="font-raleway text-[18px] text-[#1A0F00] leading-relaxed">
            U-LI is actively researching next-generation fabrication techniques including
            predictive maintenance, IoT-powered factory sensors, smart robotics, and material
            innovations. These efforts aim to reduce downtime, lower waste, and increase
            customization capabilities.
          </p>
        </FadeUp>

      </div>
    </section>
  );
}
