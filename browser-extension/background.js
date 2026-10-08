const LIMIT_ENDPOINT = 'https://www.samuelbaumgartner.ch/api/limits/status';
const EXTRA_ENDPOINT = 'https://www.samuelbaumgartner.ch/api/limits/extra';
const CHECK_ALARM = 'saemi-limit-check';
const BLOCKED_PAGE = 'blocked.html';

/** Subdomains are included (m.youtube.com, music.youtube.com, www.instagram.com, ...). */
const TARGET_DOMAINS = [
  'youtube.com',
  'youtu.be',
  'yt.be',
  'youtube-nocookie.com',
  'youtubekids.com',
  'instagram.com',
  'instagr.am',
  'ig.me',
];

const RULE_PAGE = 1;
const RULE_EMBED = 2;

function todayYmdLocal() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function hostOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

function isTarget(url) {
  const h = hostOf(url);
  return TARGET_DOMAINS.some((d) => h === d || h.endsWith('.' + d));
}

/**
 * Status cache. Far from the limit we ask rarely; close to it more often; once over,
 * we recheck every 10 min or right when the next slice of the allowance unlocks.
 */
let lastStatus = null;
let lastStatusAt = 0;
let lastStatusForDate = '';

function cacheTtlMs(status) {
  const remainingMs = Math.max(0, Number(status.remainingMinutes) || 0) * 60_000;
  const ttl = status.isOverLimit
    ? 10 * 60_000
    : Math.min(5 * 60_000, Math.max(30_000, remainingMs / 2));
  const unlockAt = status.nextUnlockAt ? Date.parse(status.nextUnlockAt) : NaN;
  if (!Number.isFinite(unlockAt)) return ttl;
  return Math.max(0, Math.min(ttl, unlockAt - lastStatusAt));
}

async function fetchLimitStatus() {
  const today = todayYmdLocal();
  const now = Date.now();
  if (
    lastStatus &&
    lastStatusForDate === today &&
    now - lastStatusAt < cacheTtlMs(lastStatus)
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

/**
 * While over the limit, network rules stop every navigation to a target domain before it
 * loads (typed URLs, links, redirects, short links) and blank embedded players on other sites.
 */
async function setNetworkBlock(on) {
  const addRules = on
    ? [
        {
          id: RULE_PAGE,
          priority: 1,
          action: {
            type: 'redirect',
            redirect: { regexSubstitution: blockedPageUrl('\\1') },
          },
          condition: {
            regexFilter: '^(.*)$',
            requestDomains: TARGET_DOMAINS,
            resourceTypes: ['main_frame'],
          },
        },
        {
          id: RULE_EMBED,
          priority: 1,
          action: { type: 'block' },
          condition: { requestDomains: TARGET_DOMAINS, resourceTypes: ['sub_frame'] },
        },
      ]
    : [];
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE_PAGE, RULE_EMBED],
    addRules,
  });
}

/** The blocked URL is appended raw after `?u=` so the page can send you back after an unlock. */
function blockedPageUrl(originalUrl) {
  return chrome.runtime.getURL(BLOCKED_PAGE) + '?u=' + originalUrl;
}

function block(tabId, url) {
  chrome.tabs.update(tabId, { url: blockedPageUrl(url) }).catch(() => {});
}

/** Called by the blocked page once the unlock button has been held long enough. */
async function claimExtra() {
  const res = await fetch(EXTRA_ENDPOINT, { method: 'POST', credentials: 'include' });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { ok: false, error: json.error || 'HTTP ' + res.status };
  lastStatus = json;
  lastStatusAt = Date.now();
  lastStatusForDate = todayYmdLocal();
  await setNetworkBlock(Boolean(json.isOverLimit));
  return { ok: true, remainingMinutes: json.remainingMinutes };
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type !== 'claimExtra') return;
  claimExtra().then(sendResponse, (e) =>
    sendResponse({ ok: false, error: String(e?.message || e) }),
  );
  return true;
});

/** Syncs the network rules with the allowance and blocks any target tab that is already open. */
async function enforceAll() {
  let status;
  try {
    status = await fetchLimitStatus();
  } catch (e) {
    console.warn('Saemi limit extension error', e);
    return;
  }
  await setNetworkBlock(Boolean(status.isOverLimit));
  if (!status.isOverLimit) return;
  const tabs = await chrome.tabs.query({});
  for (const t of tabs) {
    if (t.id != null && t.url && isTarget(t.url)) block(t.id, t.url);
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = changeInfo.url || (changeInfo.status === 'complete' ? tab.url : '');
  if (!url || !isTarget(url)) return;
  fetchLimitStatus()
    .then((status) => {
      if (!status.isOverLimit) return;
      block(tabId, url);
      return setNetworkBlock(true);
    })
    .catch((e) => console.warn('Saemi limit extension error', e));
});

// Catches videos left playing across the limit and lifts the block after midnight
// (service workers can't keep timers alive).
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === CHECK_ALARM) void enforceAll();
});

function ensureAlarm() {
  chrome.alarms.get(CHECK_ALARM, (existing) => {
    if (!existing) chrome.alarms.create(CHECK_ALARM, { periodInMinutes: 1 });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  ensureAlarm();
  void enforceAll();
});

chrome.runtime.onStartup.addListener(() => {
  ensureAlarm();
  void enforceAll();
});

ensureAlarm();
