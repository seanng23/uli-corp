import QualityHero from "@/components/sections/QualityHero";
import QualityControls from "@/components/sections/QualityControls";
import QualityCertified from "@/components/sections/QualityCertified";
import QualityStats from "@/components/sections/QualityStats";
import QualityBuild from "@/components/sections/QualityBuild";
import CTASection from "@/components/sections/CTASection";
import Divider from "@/components/Divider";
import { getSiteSettings, getSectionImage } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quality Assurance",
  description:
    "U-LI's commitment to quality — ISO 9001:2015 certified, SIRIM tested, with stringent quality controls across every stage of production.",
};

export default async function QualityAssurancePage() {
  const settings = await getSiteSettings();

  return (
    <>
      <QualityHero />
      <QualityControls media={getSectionImage(settings, "quality-controls")} />
      <QualityCertified fieldMedia={getSectionImage(settings, "quality-field")} />
      <QualityStats />
      <QualityBuild />
      <Divider />
      <CTASection />
    </>
  );
}
