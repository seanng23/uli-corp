const rows = [
  {
    capability: "Production Facilities",
    details: "Slitter, Shearer, Roll Forming, Laser, Turret Punch, Robotic Welding, Powder Manufacturing",
  },
  { capability: "Surface Treatment", details: "Powder Coating, Hot-Dip Galvanising" },
  { capability: "Quality Control", details: "In-house QA Lab & Inspection Teams" },
  { capability: "R&D Integration", details: "Supports Custom Product Development" },
];

export default function ManufacturingCapabilities() {
  return (
    <section className="site-container py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-10 lg:gap-16 items-start">
        <h2 className="font-typewriter text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] text-[#1A0F00]">
          Factory Capabilities
          <br className="hidden lg:block" /> at a Glance
        </h2>

        <div className="font-raleway">
          <div className="grid grid-cols-[minmax(140px,1fr)_2fr] gap-x-6 pb-3 border-b border-[#1A0F00]/25">
            <span className="text-[14px] font-bold text-[#ff8905]">Capabilities</span>
            <span className="text-[14px] font-bold text-[#ff8905]">Details</span>
          </div>
          {rows.map((row) => (
            <div
              key={row.capability}
              className="grid grid-cols-[minmax(140px,1fr)_2fr] gap-x-6 py-4 border-b border-[#1A0F00]/15"
            >
              <span className="text-[15px] text-[#1A0F00]">{row.capability}</span>
              <span className="text-[15px] text-[#1A0F00] leading-snug">{row.details}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
