import type { Metadata } from "next";
import WireCableTrayClient from "@/components/products/WireCableTrayClient";

export const metadata: Metadata = {
  title: "Wire Cable Tray",
  description:
    "U-LI FWB wire cable trays - open wire-mesh cable routing with proper ventilation, load tested to DIN EN IEC 61537. Heights 25-150mm, widths 60-600mm, with matching FWB covers. Custom sizes upon request.",
  alternates: { canonical: "/products/wire-cable-tray" },
};

export default function WireCableTrayPage() {
  return <WireCableTrayClient />;
}
