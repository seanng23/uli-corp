import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const stats = [
  { prefix: "Over", value: "RM250", unit: "Million", label: "annual revenue" },
  { prefix: "Over", value: "40,000MT", unit: "Of Steel", label: "processed every year" },
  { prefix: "Over", value: "660", unit: "Employees", label: "trained in health and safety standards" },
  { prefix: "Over", value: "90%", unit: "Customer", label: "satisfaction achieved" },
];

export default function StatsBand() {
  return (
    <section className="border-t border-b border-[#1A0F00]/20 py-12">
      <StaggerGroup className="site-container grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s) => (
          <StaggerItem key={s.label} className="text-center">
            <p className="font-raleway text-xs font-semibold tracking-widest uppercase text-[#ff8905] mb-1">{s.prefix}</p>
            <p className="font-typewriter text-[clamp(2rem,3.5vw,3rem)] leading-none text-[#1A0F00]">
              {s.value}
            </p>
            <p className="font-typewriter text-[clamp(1.25rem,2vw,1.75rem)] leading-none text-[#1A0F00]">
              {s.unit}
            </p>
            <p className="font-raleway text-sm text-[#5C4A30] mt-2 tracking-wide">{s.label}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
