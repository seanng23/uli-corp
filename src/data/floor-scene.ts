// Shared types for the interactive floor-trunking pages (Underfloor, Raisedfloor, Flushfloor):
// a clickable catalogue installation drawing with a per-component configurator.
import type { FloorTrunkingSystem } from "./floor-trunking";

export type Values = Record<string, string>;
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
  imageFor?: (values: Values) => string;
  /** Swap the item code based on a field value, e.g. VAB type. */
  codeFor?: (values: Values) => string;
  /** Swap the description based on a field value, e.g. service box type. */
  descriptionFor?: (values: Values) => string;
  note?: string;
  linkHref?: string;
  linkLabel?: string;
};

/**
 * The label pill is anchored with its number badge on (x, y) in percent of the drawing; `side` says which way the text extends.
 * `preset` sets field values when the marker is tapped (e.g. the same trunking component drawn as Main and Sub trunking).
 */
export type SceneHotspot = { x: number; y: number; componentKey: string; label: string; side?: "left" | "right"; preset?: Values };

export type SceneVariant = {
  key: string;
  label: string;
  sublabel: string;
  /** Caption under the drawing, e.g. "Typical underfloor installation (GI metal trunking)." */
  caption: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  hotspots: SceneHotspot[];
};

/** Generic reference cards for parts that are not configured on the drawing. */
export type AccessoryCard = { name: string; code: string; image?: string; description: string; specs: string[] };

export type FloorScene = {
  system: FloorTrunkingSystem;
  /** Prefix for cart item ids, e.g. "ft-underfloor-". */
  idPrefix: string;
  components: Record<string, ComponentDef>;
  /** One or more drawings; the toggle only renders when there are two or more. */
  variants: SceneVariant[];
  properties: [string, string][];
  accessories: AccessoryCard[];
};

export const STANDARD: ChipsField = { type: "chips", key: "standard", label: "Standard", options: ["MS IEC 61084", "SS 249", "JKR EMAL", "Others"], default: "MS IEC 61084" };
export const COMPARTMENTS: ChipsField = { type: "chips", key: "compartments", label: "Compartments", options: ["1", "2", "3"], default: "3" };
