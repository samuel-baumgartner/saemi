#!/usr/bin/env bash
set -euo pipefail
#
# Apply Prisma migrations to a new (empty) Postgres database — e.g. Prisma "Saemi" project.
#
# 1) Prisma Data Platform → Saemi → copy the DIRECT URL:
#    postgres://...@db.prisma.io:5432/postgres?sslmode=require
#    (Do not use prisma+postgres://accelerate... if Accelerate is over quota.)
#
# 2) Run:
#    export DATABASE_URL='postgres://...'
#    ./scripts/setup-new-db.sh
#
# 3) Vercel → Environment Variables: set the SAME value for
#    PRISMA_DATABASE_URL, POSTGRES_URL, DATABASE_URL (and POSTGRES_PRISMA_URL if you use it).
#    Redeploy.
#
cd "$(dirname "$0")/.."

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "ERROR: Set DATABASE_URL to your new Saemi direct postgres:// connection string." >&2
  exit 1
fi

pnpm prisma migrate deploy
pnpm prisma generate --no-engine
echo "OK: schema is up to date on this DATABASE_URL."
