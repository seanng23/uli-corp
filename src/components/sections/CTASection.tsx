import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";
import Typewriter from "@/components/motion/Typewriter";

export default function CTASection() {
  return (
    <section className="site-container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_4px_1fr] gap-8 lg:gap-12 items-stretch lg:min-h-[360px]">
        <div className="flex items-center">
          <h2 className="font-typewriter text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[#1A0F00]">
            <Typewriter text="Let's Talk About Your Project Needs." />
          </h2>
        </div>

        {/* Vertical thin rule (rotated thin line) — tall & thin, fills the cell */}
        <div className="hidden lg:block relative">
          <img
            src="/images/lines/line-thin-vertical.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-fill"
          />
        </div>

        <FadeUp delay={0.1} className="flex flex-col justify-center">
          <p className="font-raleway font-bold text-[20px] text-[#1A0F00] mb-2">
            Request a quote, get technical support, or speak directly with our sales team.
          </p>
          <p className="font-raleway text-[20px] text-[#5C4A30] leading-relaxed mb-6">
            Have questions or need assistance? Our experts are ready to support you. Contact us
            today, and we&apos;ll get back to you promptly.
          </p>
          <Link href="/contact-us" className="link-underline text-[#1A0F00]">
            Connect With Us »
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
