import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public", "catalog");
const OUT = path.resolve(ROOT, "manifest.json");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function isImage(fileName) {
  return IMAGE_EXTS.has(path.extname(fileName).toLowerCase());
}

async function main() {
  const entries = await readdir(ROOT, { withFileTypes: true });
  const collections = [];

  for (const dirent of entries) {
    if (!dirent.isDirectory()) continue;
    const collection = dirent.name;
    const folder = path.resolve(ROOT, collection);
    const files = (await readdir(folder, { withFileTypes: true }))
      .filter((d) => d.isFile() && isImage(d.name))
      .map((d) => d.name)
      .sort((a, b) => a.localeCompare(b, "ru"));

    if (!files.length) continue;
    collections.push({ name: collection, files });
  }

  collections.sort((a, b) => a.name.localeCompare(b.name, "ru"));

  const manifest = {
    generatedAt: new Date().toISOString(),
    basePath: "catalog",
    collections,
  };

  await writeFile(OUT, JSON.stringify(manifest, null, 2), "utf8");
  process.stdout.write(`Wrote ${OUT} with ${collections.length} collections\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

