// Interactive Underfloor Trunking Systems page: clickable installation drawing
// with a per-component configurator (like the other product configurator pages).
// Codes follow the installation drawings where the catalogue tables differ
// (e.g. the trunking joint is UL-UTJL, not UL-UTJX).

export type ChipsField = { type: "chips"; key: string; label: string; options: string[]; default: string };
export type ComboField = { type: "combo"; key: string; label: string; options: string[]; default: string };
export type SelectField = { type: "select"; key: string; label: string; options: string[]; default: string };
export type StaticField = { type: "static"; label: string; value: string };
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
  note?: string;
  linkHref?: string;
  linkLabel?: string;
};

export type SceneHotspot = { x: number; y: number; componentKey: string; label: string };

export type SceneVariant = {
  key: "gi" | "upvc";
  label: string;
  sublabel: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  hotspots: SceneHotspot[];
  extras: string[];
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
    description:
      "Segregates power, data and telephone circuits at the workstation. Comprises a base box, cover and frame, and tailored service outlet plates; side plates come with pre-punched slots for the trunking entry. Overall height 56 to 85 mm, adjustable up to 150 mm with leveling screws.",
    image: UF + "uft-service-box-v1.png",
    enquire: true,
    fields: [
      { type: "select", key: "size", label: "Size (mm)", options: ["125 × 125", "150 × 150", "200 × 200", "250 × 250", "300 × 300", "325 × 325", "125 × 250", "150 × 300"], default: "300 × 300" },
      COMPARTMENTS,
      { type: "combo", key: "entry", label: "Entry Height (mm)", options: DEPTHS, default: "25" },
      { type: "combo", key: "recess", label: "Cover Recess (mm)", options: ["0", "6", "9", "10", "12", "15", "20", "25", "32"], default: "0" },
      { type: "chips", key: "finish", label: "Trap & Frame", options: ["GI/Grey Cover, ABS Frame & Handle (Normal 1)", "GI/Grey Cover & Frame, ABS Handle (Normal 2)", "GI/Grey, Flap Type (HD1)", "SS Cover & Frame, Flap Type (HD2)", "SS + Infilled GI, Flap Type (HD3)"], default: "GI/Grey Cover, ABS Frame & Handle (Normal 1)" },
      STANDARD,
    ],
  },
  "service-box-boxtype": {
    key: "service-box-boxtype",
    name: "Underfloor Service Box, Box Type",
    code: "UL-USBTH",
    description:
      "Special box-type service box designed for optimised spacing, with conduit knock-out holes in the base box.",
    image: UF + "uft-service-box-boxtype-v1.png",
    enquire: true,
    fields: [
      { type: "select", key: "size", label: "Size (mm)", options: ["125 × 125", "150 × 150", "200 × 200", "250 × 250", "300 × 300", "125 × 250", "150 × 300"], default: "250 × 250" },
      COMPARTMENTS,
      { type: "combo", key: "height", label: "Height (mm)", options: ["60", "70", "80", "90", "100", "110"], default: "80" },
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
  "end-cap": {
    key: "end-cap",
    name: "Trunking End Cap",
    code: "UL-UTECL",
    description:
      "Closes off the open end of an underfloor trunking run before screeding, keeping concrete and debris out of the compartments.",
    image: UF + "uft-end-cap-v1.png",
    enquire: true,
    fields: [{ type: "combo", key: "width", label: "Width (mm)", options: WIDTHS, default: "275" }],
  },
  "leveling-bar": {
    key: "leveling-bar",
    name: "Leveling Bar",
    code: "Leveling Bar",
    description:
      "Steel bar set beneath the trunking run to keep it flat and level on an uneven slab before screeding. Junction and service boxes are levelled separately with M8 leveling screws (ULLS38 to ULLS95).",
    image: UF + "uft-leveling-bar-v1.png",
    enquire: true,
    fields: [{ type: "combo", key: "width", label: "To Suit Trunking Width (mm)", options: WIDTHS, default: "275" }],
  },
  "ohm-bracket": {
    key: "ohm-bracket",
    name: "UF Trunking OHM Bracket",
    code: "UL-UOHML",
    description:
      "Hold-down bracket that fixes underfloor trunking and uPVC duct runs to the slab before screeding.",
    image: UF + "uft-ohm-bracket-v1.png",
    enquire: true,
    fields: [
      { type: "combo", key: "width", label: "Width (mm)", options: ["150", "200", "225", "250", "275", "300", "350"], default: "300" },
      { type: "combo", key: "height", label: "Height (mm)", options: DEPTHS, default: "25" },
    ],
  },
  "duct-end-cap": {
    key: "duct-end-cap",
    name: "UL-UDECL",
    code: "UL-UDECL",
    description: "Shown in the uPVC installation drawing.",
    note: "Details for this component are still being confirmed.",
    image: UF + "uft-duct-end-cap-v1.png",
    enquire: false,
    fields: [],
  },
  "surface-trunking": {
    key: "surface-trunking",
    name: "Surface Trunking Riser",
    code: "50H Surface Trunking",
    description:
      "The vertical access box rises into U-LI 50H surface trunking, carrying final sub-circuits up the wall to the distribution board. Surface trunking is part of the U-LI Cable Support Systems range.",
    image: "/images/products/cable-trunking-v5.png",
    enquire: false,
    fields: [],
    linkHref: "/products/cable-trunking",
    linkLabel: "View Cable Trunking →",
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
      { x: 81, y: 86, componentKey: "service-box", label: "Underfloor Service Box" },
      { x: 84, y: 17, componentKey: "vab", label: "Vertical Access Box" },
      { x: 27, y: 75, componentKey: "joint", label: "Underfloor Trunking Joint" },
      { x: 15, y: 85, componentKey: "end-cap", label: "Trunking End Cap" },
      { x: 73, y: 45, componentKey: "leveling-bar", label: "Leveling Bar" },
      { x: 87, y: 7, componentKey: "surface-trunking", label: "50H Surface Trunking" },
    ],
    extras: ["service-box-boxtype", "ohm-bracket"],
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
      { x: 79, y: 88, componentKey: "service-box", label: "Underfloor Service Box" },
      { x: 79, y: 19, componentKey: "vab", label: "Vertical Access Box" },
      { x: 34, y: 76, componentKey: "ohm-bracket", label: "OHM Bracket" },
      { x: 15, y: 88, componentKey: "duct-end-cap", label: "UL-UDECL ?" },
      { x: 80, y: 12, componentKey: "surface-trunking", label: "50H Surface Trunking" },
    ],
    extras: ["service-box-boxtype"],
  },
];

export const UNDERFLOOR_ACCESSORIES: { no: number; description: string }[] = [
  { no: 1, description: "Leveling Screws — ULLS38 / ULLS48 / ULLS60 / ULLS95 (M8, box heights 56 to 140 mm)" },
  { no: 2, description: "UF Trunking OHM Bracket (UL-UOHML)" },
  { no: 3, description: "UF Trunking Joint (UL-UTJL)" },
  { no: 4, description: "UF Trunking End Cap (UL-UTECL)" },
  { no: 5, description: "Leveling Bar (to suit trunking width)" },
];
