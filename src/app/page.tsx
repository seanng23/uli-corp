import Hero from "@/components/sections/Hero";
import AboutBand from "@/components/sections/AboutBand";
import StatsBand from "@/components/sections/StatsBand";
import LegacySplit from "@/components/sections/LegacySplit";
import ClientsGrid from "@/components/sections/ClientsGrid";
import IndustriesSection from "@/components/sections/IndustriesSection";
import InsightsSection from "@/components/sections/InsightsSection";
import CTASection from "@/components/sections/CTASection";
import Divider from "@/components/Divider";
import { getSiteSettings, getHero, getSectionImage } from "@/sanity/lib/queries";

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Hero media={getHero(settings, "home")} />
      <AboutBand />
      <Divider variant="thin" />
      <StatsBand />
      <Divider variant="thin" />
      <LegacySplit media={getSectionImage(settings, "home-legacy")} />
      <Divider variant="thin" />
      <ClientsGrid />
      <Divider variant="double" />
      <IndustriesSection
        internationalMedia={getSectionImage(settings, "home-projects-international")}
        localMedia={getSectionImage(settings, "home-projects-local")}
      />
      <Divider variant="thick" />
      <InsightsSection />
      <Divider variant="double" />
      <CTASection />
    </>
  );
}
