// Interactive installation scene for the Underfloor Trunking Systems page.
// Two photo-rendered variants (GI metal trunking / uPVC duct) with numbered
// hotspots; each hotspot opens a component info panel on the right.

import { UNDERFLOOR } from "./floor-trunking";

export type SceneInfo = {
  code: string;
  name: string;
  description: string;
  specs?: string[];
  image: string;
  section: string;
  enquire: boolean;
  linkHref?: string;
  linkLabel?: string;
};

export type SceneHotspot = {
  /** Percentage coordinates on the rendered scene image. */
  x: number;
  y: number;
  infoKey: string;
  /** Short label shown on hover and in the legend. */
  label: string;
};

export type SceneVariant = {
  key: "gi" | "upvc";
  label: string;
  sublabel: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  hotspots: SceneHotspot[];
  /** Info keys for components of this system that the drawing does not show. */
  extras: string[];
};

const UF = "/images/products/floor-trunking/underfloor/";

function family(code: string): { code: string; name: string; description: string; specs?: string[]; image: string; section: string } {
  for (const tab of UNDERFLOOR.tabs) {
    const match = tab.families.find((f) => f.code === code);
    if (match) return { ...match, section: tab.label };
  }
  throw new Error(`Unknown underfloor family: ${code}`);
}

export const SCENE_INFO: Record<string, SceneInfo> = {
  "metal-trunking": { ...family("UL-UTX"), enquire: true },
  "upvc-duct": { ...family("UFDL / UFDH"), enquire: true },
  "junction-box": { ...family("UL-UJX"), enquire: true },
  "service-box": { ...family("UL-USX"), enquire: true },
  "vertical-access-box": { ...family("UL-UVX"), enquire: true },
  "service-box-boxtype": { ...family("UL-USBTH"), enquire: true },
  "vab-slanting": { ...family("UL-UVSX"), enquire: true },
  "trunking-joint": { ...family("UL-UTJX"), enquire: true },
  "ohm-bracket": { ...family("UL-UOHMX"), enquire: true },
  "trunking-end-cap": {
    code: "UL-UTECL",
    name: "UF Trunking End Cap",
    description:
      "Closes off the open end of an underfloor trunking run before screeding, keeping concrete and debris out of the compartments.",
    specs: ["Available to suit trunking widths 50 to 350 mm"],
    image: UF + "uft-end-cap-v1.png",
    section: "Accessories",
    enquire: true,
  },
  "duct-end-cap": {
    code: "UL-UDECL",
    name: "uPVC Duct End Cap",
    description:
      "Closes off the open end of a uPVC duct run before screeding, keeping concrete and debris out of the duct.",
    specs: ["Available to suit duct widths 50 / 75 / 100 mm"],
    image: UF + "uft-duct-end-cap-v1.png",
    section: "Accessories",
    enquire: true,
  },
  "leveling-bar": {
    code: "Leveling Bar",
    name: "Leveling Bar",
    description:
      "Steel bar set beneath the trunking run to keep it flat and level on an uneven slab before screeding. Supplied to suit the trunking width. Junction and service boxes are levelled separately with M8 leveling screws (ULLS38 to ULLS95).",
    image: UF + "uft-leveling-bar-v1.png",
    section: "Accessories",
    enquire: true,
  },
  "surface-trunking": {
    code: "50H Surface Trunking",
    name: "Surface Trunking Riser",
    description:
      "The vertical access box rises into U-LI 50H surface trunking, carrying final sub-circuits up the wall to the distribution board. Surface trunking is part of the U-LI Cable Support Systems range.",
    image: "/images/products/cable-trunking-v5.png",
    section: "Related System",
    enquire: false,
    linkHref: "/products/cable-trunking",
    linkLabel: "View Cable Trunking →",
  },
};

// Hotspot positions are percentages on each scene drawing.
export const SCENE_VARIANTS: SceneVariant[] = [
  {
    key: "gi",
    label: "GI Metal Trunking",
    sublabel: "Pre-galvanized steel",
    image: UF + "scene-gi-line-v1.png",
    imageWidth: 2008,
    imageHeight: 1287,
    hotspots: [
      { x: 49, y: 53, infoKey: "junction-box", label: "Junction Box" },
      { x: 66, y: 37, infoKey: "metal-trunking", label: "Metal Trunking" },
      { x: 17, y: 25, infoKey: "service-box", label: "Service Box" },
      { x: 81, y: 86, infoKey: "service-box", label: "Service Box, 1 Compartment" },
      { x: 84, y: 17, infoKey: "vertical-access-box", label: "Vertical Access Box" },
      { x: 27, y: 75, infoKey: "trunking-joint", label: "Trunking Joint" },
      { x: 15, y: 85, infoKey: "trunking-end-cap", label: "Trunking End Cap" },
      { x: 73, y: 45, infoKey: "leveling-bar", label: "Leveling Bar" },
      { x: 87, y: 7, infoKey: "surface-trunking", label: "50H Surface Trunking" },
    ],
    extras: ["service-box-boxtype", "vab-slanting", "ohm-bracket"],
  },
  {
    key: "upvc",
    label: "uPVC Duct",
    sublabel: "Heavy gauge uPVC",
    image: UF + "scene-upvc-line-v1.png",
    imageWidth: 2472,
    imageHeight: 1369,
    hotspots: [
      { x: 48, y: 56, infoKey: "junction-box", label: "Junction Box" },
      { x: 63, y: 33, infoKey: "upvc-duct", label: "uPVC Duct" },
      { x: 21, y: 29, infoKey: "service-box", label: "Service Box" },
      { x: 79, y: 88, infoKey: "service-box", label: "Service Box, 1 Compartment" },
      { x: 79, y: 19, infoKey: "vertical-access-box", label: "Vertical Access Box" },
      { x: 34, y: 76, infoKey: "ohm-bracket", label: "OHM Bracket" },
      { x: 15, y: 88, infoKey: "duct-end-cap", label: "Duct End Cap" },
      { x: 80, y: 12, infoKey: "surface-trunking", label: "50H Surface Trunking" },
    ],
    extras: ["service-box-boxtype", "vab-slanting"],
  },
];
