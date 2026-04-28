/**
 * Uploads a placeholder product image to Sanity and sets it on all 9 products.
 * Run once: node scripts/upload-product-image.mjs
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const PRODUCT_IDS = [
  "product-cable-trunking",
  "product-cable-tray-perforated",
  "product-cable-tray-solid-bottom",
  "product-cable-ladder",
  "product-wire-mesh-tray",
  "product-conduit-pipe-accessories",
  "product-unistrut-channel",
  "product-threaded-rod",
  "product-floor-trunking-steel",
];

async function run() {
  const imagePath = path.join(__dirname, "../public/images/products/placeholder.png");
  console.log("⬆️  Uploading placeholder image to Sanity...");

  const imageBuffer = fs.readFileSync(imagePath);
  const asset = await client.assets.upload("image", imageBuffer, {
    filename: "product-placeholder.png",
    contentType: "image/png",
  });
  console.log(`   ✓ Uploaded: ${asset._id}\n`);

  const imageRef = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };

  console.log(`→ Setting image on ${PRODUCT_IDS.length} products...`);
  for (const id of PRODUCT_IDS) {
    await client.patch(id).set({ image: imageRef }).commit();
    console.log(`   ✓ ${id}`);
  }

  console.log("\n✅ Done. All products now have the placeholder image in Sanity.");
}

run().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
