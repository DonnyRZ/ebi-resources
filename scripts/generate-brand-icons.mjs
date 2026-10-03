/* Format the approved EBI artwork for browser icons; never redraw the brand. */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const brandDir = path.join(root, "public/images/brand");
const logo = path.join(brandDir, "ebi-resources-logo.png");

async function icon(size) {
  // The EBI letters and gold stroke remain legible at favicon sizes.
  return sharp(logo)
    .extract({ left: 315, top: 115, width: 1140, height: 500 })
    .resize(Math.round(size * 0.92), Math.round(size * 0.92), {
      fit: "contain",
      background: "#ffffff",
    })
    .extend({
      top: Math.floor(size * 0.04),
      bottom: size - Math.round(size * 0.92) - Math.floor(size * 0.04),
      left: Math.floor(size * 0.04),
      right: size - Math.round(size * 0.92) - Math.floor(size * 0.04),
      background: "#ffffff",
    })
    .flatten({ background: "#ffffff" })
    .ensureAlpha()
    .png()
    .toBuffer();
}

async function main() {
  const sizes = [16, 32, 48, 64, 128, 256];
  const entries = [];
  const directory = Buffer.alloc(6 + sizes.length * 16);
  directory.writeUInt16LE(1, 2);
  directory.writeUInt16LE(sizes.length, 4);
  let offset = directory.length;
  for (const [index, size] of sizes.entries()) {
    const png = await icon(size);
    const position = 6 + index * 16;
    directory[position] = size === 256 ? 0 : size;
    directory[position + 1] = size === 256 ? 0 : size;
    directory.writeUInt16LE(1, position + 4);
    directory.writeUInt16LE(32, position + 6);
    directory.writeUInt32LE(png.length, position + 8);
    directory.writeUInt32LE(offset, position + 12);
    entries.push(png);
    offset += png.length;
  }
  await fs.writeFile(
    path.join(root, "app/favicon.ico"),
    Buffer.concat([directory, ...entries]),
  );
  await fs.writeFile(
    path.join(root, "public/favicon-96x96.png"),
    await icon(96),
  );
  await fs.writeFile(
    path.join(root, "public/apple-touch-icon.png"),
    await icon(180),
  );

  // A brand-only social preview, composed from the unchanged full logo.
  const image = await sharp(logo)
    .trim({ threshold: 5 })
    .resize(770, 480, { fit: "inside" })
    .toBuffer();
  const info = await sharp(image).metadata();
  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: "#ffffff" },
  })
    .composite([
      {
        input: image,
        left: Math.round((1200 - info.width) / 2),
        top: Math.round((630 - info.height) / 2),
      },
    ])
    .png()
    .toFile(path.join(brandDir, "ebi-resources-social.png"));
  console.log(
    "Generated EBI favicon (6 sizes), 96px icon, Apple icon, and 1200×630 social image.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
