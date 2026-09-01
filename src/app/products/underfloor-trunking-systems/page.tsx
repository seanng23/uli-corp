import type { Metadata } from "next";
import UnderfloorSceneClient from "@/components/products/UnderfloorSceneClient";

export const metadata: Metadata = {
  title: "Underfloor Trunking Systems",
  description:
    "U-LI Underfloor Trunking Systems: uPVC ducts, galvanized steel underfloor trunking, junction boxes, service boxes, vertical access boxes and accessories for power and data distribution across screed floors and concrete slabs.",
  alternates: { canonical: "/products/underfloor-trunking-systems" },
};

export default function UnderfloorTrunkingSystemsPage() {
  return <UnderfloorSceneClient />;
}
