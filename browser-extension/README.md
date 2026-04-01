# Saemi Unproductive Limit Extension

- Load this folder as an unpacked extension in Chrome/Brave.
- Make sure you are logged into Saemi (`/personal/dashboard`) in the same browser so the session cookie is sent to `https://www.samuelbaumgartner.ch/api/limits/status`.
- When over the unproductive limit:
  - Instagram tabs are immediately blanked.
  - YouTube: **2 minutes open grace** per tab the first time you land on YouTube while over limit (so the page and title can load). After that, tabs are kept only if the **title** looks like listening / language study (regex in `background.js`). While a title matches, you get an extra **30s** grace before a re-check.
  - The content script is registered for `youtube.com` so video titles are readable; without it, the background used to block almost instantly.

Reload the extension in `chrome://extensions` after updates.
