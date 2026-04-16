# Drakosha's Utility

Foundry VTT utility module for Pathfinder Second Edition.

## Requirements

Foundry **v13**, PF2e **7.12.2+**, and the **SocketLib** module (declared as a dependency in `module.json`).

## Installation

Paste this manifest URL into Foundry’s **Install Module** dialog:

`https://github.com/SinfulDragon/drakoshas-utility/releases/latest/download/module.json`

## What it does

Right now the module focuses on **automation for the Harrowing ritual** (PF2e). More utilities may be added over time.

## Development

For a reproducible toolchain (Node, pnpm, and project setup), open the repo in a **Dev Container** and use **Rebuild Container** when the image or `.devcontainer` configuration changes.

Code supports extracting ts types from pf2e repo. To extract type use:

```bash
pnpm extract:foundry-types
pnpm extract:pf2e-types
```

Then run `pnpm build` and adjust `src/` (and any `scripts/` helpers) as needed so the module stays aligned with the regenerated types.
