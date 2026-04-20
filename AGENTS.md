# AGENTS.md - Production Directives

These directives are written for AI agents operating in this repository. They
override any default tendency toward shallow, fast, or incomplete output.

The governing loop for all work is: **gather context -> take action ->
verify work -> repeat**.

---

## Project Context

This is a **FoundryVTT v13.351** module targeting the **PF2e system 7.12.2**,
written in **TypeScript** and built with **Vite**. Package manager is **pnpm**.

### Key Directories

- `src/module/` — Core module entry point and runtime logic
- `src/rule-elements/` — PF2e Rule Element implementations
- `src/lang/` — i18n localization files (Russian + English)
- `src/packs/` — Compendium pack source data
- `src/styles/` — SCSS/CSS stylesheets
- `src/templates/` — Handlebars template files
- `types/foundry/` — FoundryVTT v13 type definitions
- `types/pf2e/` — PF2e system type definitions
- `scripts/` — Build, extraction, and utility scripts

### Build & Dev Commands

```bash
pnpm dev          # Watch-mode build via Vite
pnpm build        # Production build
pnpm build:packs  # Build compendium packs
pnpm lint         # ESLint check
pnpm format       # Prettier formatting
pnpm test         # Vitest test suite
pnpm test:watch   # Vitest watch mode
```

### Path Aliases (tsconfig.json)

| Alias       | Resolves To                |
|-------------|----------------------------|
| `@/*`       | `src/*`                    |
| `@actor`    | `types/pf2e/module/actor`  |
| `@item`     | `types/pf2e/module/item`   |
| `@scene`    | `types/pf2e/module/scene`  |
| `@system/*` | `types/pf2e/module/system` |
| `@module/*` | `types/pf2e/module`        |
| `@util/*`   | `types/pf2e/util`          |
| `@client/*` | `types/foundry/client`     |
| `@common/*` | `types/foundry/common`     |

---

## 1. Pre-Work

### Step 0: Delete Before You Build

Before any structural refactor on a file larger than 300 lines, first
remove dead code: unused props, unused exports, unused imports, stale
helpers, and debug logs. If restructuring makes more code obsolete, remove
that too. Do not leave ghosts behind.

### Phased Execution

Do not attempt broad multi-file refactors in a single pass unless the user
explicitly asks for it. Break the work into phases. Keep each phase small
enough to reason about and verify properly. For larger changes, complete
Phase 1, verify it, report results, and wait for approval before moving to
the next phase.

### Plan and Build Are Separate Steps

If the user asks for a plan, or asks to think first, provide only the plan.
Do not write code until the user says to proceed.

If the user gives a written plan, follow it exactly. If you find a real
technical flaw in the plan, call it out clearly and stop for confirmation.
Do not silently improvise.

If the request is vague, do not start building. First describe what you
would build, where it belongs, and what tradeoffs matter.

### Spec-Based Development

For non-trivial work with multiple implementation decisions, first clarify
the contract. Ask concise direct questions only when necessary.
Reduce ambiguity before editing code.

The spec is the contract. Execute against the agreed spec, not assumptions.

---

## 2. Understanding Intent

### Follow References, Not Descriptions

When the user points to existing code as a reference, inspect that code
first and match its conventions. Existing working code is a stronger spec
than a prose description.

### Work From Raw Data

When debugging, work from actual logs, stack traces, failing tests, and
repro steps. Do not guess. Trace the concrete failure.

If the bug report lacks raw error output and the failure cannot be derived
locally, ask for the console output or failing log directly.

### One-Word Mode

If the user says "yes", "do it", "push", or similar after prior context has
already established the task, execute immediately. Do not restate the plan.

---

## 3. Code Quality

### Senior Dev Override

Do not settle for band-aids when the local design is clearly flawed. If the
change exposes duplicated state, inconsistent patterns, leaky abstractions,
or structural weakness, fix the underlying problem within scope and explain
the reasoning.

Ask: "What would a strong senior reviewer reject here?" Then address it.

### Forced Verification

Never report work as complete just because files were edited successfully.
Before closing the task, run all applicable verification that exists in the
repo:

- `pnpm lint` — ESLint
- `pnpm build` — TypeScript compilation + Vite build
- `pnpm test` — Vitest test suite

If one of these does not exist, say so explicitly. If one exists but cannot
be run, say why. Do not claim success with outstanding errors.

### Write Human Code

Write code that looks like an experienced human wrote it. Avoid noisy
commentary, decorative abstractions, and boilerplate explanations of obvious
logic.

### Don't Over-Engineer

Do not design for hypothetical future requirements that the user did not
ask for. Prefer solutions that are simple, correct, and maintainable.

### Demand Elegance

For non-trivial work, pause and check whether the solution is merely working
or actually clean. If the first fix is obviously hacky, replace it with the
cleaner design before presenting it.

---

## 4. FoundryVTT & PF2e Specific Rules

### Use Project Types

Always use the Foundry and PF2e types defined in `types/foundry/` and
`types/pf2e/`. Do not fall back to `any` or loose typing when proper types
exist in these directories. The type definitions were extracted specifically
for this project's Foundry v13.351 + pf2e 7.12.2 target.

### Consult Context7 for API References

You have access to the Context7 remote MCP server, which provides up-to-date documentation and code examples for libraries and frameworks.

1. **Documentation First**: Before writing code or answering questions about any third-party library, API, or framework, ALWAYS use the Context7 MCP to fetch the latest documentation and best practices. Do not rely solely on your baseline knowledge.
2. **Skill Management**: You have permission to manage Context7 skills directly. If a required skill is missing, you must execute the appropriate Context7 CLI commands in the terminal using `npx ctx7 skills install <skill_name>`.
3. **Execution**: When using `npx ctx7 skills` commands, execute them directly in the environment. Printing commands without execution is forbidden.

### PF2e Rule Elements

For questions regarding PF2e Rule Elements, consult the official guide:
https://github.com/foundryvtt/pf2e/wiki/Quickstart-guide-for-rule-elements

Rule element implementations live in `src/rule-elements/` and should follow
the patterns established there.

### i18n — Russian and English

All user-facing strings must support both Russian (`ru`) and English (`en`)
localization. Store strings in `src/lang/en.json` and `src/lang/ru.json`,
and reference them via Foundry's `game.i18n.localize()` or
`game.i18n.format()`. Never hardcode display strings in TypeScript or
templates.

### Foundry v13 Compatibility

This module targets FoundryVTT v13.351. Be aware of v13-specific API
changes compared to v10/v11. When in doubt, verify against the v13 type
definitions in `types/foundry/`.

---

## 5. Context Management

### Use Delegation When It Helps

If the task spans many independent files or parallelizable subtasks, use
sub-agents where appropriate. Give each sub-agent a narrow, concrete,
self-contained responsibility. Keep ownership boundaries clear so changes do
not conflict.

Do not delegate the immediate critical-path task if doing it locally is
faster and clearer.

### Context Decay Awareness

After a long conversation or after substantial time has passed, re-read any
file before editing it. Do not trust memory of file contents.

### Persistent State

Use the file system as durable memory when the task is long-running or
multi-step. If useful, maintain concise notes in files like
`context-log.md` or `gotchas.md` so future work can resume cleanly.

### File Read Discipline

Do not dump large files into context without need. Search first, then read
only the relevant sections. For very large files, inspect them in chunks.

### Tool Output Skepticism

If a search or shell result looks suspiciously incomplete, narrow the scope
and rerun it. Assume truncation or overly broad queries before assuming
absence.

---

## 6. File System as Working Memory

Use the file system actively instead of holding everything in chat context.

- Prefer targeted search over reading whole files.
- Save intermediate outputs when that makes debugging or verification more
  reliable.
- Use shell tools for filtering, searching, and inspecting project state.
- Preserve useful notes, decisions, and follow-up items in repo-local
  markdown files when that improves continuity.
- When debugging, keep reproducible logs or command outputs if they help
  validate the fix.

---

## 7. Edit Safety

### Edit Integrity

Before every edit, re-read the file. After every edit, read the affected
section again to verify the change landed correctly.

Do not make repeated blind edits against stale file contents.

### No Semantic Assumptions

When renaming or changing a symbol, search separately for:

- Direct references and call sites
- Type references
- String literals containing the name
- Dynamic imports
- Re-exports and barrel entries
- Tests, fixtures, and mocks
- Handlebars template references
- Localization keys in `lang/*.json`

Assume one search pattern is insufficient.

### One Source of Truth

Do not solve rendering or state bugs by duplicating state. Keep one
authoritative source and derive everything else from it.

### Destructive Action Safety

Do not delete files until you verify nothing still references them. Do not
revert user changes unless explicitly asked. Do not push or perform other
shared-repo actions unless explicitly told to do so.

---

## 8. Self-Improvement

### Mistake Logging

If the user corrects a recurring mistake or workflow issue, record the
lesson in `gotchas.md` when appropriate so the same mistake is less likely
to recur.

### Bug Autopsy

After fixing a bug, explain briefly why it happened and what would prevent
that category of bug in the future.

### Two-Perspective Review

For meaningful tradeoffs, present both views:

- What a perfectionist reviewer would still criticize
- What a pragmatist would accept as sufficient

Let the user choose when the tradeoff is real.

### Failure Recovery

If two fix attempts fail, stop and reassess. Re-read the relevant code
top-down, identify where the mental model was wrong, and explain the new
understanding before trying again.

### Fresh Eyes Pass

When testing your own change, evaluate it like a new user would. Flag rough
edges, confusing behavior, or missing validation.

---

## 9. Housekeeping

### Autonomous Bug Fixing

When given a concrete bug report, own the problem end-to-end. Trace the
failure, implement the fix, and verify it without asking the user to manage
the process for you unless you are blocked on missing external information.

### Proactive Guardrails

If a file is becoming hard to reason about, say so. If the repo lacks basic
validation, tests, or safety checks in the area you are touching, note that
once and propose the smallest useful guardrail.

### Batch Changes

When the same change must be applied across many files, group the work into
clear batches and verify each batch before moving on.

### File Hygiene

Prefer small, focused, navigable files. If a file has become unwieldy,
recommend splitting it along real responsibility boundaries.
