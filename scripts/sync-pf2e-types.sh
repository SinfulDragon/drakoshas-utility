#!/usr/bin/env bash
set -euo pipefail

PF2E_REPO_URL="${PF2E_REPO_URL:-https://github.com/foundryvtt/pf2e.git}"
PF2E_REF="${PF2E_REF:-v13-dev}"
VENDOR_DIR="${VENDOR_DIR:-vendor/pf2e}"
TARGET_DIR="${TARGET_DIR:-types/foundry}"

mkdir -p vendor

if [ -d "${VENDOR_DIR}/.git" ]; then
  echo "Updating PF2E checkout in ${VENDOR_DIR}"
  git -C "${VENDOR_DIR}" fetch --depth 1 origin "${PF2E_REF}"
  git -C "${VENDOR_DIR}" checkout -f FETCH_HEAD
else
  echo "Cloning PF2E ${PF2E_REF} into ${VENDOR_DIR}"
  git clone --depth 1 --branch "${PF2E_REF}" "${PF2E_REPO_URL}" "${VENDOR_DIR}"
fi

if [ ! -d "${VENDOR_DIR}/types/foundry" ]; then
  echo "ERROR: ${VENDOR_DIR}/types/foundry not found"
  exit 1
fi

rm -rf "${TARGET_DIR}"
mkdir -p "${TARGET_DIR}"
cp -R "${VENDOR_DIR}/types/foundry/." "${TARGET_DIR}/"

echo "Synced PF2E foundry types to ${TARGET_DIR}"
