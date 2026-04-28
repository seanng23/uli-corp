import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";

export default function CTASection() {
  return (
    <section className="site-container py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <FadeUp>
          <h2 className="font-typewriter text-[clamp(1.75rem,4.5vw,2.875rem)] leading-[1.05] text-[#1A0F00]">
            Let&apos;s Talk About Your Project Needs.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1} className="lg:pl-8 lg:border-l-[4px] border-[#1A0F00]">
          <p className="font-raleway font-bold text-[20px] text-[#1A0F00] mb-2">
            Request a quote, get technical support, or speak directly with our sales team.
          </p>
          <p className="font-raleway text-[20px] text-[#5C4A30] leading-relaxed mb-6">
            Have questions or need assistance? Our experts are ready to support you. Contact us
            today, and we&apos;ll get back to you promptly.
          </p>
          <Link href="/contact" className="link-underline text-[#1A0F00]">
            Connect With Us »
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
