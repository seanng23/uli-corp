import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import FadeUp from "@/components/motion/FadeUp";

const impacts = [
  {
    prefix: "Over",
    value: "90%",
    unit: "Customer",
    label: "satisfaction achieved",
  },
  {
    prefix: "Over",
    value: "8,300",
    unit: "",
    label: "hours of employee training conducted",
  },
  {
    prefix: "Ongoing",
    value: "ESG",
    unit: "",
    label: "improvements in every factory and operation",
  },
];

export default function AboutImpact() {
  return (
    <section className="site-container py-16">
      <FadeUp className="text-center mb-10">
        <h2 className="font-typewriter text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[#1A0F00]">
          Positive Impact, Measurable Results
        </h2>
      </FadeUp>
      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {impacts.map((s) => (
          <StaggerItem key={s.label} className="text-center">
            <p className="font-raleway text-[11px] font-semibold tracking-widest uppercase text-[#ff8905] mb-2">
              {s.prefix}
            </p>
            <p className="font-typewriter text-[clamp(2rem,3.5vw,3.5rem)] leading-none text-[#1A0F00]">
              {s.value}
            </p>
            {s.unit && (
              <p className="font-typewriter text-[clamp(1.4rem,2.2vw,2.2rem)] leading-none text-[#1A0F00]">
                {s.unit}
              </p>
            )}
            <p className="font-raleway text-[14px] text-[#ff8905] mt-2 leading-snug" style={{ wordSpacing: "0.05em" }}>{s.label}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
