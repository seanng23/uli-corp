import ManufacturingHero from "@/components/sections/ManufacturingHero";
import ManufacturingLocations from "@/components/sections/ManufacturingLocations";
import ManufacturingScale from "@/components/sections/ManufacturingScale";
import ManufacturingCapabilities from "@/components/sections/ManufacturingCapabilities";
import CTASection from "@/components/sections/CTASection";
import Divider from "@/components/Divider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Facilities | U-LI Corporation",
  description:
    "Made in Malaysia, built for the region — U-LI's five integrated manufacturing sites process approximately 40,000 MT of steel annually across rolling, punching, powder coating, and galvanizing.",
};

export default function ManufacturingPage() {
  return (
    <>
      <ManufacturingHero />
      <Divider variant="thick" />
      <ManufacturingLocations />
      <Divider variant="thick" />
      <ManufacturingScale />
      <Divider variant="thick" />
      <ManufacturingCapabilities />
      <Divider variant="double" />
      <CTASection />
    </>
  );
}
