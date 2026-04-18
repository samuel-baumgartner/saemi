# saemi

Personal productivity system that unifies phone, desktop, and browser activity into one timeline, then feeds daily goals, unproductive-time budgets, and review loops.

Live: [samuelbaumgartner.ch/personal/dashboard](https://www.samuelbaumgartner.ch/personal/dashboard)

Built to solve the context-switching problem across devices. Now runs 100% of my own task tracking, time allocation, and language-learning goals.

## What it is

- **Web app** — Next.js (App Router) + Prisma + PostgreSQL. Timeline, daily goals, unproductive-time limits, edit/override UI.
- **Browser extension** — Chrome/Chromium. Classifies browser tabs (productive / listening comprehension / unproductive) and enforces limits, with a title-level heuristic for YouTube listening.
- **Android home-screen widget** — Kotlin. Shows today's goals at a glance, syncs phone usage via `UsageStatsManager`, blocks over-limit apps (YouTube, Instagram) through an AccessibilityService.
- **Desktop focus daemon** ([TimeChecker](https://github.com/samuel-baumgartner)) — polls `cosmic-ext-window-helper` on Pop!_OS COSMIC to attribute keyboard-focus time to the right app.
- **Google Fit uploader** — writes daily totals back to Google Fit for a single source of truth on a watch.

## What's interesting

- **Cross-device session merging.** Phone usage-stats intervals, desktop focus seconds, and browser tab time collapse into a single per-minute timeline server-side. User edits on the web are locked (`userOverridden`) and suppress duplicate phone re-syncs, using Jaccard overlap on wall-clock intervals instead of exact timestamp matching.
- **YouTube listening-comprehension detection on Android** — AccessibilityService records normalized window titles, and `PhoneUsageTracker` joins those matches against usage intervals so comprehension time stops counting as "Not productive" without the user tapping anything. Same regex is kept in sync between the Kotlin service and the browser extension.
- **Over-limit blocker** — rather than wrapping individual apps, a single AccessibilityService launches a blocker activity when an unproductive foreground app crosses today's budget.
- **Works offline-first on the phone** — widget buffers sessions locally and retries sync.

## Stack

Next.js 15 · React 19 · TypeScript · Prisma · PostgreSQL · NextAuth (Google) · Tailwind · Kotlin / AndroidX (widget + accessibility service) · Chrome Extension MV3 · Python (desktop daemon).

## Repo layout

```
prisma/                  DB schema + migrations
src/app/                 Next.js App Router (pages + API routes)
src/lib/                 goal/limit logic, session merging, overrides
browser-extension/       Chrome MV3 extension
android-goals-widget/    Android widget + accessibility service (Kotlin)
scripts/                 maintenance / reclassification jobs
```

## Status

Personal project, actively used daily. Not packaged for others to self-host — the code is here as a reference for how the pieces fit together.

## Author

[Samuel Baumgartner](https://www.samuelbaumgartner.ch) — BSc Electrical Engineering, ETH Zürich.
