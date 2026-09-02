import type { Metadata } from "next";
import FloorSceneClient from "@/components/products/FloorSceneClient";

export const metadata: Metadata = {
  title: "Raisedfloor Trunking Systems",
  description:
    "U-LI Raisedfloor Trunking Systems: trunking, junction boxes, service boxes, header boxes, tap-off units, pedestal boxes and vertical access boxes for cable distribution beneath 600 x 600 mm raised access floor panels.",
  alternates: { canonical: "/products/raisedfloor-trunking-systems" },
};

export default function RaisedfloorTrunkingSystemsPage() {
  return <FloorSceneClient sceneKey="raisedfloor" />;
}
