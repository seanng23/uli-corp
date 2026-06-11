import Image from "next/image";
import FadeUp from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const values = [
  {
    icon: "/images/about/Mask-Group-43.png",
    title: "Integrity",
    body: "We operate with transparency and fairness",
  },
  {
    icon: "/images/about/Mask-Group-44.png",
    title: "Innovation",
    body: "We improve continuously and embrace change",
  },
  {
    icon: "/images/about/Mask-Group-45.png",
    title: "Excellence",
    body: "We operate with transparency and fairness",
  },
  {
    icon: "/images/about/Mask-Group-46.png",
    title: "Responsibility",
    body: "We operate with transparency and fairness",
  },
];

const V_LINE = "/images/lines/line-thin-vertical.png";

// Vertical rules span the full frame height so they overlap the top/bottom
// rules at the corners (no gaps).
function VRule({ pos }: { pos: string }) {
  return (
    <img
      src={V_LINE}
      alt=""
      aria-hidden="true"
      className={`hidden lg:block absolute top-[5px] h-[calc(100%-10px)] w-[4px] object-fill ${pos}`}
    />
  );
}

export default function AboutValues() {
  return (
    <section className="site-container py-16">
      <FadeUp className="text-center mb-10">
        <h2 className="font-typewriter text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[#1A0F00]">
          What We Stand For
        </h2>
      </FadeUp>

      <div className="relative">
        {/* Top rule */}
        <img src="/images/lines/line-thin.png" alt="" aria-hidden="true" className="block w-full h-auto" />

        <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <StaggerItem key={v.title} className="flex flex-col items-center text-center p-8">
              <div className="relative w-24 h-24 lg:w-32 lg:h-32 mb-6">
                <Image src={v.icon} alt={v.title} fill className="object-contain" sizes="128px" />
              </div>
              <h3 className="font-typewriter text-[28px] lg:text-[36px] text-[#1A0F00] mb-3">{v.title}</h3>
              <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed">{v.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Bottom rule */}
        <img src="/images/lines/line-thin.png" alt="" aria-hidden="true" className="block w-full h-auto" />

        {/* Vertical rules at the column boundaries, full frame height */}
        <VRule pos="left-0" />
        <VRule pos="left-[calc(25%-2px)]" />
        <VRule pos="left-[calc(50%-2px)]" />
        <VRule pos="left-[calc(75%-2px)]" />
        <VRule pos="right-0" />
      </div>
    </section>
  );
}
