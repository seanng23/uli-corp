export type WireCableTrayRow = {
  refSuffix: string;
  width: number;
  weight: number;
  length: 3000;
  unit: "Lth";
};

export type WireCableTrayProfile = {
  height: number;
  rows: WireCableTrayRow[];
};

export type WireCableTrayCover = {
  ref: string;
  fwbWidth: number;
  internalWidth: number;
  thickness: number;
  length: 3000;
  weight: number;
  unit: "piece";
};

export type WireCableTrayAccessory = {
  no: number;
  ref: string;
  description: string;
};

export const CONSTRUCTION = {
  screen: "50 x 100 mm",
  crossWireDiameter: "5.00 mm",
  alongsideWireDiameter: "5.00 mm",
  standardLength: 3000,
  wireRodDiameterTolerance: "+/-5%",
  loadChartStandard: "DIN EN IEC 61537",
} as const;

const row = (refSuffix: string, width: number, weight: number): WireCableTrayRow => ({
  refSuffix,
  width,
  weight,
  length: 3000,
  unit: "Lth",
});

export const TRAY_PROFILES = [
  { height: 25, rows: [row("ST02", 60, 1.92), row("ST04", 100, 2.08), row("ST06", 150, 2.65), row("ST08", 200, 3.22), row("ST10", 250, 3.78), row("ST12", 300, 4.35), row("ST16", 400, 5.49), row("ST20", 500, 6.63), row("ST24", 600, 7.77)] },
  { height: 50, rows: [row("ST02", 60, 2.87), row("ST04", 100, 3.02), row("ST06", 150, 3.59), row("ST08", 200, 4.16), row("ST10", 250, 4.73), row("ST12", 300, 5.30), row("ST16", 400, 6.44), row("ST20", 500, 7.57), row("ST24", 600, 8.71)] },
  { height: 75, rows: [row("ST03", 75, 3.12), row("ST04", 100, 3.22), row("ST06", 150, 3.78), row("ST08", 200, 4.35), row("ST10", 250, 4.92), row("ST12", 300, 5.49), row("ST16", 400, 6.63), row("ST20", 500, 7.77), row("ST24", 600, 8.91)] },
  { height: 100, rows: [row("ST04", 100, 4.16), row("ST06", 150, 4.72), row("ST08", 200, 5.30), row("ST10", 250, 5.87), row("ST12", 300, 6.44), row("ST16", 400, 7.57), row("ST20", 500, 8.71), row("ST24", 600, 9.85)] },
  { height: 150, rows: [row("ST06", 150, 5.87), row("ST08", 200, 6.44), row("ST10", 250, 7.06), row("ST12", 300, 7.57), row("ST16", 400, 8.71), row("ST20", 500, 9.85), row("ST24", 600, 10.99)] },
] satisfies WireCableTrayProfile[];

export const COVERS = [
  { ref: "C 050", fwbWidth: 50, internalWidth: 70, thickness: 1.2, length: 3000, weight: 2.51, unit: "piece" },
  { ref: "C 075", fwbWidth: 75, internalWidth: 95, thickness: 1.2, length: 3000, weight: 3.22, unit: "piece" },
  { ref: "C 100", fwbWidth: 100, internalWidth: 120, thickness: 1.2, length: 3000, weight: 3.92, unit: "piece" },
  { ref: "C 150", fwbWidth: 150, internalWidth: 170, thickness: 1.2, length: 3000, weight: 5.34, unit: "piece" },
  { ref: "C 200", fwbWidth: 200, internalWidth: 220, thickness: 1.2, length: 3000, weight: 6.75, unit: "piece" },
  { ref: "C 250", fwbWidth: 250, internalWidth: 270, thickness: 1.2, length: 3000, weight: 7.60, unit: "piece" },
  { ref: "C 300", fwbWidth: 300, internalWidth: 320, thickness: 1.2, length: 3000, weight: 9.58, unit: "piece" },
  { ref: "C 400", fwbWidth: 400, internalWidth: 420, thickness: 1.5, length: 3000, weight: 12.40, unit: "piece" },
  { ref: "C 500", fwbWidth: 500, internalWidth: 520, thickness: 1.5, length: 3000, weight: 15.23, unit: "piece" },
  { ref: "C 600", fwbWidth: 600, internalWidth: 620, thickness: 1.5, length: 3000, weight: 18.05, unit: "piece" },
] satisfies WireCableTrayCover[];

export const COVER_NOTES = {
  use: "Mainly used for horizontal and vertical sections",
  height: 10,
} as const;

export const ACCESSORIES = [
  { no: 1, ref: "CLFWB 25", description: "Captive Lid Clamp FWB 25" },
  { no: 2, ref: "CLFWB", description: "Captive Lid Clamp FWB 50, 60, 75" },
  { no: 3, ref: "SUS", description: "Suspension Piece for FWB" },
  { no: 4, ref: "WB", description: "Wall Bracket for FWB" },
  { no: 5, ref: "MB", description: "Wall and Mounting Bracket for FWB" },
  { no: 6, ref: "MB 25", description: "Wall and Mounting Bracket for FWB" },
  { no: 7, ref: "FB", description: "Floor Bracket for FWB" },
  { no: 8, ref: "MSB-L", description: "Multiple Support Bracket" },
  { no: 9, ref: "MSB-S", description: "Multiple Support Bracket" },
  { no: 10, ref: "SJ", description: "Support Joint for FWB" },
  { no: 11, ref: "SIFWB", description: "Snap-in Floor and Wall Bracket for FWB" },
  { no: 12, ref: "UB", description: "Upper Bracket" },
  { no: 13, ref: "FMB", description: "Floor and Wall Bracket" },
  { no: 14, ref: "SIWB", description: "Snap-in Wall Bracket for FWB" },
  { no: 15, ref: "SLOS", description: "Division Plate Free" },
  { no: 16, ref: "SOJ", description: "Snap-on Joiner for FWB" },
  { no: 17, ref: "SED", description: "Side / End Drop for FWB" },
  { no: 18, ref: "JC 1", description: "Jointing Clamp for FWB" },
  { no: 19, ref: "JC 2", description: "Jointing Clamp for FWB" },
  { no: 20, ref: "JC 3", description: "Jointing Clamp for FWB" },
  { no: 21, ref: "JC 4", description: "Jointing Clamp for FWB" },
  { no: 22, ref: "DC 1", description: "Clamp for FWB Divider" },
  { no: 23, ref: "HDC 1", description: "Hold Down Clamp for FWB" },
] satisfies WireCableTrayAccessory[];
