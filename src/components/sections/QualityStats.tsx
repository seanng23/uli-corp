import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const stats = [
  { value: "8,300", line1: "hours of employee training", line2: "conducted" },
  { value: "5", line1: "Factories audited", line2: "annually" },
  { value: "100%", line1: "product certification", line2: "compliance" },
];

export default function QualityStats() {
  return (
    <section>
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>
      <div className="site-container py-14">
        <h2 className="font-typewriter text-center text-[clamp(1.5rem,3vw,2.5rem)] leading-tight text-[#1A0F00] mb-10">
          Our Quality in Numbers
        </h2>
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((s) => (
            <StaggerItem key={s.value} className="text-center">
              <p className="font-typewriter text-[clamp(3rem,6vw,5rem)] leading-none text-[#1A0F00]">
                {s.value}
              </p>
              <p className="font-raleway text-[14px] text-[#ff8905] mt-3 leading-snug">
                {s.line1}<br />{s.line2}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>
    </section>
  );
}
