import type { Metadata } from "next";
import CableLadderClient from "@/components/products/CableLadderClient";

export const metadata: Metadata = {
  title: "Cable Ladder",
  description:
    "U-LI steel cable ladders in LZ, LN, LG, LC and L6N profiles — certified to IEC 61537 and NEMA VE1, preferred lengths 3.0m / 3.7m, widths up to 1000mm.",
  alternates: { canonical: "/products/cable-ladder" },
};

export default function CableLadderPage() {
  return <CableLadderClient />;
}
