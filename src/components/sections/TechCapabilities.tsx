import Image from "next/image";
import FadeUp from "@/components/motion/FadeUp";

const capabilities = [
  {
    title: "Coil Handling",
    description:
      "U-LI operates an in-house coil processing line that allows us to slit and cut mother coils precisely before downstream production. This minimizes waste and ensures consistent input quality.",
    image: "/images/technology/DSC09898.jpg",
    alt: "U-LI coil handling line",
  },
  {
    title: "Slitting",
    description:
      "Our slitting lines convert wide mother coils into narrower steel strips with tight tolerances and consistent edge quality. This ensures stable feed into roll forming and punching processes, reducing material stress and improving dimensional accuracy across all finished products.",
    image: "/images/technology/DSC-1.jpg",
    alt: "U-LI slitting machine",
  },
  {
    title: "Shearing",
    description:
      "U-LI's shearing machines provide straight, burr-free cuts on steel sheets and strips. Accurate shearing improves part alignment during fabrication and ensures each component maintains its intended strength and structural performance.",
    image: "/images/technology/DSC-2.jpg",
    alt: "U-LI shearing operation",
  },
  {
    title: "Roll Forming",
    description:
      "Our customised roll formers produce a wide range of channel profiles with consistent thickness and tolerances. Each machine is maintained on a strict schedule to deliver precision.",
    image: "/images/technology/DSC-3.jpg",
    alt: "U-LI roll forming machine",
  },
  {
    title: "CNC Turret Punching",
    description:
      "We use multiple CNC turret punch machines for perforated trays, ladders, and accessory components. These machines deliver repeatable and complex patterns with speed.",
    image: "/images/technology/DSC-4.jpg",
    alt: "U-LI CNC turret punch",
  },
  {
    title: "Laser Cutting",
    description:
      "For non-linear shapes or custom designs, our laser cutting systems are guided via CNC control, enabling high-accuracy cuts across steel plates. These machines support design flexibility without sacrificing speed.",
    image: "/images/technology/DSC-5.jpg",
    alt: "U-LI laser cutting machine",
  },
  {
    title: "Robotic Welding & Automation",
    description:
      "Industrial robots have been deployed since 2003 to perform welding tasks with repeatability. Automation improves throughput, consistency, and reduces manual error in critical joints.",
    image: "/images/technology/DSC-6.jpg",
    alt: "U-LI robotic welding arm",
  },
  {
    title: "Powder Coating Manufacturing",
    description:
      "Our in-house powder coating operations ensure consistent colour, thickness, and adhesion across all finished products. By managing the coating process internally, we maintain better quality control, faster turnaround times, and improved durability in both indoor and outdoor environments.",
    image: "/images/technology/DSC-7.jpg",
    alt: "U-LI powder coating line",
  },
  {
    title: "Continuous Powder Spray Line",
    description:
      "Our automated continuous powder coating line is one of the most advanced in Malaysia. It enables high output with uniform finish and optimal adhesion across large runs.",
    image: "/images/technology/DSC-8.png",
    alt: "U-LI continuous powder spray line",
  },
  {
    title: "Hot Dip Galvanizing",
    description:
      "Our Nilai facility houses a hot dip galvanizing line that produces lead-free zinc coatings meeting EN ISO 1461 and ASTM A123 standards. This gives products long-term protection in harsh environments.",
    image: "/images/technology/DSC-9.png",
    alt: "U-LI hot dip galvanizing",
  },
];

export default function TechCapabilities() {
  return (
    <div>
      {capabilities.map((cap, i) => {
        const isImageLeft = i % 2 === 0;
        return (
          <section key={cap.title} className="site-container py-8 lg:py-9">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 items-center">
              {isImageLeft ? (
                <>
                  {/* Image — left on desktop, top on mobile */}
                  <FadeUp className="relative h-[360px] lg:h-[440px]">
                    <Image
                      src={cap.image}
                      alt={cap.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </FadeUp>

                  {/* Text — right */}
                  <FadeUp delay={0.1} className="pt-8 lg:pt-0">
                    <img
                      src="/images/technology/Group-2571.png"
                      alt=""
                      aria-hidden="true"
                      className="w-[190px] h-auto mb-5 object-contain"
                    />
                    <h2 className="font-typewriter text-[clamp(1.75rem,3.5vw,2.875rem)] leading-[1.05] text-[#1A0F00] mb-5">
                      {cap.title}
                    </h2>
                    <img
                      src="/images/lines/line-thin.png"
                      alt=""
                      aria-hidden="true"
                      className="w-full h-[4px] object-fill block mb-6"
                    />
                    <p className="font-raleway text-[17px] text-[#1A0F00] leading-relaxed">
                      {cap.description}
                    </p>
                  </FadeUp>
                </>
              ) : (
                <>
                  {/* Text — left on desktop, bottom on mobile */}
                  <FadeUp delay={0.1} className="pt-8 lg:pt-0 order-2 lg:order-1">
                    <img
                      src="/images/technology/Group-2572.png"
                      alt=""
                      aria-hidden="true"
                      className="w-[190px] h-auto mb-5 object-contain block ml-auto"
                    />
                    <h2 className="font-typewriter text-[clamp(1.75rem,3.5vw,2.875rem)] leading-[1.05] text-[#1A0F00] mb-5">
                      {cap.title}
                    </h2>
                    <img
                      src="/images/lines/line-thin.png"
                      alt=""
                      aria-hidden="true"
                      className="w-full h-[4px] object-fill block mb-6"
                    />
                    <p className="font-raleway text-[17px] text-[#1A0F00] leading-relaxed">
                      {cap.description}
                    </p>
                  </FadeUp>

                  {/* Image — right on desktop, top on mobile */}
                  <FadeUp className="relative h-[360px] lg:h-[440px] order-1 lg:order-2">
                    <Image
                      src={cap.image}
                      alt={cap.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </FadeUp>
                </>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
