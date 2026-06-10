#!/usr/bin/env bash
# SessionStart hook — prepares the Specialist Group project for Claude Code web
# sessions so builds, linters and tests can run immediately.
set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT" || exit 0

# Enable pnpm via corepack if needed.
if ! command -v pnpm >/dev/null 2>&1; then
  corepack enable >/dev/null 2>&1 || true
fi

# Install dependencies if they are missing.
if [ ! -d node_modules ]; then
  echo "📦 Installing dependencies…"
  pnpm install --frozen-lockfile >/dev/null 2>&1 || pnpm install >/dev/null 2>&1 || true
fi

# Ensure a local .env exists for Prisma/dev.
if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env 2>/dev/null || true
fi

# Generate the Prisma client (safe to re-run).
pnpm prisma generate >/dev/null 2>&1 || true

echo "✅ Specialist Group environment ready (Next.js 15 · Prisma · next-intl)."
