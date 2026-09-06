import ContactInfo from "@/components/sections/ContactInfo";
import ContactLocations from "@/components/sections/ContactLocations";
import ContactForm from "@/components/sections/ContactForm";
import { getSiteSettings } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import RevealRule from "@/components/motion/RevealRule";
import Typewriter from "@/components/motion/Typewriter";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with United U-LI Corporation Berhad. Reach our sales, technical support, HR, and investor relations teams.",
};

function Divider({ src, delay = 0 }: { src: string; delay?: number }) {
  return (
    <div className="site-container">
      <RevealRule src={src} className="w-full block" delay={delay} />
    </div>
  );
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Page header: same single-line / title / double-line frame as the other section pages */}
      <Divider src="/images/single-line.png" />
      <div className="site-container">
        <div className="grid grid-cols-[40px_1fr_40px] lg:grid-cols-[80px_1fr_80px] items-center py-10">
          <div />
          <h1 className="font-typewriter uppercase text-center text-[clamp(2rem,4.5vw,5rem)] leading-[1.0] text-[#1A0F00] tracking-tight px-4">
            <Typewriter text="Contact Us" startDelay={0.35} />
          </h1>
          <div />
        </div>
      </div>
      <Divider src="/images/double-line.png" delay={0.45} />

      {/* 1. Form first: the reason most visitors land here */}
      <ContactForm />
      <Divider src="/images/single-line.png" />

      {/* 2. Where we are */}
      <ContactLocations locations={settings?.locations} />
      <Divider src="/images/single-line.png" />

      {/* 3. Head office and department directory */}
      <ContactInfo />
    </>
  );
}
