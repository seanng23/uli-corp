import type { Metadata } from "next";
import FloorSceneClient from "@/components/products/FloorSceneClient";

export const metadata: Metadata = {
  title: "Flushfloor Trunking Systems",
  description:
    "U-LI Flushfloor Trunking Systems: main and sub trunking flush to the finished floor, with junction boxes, service boxes, reducers, end caps, joints and vertical access risers in galvanized steel.",
  alternates: { canonical: "/products/flushfloor-trunking-systems" },
};

export default function FlushfloorTrunkingSystemsPage() {
  return <FloorSceneClient sceneKey="flushfloor" />;
}
