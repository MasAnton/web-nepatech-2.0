import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const logoRoot = path.resolve("public/img/PNG");
const entries = await readdir(logoRoot, { withFileTypes: true });
const sources = entries
  .filter(
    (entry) =>
      entry.isFile() && /\.(?:png|jpe?g|gif|svg)$/i.test(entry.name),
  )
  .map((entry) => path.join(logoRoot, entry.name));

if (sources.length === 0) {
  console.log("No new client logo sources found. Nothing to optimize.");
  process.exit(0);
}

let inputBytes = 0;
let outputBytes = 0;

for (const source of sources) {
  const output = source.replace(/\.(?:png|jpe?g|gif|svg)$/i, ".webp");
  inputBytes += (await stat(source)).size;

  await sharp(source)
    .rotate()
    .trim({ threshold: 10 })
    .resize({ width: 320, withoutEnlargement: true })
    .webp({ nearLossless: true, quality: 90, effort: 6 })
    .toFile(output);

  outputBytes += (await stat(output)).size;
  await unlink(source);
  console.log(`${path.basename(source)} -> ${path.basename(output)}`);
}

const savedPercent = Math.round((1 - outputBytes / inputBytes) * 100);
console.log(
  `Optimized ${sources.length} client logos: ${(inputBytes / 1024 / 1024).toFixed(2)} MB -> ${(outputBytes / 1024 / 1024).toFixed(2)} MB (${savedPercent}% smaller).`,
);
