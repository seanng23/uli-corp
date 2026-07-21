import { Suspense } from "react";
import ProjectsHero from "@/components/sections/ProjectsHero";
import ProjectsTabs from "@/components/sections/ProjectsTabs";
import CTASection from "@/components/sections/CTASection";
import Divider from "@/components/Divider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore U-LI's portfolio of projects across commercial, industrial, infrastructure, and energy sectors — delivered locally and internationally.",
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <Suspense fallback={null}>
        <ProjectsTabs />
      </Suspense>
      <Divider />
      <CTASection />
    </>
  );
}
