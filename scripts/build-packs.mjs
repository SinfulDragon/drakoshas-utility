import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const SRC = path.join(ROOT, "src", "packs");
const DEST = path.join(ROOT, "dist", "packs");

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

export async function buildPacks() {
  if (!(await exists(SRC))) {
    console.log("[build-packs] no src/packs directory, skipping");
    return;
  }

  const entries = await fs.readdir(SRC, { withFileTypes: true });
  const packDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  if (packDirs.length === 0) {
    console.log("[build-packs] no packs to build");
    return;
  }

  await fs.mkdir(DEST, { recursive: true });

  for (const pack of packDirs) {
    const src = path.join(SRC, pack);
    const dest = path.join(DEST, pack);
    await fs.rm(dest, { recursive: true, force: true });
    await fs.mkdir(dest, { recursive: true });
    console.log(`[build-packs] packing ${pack}`);
    await compilePack(src, dest, { yaml: true, recursive: true, log: true });
  }
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (invokedDirectly) {
  buildPacks().catch((err) => {
    console.error("[build-packs] failed:", err);
    process.exit(1);
  });
}
