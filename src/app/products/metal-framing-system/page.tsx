import type { Metadata } from "next";
import MetalFramingClient from "@/components/products/MetalFramingClient";

export const metadata: Metadata = {
  title: "Metal Framing System",
  description:
    "U-LI UliStrut metal framing system: UL1000 and UL3300 series slotted strut channels, combinations, pierced channels and stainless steel variants, with a full range of general fittings. Designed to BS 5950 Part 5.",
  alternates: { canonical: "/products/metal-framing-system" },
};

export default function MetalFramingSystemPage() {
  return <MetalFramingClient />;
}
