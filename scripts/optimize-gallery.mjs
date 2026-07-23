import { createHash } from "node:crypto";
import {
  mkdir,
  readFile,
  readdir,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const galleryRoot = path.resolve("public/img/galery");
const manifestPath = path.resolve("src/data/gallery-manifest.json");
const previewManifestPath = path.resolve("src/data/gallery-preview.json");
const sourcePattern = /\.(jpe?g|png)$/i;
const variants = [
  { width: 480, quality: 74 },
  { width: 1280, quality: 82 },
];
const categories = [
  { slug: "furnace", folder: "Furnace", title: "Furnace", heading: "Suhu" },
  {
    slug: "kalorimeter",
    folder: "Kalorimeter",
    title: "Kalorimeter",
    heading: "Instrument",
  },
  {
    slug: "laboratory-mill",
    folder: "LabMill",
    title: "Laboratory Mill",
    heading: "Laboratory Mill",
  },
  { slug: "timbangan", folder: "Massa", title: "Timbangan", heading: "Massa" },
];
const naturalSort = new Intl.Collator("id", {
  numeric: true,
  sensitivity: "base",
});
const previewSlugs = ["furnace", "laboratory-mill", "timbangan"];
const lineEnding = process.platform === "win32" ? "\r\n" : "\n";

function serializeJson(value) {
  return `${JSON.stringify(value, null, 2).replace(/\n/g, lineEnding)}${lineEnding}`;
}

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
  console.log("No new JPG or PNG gallery sources found.");
} else {
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
}

async function contentHash(filePath) {
  return createHash("sha256")
    .update(await readFile(filePath))
    .digest("hex")
    .slice(0, 10);
}

async function createCategoryManifest(category) {
  const directory = path.join(galleryRoot, category.folder);
  const entries = await readdir(directory, { withFileTypes: true });
  const thumbnailPattern = /^(.*)-480\.webp$/i;
  const fullPattern = /^(.*)-1280\.webp$/i;
  const thumbnailNames = new Set();
  const fullNames = new Set();

  entries.forEach((entry) => {
    if (!entry.isFile()) return;
    const thumbnailMatch = entry.name.match(thumbnailPattern);
    const fullMatch = entry.name.match(fullPattern);
    if (thumbnailMatch) thumbnailNames.add(thumbnailMatch[1]);
    if (fullMatch) fullNames.add(fullMatch[1]);
  });

  const missingPairs = [
    ...[...thumbnailNames]
      .filter((name) => !fullNames.has(name))
      .map((name) => `${category.folder}/${name}-1280.webp`),
    ...[...fullNames]
      .filter((name) => !thumbnailNames.has(name))
      .map((name) => `${category.folder}/${name}-480.webp`),
  ];

  if (missingPairs.length > 0) {
    throw new Error(
      `Gallery variants are incomplete. Missing: ${missingPairs.join(", ")}`,
    );
  }

  const names = [...thumbnailNames].sort(naturalSort.compare);
  if (names.length === 0) {
    throw new Error(`Gallery category ${category.folder} has no optimized images.`);
  }

  const images = await Promise.all(
    names.map(async (name) => {
      const thumbnailFile = path.join(directory, `${name}-480.webp`);
      const fullFile = path.join(directory, `${name}-1280.webp`);
      const [thumbnailVersion, fullVersion] = await Promise.all([
        contentHash(thumbnailFile),
        contentHash(fullFile),
      ]);
      const encodedFolder = encodeURIComponent(category.folder);
      const encodedName = encodeURIComponent(name);
      const thumbnailUrl = `/img/galery/${encodedFolder}/${encodedName}-480.webp?v=${thumbnailVersion}`;
      const fullUrl = `/img/galery/${encodedFolder}/${encodedName}-1280.webp?v=${fullVersion}`;
      const readableName = name.replace(/[-_]+/g, " ").trim();

      return {
        id: `${category.slug}-${name}`,
        src: thumbnailUrl,
        fullSrc: fullUrl,
        srcSet: `${thumbnailUrl} 480w, ${fullUrl} 1280w`,
        alt: `${category.title} ${readableName}`,
      };
    }),
  );

  return {
    slug: category.slug,
    folder: category.folder,
    title: category.title,
    heading: category.heading,
    images,
  };
}

const categoryEntries = await Promise.all(
  categories.map(async (category) => [
    category.slug,
    await createCategoryManifest(category),
  ]),
);
const manifest = { categories: Object.fromEntries(categoryEntries) };
const manifestContents = serializeJson(manifest);
const previewManifest = {
  items: previewSlugs.map((slug) => {
    const category = manifest.categories[slug];

    return {
      slug: category.slug,
      title: category.title,
      heading: category.heading,
      image: category.images[0],
    };
  }),
};
const previewManifestContents = serializeJson(previewManifest);

await mkdir(path.dirname(manifestPath), { recursive: true });
let previousManifest = "";
try {
  previousManifest = await readFile(manifestPath, "utf8");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

if (manifestContents !== previousManifest) {
  await writeFile(manifestPath, manifestContents, "utf8");
  console.log(`Updated ${path.relative(process.cwd(), manifestPath)}.`);
} else {
  console.log("Gallery manifest is already up to date.");
}

let previousPreviewManifest = "";
try {
  previousPreviewManifest = await readFile(previewManifestPath, "utf8");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

if (previewManifestContents !== previousPreviewManifest) {
  await writeFile(previewManifestPath, previewManifestContents, "utf8");
  console.log(`Updated ${path.relative(process.cwd(), previewManifestPath)}.`);
} else {
  console.log("Gallery preview manifest is already up to date.");
}
