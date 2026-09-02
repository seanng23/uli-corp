// Interactive Flushfloor Trunking Systems page: clickable installation drawing
// with a per-component configurator. Sizes from the catalogue (Ver 001/2026) sections 1.0 to 8.0.
import { FLUSHFLOOR } from "./floor-trunking";
import { COMPARTMENTS, STANDARD, type AccessoryCard, type ComponentDef, type FloorScene, type SceneVariant } from "./floor-scene";

const FF = "/images/products/floor-trunking/flushfloor/";
const UF = "/images/products/floor-trunking/underfloor/";

const HEIGHTS = ["32", "40", "50", "60", "65", "73"];
const WIDTHS = ["100", "150", "200", "280", "300", "400", "450", "500", "600", "700"];
const BOX_SIZES = ["100 × 100", "150 × 150", "200 × 200", "280 × 280", "300 × 300", "400 × 400", "450 × 450", "500 × 500", "600 × 600", "700 × 700"];
const JOINT_WIDTHS = ["100", "150", "200", "280", "300", "400", "500", "600"];

const MAIN = "Main Trunking";
const SUB = "Sub Trunking";
const SMALL = "Small Capacity";
const isSmall = (v: Record<string, string>) => v.trunkingType === SMALL;
const compartmentSuffix = (v: Record<string, string>) => (v.compartments === "1" ? "-1c" : v.compartments === "2" ? "-2c" : "");

export const FLUSHFLOOR_COMPONENTS: Record<string, ComponentDef> = {
  trunking: {
    key: "trunking",
    name: "Flushfloor Trunking",
    code: "UL-FTH",
    description:
      "Main trunking (400 / 500 / 700 mm wide, fixed dividers) carries the bulk of the cabling; sub trunking (280 / 300 mm wide, removable dividers) branches off it to the service boxes. Both sit flush with the finished floor in heights of 60, 65 and 73 mm.",
    descriptionFor: (v) =>
      v.trunkingType === SUB
        ? "Sub trunking branches off the main run to the workstation service boxes. Widths of 280 or 300 mm with removable sectionalised separators, so compartments and service box positions can change after installation."
        : v.trunkingType === SMALL
          ? "Small-capacity option for designs with fixed service box and junction box positions: heights of 32, 40 or 50 mm and widths of 100, 150 or 200 mm, with fixed dividers."
          : "Main trunking carries the bulk of the cabling across the floor. Widths of 400, 500 or 700 mm (other widths available) with fixed dividers, in heights of 60, 65 and 73 mm; 2440 mm standard length.",
    image: FF + "fft-trunking-v1.png",
    imageFor: (v) => FF + `fft-trunking${compartmentSuffix(v)}-v1.png`,
    enquire: true,
    fields: [
      { type: "chips", key: "trunkingType", label: "Type", options: [MAIN, SUB, SMALL], default: MAIN },
      { type: "combo", key: "mainWidth", label: "Width (mm)", options: ["400", "450", "500", "600", "700"], default: "500", showIf: (v) => v.trunkingType === MAIN },
      { type: "chips", key: "subWidth", label: "Width (mm)", options: ["280", "300"], default: "300", showIf: (v) => v.trunkingType === SUB },
      { type: "chips", key: "smallWidth", label: "Width (mm)", options: ["100", "150", "200"], default: "150", showIf: isSmall },
      { type: "combo", key: "height", label: "Height H (mm)", options: ["60", "65", "73"], default: "60", showIf: (v) => !isSmall(v) },
      { type: "chips", key: "smallHeight", label: "Height H (mm)", options: ["32", "40", "50"], default: "40", showIf: isSmall },
      COMPARTMENTS,
      { type: "combo", key: "length", label: "Length (mm)", options: ["2440", "1220", "812", "406", "203"], default: "2440" },
      { type: "static", label: "Divider", value: "Fixed (permanent separation)", showIf: (v) => v.trunkingType !== SUB },
      { type: "static", label: "Divider", value: "Removable sectionalised separators", showIf: (v) => v.trunkingType === SUB },
      { type: "static", label: "Thickness", value: "Body 1.6 mm · cover 3.0 mm" },
      { type: "chips", key: "finishing", label: "Finishing", options: ["Pre-galvanised Steel Sheet", "Others / Custom"], default: "Pre-galvanised Steel Sheet" },
      STANDARD,
    ],
  },
  "junction-box": {
    key: "junction-box",
    name: "Flushfloor Junction Box",
    code: "UL-FJH",
    description:
      "Modular cross, tee and elbow junction boxes supplied with flyovers or dividers, so each compartment keeps 100% cable handling capacity through the box. Non-standard sizes such as a 500 × 300 mm tee between main and sub trunking can be customised.",
    image: FF + "fft-junction-box-t-v1.png",
    imageFor: (v) => FF + (v.junctionType.startsWith("X") ? "fft-junction-box-v1.png" : v.junctionType.startsWith("L") ? "fft-junction-box-l-v1.png" : "fft-junction-box-t-v1.png"),
    enquire: true,
    fields: [
      { type: "chips", key: "junctionType", label: "Type", options: ["X — Cross", "T — Tee", "L — Elbow"], default: "T — Tee" },
      { type: "select", key: "size", label: "Size (mm)", options: BOX_SIZES, default: "450 × 450" },
      COMPARTMENTS,
      { type: "combo", key: "height", label: "Height H (mm)", options: HEIGHTS, default: "60" },
      STANDARD,
    ],
  },
  "service-box": {
    key: "service-box",
    name: "Flushfloor Service Box",
    code: "UL-FS",
    codeFor: (v) => (v.boxType === "With Body" ? "UL-FSH" : "UL-FS"),
    description:
      "Service outlet trap and frame that mounts directly over the sub trunking in place of one 406 mm cover section. Pre-galvanised steel with epoxy powder coating and an ABS handle; the 6 to 10 mm raised edge trims carpet or vinyl neatly around the outlet.",
    descriptionFor: (v) =>
      v.boxType === "With Body"
        ? "Service box with its own body for small-capacity flushfloor trunking of 32, 40 and 50 mm height. Same 406 mm top cover, trap and carpet-trim frame as the bodyless version, with epoxy powder coating and an ABS handle."
        : "Service outlet trap and frame that mounts directly over the sub trunking in place of one 406 mm cover section, for trunking heights of 60, 65 and 73 mm. Pre-galvanised steel with epoxy powder coating and an ABS handle; the 6 to 10 mm raised edge trims carpet or vinyl neatly around the outlet.",
    image: FF + "fft-service-box-v1.png",
    imageFor: (v) => FF + (v.boxType === "With Body" ? "fft-service-box-body-v1.png" : "fft-service-box-v1.png"),
    enquire: true,
    fields: [
      { type: "chips", key: "boxType", label: "Type", options: ["Without Body", "With Body"], default: "Without Body" },
      { type: "static", label: "For Trunking", value: "60 / 65 / 73 mm height", showIf: (v) => v.boxType !== "With Body" },
      { type: "chips", key: "bodyHeight", label: "Trunking Height H (mm)", options: ["32", "40", "50"], default: "40", showIf: (v) => v.boxType === "With Body" },
      { type: "chips", key: "width", label: "Width (mm)", options: ["280", "300"], default: "300" },
      { type: "chips", key: "trap", label: "Trap & Carpet Trim Frame (mm)", options: ["250 × 250", "270 × 270"], default: "270 × 270" },
      { type: "chips", key: "compartments", label: "Compartments", options: ["2", "3"], default: "3" },
      { type: "static", label: "Top Cover", value: "406 mm long, interchangeable with the trunking cover" },
      STANDARD,
    ],
  },
  vab: {
    key: "vab",
    name: "Flushfloor Vertical Access Box",
    code: "UL-FVH",
    codeFor: (v) => (v.vabType.startsWith("Slanting") ? "UL-FVSH" : "UL-FVH"),
    description:
      "Rises from the flushfloor trunking to wall or surface trunking, carrying the final sub-circuits back to the distribution board. Available with a 90° riser (UL-FVH) or a 45° slanting riser (UL-FVSH); standard riser is 50H surface trunking.",
    image: FF + "fft-vab-slanting-v1.png",
    imageFor: (v) => FF + `fft-vab${v.vabType.startsWith("Slanting") ? "-slanting" : ""}${compartmentSuffix(v)}-v1.png`,
    enquire: true,
    fields: [
      { type: "chips", key: "vabType", label: "Type", options: ["90 Degree", "Slanting (45°)"], default: "Slanting (45°)" },
      COMPARTMENTS,
      { type: "combo", key: "width", label: "Width (mm)", options: WIDTHS, default: "500" },
      { type: "combo", key: "height", label: "Trunking Height H (mm)", options: HEIGHTS, default: "60" },
      { type: "static", label: "Riser", value: "50H surface trunking (standard)" },
      STANDARD,
    ],
  },
  joint: {
    key: "joint",
    name: "Flushfloor Trunking Joint",
    code: "UL-FJ",
    codeFor: (v) => (v.jointType === "Adjustable Joint" ? "UL-FAJ" : "UL-FJ"),
    description:
      "Flat coupling plate that connects flushfloor trunking lengths end to end beneath the joint line.",
    descriptionFor: (v) =>
      v.jointType === "Adjustable Joint"
        ? "Coupling plate with built-in levelling feet, so adjoining trunking lengths can be brought level on an uneven slab before the screed goes down."
        : "Flat coupling plate that connects flushfloor trunking lengths end to end beneath the joint line.",
    image: FF + "fft-joint-v1.png",
    imageFor: (v) => FF + (v.jointType === "Adjustable Joint" ? "fft-adjustable-joint-v1.png" : "fft-joint-v1.png"),
    enquire: true,
    fields: [
      { type: "chips", key: "jointType", label: "Type", options: ["Flat Joint", "Adjustable Joint"], default: "Flat Joint" },
      { type: "combo", key: "width", label: "Width (mm)", options: JOINT_WIDTHS, default: "300" },
      COMPARTMENTS,
    ],
  },
};

export const FLUSHFLOOR_VARIANTS: SceneVariant[] = [
  {
    key: "ff",
    label: "Flushfloor Trunking",
    sublabel: "Pre-galvanised steel",
    caption: "Typical flushfloor installation.",
    image: FF + "fft-typical-v1.png",
    imageWidth: 2703,
    imageHeight: 1944,
    hotspots: [
      { x: 40.5, y: 42.5, componentKey: "trunking", label: "Flushfloor Main Trunking", preset: { trunkingType: MAIN } },
      { x: 53.5, y: 52.5, componentKey: "junction-box", label: "Flushfloor Junction Box" },
      { x: 45, y: 75.8, componentKey: "trunking", label: "Flushfloor Sub Trunking", preset: { trunkingType: SUB } },
      { x: 57.5, y: 80, componentKey: "service-box", label: "Flushfloor Service Box" },
      { x: 87, y: 44.5, componentKey: "service-box", label: "Flushfloor Service Box", side: "left" },
      { x: 34, y: 36.5, componentKey: "vab", label: "Vertical Access Box" },
      { x: 9, y: 86, componentKey: "joint", label: "Flushfloor Trunking Joint" },
    ],
  },
];

/** Catalogue sections 5.0 and 6.0 plus the levelling bar from the service box detail: not configured on the drawing. */
export const FLUSHFLOOR_ACCESSORIES: AccessoryCard[] = [
  {
    name: "Flushfloor Trunking Reducer",
    code: "UL-FRH-[W1]-[W2]",
    image: FF + "fft-reducer-v1.png",
    description: "Steps a wider main trunking run down to a narrower one, keeping the compartments continuous through the transition.",
    specs: ["600-500 · 600-400 · 600-300 · 500-400 · 500-300 · 500-280 · 400-300 · 400-280", "Heights: 32 / 40 / 50 / 60 / 65 / 73 mm · 2 or 3 compartments"],
  },
  {
    name: "Flushfloor Trunking End Cap",
    code: "UL-FTECH-[W]",
    image: FF + "fft-end-cap-v1.png",
    description: "Closes off the open end of a flushfloor trunking run before the screed is poured.",
    specs: ["Widths: 100 to 600 mm", "Heights: 32 / 40 / 50 / 60 / 65 / 73 mm"],
  },
  {
    name: "Levelling Bar",
    code: "Levelling Bar",
    image: UF + "uft-leveling-bar-v1.png",
    description: "Steel bar set beneath the trunking at each joint and under the service box, keeping the run flat and level on the slab before screeding.",
    specs: ["Supplied to suit the trunking width"],
  },
];

export const FLUSHFLOOR_SCENE: FloorScene = {
  system: FLUSHFLOOR,
  idPrefix: "ft-flushfloor-",
  components: FLUSHFLOOR_COMPONENTS,
  variants: FLUSHFLOOR_VARIANTS,
  properties: [
    ["Material", "Pre-galvanised steel sheet; body, separators and junction box base 1.6 mm, covers 3.0 mm (±10%)"],
    ["Heights", "Main and sub trunking 60 / 65 / 73 mm; small-capacity 32 / 40 / 50 mm"],
    ["Widths", "Main 400 / 500 / 700 mm (fixed dividers) · Sub 280 / 300 mm (removable dividers) · Small-capacity 100 / 150 / 200 mm"],
    ["Compartments", "1, 2 or 3"],
    ["Lengths", "2440 mm standard; designated lengths 203 / 406 / 812 / 1220 mm"],
    ["Standards", "MS IEC 61084 · SS 249 · JKR EMAL · Others"],
  ],
  accessories: FLUSHFLOOR_ACCESSORIES,
};
