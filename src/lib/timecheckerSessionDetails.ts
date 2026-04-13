/**
 * TimeChecker sends arbitrary JSON in `healthData.details`. We extract tab/window
 * titles and URLs so they can be copied into `description` (visible in the app)
 * and included in goal matching text.
 */

const DESC_MAX_LEN = 2000

function isLikelyHttpUrl(s: string): boolean {
  return /^https?:\/\/.+/i.test(s.trim())
}

/**
 * Walk nested JSON for common keys (title, url, etc.) used by desktop trackers.
 */
export function extractTimecheckerForegroundLines(details: unknown): string[] {
  const out: string[] = []
  const seen = new Set<string>()

  function pushUnique(s: string) {
    const t = s.trim()
    if (t.length < 2 || t.length > 800) return
    const k = t.toLowerCase()
    if (seen.has(k)) return
    seen.add(k)
    out.push(t)
  }

  function walk(x: unknown, depth: number) {
    if (depth > 12 || x === null || x === undefined) return
    if (typeof x === 'string') {
      if (isLikelyHttpUrl(x)) pushUnique(x)
      return
    }
    if (Array.isArray(x)) {
      for (const el of x) walk(el, depth + 1)
      return
    }
    if (typeof x !== 'object') return
    for (const [key, val] of Object.entries(x as Record<string, unknown>)) {
      const kl = key.toLowerCase()
      if (typeof val === 'string') {
        if (
          (kl.includes('title') ||
            kl === 'name' ||
            kl === 'documenttitle' ||
            kl === 'windowtitle' ||
            kl === 'pagetitle' ||
            kl === 'tabtitle') &&
          val.trim().length > 1
        ) {
          pushUnique(val)
        }
        if (
          (kl.includes('url') || kl === 'href' || kl === 'pageurl' || kl === 'location') &&
          isLikelyHttpUrl(val)
        ) {
          pushUnique(val)
        }
      } else {
        walk(val, depth + 1)
      }
    }
  }

  walk(details, 0)
  return out
}

/**
 * Merge client `description` with extracted titles/URLs (deduped), capped for DB.
 */
export function mergeTimecheckerDescription(
  description: string | null | undefined,
  details: unknown
): string | null {
  const lines: string[] = []
  const base = description?.trim()
  if (base) lines.push(base)
  for (const line of extractTimecheckerForegroundLines(details)) {
    if (!lines.some((existing) => existing.includes(line) || line.includes(existing))) {
      lines.push(line)
    }
  }
  if (lines.length === 0) return null
  const merged = lines.join('\n')
  return merged.length > DESC_MAX_LEN
    ? merged.slice(0, DESC_MAX_LEN)
    : merged
}

/** Process / window name looks like a mainstream desktop browser. */
export function isBrowserProcessName(activity: string): boolean {
  const a = activity.trim().toLowerCase()
  if (a.includes('google chrome')) return true
  if (/\b(chromium|chrome|firefox|safari|edge|arc|opera|vivaldi|brave)\b/.test(a)) {
    return true
  }
  if (a.includes('microsoft edge')) return true
  if (a.includes('mozilla')) return true
  return false
}

/**
 * Local / staging URLs and dev-server ports often used for startup work in Chrome;
 * counted only when {@link isBrowserProcessName} matches (timechecker + browser).
 */
export function hasLocalDevStartupSignals(text: string): boolean {
  return /localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|\.local(?:\/|:|\s|$)|\.lvh\.me|\.vercel\.app|github\.dev|codespaces|gitpod\.io|localhost\.run|:3000\b|:5173\b|:4173\b|:4321\b|:8080\b|:8787\b|:4000\b|:5000\b|:5500\b|:24678\b/i.test(
    text
  )
}
