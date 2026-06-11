import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { CountUp } from "@/components/motion/CountUp";

const stats = [
  { over: "Over", num: 250, numPrefix: "Rm", numSuffix: "", unit: "Million", label: "annual revenue" },
  { over: "Over", num: 40000, numPrefix: "", numSuffix: "", unit: "Mt Of Steel", label: "processed every year" },
  { over: "Over", num: 662, numPrefix: "", numSuffix: "", unit: "Employees", label: "trained in health and safety standards" },
  { over: "Over", num: 90, numPrefix: "", numSuffix: "%", unit: "Customer", label: "satisfaction achieved" },
];

export default function StatsBand() {
  return (
    <section className="py-12">
      <StaggerGroup className="site-container grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s) => (
          <StaggerItem key={s.label} className="text-center">
            <p className="font-raleway text-xs font-semibold tracking-wide text-[#ff8905] mb-1">{s.over}</p>
            <p className="font-typewriter text-[clamp(2rem,3.5vw,3rem)] leading-none text-[#1A0F00]">
              <CountUp value={s.num} prefix={s.numPrefix} suffix={s.numSuffix} duration={2} />
            </p>
            <p className="font-typewriter text-[clamp(2rem,3.5vw,3rem)] leading-none text-[#1A0F00]">
              {s.unit}
            </p>
            <p className="font-raleway text-sm text-[#ff8905] mt-2 tracking-wide">{s.label}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
