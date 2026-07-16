import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const galleryRoot = path.resolve("public/img/galery");
const sourcePattern = /\.(jpe?g|png)$/i;
const variants = [
  { width: 480, quality: 74 },
  { width: 1280, quality: 82 },
];

async function findSources(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const absolutePath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? findSources(absolutePath)
        : sourcePattern.test(entry.name)
          ? [absolutePath]
          : [];
    }),
  );

  return nested.flat();
}

const sources = await findSources(galleryRoot);

if (sources.length === 0) {
  console.log("No JPG or PNG gallery sources found. Nothing to optimize.");
  process.exit(0);
}

let inputBytes = 0;
let outputBytes = 0;

for (const source of sources) {
  const extension = path.extname(source);
  const basePath = source.slice(0, -extension.length);
  inputBytes += (await stat(source)).size;

  const outputs = await Promise.all(
    variants.map(async ({ width, quality }) => {
      const output = `${basePath}-${width}.webp`;
      await sharp(source)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 5, smartSubsample: true })
        .toFile(output);
      outputBytes += (await stat(output)).size;
      return output;
    }),
  );

  await unlink(source);
  console.log(
    `${path.relative(galleryRoot, source)} -> ${outputs
      .map((output) => path.basename(output))
      .join(", ")}`,
  );
}

const savedPercent = Math.round((1 - outputBytes / inputBytes) * 100);
console.log(
  `Optimized ${sources.length} images: ${(inputBytes / 1024 / 1024).toFixed(2)} MB -> ${(outputBytes / 1024 / 1024).toFixed(2)} MB (${savedPercent}% smaller).`,
);
