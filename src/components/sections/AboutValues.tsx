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

export default function AboutValues() {
  return (
    <section className="site-container py-16">
      <FadeUp className="text-center mb-10">
        <h2 className="font-typewriter text-[clamp(1.75rem,4.5vw,2.875rem)] leading-[1.05] text-[#1A0F00]">
          What We Stand For
        </h2>
      </FadeUp>
      <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 border-[4px] border-[#1A0F00]">
        {values.map((v, i) => (
          <StaggerItem
            key={v.title}
            className={`flex flex-col items-center text-center p-8 ${i !== 0 ? "border-l-[4px] border-[#1A0F00]" : ""}`}
          >
            <div className="relative w-20 h-20 mb-5">
              <Image
                src={v.icon}
                alt={v.title}
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>
            <h3 className="font-typewriter text-[22px] text-[#1A0F00] mb-3">{v.title}</h3>
            <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed">{v.body}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
