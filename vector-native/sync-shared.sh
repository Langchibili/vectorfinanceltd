#!/usr/bin/env bash
# Copies the shared native source into the app in the current directory (run via `npm run sync`).
# src/config/app.ts is app-specific and is NOT overwritten.
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
cp "$HERE/_shared/index.ts" "$HERE/_shared/App.tsx" "$HERE/_shared/AppContent.tsx" .
for d in utils services components; do mkdir -p "src/$d"; cp -r "$HERE/_shared/src/$d/." "src/$d/"; done
echo "shared source synced"
