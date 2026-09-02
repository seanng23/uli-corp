// Floor Trunking Distribution Systems — Underfloor, Raisedfloor and Flushfloor.
// Condensed from the U-LI Cable Management Systems catalogue (Ver 001/2026).

export type FloorTrunkingFamily = {
  code: string;
  name: string;
  description: string;
  specs?: string[];
  image: string;
};

export type FloorTrunkingTab = {
  key: string;
  label: string;
  families: FloorTrunkingFamily[];
  note?: { title: string; lines: string[] };
  explainer?: { title: string; image: string; caption: string };
};

export type FloorTrunkingSystem = {
  slug: string;
  name: string;
  cartCategory: string;
  description: string[];
  features?: string[];
  gallery: { src: string; alt: string }[];
  typicals: { src: string; alt: string; caption: string }[];
  tabs: FloorTrunkingTab[];
};

const UF = "/images/products/floor-trunking/underfloor/";
const RF = "/images/products/floor-trunking/raisedfloor/";
const FF = "/images/products/floor-trunking/flushfloor/";

export const UNDERFLOOR: FloorTrunkingSystem = {
  slug: "underfloor-trunking-systems",
  name: "Underfloor Trunking Systems",
  cartCategory: "Floor Trunking Distribution Systems",
  description: [
    "U-LI Underfloor Trunking Systems offer a quick and efficient solution for power and data distribution across screed floors or concrete slabs. Engineered for durability, these systems are designed to support heavy loads while providing easy access for cable installation and extensions through junction boxes and risers.",
    "All accessories are compatible with both uPVC and metal trunking, giving the most straightforward and cost-effective method of installation compared to other floor trunking options.",
  ],
  gallery: [
    { src: UF + "uft-listing-v1.png", alt: "Underfloor trunking with cover" },
    { src: UF + "uft-service-box-photo-v1.png", alt: "Underfloor service box, closed" },
    { src: UF + "uft-service-box-open-v1.png", alt: "Underfloor service box with cover open" },
  ],
  typicals: [
    {
      src: UF + "uft-typical-gi-v1.png",
      alt: "Typical underfloor installation with GI trunking",
      caption: "Typical underfloor installation (GI UF trunking): junction box, trunking runs, service boxes, joints and vertical access box to 50H surface trunking.",
    },
    {
      src: UF + "uft-typical-upvc-v1.png",
      alt: "Typical underfloor installation with uPVC ducts",
      caption: "Typical underfloor installation (uPVC): duct runs slot into the junction box, service boxes and vertical access box; OHM brackets and end caps hold the runs.",
    },
  ],
  tabs: [
    {
      key: "upvc-duct",
      label: "uPVC Duct",
      families: [
        {
          code: "UFDL / UFDH",
          name: "Underfloor uPVC Duct",
          description:
            "Heavy gauge, high-impact uPVC ducting routed beneath finished floors or screeds, connecting service boxes, junction boxes and vertical access boxes.",
          specs: [
            "Heights: 25 mm (UFDL) or 38 mm (UFDH)",
            "Widths: 50 / 75 / 100 mm",
            "Wall thickness: 2.5 / 2.7 / 3.2 mm",
            "Standard length: 2.9 m",
            "Thickness tolerance: ±10%",
          ],
          image: UF + "uft-upvc-duct-v1.png",
        },
      ],
    },
    {
      key: "vertical-access-box",
      label: "Vertical Access Box",
      families: [
        {
          code: "UL-UVX",
          name: "UF Vertical Access Box",
          description:
            "Connects floor ducts or underfloor trunking to wall trunking, distribution boards or risers to upper floors. Type D has slots for uPVC ducts; type T couples end-to-end with GI underfloor trunking.",
          specs: [
            "Widths: 50 to 350 mm, 1 to 3 compartments",
            "Entry heights: 25 / 32 / 38 mm (L / M / H)",
            "Standard riser: 50H surface trunking",
            "Types: D (uPVC) or T (GI trunking)",
          ],
          image: UF + "uft-vab-v1.png",
        },
        {
          code: "UL-UVSX",
          name: "UF Vertical Access Box, Slanting",
          description:
            "Slanting version of the underfloor vertical access box for angled duct entries, in the same widths, compartments and entry heights as the standard box.",
          specs: [
            "Widths: 50 to 350 mm, 1 to 3 compartments",
            "Entry heights: 25 / 32 / 38 mm (L / M / H)",
            "Types: D (uPVC) or T (GI trunking)",
            "Thickness tolerance: ±10%",
          ],
          image: UF + "uft-vab-slanting-v1.png",
        },
      ],
    },
    {
      key: "metal-trunking",
      label: "Metal Trunking",
      families: [
        {
          code: "UL-UTX",
          name: "Underfloor Metal Trunking",
          description:
            "Galvanized steel trunking installed on a screed or concrete slab, remaining completely concealed beneath the finished floor.",
          specs: [
            "Depths: 25 / 32 / 38 mm",
            "Widths: 50 to 350 mm, 1 to 3 compartments",
            "Standard lengths: 2.44 m or 3.0 m",
            "Standard thickness: 1.6 mm",
            "Custom sizes and thicknesses on request",
          ],
          image: UF + "uft-trunking-v1.png",
        },
      ],
    },
    {
      key: "junction-box",
      label: "Junction Box",
      families: [
        {
          code: "UL-UJX",
          name: "Underfloor Junction Box",
          description:
            "The connection point for underfloor trunking or uPVC duct, functioning as a through, elbow, tee or cross box for directional changes in cable routing.",
          specs: [
            "Sizes: 125×125 to 325×325 mm, 1 to 3 compartments",
            "Entry heights: 25 / 32 / 38 mm",
            "Cover recess: 0 to 32 mm for floor finishes",
            "Finishes: GI/Grey cover with ABS or GI frame, or stainless steel (HD1 / HD2 / HD3)",
          ],
          image: UF + "uft-junction-box-v1.png",
        },
      ],
    },
    {
      key: "service-box",
      label: "Service Box",
      families: [
        {
          code: "UL-USX",
          name: "Underfloor Service Box",
          description:
            "Segregates power, data and telephone circuits at the workstation. Comprises a base box, cover and frame, and tailored service outlet plates; side plates come with pre-punched slots for the trunking entry.",
          specs: [
            "Sizes: 125×125 to 325×325 mm, plus 125×250 and 150×300 mm",
            "1 to 3 compartments",
            "Overall height: 56 to 85 mm, adjustable up to 150 mm",
            "Cover recess: 0 to 32 mm for carpet, tile or marble",
            "Finishes: GI/Grey with ABS or metal frame, or stainless steel (HD1 / HD2 / HD3)",
          ],
          image: UF + "uft-service-box-v1.png",
        },
        {
          code: "UL-USBTH",
          name: "Underfloor Service Box, Box Type",
          description:
            "Special box-type service box designed for optimised spacing, with conduit knock-out holes in the base box.",
          specs: [
            "Sizes: 125×125 to 300×300 mm, plus 125×250 and 150×300 mm",
            "1 to 3 compartments",
            "Heights: 60 / 70 / 80 / 90 / 100 / 110 mm and above",
          ],
          image: UF + "uft-service-box-boxtype-v1.png",
        },
      ],
    },
    {
      key: "accessories",
      label: "Accessories",
      families: [
        {
          code: "UL-UOHMX",
          name: "UF Trunking OHM Bracket",
          description:
            "Hold-down bracket that fixes underfloor trunking and uPVC duct runs to the slab before screeding.",
          specs: ["Widths: 150 to 350 mm", "Heights: 25 / 32 / 38 mm (L / M / H)"],
          image: UF + "uft-ohm-bracket-v1.png",
        },
        {
          code: "UL-UTJL",
          name: "UF Trunking Joint",
          description:
            "Coupling joint that connects underfloor trunking lengths end-to-end.",
          specs: ["Widths: 50 to 350 mm", "Heights: 25 / 32 / 38 mm (L / M / H)"],
          image: UF + "uft-joint-v1.png",
        },
      ],
      note: {
        title: "Leveling Screws & Box Height",
        lines: [
          "The leveling screw is the primary component for determining the overall height of junction and service boxes, followed by the floor finish and the height of the corner-block pillars (the trunking entry height).",
          "ULLS38 (M8 × 38 mm): box height 56 to 72 mm at 25H, 65 to 80 mm at 32H, 70 to 85 mm at 38H.",
          "ULLS48 (M8 × 48 mm): 66 to 82 mm at 25H, 75 to 90 mm at 32H, 80 to 95 mm at 38H.",
          "ULLS60 (M8 × 60 mm): 80 to 95 mm at 25H, 85 to 100 mm at 32H, 90 to 105 mm at 38H.",
          "ULLS95 (M8 × 95 mm): 110 to 125 mm at 25H, 120 to 135 mm at 32H, 125 to 140 mm at 38H.",
        ],
      },
    },
  ],
};

export const RAISEDFLOOR: FloorTrunkingSystem = {
  slug: "raisedfloor-trunking-systems",
  name: "Raisedfloor Trunking Systems",
  cartCategory: "Floor Trunking Distribution Systems",
  description: [
    "U-LI Raisedfloor Trunking Systems are designed for efficient integration beneath raisedfloor panels, typically arranged in a 600 × 600 mm grid layout.",
    "Each trunking cover measures 1220 mm in length with equal sections for easy access and maintenance. Covers come with pre-punched holes (ø20 mm or ø25 mm) for seamless termination of flexible conduits through adapters. Service outlet boxes integrate within the panels and can be relocated throughout the access flooring as the workspace changes.",
  ],
  features: [
    "Junction boxes in cross, tee and elbow configurations",
    "Header box installed at the top of the trunking to facilitate wiring connections to the service box",
    "Tap-off unit as a through or termination box for conduit branch-outs",
    "Pedestal box for surface-mounted service outlets",
    "Vertical access box managing final sub-circuits back to the distribution board",
  ],
  gallery: [
    { src: RF + "rft-listing-v1.png", alt: "Raisedfloor trunking with cover" },
    { src: RF + "rft-trunking-photo-v1.png", alt: "Raisedfloor trunking, epoxy powder coated" },
  ],
  typicals: [
    {
      src: RF + "rft-typical-v1.png",
      alt: "Typical raisedfloor installation",
      caption: "Typical raisedfloor installation: trunking runs between raisedfloor supports with junction boxes, header box, tap-off units, service boxes, pedestal boxes and a vertical access box to surface trunking.",
    },
  ],
  tabs: [
    {
      key: "trunking",
      label: "Trunking",
      families: [
        {
          code: "UL-RTH",
          name: "Raisedfloor Trunking",
          description:
            "Box trunking laid beneath raisedfloor panels. Covers run in equal 1220 mm sections with pre-punched holes for flexible conduit termination.",
          specs: [
            "Heights: 25 / 40 / 50 / 75 / 100 mm",
            "Widths: 100 to 500 mm, 1 to 3 compartments",
            "Standard length: 2440 mm",
            "Cover holes: ø20 or ø25 mm, pre-punched",
          ],
          image: RF + "rft-trunking-v1.png",
        },
      ],
    },
    {
      key: "vertical-access-box",
      label: "Vertical Access Box",
      families: [
        {
          code: "UL-RVH",
          name: "RF Vertical Access Box",
          description:
            "Manages all final sub-circuits returning to the distribution board, connecting raisedfloor trunking to wall or surface trunking.",
          specs: [
            "Widths: 100 to 500 mm, 1 to 3 compartments",
            "Heights: 25 / 40 / 50 / 75 / 100 mm",
            "Standard riser: 50H surface trunking",
          ],
          image: RF + "rft-vab-v1.png",
        },
        {
          code: "UL-RVSH",
          name: "RF Vertical Access Box, Slanting",
          description:
            "Slanting version of the raisedfloor vertical access box for angled entries, in the same widths and heights.",
          specs: [
            "Widths: 100 to 500 mm, 1 to 3 compartments",
            "Heights: 25 / 40 / 50 / 75 / 100 mm",
          ],
          image: RF + "rft-vab-slanting-v1.png",
        },
      ],
    },
    {
      key: "junction-box",
      label: "Junction Box",
      families: [
        {
          code: "UL-RJH",
          name: "Raisedfloor Junction Box",
          description:
            "Connects raisedfloor trunking runs in cross, tee or elbow configurations for versatile connectivity beneath the access floor.",
          specs: [
            "Sizes: 100×100 to 500×500 mm, 1 to 3 compartments",
            "Heights: 25 / 40 / 50 / 75 / 100 mm",
            "Types: X (cross), T (tee), L (elbow)",
          ],
          image: RF + "rft-junction-box-v1.png",
        },
      ],
    },
    {
      key: "service-box",
      label: "Service Box",
      families: [
        {
          code: "UL-RSH",
          name: "Raisedfloor Service Box",
          description:
            "Service outlet box securely integrated within the raisedfloor panel, easily relocated throughout the access flooring to adapt to changing workspace requirements.",
          specs: [
            "Sizes: 125×125 to 300×300 mm, plus 125×250, 150×300, 315×210 (STD) and 270×270 mm",
            "1 to 4 compartments",
            "Heights: 75 / 80 / 100 mm and others",
            "Cover & frame: GI/Grey metal or stainless steel",
          ],
          image: RF + "rft-service-box-v1.png",
        },
      ],
    },
    {
      key: "accessories",
      label: "Accessories",
      families: [
        {
          code: "UL-RHBH",
          name: "Raisedfloor Headed Box",
          description:
            "Installed at the top of the raisedfloor trunking to facilitate wiring connections to the service box.",
          specs: ["Sizes: 150×150 to 500×500 mm", "Heights: 25 / 40 / 50 / 75 / 100 mm"],
          image: RF + "rft-headed-box-v1.png",
        },
        {
          code: "UL-RTOUH",
          name: "Raisedfloor Tap Off Unit",
          description:
            "Serves as a through or termination box for conduit branch-outs, enhancing system efficiency.",
          specs: ["Sizes: 150×150 to 500×500 mm", "Heights: 40 / 50 / 75 / 100 / 150 mm"],
          image: RF + "rft-tap-off-v1.png",
        },
        {
          code: "UL-RTECH",
          name: "RF Trunking End Cap",
          description: "Closes off the open end of a raisedfloor trunking run.",
          specs: ["Widths: 100 to 500 mm", "Heights: 25 / 40 / 50 / 75 / 100 mm"],
          image: RF + "rft-end-cap-v1.png",
        },
        {
          code: "UL-RTJ",
          name: "RF Trunking Joint",
          description: "Coupling joint connecting raisedfloor trunking lengths. Supplied as a set of two.",
          specs: ["Heights: 25 / 40 / 50 / 75 / 100 mm", "1 set = 2 pcs"],
          image: RF + "rft-joint-v1.png",
        },
        {
          code: "UL-RPB",
          name: "Raisedfloor Tap Pedestal Box",
          description:
            "Surface-mounted pedestal box providing switch socket outlets above the access floor.",
          specs: ["Configurations: 1 / 2 / 3 / 4 / 8 gang, plus double gang"],
          image: RF + "rft-pedestal-box-v1.png",
        },
        {
          code: "UL-MBH",
          name: "Surface Metal Box",
          description:
            "Surface-mounted metal box for outlets and connections, available plain or with pre-punched holes.",
          specs: [
            "Sizes: 75×100 to 200×200 mm",
            "Heights: 50 / 75 / 100 mm and others",
            "Optional pre-punched holes (/h)",
          ],
          image: RF + "rft-surface-metal-box-v1.png",
        },
        {
          code: "UL-MBSC",
          name: "Surface Switch Centre",
          description: "Surface-mounted switch centre housing multiple switch gangs in one unit.",
          specs: ["Configurations: 2 / 3 / 4 / 5 / 6 / 8 / 10 gang"],
          image: RF + "rft-switch-centre-v1.png",
        },
      ],
    },
  ],
};

export const FLUSHFLOOR: FloorTrunkingSystem = {
  slug: "flushfloor-trunking-systems",
  name: "Flushfloor Trunking Systems",
  cartCategory: "Floor Trunking Distribution Systems",
  description: [
    "U-LI Flushfloor Trunking Systems distribute cabling throughout office spaces with the trunking flush to the finished floor. The system is tailored to the layout drawings and includes junction boxes, elbows, service outlets, reducers, vertical access risers and end caps.",
    "Main trunking (400 / 500 / 700 mm wide, fixed dividers) runs alongside sub trunking (280 / 300 mm wide, removable dividers), both in heights of 60, 65 and 73 mm. Optional smaller sizes of 32, 40 or 50 mm height and 100, 150 or 200 mm width are available for small-capacity designs.",
  ],
  features: [
    "Removable sectionalized separators run the full length of the trunking and lift out without special tools",
    "Intermediate supports prevent sagging in larger compartments",
    "Quick-fix cover design with stainless steel springs, studs and stoppers for easy removal and interchange of covers and service outlets",
    "Smooth fasteners throughout, preventing damage to wiring during installation",
    "Body, separators and junction box base in 1.6 mm pre-galvanized steel; covers 3.0 mm",
  ],
  gallery: [
    { src: FF + "fft-listing-v1.png", alt: "Flushfloor trunking with separators" },
    { src: FF + "fft-trunking-photo-v1.png", alt: "Flushfloor trunking with cover" },
  ],
  typicals: [
    {
      src: FF + "fft-typical-v1.png",
      alt: "Typical flushfloor installation",
      caption: "Typical flushfloor installation: main and sub trunking with tee junction boxes, service box, end cap, joints and a slanting vertical access riser to surface trunking.",
    },
  ],
  tabs: [
    {
      key: "trunking",
      label: "Trunking",
      families: [
        {
          code: "UL-FTH",
          name: "Flushfloor Trunking",
          description:
            "Single and multi-way ducts flush with the finished floor, in main trunking (fixed dividers) and sub trunking (removable dividers) configurations.",
          specs: [
            "Heights: 32 / 40 / 50 / 60 / 65 / 73 mm",
            "Widths: 100 to 700 mm, 1 to 3 compartments",
            "Standard length: 2440 mm; designated lengths 203 / 406 / 812 / 1220 mm",
            "Body 1.6 mm, cover 3.0 mm, tolerance ±10%",
          ],
          image: FF + "fft-trunking-v1.png",
        },
      ],
    },
    {
      key: "vertical-access-box",
      label: "Vertical Access Box",
      families: [
        {
          code: "UL-FVH",
          name: "FF Vertical Access Box, 90 Deg",
          description:
            "Rises from the flushfloor trunking to wall or surface trunking at 90 degrees.",
          specs: [
            "Widths: 100 to 700 mm, 1 to 3 compartments",
            "Heights: 32 / 40 / 50 / 60 / 65 / 73 mm",
            "Standard riser: 50H surface trunking",
          ],
          image: FF + "fft-vab-v1.png",
        },
        {
          code: "UL-FVSH",
          name: "FF Vertical Access Box, Slanting",
          description:
            "Slanting 45-degree version of the flushfloor vertical access box for angled riser entries.",
          specs: [
            "Widths: 100 to 700 mm, 1 to 3 compartments",
            "Heights: 32 / 40 / 50 / 60 / 65 / 73 mm",
          ],
          image: FF + "fft-vab-slanting-v1.png",
        },
      ],
    },
    {
      key: "junction-box",
      label: "Junction Box",
      families: [
        {
          code: "UL-FJH",
          name: "Flushfloor Junction Box",
          description:
            "Modular cross, tee and elbow junction boxes supplied with flyovers or dividers. Each compartment keeps 100% cable handling capacity with no obstruction from the flyover. Non-standard sizes can be customised, such as a 500 × 300 mm tee.",
          specs: [
            "Sizes: 100×100 to 700×700 mm, 1 to 3 compartments",
            "Heights: 32 / 40 / 50 / 60 / 65 / 73 mm",
            "Types: X (cross), T (tee), L (elbow)",
          ],
          image: FF + "fft-junction-box-v1.png",
        },
      ],
    },
    {
      key: "service-box",
      label: "Service Box",
      explainer: {
        title: "Typical Flushfloor Trunking with Service Box",
        image: FF + "fft-service-box-diagram-v1.png",
        caption: "The service box sits over the trunking run in place of a modular cover section; the 406 mm top cover is interchangeable with the trunking cover.",
      },
      families: [
        {
          code: "UL-FS",
          name: "Flushfloor Service Box Without Body",
          description:
            "Service outlet trap and frame mounting directly over flushfloor trunking of 60, 65 and 73 mm height. Pre-galvanized steel with epoxy powder coating and a 6 to 10 mm raised edge for trimming carpet or vinyl around the outlet.",
          specs: [
            "For trunking heights 60 / 65 / 73 mm",
            "Sizes: 280 or 300 mm wide × 406 mm long",
            "Trap & carpet trim frame: 250 × 250 or 270 × 270 mm",
            "2 or 3 compartments",
          ],
          image: FF + "fft-service-box-v1.png",
        },
        {
          code: "UL-FSH",
          name: "Flushfloor Service Box With Body",
          description:
            "Service box with its own body for use with flushfloor trunking systems of 32, 40 and 50 mm height.",
          specs: [
            "For trunking heights 32 / 40 / 50 mm",
            "Sizes: 280 or 300 mm wide × 406 mm long",
            "Trap & carpet trim frame: 250 × 250 or 270 × 270 mm",
            "2 or 3 compartments",
          ],
          image: FF + "fft-service-box-body-v1.png",
        },
      ],
    },
    {
      key: "accessories",
      label: "Accessories",
      families: [
        {
          code: "UL-FRH",
          name: "Flushfloor Trunking Reducer",
          description: "Steps a wider trunking run down to a narrower one within the same system.",
          specs: [
            "Combinations: 600-500 / 600-400 / 600-300 / 500-400 / 500-300 / 500-280 / 400-300 / 400-280",
            "Heights: 32 / 40 / 50 / 60 / 65 / 73 mm",
          ],
          image: FF + "fft-reducer-v1.png",
        },
        {
          code: "UL-FTECH",
          name: "Flushfloor Trunking End Cap",
          description: "Closes off the open end of a flushfloor trunking run.",
          specs: ["Widths: 100 to 600 mm", "Heights: 32 / 40 / 50 / 60 / 65 / 73 mm"],
          image: FF + "fft-end-cap-v1.png",
        },
        {
          code: "UL-FJ",
          name: "Flushfloor Trunking Joint",
          description: "Flat coupling joint connecting flushfloor trunking lengths end-to-end.",
          specs: ["Widths: 100 to 600 mm"],
          image: FF + "fft-joint-v1.png",
        },
        {
          code: "UL-FAJ",
          name: "Flushfloor Trunking Adjustable Joint",
          description:
            "Coupling joint with built-in leveling feet for height adjustment between trunking lengths.",
          specs: ["Widths: 100 to 600 mm"],
          image: FF + "fft-adjustable-joint-v1.png",
        },
      ],
    },
  ],
};

export const FLOOR_TRUNKING_SYSTEMS = [UNDERFLOOR, RAISEDFLOOR, FLUSHFLOOR];
