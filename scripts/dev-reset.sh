#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Stopping existing Next.js dev servers..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true
sleep 2

echo "Clearing .next cache..."
for _ in 1 2 3; do
  rm -rf .next && break
  sleep 1
done
if [ -d .next ]; then
  echo "Could not remove .next — close other Next.js terminals and run again."
  exit 1
fi

echo "Starting dev server..."
exec npm run dev -- --turbopack "$@"
