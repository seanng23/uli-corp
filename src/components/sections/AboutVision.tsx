import Image from "next/image";
import FadeUp from "@/components/motion/FadeUp";

export default function AboutVision() {
  return (
    <section className="site-container py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_4px_1fr] gap-0 lg:gap-x-14 items-stretch">
        {/* Left: vision text */}
        <FadeUp className="py-8 lg:py-0 flex flex-col justify-between">
          <div>
            <h2 className="font-typewriter text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[#1A0F00] mb-5">
              Built on Consistency and Trust
            </h2>
            <p className="font-raleway text-[18px] text-[#1A0F00] leading-relaxed">
              We continue to grow by investing in capacity, people, and technology. Our goal is to remain the preferred infrastructure partner for every project we serve.
            </p>
          </div>
          <div>
            <p className="font-typewriter text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[#1A0F00] mb-4">Our Vision</p>
            <p className="font-raleway text-[18px] text-[#1A0F00] leading-relaxed">
              To lead the region in Cable Support Systems solutions by delivering products of exceptional quality, supported by continuous innovation and reliable partnerships.
            </p>
          </div>
        </FadeUp>

        {/* Vertical divider — thin textured line */}
        <div className="hidden lg:block relative">
          <img src="/images/lines/line-thin-vertical.png" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-fill" />
        </div>

        {/* Right: cable ladder photo */}
        <div className="relative h-[440px] lg:h-[440px]">
          <Image
            src="/images/about/C9056T01.jpg"
            alt="U-LI cable ladder system"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
