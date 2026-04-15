import fs from "node:fs";
import path from "node:path";

const moduleId = "drakoshas-utility";
const projectRoot = process.cwd();
const distPath = path.join(projectRoot, "dist");
const foundryDataPath = process.env.FOUNDRY_DATA_PATH;

if (!foundryDataPath) {
  console.error("FOUNDRY_DATA_PATH is not set.");
  process.exit(1);
}

const modulesDir = path.join(foundryDataPath, "modules");
const targetPath = path.join(modulesDir, moduleId);

if (!fs.existsSync(distPath)) {
  console.error("dist directory does not exist. Run pnpm build first.");
  process.exit(1);
}

fs.mkdirSync(modulesDir, { recursive: true });

if (fs.existsSync(targetPath)) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

fs.symlinkSync(distPath, targetPath, process.platform === "win32" ? "junction" : "dir");
console.log(`Linked ${distPath} -> ${targetPath}`);
