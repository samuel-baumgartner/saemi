const HOLD_MS = 60_000;
const IDLE_LABEL = 'Hold for 1 min to get 15 extra min';

const button = document.getElementById('hold');
const fill = document.getElementById('holdFill');
const label = document.getElementById('holdLabel');
const msg = document.getElementById('extraMsg');

/** Everything after `?u=` is the blocked URL, appended unencoded by background.js. */
function originalUrl() {
  const i = location.search.indexOf('u=');
  if (i < 0) return null;
  try {
    const u = new URL(location.search.slice(i + 2));
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : null;
  } catch {
    return null;
  }
}

let holdStart = 0;
let timer = 0;

function reset() {
  clearInterval(timer);
  holdStart = 0;
  fill.style.width = '0';
  label.textContent = IDLE_LABEL;
}

function tick() {
  const elapsed = Date.now() - holdStart;
  if (elapsed >= HOLD_MS) {
    void claim();
    return;
  }
  fill.style.width = `${(elapsed / HOLD_MS) * 100}%`;
  label.textContent = `Keep holding… ${Math.ceil((HOLD_MS - elapsed) / 1000)}s`;
}

async function claim() {
  clearInterval(timer);
  holdStart = 0;
  button.disabled = true;
  fill.style.width = '100%';
  label.textContent = 'Unlocking…';
  let res;
  try {
    res = await chrome.runtime.sendMessage({ type: 'claimExtra' });
  } catch (e) {
    res = { ok: false, error: String(e?.message || e) };
  }
  if (!res?.ok) {
    button.disabled = false;
    reset();
    msg.textContent = `Could not unlock: ${res?.error || 'unknown error'}`;
    return;
  }
  label.textContent = '15 extra min unlocked';
  msg.textContent = 'Taking you back…';
  const back = originalUrl();
  setTimeout(() => {
    if (back) location.replace(back);
    else history.back();
  }, 800);
}

button.addEventListener('pointerdown', (e) => {
  if (button.disabled || holdStart) return;
  button.setPointerCapture(e.pointerId);
  msg.textContent = '';
  holdStart = Date.now();
  timer = setInterval(tick, 100);
});
for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
  button.addEventListener(type, () => {
    if (holdStart) reset();
  });
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden && holdStart) reset();
});
