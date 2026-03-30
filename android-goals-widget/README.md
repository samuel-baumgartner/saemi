# Saemi — Android home screen widgets (Goals + Timeline)

Two widgets:
- **Goals**: read-only daily goals progress (server uses the same logic as the web app).
- **Timeline**: a list of recent “sessions” (Bunpro / Anki / Not productive / Other) built from your phone’s foreground app usage.

## 1. Server configuration

In your Saemi Next.js deployment, set (see `.env.example` in the repo root):

- **`WIDGET_API_TOKEN`** — long random secret (e.g. `openssl rand -hex 32`).
- **`WIDGET_USER_ID`** — your Prisma `userId`, i.e. the **same email** you use to sign in with Google at `/personal`.

Redeploy so these endpoints are available (Bearer token auth):
- `GET /api/widget/daily-goals`
- `GET /api/widget/phone-goals`
- `GET /api/widget/phone-timeline`
- `POST /api/widget/phone-sessions/sync`

The widget sends your phone’s **local calendar date** as `?date=YYYY-MM-DD` so “today” matches the device, not the server clock.

## 2. Install the app

### Option A — No Android Studio (download an APK from GitHub)

Use this if you do not want to install Android Studio on your computer.

1. Push this repo to **GitHub** (if it is not there yet).
2. Open the repo on GitHub → **Actions** → workflow **“Build Saemi Goals widget APK”**.
3. If it has not run yet, open the workflow → **Run workflow** (or push any change under `android-goals-widget/`).
4. When the run finishes, open it → scroll to **Artifacts** → download **`saemi-goals-widget-debug-apk`** (ZIP).
5. Unzip on your computer. You get **`app-debug.apk`**.
6. Copy the APK to your phone (USB, Drive, email, etc.).
7. On the phone, open the APK file. Allow **Install unknown apps** for that app (Files, Chrome, etc.) if Android asks.
8. Install. The app is named **Saemi Goals**.

### Option B — Android Studio + USB

1. Install [Android Studio](https://developer.android.com/studio) (includes JDK and SDK).
2. **File → Open** → select the folder `android-goals-widget`.
3. Wait for Gradle sync, plug in the phone, enable **USB debugging**.
4. Press **Run** (green play). That installs **Saemi Goals** on the device.

### Option C — Command line (JDK + Android SDK already installed)

```bash
cd android-goals-widget
./gradlew installDebug
```

## 3. Place the widget

1. Long-press the home screen → **Widgets**.
2. Find **Saemi daily goals** and/or **Saemi timeline** and drag them to the home screen.
3. When prompted, enter:
   - **Server URL** — base URL only, no path. Use the URL you actually open in the browser (if that is `https://www.…`, use that). Apex→www redirects used to drop the auth header in older builds; the app now re-sends `Authorization` after each redirect.
   - **Widget API token** — the same value as `WIDGET_API_TOKEN`.
4. Tap **Save**. Use **Refresh** on the widget if data does not appear immediately.

## 4. Enable phone tracking (Usage Access)

To track Bunpro / AnkiDroid / YouTube / Instagram automatically, the app needs **Usage Access**.

1. Open **Saemi Goals** from the app drawer.
2. Tap **Grant Usage Access**.
3. Enable **Saemi Goals** in the Usage Access list.
4. Back in the app, fill package names (or use **Detect current app** while the target app is in foreground):
   - Bunpro package
   - AnkiDroid package
   - YouTube package (unproductive)
   - Instagram package (unproductive)
5. Tap **Save**, then hit **Refresh** on the widgets.

Behavior:
- The app rebuilds **today’s** phone sessions from Usage Events and uploads them right before each widget refresh.
- When phone + laptop overlap, the phone sessions **override** laptop sessions in the phone widget endpoints (no double-count).

## Updates

The widget also refreshes on the interval allowed by Android (about every 30 minutes) and when you tap **Refresh**.
