import type { Metadata } from "next";
import {
  TrendingUp,
  Leaf,
  Users,
  ShieldCheck,
  Sun,
  Droplets,
  Recycle,
  Flame,
  BatteryCharging,
  Gauge,
  Smile,
  LineChart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "United U-LI Corporation Berhad's approach to sustainability — creating long-term economic, environmental and social value across our operations.",
  alternates: { canonical: "/sustainability" },
};

const objectives = [
  {
    no: "01",
    title: "Sustainable Growth",
    body: "Deliver long-term profitability and sustainable growth while maintaining a strong emphasis on responsible economic, environmental and social practices.",
  },
  {
    no: "02",
    title: "Capacity & Productivity",
    body: "Strengthen our manufacturing capacity and productivity to cement the market position in the regional and domestic markets that we have built and sustained over the years.",
  },
  {
    no: "03",
    title: "Ethics & People",
    body: "Promote good business ethics and corporate governance while attracting, retaining and replenishing talent, and ensuring diversity and inclusion in the workplace.",
  },
];

const pillars = [
  {
    icon: TrendingUp,
    title: "Economic Value Creation",
    body: "Responsible procurement, sustained revenue growth and customer satisfaction that underpins long-term financial resilience.",
    topics: ["Sustainable Procurement", "Revenue Growth", "Customer Satisfaction"],
  },
  {
    icon: Leaf,
    title: "Environmental Value Creation",
    body: "Reducing our footprint through energy and water efficiency, responsible waste handling and lower emissions.",
    topics: ["Energy Management", "Water Management", "Waste Management", "Emissions"],
  },
  {
    icon: Users,
    title: "Social Value Creation",
    body: "Fair labour practices, a safe workplace, diversity and equal opportunity, and giving back to the communities we operate in.",
    topics: ["Labour & Welfare", "Safety & Health", "Diversity", "Community"],
  },
  {
    icon: ShieldCheck,
    title: "Governance Value Creation",
    body: "Upholding integrity through anti-corruption, whistle-blowing, data privacy and conflict-of-interest controls.",
    topics: ["Anti-corruption", "Whistle-blowing", "Data Privacy", "Conflict of Interest"],
  },
];

const initiatives = [
  {
    icon: Flame,
    title: "Natural Gas",
    body: "Transitioning thermal processes to cleaner-burning natural gas, reducing carbon intensity compared with heavier fossil fuels across our manufacturing operations.",
  },
  {
    icon: BatteryCharging,
    title: "EV Forklifts",
    body: "Replacing diesel and LPG forklifts with electric units across our facilities, cutting Scope 1 fleet emissions and improving on-site air quality.",
  },
  {
    icon: Recycle,
    title: "Scrap (Waste Recycling)",
    body: "Recovering and recycling steel scrap and production waste back into the supply chain, reducing landfill and supporting a circular use of materials.",
  },
];

const highlights = [
  { icon: Sun, value: "25.4%", label: "Renewable (solar) energy of total electricity used" },
  { icon: Smile, value: "89%", label: "Customer satisfaction rating" },
  { icon: Gauge, value: "0.65", label: "kWh electricity per piece (target ≤ 1.0)" },
  { icon: Droplets, value: "3.673", label: "m³ water per 1,000 pieces (target ≤ 5.0)" },
  { icon: Recycle, value: "Zero", label: "Incidents of DOE non-compliance on waste" },
  { icon: LineChart, value: "7.1%", label: "Group revenue growth in FY2025" },
];

const targets = [
  {
    matter: "Customer Satisfaction",
    target: "Minimum 85% satisfaction rating annually",
    progress: "89% achieved in 2025",
    status: "Met",
  },
  {
    matter: "Energy — Renewable",
    target: "20% renewable energy usage by 2026",
    progress: "25.4% of total electricity in 2025",
    status: "Met",
  },
  {
    matter: "Waste Management",
    target: "Zero incidence of DOE non-compliance",
    progress: "No incidents recorded in 2025",
    status: "Met",
  },
  {
    matter: "Water Management",
    target: "≤ 5 m³ per 1,000 pieces manufactured",
    progress: "3.673 m³ per 1,000 pieces in 2025",
    status: "Met",
  },
  {
    matter: "Sustainable Procurement",
    target: "80% of Group purchases from local market",
    progress: "Increased to 58.2% in 2025",
    status: "In Progress",
  },
  {
    matter: "Revenue Growth",
    target: "Minimum 10% annual revenue growth",
    progress: "7.1% increase recorded in 2025",
    status: "In Progress",
  },
  {
    matter: "Employee Training",
    target: "16 training hours per employee annually",
    progress: "9.0 hours average per employee in 2025",
    status: "In Progress",
  },
  {
    matter: "Emissions",
    target: "Reduce Scope 1 fleet GHG by 10% by 2030 (vs 2024)",
    progress: "Establishing a reliable emissions baseline",
    status: "In Progress",
  },
];

const frameworks = [
  "Bursa Malaysia Sustainability Reporting Guide",
  "GRI Standards",
  "IFRS S1 & S2 (ISSB)",
];

function StatusPill({ status }: { status: string }) {
  const met = status === "Met";
  return (
    <span
      className={`inline-block font-raleway text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 whitespace-nowrap ${
        met ? "bg-[#ff8905]/15 text-[#b35f00]" : "bg-[#1A0F00]/8 text-[#5C4A30]"
      }`}
    >
      {status}
    </span>
  );
}

export default function SustainabilityPage() {
  return (
    <>
      {/* Top line */}
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Header */}
      <section className="site-container py-8 lg:py-10">
        <p className="font-raleway text-[11px] font-bold tracking-[0.2em] uppercase text-[#ff8905] mb-3">
          Sustainability
        </p>
        <h1 className="font-typewriter text-[clamp(1.8rem,3vw,3rem)] leading-tight text-[#1A0F00] mb-4">
          Building Responsibly,
          <br />
          for the Long Term.
        </h1>
        <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed max-w-[720px]">
          Sustainable development remains material to the business operations of United U-LI
          Corporation Berhad. We continue to review our approach and explore ways to improve our
          practices and performance across the economic, environmental and social dimensions of
          everything we make.
        </p>
      </section>

      {/* Divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Strategic objectives */}
      <section className="site-container py-12 lg:py-16">
        <h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.25rem)] leading-tight text-[#1A0F00] mb-10">
          Our Strategic Objectives.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {objectives.map((o) => (
            <div key={o.no} className="border-t-[3px] border-[#1A0F00] pt-5">
              <span className="font-typewriter text-[28px] text-[#ff8905] block mb-3">{o.no}</span>
              <h3 className="font-typewriter text-[20px] text-[#1A0F00] mb-2">{o.title}</h3>
              <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed">{o.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Four pillars */}
      <section className="site-container py-12 lg:py-16">
        <h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.25rem)] leading-tight text-[#1A0F00] mb-3">
          Four Pillars of Value Creation.
        </h2>
        <p className="font-raleway font-bold text-[17px] text-[#ff8905] mb-10 max-w-[680px]">
          Our material sustainability matters, grouped around the value we create for stakeholders.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex gap-5">
                <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-[#1A0F00]/20 bg-[#ff8905]/10">
                  <Icon size={24} strokeWidth={1.7} className="text-[#ff8905]" />
                </div>
                <div>
                  <h3 className="font-typewriter text-[20px] text-[#1A0F00] mb-2">{p.title}</h3>
                  <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed mb-3">
                    {p.body}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {p.topics.map((t) => (
                      <li
                        key={t}
                        className="font-raleway text-[12px] font-semibold text-[#5C4A30] border border-[#1A0F00]/15 px-2.5 py-1"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Environmental initiatives */}
      <section className="site-container py-12 lg:py-16">
        <h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.25rem)] leading-tight text-[#1A0F00] mb-3">
          Environmental Initiatives.
        </h2>
        <p className="font-raleway font-bold text-[17px] text-[#ff8905] mb-10 max-w-[680px]">
          Practical steps we are taking to lower the footprint of our operations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="border-t-[3px] border-[#1A0F00] pt-5">
                <div className="w-12 h-12 flex items-center justify-center border border-[#1A0F00]/20 bg-[#ff8905]/10 mb-4">
                  <Icon size={24} strokeWidth={1.7} className="text-[#ff8905]" />
                </div>
                <h3 className="font-typewriter text-[20px] text-[#1A0F00] mb-2">{item.title}</h3>
                <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* FY2025 highlights */}
      <section className="site-container py-12 lg:py-16">
        <h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.25rem)] leading-tight text-[#1A0F00] mb-3">
          FY2025 Performance Highlights.
        </h2>
        <p className="font-raleway font-bold text-[17px] text-[#ff8905] mb-10">
          Measurable progress across our operations.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div key={h.label} className="border-t-[3px] border-[#1A0F00] pt-4">
                <Icon size={22} strokeWidth={1.7} className="text-[#ff8905] mb-3" />
                <p className="font-typewriter text-[clamp(2rem,4vw,3rem)] leading-none text-[#1A0F00] mb-2">
                  {h.value}
                </p>
                <p className="font-raleway text-[14px] text-[#5C4A30] leading-snug">{h.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Material topics & targets table */}
      <section className="site-container py-12 lg:py-16">
        <h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.25rem)] leading-tight text-[#1A0F00] mb-3">
          Material Topics &amp; Targets.
        </h2>
        <p className="font-raleway font-bold text-[17px] text-[#ff8905] mb-10 max-w-[680px]">
          The performance targets we set ourselves, and how we tracked against them in 2025.
        </p>

        <div className="hidden md:block">
          <div className="grid grid-cols-[1.1fr_1.6fr_1.6fr_auto] gap-4 border-b-[3px] border-[#1A0F00] pb-3 mb-1">
            {["Material Matter", "Target", "FY2025 Progress", "Status"].map((c) => (
              <span
                key={c}
                className="font-raleway text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A0F00]"
              >
                {c}
              </span>
            ))}
          </div>
          {targets.map((t) => (
            <div
              key={t.matter}
              className="grid grid-cols-[1.1fr_1.6fr_1.6fr_auto] gap-4 items-start py-4 border-b border-[#1A0F00]/15"
            >
              <span className="font-raleway text-[15px] font-semibold text-[#1A0F00]">
                {t.matter}
              </span>
              <span className="font-raleway text-[14px] text-[#5C4A30] leading-snug">{t.target}</span>
              <span className="font-raleway text-[14px] text-[#5C4A30] leading-snug">
                {t.progress}
              </span>
              <StatusPill status={t.status} />
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-5">
          {targets.map((t) => (
            <div key={t.matter} className="border-t-[3px] border-[#1A0F00] pt-4">
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="font-raleway text-[16px] font-semibold text-[#1A0F00]">{t.matter}</h3>
                <StatusPill status={t.status} />
              </div>
              <p className="font-raleway text-[13px] text-[#5C4A30] mb-1">
                <span className="font-bold text-[#1A0F00]">Target: </span>
                {t.target}
              </p>
              <p className="font-raleway text-[13px] text-[#5C4A30]">
                <span className="font-bold text-[#1A0F00]">FY2025: </span>
                {t.progress}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Governance & reporting */}
      <section className="site-container py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h2 className="font-typewriter text-[clamp(1.4rem,2.2vw,2rem)] leading-tight text-[#1A0F00] mb-4">
              Sustainability Governance.
            </h2>
            <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed mb-4">
              Sustainability is championed from the top. The Board of Directors holds overall
              responsibility, supported by the Audit &amp; Risk Management Committee, with the Group
              Managing Director and an Executive Committee driving implementation across our
              corporate affairs, business units and human resources functions.
            </p>
            <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed">
              Material matters are reviewed annually with key management, informed by our risk
              register, stakeholder feedback at general meetings, customer surveys and publicly
              available information.
            </p>
          </div>
          <div>
            <h2 className="font-typewriter text-[clamp(1.4rem,2.2vw,2rem)] leading-tight text-[#1A0F00] mb-4">
              Reporting Frameworks.
            </h2>
            <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed mb-5">
              Our sustainability disclosures are prepared in accordance with established national and
              international standards, covering our manufacturing operations in Malaysia for the
              period 1 January to 31 December 2025.
            </p>
            <ul className="space-y-3">
              {frameworks.map((f) => (
                <li
                  key={f}
                  className="font-raleway text-[15px] font-semibold text-[#1A0F00] border-l-[3px] border-[#ff8905] pl-4 py-1"
                >
                  {f}
                </li>
              ))}
            </ul>
            <p className="font-raleway text-[13px] text-[#5C4A30] leading-relaxed mt-6">
              Sustainability feedback may be directed to En. Mohd Haniff Hashim at{" "}
              <a
                href="mailto:haniff@uli.com.my"
                className="text-[#ff8905] font-semibold hover:underline"
              >
                haniff@uli.com.my
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
