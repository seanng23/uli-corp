import path from "node:path";
import sharp from "sharp";

const SRC = "Assets/ASSETS/U-li Metal Framing System.png";
const OUTPUT = "public/images/products/metal-framing-v1.png";
const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1080;
const PRODUCT_BOX = { left: 70, top: 70, width: 940, height: 940 };

function alphaBbox(data, width, height, window = {}) {
  const left = Math.max(0, window.left ?? 0);
  const top = Math.max(0, window.top ?? 0);
  const right = Math.min(width, window.right ?? width);
  const bottom = Math.min(height, window.bottom ?? height);
  let minX = right;
  let minY = bottom;
  let maxX = -1;
  let maxY = -1;

  for (let y = top; y < bottom; y += 1) {
    for (let x = left; x < right; x += 1) {
      if (data[(y * width + x) * 4 + 3] <= 10) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX < minX || maxY < minY) return null;
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

async function main() {
  console.log(`Reading source image: ${SRC}`);
  const { data: sourceData, info: sourceInfo } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const clientBadge = alphaBbox(sourceData, sourceInfo.width, sourceInfo.height, {
    right: 340,
    bottom: 230,
  });
  if (!clientBadge) throw new Error("No opaque SRC badge pixels found");

  const eraseRect = {
    left: Math.max(0, clientBadge.left - 8),
    top: Math.max(0, clientBadge.top - 8),
    right: Math.min(sourceInfo.width, clientBadge.left + clientBadge.width + 8),
    bottom: Math.min(sourceInfo.height, clientBadge.top + clientBadge.height + 8),
  };
  for (let y = eraseRect.top; y < eraseRect.bottom; y += 1) {
    for (let x = eraseRect.left; x < eraseRect.right; x += 1) {
      sourceData[(y * sourceInfo.width + x) * 4 + 3] = 0;
    }
  }
  console.log("Erased SRC badge rect:", {
    x: eraseRect.left,
    y: eraseRect.top,
    width: eraseRect.right - eraseRect.left,
    height: eraseRect.bottom - eraseRect.top,
  });

  const productBbox = alphaBbox(sourceData, sourceInfo.width, sourceInfo.height);
  if (!productBbox) throw new Error("No product pixels remain after badge removal");
  const trimmed = await sharp(sourceData, {
    raw: { width: sourceInfo.width, height: sourceInfo.height, channels: 4 },
  })
    .extract(productBbox)
    .png()
    .toBuffer();

  const { data: resizedProduct, info: resizedInfo } = await sharp(trimmed)
    .resize({
      width: PRODUCT_BOX.width,
      height: PRODUCT_BOX.height,
      fit: "inside",
      withoutEnlargement: true,
    })
    .png()
    .toBuffer({ resolveWithObject: true });
  const productLeft = PRODUCT_BOX.left + Math.floor((PRODUCT_BOX.width - resizedInfo.width) / 2);
  const productTop = PRODUCT_BOX.top + Math.floor((PRODUCT_BOX.height - resizedInfo.height) / 2);

  const outputBuffer = await sharp({
    create: {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resizedProduct, left: productLeft, top: productTop }])
    .png()
    .toBuffer();

  await sharp(outputBuffer).toFile(OUTPUT);
  const { data: finalData, info: finalInfo } = await sharp(outputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const finalBbox = alphaBbox(finalData, finalInfo.width, finalInfo.height);
  console.log(`Wrote: ${path.resolve(OUTPUT)}`);
  console.log("Final alpha bbox:", finalBbox);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
