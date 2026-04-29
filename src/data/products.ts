export type SpecOption = {
  label: string;
  values: string[];
};

export type ProductProperties = {
  materials?: string[];
  finishings?: string[];
  standards?: string[];
  components?: { ref: string; description: string }[];
  notes?: string;
};

export type ProductAccessory = {
  no: number;
  description: string;
};

export type DimensionRow = {
  ref?: string;
  nominalSize?: string;
  minThickness?: string;
  maxThickness?: string;
};

export type Product = {
  slug: string;
  name: string;
  subcategory: string;
  category: string;
  categorySlug: string;
  itemNo?: string;
  description: string;
  image: string;
  thumbnails?: string[];
  standards?: string[];
  dimensions?: {
    height?: string[];
    width?: string[];
    length?: string[];
    thickness?: string[];
  };
  finishing?: string[];
  finishingColors?: string[];
  dimensionTable?: DimensionRow[];
  properties?: ProductProperties;
  accessories?: ProductAccessory[];
  specs: SpecOption[];
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "cable-support-systems",
    name: "Cable Support Systems",
    description:
      "The foundation of any efficient electrical infrastructure. U-LI manufactures a complete range of steel-based Cable Support System solutions engineered for demanding environments.",
    image: "/images/homepage/project-2.jpg",
  },
  {
    slug: "metal-framing-systems",
    name: "Metal Framing Systems",
    description:
      "Versatile and robust steel framing systems designed for mechanical, electrical, and plumbing installations across commercial and industrial projects.",
    image: "/images/homepage/factory-1.jpg",
  },
  {
    slug: "floor-trunking-systems",
    name: "Floor Trunking Systems",
    description:
      "Durable floor trunking solutions for organised cable management in raised access floors, offices, and commercial buildings.",
    image: "/images/homepage/factory-2.jpg",
  },
];

export const products: Product[] = [
  // ── Cable Support Systems ────────────────────────────────────────────
  {
    slug: "cable-trunking",
    name: "Cable Trunking",
    subcategory: "Cable Trunking",
    category: "Cable Support Systems",
    categorySlug: "cable-support-systems",
    itemNo: "CSS-CT-001",
    description:
      "Steel cable trunking for concealed cable routing in walls and ceilings. Clean finish ideal for offices, commercial buildings, and public spaces. Manufactured to MS IEC 61084 and available in a wide range of dimensions and surface finishes.",
    image: "/images/products/placeholder.png",
    standards: ["MS IEC 61084", "SS 249", "JKR EMAL", "Others/Custom"],
    dimensions: {
      height: ["50", "75", "100", "150", "200"],
      width: ["50", "75", "100", "150", "200", "300", "450", "600"],
      length: ["2000", "3000"],
      thickness: ["0.8", "1.0", "1.2", "1.5"],
    },
    finishing: [
      "Aluminum",
      "Electro-Galvanised Steel with Epoxy Powder Coated",
      "Epoxy Powder Coated",
      "Hot Dip Galvanised",
      "Hot Dip Galvanised with Epoxy Powder Coated",
      "Polyester Powder Coated",
      "Pre-Galvanised Steel (Unpainted)",
      "Pre-Galvanised Steel with Epoxy Powder Coated",
      "Stainless Steel 304 / 316",
      "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)",
      "Electro Galvanised Steel (Unpainted)",
      "Others/ Custom Sizes",
    ],
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
    specs: [
      { label: "Width × Height (mm)", values: ["50×50", "75×50", "100×50", "100×75", "150×75", "150×100", "200×100"] },
      { label: "Length (mm)", values: ["2000", "3000"] },
      { label: "Finishing", values: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"] },
      { label: "Gauge (mm)", values: ["0.8", "1.0", "1.2"] },
    ],
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
    image: "/images/products/placeholder.png",
    standards: ["MS IEC 61537", "SS 249", "JKR EMAL", "Others/Custom"],
    dimensions: {
      height: ["25", "50", "75", "100"],
      width: ["50", "75", "100", "150", "200", "300", "450", "600"],
      length: ["2400", "3000"],
      thickness: ["1.2", "1.5", "2.0", "2.5"],
    },
    finishing: [
      "Aluminum",
      "Electro-Galvanised Steel with Epoxy Powder Coated",
      "Epoxy Powder Coated",
      "Hot Dip Galvanised",
      "Hot Dip Galvanised with Epoxy Powder Coated",
      "Polyester Powder Coated",
      "Pre-Galvanised Steel (Unpainted)",
      "Pre-Galvanised Steel with Epoxy Powder Coated",
      "Stainless Steel 304 / 316",
      "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)",
      "Electro Galvanised Steel (Unpainted)",
      "Others/ Custom Sizes",
    ],
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
    specs: [
      { label: "Width (mm)", values: ["50", "75", "100", "150", "200", "300", "450", "600"] },
      { label: "Height (mm)", values: ["25", "50", "75", "100"] },
      { label: "Length (mm)", values: ["2400", "3000"] },
      { label: "Finishing", values: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"] },
      { label: "Thickness (mm)", values: ["1.2", "1.5", "2.0", "2.5"] },
    ],
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
    image: "/images/products/placeholder.png",
    standards: ["MS IEC 61537", "SS 249", "Others/Custom"],
    dimensions: {
      height: ["50", "75", "100"],
      width: ["75", "100", "150", "200", "300", "450", "600"],
      length: ["2400", "3000"],
      thickness: ["1.5", "2.0", "2.5"],
    },
    finishing: [
      "Aluminum",
      "Electro-Galvanised Steel with Epoxy Powder Coated",
      "Epoxy Powder Coated",
      "Hot Dip Galvanised",
      "Hot Dip Galvanised with Epoxy Powder Coated",
      "Polyester Powder Coated",
      "Pre-Galvanised Steel (Unpainted)",
      "Pre-Galvanised Steel with Epoxy Powder Coated",
      "Stainless Steel 304 / 316",
      "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)",
      "Electro Galvanised Steel (Unpainted)",
      "Others/ Custom Sizes",
    ],
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
    },
    accessories: [
      { no: 1, description: "Inside Elbow 90°" },
      { no: 2, description: "Outside Elbow 90°" },
      { no: 3, description: "Horizontal Tee" },
      { no: 4, description: "Coupler Plate" },
      { no: 5, description: "Reducer" },
    ],
    specs: [
      { label: "Width (mm)", values: ["75", "100", "150", "200", "300", "450", "600"] },
      { label: "Height (mm)", values: ["50", "75", "100"] },
      { label: "Length (mm)", values: ["2400", "3000"] },
      { label: "Finishing", values: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"] },
      { label: "Thickness (mm)", values: ["1.5", "2.0", "2.5"] },
    ],
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
    image: "/images/products/placeholder.png",
    standards: ["MS IEC 61537", "JKR EMAL", "Others/Custom"],
    dimensions: {
      height: ["75", "100", "150"],
      width: ["150", "200", "300", "450", "600", "750", "900"],
      length: ["3000", "6000"],
      thickness: ["1.5", "2.0", "2.5", "3.0"],
    },
    finishing: [
      "Aluminum",
      "Electro-Galvanised Steel with Epoxy Powder Coated",
      "Epoxy Powder Coated",
      "Hot Dip Galvanised",
      "Hot Dip Galvanised with Epoxy Powder Coated",
      "Polyester Powder Coated",
      "Pre-Galvanised Steel (Unpainted)",
      "Pre-Galvanised Steel with Epoxy Powder Coated",
      "Stainless Steel 304 / 316",
      "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)",
      "Electro Galvanised Steel (Unpainted)",
      "Others/ Custom Sizes",
    ],
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
    specs: [
      { label: "Width (mm)", values: ["150", "200", "300", "450", "600", "750", "900"] },
      { label: "Rung Spacing (mm)", values: ["150", "200", "250", "300"] },
      { label: "Length (mm)", values: ["3000", "6000"] },
      { label: "Finishing", values: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"] },
      { label: "Side Rail Height (mm)", values: ["75", "100", "150"] },
    ],
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
    image: "/images/products/placeholder.png",
    standards: ["IEC 61537", "Others/Custom"],
    dimensions: {
      height: ["25", "50", "75", "100"],
      width: ["50", "75", "100", "150", "200", "300", "400", "500", "600"],
      length: ["3000"],
      thickness: ["3", "4", "5"],
    },
    finishing: [
      "Aluminum",
      "Electro-Galvanised Steel with Epoxy Powder Coated",
      "Epoxy Powder Coated",
      "Hot Dip Galvanised",
      "Hot Dip Galvanised with Epoxy Powder Coated",
      "Polyester Powder Coated",
      "Pre-Galvanised Steel (Unpainted)",
      "Pre-Galvanised Steel with Epoxy Powder Coated",
      "Stainless Steel 304 / 316",
      "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)",
      "Electro Galvanised Steel (Unpainted)",
      "Others/ Custom Sizes",
    ],
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
    },
    accessories: [
      { no: 1, description: "Inside Elbow 90°" },
      { no: 2, description: "Outside Elbow 90°" },
      { no: 3, description: "Horizontal Tee" },
      { no: 4, description: "Coupler" },
      { no: 5, description: "Wall Bracket" },
      { no: 6, description: "Reducer" },
    ],
    specs: [
      { label: "Width (mm)", values: ["50", "75", "100", "150", "200", "300", "400", "500", "600"] },
      { label: "Height (mm)", values: ["25", "50", "75", "100"] },
      { label: "Length (mm)", values: ["3000"] },
      { label: "Finishing", values: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"] },
    ],
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
    image: "/images/products/placeholder.png",
    standards: ["MS 232", "BS EN 61386", "Others/Custom"],
    dimensions: {
      length: ["3000"],
      thickness: ["1.6", "2.0"],
    },
    finishing: [
      "Aluminum",
      "Electro-Galvanised Steel with Epoxy Powder Coated",
      "Epoxy Powder Coated",
      "Hot Dip Galvanised",
      "Hot Dip Galvanised with Epoxy Powder Coated",
      "Polyester Powder Coated",
      "Pre-Galvanised Steel (Unpainted)",
      "Pre-Galvanised Steel with Epoxy Powder Coated",
      "Stainless Steel 304 / 316",
      "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)",
      "Electro Galvanised Steel (Unpainted)",
      "Others/ Custom Sizes",
    ],
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
    specs: [
      { label: "Type", values: ["Rigid GI Conduit", "Flexible Conduit", "PVC Conduit"] },
      { label: "Diameter (mm)", values: ["16", "20", "25", "32", "40", "50", "63"] },
      { label: "Length (mm)", values: ["3000"] },
      { label: "Standard", values: ["MS 232", "BS EN 61386"] },
    ],
  },
  // ── Metal Framing Systems ────────────────────────────────────────────
  {
    slug: "unistrut-channel",
    name: "Strut Channel",
    subcategory: "Strut Channel",
    category: "Metal Framing Systems",
    categorySlug: "metal-framing-systems",
    itemNo: "MFS-SC-001",
    description:
      "Versatile metal framing channel for MEP support systems. Compatible with a full range of fittings, clamps, and accessories for rapid installation.",
    image: "/images/products/placeholder.png",
    standards: ["MS ISO 7092", "Others/Custom"],
    dimensions: {
      length: ["3000", "6000"],
      thickness: ["2.0", "2.5", "3.0"],
    },
    finishing: [
      "Aluminum",
      "Electro-Galvanised Steel with Epoxy Powder Coated",
      "Epoxy Powder Coated",
      "Hot Dip Galvanised",
      "Hot Dip Galvanised with Epoxy Powder Coated",
      "Polyester Powder Coated",
      "Pre-Galvanised Steel (Unpainted)",
      "Pre-Galvanised Steel with Epoxy Powder Coated",
      "Stainless Steel 304 / 316",
      "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)",
      "Electro Galvanised Steel (Unpainted)",
      "Others/ Custom Sizes",
    ],
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
    specs: [
      { label: "Channel Size", values: ["41×41mm", "41×21mm", "41×62mm", "41×82mm"] },
      { label: "Length (mm)", values: ["3000", "6000"] },
      { label: "Slot Type", values: ["Slotted (9/16\")", "Plain"] },
      { label: "Finishing", values: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"] },
      { label: "Gauge (mm)", values: ["2.0", "2.5", "3.0"] },
    ],
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
    image: "/images/products/placeholder.png",
    standards: ["DIN 975", "Others/Custom"],
    dimensions: {
      length: ["1000", "2000", "3000"],
      thickness: ["8", "10", "12", "16", "20", "24"],
    },
    finishing: [
      "Aluminum",
      "Electro-Galvanised Steel with Epoxy Powder Coated",
      "Epoxy Powder Coated",
      "Hot Dip Galvanised",
      "Hot Dip Galvanised with Epoxy Powder Coated",
      "Polyester Powder Coated",
      "Pre-Galvanised Steel (Unpainted)",
      "Pre-Galvanised Steel with Epoxy Powder Coated",
      "Stainless Steel 304 / 316",
      "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)",
      "Electro Galvanised Steel (Unpainted)",
      "Others/ Custom Sizes",
    ],
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
    },
    accessories: [
      { no: 1, description: "Hex Nut" },
      { no: 2, description: "Coupling Nut" },
      { no: 3, description: "Flat Washer" },
      { no: 4, description: "Spring Hanger" },
      { no: 5, description: "Beam Clamp" },
      { no: 6, description: "Clevis Hanger" },
    ],
    specs: [
      { label: "Diameter", values: ["M8", "M10", "M12", "M16", "M20", "M24"] },
      { label: "Length (mm)", values: ["1000", "2000", "3000"] },
      { label: "Finishing", values: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"] },
      { label: "Grade", values: ["Grade 4.8", "Grade 8.8"] },
    ],
  },
  // ── Floor Trunking Systems ───────────────────────────────────────────
  {
    slug: "floor-trunking-steel",
    name: "Underfloor Trunking",
    subcategory: "Floor Trunking",
    category: "Floor Trunking Systems",
    categorySlug: "floor-trunking-systems",
    itemNo: "FTS-UFT-001",
    description:
      "Recessed underfloor trunking systems for power and data cable routing in concrete slabs and open-plan office environments. Supplied with flush-fit covers.",
    image: "/images/products/placeholder.png",
    standards: ["MS IEC 61084", "Others/Custom"],
    dimensions: {
      height: ["25", "38", "50"],
      width: ["50", "75", "100", "150", "200"],
      length: ["2000", "3000"],
      thickness: ["0.8", "1.0", "1.2"],
    },
    finishing: [
      "Aluminum",
      "Electro-Galvanised Steel with Epoxy Powder Coated",
      "Epoxy Powder Coated",
      "Hot Dip Galvanised",
      "Hot Dip Galvanised with Epoxy Powder Coated",
      "Polyester Powder Coated",
      "Pre-Galvanised Steel (Unpainted)",
      "Pre-Galvanised Steel with Epoxy Powder Coated",
      "Stainless Steel 304 / 316",
      "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)",
      "Electro Galvanised Steel (Unpainted)",
      "Others/ Custom Sizes",
    ],
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
    },
    accessories: [
      { no: 1, description: "Flat Cover" },
      { no: 2, description: "Carpet Cover" },
      { no: 3, description: "Tile Cover" },
      { no: 4, description: "Junction Box" },
      { no: 5, description: "Outlet Box" },
      { no: 6, description: "Coupler" },
    ],
    specs: [
      { label: "Width × Depth (mm)", values: ["50×25", "75×25", "100×25", "150×25", "200×25", "200×38"] },
      { label: "Length (mm)", values: ["2000", "3000"] },
      { label: "Finishing", values: ["Aluminum", "Electro-Galvanised Steel with Epoxy Powder Coated", "Epoxy Powder Coated", "Hot Dip Galvanised", "Hot Dip Galvanised with Epoxy Powder Coated", "Polyester Powder Coated", "Pre-Galvanised Steel (Unpainted)", "Pre-Galvanised Steel with Epoxy Powder Coated", "Stainless Steel 304 / 316", "ULIMAZ (H.D.G. Zinc Alloyed with Aluminum & Magnesium Steel)", "Electro Galvanised Steel (Unpainted)", "Others/ Custom Sizes"] },
      { label: "Cover Type", values: ["Flat Cover", "Carpet Cover", "Tile Cover"] },
    ],
  },
];

export type ProductCategory = Category;
