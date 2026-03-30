## Quick test checklist (phone tracking + widgets)

### Setup
- Server has `WIDGET_API_TOKEN` + `WIDGET_USER_ID` set and redeployed.
- Phone has **Saemi Goals** installed.
- In Saemi Goals app:
  - Set **Server URL** and **Widget API token**, tap **Save**
  - Tap **Grant Usage Access** and enable the app
  - Fill package names (or use **Detect current app** for each), tap **Save**
- Add **Saemi daily goals** and **Saemi timeline** widgets to home screen.

### Phone-only tracking
- Open Bunpro for ~2 minutes.
- Tap **Refresh** on Timeline widget:
  - Expect a recent item labeled **Bunpro**.
- Tap **Refresh** on Goals widget:
  - Expect Grammar goal progress to increase (Bunpro counts as grammar).

### AnkiDroid tracking
- Use AnkiDroid for ~2 minutes.
- Refresh widgets:
  - Timeline shows **Anki**
  - Goals shows Anki progress increasing.

### Unproductive tracking
- Use YouTube or Instagram for ~2 minutes.
- Refresh:
  - Timeline shows **Not productive**
  - Goals “Unproductive time today” card increases (web) and unproductive minutes reflect phone sessions.

### No listening on phone
- Use YouTube JP content but on phone:
  - There should be **no listening goal increase** unless you rename goals to match that label.

### Laptop + phone overlap (override)
- Keep laptop TimeChecker running.
- Use Bunpro/Anki/YouTube on phone while also active on laptop.
- Refresh phone widgets:
  - Phone timeline should reflect phone categories for those times.
  - It should **not** double-count the same minutes from laptop; phone overrides overlapping laptop sessions in the phone widget endpoints.

### Debugging tips
- If Timeline is empty: confirm **Usage Access** is enabled and **Detect current app** returns a package name.
- If widgets show “Unauthorized”: server token and phone token must match; also prefer `https://www.…` base URL if your domain redirects.

