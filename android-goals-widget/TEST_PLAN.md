## Quick test checklist (phone tracking + widgets)

### Setup
- Server has `WIDGET_API_TOKEN` + `WIDGET_USER_ID` set and redeployed.
- Phone has **Saemi Goals** installed.
- In Saemi Goals app:
  - Set **Server URL** and **Widget API token**, tap **Save**
  - Tap **Grant Usage Access** and enable the app
  - Tap **Open Accessibility settings** and enable Saemi Goals (status turns green)
  - Tap **Allow notifications**
- Add **Saemi daily goals** and **Saemi Uni deadlines** widgets to home screen.

### Unproductive tracking
- Use YouTube or Instagram for ~2 minutes (app, or youtube.com / instagram.com in Chrome).
- On the web Timeline: expect **Not productive** phone sessions (browser ones described like `Chrome · youtube.com`).
- `/personal` Goals: unproductive minutes increase toward the 120 min limit.

### Blocker
- Once the combined minutes reach 120 (phone + laptop):
  - Opening the YouTube / Instagram app shows the blocker and returns home.
  - Opening youtube.com / instagram.com in Chrome navigates back and shows the blocker.
- A long video keeps being re-checked about every 45s, so it is interrupted when the limit is crossed.

### Uni
- Add a course on `/personal/uni` with a weekly deadline.
- Tap refresh on the Uni widget: upcoming items appear, overdue in red, <48h in amber.
- Tap an item: the course page opens in the browser.
- Notifications arrive ~24h and ~3h before each open deadline (skipped if ticked off meanwhile).

### Debugging tips
- If nothing is tracked: confirm **Usage Access** is enabled.
- If Chrome isn't blocked: confirm the accessibility service is on (Android sometimes turns it off after an app update).
- If widgets show “Unauthorized”: server token and phone token must match; also prefer `https://www.…` base URL if your domain redirects.
