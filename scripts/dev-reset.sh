#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

release_next_locks() {
  if [ ! -d .next ]; then
    return 0
  fi
  local pids
  pids="$(lsof -t +D .next 2>/dev/null | sort -u || true)"
  if [ -n "$pids" ]; then
    echo "Releasing processes locking .next: $pids"
    # shellcheck disable=SC2086
    kill $pids 2>/dev/null || true
    sleep 1
    # shellcheck disable=SC2086
    kill -9 $pids 2>/dev/null || true
    sleep 1
  fi
}

stop_local_next() {
  echo "Stopping Next.js processes for this project..."
  pkill -f "${ROOT}.*next dev" 2>/dev/null || true
  pkill -f "${ROOT}.*next start" 2>/dev/null || true
  pkill -f "next dev" 2>/dev/null || true
  pkill -f "next start" 2>/dev/null || true
  pkill -f "next-server" 2>/dev/null || true
  release_next_locks
  sleep 1
}

clear_next_cache() {
  echo "Clearing .next cache..."
  local attempt
  for attempt in 1 2 3 4 5; do
    if rm -rf .next 2>/dev/null; then
      echo "Cache cleared."
      return 0
    fi
    echo "Retry ${attempt}/5 — .next is still locked..."
    release_next_locks
    sleep 1
  done

  if [ -d .next ]; then
    echo ""
    echo "Could not remove .next. Close every terminal running npm run dev / next start"
    echo "for this project, then run: npm run dev:reset"
    exit 1
  fi
}

stop_local_next
clear_next_cache

echo "Starting dev server (single instance)..."
exec npx next dev --turbopack "$@"
