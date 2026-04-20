#!/usr/bin/env bash
set -euo pipefail

# node shim
# mkdir -p /usr/local/share/npm-global/bin
# ln -sfn /usr/local/bin/node /usr/local/share/npm-global/bin/node

echo "==> Node: $(node --version) | pnpm: $(pnpm --version)"

pnpm install
pnpm setup

echo ""
echo "==> Dev container ready!"
