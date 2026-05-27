#!/usr/bin/env bash
set -euo pipefail

# Prevents _buildManifest.js.tmp ENOENT errors caused by multiple dev/production
# servers writing to the same .next folder at once.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

count_next_dev="$(pgrep -fc 'next dev' 2>/dev/null || echo 0)"
count_next_start="$(pgrep -fc 'next start' 2>/dev/null || echo 0)"
count_project_dev="$(pgrep -fc "${ROOT}/node_modules/.bin/next dev --turbopack" 2>/dev/null || echo 0)"
port_3000_pid="$(lsof -ti tcp:3000 2>/dev/null | head -n 1 || true)"

# Hard guard: never start a second dev instance for the same project.
if [ "${count_project_dev:-0}" -gt 0 ]; then
  echo ""
  echo "✅ Dev server is already running for this project."
  echo "   Open: http://localhost:3000"
  echo "   If needed, restart cleanly with: npm run dev:reset -- -p 3000"
  echo ""
  exit 0
fi

# Secondary guard: if port 3000 is already served by Next, do not spawn a new server on 3001.
if [ -n "${port_3000_pid:-}" ] && ps -p "$port_3000_pid" -o command= 2>/dev/null | grep -q "next-server"; then
  echo ""
  echo "✅ Port 3000 is already served by Next.js."
  echo "   Open: http://localhost:3000"
  echo "   If needed, restart cleanly with: npm run dev:reset -- -p 3000"
  echo ""
  exit 0
fi

if [ "${count_next_dev:-0}" -gt 1 ] || [ "${count_next_start:-0}" -gt 0 ]; then
  echo ""
  echo "⚠️  Multiple Next.js servers detected (dev: ${count_next_dev:-0}, start: ${count_next_start:-0})."
  echo "   They share .next and cause manifest errors on refresh."
  echo "   Run: npm run dev:reset"
  echo ""
fi

exec npx next dev --turbopack "$@"
