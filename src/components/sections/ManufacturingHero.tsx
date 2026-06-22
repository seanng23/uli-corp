import Image from "next/image";

export default function ManufacturingHero() {
  return (
    <section>
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      <div className="site-container">
        <div className="grid grid-cols-[40px_1fr_40px] lg:grid-cols-[80px_1fr_80px] items-center py-10">
          <div />
          <h1 className="font-typewriter uppercase text-center text-[clamp(2rem,4.5vw,5rem)] leading-[1.0] text-[#1A0F00] tracking-tight px-4">
            Made in Malaysia,
            <br />
            Built for the Region
          </h1>
          <div />
        </div>
      </div>

      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Hero image — perforated steel close-up */}
      <div className="site-container pt-10">
        <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[560px]">
          <Image
            src="/images/manufacturing/hero-steel.png"
            alt="Close-up of a U-LI steel sheet on the production line"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>
      </div>

      {/* Overview caption */}
      <div className="site-container py-8">
        <p className="font-raleway text-center text-[15px] lg:text-[16px] text-[#5C4A30] leading-relaxed max-w-[860px] mx-auto">
          U-LI operates five strategically located manufacturing sites across Malaysia. These
          facilities form the backbone of our operations, allowing us to produce and deliver
          high-quality steel Cable Support Systems with consistency and speed.
        </p>
      </div>
    </section>
  );
}
