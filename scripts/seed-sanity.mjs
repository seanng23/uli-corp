/**
 * seed-sanity.mjs
 * Pushes static product data + pre-wired Site Settings into Sanity.
 * Run once: node scripts/seed-sanity.mjs
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Load .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ── Products ────────────────────────────────────────────────────────────────

const products = [
  {
    slug: "cable-trunking",
    name: "Cable Trunking",
    subcategory: "Cable Trunking",
    category: "Cable Support Systems",
    categorySlug: "cable-support-systems",
    itemNo: "CSS-CT-001",
    description:
      "Steel cable trunking for concealed cable routing in walls and ceilings. Clean finish ideal for offices, commercial buildings, and public spaces. Manufactured to MS IEC 61084 and available in a wide range of dimensions and surface finishes.",
    standards: ["MS IEC 61084", "SS 249", "JKR EMAL", "Others/Custom"],
    dimensions: {
      height: ["50", "75", "100", "150", "200"],
      width: ["50", "75", "100", "150", "200", "300", "450", "600"],
      length: ["2000", "3000"],
      thickness: ["0.8", "1.0", "1.2", "1.5"],
    },
    finishing: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
    properties: {
      materials: ["Cold Rolled Steel", "Stainless Steel 304", "Stainless Steel 316", "Aluminum"],
      finishings: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
      standards: ["MS IEC 61084", "SS 249", "JKR EMAL"],
      components: [
        { ref: "CT-LID", description: "Lid / Cover" },
        { ref: "CT-IE", description: "Internal Elbow" },
        { ref: "CT-EE", description: "External Elbow" },
        { ref: "CT-FJ", description: "Flat Junction" },
        { ref: "CT-TJ", description: "Tee Junction" },
        { ref: "CT-CB", description: "Coupler / Bracket" },
      ],
      notes: "Preferred length 2.0 meter and 3.0 meter.\nEvery single length comes with 1 set of coupler c/w all necessary screws.\nThickness tolerance ±10%.\nCustom lengths available on request.",
    },
    accessories: [
      { no: 1, description: "Lid / Cover" },
      { no: 2, description: "Internal Elbow 90°" },
      { no: 3, description: "External Elbow 90°" },
      { no: 4, description: "Flat Junction" },
      { no: 5, description: "Tee Junction" },
      { no: 6, description: "Reducer" },
      { no: 7, description: "Coupler Bracket" },
      { no: 8, description: "End Cap" },
    ],
    order: 1,
  },
  {
    slug: "cable-tray-perforated",
    name: "Cable Tray — Perforated",
    subcategory: "Cable Trays",
    category: "Cable Support Systems",
    categorySlug: "cable-support-systems",
    itemNo: "CSS-CTP-001",
    description:
      "Perforated cable trays designed for maximum ventilation and heat dissipation. Suitable for power cables, data cables, and instrumentation across commercial and industrial environments.",
    standards: ["MS IEC 61537", "SS 249", "JKR EMAL", "Others/Custom"],
    dimensions: {
      height: ["25", "50", "75", "100"],
      width: ["50", "75", "100", "150", "200", "300", "450", "600"],
      length: ["2400", "3000"],
      thickness: ["1.2", "1.5", "2.0", "2.5"],
    },
    finishing: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
    properties: {
      materials: ["Cold Rolled Steel", "Hot Rolled Steel", "Stainless Steel 304", "Stainless Steel 316"],
      finishings: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
      standards: ["MS IEC 61537", "SS 249", "JKR EMAL"],
      components: [
        { ref: "CTP-IE90", description: "Inside Elbow 90°" },
        { ref: "CTP-OE90", description: "Outside Elbow 90°" },
        { ref: "CTP-HT", description: "Horizontal Tee" },
        { ref: "CTP-HC", description: "Horizontal Cross" },
        { ref: "CTP-CP", description: "Coupler Plate" },
        { ref: "CTP-RDR", description: "Reducer" },
      ],
      notes: "Preferred length 2.4 meter and 3.0 meter.\nEvery single length comes with 1 set of coupler plate c/w all necessary hardware.\nThickness tolerance ±10%.\nPerforations comply with MS IEC 61537 ventilation requirements.",
    },
    accessories: [
      { no: 1, description: "Inside Elbow 90°" },
      { no: 2, description: "Outside Elbow 90°" },
      { no: 3, description: "Horizontal Tee" },
      { no: 4, description: "Horizontal Cross" },
      { no: 5, description: "Coupler Plate" },
      { no: 6, description: "Reducer" },
      { no: 7, description: "Vertical Outside Riser" },
      { no: 8, description: "Vertical Inside Riser" },
    ],
    order: 2,
  },
  {
    slug: "cable-tray-solid-bottom",
    name: "Cable Tray — Solid Bottom",
    subcategory: "Cable Trays",
    category: "Cable Support Systems",
    categorySlug: "cable-support-systems",
    itemNo: "CSS-CTS-001",
    description:
      "Solid bottom cable trays provide full cable support and protection, ideal for sensitive instrumentation cables or installations requiring physical protection from below.",
    standards: ["MS IEC 61537", "SS 249", "Others/Custom"],
    dimensions: {
      height: ["50", "75", "100"],
      width: ["75", "100", "150", "200", "300", "450", "600"],
      length: ["2400", "3000"],
      thickness: ["1.5", "2.0", "2.5"],
    },
    finishing: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
    properties: {
      materials: ["Cold Rolled Steel", "Hot Rolled Steel", "Stainless Steel 304"],
      finishings: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
      standards: ["MS IEC 61537", "SS 249"],
      components: [
        { ref: "CTS-IE90", description: "Inside Elbow 90°" },
        { ref: "CTS-OE90", description: "Outside Elbow 90°" },
        { ref: "CTS-HT", description: "Horizontal Tee" },
        { ref: "CTS-CP", description: "Coupler Plate" },
      ],
      notes: "Preferred length 2.4 meter and 3.0 meter.\nSolid bottom design provides full cable protection and prevents dust ingress.\nThickness tolerance ±10%.\nSuitable for corrosive and outdoor environments when hot-dipped galvanised.",
    },
    accessories: [
      { no: 1, description: "Inside Elbow 90°" },
      { no: 2, description: "Outside Elbow 90°" },
      { no: 3, description: "Horizontal Tee" },
      { no: 4, description: "Coupler Plate" },
      { no: 5, description: "Reducer" },
    ],
    order: 3,
  },
  {
    slug: "cable-ladder",
    name: "Cable Ladder",
    subcategory: "Cable Ladders",
    category: "Cable Support Systems",
    categorySlug: "cable-support-systems",
    itemNo: "CSS-CL-001",
    description:
      "Heavy-duty cable ladders for large cable bundles, power cables, and long span installations. Engineered for industrial plants, power stations, and infrastructure projects.",
    standards: ["MS IEC 61537", "JKR EMAL", "Others/Custom"],
    dimensions: {
      height: ["75", "100", "150"],
      width: ["150", "200", "300", "450", "600", "750", "900"],
      length: ["3000", "6000"],
      thickness: ["1.5", "2.0", "2.5", "3.0"],
    },
    finishing: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
    properties: {
      materials: ["Hot Rolled Steel", "Cold Rolled Steel", "Stainless Steel 304", "Stainless Steel 316", "Aluminum"],
      finishings: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
      standards: ["MS IEC 61537", "JKR EMAL"],
      components: [
        { ref: "CL-IE90", description: "Inside Elbow 90°" },
        { ref: "CL-OE90", description: "Outside Elbow 90°" },
        { ref: "CL-HT", description: "Horizontal Tee" },
        { ref: "CL-HC", description: "Horizontal Cross" },
        { ref: "CL-VIR", description: "Vertical Inside Riser" },
        { ref: "CL-VOR", description: "Vertical Outside Riser" },
      ],
      notes: "Preferred length 3.0 meter and 6.0 meter.\nRung spacing 300mm standard; custom spacing available on request.\nThickness tolerance ±10%.\nDesigned for heavy-duty power cable installations in industrial plants and infrastructure projects.",
    },
    accessories: [
      { no: 1, description: "Inside Elbow 90°" },
      { no: 2, description: "Outside Elbow 90°" },
      { no: 3, description: "Horizontal Tee" },
      { no: 4, description: "Horizontal Cross" },
      { no: 5, description: "Vertical Inside Riser" },
      { no: 6, description: "Vertical Outside Riser" },
      { no: 7, description: "Coupler Plate" },
      { no: 8, description: "Reducer" },
    ],
    order: 4,
  },
  {
    slug: "wire-mesh-tray",
    name: "Wire Mesh Tray",
    subcategory: "Wire Mesh Tray",
    category: "Cable Support Systems",
    categorySlug: "cable-support-systems",
    itemNo: "CSS-WM-001",
    description:
      "Flexible wire mesh trays for data centres, offices, and light commercial applications. Easy installation, excellent ventilation, and quick cable access.",
    standards: ["IEC 61537", "Others/Custom"],
    dimensions: {
      height: ["25", "50", "75", "100"],
      width: ["50", "75", "100", "150", "200", "300", "400", "500", "600"],
      length: ["3000"],
      thickness: ["3", "4", "5"],
    },
    finishing: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
    properties: {
      materials: ["Cold Drawn Wire", "Stainless Steel 304"],
      finishings: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
      standards: ["IEC 61537"],
      components: [
        { ref: "WM-IE90", description: "Inside Elbow 90°" },
        { ref: "WM-OE90", description: "Outside Elbow 90°" },
        { ref: "WM-HT", description: "Horizontal Tee" },
        { ref: "WM-CP", description: "Coupler" },
      ],
      notes: "Standard length 3.0 meter.\nWire diameter 3mm, 4mm, and 5mm available.\nEasy field cutting with standard bolt cutters.\nSuitable for lightweight data and communication cables in offices and data centres.",
    },
    accessories: [
      { no: 1, description: "Inside Elbow 90°" },
      { no: 2, description: "Outside Elbow 90°" },
      { no: 3, description: "Horizontal Tee" },
      { no: 4, description: "Coupler" },
      { no: 5, description: "Wall Bracket" },
      { no: 6, description: "Reducer" },
    ],
    order: 5,
  },
  {
    slug: "conduit-pipe-accessories",
    name: "Electrical Steel Conduit",
    subcategory: "Conduit",
    category: "Cable Support Systems",
    categorySlug: "cable-support-systems",
    itemNo: "CSS-ESC-001",
    description:
      "Rigid electrical steel conduit pipes with a full range of accessories for enclosed cable protection in industrial, commercial, and residential projects.",
    standards: ["MS 232", "BS EN 61386", "Others/Custom"],
    dimensions: {
      length: ["3000"],
      thickness: ["1.6", "2.0"],
    },
    finishing: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
    properties: {
      materials: ["Cold Rolled Steel"],
      finishings: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
      standards: ["MS 232", "BS EN 61386"],
      components: [
        { ref: "ESC-E90", description: "Elbow 90°" },
        { ref: "ESC-E45", description: "Elbow 45°" },
        { ref: "ESC-CP", description: "Coupler" },
        { ref: "ESC-LB", description: "LB Conduit Body" },
      ],
      notes: "Standard length 3.0 meter.\nAvailable in nominal trade sizes 16mm to 63mm.\nThreaded ends comply with BS 21 taper thread standard.\nFull range of conduit bodies, fittings, and accessories available.",
    },
    accessories: [
      { no: 1, description: "Elbow 90°" },
      { no: 2, description: "Elbow 45°" },
      { no: 3, description: "Coupler" },
      { no: 4, description: "Conduit Body LB" },
      { no: 5, description: "Conduit Body LL" },
      { no: 6, description: "Conduit Body T" },
      { no: 7, description: "Lock Nut" },
      { no: 8, description: "Bushing" },
    ],
    order: 6,
  },
  {
    slug: "unistrut-channel",
    name: "Strut Channel",
    subcategory: "Strut Channel",
    category: "Metal Framing Systems",
    categorySlug: "metal-framing-systems",
    itemNo: "MFS-SC-001",
    description:
      "Versatile metal framing channel for MEP support systems. Compatible with a full range of fittings, clamps, and accessories for rapid installation.",
    standards: ["MS ISO 7092", "Others/Custom"],
    dimensions: {
      length: ["3000", "6000"],
      thickness: ["2.0", "2.5", "3.0"],
    },
    finishing: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
    properties: {
      materials: ["Cold Rolled Steel", "Stainless Steel 304"],
      finishings: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
      standards: ["MS ISO 7092"],
      components: [
        { ref: "SC-CB", description: "Channel Bracket" },
        { ref: "SC-SP", description: "Splice Plate" },
        { ref: "SC-EC", description: "End Cap" },
        { ref: "SC-NB", description: "Channel Nut & Bolt" },
      ],
      notes: "Standard length 3.0 meter and 6.0 meter.\nSlotted 9/16\" holes at 1-7/8\" centres for maximum adjustability.\nCompatible with standard Unistrut fittings and hardware.\nThickness tolerance ±10%.",
    },
    accessories: [
      { no: 1, description: "Channel Bracket" },
      { no: 2, description: "Splice Plate" },
      { no: 3, description: "End Cap" },
      { no: 4, description: "Channel Nut & Bolt Set" },
      { no: 5, description: "Pipe Clamp" },
      { no: 6, description: "Beam Clamp" },
      { no: 7, description: "Conduit Clamp" },
    ],
    order: 7,
  },
  {
    slug: "threaded-rod",
    name: "Threaded Rod & Hanger",
    subcategory: "Threaded Rod & Hanger",
    category: "Metal Framing Systems",
    categorySlug: "metal-framing-systems",
    itemNo: "MFS-TR-001",
    description:
      "High-tensile threaded rods and pipe hangers for suspending cable trays, pipes, ducts, and mechanical equipment from structural ceilings and beams.",
    standards: ["DIN 975", "Others/Custom"],
    dimensions: {
      length: ["1000", "2000", "3000"],
      thickness: ["8", "10", "12", "16", "20", "24"],
    },
    finishing: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
    properties: {
      materials: ["Carbon Steel Grade 4.8", "Carbon Steel Grade 8.8", "Stainless Steel 304", "Stainless Steel 316"],
      finishings: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
      standards: ["DIN 975"],
      components: [
        { ref: "TR-HEX", description: "Hex Nut" },
        { ref: "TR-SPH", description: "Spring Hanger" },
        { ref: "TR-CPL", description: "Coupling Nut" },
        { ref: "TR-WAS", description: "Flat Washer" },
      ],
      notes: "Available in lengths 1.0 meter, 2.0 meter, and 3.0 meter.\nDiameter range M8 to M24.\nGrade 4.8 standard; Grade 8.8 available for heavy-duty applications.\nSupplied with two hex nuts and one flat washer per rod.",
    },
    accessories: [
      { no: 1, description: "Hex Nut" },
      { no: 2, description: "Coupling Nut" },
      { no: 3, description: "Flat Washer" },
      { no: 4, description: "Spring Hanger" },
      { no: 5, description: "Beam Clamp" },
      { no: 6, description: "Clevis Hanger" },
    ],
    order: 8,
  },
  {
    slug: "floor-trunking-steel",
    name: "Underfloor Trunking",
    subcategory: "Floor Trunking",
    category: "Floor Trunking Systems",
    categorySlug: "floor-trunking-systems",
    itemNo: "FTS-UFT-001",
    description:
      "Recessed underfloor trunking systems for power and data cable routing in concrete slabs and open-plan office environments. Supplied with flush-fit covers.",
    standards: ["MS IEC 61084", "Others/Custom"],
    dimensions: {
      height: ["25", "38", "50"],
      width: ["50", "75", "100", "150", "200"],
      length: ["2000", "3000"],
      thickness: ["0.8", "1.0", "1.2"],
    },
    finishing: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
    properties: {
      materials: ["Pre-Galvanised Steel", "Aluminum"],
      finishings: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"],
      standards: ["MS IEC 61084"],
      components: [
        { ref: "UFT-FC", description: "Flat Cover" },
        { ref: "UFT-CC", description: "Carpet Cover" },
        { ref: "UFT-TC", description: "Tile Cover" },
        { ref: "UFT-JB", description: "Junction Box" },
      ],
      notes: "Preferred length 2.0 meter and 3.0 meter.\nCovers supplied separately — specify flat, carpet, or tile finish.\nDesigned for flush installation in concrete screeds.\nThickness tolerance ±10%.",
    },
    accessories: [
      { no: 1, description: "Flat Cover" },
      { no: 2, description: "Carpet Cover" },
      { no: 3, description: "Tile Cover" },
      { no: 4, description: "Junction Box" },
      { no: 5, description: "Outlet Box" },
      { no: 6, description: "Coupler" },
    ],
    order: 9,
  },
];

// ── Site Settings ────────────────────────────────────────────────────────────

const siteSettings = {
  _type: "siteSettings",
  _id: "siteSettings",
  heroes: [
    { _key: "hero-home", key: "home" },
    { _key: "hero-about", key: "about" },
    { _key: "hero-products", key: "products" },
    { _key: "hero-projects", key: "projects" },
    { _key: "hero-technology", key: "technology" },
    { _key: "hero-quality", key: "quality" },
    { _key: "hero-contact", key: "contact" },
  ],
  sectionImages: [
    { _key: "si-home-legacy", key: "home-legacy", alt: "Legacy — manufacturing facility" },
    { _key: "si-home-intl", key: "home-projects-international", alt: "International Projects" },
    { _key: "si-home-local", key: "home-projects-local", alt: "Local Projects" },
    { _key: "si-about-worker", key: "about-split-worker", alt: "Worker on manufacturing floor" },
    { _key: "si-about-tray", key: "about-split-tray", alt: "Perforated cable tray" },
    { _key: "si-about-factory", key: "about-split-factory", alt: "Factory manufacturing floor" },
    { _key: "si-about-legacy", key: "about-legacy", alt: "U-LI steel cable tray — legacy" },
    { _key: "si-quality-controls", key: "quality-controls", alt: "Quality manufacturing process" },
    { _key: "si-quality-field", key: "quality-field", alt: "Proven on the field" },
  ],
  contact: {
    phone1: "+603-8961 5555",
    phone2: "+603-8961 5556",
    fax: "+603-8961 5557",
    email: "enquiry@uli.com.my",
    salesEmail: "salescss@uli.com.my",
    suppliesEmail: "supplies@uli.com.my",
    hrEmail: "hr@uli.com.my",
    irEmail: "ir@uli.com.my",
    address:
      "Lot. 7 (PT 3475), Jalan 6/1, Kawasan Perusahaan Seri Kembangan, 43300 Seri Kembangan, Selangor Darul Ehsan, Malaysia.",
  },
  locations: [
    {
      _key: "loc-seri-kembangan",
      name: "Seri Kembangan",
      address:
        "Lot. 7 (PT 3475), Jalan 6/1, Kawasan Perusahaan Seri Kembangan, 43300 Seri Kembangan, Selangor Darul Ehsan, Malaysia.",
    },
    {
      _key: "loc-balakong",
      name: "Balakong",
      address:
        "Lot. 5 (PT 7907), Jalan Balakong, 43300 Seri Kembangan, Selangor Darul Ehsan, Malaysia.",
    },
    {
      _key: "loc-nilai",
      name: "Nilai",
      address:
        "Lot. 755 (PT 1481), Jalan Emas 1, Kawasan Perindustrian Nilai, 71800 Nilai, Negeri Sembilan Darul Khusus, Malaysia.",
    },
  ],
};

// ── Run ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Seeding Sanity...\n");

  // 1. Upsert Site Settings
  console.log("→ Creating Site Settings...");
  await client.createOrReplace(siteSettings);
  console.log("  ✓ Site Settings created\n");

  // 2. Upsert products (createOrReplace keeps it idempotent)
  console.log(`→ Seeding ${products.length} products...`);
  for (const p of products) {
    const doc = {
      _type: "product",
      _id: `product-${p.slug}`,
      slug: { _type: "slug", current: p.slug },
      name: p.name,
      subcategory: p.subcategory,
      category: p.category,
      categorySlug: p.categorySlug,
      itemNo: p.itemNo,
      description: p.description,
      standards: p.standards,
      finishing: p.finishing,
      dimensions: p.dimensions,
      properties: {
        ...p.properties,
        components: p.properties?.components?.map((c, i) => ({
          _key: `comp-${i}`,
          ...c,
        })),
      },
      accessories: p.accessories?.map((a, i) => ({ _key: `acc-${i}`, ...a })),
      order: p.order,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${p.name}`);
  }

  console.log("\n✅ Done. All documents published in Sanity.");
  console.log("   Go to /studio → Site Settings to upload images/videos.");
  console.log("   Go to /studio → Products to add product photos.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
