#!/usr/bin/env bash
set -euo pipefail

# Keep a higher-priority shim in npm-global/bin so `node` resolves to container Node 24.
mkdir -p /usr/local/share/npm-global/bin
ln -sfn /usr/local/bin/node /usr/local/share/npm-global/bin/node

pnpm install
