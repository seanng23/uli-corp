import TechHero from "@/components/sections/TechHero";
import TechCapabilities from "@/components/sections/TechCapabilities";
import TechInnovation from "@/components/sections/TechInnovation";
import CTASection from "@/components/sections/CTASection";
import Divider from "@/components/Divider";
import { getSiteSettings, getHero } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology & Innovation | U-LI Corporation",
  description:
    "Discover U-LI's integrated manufacturing capabilities — from coil handling and CNC punching to robotic welding and hot dip galvanizing.",
};

export default async function TechnologyPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <TechHero media={getHero(settings, "technology")} />
      <TechCapabilities />
      <Divider variant="thin" />
      <TechInnovation />
      <Divider variant="double" />
      <CTASection />
    </>
  );
}
