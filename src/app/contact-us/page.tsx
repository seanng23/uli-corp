import ContactInfo from "@/components/sections/ContactInfo";
import ContactLocations from "@/components/sections/ContactLocations";
import ContactForm from "@/components/sections/ContactForm";
import { getSiteSettings } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with United U-LI Corporation Berhad. Reach our sales, technical support, HR, and investor relations teams.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <ContactInfo />
      <ContactLocations locations={settings?.locations} />
      <ContactForm />
    </>
  );
}
