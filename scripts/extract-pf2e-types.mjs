#!/usr/bin/env node
/**
 * Extracts TypeScript declaration files (.d.ts) from the pf2e vendor source
 * and places them into types/pf2e/, then updates tsconfig.json path aliases.
 *
 * Usage: node scripts/extract-pf2e-types.mjs
 * Env vars:
 *   VENDOR_DIR   – path to pf2e checkout (default: vendor/pf2e)
 *   TARGET_DIR   – where to place the generated types (default: types/pf2e)
 */

import { execSync } from "child_process";
import {
  existsSync,
  rmSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
} from "fs";
import { join, resolve, relative, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const VENDOR_DIR = resolve(ROOT, process.env.VENDOR_DIR ?? "vendor/pf2e");
const TARGET_DIR = resolve(ROOT, process.env.TARGET_DIR ?? "types/pf2e");
const TMP_TSCONFIG = join(VENDOR_DIR, "tsconfig.dts.json");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function log(msg) {
  console.log(`[extract-pf2e-types] ${msg}`);
}

function warn(msg) {
  console.warn(`[extract-pf2e-types] WARN: ${msg}`);
}

/** Walk a directory recursively and yield file paths. */
function* walkFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkFiles(full);
    } else {
      yield full;
    }
  }
}

/**
 * Post-process a generated .d.ts file.
 *
 * Fix 1 – Import extensions:
 *   Replace bare `.ts"` import suffixes with `.js"` so TypeScript can resolve
 *   them as `.d.ts` files via its JS→DTS fallback in NodeNext mode.
 *   Leaves `.d.ts"` and `.d.mts"` suffixes intact.
 *
 * Fix 2 – Mangled private-field references:
 *   TypeScript encodes ES private fields (#field) in declaration files as
 *   `__#<id>@#field` (e.g. `__#242@#onClickActivate`). The `@` makes these
 *   identifiers unparseable when the .d.ts is re-compiled standalone.
 *   Replace every `typeof SomeClass.__#<id>@#<name>` with `Function` since
 *   those are always action-handler references in pf2e.
 */
function postprocessDeclaration(filePath) {
  const original = readFileSync(filePath, "utf-8");

  // Fix 1: .ts" → .js" (skip .d.ts and .d.mts)
  let result = original.replace(
    /(from\s+["'](?:[^"']*?)(?<!\.d))\.ts(["'])/g,
    "$1.js$2",
  );

  // Fix 2: typeof ClassName.__#<id>@#<name>  →  Function
  result = result.replace(/typeof\s+\w+\.__#\d+@#\w+/g, "Function");

  if (result !== original) {
    writeFileSync(filePath, result, "utf-8");
  }
}

/**
 * Vendor-source patches applied before running tsc and reverted afterwards.
 *
 * The pf2e sources contain three mixin files whose anonymous classes expose
 * `protected` / `abstract` members. When a concrete subclass extends such a
 * mixin, TypeScript has to inline the base class into the subclass's .d.ts
 * and emits TS4094 ("Property 'X' of exported anonymous class type may not be
 * private or protected"). Crucially, tsc does NOT emit declarations for files
 * with TS4094 errors – the affected subclasses silently disappear from the
 * generated type tree.
 *
 * Dropping the `protected` modifier on the relevant mixin members is enough
 * to let all downstream declarations emit. We additionally replace the one
 * `svelte.Component<any>` reference with `any`: when tsc inlines the mixin
 * into a subclass that has `import * as R from "remeda"` in scope, the
 * unresolved `svelte` namespace gets mis-rewritten to `R`, producing a bogus
 * `root: R<any>`.
 *
 * Patches are applied in place and reverted in a `finally` block so the
 * vendor checkout is never left dirty.
 */
const VENDOR_PATCHES = [
  {
    path: join(VENDOR_DIR, "src/module/sheet/mixin.svelte.ts"),
    transforms: [
      (src) => src.replace(/^(\s*)protected\s+/gm, "$1"),
      (src) => src.replace(/svelte\.Component<any>/g, "any"),
    ],
  },
  {
    path: join(VENDOR_DIR, "src/module/scene/token-document/sheets/mixin.ts"),
    transforms: [(src) => src.replace(/^(\s*)protected\s+/gm, "$1")],
  },
  {
    path: join(
      VENDOR_DIR,
      "types/foundry/client/applications/sheets/token/mixin.mts",
    ),
    transforms: [(src) => src.replace(/^(\s*)protected\s+/gm, "$1")],
  },
];

/** Apply the vendor patches, returning a Map<path, originalContents> for restore. */
function patchVendorSources() {
  const backups = new Map();
  for (const { path: filePath, transforms } of VENDOR_PATCHES) {
    if (!existsSync(filePath)) {
      warn(`Vendor patch target not found (skipping): ${filePath}`);
      continue;
    }
    const original = readFileSync(filePath, "utf-8");
    backups.set(filePath, original);
    const patched = transforms.reduce((acc, fn) => fn(acc), original);
    if (patched !== original) {
      writeFileSync(filePath, patched, "utf-8");
    }
  }
  return backups;
}

/** Revert previously applied vendor patches. */
function restoreVendorSources(backups) {
  for (const [filePath, original] of backups) {
    try {
      writeFileSync(filePath, original, "utf-8");
    } catch (err) {
      warn(`Failed to restore ${filePath}: ${err.message}`);
    }
  }
}

/** Paths (relative to VENDOR_DIR) whose TS4094 errors are emitted outside rootDir
 *  and therefore don't prevent declaration emission. Filtered out of reporting. */
const TS4094_IGNORED_PATH_PREFIXES = ["types/foundry/"];

/**
 * Transform a pf2e tsconfig path target into a path relative to the workspace root.
 * Input:  "./src/module/actor/index.ts"
 * Output: "types/pf2e/module/actor/index.d.ts"
 *
 * Wildcard inputs ("./src/module/actor/*") keep the wildcard as-is.
 */
function transformPf2ePath(pf2ePath) {
  // Strip leading "./"
  let p = pf2ePath.replace(/^\.\//, "");

  // Only transform paths that start with "src/"
  if (!p.startsWith("src/")) return null;

  // Remove the "src/" prefix
  p = p.slice("src/".length);

  if (p.endsWith(".ts")) {
    // Concrete file: convert extension
    p = p.slice(0, -".ts".length) + ".d.ts";
  }
  // Wildcard paths end with "/*" – no extension change needed

  return `types/pf2e/${p}`;
}

// ---------------------------------------------------------------------------
// Step 1 – Validate
// ---------------------------------------------------------------------------

if (!existsSync(VENDOR_DIR)) {
  console.error(
    `ERROR: ${VENDOR_DIR} does not exist.\n` +
      `Run "pnpm run extract:foundry-types" first to clone the pf2e repository.`,
  );
  process.exit(1);
}

const pf2eTsconfigPath = join(VENDOR_DIR, "tsconfig.json");
if (!existsSync(pf2eTsconfigPath)) {
  console.error(`ERROR: ${pf2eTsconfigPath} not found.`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Step 2 – Write temporary tsconfig for declaration emit
// ---------------------------------------------------------------------------

log("Creating temporary tsconfig.dts.json in vendor/pf2e…");

const dtsConfig = {
  extends: "./tsconfig.json",
  compilerOptions: {
    noEmit: false,
    declaration: true,
    emitDeclarationOnly: true,
    // Relative to vendor/pf2e – two levels up lands at workspace root
    outDir: relative(VENDOR_DIR, TARGET_DIR),
    rootDir: "./src",
    // Override pf2e's types/typeRoots so tsc doesn't complain about missing
    // node_modules (jest, jquery, showdown, tooltipster, …) in the vendor dir.
    types: [],
    typeRoots: [],
  },
  // Only include the system source; skip build helpers, tests, styles
  include: ["./src/**/*.ts"],
  exclude: ["./src/styles/**/*", "./tests/**/*", "./build/**/*"],
};

writeFileSync(TMP_TSCONFIG, JSON.stringify(dtsConfig, null, 2), "utf-8");

// ---------------------------------------------------------------------------
// Step 3 – Clear target directory
// ---------------------------------------------------------------------------

log(`Clearing ${TARGET_DIR}…`);
rmSync(TARGET_DIR, { recursive: true, force: true });
mkdirSync(TARGET_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Step 4 – Run tsc
// ---------------------------------------------------------------------------

log("Patching vendor mixin sources to unblock declaration emit…");
const vendorBackups = patchVendorSources();

log("Running tsc --noCheck (this may take a moment)…");

// tsc may still exit non-zero because of residual TS4094 errors inside
// `vendor/pf2e/types/foundry/` (Foundry mixins we don't control). Those files
// are outside `rootDir` so they are not emitted and do not affect us. Capture
// output and only surface genuinely problematic errors.
try {
  let tscOutput = "";
  try {
    execSync(`npx tsc --noCheck -p "${TMP_TSCONFIG}"`, {
      cwd: VENDOR_DIR,
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (err) {
    tscOutput = (err.stdout?.toString() ?? "") + (err.stderr?.toString() ?? "");

    const emitted =
      existsSync(TARGET_DIR) && readdirSync(TARGET_DIR).length > 0;

    if (!emitted) {
      console.error("ERROR: tsc did not emit any declaration files.");
      console.error(tscOutput);
      rmSync(TMP_TSCONFIG, { force: true });
      process.exit(1);
    }

    const errorLines = tscOutput
      .split("\n")
      .filter((l) => /error TS\d+/.test(l));

    const isIgnorable = (line) => {
      if (!/error TS4094/.test(line)) return false;
      return TS4094_IGNORED_PATH_PREFIXES.some((prefix) =>
        line.startsWith(prefix),
      );
    };

    const ignored = errorLines.filter(isIgnorable);
    const reportable = errorLines.filter((l) => !isIgnorable(l));

    if (ignored.length > 0) {
      log(
        `Ignoring ${ignored.length} TS4094 error(s) in ${TS4094_IGNORED_PATH_PREFIXES.join(", ")} (not emitted, no effect on output).`,
      );
    }

    if (reportable.length > 0) {
      warn(
        `tsc reported ${reportable.length} error(s) – some declarations may be missing:`,
      );
      for (const line of reportable) console.warn(line);
    }
  }
} finally {
  restoreVendorSources(vendorBackups);
}

// ---------------------------------------------------------------------------
// Step 5 – Remove temporary tsconfig
// ---------------------------------------------------------------------------

rmSync(TMP_TSCONFIG, { force: true });

// ---------------------------------------------------------------------------
// Step 6 – Post-process .d.ts files
// ---------------------------------------------------------------------------

log("Post-processing declaration files (fixing .ts → .js import extensions)…");

let processedCount = 0;
for (const file of walkFiles(TARGET_DIR)) {
  if (file.endsWith(".d.ts")) {
    postprocessDeclaration(file);
    processedCount++;
  }
}

log(`Processed ${processedCount} declaration files.`);

// ---------------------------------------------------------------------------
// Step 6b – Integrity check: every src/*.ts must have a matching .d.ts
// ---------------------------------------------------------------------------

const VENDOR_SRC_DIR = join(VENDOR_DIR, "src");
const EXCLUDED_SRC_PREFIXES = [join(VENDOR_SRC_DIR, "styles")];

const missingDeclarations = [];
for (const srcFile of walkFiles(VENDOR_SRC_DIR)) {
  if (!srcFile.endsWith(".ts") || srcFile.endsWith(".d.ts")) continue;
  if (EXCLUDED_SRC_PREFIXES.some((p) => srcFile.startsWith(p + "/") || srcFile === p)) continue;

  const rel = relative(VENDOR_SRC_DIR, srcFile);
  const expected = join(TARGET_DIR, rel.slice(0, -".ts".length) + ".d.ts");
  if (!existsSync(expected)) {
    missingDeclarations.push(relative(ROOT, expected));
  }
}

if (missingDeclarations.length > 0) {
  console.error(
    `ERROR: ${missingDeclarations.length} declaration file(s) missing after emit:`,
  );
  for (const f of missingDeclarations.slice(0, 20)) console.error(`  - ${f}`);
  if (missingDeclarations.length > 20) {
    console.error(`  … and ${missingDeclarations.length - 20} more`);
  }
  process.exit(1);
}

log("Integrity check passed: all vendor src/*.ts have matching declarations.");

// ---------------------------------------------------------------------------
// Step 7 – Update tsconfig.json path aliases
// ---------------------------------------------------------------------------

log("Updating tsconfig.json path aliases…");

const pf2eTsconfig = JSON.parse(readFileSync(pf2eTsconfigPath, "utf-8"));
const pf2ePaths = pf2eTsconfig.compilerOptions?.paths ?? {};

// Aliases that belong to Foundry (already mapped in our tsconfig)
const FOUNDRY_ALIASES = new Set(["@common/*", "@client/*"]);

const newPf2ePaths = {};
for (const [alias, targets] of Object.entries(pf2ePaths)) {
  if (FOUNDRY_ALIASES.has(alias)) continue;

  const transformed = targets
    .map(transformPf2ePath)
    .filter(Boolean);

  if (transformed.length > 0) {
    newPf2ePaths[alias] = transformed;
  }
}

const rootTsconfigPath = join(ROOT, "tsconfig.json");
const rootTsconfig = JSON.parse(readFileSync(rootTsconfigPath, "utf-8"));

// Merge: module-owned paths (starting with "@/") take precedence over pf2e aliases
const ownPaths = Object.fromEntries(
  Object.entries(rootTsconfig.compilerOptions.paths ?? {}).filter(
    ([k]) => k.startsWith("@/") || k === "@common/*" || k === "@client/*",
  ),
);

rootTsconfig.compilerOptions.paths = {
  // pf2e aliases first (lower priority)
  ...newPf2ePaths,
  // Our own paths last (higher priority – overwrite any conflicts)
  ...ownPaths,
};

writeFileSync(rootTsconfigPath, JSON.stringify(rootTsconfig, null, 2) + "\n", "utf-8");

log("tsconfig.json updated.");

// ---------------------------------------------------------------------------
// Done
// ---------------------------------------------------------------------------

const emittedFiles = [...walkFiles(TARGET_DIR)].filter((f) =>
  f.endsWith(".d.ts"),
).length;

console.log("");
console.log(`✓ PF2e types extracted: ${emittedFiles} declaration files → ${TARGET_DIR}`);
console.log(`✓ tsconfig.json path aliases updated (${Object.keys(newPf2ePaths).length} pf2e aliases)`);
