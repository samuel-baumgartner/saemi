const LIMIT_ENDPOINT = 'https://www.samuelbaumgartner.ch/api/limits/status';
const CHECK_ALARM = 'saemi-limit-check';

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
  return (
    h === 'youtube.com' ||
    h.endsWith('.youtube.com') ||
    h === 'youtu.be' ||
    h === 'instagram.com' ||
    h.endsWith('.instagram.com')
  );
}

/**
 * Status cache. Far from the limit we ask rarely; close to it more often; once over,
 * it stays over until the date changes.
 */
let lastStatus = null;
let lastStatusAt = 0;
let lastStatusForDate = '';

function cacheTtlMs(status) {
  if (status.isOverLimit) return 10 * 60_000;
  const remainingMs = Math.max(0, Number(status.remainingMinutes) || 0) * 60_000;
  return Math.min(5 * 60_000, Math.max(30_000, remainingMs / 2));
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

function block(tabId) {
  chrome.tabs.update(tabId, { url: 'about:blank' }).catch(() => {});
}

/** Blocks every open YouTube / Instagram tab if the daily allowance is used up. */
async function enforceAll() {
  const tabs = await chrome.tabs.query({});
  const targets = tabs.filter((t) => t.id != null && t.url && isTarget(t.url));
  if (targets.length === 0) return;
  let status;
  try {
    status = await fetchLimitStatus();
  } catch (e) {
    console.warn('Saemi limit extension error', e);
    return;
  }
  if (!status.isOverLimit) return;
  for (const t of targets) block(t.id);
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = changeInfo.url || (changeInfo.status === 'complete' ? tab.url : '');
  if (!url || !isTarget(url)) return;
  fetchLimitStatus()
    .then((status) => {
      if (status.isOverLimit) block(tabId);
    })
    .catch((e) => console.warn('Saemi limit extension error', e));
});

// Catches videos left playing across the limit (service workers can't keep timers alive).
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
