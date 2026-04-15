#!/usr/bin/env bash
set -euo pipefail
#
# Restore a custom-format pg_dump (-Fc) into a Postgres database.
#
# Your OLD prisma-postgres-indigo DB may reject ALL connections with planLimitReached;
# then pg_dump is impossible until Prisma restores access or you download a backup
# from Prisma → Backups (if available).
#
# Typical flow for a full cluster dump:
#   export NEW_DB_URL='postgres://...'
#   ./scripts/restore-pg-dump.sh ./saemi-backup.dump
#
# Target DB should be empty, or you must know how to resolve restore conflicts.
#
if [[ -z "${NEW_DB_URL:-}" ]]; then
  echo "ERROR: Set NEW_DB_URL to the destination postgres:// URL." >&2
  exit 1
fi
if [[ $# -lt 1 ]] || [[ ! -f "$1" ]]; then
  echo "Usage: NEW_DB_URL='postgres://...' $0 path/to/backup.dump" >&2
  exit 1
fi

pg_restore --no-owner --no-acl -d "$NEW_DB_URL" "$1"
echo "OK: restore finished."
