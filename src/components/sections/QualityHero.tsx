import RevealRule from "@/components/motion/RevealRule";
export default function QualityHero() {
  return (
    <section>
      <div className="site-container">
        <RevealRule src="/images/single-line.png" className="w-full block" />
      </div>

      <div className="site-container">
        <div className="grid grid-cols-[40px_1fr_40px] lg:grid-cols-[80px_1fr_80px] items-center py-10">
          <div />
          <h1 className="font-typewriter uppercase text-center text-[clamp(2rem,4.5vw,5rem)] leading-[1.0] text-[#1A0F00] tracking-tight px-4">
            Quality That Speaks for Itself
          </h1>
          <div />
        </div>
      </div>

      <div className="site-container">
        <RevealRule src="/images/double-line.png" className="w-full block" />
      </div>
    </section>
  );
}
