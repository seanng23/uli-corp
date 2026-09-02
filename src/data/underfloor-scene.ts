// Interactive Underfloor Trunking Systems page: clickable installation drawing
// with a per-component configurator (like the other product configurator pages).
// Codes follow the installation drawings where the catalogue tables differ
// (e.g. the trunking joint is UL-UTJL, not UL-UTJX).

type Values = Record<string, string>;
/** Optional visibility rule so one component can show different fields per type (e.g. service box Normal vs Box Type). */
type Conditional = { showIf?: (values: Values) => boolean };
export type ChipsField = { type: "chips"; key: string; label: string; options: string[]; default: string } & Conditional;
export type ComboField = { type: "combo"; key: string; label: string; options: string[]; default: string } & Conditional;
export type SelectField = { type: "select"; key: string; label: string; options: string[]; default: string } & Conditional;
export type StaticField = { type: "static"; label: string; value: string } & Conditional;
export type Field = ChipsField | ComboField | SelectField | StaticField;

export type ComponentDef = {
  key: string;
  name: string;
  code: string;
  description: string;
  image: string;
  fields: Field[];
  enquire: boolean;
  /** Swap the drawing based on a field value, e.g. compartments. */
  imageFor?: (values: Record<string, string>) => string;
  /** Swap the item code based on a field value, e.g. VAB type. */
  codeFor?: (values: Record<string, string>) => string;
  /** Swap the description based on a field value, e.g. service box type. */
  descriptionFor?: (values: Record<string, string>) => string;
  note?: string;
  linkHref?: string;
  linkLabel?: string;
};

/** The label pill is anchored with its number badge on (x, y); `side` says which way the text extends. */
export type SceneHotspot = { x: number; y: number; componentKey: string; label: string; side?: "left" | "right" };

export type SceneVariant = {
  key: "gi" | "upvc";
  label: string;
  sublabel: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  hotspots: SceneHotspot[];
};

const UF = "/images/products/floor-trunking/underfloor/";

const WIDTHS = ["50", "75", "100", "150", "200", "225", "250", "275", "300", "350"];
const DEPTHS = ["25", "32", "38"];
const STANDARD: ChipsField = { type: "chips", key: "standard", label: "Standard", options: ["MS IEC 61084", "SS 249", "JKR EMAL", "Others"], default: "MS IEC 61084" };
const COMPARTMENTS: ChipsField = { type: "chips", key: "compartments", label: "Compartments", options: ["1", "2", "3"], default: "3" };

export const COMPONENTS: Record<string, ComponentDef> = {
  trunking: {
    key: "trunking",
    name: "Underfloor Metal Trunking",
    code: "UL-UTX",
    description:
      "Galvanised steel trunking installed on a screed or concrete slab, remaining completely concealed beneath the finished floor.",
    image: UF + "uft-trunking-v1.png",
    imageFor: (v) => UF + (v.compartments === "1" ? "uft-trunking-1c-v1.png" : v.compartments === "2" ? "uft-trunking-2c-v1.png" : "uft-trunking-v1.png"),
    enquire: true,
    fields: [
      COMPARTMENTS,
      { type: "combo", key: "depth", label: "Standard Depth (mm)", options: DEPTHS, default: "25" },
      { type: "combo", key: "width", label: "Width (mm)", options: WIDTHS, default: "150" },
      { type: "combo", key: "length", label: "Length (mm)", options: ["2440", "3000"], default: "2440" },
      { type: "static", label: "Thickness", value: "1.6 mm (standard)" },
      { type: "chips", key: "finishing", label: "Finishing", options: ["Galvanised Steel Sheet", "Others / Custom"], default: "Galvanised Steel Sheet" },
      STANDARD,
    ],
  },
  "upvc-duct": {
    key: "upvc-duct",
    name: "Underfloor uPVC Duct",
    code: "UFDL / UFDH",
    description:
      "Heavy gauge, high-impact uPVC ducting routed beneath finished floors or screeds, connecting service boxes, junction boxes and vertical access boxes.",
    image: UF + "uft-upvc-duct-v1.png",
    enquire: true,
    fields: [
      { type: "chips", key: "height", label: "Height (mm)", options: ["25 (UFDL)", "38 (UFDH)"], default: "25 (UFDL)" },
      { type: "combo", key: "width", label: "Width (mm)", options: ["50", "75", "100"], default: "75" },
      { type: "combo", key: "length", label: "Length (mm)", options: ["2900"], default: "2900" },
      { type: "static", label: "Wall Thickness", value: "2.5 to 3.2 mm, heavy gauge uPVC" },
      STANDARD,
    ],
  },
  "junction-box": {
    key: "junction-box",
    name: "Underfloor Junction Box",
    code: "UL-UJX",
    description:
      "The connection point for underfloor trunking or uPVC duct, functioning as a through, elbow, tee or cross box for directional changes in cable routing.",
    image: UF + "uft-junction-box-v1.png",
    enquire: true,
    fields: [
      { type: "select", key: "size", label: "Size (mm)", options: ["125 × 125", "150 × 150", "200 × 200", "250 × 250", "300 × 300", "325 × 325"], default: "300 × 300" },
      COMPARTMENTS,
      { type: "combo", key: "entry", label: "Entry Height (mm)", options: DEPTHS, default: "25" },
      { type: "combo", key: "recess", label: "Cover Recess (mm)", options: ["0", "6", "9", "10", "15", "20", "25", "32"], default: "0" },
      { type: "chips", key: "finish", label: "Trap & Frame", options: ["GI/Grey Cover, ABS Frame (Normal)", "GI/Grey Cover & Frame (HD1)", "SS Cover & Frame (HD2)", "SS Cover + Infilled GI (HD3)"], default: "GI/Grey Cover, ABS Frame (Normal)" },
      STANDARD,
    ],
  },
  "service-box": {
    key: "service-box",
    name: "Underfloor Service Box",
    code: "UL-USX",
    codeFor: (v) => (v.boxType === "Box Type" ? "UL-USBTH" : "UL-USX"),
    description:
      "Segregates power, data and telephone circuits at the workstation. Comprises a base box, cover and frame, and tailored service outlet plates; side plates come with pre-punched slots for the trunking entry. Overall height 56 to 85 mm, adjustable up to 150 mm with leveling screws.",
    descriptionFor: (v) =>
      v.boxType === "Box Type"
        ? "Special box-type service box designed for optimised spacing, with conduit knock-out holes in the base box. Standard frame is ABS with a GI grey cover; box height H is 60 to 110 mm."
        : "Segregates power, data and telephone circuits at the workstation. Comprises a base box, cover and frame, and tailored service outlet plates; side plates come with pre-punched slots for the trunking entry. Overall height 56 to 85 mm, adjustable up to 150 mm with leveling screws.",
    image: UF + "uft-service-box-v1.png",
    imageFor: (v) => UF + (v.boxType === "Box Type" ? "uft-service-box-boxtype-v1.png" : "uft-service-box-v1.png"),
    enquire: true,
    fields: [
      { type: "chips", key: "boxType", label: "Type", options: ["Normal", "Box Type"], default: "Normal" },
      // Normal (UL-USX)
      { type: "select", key: "size", label: "Size (mm)", options: ["125 × 125", "150 × 150", "200 × 200", "250 × 250", "300 × 300", "325 × 325", "125 × 250", "150 × 300"], default: "300 × 300", showIf: (v) => v.boxType !== "Box Type" },
      { type: "chips", key: "compartments", label: "Compartments", options: ["1", "2", "3"], default: "3", showIf: (v) => v.boxType !== "Box Type" },
      { type: "combo", key: "entry", label: "Entry Height (mm)", options: DEPTHS, default: "25", showIf: (v) => v.boxType !== "Box Type" },
      { type: "combo", key: "recess", label: "Cover Recess (mm)", options: ["0", "6", "9", "10", "12", "15", "20", "25", "32"], default: "0", showIf: (v) => v.boxType !== "Box Type" },
      { type: "chips", key: "finish", label: "Trap & Frame", options: ["GI/Grey Cover, ABS Frame & Handle (Normal 1)", "GI/Grey Cover & Frame, ABS Handle (Normal 2)", "GI/Grey, Flap Type (HD1)", "SS Cover & Frame, Flap Type (HD2)", "SS + Infilled GI, Flap Type (HD3)"], default: "GI/Grey Cover, ABS Frame & Handle (Normal 1)", showIf: (v) => v.boxType !== "Box Type" },
      // Box Type (UL-USBTH), catalogue section 5.2
      { type: "select", key: "boxSize", label: "Size (mm)", options: ["125 × 125 (1C)", "150 × 150 (1C)", "125 × 250 (1C)", "150 × 300 (1C)", "200 × 200 (1C or 2C)", "250 × 250 (2C or 3C)", "300 × 300 (2C or 3C)"], default: "250 × 250 (2C or 3C)", showIf: (v) => v.boxType === "Box Type" },
      { type: "chips", key: "boxCompartments", label: "Compartments", options: ["1", "2", "3"], default: "3", showIf: (v) => v.boxType === "Box Type" },
      { type: "combo", key: "boxHeight", label: "Box Height H (mm)", options: ["60", "70", "80", "90", "100", "110"], default: "80", showIf: (v) => v.boxType === "Box Type" },
      { type: "chips", key: "boxRecess", label: "Cover Recess (mm)", options: ["0", "6", "9", "10"], default: "0", showIf: (v) => v.boxType === "Box Type" },
      { type: "chips", key: "boxMaterial", label: "Material", options: ["P", "PM", "M", "SS"], default: "M", showIf: (v) => v.boxType === "Box Type" },
      { type: "static", label: "Trap & Frame", value: "ABS frame, GI + grey cover (standard)", showIf: (v) => v.boxType === "Box Type" },
      STANDARD,
    ],
  },
  vab: {
    key: "vab",
    name: "Vertical Access Box",
    code: "UL-UVX",
    codeFor: (v) => (v.vabType === "Curved" ? "UL-UVSX" : "UL-UVX"),
    description:
      "Connects floor ducts or underfloor trunking to wall trunking, distribution boards or risers to upper floors. Available straight (UL-UVX) or curved (UL-UVSX), with slots for uPVC ducts (type D) or coupling joints for GI trunking (type T). Standard riser is 50H surface trunking.",
    image: UF + "uft-vab-v1.png",
    imageFor: (v) => {
      const slant = v.vabType === "Curved" ? "-slanting" : "";
      const c = v.compartments === "1" ? "-1c" : v.compartments === "2" ? "-2c" : "";
      return UF + `uft-vab${slant}${c}-v1.png`;
    },
    enquire: true,
    fields: [
      { type: "chips", key: "vabType", label: "Type", options: ["Straight", "Curved"], default: "Straight" },
      COMPARTMENTS,
      { type: "combo", key: "width", label: "Width (mm)", options: WIDTHS, default: "275" },
      { type: "combo", key: "entry", label: "Entry Height (mm)", options: DEPTHS, default: "25" },
      { type: "chips", key: "connection", label: "Connection Type", options: ["T — GI Trunking", "D — uPVC Duct"], default: "T — GI Trunking" },
      STANDARD,
    ],
  },
  joint: {
    key: "joint",
    name: "Underfloor Trunking Joint",
    code: "UL-UTJL",
    description:
      "Coupling joint that connects underfloor trunking lengths end-to-end (catalogue section 6.2).",
    image: UF + "uft-joint-v1.png",
    enquire: true,
    fields: [
      { type: "combo", key: "width", label: "Width (mm)", options: WIDTHS, default: "275" },
      { type: "combo", key: "height", label: "Height (mm)", options: DEPTHS, default: "25" },
    ],
  },
};

export const SCENE_VARIANTS: SceneVariant[] = [
  {
    key: "gi",
    label: "GI Metal Trunking",
    sublabel: "Pre-galvanized steel",
    image: UF + "scene-gi-line-v1.png",
    imageWidth: 2008,
    imageHeight: 1287,
    hotspots: [
      { x: 49, y: 53, componentKey: "junction-box", label: "Underfloor Junction Box" },
      { x: 66, y: 37, componentKey: "trunking", label: "Underfloor Metal Trunking" },
      { x: 17, y: 25, componentKey: "service-box", label: "Underfloor Service Box" },
      { x: 81, y: 86, componentKey: "service-box", label: "Underfloor Service Box", side: "left" },
      { x: 80, y: 25, componentKey: "vab", label: "Vertical Access Box" },
      { x: 27, y: 75, componentKey: "joint", label: "Underfloor Trunking Joint" },
    ],
  },
  {
    key: "upvc",
    label: "uPVC Duct",
    sublabel: "Heavy gauge uPVC",
    image: UF + "scene-upvc-line-v1.png",
    imageWidth: 2472,
    imageHeight: 1369,
    hotspots: [
      { x: 48, y: 56, componentKey: "junction-box", label: "Underfloor Junction Box" },
      { x: 63, y: 33, componentKey: "upvc-duct", label: "Underfloor uPVC Duct" },
      { x: 21, y: 29, componentKey: "service-box", label: "Underfloor Service Box" },
      { x: 79, y: 88, componentKey: "service-box", label: "Underfloor Service Box", side: "left" },
      { x: 79, y: 19, componentKey: "vab", label: "Vertical Access Box" },
      { x: 55, y: 68, componentKey: "joint", label: "Underfloor Trunking Joint", side: "left" },
    ],
  },
];

/** Catalogue section 6.0 Underfloor Accessories: generic reference cards, not configurable. */
export type AccessoryCard = { name: string; code: string; image?: string; description: string; specs: string[] };

export const UNDERFLOOR_ACCESSORIES: AccessoryCard[] = [
  {
    name: "Leveling Screws",
    code: "ULLS38 / ULLS48 / ULLS60 / ULLS95",
    description:
      "M8 leveling screws are the primary component setting the overall height of a junction or service box. Floor finish (carpet, tiles, marble) and the pillar height at the trunking entry decide which length is needed.",
    specs: [
      "ULLS38 (M8 × 38): 56–72 mm at 25H · 65–80 at 32H · 70–85 at 38H",
      "ULLS48 (M8 × 48): 66–82 mm at 25H · 75–90 at 32H · 80–95 at 38H",
      "ULLS60 (M8 × 60): 80–95 mm at 25H · 85–100 at 32H · 90–105 at 38H",
      "ULLS95 (M8 × 95): 110–125 mm at 25H · 120–135 at 32H · 125–140 at 38H",
    ],
  },
  {
    name: "UF Trunking OHM Bracket",
    code: "UL-UOHMX-[W]",
    image: UF + "uft-ohm-bracket-v1.png",
    description: "Hold-down bracket that fixes underfloor trunking and uPVC duct runs to the slab before screeding.",
    specs: ["X = L (25H), M (32H) or H (38H)", "Widths: 150, 200, 225, 275, 300, 350 mm"],
  },
  {
    name: "UF Trunking Joint",
    code: "UL-UTJX-[W]",
    image: UF + "uft-joint-v1.png",
    description: "Coupling joint that connects underfloor trunking lengths end to end.",
    specs: ["X = L (25H), M (32H) or H (38H)", "Widths: 50, 75, 100, 150, 200, 225, 275, 300, 350 mm"],
  },
  {
    name: "Trunking End Cap",
    code: "UL-UTECL-[W] / UL-UDECL-[W]",
    image: UF + "uft-end-cap-v1.png",
    description: "Closes off the open end of a trunking or duct run before screeding, keeping concrete and debris out of the compartments.",
    specs: ["UL-UTECL: GI metal trunking end cap", "UL-UDECL: uPVC duct end cap", "Widths: 50 to 350 mm, to suit the run"],
  },
  {
    name: "Leveling Bar",
    code: "Leveling Bar",
    image: UF + "uft-leveling-bar-v1.png",
    description: "Steel bar set beneath the trunking run to keep it flat and level on an uneven slab before screeding.",
    specs: ["Supplied to suit the trunking width"],
  },
];
