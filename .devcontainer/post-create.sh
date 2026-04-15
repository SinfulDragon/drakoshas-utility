#!/usr/bin/env bash
set -euo pipefail

# Cursor (and some IDE integrations) prepend their own Node to PATH, which is
# older than the devcontainer image Node. Put image Node first for shells.
MARKER="# drakoshas-utility: prefer devcontainer Node over IDE-bundled Node"
touch "${HOME}/.bashrc" "${HOME}/.profile"
for rc in "${HOME}/.bashrc" "${HOME}/.profile"; do
  if ! grep -qF "$MARKER" "$rc"; then
    printf '\n%s\nexport PATH="/usr/local/bin:/usr/local/sbin:$PATH"\n' "$MARKER" >>"$rc"
  fi
done

pnpm install
