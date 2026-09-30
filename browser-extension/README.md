# Saemi Unproductive Limit Extension

- Load this folder as an unpacked extension in Chrome/Brave and make sure it is switched **on** in `chrome://extensions`.
- Make sure you are logged into Saemi (`/personal/dashboard`) in the same browser so the session cookie is sent to `https://www.samuelbaumgartner.ch/api/limits/status`.
- Once the 2h daily Instagram + YouTube allowance (phone + laptop combined) is used up:
  - every navigation to YouTube or Instagram is stopped before it loads and shows a "Daily limit reached" page. This covers typed URLs, links, redirects and short links (`youtube.com`, `youtu.be`, `yt.be`, `youtube-nocookie.com`, `youtubekids.com`, `instagram.com`, `instagr.am`, `ig.me`, all subdomains);
  - tabs that are already open on those sites are switched to the same page;
  - YouTube/Instagram embeds on other sites are blocked.
- The block is lifted within a minute after midnight.
- Status is cached: every 30s–5 min depending on how much time is left, 10 min once over. A 1-minute alarm keeps the block in sync.

Reload the extension in `chrome://extensions` after updates.
