const pillars = [
  { icon: "/images/manufacturing/icon-machinery.png", label: "State-of-the-art machinery for precision fabrication" },
  { icon: "/images/manufacturing/icon-quality.png", label: "Strict adherence to ISO and SIRIM-certified processes" },
  { icon: "/images/manufacturing/icon-logistics.png", label: "In-house logistics and material handling" },
  { icon: "/images/manufacturing/icon-teams.png", label: "Dedicated teams for custom orders and large tenders" },
];

export default function ManufacturingScale() {
  return (
    <section className="site-container py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_4px_2fr] gap-10 lg:gap-12 items-center">
        {/* Left — capacity stat */}
        <div>
          <p className="font-typewriter text-[clamp(3.25rem,7vw,5.5rem)] leading-none text-[#1A0F00]">
            40,000
          </p>
          <p className="font-raleway text-[15px] font-bold text-[#ff8905] mt-2 mb-5">
            Metric Tonnes Processed Annually
          </p>
          <p className="font-raleway text-[15px] text-[#1A0F00] leading-relaxed">
            With a combined processing capacity of approximately{" "}
            <span className="font-bold">40,000 MT of steel per year</span>, U-LI ensures scalable
            output and reduced lead times for large-scale infrastructure and M&amp;E projects.
          </p>
        </div>

        {/* Vertical rule */}
        <div className="hidden lg:block relative self-stretch">
          <img
            src="/images/lines/line-thin-vertical.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-fill"
          />
        </div>

        {/* Right — quality pillars */}
        <div>
          <h2 className="font-typewriter text-[clamp(1.75rem,3.4vw,2.875rem)] leading-tight text-[#1A0F00] mb-8">
            Built for Quality, Backed by Scale
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {pillars.map((p) => (
              <div key={p.label} className="text-center">
                <img
                  src={p.icon}
                  alt=""
                  aria-hidden="true"
                  className="mx-auto mb-4 h-14 w-14 object-contain"
                />
                <p className="font-raleway text-[13px] text-[#5C4A30] leading-snug">
                  {p.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
