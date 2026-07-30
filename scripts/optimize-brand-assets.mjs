import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const brandDirectory = path.join(projectRoot, "public", "img", "brand");

const brandSources = [
  {
    mode: "light",
    source: path.join(brandDirectory, "ntgs-light.png"),
  },
  {
    mode: "dark",
    source: path.join(brandDirectory, "ntgs-dark.png"),
  },
];

const iconCrop = {
  left: 0,
  top: 0,
  width: 620,
  height: 530,
};
const iconWordmarkCleanup = {
  input: {
    create: {
      width: 90,
      height: 410,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    },
  },
  left: 530,
  top: 120,
  blend: "dest-out",
};

await mkdir(brandDirectory, { recursive: true });

for (const brand of brandSources) {
  await sharp(brand.source)
    .webp({
      quality: 90,
      alphaQuality: 100,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(path.join(brandDirectory, `ntgs-${brand.mode}.webp`));

  const iconSizes = brand.mode === "light" ? [64, 180, 192, 512] : [64];
  const iconSource = await sharp(brand.source)
    .extract(iconCrop)
    .composite([iconWordmarkCleanup])
    .png()
    .toBuffer();

  for (const size of iconSizes) {
    await sharp(iconSource)
      .resize(size, size, {
        fit: "contain",
        kernel: sharp.kernel.lanczos3,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true,
      })
      .toFile(
        path.join(
          brandDirectory,
          `ntgs-icon-${brand.mode}-${size}.png`,
        ),
      );
  }
}

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 248, g: 250, b: 252, alpha: 1 },
  },
})
  .composite([
    {
      input: await sharp(brandSources[0].source)
        .resize(1040, 584, {
          fit: "contain",
          kernel: sharp.kernel.lanczos3,
        })
        .png()
        .toBuffer(),
      gravity: "center",
    },
  ])
  .png({
    compressionLevel: 9,
    adaptiveFiltering: true,
  })
  .toFile(path.join(brandDirectory, "ntgs-social.png"));

console.log("Optimized NTGS brand assets generated.");
