const LIMIT_ENDPOINT = 'https://www.samuelbaumgartner.ch/api/limits/status';
/** Extra time after title looks like listening before we may block again. */
const GRACE_MS = 30 * 1000;
/**
 * Unconditional grace when you first land on YouTube while over limit, so the tab
 * can load and the title can match (listening regex). Without this, empty/"YouTube"
 * titles block in under a second.
 */
const OPEN_GRACE_MS = 30 * 1000;

function todayYmdLocal() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Keep in sync with `android-goals-widget/.../YoutubeListeningHeuristics.kt` LISTENING_REGEX. */
const listeningRegex =
  /(聞き取り|リスニング|ヒアリング|日本語|字幕|nihongo|japanese|japan(ese)?|japanisch|japanische|jlpt|n[1-5]\b|immersion|comprehensible|comprehension|verständlich|verstaendlich|listening|listen|learn\s+japanese|study\s+japanese|lass\s+uns\s+japanisch|shadowing|subtitles?|japonais|giapponese|japonés|anfänger|anfaenger|english|esl|podcast)/i;

/**
 * Cache last status briefly to avoid hammering server on every tab event.
 */
let lastStatus = null;
let lastStatusAt = 0;
let lastStatusForDate = '';

async function fetchLimitStatus() {
  const today = todayYmdLocal();
  const now = Date.now();
  if (
    lastStatus &&
    lastStatusForDate === today &&
    now - lastStatusAt < 10_000
  ) {
    return lastStatus;
  }
  const url = `${LIMIT_ENDPOINT}?date=${encodeURIComponent(today)}`;
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) throw new Error('limit status ' + res.status);
  const json = await res.json();
  lastStatus = json;
  lastStatusForDate = today;
  lastStatusAt = now;
  return json;
}

/** tabId -> end of "listening title" grace (extended window after a match). */
const graceByTab = new Map();
/** tabId -> end of unconditional open grace (first YouTube load while over limit). */
const openGraceUntil = new Map();

function isYoutube(url) {
  try {
    const h = new URL(url).hostname;
    return h === 'youtube.com' || h.endsWith('.youtube.com');
  } catch {
    return false;
  }
}

function isInstagram(url) {
  return /https?:\/\/(www\.)?instagram\.com\//.test(url);
}

function clearYoutubeGrace(tabId) {
  graceByTab.delete(tabId);
  openGraceUntil.delete(tabId);
  try {
    void chrome.action.setBadgeText({ text: '', tabId });
  } catch {
    /* tab gone */
  }
}

let graceBadgeInterval = null;

function ensureGraceBadgeTicker() {
  if (graceBadgeInterval != null) return;
  graceBadgeInterval = setInterval(() => {
    void syncGraceBadges();
  }, 1000);
}

/**
 * Open-grace countdown on the extension icon (per YouTube tab). No content script — survives reloads.
 */
async function syncGraceBadges() {
  const tabs = await chrome.tabs.query({});
  const ytTabs = tabs.filter((t) => t.id != null && t.url && isYoutube(t.url));

  if (ytTabs.length === 0) {
    if (graceBadgeInterval != null) {
      clearInterval(graceBadgeInterval);
      graceBadgeInterval = null;
    }
    return;
  }

  ensureGraceBadgeTicker();

  let status;
  try {
    status = await fetchLimitStatus();
  } catch {
    return;
  }

  const over = !!status.isOverLimit;
  const now = Date.now();

  for (const t of ytTabs) {
    const tabId = t.id;
    try {
      if (!over) {
        await chrome.action.setBadgeText({ text: '', tabId });
        continue;
      }
      if (!openGraceUntil.has(tabId)) {
        openGraceUntil.set(tabId, now + OPEN_GRACE_MS);
      }
      const until = openGraceUntil.get(tabId);
      if (now < until) {
        const secs = Math.min(99, Math.ceil((until - now) / 1000));
        await chrome.action.setBadgeText({
          text: secs > 0 ? String(secs) : '',
          tabId,
        });
        await chrome.action.setBadgeBackgroundColor({
          color: '#262626',
          tabId,
        });
      } else {
        await chrome.action.setBadgeText({ text: '', tabId });
      }
    } catch {
      /* tab closed or badge API unavailable */
    }
  }

  if (over) {
    for (const t of ytTabs) {
      await enforceYoutubeOverLimit(t.id);
    }
  }
}

/**
 * Block YouTube when over limit (post–open-grace). Runs from onUpdated and every 1s via sync,
 * because tabs.onUpdated often stops after the watch page settles (SPA).
 */
async function enforceYoutubeOverLimit(tabId) {
  let url = '';
  try {
    const tab = await chrome.tabs.get(tabId);
    url = tab.url || '';
  } catch {
    return;
  }
  if (!isYoutube(url)) return;

  const now = Date.now();
  if (!openGraceUntil.has(tabId)) {
    openGraceUntil.set(tabId, now + OPEN_GRACE_MS);
  }
  if (now < openGraceUntil.get(tabId)) {
    return;
  }

  const title = await getYoutubeTabTitle(tabId);
  const t = Date.now();
  const trimmed = title.trim();
  const looksBare =
    !trimmed || /^youtube$/i.test(trimmed) || trimmed === 'YouTube';
  const listening = listeningRegex.test(title);
  const graceUntil = graceByTab.get(tabId) || 0;

  if (looksBare) {
    return;
  }

  if (listening && t < graceUntil) {
    return;
  }

  if (listening && t >= graceUntil) {
    graceByTab.set(tabId, t + GRACE_MS);
    return;
  }

  chrome.tabs.update(tabId, {
    url: 'about:blank',
  });
}

/** Strip trailing " - YouTube" / " - YouTube Music" (Chrome tab title). */
function normalizeYoutubeTitleText(raw) {
  if (!raw || typeof raw !== 'string') return '';
  let s = raw.trim();
  s = s.replace(/\s*-\s*YouTube(\s+Music)?\s*$/i, '').trim();
  if (/^youtube(\s+music)?$/i.test(s)) return '';
  return s;
}

/**
 * Title for blocking: prefer `tabs.get` title; DOM injection often returned '' on YT.
 */
async function getYoutubeTabTitle(tabId) {
  try {
    const tab = await chrome.tabs.get(tabId);
    const fromApi = normalizeYoutubeTitleText(tab.title || '');
    if (fromApi) {
      return fromApi;
    }
  } catch {
    /* fall through */
  }

  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const tryText = (sel) => {
          try {
            const el = document.querySelector(sel);
            const t = el?.textContent?.trim?.() || '';
            return t || '';
          } catch {
            return '';
          }
        };
        const parts = [
          () => (document.title || '').trim(),
          () => tryText('h1.ytd-video-primary-info-renderer yt-formatted-string'),
          () => tryText('ytd-watch-metadata h1 yt-formatted-string'),
          () => tryText('h1 yt-formatted-string'),
          () => tryText('h1.ytd-video-primary-info-renderer'),
          () => tryText('h1.title'),
        ];
        for (const fn of parts) {
          const t = fn();
          if (t) return t;
        }
        return '';
      },
    });
    const first = results && results[0];
    const injected = typeof first?.result === 'string' ? first.result : '';
    return normalizeYoutubeTitleText(injected);
  } catch {
    return '';
  }
}

async function handleTab(tabId, changeInfo, tab) {
  const url = tab.url || changeInfo.url;
  if (!url) return;

  if (!isYoutube(url) && !isInstagram(url)) {
    clearYoutubeGrace(tabId);
    return;
  }

  try {
    const status = await fetchLimitStatus();
    const over = !!status.isOverLimit;

    if (!over) {
      clearYoutubeGrace(tabId);
      return;
    }

    if (isYoutube(url)) {
      await enforceYoutubeOverLimit(tabId);
      return;
    }

    if (isInstagram(url)) {
      chrome.tabs.update(tabId, { url: 'about:blank' });
    }
  } catch (e) {
    console.warn('Saemi limit extension error', e);
  } finally {
    void syncGraceBadges();
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete' ||
    changeInfo.url ||
    changeInfo.title
  ) {
    handleTab(tabId, changeInfo, tab);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  clearYoutubeGrace(tabId);
});

chrome.tabs.onActivated.addListener(() => {
  void syncGraceBadges();
});

chrome.runtime.onInstalled.addListener(() => {
  void syncGraceBadges();
});

void syncGraceBadges();
