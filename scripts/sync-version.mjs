#!/usr/bin/env node
/**
 * Syncs version from package.json into src/module.json.
 * Optionally injects --download-url and --manifest-url arguments.
 *
 * Usage:
 *   node scripts/sync-version.mjs
 *   node scripts/sync-version.mjs --download-url <url> --manifest-url <url>
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const args = process.argv.slice(2);
const getArg = (name) => {
  const idx = args.indexOf(name);
  return idx !== -1 ? args[idx + 1] : undefined;
};

const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf-8"));
const manifestPath = resolve(root, "src/module.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));

manifest.version = pkg.version;

const downloadUrl = getArg("--download-url");
const manifestUrl = getArg("--manifest-url");

if (downloadUrl) manifest.download = downloadUrl;
if (manifestUrl) manifest.manifest = manifestUrl;

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(`✓ module.json version set to ${pkg.version}`);
if (downloadUrl) console.log(`✓ download → ${downloadUrl}`);
if (manifestUrl) console.log(`✓ manifest → ${manifestUrl}`);
