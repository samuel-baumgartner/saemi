#!/usr/bin/env bash
set -euo pipefail

BASE_URL="https://www.samuelbaumgartner.ch"
STATUS_ENDPOINT="$BASE_URL/api/limits/status"

BLOCKED_DOMAINS=("youtube.com" "www.youtube.com" "instagram.com" "www.instagram.com")

fetch_over_limit() {
  local json
  json=$(curl -sS --cookie-jar /tmp/saemi_limits_cookies.txt --cookie /tmp/saemi_limits_cookies.txt "$STATUS_ENDPOINT")
  echo "$json" | grep -q '"isOverLimit":true'
}

add_block_rules() {
  for d in "${BLOCKED_DOMAINS[@]}"; do
    sudo iptables -A OUTPUT -p tcp -m string --string "$d" --algo bm -j REJECT || true
  done
}

remove_block_rules() {
  for d in "${BLOCKED_DOMAINS[@]}"; do
    while sudo iptables -D OUTPUT -p tcp -m string --string "$d" --algo bm -j REJECT 2>/dev/null; do :; done
  done
}

if fetch_over_limit; then
  add_block_rules
else
  remove_block_rules
fi
