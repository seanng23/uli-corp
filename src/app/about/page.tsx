import AboutHero from "@/components/sections/AboutHero";
import AboutSplit from "@/components/sections/AboutSplit";
import StatsBand from "@/components/sections/StatsBand";
import AboutLegacy from "@/components/sections/AboutLegacy";
import AboutVision from "@/components/sections/AboutVision";
import AboutValues from "@/components/sections/AboutValues";
import AboutImpact from "@/components/sections/AboutImpact";
import CTASection from "@/components/sections/CTASection";
import Divider from "@/components/Divider";
import { getSiteSettings, getSectionImage } from "@/sanity/lib/queries";

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <AboutHero />
      <AboutSplit
        workerMedia={getSectionImage(settings, "about-split-worker")}
        trayMedia={getSectionImage(settings, "about-split-tray")}
        factoryMedia={getSectionImage(settings, "about-split-factory")}
      />
      <Divider variant="thin" />
      <StatsBand />
      <Divider variant="thin" />
      <AboutLegacy media={getSectionImage(settings, "about-legacy")} />
      <Divider variant="thin" />
      <AboutVision />
      <Divider variant="thin" />
      <AboutValues />
      <Divider variant="thin" />
      <AboutImpact />
      <Divider variant="double" />
      <CTASection />
    </>
  );
}
