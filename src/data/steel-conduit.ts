export type CableManagementRow = {
  nominalSize: number;
  odMin: number;
  odMax: number;
  idMin: number;
  extThreadMin: number;
  class3Code: string;
  class4Code: string;
};

export type ElectricalWiringRow = {
  itemCode: string;
  sizeInch: string;
  odMin: number;
  odMax: number;
  wallMin: number;
  wallNominal: number;
  threadsPerInch: number;
  threadLenMin: number;
  threadLenMax: number;
};

export const SUPPLY_NOTES =
  "Standard length 3.81 metres, threaded both ends, one end fitted with a coupling, the other protected by a plastic end cap. Colour (epoxy powder coated) conduits supplied upon request in 3.0 metre lengths; other colours available upon request.";

export const CABLE_MGMT = {
  title: "Conduit System for Cable Management",
  certification: "Certified to MS 61386-21 by SIRIM QAS International Sdn Bhd",
  standard: "MS IEC 61386-1 / MS 61386-21",
  classification: "441611403410",
  classes: ["Class 3", "Class 4"],
  rows: [
    { nominalSize: 20, odMin: 19.7, odMax: 20.0, idMin: 16.2, extThreadMin: 14.0, class3Code: "C-ULI/20/CL3", class4Code: "C-ULI/20/CL4" },
    { nominalSize: 25, odMin: 24.6, odMax: 25.0, idMin: 21.1, extThreadMin: 17.0, class3Code: "C-ULI/25/CL3", class4Code: "C-ULI/25/CL4" },
    { nominalSize: 32, odMin: 31.6, odMax: 32.0, idMin: 28.1, extThreadMin: 19.0, class3Code: "C-ULI/32/CL3", class4Code: "C-ULI/32/CL4" },
  ] satisfies CableManagementRow[],
};

export const ELECTRICAL_WIRING = {
  title: "Steel Conduit for Electrical Wiring",
  certification: "Certified to BS 31 : 1940 by SIRIM QAS International Sdn Bhd",
  standard: "BS 31 : 1940 / Manufacturer's Standard",
  rows: [
    { itemCode: "C-ULI/19.0-1.6", sizeInch: "3/4\"", odMin: 18.76, odMax: 19.05, wallMin: 1.52, wallNominal: 1.63, threadsPerInch: 16, threadLenMin: 12.7, threadLenMax: 14.3 },
    { itemCode: "C-ULI/25.4-1.6", sizeInch: "1\"", odMin: 25.11, odMax: 25.40, wallMin: 1.52, wallNominal: 1.63, threadsPerInch: 16, threadLenMin: 15.9, threadLenMax: 17.5 },
    { itemCode: "C-ULI/31.7-1.6", sizeInch: "1 1/4\"", odMin: 31.46, odMax: 31.75, wallMin: 1.52, wallNominal: 1.63, threadsPerInch: 16, threadLenMin: 17.5, threadLenMax: 19.1 },
    { itemCode: "C-ULI/38.1-1.8", sizeInch: "1 1/2\"", odMin: 37.80, odMax: 38.10, wallMin: 1.73, wallNominal: 1.83, threadsPerInch: 14, threadLenMin: 19.1, threadLenMax: 20.6 },
    { itemCode: "C-ULI/50.8-2.0", sizeInch: "2\"", odMin: 50.50, odMax: 50.80, wallMin: 1.93, wallNominal: 2.03, threadsPerInch: 14, threadLenMin: 22.2, threadLenMax: 23.8 },
  ] satisfies ElectricalWiringRow[],
};

export const ACCESSORIES = [
  "Elbow 90deg",
  "Elbow 45deg",
  "Coupler",
  "Conduit Body LB",
  "Conduit Body LL",
  "Conduit Body T",
  "Lock Nut",
  "Bushing",
];
