import type { Metadata } from "next";
import SteelConduitClient from "@/components/products/SteelConduitClient";

export const metadata: Metadata = {
  title: "Steel Conduit",
  description:
    "U-LI electrical steel conduits - conduit systems for cable management certified to MS IEC 61386-1 / MS 61386-21 (Class 3 and Class 4) and steel conduit for electrical wiring certified to BS 31 : 1940. Supplied in 3.81m threaded lengths.",
  alternates: { canonical: "/products/steel-conduit" },
};

export default function SteelConduitPage() {
  return <SteelConduitClient />;
}
