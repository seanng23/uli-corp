// Interactive Raisedfloor Trunking Systems page: clickable installation drawing
// with a per-component configurator. Sizes from the catalogue (Ver 001/2026) sections 1.0 to 5.0.
import { RAISEDFLOOR } from "./floor-trunking";
import { COMPARTMENTS, STANDARD, type AccessoryCard, type ComponentDef, type FloorScene, type SceneVariant } from "./floor-scene";

const RF = "/images/products/floor-trunking/raisedfloor/";
const UF = "/images/products/floor-trunking/underfloor/";

const HEIGHTS = ["25", "40", "50", "75", "100"];
const WIDTHS = ["100", "150", "200", "300", "400", "450", "500"];
const BOX_SIZES = ["100 × 100", "150 × 150", "200 × 200", "300 × 300", "400 × 400", "450 × 450", "500 × 500"];

const compartmentSuffix = (v: Record<string, string>) => (v.compartments === "1" ? "-1c" : v.compartments === "2" ? "-2c" : "");

export const RAISEDFLOOR_COMPONENTS: Record<string, ComponentDef> = {
  trunking: {
    key: "trunking",
    name: "Raisedfloor Trunking",
    code: "UL-RTH",
    description:
      "Box trunking laid between the pedestals beneath 600 × 600 mm raised access floor panels. Covers run in equal 1220 mm sections with pre-punched ø20 or ø25 mm holes, so flexible conduits terminate through adapters without cutting.",
    image: RF + "rft-trunking-v1.png",
    imageFor: (v) => RF + `rft-trunking${compartmentSuffix(v)}-v1.png`,
    enquire: true,
    fields: [
      COMPARTMENTS,
      { type: "combo", key: "height", label: "Height H (mm)", options: HEIGHTS, default: "40" },
      { type: "combo", key: "width", label: "Width (mm)", options: WIDTHS, default: "300" },
      { type: "combo", key: "length", label: "Length (mm)", options: ["2440"], default: "2440" },
      { type: "static", label: "Cover", value: "1220 mm sections, pre-punched ø20 / ø25 mm" },
      { type: "chips", key: "finishing", label: "Finishing", options: ["Pre-galvanised Steel", "Epoxy Powder Coated", "Others / Custom"], default: "Pre-galvanised Steel" },
      STANDARD,
    ],
  },
  "junction-box": {
    key: "junction-box",
    name: "Raisedfloor Junction Box",
    code: "UL-RJH",
    description:
      "Connects raisedfloor trunking runs beneath the access floor. Cross, tee and elbow bodies share the same footprint, with a lift-off cover and side flanges that bolt to the adjoining trunking.",
    image: RF + "rft-junction-box-v1.png",
    imageFor: (v) => RF + (v.junctionType.startsWith("T") ? "rft-junction-box-t-v1.png" : v.junctionType.startsWith("L") ? "rft-junction-box-l-v1.png" : "rft-junction-box-v1.png"),
    enquire: true,
    fields: [
      { type: "chips", key: "junctionType", label: "Type", options: ["X — Cross", "T — Tee", "L — Elbow"], default: "X — Cross" },
      { type: "select", key: "size", label: "Size (mm)", options: BOX_SIZES, default: "300 × 300" },
      COMPARTMENTS,
      { type: "combo", key: "height", label: "Height H (mm)", options: HEIGHTS, default: "40" },
      STANDARD,
    ],
  },
  "service-box": {
    key: "service-box",
    name: "Raisedfloor Service Box",
    code: "UL-RSH",
    description:
      "Service outlet box set into the raised floor panel, fed from the header box or tap-off unit through flexible conduit. Because it sits in the panel rather than the slab, it relocates with the workstation layout.",
    image: RF + "rft-service-box-v1.png",
    enquire: true,
    fields: [
      { type: "select", key: "size", label: "Size (mm)", options: ["125 × 125 (1C)", "150 × 150 (1C)", "125 × 250 (1C)", "150 × 300 (1C)", "250 × 250 (2C or 3C)", "270 × 270 (2C or 3C)", "315 × 210 STD (2C to 4C)", "300 × 300 (2C to 4C)"], default: "270 × 270 (2C or 3C)" },
      { type: "chips", key: "compartments", label: "Compartments", options: ["1", "2", "3", "4"], default: "3" },
      { type: "combo", key: "height", label: "Height H (mm)", options: ["75", "80", "100"], default: "80" },
      { type: "chips", key: "finish", label: "Cover & Frame", options: ["GI/Grey Metal Cover & Frame (CTF)", "Stainless Steel Cover & Frame (CTF)"], default: "GI/Grey Metal Cover & Frame (CTF)" },
      STANDARD,
    ],
  },
  vab: {
    key: "vab",
    name: "Raisedfloor Vertical Access Box",
    code: "UL-RVH",
    codeFor: (v) => (v.vabType === "Slanting" ? "UL-RVSH" : "UL-RVH"),
    description:
      "Manages all final sub-circuits returning to the distribution board, turning the raisedfloor trunking up into wall or surface trunking. Available with a 90° riser (UL-RVH) or a slanting riser (UL-RVSH); standard riser is 50H surface trunking.",
    image: RF + "rft-vab-slanting-v1.png",
    imageFor: (v) => RF + `rft-vab${v.vabType === "Slanting" ? "-slanting" : ""}${compartmentSuffix(v)}-v1.png`,
    enquire: true,
    fields: [
      { type: "chips", key: "vabType", label: "Type", options: ["Straight (90°)", "Slanting"], default: "Slanting" },
      COMPARTMENTS,
      { type: "combo", key: "width", label: "Width (mm)", options: WIDTHS, default: "300" },
      { type: "combo", key: "height", label: "Trunking Height H (mm)", options: HEIGHTS, default: "40" },
      { type: "static", label: "Riser", value: "50H surface trunking (standard)" },
      STANDARD,
    ],
  },
};

export const RAISEDFLOOR_VARIANTS: SceneVariant[] = [
  {
    key: "rf",
    label: "Raisedfloor Trunking",
    sublabel: "Pre-galvanised steel",
    caption: "Typical raisedfloor installation.",
    image: RF + "rft-typical-v1.png",
    imageWidth: 2703,
    imageHeight: 1816,
    hotspots: [
      { x: 35.5, y: 86, componentKey: "trunking", label: "Raisedfloor Trunking" },
      { x: 49, y: 68, componentKey: "junction-box", label: "Raisedfloor Junction Box" },
      { x: 25, y: 41.7, componentKey: "service-box", label: "Raisedfloor Service Box" },
      { x: 63.5, y: 26.8, componentKey: "service-box", label: "Raisedfloor Service Box" },
      { x: 10, y: 35.7, componentKey: "vab", label: "Vertical Access Box" },
    ],
  },
];

/** Catalogue section 5.0 Raisedfloor Accessories: generic reference cards, not configured on the drawing. */
export const RAISEDFLOOR_ACCESSORIES: AccessoryCard[] = [
  {
    name: "Raisedfloor Headed Box",
    code: "UL-RHBH-[Size]",
    image: RF + "rft-headed-box-v1.png",
    description: "Installed at the top of the raisedfloor trunking run, where the final sub-circuits leave for the service boxes through flexible conduit. Knock-outs on every side take the conduit adapters.",
    specs: ["Sizes: 150, 200, 300, 350, 400, 450, 500 mm square", "Heights: 25 / 40 / 50 / 75 / 100 mm"],
  },
  {
    name: "Raisedfloor Tap Off Unit",
    code: "UL-RTOUH-[Size]",
    image: RF + "rft-tap-off-v1.png",
    description: "Through or termination box for conduit branch-outs, supplied as a body and a separate cover.",
    specs: ["Sizes: 150, 200, 300, 350, 400, 450, 500 mm square", "Heights: 40 / 50 / 75 / 100 / 150 mm"],
  },
  {
    name: "Raisedfloor Trunking Joint",
    code: "UL-RTJ[H]",
    image: RF + "rft-joint-v1.png",
    description: "Side coupling plates that bolt two raisedfloor trunking lengths together end to end. One set of two plates per joint.",
    specs: ["Heights: 25 / 40 / 50 / 75 / 100 mm", "1 set = 2 pcs"],
  },
  {
    name: "Raisedfloor Tap Pedestal Box",
    code: "UL-RPB-[Gang]",
    image: RF + "rft-pedestal-box-v1.png",
    description: "Surface-mounted pedestal box that stands on the raised floor panel and carries the switch socket outlets, fed from the trunking below through flexible conduit.",
    specs: ["1G / 2G / DG (double gang) / 3G / 4G / 8G"],
  },
  {
    name: "RF Trunking End Cap",
    code: "UL-RTECH-[W]",
    image: RF + "rft-end-cap-v1.png",
    description: "Closes off the open end of a raisedfloor trunking run so cables stay inside the compartments.",
    specs: ["Heights: 25 / 40 / 50 / 75 / 100 mm", "Widths: 100, 150, 200, 300, 400, 450, 500 mm"],
  },
  {
    name: "Levelling Bar",
    code: "Levelling Bar",
    image: UF + "uft-leveling-bar-v1.png",
    description: "Steel bar set beneath the trunking joint to keep adjoining lengths flat and level between the pedestals.",
    specs: ["Supplied to suit the trunking width"],
  },
  {
    name: "Surface Metal Box",
    code: "UL-MBH-[Size] / UL-MBH-[Size]/h",
    image: RF + "rft-surface-metal-box-v1.png",
    description: "Surface-mounted metal box for outlets and connections above the access floor, plain or with pre-punched holes (/h).",
    specs: ["Sizes: 100 × 100, 150 × 150, 75 × 100, 100 × 150, 100 × 200, 200 × 200 mm", "Heights: 50 / 75 / 100 mm and others"],
  },
  {
    name: "Surface Switch Centre",
    code: "UL-MBSC-[Gang]",
    image: RF + "rft-switch-centre-v1.png",
    description: "Surface-mounted switch centre housing several switch gangs in one enclosure.",
    specs: ["2 / 3 / 4 / 5 / 6 / 8 / 10 gang"],
  },
];

export const RAISEDFLOOR_SCENE: FloorScene = {
  system: RAISEDFLOOR,
  idPrefix: "ft-raisedfloor-",
  components: RAISEDFLOOR_COMPONENTS,
  variants: RAISEDFLOOR_VARIANTS,
  properties: [
    ["Material", "Pre-galvanised steel sheet; epoxy powder coated finish available"],
    ["Heights", "25 / 40 / 50 / 75 / 100 mm"],
    ["Widths", "100 to 500 mm, 1 to 3 compartments (service boxes up to 4)"],
    ["Standard Length", "2440 mm trunking; covers in 1220 mm sections with ø20 or ø25 mm pre-punched holes"],
    ["Floor Grid", "Suits 600 × 600 mm raised access floor panels"],
    ["Standards", "MS IEC 61084 · SS 249 · JKR EMAL · Others"],
  ],
  accessories: RAISEDFLOOR_ACCESSORIES,
};
