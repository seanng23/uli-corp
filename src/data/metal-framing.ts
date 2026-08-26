export type SpecTable = {
  title?: string;
  columns: string[];
  rows: (string | number)[][];
  footnotes?: string[];
};

export type ChannelProfile =
  | "single-deep"
  | "back-to-back-deep"
  | "quad"
  | "single-shallow"
  | "back-to-back-shallow";

export type ChannelVariant = {
  code: string;
  name: string;
  profile: ChannelProfile;
  pierced?: boolean;
  widthMm: number;
  heightMm: number;
  thicknessMm: number;
  weightKgPerM: number;
  description: string;
  beamLoad?: SpecTable;
  columnLoad?: SpecTable;
  notes?: string[];
};

export type ChannelSeries = {
  key: "ul1000" | "ul3300" | "pierced" | "stainless";
  label: string;
  blurb: string;
  elementsOfSection?: SpecTable;
  variants: ChannelVariant[];
};

export type FittingFamily =
  | "Flat Plate Fittings"
  | "Angular Fittings"
  | "U Shape Fittings"
  | "Z Shape Fittings"
  | "Beam Clamps"
  | "Post Base Plates"
  | "Accessories";

export type Fitting = {
  code: string;
  family: FittingFamily;
  description: string;
  specs?: string[];
  image: string;
  notes?: string[];
};

export const FINISHES: { name: string; detail: string }[] = [
  { name: "Hot-dip Galvanizing (HDG)", detail: "steel chemically cleaned of all contaminants then dipped in molten zinc; coating of iron/zinc-alloys usually over-coated with a layer of relatively pure zinc. Applied in accordance with ASTM A123:1989 / BS EN ISO 1461:2009(E) which supersedes BS729:1971. Zinc coating thickness varies from 45µm (up to 2mm thick material, for bolts and nuts) to 55µm (for at least 5mm thick material)." },
  { name: "Sheet Galvanizing (Pre-galvanized) (PG)", detail: "sheet metal (steel strip) hot-dip galvanized in a continuous process; even zinc coated sheet with bright smooth metallic finish. Steel is galvanized prior to manufacturing (roll-forming or press operations) of channels or fittings. All \"pre-galvanized\" steel used is in accordance with BS2989:1982 and usually grade Z275." },
  { name: "Stainless Steel 316", detail: "Channels and fittings manufactured from 316-S31 Marine Grade Stainless Steel to BS1449 Part2:1983 or BS970 Part1:1983. Specified for offshore, food and brewing environments. Channels cold rolled from 2.0mm or 2.5mm strip, standard length 6 metres. Keep stainless components separated from galvanized or coated mild steel: preferential (galvanic) corrosion occurs where stainless contacts some other metals." },
  { name: "Stainless Steel 304", detail: "General purpose stainless grade for indoor and less aggressive environments, available upon request. Same channel profiles and hardware range as the 316 system; may be subject to minimum order quantities." },
];

const BEAM_COLUMNS = [
  "Simply supported beam - Span (mm)",
  "load applied as UDL for stress - cum - stability criteria (kg)",
  "load applied as concentrated load for stress - cum - stability criteria (kg)",
  "load applied as UDL for deflection criteria - Span / 200 (kg)",
  "load applied as concentrated load for deflection criteria - Span / 200 (kg)",
];
const COLUMN_COLUMNS = [
  "Unbraced Column height (mm)",
  "K = 0.80 (kg)",
  "K = 1.00 (kg)",
  "K = 1.20 (kg)",
  "Safe total working load on column applied at the slot of the section (kg)",
];
const ELEMENT_COLUMNS = ["Channel", "Thickness mm", "Area of Section mm²", "Weight Steel kg/m", "I·10³ mm4 (X-X)", "z·10³ mm³ (X-X)", "r mm (X-X)", "I·10³ mm4 (Y-Y)", "z·10³ mm³ (Y-Y)", "r mm (Y-Y)"];
const ELEMENT_FOOTNOTE = ["L = Moment of Inertia; Z = Section Modulus; r = Radius of Gyration."];

export const CHANNEL_SERIES: ChannelSeries[] = [
  {
    key: "ul1000", label: "UL1000 Series", blurb: "Deep UliStrut® channels and welded combinations with 41.3mm-deep members.",
    elementsOfSection: { title: "Elements of Section", columns: ELEMENT_COLUMNS, rows: [
      ["UL1000", "2.50", 335.6, 2.75, 72.13, 3.13, 14.66, 91.77, 4.44, 16.54],
      ["UL1001", "2.50", 671.2, 5.52, 367.95, 8.91, 23.41, 183.54, 8.88, 16.54],
      ["UL1001-C41", "2.50", 1342.4, 11.02, 838.98, 19.38, 25.00, 1055.76, 24.38, 28.04],
    ], footnotes: ELEMENT_FOOTNOTE },
    variants: [
      { code: "UL1000", name: "Single Channel", profile: "single-deep", widthMm: 41.3, heightMm: 41.3, thicknessMm: 2.50, weightKgPerM: 2.7, description: "Single square U channel with inturned lips, 41.3 x 41.3mm.",
        beamLoad: { title: "Beam Loading Data UL1000", columns: BEAM_COLUMNS, rows: [[250,1409,704,1409,704],[500,704,352,704,352],[750,470,235,470,235],[1000,352,176,352,176],[1250,282,141,282,141],[1500,235,117,235,117],[1750,201,101,181,101],[2000,176,88,138,87],[2250,157,78,109,68],[2500,141,70,89,55],[2750,128,64,73,46],[3000,117,59,62,38]] },
        columnLoad: { title: "Column Loading Data UL1000", columns: COLUMN_COLUMNS, rows: [[250,4713,4663,4609,1353],[500,4493,4364,4223,1326],[750,4223,3988,3726,1289],[1000,3904,3535,3117,1238],[1250,3535,3005,2392,1166],[1500,3117,2392,1863,1061],[1750,2624,1938,1496,961],[2000,2192,1605,1226,871],[2250,1863,1352,1006,791],[2500,1605,1152,"823*",718],[2750,1397,971,"687*",643],[3000,1226,823,"584*",575]], footnotes: ["* KL/r exceeds 200"] } },
      { code: "UL1001", name: "Back-to-Back Channel", profile: "back-to-back-deep", widthMm: 41.3, heightMm: 82.6, thicknessMm: 2.50, weightKgPerM: 5.5, description: "Two UL1000 channels welded back-to-back with slots facing up and down.",
        beamLoad: { title: "Beam Loading Data UL1001", columns: BEAM_COLUMNS, rows: [[500,"787*","787*",787,787],[1000,"787*",501,787,501],[1500,668,334,668,334],[2000,501,251,501,251],[2500,401,200,401,200],[3000,334,167,314,167],[3500,286,143,231,143],[4000,251,125,177,110],[4500,223,111,140,87],[5000,200,100,113,71],[5500,182,91,93,58],[6000,167,84,78,49]], footnotes: ["* Limited by weld shear"] },
        columnLoad: { title: "Column Loading Data UL1001", columns: COLUMN_COLUMNS, rows: [[500,9095,8878,8642,2261],[1000,8110,7502,6815,2160],[1500,6815,5622,4401,1971],[2000,5159,3807,2936,1688],[2500,3807,2765,2072,1447],[3000,2936,2072,"1465*",1231],[3500,2330,"1545*","1099*",1023],[4000,1831,"1202*","861*",861],[4500,"1465*","968*","699*",734],[5000,"1202*","800*","",633],[5500,"1009*","674*","",553],[6000,"861*","","",""]], footnotes: ["* KL/r exceeds 200"] } },
      { code: "UL1001-C41", name: "Four-Channel Combination", profile: "quad", widthMm: 82.6, heightMm: 82.6, thicknessMm: 2.50, weightKgPerM: 11, description: "Four UL1000 channels in a 2x2 combination, overall 82.6 x 82.6mm.",
        beamLoad: { title: "Beam Loading Data UL1001-C41", columns: BEAM_COLUMNS, rows: [[500,"1616*","1616*",1616,1616],[1000,"1616*",1090,1616,1090],[1500,1454,727,1454,727],[2000,1090,545,1090,545],[2500,872,436,872,436],[3000,727,363,727,363],[3500,623,311,623,311],[4000,545,273,545,273],[4500,485,242,485,242],[5000,436,218,412,218],[5500,396,198,341,198],[6000,363,182,286,179]], footnotes: ["* Limited by weld shear"] },
        columnLoad: { title: "Column Loading Data UL1001-C41", columns: COLUMN_COLUMNS, rows: [[500,"-","-","-","-"],[1000,"-","-","-","-"],[1500,"-","-","-","-"],[2000,14618,12708,10424,4209],[2500,12708,9870,7695,3843],[3000,10424,7695,5939,3462],[3500,8464,6186,4714,3120],[4000,7031,5079,3716,2811],[4500,5939,4204,"2972*",2521],[5000,5079,"3438*","2439*",2223],[5500,4385,"2871*","2045*",1971],[6000,3716,"2439*","1746*",1758]], footnotes: ["* KL/r exceeds 200"] } },
    ],
  },
  {
    key: "ul3300", label: "UL3300 Series", blurb: "Shallow UliStrut® channels and a welded back-to-back combination.",
    elementsOfSection: { title: "Elements of Section", columns: ELEMENT_COLUMNS, rows: [["UL3300",2.5,232.1,1.97,11.86,0.98,7.15,52.76,2.55,15.05],["UL3301",2.5,464.2,3.91,56.91,2.76,11.07,105.52,5.11,15.05]], footnotes: ELEMENT_FOOTNOTE },
    variants: [
      { code: "UL3300", name: "Single Shallow Channel", profile: "single-shallow", widthMm: 41.3, heightMm: 20.6, thicknessMm: 2.5, weightKgPerM: 1.97, description: "Single shallow U channel, 41.3 wide x 20.6 deep, with inturned lips.",
        beamLoad: { title: "Beam Loading Data UL3300", columns: BEAM_COLUMNS, rows: [[250,441,221,441,221],[500,221,110,221,110],[750,147,74,147,74],[1000,110,55,91,55],[1250,88,44,58,36],[1500,74,37,40,25],[1750,63,32,30,19],[2000,55,28,23,14],[2250,49,25,18,11],[2500,44,22,15,9],[2750,40,20,12,8],[3000,37,18,10,6]] },
        columnLoad: { title: "Column Loading Data UL3300", columns: COLUMN_COLUMNS, rows: [[250,3099,3007,2905,821],[500,2676,2410,2109,769],[750,2190,1600,1245,662],[1000,1465,1071,816,550],[1250,1071,766,"543*",457],[1500,816,"543*","386*",367],[1750,619,"407*","291*",299],[2000,"481*","318*","230*",248],[2250,"386*","258*","-",210],[2500,"318*","214*","-",180],[2750,"268*","-","-","-"],[3000,"229*","-","-","-"]], footnotes: ["* KL/r exceeds 200"] } },
      { code: "UL3301", name: "Back-to-Back Shallow Channel", profile: "back-to-back-shallow", widthMm: 41.3, heightMm: 41.3, thicknessMm: 2.5, weightKgPerM: 3.91, description: "Two UL3300 shallow channels welded back-to-back, overall 41.3 x 41.3mm.",
        beamLoad: { title: "Beam Loading Data UL3301", columns: BEAM_COLUMNS, rows: [[250,"381*","381*",381,381],[500,"381*",311,381,311],[750,"381*",207,381,207],[1000,311,155,311,155],[1250,248,124,248,124],[1500,207,104,194,104],[1750,177,89,143,89],[2000,155,78,109,68],[2250,138,69,86,54],[2500,124,62,70,44],[2750,113,56,58,36],[3000,104,52,49,30]], footnotes: ["* Limited by weld shear"] },
        columnLoad: { title: "Column Loading Data UL3301", columns: COLUMN_COLUMNS, rows: [[250,6248,6328,6219,1452],[500,5980,5712,5413,1417],[750,5413,4908,4337,1361],[1000,4725,3909,3060,1271],[1250,3909,2894,2242,1141],[1500,3060,2242,1714,1024],[1750,2473,1788,1315,918],[2000,2042,1444,"1020*",817],[2250,1714,"1153*","819*",715],[2500,1444,"945*","674*",629],[2750,1203,"791*","567*",557],[3000,"1020*","674*","487*",497]], footnotes: ["* KL/r exceeds 200", "The printed 250mm row shows K=0.80 value 6248 lower than K=1.00 value 6328; recorded exactly as printed."] } },
    ],
  },
  {
    key: "pierced", label: "Pierced Channels (T)", blurb: "Single deep and shallow channels pierced with oblong slots along the back face.",
    elementsOfSection: { title: "Elements of Section", columns: ELEMENT_COLUMNS, rows: [["UL1000T","2.50",310.6,2.5,64.31,2.96,14.39,91.56,4.43,17.17],["UL3300T","2.50",207.1,1.65,10.39,0.92,7.08,52.55,2.54,15.93]], footnotes: ELEMENT_FOOTNOTE },
    variants: [
      { code: "UL1000T", name: "Pierced Deep Channel", profile: "single-deep", pierced: true, widthMm: 41.3, heightMm: 41.3, thicknessMm: 2.50, weightKgPerM: 2.5, description: "Same cross-section as UL1000, pierced with 14 x 28mm or 10 x 28mm slots at 50mm centers along the back face.", notes: ["UL1000T and UL3300T slots are 14 x 28mm or 10 x 28mm at 50mm centers"],
        beamLoad: { title: "Beam Loading Data UL1000T", columns: BEAM_COLUMNS, rows: [[250,1332,666,1332,666],[500,666,333,666,333],[750,444,222,444,222],[1000,333,167,333,167],[1250,266,133,266,133],[1500,222,111,220,111],[1750,190,95,161,95],[2000,167,83,123,77],[2250,148,74,98,61],[2500,133,67,79,49],[2750,121,61,65,41],[3000,111,56,55,34]] },
        columnLoad: { title: "Column Loading Data UL1000T", columns: COLUMN_COLUMNS, rows: [[250,4359,4311,4260,1328],[500,4150,4027,3893,1299],[750,3893,3670,3419,1260],[1000,3589,3238,2839,1205],[1250,3238,2731,2159,1127],[1500,2839,2159,1680,1016],[1750,2369,1748,1347,915],[2000,1978,1447,1103,825],[2250,1680,1217,898,744],[2500,1447,1035,"735*",672],[2750,1258,867,"614*",597],[3000,1103,"735*","523*",531]], footnotes: ["* KL/r exceeds 200"] } },
      { code: "UL3300T", name: "Pierced Shallow Channel", profile: "single-shallow", pierced: true, widthMm: 41.3, heightMm: 20.6, thicknessMm: 2.50, weightKgPerM: 1.65, description: "Same cross-section as UL3300, pierced with 14 x 28mm or 10 x 28mm slots at 50mm centers along the back face.", notes: ["UL1000T and UL3300T slots are 14 x 28mm or 10 x 28mm at 50mm centers"],
        beamLoad: { title: "Beam Loading Data UL3300T", columns: BEAM_COLUMNS, rows: [[250,414,207,414,207],[500,207,104,207,104],[750,138,69,138,69],[1000,104,52,80,50],[1250,83,41,51,32],[1500,69,35,35,22],[1750,59,30,26,16],[2000,52,26,20,12],[2250,46,23,16,10],[2500,41,21,13,8],[2750,38,19,11,7],[3000,35,17,9,6]] },
        columnLoad: { title: "Column Loading Data UL3300T", columns: COLUMN_COLUMNS, rows: [[250,2762,2678,2587,802],[500,2379,2138,1865,746],[750,1865,1409,1095,632],[1000,1290,942,717,517],[1250,942,673,"475*",424],[1500,717,"475*","338*",336],[1750,542,"356*","255*",272],[2000,"421*","279*","202*",224],[2250,"338*","226*","-",198],[2500,"279*","-","-","-"],[2750,"235*","-","-","-"],[3000,"200*","-","-","-"]], footnotes: ["* KL/r exceeds 200"] } },
    ],
  },
];

export const LENGTH_OPTIONS: string[] = ["3000", "6000"];
export const THICKNESS_NOTE: string = "Standard steel thickness for mild steel channels shown: 2.50mm. Stainless concrete-insert channels: 2.0mm or 2.5mm strip, standard length 6 metres.";

export const FITTING_FAMILIES: FittingFamily[] = ["Flat Plate Fittings", "Angular Fittings", "U Shape Fittings", "Z Shape Fittings", "Beam Clamps", "Post Base Plates", "Accessories"];
const IMG = "/images/products/metal-framing/fittings/";

export const FITTINGS: Fitting[] = [
  { code:"UL1062",family:"Flat Plate Fittings",description:"single-hole flat square washer plate sitting on channel face (square plate washer)",specs:["Bolt Size M8","Hole Ø 9mm","40mm plate width"],image:IMG+"ul1062-v3.png" },
  { code:"UL1063",family:"Flat Plate Fittings",description:"single-hole flat square washer plate sitting on channel face (square plate washer)",specs:["Bolt Size M10","Hole Ø 11mm","40mm plate width"],image:IMG+"ul1062-v3.png" },
  { code:"UL1064",family:"Flat Plate Fittings",description:"single-hole flat square washer plate sitting on channel face (square plate washer)",specs:["Bolt Size M12","Hole Ø 14mm","40mm plate width"],image:IMG+"ul1062-v3.png" },
  { code:"UL1065",family:"Flat Plate Fittings",description:"2-hole straight splice plate joining two channels end to end",specs:["89mm length"],image:IMG+"ul1065-v2.png" },
  { code:"UL1066",family:"Flat Plate Fittings",description:"3-hole straight splice plate",specs:["137mm length"],image:IMG+"ul1066-v3.png" },
  { code:"UL1067",family:"Flat Plate Fittings",description:"4-hole straight splice plate",specs:["185mm length"],image:IMG+"ul1067-v2.png" },
  { code:"UL1036",family:"Flat Plate Fittings",description:"3-hole 90-degree corner (L-shape) flat plate",specs:["89 x 89mm leg lengths"],image:IMG+"ul1036-v3.png" },
  { code:"UL1031",family:"Flat Plate Fittings",description:"4-hole T-shape flat plate (3 holes across the bar, 1 hole on the stem)",specs:["137mm bar length x 89mm overall depth"],image:IMG+"ul1031-v2.png" },
  { code:"UL1028",family:"Flat Plate Fittings",description:"5-hole cross (+) shape flat plate (4 arm holes + centre hole)",specs:["137 x 137mm"],image:IMG+"ul1028-v3.png" },
  { code:"UL1358",family:"Flat Plate Fittings",description:"4-hole tapered/triangular gusset flat plate (2 holes at wide top edge, 2 holes down the tapering stem)",specs:["89mm top width x 137mm height"],image:IMG+"ul1358-v2.png" },
  { code:"UL1068",family:"Angular Fittings",description:"2-hole 90-degree angle bracket (1 hole per leg)",specs:["41 x 58mm"],image:IMG+"ul1068-v3.png" },
  { code:"UL1026",family:"Angular Fittings",description:"2-hole 90-degree angle bracket, wider/squat profile (1 hole per leg)",specs:["51 x 47mm"],image:IMG+"ul1026-v2.png" },
  { code:"UL1326",family:"Angular Fittings",description:"3-hole 90-degree angle bracket: 1 hole on short leg, 2 holes on long leg",specs:["41 x 105mm","hole offset 36.5mm"],image:IMG+"ul1326-v3.png" },
  { code:"UL1325",family:"Angular Fittings",description:"4-hole 90-degree angle bracket: 2 holes on top leg, 2 holes on long down leg",specs:["89 x 105mm","hole offset 36.5mm"],image:IMG+"ul1325-v2.png" },
  { code:"UL1749",family:"Angular Fittings",description:"2-hole 90-degree angle bracket with slotted hole on one leg",specs:["66 x 51mm","base 38mm"],image:IMG+"ul1749-v2.png" },
  { code:"UL1747",family:"Angular Fittings",description:"3-hole 90-degree angle bracket, long horizontal leg with 2 holes + slotted vertical leg",specs:["66mm","98mm long leg","base 38mm"],image:IMG+"ul1747-v2.png" },
  { code:"UL1359",family:"Angular Fittings",description:"3-hole gusseted (tapered fin) 90-degree bracket: 2 holes on tall tapered face, 1 hole on top flange",specs:["89mm top","41mm flange","105mm height"],image:IMG+"ul1359-v2.png" },
  { code:"UL1130",family:"Angular Fittings",description:"Gusseted shelf/support bracket, triangular web, slotted holes in base (2 slots) and 2 holes in upright face",specs:["93mm upright height","47mm base width","38 and 38mm slot spacings"],image:IMG+"ul1130-v2.png" },
  { code:"UL1131",family:"Angular Fittings",description:"Gusseted shelf/support bracket, triangular web, slotted holes in base (2 slots) and 2 holes in upright face",specs:["93mm upright height","47mm base width","38 and 38mm slot spacings"],image:IMG+"ul1130-v2.png" },
  { code:"UL1713",family:"Angular Fittings",description:"Cranked/offset cantilever bracket with slotted hole in the angled face and hole in top flange (supports square tube off channel face)",specs:["57mm upright","89mm top reach","63mm slot face","89mm base"],image:IMG+"ul1713-v2.png" },
  { code:"UL1186-45°",family:"Angular Fittings",description:"2-hole 45-degree angle bracket (acute; braces a diagonal channel onto a horizontal one)",specs:["77mm long leg","64mm base leg"],image:IMG+"ul1186-45-v2.png" },
  { code:"UL1546-45°",family:"Angular Fittings",description:"2-hole 135-degree obtuse (45-degree brace) angle bracket",specs:["72mm diagonal leg","55mm base leg"],image:IMG+"ul1546-45-v2.png" },
  { code:"UL1033",family:"Angular Fittings",description:"4-hole two-plane wing bracket: 3-hole vertical plate + 1-hole perpendicular wing (channel-to-channel cross connection)",specs:["47 x 137mm"],image:IMG+"ul1033-v2.png" },
  { code:"UL1035",family:"Angular Fittings",description:"4-hole two-plane corner wing bracket (2 holes vertical plane, 2 holes horizontal plane), left-hand",specs:["89mm","89mm","47mm"],image:IMG+"ul1035-v2.png" },
  { code:"UL1034",family:"Angular Fittings",description:"4-hole two-plane corner wing bracket, right-hand mirror of UL1035",specs:["89mm","89mm","47mm"],image:IMG+"ul1034-v2.png" },
  { code:"UL1331",family:"Angular Fittings",description:"3-hole gusseted corner bracket with triangular web, left-hand (2 holes on tall face, 1 on top flange)",specs:["89mm top","41mm flange","105mm height"],image:IMG+"ul1331-v2.png" },
  { code:"UL1332",family:"Angular Fittings",description:"3-hole gusseted corner bracket, right-hand mirror of UL1331",specs:["41mm","89mm","105mm"],image:IMG+"ul1332-v2.png" },
  { code:"UL4376",family:"U Shape Fittings",description:"2-hole U fitting (channel-width saddle straddling a channel end, holes through both side faces)",specs:["89mm height"],image:IMG+"ul4376-v2.png" },
  { code:"UL4376-A",family:"U Shape Fittings",description:"3-hole U fitting",specs:["137mm height"],image:IMG+"ul4376-a-v2.png" },
  { code:"UL4377",family:"U Shape Fittings",description:"4-hole U fitting",specs:["185mm height"],image:IMG+"ul4377-v2.png" },
  { code:"UL1377",family:"U Shape Fittings",description:"4-hole U fitting, wide-throat version (for deeper/back-to-back channel)",specs:["185mm height"],image:IMG+"ul1377-v2.png" },
  { code:"UL4047",family:"U Shape Fittings",description:"3-hole hat/bridge fitting: shallow U bridging over a channel, one hole on top + one on each foot",specs:["136mm overall length","20mm bridge height","43mm throat width"],image:IMG+"ul4047-v2.png" },
  { code:"UL1047",family:"U Shape Fittings",description:"3-hole hat/bridge fitting, taller bridge (clears a full channel)",specs:["136mm overall length","41mm bridge height","43mm throat width"],image:IMG+"ul1047-v2.png" },
  { code:"UL1737",family:"U Shape Fittings",description:"Deep U (staple) bracket wrapping over a channel to join two crossing channels; slotted feet",specs:["43mm throat width","47mm foot","82mm depth/height"],image:IMG+"ul1737-v2.png" },
  { code:"UL2346",family:"U Shape Fittings",description:"5-hole deep box/U wrap-over fitting: 1 hole in top plate + 2 holes in each side face",specs:["137mm top length","47mm top hole offset","96mm height","43 x 41mm throat"],image:IMG+"ul2346-v2.png" },
  { code:"ULZB01 (N) - TYPE: UL / L-CP",family:"Z Shape Fittings",description:"Hold-down clamp with fixture, clamping a cable ladder to a Ulistrut support",image:IMG+"ulzb01-v2.png" },
  { code:"UL4045",family:"Z Shape Fittings",description:"2-hole Z (offset) fitting, shallow offset, joining two crossing channels",specs:["20mm offset height","27mm step","89mm overall length"],image:IMG+"ul4045-v2.png" },
  { code:"UL1045",family:"Z Shape Fittings",description:"2-hole Z (offset) fitting, channel-depth offset",specs:["41mm offset height","27mm step","48mm leg length"],image:IMG+"ul1045-v2.png" },
  { code:"UL1272",family:"Beam Clamps",description:"C-shaped clamp hooking channel lip to beam flange",specs:["32mm jaw width","37mm height","35mm depth"],image:IMG+"ul1272-v2.png",notes:["M12 x 45 Cone Point Screw"] },
  { code:"UL1271",family:"Beam Clamps",description:"Deep-throat C/G-shaped beam clamp with cone point screw",specs:["37mm jaw","80mm throat height","10mm lip","40mm base"],image:IMG+"ul1271-v2.png",notes:["M12 x 45 Cone Point Screw"] },
  { code:"UL1796",family:"Beam Clamps",description:"Channel-to-beam-flange wrap clamp (hooks over beam flange, cradles channel)",specs:["51mm","89mm height","89mm base length"],image:IMG+"ul1796-v2.png" },
  { code:"UL1379S",family:"Beam Clamps",description:"Flat hook-plate beam clamp holding channel to beam flange; set screw bears on flange",specs:["25mm hook height","83mm plate length","10mm thickness/step"],image:IMG+"ul1379s-v2.png",notes:["M12 x 35mm Set Screw Included","Clamp Requires M12 x 25mm Hex Head Cap Screw and M12 Channel Nut Not Included."] },
  { code:"UL1386",family:"Beam Clamps",description:"J-hook style beam clamp (hooked strap over flange down to channel)",specs:["13mm hook","48mm drop length","6.0mm thickness"],image:IMG+"ul1386-v2.png",notes:["Clamp Requires M12 x 35mm Hex Head Cap Screw and M12 Channel Nut Not Included."] },
  { code:"UL2785",family:"Beam Clamps",description:"U-bolt beam clamp: saddle plate + U-bolt securing a single channel under a beam flange",specs:["6.0mm plate thickness","22mm U-bolt spread","86mm saddle height","76mm length"],image:IMG+"ul2785-v2.png",notes:["M10 Hex Nuts and 'U' Bolt Included","Design Load: 500kg. Use in Pairs Only. For use with Beams up to (19.1), Thick Flanges and with Channels UL1000, UL3300 and UL3301."] },
  { code:"UL2786",family:"Beam Clamps",description:"U-bolt beam clamp, deep version for back-to-back channel",specs:["6.0mm plate thickness","22mm U-bolt spread","127mm saddle height","76mm length"],image:IMG+"ul2786-v2.png",notes:["M10 Hex Nuts and 'U' Bolt Included.","Design Load: 500kg. Use in Pairs Only. For use with Beams up to (19.1), Thick Flanges and with Channels UL1001."] },
  { code:"UL2072",family:"Post Base Plates",description:"U-cradle (3-sided) upstand welded to square base plate, for single channel (UL1000 series); 2 side holes",specs:["41mm upstand","6.0mm plate","plan 152/76/76","4 holes 14 dia"],image:IMG+"ul2072-v3.png" },
  { code:"UL2072A",family:"Post Base Plates",description:"Same U-cradle, tall upstand; 4 side holes (2 per face)",specs:["89mm upstand","6.0mm plate","plan 152/76/76","4 holes 14 dia"],image:IMG+"ul2072a-v3.png" },
  { code:"UL2073",family:"Post Base Plates",description:"U-cradle for UL1001 Series (back-to-back channel), wide throat; labelled UL1001 Series",specs:["41mm upstand","6.0mm plate","plan 152/76/76","4 holes 14 dia"],image:IMG+"ul2073-v3.png" },
  { code:"UL2073A",family:"Post Base Plates",description:"Tall U-cradle for UL1001 Series",specs:["89mm upstand","6.0mm plate","plan 152/76/76","4 holes 14 dia"],image:IMG+"ul2073a-v3.png" },
  { code:"UL2074",family:"Post Base Plates",description:"L/angle-style (2-sided) upstand welded to square base plate, single channel",specs:["41mm upstand","6.0mm plate","plan 152/76/76","4 holes 14 dia"],image:IMG+"ul2074-v3.png" },
  { code:"UL2074A",family:"Post Base Plates",description:"Tall L/angle-style upstand",specs:["89mm upstand","6.0mm plate","plan 152/76/76","4 holes 14 dia"],image:IMG+"ul2074a-v3.png" },
  { code:"UL2075",family:"Post Base Plates",description:"L/angle-style upstand for UL1001 Series; labelled UL1001 Series",specs:["41mm upstand","6.0mm plate","plan 152/76/76","4 holes 14 dia"],image:IMG+"ul2075-v3.png" },
  { code:"UL2075A",family:"Post Base Plates",description:"Tall L/angle-style upstand for UL1001 Series",specs:["89mm upstand","6.0mm plate","plan 152/76/76","4 holes 14 dia"],image:IMG+"ul2075a-v3.png" },
  { code:"UL1184PVC",family:"Accessories",description:"Snap-in PVC closure strip; clips into the channel slot to close the open face on exposed or trunking runs",specs:["1.6mm PVC","Grey or White","3000mm length"],image:IMG+"ul1184pvc-v2.png" },
  { code:"FU-EC21.41-PVC-WE",family:"Accessories",description:"PVC end cap for shallow 21 x 41 channel (UL3300 profile); fits over the cut channel end",image:IMG+"fu-ec2141-v2.png" },
  { code:"FU-EC41.41-PVC-WE",family:"Accessories",description:"PVC end cap for 41 x 41 channel (UL1000 profile); fits over the cut channel end",image:IMG+"fu-ec4141.png" },
  { code:"UL2335",family:"Accessories",description:"Channel hanger; wraps the channel and takes a threaded rod from above to suspend a channel run",image:IMG+"accessories-assembly.png" },
  { code:"UL2540",family:"Accessories",description:"Fluorescent adapter; locks into the channel slot with a spring nut to hang a light fitting beneath the channel",image:IMG+"accessories-assembly.png" },
];

export type CatalogueItem = {
  code: string;
  description: string;
  specs?: string[];
  image: string;
};

const CB = "/images/products/metal-framing/cantilever/";
export const CANTILEVER_BRACKETS: CatalogueItem[] = [
  { code:"UL254",description:"Single channel cantilever arm welded to a 9mm backing plate (50mm wide, 120mm high)",specs:["Arm lengths 150 / 200 / 250 / 350 / 450 / 550 / 600 / 650mm"],image:CB+"cb-ul254.png" },
  { code:"UL254S",description:"Single channel cantilever arm with 45-degree raker brace, on a 9mm backing plate",specs:["Arm lengths 650 / 800 / 850 / 1050mm"],image:CB+"cb-ul254s.png" },
  { code:"UL254 Double",description:"Double channel cantilever arm welded to a 9mm backing plate",specs:["Arm lengths 650 / 800 / 850 / 1050mm"],image:CB+"cb-ul254d.png" },
  { code:"UL251",description:"Single channel cantilever arm on a narrow 9mm backing plate (40mm wide, 90mm high)",specs:["Arm lengths 150 / 200 / 250 / 350 / 450 / 550 / 600 / 650mm"],image:CB+"cb-ul251.png" },
  { code:"UL223",description:"Single channel cantilever arm on a 6mm backing plate that slots over the upright channel",specs:["Arm lengths 150 / 200 / 250 / 350mm"],image:CB+"cb-ul223.png" },
  { code:"UL223A",description:"Single channel cantilever arm on a 6mm backing plate, longer arm range",specs:["Arm lengths 450 / 550 / 600 / 650mm"],image:CB+"cb-ul223a.png" },
  { code:"UL2491 - UL2500",description:"Flat triangular gusset cantilever bracket bolted through the channel face; left-hand and right-hand versions",specs:["Arm lengths 153 / 229 / 305 / 381 / 457 / 609mm","L = left hand, R = right hand"],image:CB+"cb-ul2491.png" },
  { code:"UL254/A1",description:"Angular cantilever arm on a 9mm backing plate; for inclined faces and channel concrete inserts",specs:["Arm lengths 150 / 200 / 250 / 350 / 450 / 550 / 600 / 650mm","Various angles available"],image:CB+"cb-ul254a1-v2.png" },
  { code:"UL254/A2",description:"Angular cantilever arm with raker brace, on a 9mm backing plate",specs:["Arm lengths 650 / 800 / 850 / 1050mm","Various angles available"],image:CB+"cb-ul254a2-v2.png" },
  { code:"UL254/A3",description:"Angular double channel cantilever arm on a 9mm backing plate",specs:["Arm lengths 650 / 800 / 850 / 1050mm","Various angles available"],image:CB+"cb-ul254a3-v2.png" },
];

const CI = "/images/products/metal-framing/inserts/";
export const CONCRETE_INSERTS: CatalogueItem[] = [
  { code:"UL33/C",description:"Cast-in channel concrete insert with welded anchors; takes UliStrut® fittings without drilling into the structure",specs:["41 x 56mm profile, 2.5mm thick","Insert lengths 200 - 2000mm","Other insert lengths available"],image:CI+"ci-ul33c-v2.png" },
  { code:"UL10/C",description:"Cast-in channel concrete insert with welded anchors, deep UL1000-profile channel",specs:["41 x 76mm profile, 2.5mm thick","Insert lengths 200 - 2000mm","Other insert lengths available"],image:CI+"ci-ul10c-v2.png" },
];

const FA = "/images/products/metal-framing/fasteners/";
export const FASTENERS: CatalogueItem[] = [
  { code:"Long Spring Nut",description:"Spring nut with long spring; toothed grooves bite into the channel return lips for slip and pull-out resistance",specs:["Thread sizes M6 / M8 / M10 / M12"],image:FA+"fa-springnut-long.png" },
  { code:"Short Spring Nut",description:"Spring nut with short spring; same toothed grip on the channel return lips",specs:["Thread sizes M6 / M8 / M10 / M12"],image:FA+"fa-springnut-short.png" },
  { code:"UL2663S",description:"Hex head set screw, Grade 8.8 or Grade 4.6",specs:["M6 / M8 / M10 / M12","Lengths 20 - 70mm"],image:FA+"fa-ul2663s.png" },
  { code:"UL2542S",description:"Slotted round head machine screw",specs:["M6","Lengths 12 / 20 / 25mm"],image:FA+"fa-ul2542s-v2.png" },
  { code:"UL2542 Double",description:"Hex head screw with cone point",specs:["M10 / M12","Length 45mm"],image:FA+"fa-ul2542d.png" },
  { code:"Threaded Rod",description:"Continuous threaded rod, Grade 4.6",specs:["M6 / M8 / M10 / M12","2000mm lengths"],image:FA+"fa-threaded-rod.png" },
  { code:"Flat Washer",description:"Flat round washer",specs:["M6 / M8 / M10 / M12"],image:FA+"fa-flat-washer.png" },
  { code:"Spring Washer",description:"Single coil spring lock washer",specs:["M6 / M8 / M10 / M12"],image:FA+"fa-spring-washer.png" },
  { code:"Fender Washer",description:"Large outside-diameter washer for spreading load over slots",specs:["M6 / M8 / M10 / M12"],image:FA+"fa-fender-washer.png" },
  { code:"Hex Nut",description:"Hexagon nut, Grade 8 or Grade 4",specs:["M6 / M8 / M10 / M12"],image:FA+"fa-hex-nut.png" },
  { code:"Coupling Nut",description:"Hex coupling nut for joining lengths of threaded rod",specs:["M6 x 25 / M8 x 25 / M10 x 30 / M12 x 30mm"],image:FA+"fa-coupling-nut.png" },
];

const CL = "/images/products/metal-framing/clamps/";
export const CLAMPS: CatalogueItem[] = [
  { code:"UL2400",description:"Offset hanger bracket for pipe clamp assemblies",specs:["Hole size 14mm","Material 40 x 6mm"],image:CL+"cl-ul2400.png" },
  { code:"UL2239 Series",description:"Two-bolt split pipe clamp with offset hanger bracket",specs:["Nominal bores 50 - 300mm (UL2239/20 - UL2239/120)"],image:CL+"cl-ul2239-v2.png" },
  { code:"SS Series",description:"Saddle pipe clamp; bolts to the channel slot over the pipe",specs:["Nominal bores 15 - 200mm (SS1 - SS1/12)"],image:CL+"cl-ss-series.png" },
  { code:"K Series",description:"K pipe / cable clamp; jaw hooks over cable ladder rungs or UliStrut® channel",specs:["Pipe / cable diameter 14 - 78mm (K2026 - K2044)"],image:CL+"cl-k-clamp.png" },
  { code:"U Series",description:"U pipe / cable clamp with serrated jaw; fits cable ladder rungs and angle iron",specs:["Pipe / cable diameter 14 - 78mm (U2026 - U2044)"],image:CL+"cl-u-clamp.png" },
  { code:"Two-Piece Clamps",description:"Two-piece pipe / cable clamp; halves interlock around the pipe and lock into the channel slot",specs:["Pipe diameter 7.5 - 285mm","Standard finish Pre-galvanized (PG)"],image:CL+"cl-two-piece.png" },
  { code:"UL75 Series",description:"Swivel loop hanger; suspends pipe from a threaded rod",specs:["Nominal bores 15 - 200mm (UL75/15 - UL75/200)","Standard finish Pre-galvanized (PG)"],image:CL+"cl-ul75.png" },
];
