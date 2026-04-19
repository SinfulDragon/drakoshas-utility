#!/usr/bin/env node
/**
 * Clones (or updates) the pf2e vendor checkout and copies its bundled
 * Foundry type declarations into `types/foundry/`.
 *
 * Usage: node scripts/extract-foundry-types.mjs
 * Env vars:
 *   PF2E_REPO_URL  – git URL of the pf2e repository
 *                    (default: https://github.com/foundryvtt/pf2e.git)
 *   PF2E_REF       – branch / tag / commit to check out (default: v13-dev)
 *   VENDOR_DIR     – path to the pf2e checkout   (default: vendor/pf2e)
 *   TARGET_DIR     – where to place Foundry types (default: types/foundry)
 */

import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const PF2E_REPO_URL = "https://github.com/foundryvtt/pf2e.git";
const PF2E_REF = "v13-dev";
const VENDOR_DIR = resolve(ROOT, "vendor/pf2e");
const TARGET_DIR = resolve(ROOT, "types/foundry");
const VENDOR_FOUNDRY_DIR = resolve(VENDOR_DIR, "types/foundry");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function log(msg) {
  console.log(`[extract-foundry-types] ${msg}`);
}

/** Run a git command, piping stdio through to the caller. */
function git(args, opts = {}) {
  execFileSync("git", args, { stdio: "inherit", ...opts });
}

// ---------------------------------------------------------------------------
// Step 1 – Clone or update the pf2e checkout
// ---------------------------------------------------------------------------

mkdirSync(resolve(ROOT, "vendor"), { recursive: true });

if (existsSync(resolve(VENDOR_DIR, ".git"))) {
  log(`Updating pf2e checkout in ${VENDOR_DIR}`);
  git(["fetch", "--depth", "1", "origin", PF2E_REF], { cwd: VENDOR_DIR });
  git(["checkout", "-f", "FETCH_HEAD"], { cwd: VENDOR_DIR });
} else {
  log(`Cloning pf2e ${PF2E_REF} into ${VENDOR_DIR}`);
  git([
    "clone",
    "--depth",
    "1",
    "--branch",
    PF2E_REF,
    PF2E_REPO_URL,
    VENDOR_DIR,
  ]);
}

// ---------------------------------------------------------------------------
// Step 2 – Copy bundled Foundry type declarations
// ---------------------------------------------------------------------------

if (!existsSync(VENDOR_FOUNDRY_DIR)) {
  console.error(`ERROR: ${VENDOR_FOUNDRY_DIR} not found`);
  process.exit(1);
}

rmSync(TARGET_DIR, { recursive: true, force: true });
mkdirSync(TARGET_DIR, { recursive: true });
cpSync(VENDOR_FOUNDRY_DIR, TARGET_DIR, { recursive: true });

log(`Synced pf2e Foundry types to ${TARGET_DIR}`);
