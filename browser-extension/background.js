const LIMIT_ENDPOINT = 'https://www.samuelbaumgartner.ch/api/limits/status';
const GRACE_MS = 30 * 1000;

function todayYmdLocal() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const listeningRegex = /(japanese|nihongo|comprehensible|comprehension|jlpt|日本語|listen(ing)?)/i;

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

const graceByTab = new Map(); // tabId -> timestamp until which listening is allowed

function isYoutube(url) {
  return /https?:\/\/(www\.)?youtube\.com\//.test(url);
}

function isInstagram(url) {
  return /https?:\/\/(www\.)?instagram\.com\//.test(url);
}

async function handleTab(tabId, changeInfo, tab) {
  const url = tab.url || changeInfo.url;
  if (!url) return;
  if (!isYoutube(url) && !isInstagram(url)) return;

  try {
    const status = await fetchLimitStatus();
    const over = !!status.isOverLimit;

    if (!over) {
      // Reset grace when under limit again.
      graceByTab.delete(tabId);
      return;
    }

    if (isYoutube(url)) {
      // Ask content script for title to decide listening vs unproductive.
      chrome.tabs.sendMessage(
        tabId,
        { type: 'GET_TITLE' },
        (resp) => {
          const title = resp && resp.title ? resp.title : '';
          const listening = listeningRegex.test(title);
          const now = Date.now();
          const graceUntil = graceByTab.get(tabId) || 0;

          if (listening && now < graceUntil) {
            return; // still in grace window
          }

          if (listening && now >= graceUntil) {
            graceByTab.set(tabId, now + GRACE_MS);
            return;
          }

          // Over limit and not listening in grace: block.
          chrome.tabs.update(tabId, {
            url: 'about:blank',
          });
        },
      );
      return;
    }

    if (isInstagram(url)) {
      // Always block when over limit.
      chrome.tabs.update(tabId, { url: 'about:blank' });
    }
  } catch (e) {
    console.warn('Saemi limit extension error', e);
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' || changeInfo.url) {
    handleTab(tabId, changeInfo, tab);
  }
});

