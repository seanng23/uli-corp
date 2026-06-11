import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";

export default function AboutBand() {
  return (
    <section className="site-container py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
        {/* Left: description */}
        <FadeUp>
          <p className="text-[#1A0F00] text-[20px] leading-relaxed max-w-xl">
            For over 40 years, U-LI leads the way in delivering reliable Cable Support System solutions.
            We manufacture and deliver reliable systems that power infrastructure across the region.
            Explore our complete range of ISO-certified Cable Support Systems.
          </p>
          <Link href="/products" className="link-underline mt-5 inline-flex text-[#1A0F00]">
            Explore Our Products »
          </Link>
        </FadeUp>

        {/* Vertical rule */}
        <div className="hidden lg:block w-[4px] bg-[#1A0F00] self-stretch" />

        {/* Right: tagline + CTA */}
        <FadeUp delay={0.1}>
          <p className="font-raleway font-bold text-[20px] text-[#1A0F00] leading-snug mb-6">
            Certified Cable Support Systems. Proudly engineered in Malaysia and trusted across ASEAN
            and international markets, including the Middle East.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 bg-[#ff8905] text-[#1A0F00] font-bold px-10 py-5 underline underline-offset-4 hover:bg-[#cc6e00] transition-colors"
          >
            Get In Touch »
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
