import type { Metadata } from "next";
import CableTrayClient from "@/components/products/CableTrayClient";

export const metadata: Metadata = {
  title: "Cable Tray",
  description:
    "U-LI steel cable trays in TU, TT, TC and TR profiles — certified to MS IEC 61537, preferred lengths 2.44m / 3.0m, widths up to 1000mm.",
  alternates: { canonical: "/products/cable-tray" },
};

export default function CableTrayPage() {
  return <CableTrayClient />;
}
